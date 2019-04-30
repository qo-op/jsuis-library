/// <reference path = "../jsuis.ts"/>
/**
 * JSPathImage
 * 
 * @author Yassuo Toda
 */
class JSPathImage extends JSGraphics {
    
    constructor();
    constructor(element: SVGSVGElement);
    constructor(icon: JSPathIcon);
    constructor(source: string);
    constructor(source: string, width: number, height: number);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof SVGSVGElement) ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : args[0]);
        this.setClass("JSPathImage");
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: SVGSVGElement);
            // constructor(icon: JSPathIcon);
            // constructor(source: string);
            if (args[0] instanceof SVGSVGElement) {
            } else if (args[0] instanceof JSPathIcon) {
                var icon: JSPathIcon = args[0];
                this.setIcon(icon);
            } else if (typeof args[0] === "string") {
                var source: string = args[0];
                this.setSource(source);
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
    }
    setIcon(icon: JSPathIcon) {
        var source: string = icon.getSource();
        if (source !== undefined) {
            this.setSource(source);
        }
        var iconWidth: number = icon.getIconWidth();
        if (iconWidth !== undefined) {
            this.setWidth(iconWidth);
        }
        var iconHeight: number = icon.getIconHeight();
        if (iconHeight !== undefined) {
            this.setHeight(iconHeight);
        }
        var background: string = icon.getBackground();
        if (background !== undefined) {
            this.setBackground(background);
        }
        var foreground: string = icon.getForeground();
        if (foreground !== undefined) {
            this.setForeground(foreground);
        }
    }
    getPath(): JSPath {
        var path = this.getData("path");
        if (!path) {
            path = new JSPath();
            this.add(path);
            this.setData("path", path);
        }
        return path;
    }
    getSource(): string {
        var path: JSPath = this.getPath();
        return path.getDefinition();
    }
    setSource(source: string) {
        var path: JSPath = this.getPath();
        path.setDefinition(source);
    }
    getBackground(): string {
        var path = this.getPath();
        return path.getBackground();
    }
    setBackground(background: string) {
        var path = this.getPath();
        path.setBackground(background);
    }
    getForeground(): string {
        var path = this.getPath();
        return path.getForeground();
    }
    setForeground(foreground: string) {
        var path = this.getPath();
        path.setForeground(foreground);
    }
    getPreferredWidth(): number {
        return this.getWidth();
    }
    getPreferredHeight(): number {
        return this.getHeight();
    }
}