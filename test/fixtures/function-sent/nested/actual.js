function* g() {
	function* g1() {
		const g = function* g() {
			!function.sent
		}
	}
	function* g2() {
		function* g() {}
		!function.sent
	}
}
