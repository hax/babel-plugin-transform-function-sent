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

_patch_function_sent(g2);

_patch_function_sent(g1);

function* g1() {
	let _function_sent = yield;

	!_function_sent;
	_function_sent = yield;
	!_function_sent;
	_function_sent = yield;
	!_function_sent;
}

function* g2() {
	let _function_sent = yield;

	_function_sent = yield* g1();
	!_function_sent;
	_function_sent = yield* g1();
}

function* g3() {
	yield* g2();
}
