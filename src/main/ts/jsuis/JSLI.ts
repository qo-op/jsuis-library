/// <reference path = "../jsuis.ts"/>
/**
 * JSLI
 * 
 * @author Yassuo Toda
 */
class JSLI extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(text: string);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLLIElement) ? document.createElement("li") : arguments[0]);
        this.setUI("JSLI");
        switch (arguments.length) {
        case 1:
            // constructor(text: string);
            if (typeof arguments[0] === "string") {
                var text: string = arguments[0];
                this.setText(text);
            }
            break;
        default:
        }
    }
}