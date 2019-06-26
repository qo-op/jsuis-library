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
        this.setUI("JSButton");
        
        var index: number = 0;
        
        var graphics: JSButtonGraphics = this.getGraphics();
        this.add(graphics, null, index++);
        
        var textComponent: JSButtonText = this.getTextComponent();
        this.add(textComponent, null, index++);
        
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
    getGraphics(): JSButtonGraphics {
        var graphics: JSButtonGraphics = this.getData("graphics");
        if (!graphics) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSButtonGraphics");
            if (element) {
                graphics = new JSButtonGraphics(element);
            } else {
                graphics = new JSButtonGraphics();
            }
            this.setData("graphics", graphics);
        }
        return graphics;
    }
    getTextComponent(): JSButtonText {
        var textComponent: JSButtonText = this.getData("textComponent");
        if (!textComponent) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSButtonText");
            if (element) {
                textComponent = new JSButtonText(element);
            } else {
                textComponent = new JSButtonText();
            }
            this.setData("textComponent", textComponent);
        }
        return textComponent;
    }
    setIcon(icon: JSIcon) {
        super.setIcon(icon);
        var text: string = this.getText();
        var graphics: JSButtonGraphics = this.getGraphics();
        var verticalTextPosition: string = this.getVerticalTextPosition();
        switch (verticalTextPosition) {
        case JSButton.TOP:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-top", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSButton.BOTTOM:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-bottom", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSButton.CENTER:
        default:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-right", (icon && text) ? (this.getIconTextGap() + "px") : "0");
        }
    }
    getText(): string {
        var textComponent: JSButtonText = this.getTextComponent();
        return textComponent.getText();
    }
    setText(text: string) {
        var textComponent: JSButtonText = this.getTextComponent();
        textComponent.setText(text);
        var icon = this.getIcon();
        var graphics: JSButtonGraphics = this.getGraphics();
        var verticalTextPosition: string = this.getVerticalTextPosition();
        switch (verticalTextPosition) {
        case JSButton.TOP:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-top", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSButton.BOTTOM:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-bottom", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSButton.CENTER:
        default:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-right", (icon && text) ? (this.getIconTextGap() + "px") : "0");
        }
    }
    getIconTextGap(): number {
        return this.getData("iconTextGap") || 4;
    }
    setIconTextGap(iconTextGap: number) {
        this.setData("iconTextGap", iconTextGap);
        var icon = this.getIcon();
        if (icon) {
            var text: string = this.getText();
            if (text) {
                var graphics: JSButtonGraphics = this.getGraphics();
                var verticalTextPosition: string = this.getVerticalTextPosition();
                switch (verticalTextPosition) {
                case JSButton.TOP:
                    graphics.setStyle("margin", "0");
                    graphics.setStyle("margin-top", this.getIconTextGap() + "px");
                    break;
                case JSButton.BOTTOM:
                    graphics.setStyle("margin", "0");
                    graphics.setStyle("margin-bottom", this.getIconTextGap() + "px");
                    break;
                case JSButton.CENTER:
                default:
                    graphics.setStyle("margin", "0");
                    graphics.setStyle("margin-right", this.getIconTextGap() + "px");
                }
            }
        }
    }
    getVerticalTextPosition(): string {
        return this.getData("verticalTextPosition") || JSButton.CENTER;
    }
    setVerticalTextPosition(verticalTextPosition: string) {
        this.setData("verticalTextPosition", verticalTextPosition);
        var text: string = this.getText();
        var icon = this.getIcon();
        var graphics: JSButtonGraphics = this.getGraphics();
        switch (verticalTextPosition) {
        case JSButton.TOP:
            graphics.removeClass("top");
            graphics.addClass("bottom");
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-top", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSButton.BOTTOM:
            graphics.removeClass("bottom");
            graphics.addClass("top");
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-bottom", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSButton.CENTER:
        default:
            graphics.removeClass("top");
            graphics.removeClass("bottom");
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-right", (icon && text) ? (this.getIconTextGap() + "px") : "0");
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
    isEnabled(): boolean {
        return !(<HTMLButtonElement> this.element).disabled;
    }
    setEnabled(enabled: boolean) {
        (<HTMLButtonElement> this.element).disabled = !enabled;
    }
}