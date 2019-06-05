/// <reference path = "../jsuis.ts"/>
/**
 * JSLabel
 * 
 * @author Yassuo Toda
 */
class JSLabel extends JSHTMLComponent {

    constructor();
    constructor(element: HTMLElement);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(icon: JSIcon, horizontalAlignment: string);
    constructor(text: string, horizontalAlignment: string);
    constructor(text: string, icon: JSIcon);
    constructor(text: string, icon: JSIcon, horizontalAlignment: string);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setStyle("display", "inline-block");
        this.setStyle("white-space", "nowrap");
        
        var index: number = 0;
        
        var graphics: JSLabelGraphics = this.getGraphics();
        this.add(graphics, null, index++);
        
        var span: JSLabelSpan = this.getSpan();
        this.add(span, null, index++);
        
        switch (args.length) {
        case 1:
            // constructor(icon: JSIcon);
            // constructor(text: string);
            if (args[0] instanceof JSIcon) {
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
    getGraphics(): JSLabelGraphics {
        var graphics: JSLabelGraphics = this.getData("graphics");
        if (!graphics) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSLabelGraphics");
            if (element) {
                graphics = new JSLabelGraphics(element);
            } else {
                graphics = new JSLabelGraphics();
            }
            this.setData("graphics", graphics);
        }
        return graphics;
    }
    getSpan(): JSLabelSpan {
        var span: JSLabelSpan = this.getData("label");
        if (!span) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSLabelSpan");
            if (element) {
                span = new JSLabelSpan(element);
            } else {
                span = new JSLabelSpan();
            }
            this.setData("label", span);
        }
        return span;
    }
    setIcon(icon: JSIcon) {
        super.setIcon(icon);
        var span: JSLabelSpan = this.getSpan();
        var text: string = span.getText();
        span.setStyle("margin-left", (icon && text) ? (this.getIconTextGap() + "px") : "0");
    }
    getText(): string {
        var span: JSLabelSpan = this.getSpan();
        return span.getText();
    }
    setText(text: string) {
        var span: JSLabelSpan = this.getSpan();
        span.setText(text);
        var icon = this.getIcon();
        span.setStyle("margin-left", (icon && text) ? (this.getIconTextGap() + "px") : "0");
    }
    getIconTextGap(): number {
        return this.getData("iconTextGap") || 4;
    }
    setIconTextGap(iconTextGap: number) {
        this.setData("iconTextGap", iconTextGap);
        var icon = this.getIcon();
        if (icon) {
            var span: JSLabelSpan = this.getSpan();
            var text: string = span.getText();
            if (text) {
                span.setStyle("margin-left", this.getIconTextGap() + "px");
            }
        }
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