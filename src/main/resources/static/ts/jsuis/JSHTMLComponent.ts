/// <reference path = "../jsuis.ts"/>
class JSHTMLComponent extends JSComponent {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(element?: HTMLElement) {
        // constructor();
        // constructor(element: HTMLElement);
        super(element);
    }
    init(): void {
        this.addClass("JSHTMLComponent");
    }
    getX(): number {
        return +this.getComputedStyle("left").replace("px", "");
    }
    setX(x: number): void;
    setX(x: string): void;
    // overload;
    setX(x: number | string): void {
        if (typeof x === "number") {
            this.setStyle("left", x + "px");
        } else {
            this.setStyle("left", x);
        }
    }
    getY(): number {
        return +this.getComputedStyle("top").replace("px", "");
    }
    setY(y: number): void;
    setY(y: string): void;
    // overload;
    setY(y: number | string): void {
        if (typeof y === "number") {
            this.setStyle("top", y + "px");
        } else {
            this.setStyle("top", y);
        }
    }
    getWidth(): number {
        return this.width || this.element.getBoundingClientRect().width - this.getBorderLeftWidth() - this.getPaddingLeft() - this.getPaddingRight() - this.getBorderRightWidth();
    }
    setWidth(width: number): void;
    setWidth(width: string): void;
    // overload
    setWidth(width: number | string): void {
        if (typeof width === "number") {
            this.oldWidth = this.width;
            this.setStyle("width", width + "px");
            this.width = width;
        } else {
            this.setStyle("width", width);
        }
    }
    getHeight(): number {
        return this.height || this.element.getBoundingClientRect().height - this.getBorderTopWidth() - this.getPaddingTop() - this.getPaddingBottom() - this.getBorderBottomWidth();
    }
    setHeight(height: number): void;
    setHeight(height: string): void;
    // overload
    setHeight(height: number | string): void {
        if (typeof height === "number") {
            this.oldHeight = this.height;
            this.setStyle("height", height + "px");
            this.height = height;
        } else {
            this.setStyle("height", height);
        }
    }
    getOuterWidth(): number {
        return this.getWidth() +
            this.getMarginLeft() + this.getBorderLeftWidth() + this.getPaddingLeft() +
            this.getPaddingRight() + this.getBorderRightWidth() + this.getMarginRight();
    }
    setOuterWidth(outerWidth: number) {
        this.setWidth(outerWidth -
            this.getMarginLeft() - this.getBorderLeftWidth() - this.getPaddingLeft() -
            this.getPaddingRight() - this.getBorderRightWidth() - this.getMarginRight());
    }
    getOuterHeight(): number {
        return this.getHeight() +
            this.getMarginTop() + this.getBorderTopWidth() + this.getPaddingTop() +
            this.getPaddingBottom() + this.getBorderBottomWidth() + this.getMarginBottom();
    }
    setOuterHeight(outerHeight: number) {
        this.setHeight(outerHeight -
            this.getMarginTop() - this.getBorderTopWidth() - this.getPaddingTop() -
            this.getPaddingBottom() - this.getBorderBottomWidth() - this.getMarginBottom());
    }
    getInsetTop(): number {
        return this.getPaddingTop();
    }
    getInsetLeft(): number {
        return this.getPaddingLeft();
    }
    getInsetBottom(): number {
        return this.getPaddingBottom();
    }
    getInsetRight(): number {
        return this.getPaddingRight();
    }
    isDisplayable(): boolean {
        return this.getStyle("display") !== "none";
    }
    getPreferredOuterWidth(): number {
        return this.getPreferredWidth() +
            this.getMarginLeft() + this.getBorderLeftWidth() + this.getPaddingLeft() +
            this.getPaddingRight() + this.getBorderRightWidth() + this.getMarginRight();
    }
    getPreferredOuterHeight(): number {
        return this.getPreferredHeight() +
            this.getMarginTop() + this.getBorderTopWidth() + this.getPaddingTop() +
            this.getPaddingBottom() + this.getBorderBottomWidth() + this.getMarginBottom();
    }
    getMarginTop(): number {
        return +this.getComputedStyle("margin-top").replace("px", "");
    }
    getMarginLeft(): number {
        return +this.getComputedStyle("margin-left").replace("px", "");
    }
    getMarginBottom(): number {
        return +this.getComputedStyle("margin-bottom").replace("px", "");
    }
    getMarginRight(): number {
        return +this.getComputedStyle("margin-right").replace("px", "");
    }
    getBorderTopWidth(): number {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        } else {
            return +this.getComputedStyle("border-top-width").replace("px", "");
        }
    }
    getBorderLeftWidth(): number {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        } else {
            return +this.getComputedStyle("border-left-width").replace("px", "");
        }
    }
    getBorderBottomWidth(): number {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        } else {
            return +this.getComputedStyle("border-bottom-width").replace("px", "");
        }
    }
    getBorderRightWidth(): number {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        } else {
            return +this.getComputedStyle("border-right-width").replace("px", "");
        }
    }
    getPaddingTop(): number {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        } else {
            return +this.getComputedStyle("padding-top").replace("px", "");
        }
    }
    getPaddingLeft(): number {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        } else {
            return +this.getComputedStyle("padding-left").replace("px", "");
        }
    }
    getPaddingBottom(): number {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        } else {
            return +this.getComputedStyle("padding-bottom").replace("px", "");
        }
    }
    getPaddingRight(): number {
        var boxSizing = this.getComputedStyle("box-sizing");
        if (boxSizing === "border-box") {
            return 0;
        } else {
            return +this.getComputedStyle("padding-right").replace("px", "");
        }
    }
    getBackground(): string {
        return this.getStyle("background-color");
    }
    setBackground(background: string) {
        this.setStyle("background-color", background);
    }
    getForeground(): string {
        return this.getStyle("color");
    }
    setForeground(foreground: string) {
        this.setStyle("color", foreground);
    }
    getText(): string {
        return this.element.textContent;
    }
    setText(text: string) {
        if (text) {
            var s: string = text.trim().toLowerCase();
            if (s.indexOf("<html>") === 0 && s.indexOf("</html>", s.length - "</html>".length) !== -1) {
                this.element.innerHTML = text;
                return;
            }
        }
        this.element.textContent = text;
    }
    getCursor(): string {
        return this.getStyle("cursor");
    }
    setCursor(cursor: string) {
        this.setStyle("cursor", cursor);
    }
}