/// <reference path = "../jsuis.ts"/>
/**
 * JSTextField
 * 
 * @author Yassuo Toda
 */
class JSTextField extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(columns: number);
    constructor(text: string);
    constructor(text: string, columns: number);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLInputElement) ? document.createElement("input") : arguments[0]);
        this.setAttribute("type", "text");
        this.setUI("JSTextField");
        switch (arguments.length) {
        case 1:
            // constructor(columns: number);
            // constructor(text: string);
            if (typeof arguments[0] === "number") {
                var columns: number = arguments[0];
                this.setColumns(columns);
            } else if (typeof arguments[0] === "string") {
                var text: string = arguments[0];
                this.setText(text);
            }
            break;
        case 2:
            // constructor(text: string, columns: number);
            if (typeof arguments[0] === "string" && typeof arguments[1] === "number") {
                var text: string = arguments[0];
                var columns: number = arguments[1];
                this.setText(text);
                this.setColumns(columns);
            }
            break;
        default:
        }
    }
    getColumns(): number {
        return (<HTMLInputElement> this.element).size;
    }
    setColumns(columns: number) {
        (<HTMLInputElement> this.element).size = columns;
    }
    getText(): string {
        return (<HTMLInputElement> this.element).value;
    }
    setText(text: string) {
        (<HTMLInputElement> this.element).value = text;
    }
    setAction(action: JSAction) {
        var oldAction: JSAction = this.getAction();
        if (oldAction) {
            this.removeActionListener(oldAction);
        }
        this.action = action;
        this.addActionListener(action);
    }
}
