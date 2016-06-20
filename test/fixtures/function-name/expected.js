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

const g = _patch_function_sent(function* g() {
	let _function_sent = yield;

	!_function_sent;
});
