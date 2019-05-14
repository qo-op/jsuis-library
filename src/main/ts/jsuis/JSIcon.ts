/// <reference path = "../jsuis.ts"/>
/**
 * JSIcon
 * 
 * @author Yassuo Toda
 */
class JSIcon {
    
    iconWidth: number;
    iconHeight: number;
    
    constructor();
    constructor(iconWidth: number, iconHeight: number);
    // overload
    constructor(...args: any[]) {
        // constructor();
        switch (args.length) {
        case 2:
            // constructor(iconWidth: number, iconHeight: number);
            if (typeof args[0] === "number" && typeof args[1] === "number") { 
                var iconWidth: number = args[0];
                var iconHeight: number = args[1];
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
    paintIcon(component: JSComponent, graphics: JSGraphics) {
    }
}