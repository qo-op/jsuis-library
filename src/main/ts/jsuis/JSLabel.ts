/// <reference path = "../jsuis.ts"/>
/**
 * JSLabel
 * 
 * @author Yassuo Toda
 */
class JSLabel extends JSText {

    constructor();
    constructor(element: HTMLElement);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(icon: JSIcon, horizontalAlignment: string);
    constructor(text: string, horizontalAlignment: string);
    constructor(text: string, icon: JSIcon);
    constructor(text: string, icon: JSIcon, horizontalAlignment: string);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSLabel");
        this.setStyle("display", "inline-block");
        this.setIconTextGap(4);
        
        switch (arguments.length) {
        case 1:
            // constructor(icon: JSIcon);
            // constructor(text: string);
            if (arguments[0] instanceof JSIcon) {
                var icon: JSIcon = arguments[0];
                this.setIcon(icon);
            } else if (typeof arguments[0] === "string") {
                var text: string = arguments[0];
                this.setText(text);
            }
            break;
        case 2:
            // constructor(icon: JSIcon, horizontalAlignment: string);
            // constructor(text: string, horizontalAlignment: string);
            // constructor(text: string, icon: JSIcon);
            if (arguments[0] instanceof JSIcon && typeof arguments[1] === "string") {
                var icon: JSIcon = arguments[0];
                var horizontalAlignment: string = arguments[1];
                this.setIcon(icon);
                this.setHorizontalAlignment(horizontalAlignment);
            } else if (typeof arguments[0] === "string" && typeof arguments[1] === "string") {
                var text: string = arguments[0];
                var horizontalAlignment: string = arguments[1];
                this.setText(text);
                this.setHorizontalAlignment(horizontalAlignment);
            } else if (typeof arguments[0] === "string" && arguments[1] instanceof JSIcon) {
                var text: string = arguments[0];
                var icon: JSIcon = arguments[1];
                this.setText(text);
                this.setIcon(icon);
            }
            break;
        case 3:
            // constructor(text: string, icon: JSIcon, horizontalAlignment: string);
            if (typeof arguments[0] === "string" && arguments[1] instanceof JSIcon && typeof arguments[2] === "string") {
                var text: string = arguments[0];
                var icon: JSIcon = arguments[1];
                var horizontalAlignment: string = arguments[2];
                this.setText(text);
                this.setIcon(icon);
                this.setHorizontalAlignment(horizontalAlignment);
            }
            break;
        default:
        }
    }
}
