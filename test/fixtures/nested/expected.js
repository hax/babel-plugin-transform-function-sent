function _patch_function_sent(g) {
	const proto = g.prototype;

	proto.next = function next(value) {
		if (!this._sent) {
			this._sent = true;
			Reflect.apply(Reflect.getPrototypeOf(proto).next, this, [value]);
		}

		return Reflect.apply(Reflect.getPrototypeOf(proto).next, this, [value]);
	};
}

function* g() {
	_patch_function_sent(g2);

	function* g1() {
		const g = _patch_function_sent(function* g() {
			let _function_sent = yield;

			!_function_sent;
		});
	}
	function* g2() {
		let _function_sent = yield;

		function* g() {}
		!_function_sent;
	}
}
