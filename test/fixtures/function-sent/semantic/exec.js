const it = g1()
it.next(1)
it.next(2)
it.next(3)

function* g1() {
	assert(function.sent === 1)
	const x = yield
	assert(x === 2)
	assert(function.sent === 2)
	const y = yield
	assert(y === 3)
	assert(function.sent === 3)
}


const r = Math.random()
assert(g2().next(r).value === r)

function* g2() {
	yield function.sent
}
