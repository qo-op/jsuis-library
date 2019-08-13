/// <reference path = "../jsuis.ts"/>
/**
 * JSPathIcon
 * 
 * @author Yassuo Toda
 */
class JSPathIcon extends JSImageIcon {
    
    viewBox: string;
    fill: string;
    stroke: string;
    
    constructor();
    constructor(source: string);
    constructor(source: string, iconWidth: number, iconHeight: number);
    constructor(viewBox: string, source: string, iconWidth: number, iconHeight: number);
    // overload
    constructor() {
        // constructor();
        super();
        switch (arguments.length) {
        case 1:
            // constructor(source: string);
            if (typeof arguments[0] === "string") {
                var source: string = arguments[0];
                this.setSource(source);
            }
            break;
        case 3:
            // constructor(source: string, iconWidth: number, iconHeight: number);
            if (typeof arguments[0] === "string" && typeof arguments[1] === "number" && typeof arguments[2] === "number") {
                var source: string = arguments[0];
                var iconWidth: number = arguments[1];
                var iconHeight: number = arguments[2];
                this.setSource(source);
                this.setIconWidth(iconWidth);
                this.setIconHeight(iconHeight);
            }
            break;
        case 4:
            // constructor(viewBox: string, source: string, iconWidth: number, iconHeight: number);
            if (typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "number" && typeof arguments[3] === "number") {
                var viewBox: string = arguments[0];
                var source: string = arguments[1];
                var iconWidth: number = arguments[2];
                var iconHeight: number = arguments[3];
                this.setViewBox(viewBox);
                this.setSource(source);
                this.setIconWidth(iconWidth);
                this.setIconHeight(iconHeight);
            }
            break;
        default:
        }
    }
    
    getViewBox(): string {
        return this.viewBox;
    }
    setViewBox(viewBox: string) {
        this.viewBox = viewBox;
    }
    withViewBox(viewBox: string) {
        this.setViewBox(viewBox);
        return this;
    }
    getFill(): string {
        return this.fill;
    }
    setFill(fill: string) {
        this.fill = fill;
    }
    withFill(fill: string) {
        this.setFill(fill);
        return this;
    }
    getStroke(): string {
        return this.stroke;
    }
    setStroke(stroke: string) {
        this.stroke = stroke;
    }
    withStroke(stroke: string) {
        this.setStroke(stroke);
        return this;
    }
    paintIcon(component: JSComponent, graphics: JSComponent) {
        var source: string = this.getSource();
        var iconWidth: number = this.getIconWidth();
        var iconHeight: number = this.getIconHeight();
        var image: JSPathImage = new JSPathImage(source, iconWidth, iconHeight);
        var name: string = this.getName();
        if (name) {
            image.setName(name);
        }
        var fill: string = this.getFill();
        if (fill !== undefined) {
            image.setFill(fill);
        }
        var stroke: string = this.getStroke();
        if (stroke !== undefined) {
            image.setStroke(stroke);
        }
        var viewBox: string = this.getViewBox();
        if (viewBox !== undefined) {
            image.setViewBox(viewBox);
        }
        graphics.removeAll();
        graphics.add(image);
    }
}