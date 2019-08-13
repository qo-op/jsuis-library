/// <reference path = "../jsuis.ts"/>
/**
 * JSRadioButtonInput
 * 
 * @author Yassuo Toda
 */
class JSRadioButtonInput extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(selected: boolean);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLInputElement) ? document.createElement("input") : arguments[0]);
        this.setAttribute("type", "radio");
        this.setUI(JSRadioButtonInputUI.getInstance());
        switch (arguments.length) {
        case 1:
            // constructor(selected: boolean);
            if (typeof arguments[0] === "boolean") {
                var selected: boolean = arguments[0];
                this.setSelected(selected);
            }
            break;
        default:
        }
    }
    setSelected(selected: boolean) {
        (<HTMLInputElement> this.element).checked = selected;
    }
    isSelected(): boolean {
        return (<HTMLInputElement> this.element).checked;
    }
}
