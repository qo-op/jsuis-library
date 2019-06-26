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
        this.setUI("JSLabel");
        
        var index: number = 0;
        
        var graphics: JSLabelGraphics = this.getGraphics();
        this.add(graphics, null, index++);
        
        var textComponent: JSLabelText = this.getTextComponent();
        this.add(textComponent, null, index++);
        
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
    getTextComponent(): JSLabelText {
        var textComponent: JSLabelText = this.getData("textComponent");
        if (!textComponent) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSLabelText");
            if (element) {
                textComponent = new JSLabelText(element);
            } else {
                textComponent = new JSLabelText();
            }
            this.setData("textComponent", textComponent);
        }
        return textComponent;
    }
    setIcon(icon: JSIcon) {
        super.setIcon(icon);
        var text: string = this.getText();
        var graphics: JSLabelGraphics = this.getGraphics();
        var verticalTextPosition: string = this.getVerticalTextPosition();
        switch (verticalTextPosition) {
        case JSLabel.TOP:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-top", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSLabel.BOTTOM:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-bottom", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSLabel.CENTER:
        default:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-right", (icon && text) ? (this.getIconTextGap() + "px") : "0");
        }
    }
    getText(): string {
        var textComponent: JSLabelText = this.getTextComponent();
        return textComponent.getText();
    }
    setText(text: string) {
        var textComponent: JSLabelText = this.getTextComponent();
        textComponent.setText(text);
        var icon = this.getIcon();
        var graphics: JSLabelGraphics = this.getGraphics();
        var verticalTextPosition: string = this.getVerticalTextPosition();
        switch (verticalTextPosition) {
        case JSLabel.TOP:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-top", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSLabel.BOTTOM:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-bottom", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSLabel.CENTER:
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
                var graphics: JSLabelGraphics = this.getGraphics();
                var verticalTextPosition: string = this.getVerticalTextPosition();
                switch (verticalTextPosition) {
                case JSLabel.TOP:
                    graphics.setStyle("margin", "0");
                    graphics.setStyle("margin-top", this.getIconTextGap() + "px");
                    break;
                case JSLabel.BOTTOM:
                    graphics.setStyle("margin", "0");
                    graphics.setStyle("margin-bottom", this.getIconTextGap() + "px");
                    break;
                case JSLabel.CENTER:
                default:
                    graphics.setStyle("margin", "0");
                    graphics.setStyle("margin-right", this.getIconTextGap() + "px");
                }
            }
        }
    }
    getVerticalTextPosition(): string {
        return this.getData("verticalTextPosition") || JSLabel.CENTER;
    }
    setVerticalTextPosition(verticalTextPosition: string) {
        this.setData("verticalTextPosition", verticalTextPosition);
        var text: string = this.getText();
        var icon = this.getIcon();
        var graphics: JSLabelGraphics = this.getGraphics();
        switch (verticalTextPosition) {
        case JSLabel.TOP:
            graphics.removeClass("top");
            graphics.addClass("bottom");
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-top", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSLabel.BOTTOM:
            graphics.removeClass("bottom");
            graphics.addClass("top");
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-bottom", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSLabel.CENTER:
        default:
            graphics.removeClass("top");
            graphics.removeClass("bottom");
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-right", (icon && text) ? (this.getIconTextGap() + "px") : "0");
        }
    }
}