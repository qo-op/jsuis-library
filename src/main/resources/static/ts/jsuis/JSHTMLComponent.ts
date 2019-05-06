/// <reference path = "../jsuis.ts"/>
/**
 * JSHTMLComponent
 * 
 * @author Yassuo Toda
 */
class JSHTMLComponent extends JSComponent {
    
    constructor(element: HTMLElement) {
        super(element);
    }
    init(): void {
        this.addClass("JSHTMLComponent");
    }
    getX(): number {
        return +this.getComputedStyle("left").replace("px", "");
    }
    getY(): number {
        return +this.getComputedStyle("top").replace("px", "");
    }
    getWidth(): number {
        return this.element.getBoundingClientRect().width - this.getBorderLeftWidth() - this.getPaddingLeft() - this.getPaddingRight() - this.getBorderRightWidth();
    }
    getHeight(): number {
        return this.element.getBoundingClientRect().height - this.getBorderTopWidth() - this.getPaddingTop() - this.getPaddingBottom() - this.getBorderBottomWidth();
    }
    getOuterWidth(): number {
        return this.getWidth() +
            this.getMarginLeft() + this.getBorderLeftWidth() + this.getPaddingLeft() +
            this.getPaddingRight() + this.getBorderRightWidth() + this.getMarginRight();
    }
    getOuterHeight(): number {
        return this.getHeight() +
            this.getMarginTop() + this.getBorderTopWidth() + this.getPaddingTop() +
            this.getPaddingBottom() + this.getBorderBottomWidth() + this.getMarginBottom();
    }
    
    protected setXPixels(xPixels: number) {
        super.setXPixels(xPixels);
        var xPercent = this.getXPercent();
        if (xPercent) {
            this.setStyle("left", "calc(" + xPercent + "% + " + xPixels + "px)");
        } else {
            this.setStyle("left", xPixels + "px");
        }
    }
    protected setYPixels(yPixels: number) {
        super.setYPixels(yPixels);
        var yPercent = this.getYPercent();
        if (yPercent) {
            this.setStyle("top", "calc(" + yPercent + "% + " + yPixels + "px)");
        } else {
            this.setStyle("top", yPixels + "px");
        }
    }
    protected setXPercent(xPercent: number) {
        super.setXPercent(xPercent);
        var xPixels = this.getXPixels();
        if (xPixels) {
            this.setStyle("left", "calc(" + xPercent + "% + " + xPixels + "px)");
        } else {
            this.setStyle("left", xPercent + "%");
        }
    }
    protected setYPercent(yPercent: number) {
        super.setYPercent(yPercent);
        var yPixels = this.getYPixels();
        if (yPixels) {
            this.setStyle("top", "calc(" + yPercent + "% + " + yPixels + "px)");
        } else {
            this.setStyle("top", yPercent + "%");
        }
    }
    protected setWidthPixels(widthPixels: number) {
        super.setWidthPixels(widthPixels);
        var widthPercent = this.getWidthPercent();
        if (widthPercent) {
            this.setStyle("width", "calc(" + widthPercent + "% + " + widthPixels + "px)");
        } else {
            this.setStyle("width", widthPixels + "px");
        }
    }
    protected setHeightPixels(heightPixels: number) {
        super.setHeightPixels(heightPixels);
        var heightPercent = this.getHeightPercent();
        if (heightPercent) {
            this.setStyle("height", "calc(" + heightPercent + "% + " + heightPixels + "px)");
        } else {
            this.setStyle("height", heightPixels + "px");
        }
    }
    protected setWidthPercent(widthPercent: number) {
        super.setWidthPercent(widthPercent);
        var widthPixels = this.getWidthPixels();
        if (widthPixels) {
            this.setStyle("width", "calc(" + widthPercent + "% + " + widthPixels + "px)");
        } else {
            this.setStyle("width", widthPercent + "%");
        }
    }
    protected setHeightPercent(heightPercent: number) {
        super.setHeightPercent(heightPercent);
        var heightPixels = this.getHeightPixels();
        if (heightPixels) {
            this.setStyle("height", "calc(" + heightPercent + "% + " + heightPixels + "px)");
        } else {
            this.setStyle("height", heightPercent + "%");
        }
    }
    protected getOuterWidthPixels(): number {
        return this.getWidthPixels() +
            this.getMarginLeft() + this.getBorderLeftWidth() + this.getPaddingLeft() +
            this.getPaddingRight() + this.getBorderRightWidth() + this.getMarginRight();
    }
    protected setOuterWidthPixels(outerWidthPixels: number) {
        this.setWidthPixels(outerWidthPixels -
            this.getMarginLeft() - this.getBorderLeftWidth() - this.getPaddingLeft() -
            this.getPaddingRight() - this.getBorderRightWidth() - this.getMarginRight());
    }
    protected getOuterHeightPixels(): number {
        return this.getHeightPixels() +
            this.getMarginTop() + this.getBorderTopWidth() + this.getPaddingTop() +
            this.getPaddingBottom() + this.getBorderBottomWidth() + this.getMarginBottom();
    }
    protected setOuterHeightPixels(outerHeightPixels: number) {
        this.setHeightPixels(outerHeightPixels -
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