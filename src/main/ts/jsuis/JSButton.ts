/// <reference path = "../jsuis.ts"/>
/**
 * JSButton
 * 
 * @author Yassuo Toda
 */
class JSButton extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(action: JSAction);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(text: string, icon: JSIcon);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLButtonElement) ? document.createElement("button") : args[0]);
        this.setStyle("white-space", "nowrap");
        var graphics: JSButtonGraphics = this.getGraphics();
        this.add(graphics);
        var span: JSButtonSpan = this.getSpan();
        this.add(span);
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
    getGraphics(): JSButtonGraphics {
        var graphics: JSButtonGraphics = this.getData("graphics");
        if (!graphics) {
            graphics = new JSButtonGraphics();
            this.setData("graphics", graphics);
        }
        return graphics;
    }
    getSpan(): JSButtonSpan {
        var span: JSButtonSpan = this.getData("span");
        if (!span) {
            span = new JSButtonSpan();
            this.setData("span", span);
        }
        return span;
    }
    setIcon(icon: JSIcon) {
        super.setIcon(icon);
        var span: JSButtonSpan = this.getSpan();
        var text: string = span.getText();
        span.setStyle("margin-left", (icon && text) ? "4px" : "0");
    }
    getText(): string {
        var span: JSButtonSpan = this.getSpan();
        return span.getText();
    }
    setText(text: string) {
        var span: JSButtonSpan = this.getSpan();
        span.setText(text);
        var icon = this.getIcon();
        span.setStyle("margin-left", (icon && text) ? "4px" : "0");
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