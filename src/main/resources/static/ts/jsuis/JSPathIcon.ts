/// <reference path = "../jsuis.ts"/>
class JSPathIcon extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(width: number, height: number);
    constructor(pathDefinition: string);
    constructor(pathDefinition: string, width: number, height: number);
    // overload
    constructor(elementOrWidthOrPathDefinition?: HTMLDivElement | number | string, heightOrWidth?: number, height?: number) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(elementOrWidthOrPathDefinition === undefined || !(elementOrWidthOrPathDefinition instanceof HTMLDivElement) ? document.createElement("div") : elementOrWidthOrPathDefinition);
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
        if (elementOrWidthOrPathDefinition !== undefined && !(elementOrWidthOrPathDefinition instanceof HTMLDivElement)) {
            if (typeof elementOrWidthOrPathDefinition === "number") {
                // constructor(width: number, height: number);
                this.setWidth(elementOrWidthOrPathDefinition);
                this.setHeight(heightOrWidth);
            } else {
                // constructor(pathDefinition: string);
                // constructor(pathDefinition: string, width: number, height: number);
                this.setPathDefinition(elementOrWidthOrPathDefinition);
                if (heightOrWidth !== undefined) {
                    this.setWidth(heightOrWidth);
                    this.setHeight(height);
                }
            }
        }
    }
    init(): void {
        this.addClass("JSPathIcon");
        this.setStyle("display", "inline-block");
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
    setWidth(width: number) {
        var graphics: JSGraphics = this.getGraphics();
        graphics.setWidth(width);
        super.setWidth(width);
    }
    setHeight(height: number) {
        var graphics: JSGraphics = this.getGraphics();
        graphics.setHeight(height);
        super.setHeight(height);
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
    clone(): JSPathIcon {
        var clone = new JSPathIcon();
        clone.setWidth(this.getWidth());
        clone.setHeight(this.getHeight());
        clone.setPathDefinition(this.getPathDefinition());
        return clone;
    }
}