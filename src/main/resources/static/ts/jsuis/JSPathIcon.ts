/// <reference path = "../jsuis.ts"/>
/**
 * JSPathIcon
 * 
 * @author Yassuo Toda
 */
class JSPathIcon extends JSIcon {
    
    background: string;
    foreground: string;
    
    constructor();
    constructor(source: string);
    constructor(iconWidth: number, iconHeight: number);
    constructor(source: string, iconWidth: number, iconHeight: number);
    constructor(source: string, background: string, foreground: string, iconWidth: number, iconHeight: number);
    // overload
    constructor(...args: any[]) {
        switch (args.length) {
        case 5:
            // constructor(source: string, background: string, foreground: string, iconWidth: number, iconHeight: number);
            if (typeof args[0] === "string" && typeof args[1] === "string" && typeof args[2] === "string" && typeof args[3] === "number" && typeof args[4] === "number") {
                var source: string = args[0];
                var background: string = args[1];
                var foreground: string = args[2];
                var iconWidth: number = args[3];
                var iconHeight: number = args[4];
                super(source, iconWidth, iconHeight);
                this.setBackground(background);
                this.setForeground(foreground);
            } else {
                JSIcon.apply(this, args);
            }
            break;
        default:
            JSIcon.apply(this, args);
        }
    }
    getBackground(): string {
        return this.background;
    }
    setBackground(background: string) {
        this.background = background;
    }
    getForeground(): string {
        return this.foreground;
    }
    setForeground(foreground: string) {
        this.foreground = foreground;
    }
}