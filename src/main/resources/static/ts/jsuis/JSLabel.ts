/// <reference path = "../jsuis.ts"/>
/**
 * JSLabel
 * 
 * @author Yassuo Toda
 */
class JSLabel extends JSHTMLComponent {

    constructor();
    constructor(element: HTMLLabelElement);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(icon: JSIcon, horizontalAlignment: string);
    constructor(text: string, horizontalAlignment: string);
    constructor(text: string, icon: JSIcon);
    constructor(text: string, icon: JSIcon, horizontalAlignment: string);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLLabelElement) ? document.createElement("label") : args[0]);
        this.setStyle("font-size", "medium");
        this.setStyle("white-space", "nowrap");
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLLabelElement);
            // constructor(icon: JSIcon);
            // constructor(text: string);
            if (args[0] instanceof HTMLLabelElement) {
            } else if (args[0] instanceof JSIcon) {
                var icon: JSIcon = args[0];
                this.setIcon(icon);
            } else if (typeof args[0] === "string") {
                var text: string = args[0];
                this.setText(text);
            }
            break;
        case 2:
            // constructor(icon: JSIcon, horizontalAlignment: string);
            // constructor(text: string, horizontalAlignment: string);
            // constructor(text: string, icon: JSIcon);
            if (args[0] instanceof JSIcon && typeof args[1] === "string") {
                var icon: JSIcon = args[0];
                var horizontalAlignment: string = args[1];
                this.setIcon(icon);
                this.setStyle("text-align", horizontalAlignment);
            } else if (typeof args[0] === "string" && typeof args[1] === "string") {
                var text: string = args[0];
                var horizontalAlignment: string = args[1];
                this.setText(text);
                this.setStyle("text-align", horizontalAlignment);
            } else if (typeof args[0] === "string" && args[1] instanceof JSIcon) {
                var text: string = args[0];
                var icon: JSIcon = args[1];
                this.setText(text);
                this.setIcon(icon);
            }
            break;
        case 3:
            // constructor(text: string, icon: JSIcon, horizontalAlignment: string);
            if (typeof args[0] === "string" && args[1] instanceof JSIcon && typeof args[2] === "string") {
                var text: string = args[0];
                var icon: JSIcon = args[1];
                var horizontalAlignment: string = args[2];
                this.setText(text);
                this.setIcon(icon);
                this.setStyle("text-align", horizontalAlignment);
            }
            break;
        default:
        }
    }
    init(): void {
        this.addClass("JSLabel");
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
    getFor(): string {
        return this.getAttribute("for");
    }
    setFor(id: string) {
        this.setAttribute("for", id);
    }
}