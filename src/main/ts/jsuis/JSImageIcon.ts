/// <reference path = "../jsuis.ts"/>
/**
 * JSImageIcon
 * 
 * @author Yassuo Toda
 */
class JSImageIcon extends JSIcon {
    
    source: string;
    
    constructor();
    constructor(source: string);
    constructor(source: string, iconWidth: number, iconHeight: number);
    // overload
    constructor(...args: any[]) {
        // constructor();
        super();
        switch (args.length) {
        case 1:
            // constructor(source: string);
            if (typeof args[0] === "string") {
                var source: string = args[0];
                this.setSource(source);
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
    paintIcon(component: JSComponent, graphics: JSComponent) {
        var source: string = this.getSource();
        var iconWidth: number = this.getIconWidth();
        var iconHeight: number = this.getIconHeight();
        var image: JSImage = new JSImage(source, iconWidth, iconHeight);
        var name: string = this.getName();
        if (name) {
            image.setName(name);
        }
        graphics.removeAll();
        graphics.add(image);
    }
}
