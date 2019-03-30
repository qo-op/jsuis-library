/// <reference path = "../jsuis.ts"/>
class JSImageIcon extends JSHTMLComponent {
    
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
        this.setStyle("-webkit-user-drag", "none");
    }
    init(): void {
        this.addClass("JSImageIcon");
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
        return this.width || +this.getAttribute("width");
    }
    setWidth(width: number): void;
    setWidth(width: string): void;
    // overload
    setWidth(width: number | string) {
        if (typeof width === "number") {
            this.oldWidth = this.width;
            this.setAttribute("width", "" + width);
            this.width = width;
        } else {
            this.setAttribute("width", width);
        }
    }
    getHeight(): number {
        return this.height || +this.getAttribute("height");
    }
    setHeight(height: number): void;
    setHeight(height: string): void;
    // overload
    setHeight(height: number | string) {
        if (typeof height === "number") {
            this.oldHeight = this.height;
            this.setAttribute("height", "" + height);
            this.height = height;
        } else {
            this.setAttribute("height", height);
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
    clone(): JSImageIcon {
        var clone = new JSImageIcon();
        clone.setSource(this.getSource());
        clone.setWidth(this.getWidth());
        clone.setHeight(this.getHeight());
        return clone;
    }
}