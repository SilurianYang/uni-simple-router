class Patch {
	constructor(h5) {
		this.H5 = h5;
	}
	on(fun, args, callback) {
		if (this.H5) {
			return this[fun](args);
		}
		callback();
	}
	/**
	 * H5 专属 history.back API
	 * @param {Object} num	需要返回的层级必须是正整数
	 */
	historyBack(num) {
		history.go(num);
	}
}
export default Patch;
