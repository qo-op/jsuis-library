/**
 * Action
 * 
 * @author Yassuo Toda
 */

document.addEventListener("DOMContentLoaded", function () {
	document.addEventListener("action", function (ev) {
		const action = (<CustomEvent>ev).detail.action;
		const actionListener: any = window[action];
		if (actionListener !== undefined) {
			actionListener(<CustomEvent>ev);
		}
	});
});
