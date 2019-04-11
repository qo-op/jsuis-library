/// <reference path = "../jsuis.ts"/>
/**
 * JSIcon
 * 
 * @author Yassuo Toda
 */
class JSIcon {
    
    source: string;
    iconWidth: number;
    iconHeight: number;
    
    constructor();
    constructor(source: string);
    constructor(iconWidth: number, iconHeight: number);
    constructor(source: string, iconWidth: number, iconHeight: number);
    // overload
    constructor(...args: any[]) {
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(source: string);
            if (typeof args[0] === "string") {
                var source: string = args[0];
                this.setSource(source);
            }
            break;
        case 2:
            // constructor(iconWidth: number, iconHeight: number);
            if (typeof args[0] === "number" && typeof args[1] === "number") {
                var iconWidth: number = args[0];
                var iconHeight: number = args[1];
                this.setIconWidth(iconWidth);
                this.setIconHeight(iconHeight);
            }
            break;
        case 3:
            // constructor(source: string, iconWidth: number, iconHeight: number);
            if (typeof args[0] === "string" && typeof args[1] === "number" && typeof args[2] === "number") {
                var source: string = args[0];
                var iconWidth: number = args[1];
                var iconHeight: number = args[2];
                this.setSource(source);
                this.setIconWidth(iconWidth);
                this.setIconHeight(iconHeight);
            }
            break;
        default:
        }
    }
    getSource(): string {
        return this.source;
    }
    setSource(source: string) {
        this.source = source;
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
}