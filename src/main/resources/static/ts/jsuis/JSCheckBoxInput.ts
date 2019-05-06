/// <reference path = "../jsuis.ts"/>
/**
 * JSCheckBoxInput
 * 
 * @author Yassuo Toda
 */
class JSCheckBoxInput extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLInputElement);
    constructor(selected: boolean);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLInputElement);
        super(args.length === 0 || !(args[0] instanceof HTMLInputElement) ? document.createElement("input") : args[0]);
        this.setAttribute("type", "checkbox");
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLInputElement);
            // constructor(selected: boolean);
            if (args[0] instanceof HTMLInputElement) {
            } else if (typeof args[0] === "boolean") {
                var selected: boolean = args[0];
                this.setAttribute("checked", "" + selected);
            }
            break;
        default:
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
