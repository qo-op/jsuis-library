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
        this.setStyle("display", "inline-block");
    }
    init(): void {
        this.addClass("JSPathIcon");
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
    setWidth(width: number): void;
    setWidth(width: string): void;
    // overload
    setWidth(width: number | string): void {
        var graphics: JSGraphics = this.getGraphics();
        if (typeof width === "number") {
            graphics.setWidth(width);
            super.setWidth(width);
        } else {
            graphics.setWidth(width);
            super.setWidth(width);
        }
    }
    setHeight(height: number): void;
    setHeight(height: string): void;
    // overload
    setHeight(height: number | string): void {
        var graphics: JSGraphics = this.getGraphics();
        if (typeof height === "number") {
            graphics.setHeight(height);
        } else {
            graphics.setHeight(height);
        }
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