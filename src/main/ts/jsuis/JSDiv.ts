/// <reference path = "../jsuis.ts"/>
/**
 * JSDiv
 * 
 * @author Yassuo Toda
 */
class JSDiv extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSDiv");
    }
    getWidth(): number {
        var parent: JSComponent = this.getParent();
        if (parent) {
            var boxSizing = this.getComputedStyle("box-sizing");
            if (boxSizing === "border-box") {
                return parent.getWidth();
            } else {
                return parent.getWidth() - this.getMarginLeft() - this.getBorderLeftWidth() - this.getPaddingLeft() -
                    this.getPaddingRight() - this.getBorderRightWidth() - this.getMarginRight();
            }
        }
        return super.getWidth();
    }
    setWidth(width: number): void {
        // this.setValidHorizontally(false);
        this.validateHorizontally();
    }
}
