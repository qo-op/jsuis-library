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
        // constructor();
        // constructor(element: HTMLButtonElement);
        super(args.length === 0 || !(args[0] instanceof HTMLButtonElement) ? document.createElement("button") : args[0]);
        var graphics: JSGraphics = this.getGraphics();
        this.add(graphics);
        switch (args.length) {
        case 1:
            // constructor(action: JSAction);
            // constructor(icon: JSIcon);
            // constructor(text: string);
            if (args[0] instanceof JSAction) {
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
        if (icon) {
            var span: JSSpan = this.getData("span");
            if (span) {
                var text: string = span.getText();
                span.setStyle("margin-left", text ? "4px" : "0");
            }
        }
    }
    getGraphics(): JSGraphics {
        var graphics: JSGraphics = this.getData("graphics");
        if (!graphics) {
            graphics = new JSGraphics();
            this.setData("graphics", graphics);
        }
        return graphics;
    }
    getText(): string {
        var span: JSSpan = this.getSpan();
        return span.getText();
    }
    setText(text: string) {
        var span: JSSpan = this.getSpan();
        span.setText(text);
        var icon = this.getIcon();
        if (icon) {
            span.setStyle("margin-left", text ? "4px" : "0");
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