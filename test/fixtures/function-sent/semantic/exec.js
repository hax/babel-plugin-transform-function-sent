const it = g()
it.next(1)
it.next(2)
it.next(3)

function* g() {
	assert(function.sent === 1)
	const x = yield
	assert(x === 2)
	assert(function.sent === 2)
	const y = yield
	assert(y === 3)
	assert(function.sent === 3)
}


// const it1 = g1()
// it1.next(1)
// it1.next(2)
// it1.next(3)
// // assert(it1.next(4) === 3)
// // it1.next(1)
// // it1.next(2)
// // it1.next(3)
//
function* g1() {
	yield* g()
	// assert(yield function.sent === 4)
	// yield* g()
}
