const it = g()
const r = Math.random()
assert(it.next(r).value === r)

function* g() {
	yield function.sent
}
