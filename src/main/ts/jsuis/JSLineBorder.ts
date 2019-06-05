/// <reference path = "../jsuis.ts"/>
/**
 * JSLineBorder
 * 
 * @author Yassuo Toda
 */
class JSLineBorder implements Border {
    
    color: string;
    thickness: number = 1;
    
    constructor(color: string);
    constructor(color: string, thickness: number);
    // overload
    constructor(...args: any[]) {
        // constructor(color: string);
        // constructor(color: string, thickness: number);
        switch (args.length) {
        case 1:
            if (typeof args[0] === "string") {
                var color: string = args[0];
                this.setColor(color);
            }
            break;
        case 2:
            if (typeof args[0] === "string" && typeof args[1] === "number") {
                var color: string = args[0];
                var thickness: number = args[1];
                this.setColor(color);
                this.setThickness(thickness);
            }
            break;
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
    paintBorder(component: JSComponent): void {
        var color = this.getColor();
        var thickness = this.getThickness();
        component.setStyle("border", thickness + "px solid " + color);
    }
}
