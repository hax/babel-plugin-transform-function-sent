function* g1() {
	!function.sent
	yield
	!function.sent
	yield
	!function.sent
}

function* g2() {
	yield* g1()
	!function.sent
	yield* g1()
}

function* g3() {
	yield* g2()
}
