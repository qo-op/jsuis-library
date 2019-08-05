/// <reference path = "../jsuis.ts"/>
/**
 * JSIcon
 * 
 * @author Yassuo Toda
 */
class JSIcon {
    
    iconWidth: number;
    iconHeight: number;
    name: string;
    
    constructor();
    constructor(iconWidth: number, iconHeight: number);
    // overload
    constructor() {
        // constructor();
        switch (arguments.length) {
        case 2:
            // constructor(iconWidth: number, iconHeight: number);
            if (typeof arguments[0] === "number" && typeof arguments[1] === "number") { 
                var iconWidth: number = arguments[0];
                var iconHeight: number = arguments[1];
                this.setIconWidth(iconWidth);
                this.setIconHeight(iconHeight);
            }
            break;
        default:
        }
    }
    getIconWidth(): number {
        return this.iconWidth;
    }
    setIconWidth(iconWidth: number) {
        this.iconWidth = iconWidth;
    }
    getIconHeight(): number {
        return this.iconHeight;
    }
    setIconHeight(iconHeight: number) {
        this.iconHeight = iconHeight;
    }
    paintIcon(component: JSComponent, graphics: JSComponent) {
    }
    getName(): string {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }
    withName(name: string) {
        this.setName(name);
        return this;
    }
}