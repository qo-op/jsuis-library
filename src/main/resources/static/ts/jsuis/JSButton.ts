/// <reference path = "../jsuis.ts"/>
/**
 * JSButton
 * 
 * @author Yassuo Toda
 */
class JSButton extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLButtonElement);
    constructor(action: JSAction);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(text: string, icon: JSIcon);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLButtonElement) ? document.createElement("button") : args[0]);
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLButtonElement);
            // constructor(action: JSAction);
            // constructor(icon: JSIcon);
            // constructor(text: string);
            if (args[0] instanceof HTMLButtonElement) {
            } else if (args[0] instanceof JSAction) {
                var action: JSAction = args[0];
                this.setAction(action);
            } else if (args[0] instanceof JSIcon) {
                var icon: JSIcon = args[0];
                this.setIcon(icon);
            } else if (typeof args[0] === "string") {
                var text: string = args[0];
                this.setText(text);
            }
            break;
        case 2:
            // constructor(text: string, icon: JSIcon);
            if (typeof args[0] === "string" && args[1] instanceof JSIcon) {
                var text: string = args[0];
                var icon: JSIcon = args[1];
                this.setText(text);
                this.setIcon(icon);
            }
            break;
        default:
        }
    }
    init(): void {
        this.addClass("JSButton");
    }
    setIcon(icon: JSIcon) {
        super.setIcon(icon);
        var oldImage: JSComponent = this.getImage();
        if (oldImage) {
            this.remove(oldImage);
        }
        if (icon) {
            var image: JSComponent;
            if (icon instanceof JSPathIcon) {
                image = new JSPathImage(icon);
            } else {
                image = new JSImage(icon);
            }
            var text = this.getText();
            image.setStyle("margin-right", text ? "4px" : "0");
            this.add(image, null, 0);
            this.setImage(image);
        }
    }
    getText(): string {
        var span: JSSpan = this.getSpan();
        return span.getText();
    }
    setText(text: string) {
        var span: JSSpan = this.getSpan();
        span.setText(text);
        var image = this.getImage();
        if (image) {
            image.setStyle("margin-right", text ? "4px" : "0");
        }
    }
    getSpan(): JSSpan {
        var span = this.getData("span");
        if (!span) {
            span = new JSSpan();
            this.add(span);
            this.setData("span", span);
        }
        return span;
    }
    isUndecorated(): boolean {
        return this.hasClass("undecorated");
    }
    setUndecorated(undecorated: boolean) {
        if (undecorated) {
            this.addClass("undecorated");
        } else {
            this.removeClass("undecorated");
        }
    }
}