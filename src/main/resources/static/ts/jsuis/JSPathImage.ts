/// <reference path = "../jsuis.ts"/>
/**
 * JSPathImage
 * 
 * @author Yassuo Toda
 */
class JSPathImage extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(pathDefinition: string);
    constructor(pathIcon: JSPathIcon);
    constructor(width: number, height: number);
    constructor(pathDefinition: string, width: number, height: number);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        var graphics: JSGraphics = this.getGraphics();
        if (!graphics) {
            graphics = new JSGraphics();
            this.add(graphics);
            this.setGraphics(graphics);
        }
        var path: JSPath = this.getPath();
        if (!path) {
            path = new JSPath();
            graphics.add(path);
            this.setPath(path);
        }
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLDivElement);
            // constructor(pathDefinition: string);
            // constructor(pathIcon: JSPathIcon);
            if (args[0] instanceof HTMLDivElement) {
            } else if (typeof args[0] === "string") {
                var pathDefinition: string = args[0];
                this.setPathDefinition(pathDefinition);
            } else if (args[0] instanceof JSPathIcon) {
                var pathIcon: JSPathIcon = args[0];
                var pathDefinition: string = pathIcon.getSource();
                var width: number = pathIcon.getIconWidth();
                var height: number = pathIcon.getIconHeight();
                var background: string = pathIcon.getBackground();
                var foreground: string = pathIcon.getForeground();
                this.setPathDefinition(pathDefinition);
                this.setWidth(width);
                this.setHeight(height);
                this.setBackground(background);
                this.setForeground(foreground);
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
            // constructor(pathDefinition: string, width: number, height: number);
            if (typeof args[0] === "string" && typeof args[1] === "number" && typeof args[2] === "number") {
                var pathDefinition: string = args[0];
                var width: number = args[1];
                var height: number = args[2];
                this.setPathDefinition(pathDefinition);
                this.setWidth(width);
                this.setHeight(height);
            }
            break;
        default:
        }
        this.setStyle("display", "inline-block");
        this.setStyle("font-size", "0");
        this.setClass("JSPathImage");
    }
    getGraphics(): JSGraphics {
        return this.getData("graphics");
    }
    setGraphics(graphics: JSGraphics) {
        this.setData("graphics", graphics);
    }
    getPath(): JSPath {
        return this.getData("path");
    }
    setPath(path: JSPath) {
        this.setData("path", path);
    }
    
    getWidth(): number {
        var graphics: JSGraphics = this.getGraphics();
        return graphics.getWidth();
    }
    setWidth(pixels: number, percent?: number) {
        var graphics: JSGraphics = this.getGraphics();
        graphics.setWidth(pixels);
    }
    getHeight(): number {
        var graphics: JSGraphics = this.getGraphics();
        return graphics.getHeight();
    }
    setHeight(pixels: number) {
        var graphics: JSGraphics = this.getGraphics();
        graphics.setHeight(pixels);
    }
    
    getPathDefinition(): string {
        var path: JSPath = this.getPath();
        return path.getPathDefinition();
    }
    setPathDefinition(pathDefinition: string) {
        var path: JSPath = this.getPath();
        path.setPathDefinition(pathDefinition);
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
}