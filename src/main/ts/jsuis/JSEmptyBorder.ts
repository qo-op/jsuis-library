/// <reference path = "../jsuis.ts"/>
/**
 * JSEmptyBorder
 * 
 * @author Yassuo Toda
 */
class JSEmptyBorder implements Border {
    
    top: number;
    left: number;
    bottom: number;
    right: number;
    
    constructor(top: number, left: number, bottom: number, right: number) {
        this.setTop(top);
        this.setLeft(left);
        this.setBottom(bottom);
        this.setRight(right);
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
    paintBorder(component: JSComponent): void {
        var top: number = this.getTop();
        var left: number = this.getLeft();
        var bottom: number = this.getBottom();
        var right: number = this.getRight();
        component.setStyle("padding", top + "px " + right + "px " + bottom + "px " + left + "px");
    }
}
