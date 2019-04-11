/// <reference path = "../jsuis.ts"/>
/**
 * JSImage
 * 
 * @author Yassuo Toda
 */
class JSImage extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLImageElement);
    constructor(icon: JSIcon);
    constructor(source: string);
    constructor(width: number, height: number);
    constructor(source: string, width: number, height: number);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLImageElement) ? document.createElement("img") : args[0]);
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLImageElement);
            // constructor(icon: JSIcon);
            // constructor(source: string);
            if (args[0] instanceof HTMLImageElement) {
            } else if (args[0] instanceof JSIcon) {
                var icon: JSIcon = args[0];
                this.setIcon(icon);
            } else if (typeof args[0] === "string") {
                var source: string = args[0];
                this.setSource(source);
            }
            break;
        case 2:
            // constructor(width: number, height: number);
            if (typeof args[0] === "number" && typeof args[1] === "number") {
                var width: number = args[0];
                var height: number = args[1];
                this.setWidth(width);
                this.setHeight(height);
            }
            break;
        case 3:
            // constructor(source: string, width: number, height: number);
            if (typeof args[0] === "string" && typeof args[1] === "number" && typeof args[2] === "number") {
                var source: string = args[0];
                var width: number = args[1];
                var height: number = args[2];
                this.setSource(source);
                this.setWidth(width);
                this.setHeight(height);
            }
            break;
        default:
        }
        this.setClass("JSImageIcon");
        this.setDraggable(false);
    }
    setIcon(icon: JSIcon) {
        var source = icon.getSource();
        if (source) {
            this.setSource(source);
        }
        var iconWidth = icon.getIconWidth();
        if (iconWidth) {
            this.setWidth(iconWidth);
        }
        var iconHeight = icon.getIconHeight();
        if (iconHeight) {
            this.setHeight(iconHeight);
        }
    }
    getSource(): string {
        return this.getAttribute("src");
    }
    setSource(source: string) {
        this.setAttribute("src", source);
    }
    getWidth(): number {
        return +this.getAttribute("width");
    }
    getHeight(): number {
        return +this.getAttribute("height");
    }
    
    protected setWidthPixels(widthPixels: number) {
        super.setWidthPixels(widthPixels);
        var widthPercent = this.getWidthPercent();
        if (widthPercent) {
            this.setStyle("width", "calc(" + widthPercent + "% + " + widthPixels + ")");
        } else {
            this.setStyle("width", widthPixels + "");
        }
    }
    protected setHeightPixels(heightPixels: number) {
        super.setHeightPixels(heightPixels);
        var heightPercent = this.getHeightPercent();
        if (heightPercent) {
            this.setStyle("height", "calc(" + heightPercent + "% + " + heightPixels + ")");
        } else {
            this.setStyle("height", heightPixels + "");
        }
    }
    protected setWidthPercent(widthPercent: number) {
        super.setWidthPercent(widthPercent);
        var widthPixels = this.getWidthPixels();
        if (widthPixels) {
            this.setStyle("width", "calc(" + widthPercent + "% + " + widthPixels + ")");
        } else {
            this.setStyle("width", widthPercent + "%");
        }
    }
    protected setHeightPercent(heightPercent: number) {
        super.setHeightPercent(heightPercent);
        var heightPixels = this.getHeightPixels();
        if (heightPixels) {
            this.setStyle("height", "calc(" + heightPercent + "% + " + heightPixels + ")");
        } else {
            this.setStyle("height", heightPercent + "%");
        }
    }
    
    getPreferredWidth(): number {
        var preferredWidth: string = this.getAttribute("data-preferred-width");
        if (preferredWidth) {
            return +preferredWidth;
        }
        return this.getWidth();
    }
    getPreferredHeight(): number {
        var preferredHeight: string = this.getAttribute("data-preferred-height");
        if (preferredHeight) {
            return +preferredHeight;
        }
        return this.getHeight();
    }
}