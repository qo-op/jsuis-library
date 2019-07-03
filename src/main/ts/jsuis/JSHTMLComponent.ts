/// <reference path = "../jsuis.ts"/>
/**
 * JSHTMLComponent
 * 
 * @author Yassuo Toda
 */
class JSHTMLComponent extends JSComponent {
    
    constructor(element: HTMLElement) {
        super(element);
        this.setUI("JSHTMLComponent");
    }
    getWidth(): number {
        var width = super.getWidth();
        if (width !== undefined) {
            return width;
        }
        return this.element.getBoundingClientRect().width - this.getBorderLeftWidth() - this.getPaddingLeft() - this.getPaddingRight() - this.getBorderRightWidth();
    }
    getHeight(): number {
        var height = super.getHeight();
        if (height !== undefined) {
            return height;
        }
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
    
    setX(x: number): void {
        super.setX(x);
        this.setStyle("left", x + "px");
    }
    setY(y: number): void {
        super.setY(y);
        this.setStyle("top", y + "px");
    }
    
    setWidth(width: number): void {
        this.setStyle("width", width + "px");
        super.setWidth(width);
    }
    setOuterWidth(outerWidth: number): void {
        this.setWidth(outerWidth - this.getMarginLeft() - this.getBorderLeftWidth() - this.getPaddingLeft() -
                this.getPaddingRight() - this.getBorderRightWidth() - this.getMarginRight());
    }
    setHeight(height: number): void {
        this.setStyle("height", height + "px");
        super.setHeight(height);
    }
    setOuterHeight(outerHeight: number): void {
        this.setHeight(outerHeight - this.getMarginTop() - this.getBorderTopWidth() - this.getPaddingTop() -
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
    setDisplayable(displayable: boolean) {
        if (!displayable) {
            this.setStyle("display", "none");
        }
    }
    
    getPreferredWidth(): number {
        var preferredWidth: string = this.getAttribute("data-preferred-width");
        if (preferredWidth) {
            return +preferredWidth;
        }
        var layout: JSLayout = this.getLayout();
        if (layout) {
            return layout.preferredLayoutWidth(this);
        }
        var cssWidth: string = this.getStyle("width");
        if (cssWidth) {
            this.removeStyle("width");
        }
        
        var width = this.element.getBoundingClientRect().width - this.getBorderLeftWidth() - this.getPaddingLeft() - this.getPaddingRight() - this.getBorderRightWidth();
        
        if (cssWidth) {
            this.setStyle("width", cssWidth);
        }
        return width;
    }
    getPreferredHeight(): number {
        var preferredHeight: string = this.getAttribute("data-preferred-height");
        if (preferredHeight) {
            return +preferredHeight;
        }
        var layout: JSLayout = this.getLayout();
        if (layout) {
            return layout.preferredLayoutHeight(this);
        }
        var cssHeight: string = this.getStyle("height");
        if (cssHeight) {
            this.removeStyle("height");
        }
        
        var height = this.element.getBoundingClientRect().height - this.getBorderTopWidth() - this.getPaddingTop() - this.getPaddingBottom() - this.getBorderBottomWidth();
        
        if (cssHeight) {
            this.setStyle("height", cssHeight);
        }
        return height;
    }
    
    getPreferredOuterWidth(): number {
        var preferredOuterWidth: number = this.getPreferredWidth();
        if (preferredOuterWidth === null) {
            return null;
        } else {
            return preferredOuterWidth +
                this.getMarginLeft() + this.getBorderLeftWidth() + this.getPaddingLeft() +
                this.getPaddingRight() + this.getBorderRightWidth() + this.getMarginRight();
        }
    }
    getPreferredOuterHeight(): number {
        var preferredOuterHeight: number = this.getPreferredHeight();
        if (preferredOuterHeight === null) {
            return null;
        } else {
            return preferredOuterHeight +
                this.getMarginTop() + this.getBorderTopWidth() + this.getPaddingTop() +
                this.getPaddingBottom() + this.getBorderBottomWidth() + this.getMarginBottom();
        }
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
    setMargin(top: number, left: number, bottom: number, right: number): void {
        this.setStyle("margin-top", top + "px");
        this.setStyle("margin-left", left + "px");
        this.setStyle("margin-bottom", bottom + "px");
        this.setStyle("margin-right", right + "px");
    }
    setPadding(top: number, left: number, bottom: number, right: number): void {
        this.setStyle("padding-top", top + "px");
        this.setStyle("padding-left", left + "px");
        this.setStyle("padding-bottom", bottom + "px");
        this.setStyle("padding-right", right + "px");
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
                // this.element.innerHTML = text;
                this.setHTML(text);
                return;
            }
        }
        this.element.textContent = text;
    }
    getHTML(): string {
        return this.element.innerHTML;
    }
    setHTML(html: string) {
        this.element.innerHTML = html;
    }
    getCursor(): string {
        return this.getStyle("cursor");
    }
    setCursor(cursor: string) {
        this.setStyle("cursor", cursor);
    }
}