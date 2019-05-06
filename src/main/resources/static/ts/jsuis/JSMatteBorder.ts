/// <reference path = "../jsuis.ts"/>
/**
 * JSBorderLayout
 * 
 * @author Yassuo Toda
 */
class JSMatteBorder implements Border {
    
    top: number;
    left: number;
    bottom: number;
    right: number;
    color: string;
    
    constructor(top: number, left: number, bottom: number, right: number, color: string) {
        this.setTop(top);
        this.setLeft(left);
        this.setBottom(bottom);
        this.setRight(right);
        this.setColor(color);
    }
    getTop(): number {
        return this.top;
    }
    setTop(top: number) {
        this.top = top;
    }
    getLeft(): number {
        return this.left;
    }
    setLeft(left: number) {
        this.left = left;
    }
    getBottom(): number {
        return this.bottom;
    }
    setBottom(bottom: number) {
        this.bottom = bottom;
    }
    getRight(): number {
        return this.right;
    }
    setRight(right: number) {
        this.right = right;
    }
    getColor(): string {
        return this.color;
    }
    setColor(color: string) {
        this.color = color;
    }
    paintBorder(component: JSComponent): void {
        var top = this.getTop();
        var left = this.getLeft();
        var bottom = this.getBottom();
        var right = this.getRight();
        var color = this.getColor();
        if (top) {
            component.setStyle("border-top", top + "px solid " + color);
        }
        if (left) {
            component.setStyle("border-left", left + "px solid " + color);
        }
        if (bottom) {
            component.setStyle("border-bottom", bottom + "px solid " + color);
        }
        if (right) {
            component.setStyle("border-right", right + "px solid " + color);
        }
    }
}
