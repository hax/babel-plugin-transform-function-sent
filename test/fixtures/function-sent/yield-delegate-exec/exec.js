const result = []

function* g1() {
	result.push(function.sent)
	yield
	result.push(function.sent)
	yield
	result.push(function.sent)
}

function* g2() {
	yield* g1()
	result.push(function.sent)
	yield* g1()
}

function* g3() {
	yield* g2()
}

const it = g3()
it.next(1)
it.next(2)
it.next(3)
it.next(1)
it.next(2)
it.next(3)

// same as regenerator, but need more discussion and clarification
// see https://github.com/allenwb/ESideas/issues/8
assert.deepEqual(result, [
	undefined, 2, 3, undefined, undefined, 1, 2
])
