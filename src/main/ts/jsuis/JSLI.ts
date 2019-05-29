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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLLIElement) ? document.createElement("li") : args[0]);
        switch (args.length) {
        case 1:
            // constructor(text: string);
            if (typeof args[0] === "string") {
                var text: string = args[0];
                this.setText(text);
            }
            break;
        default:
        }
    }
    init(): void {
        this.addClass("JSLI");
    }
}