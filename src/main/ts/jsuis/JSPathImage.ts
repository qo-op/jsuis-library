/// <reference path = "../jsuis.ts"/>
/**
 * JSPathImage
 * 
 * @author Yassuo Toda
 */
class JSPathImage extends JSSVG {
    
    constructor();
    constructor(element: SVGSVGElement);
    // constructor(icon: JSIcon);
    constructor(source: string);
    constructor(source: string, width: number, height: number);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: SVGSVGElement);
        super(args.length === 0 || !(args[0] instanceof SVGSVGElement) ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : args[0]);
        this.setUI("JSPathImage");
        
        var index: number = 0;
        
        var path: JSPath = this.getPath();
        this.add(path, null, index++);
        
        switch (args.length) {
        case 1:
            // constructor(icon: JSPathIcon);
            // constructor(source: string);
            if (args[0] instanceof JSPathIcon) {
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
    getPath(): JSPath {
        var path = this.getData("path");
        if (!path) {
            var element: SVGElement = <SVGElement> this.getChild("JSPath");
            if (element) {
                path = new JSPath(element);
            } else {
                path = new JSPath();
            }
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
    getName(): string {
        var path: JSPath = this.getPath();
        return path.getName();
    }
    setName(name: string) {
        var path: JSPath = this.getPath();
        path.setName(name);
    }
    getFill(): string {
        var path: JSPath = this.getPath();
        return path.getFill();
    }
    setFill(fill: string) {
        var path: JSPath = this.getPath();
        path.setFill(fill);
    }
    getStroke(): string {
        var path: JSPath = this.getPath();
        return path.getStroke();
    }
    setStroke(stroke: string) {
        var path: JSPath = this.getPath();
        path.setStroke(stroke);
    }
}