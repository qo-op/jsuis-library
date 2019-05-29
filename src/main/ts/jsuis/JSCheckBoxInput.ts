/// <reference path = "../jsuis.ts"/>
/**
 * JSCheckBoxInput
 * 
 * @author Yassuo Toda
 */
class JSCheckBoxInput extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(selected: boolean);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLInputElement) ? document.createElement("input") : args[0]);
        this.setAttribute("type", "checkbox");
        this.setStyle("vertical-align", "middle");
        switch (args.length) {
        case 1:
            // constructor(selected: boolean);
            if (typeof args[0] === "boolean") {
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
