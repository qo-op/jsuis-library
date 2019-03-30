/// <reference path = "../jsuis.ts"/>
class JSCheckBoxInput extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLInputElement);
    constructor(selected: boolean);
    // overload
    constructor(elementOrSelected?: HTMLInputElement | boolean) {
        // constructor();
        // constructor(element: HTMLInputElement);
        super(elementOrSelected === undefined || !(elementOrSelected instanceof HTMLInputElement) ? document.createElement("input") : elementOrSelected);
        this.setAttribute("type", "checkbox");
        if (elementOrSelected !== undefined && !(elementOrSelected instanceof HTMLInputElement)) {
            // constructor(selected: boolean);
            this.setAttribute("checked", "" + elementOrSelected);
        }
    }
    init(): void {
        this.addClass("JSCheckBoxInput");
    }
    setSelected(selected: boolean) {
        (<HTMLInputElement> this.element).checked = selected;
    }
    isSelected(): boolean {
        return (<HTMLInputElement> this.element).checked;
    }
}
