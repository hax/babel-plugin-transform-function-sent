import template from 'babel-template'

const runtime = template(`
function PATCH(g) {
	const proto = g.prototype
	proto.next = function next(value) {
		if (!this._sent) {
			this._sent = true
			Reflect.apply(Reflect.getPrototypeOf(proto).next, this, [value])
		}
		return Reflect.apply(Reflect.getPrototypeOf(proto).next, this, [value])
	}
}
`)
const patch = template(`PATCH(GENERATOR)`)
const init = template(`let FUNCTION_SENT = yield`)

export default function ({types: t}) {

	const replaceFunctionSent = {
		MetaProperty(path) {
			const {meta, property} = path.node
			if (meta.name === 'function' && property.name === 'sent') {
				path.replaceWith(this.FUNCTION_SENT)
				this.replaced = true
			}
		},
		Function(path) {
			path.skip()
		}
	}
	const replaceYield = {
		YieldExpression(path) {
			path.replaceWith(t.assignmentExpression(
				'=', this.FUNCTION_SENT, path.node
			))
			path.skip()
		},
		Function(path) {
			path.skip()
		}
	}

	return {
		inherits: require("babel-plugin-syntax-function-sent"),
		visitor: {
			Program: {
				enter(path) {
					this.PATCH 	= path.scope.generateUidIdentifier('patch_function_sent')
					this.FUNCTION_SENT	= path.scope.generateUidIdentifier('function_sent')
					this.requirePatch	= false
				},
				exit(path) {
					if (this.requirePatch) path.unshiftContainer('body', runtime({PATCH: this.PATCH}))
				}
			},
			Function: {
				exit(path) {
					if (!path.node.generator) return
					const ctx = {FUNCTION_SENT: this.FUNCTION_SENT, replaced: false}
					path.traverse(replaceFunctionSent, ctx)
					if (ctx.replaced) {
						path.traverse(replaceYield, ctx)
						path.scope.push({
							kind:	'let',
							id:	this.FUNCTION_SENT,
							init:	t.yieldExpression(),
						})
						if (path.isFunctionExpression()) {
							path.replaceWith(patch({PATCH: this.PATCH, GENERATOR: path.node}))
						} else if (path.isFunctionDeclaration()) {
							const parent = path.getFunctionParent()
							const patched = patch({PATCH: this.PATCH, GENERATOR: path.node.id})
							if (t.isProgram(parent)) parent.unshiftContainer('body', patched)
							else parent.get('body').unshiftContainer('body', patched)
						}
						this.requirePatch = true
					}
				}
			}
		}
	}
}
