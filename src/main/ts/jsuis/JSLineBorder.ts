/// <reference path = "../jsuis.ts"/>
/**
 * JSLineBorder
 * 
 * @author Yassuo Toda
 */
class JSLineBorder implements Border {
    
    color: string = "Black";
    thickness: number = 1;
    radius: number = 0;
    
    constructor();
    constructor(color: string);
    constructor(color: string, thickness: number);
    constructor(color: string, thickness: number, radius: number);
    // overload
    constructor() {
        switch (arguments.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(color: string);
            if (typeof arguments[0] === "string") {
                var color: string = arguments[0];
                this.setColor(color);
            }
            break;
        case 2:
            // constructor(color: string, thickness: number);
            if (typeof arguments[0] === "string" && typeof arguments[1] === "number") {
                var color: string = arguments[0];
                var thickness: number = arguments[1];
                this.setColor(color);
                this.setThickness(thickness);
            }
            break;
        case 3:
            // constructor(color: string, thickness: number, radius: number);
            if (typeof arguments[0] === "string" && typeof arguments[1] === "number" && typeof arguments[2] === "number") {
                var color: string = arguments[0];
                var thickness: number = arguments[1];
                var radius: number = arguments[2];
                this.setColor(color);
                this.setThickness(thickness);
                this.setRadius(radius);
            }
        default:
        }
    }
    getColor(): string {
        return this.color;
    }
    setColor(color: string) {
        this.color = color;
    }
    getThickness(): number {
        return this.thickness;
    }
    setThickness(thickness: number) {
        this.thickness = thickness;
    }
    getRadius(): number {
        return this.radius;
    }
    setRadius(radius: number) {
        this.radius = radius;
    }
    paintBorder(component: JSComponent): void {
        var thickness = this.getThickness();
        if (thickness) {
            var color = this.getColor();
            component.setStyle("border", thickness + "px solid " + color);
        }
        var radius = this.getRadius();
        if (radius) {
            component.setStyle("border-radius", radius + "px");
        }
    }
}
