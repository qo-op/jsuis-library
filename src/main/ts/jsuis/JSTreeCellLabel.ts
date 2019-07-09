/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeCellLabel
 * 
 * @author Yassuo Toda
 */
class JSTreeCellLabel extends JSLabel {

    /*
    constructor();
    constructor(element: HTMLElement);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(icon: JSIcon, horizontalAlignment: string);
    constructor(text: string, horizontalAlignment: string);
    constructor(text: string, icon: JSIcon);
    constructor(text: string, icon: JSIcon, horizontalAlignment: string);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSTreeCellLabel");
        
        var graphics: JSTreeCellLabelGraphics = this.getGraphics();
        this.add(graphics);
        
        var textComponent: JSTreeCellLabelText = this.getTextComponent();
        this.add(textComponent);
        
        switch (arguments.length) {
        case 1:
            // constructor(icon: JSIcon);
            // constructor(text: string);
            if (arguments[0] instanceof JSIcon) {
                var icon: JSIcon = arguments[0];
                this.setIcon(icon);
            } else if (typeof arguments[0] === "string") {
                var text: string = arguments[0];
                this.setText(text);
            }
            break;
        case 2:
            // constructor(icon: JSIcon, horizontalAlignment: string);
            // constructor(text: string, horizontalAlignment: string);
            // constructor(text: string, icon: JSIcon);
            if (arguments[0] instanceof JSIcon && typeof arguments[1] === "string") {
                var icon: JSIcon = arguments[0];
                var horizontalAlignment: string = arguments[1];
                this.setIcon(icon);
                this.setHorizontalAlignment(horizontalAlignment);
            } else if (typeof arguments[0] === "string" && typeof arguments[1] === "string") {
                var text: string = arguments[0];
                var horizontalAlignment: string = arguments[1];
                this.setText(text);
                this.setHorizontalAlignment(horizontalAlignment);
            } else if (typeof arguments[0] === "string" && arguments[1] instanceof JSIcon) {
                var text: string = arguments[0];
                var icon: JSIcon = arguments[1];
                this.setText(text);
                this.setIcon(icon);
            }
            break;
        case 3:
            // constructor(text: string, icon: JSIcon, horizontalAlignment: string);
            if (typeof arguments[0] === "string" && arguments[1] instanceof JSIcon && typeof arguments[2] === "string") {
                var text: string = arguments[0];
                var icon: JSIcon = arguments[1];
                var horizontalAlignment: string = arguments[2];
                this.setText(text);
                this.setIcon(icon);
                this.setHorizontalAlignment(horizontalAlignment);
            }
            break;
        default:
        }
    }
    getGraphics(): JSTreeCellLabelGraphics {
        var graphics: JSTreeCellLabelGraphics = this.getData("graphics");
        if (!graphics) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSTreeCellLabelGraphics");
            if (element) {
                graphics = new JSTreeCellLabelGraphics(element);
            } else {
                graphics = new JSTreeCellLabelGraphics();
            }
            this.setData("graphics", graphics);
        }
        return graphics;
    }
    getTextComponent(): JSTreeCellLabelText {
        var textComponent: JSTreeCellLabelText = this.getData("textComponent");
        if (!textComponent) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSTreeCellLabelText");
            if (element) {
                textComponent = new JSTreeCellLabelText(element);
            } else {
                textComponent = new JSTreeCellLabelText();
            }
            this.setData("textComponent", textComponent);
        }
        return textComponent;
    }
    setIcon(icon: JSIcon) {
        super.setIcon(icon);
        var text: string = this.getText();
        var graphics: JSTreeCellLabelGraphics = this.getGraphics();
        var verticalTextPosition: string = this.getVerticalTextPosition();
        switch (verticalTextPosition) {
        case JSTreeCellLabel.TOP:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-top", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSTreeCellLabel.BOTTOM:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-bottom", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSTreeCellLabel.CENTER:
        default:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-right", (icon && text) ? (this.getIconTextGap() + "px") : "0");
        }
        if (this.isValid()) {
            this.revalidate();
        }
    }
    getText(): string {
        var textComponent: JSTreeCellLabelText = this.getTextComponent();
        return textComponent.getText();
    }
    setText(text: string) {
        var textComponent: JSTreeCellLabelText = this.getTextComponent();
        textComponent.setText(text);
        var icon = this.getIcon();
        var graphics: JSTreeCellLabelGraphics = this.getGraphics();
        var verticalTextPosition: string = this.getVerticalTextPosition();
        switch (verticalTextPosition) {
        case JSTreeCellLabel.TOP:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-top", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSTreeCellLabel.BOTTOM:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-bottom", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSTreeCellLabel.CENTER:
        default:
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-right", (icon && text) ? (this.getIconTextGap() + "px") : "0");
        }
        if (this.isValid()) {
            this.revalidate();
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
                var graphics: JSTreeCellLabelGraphics = this.getGraphics();
                var verticalTextPosition: string = this.getVerticalTextPosition();
                switch (verticalTextPosition) {
                case JSTreeCellLabel.TOP:
                    graphics.setStyle("margin", "0");
                    graphics.setStyle("margin-top", this.getIconTextGap() + "px");
                    break;
                case JSTreeCellLabel.BOTTOM:
                    graphics.setStyle("margin", "0");
                    graphics.setStyle("margin-bottom", this.getIconTextGap() + "px");
                    break;
                case JSTreeCellLabel.CENTER:
                default:
                    graphics.setStyle("margin", "0");
                    graphics.setStyle("margin-right", this.getIconTextGap() + "px");
                }
            }
        }
        if (this.isValid()) {
            this.revalidate();
        }
    }
    getHorizontalAlignment(): string {
        return this.getData("horizontalAlignment");
    }
    setHorizontalAlignment(horizontalAlignment: string) {
        this.setData("horizontalAlignment", horizontalAlignment);
        this.setStyle("text-align", horizontalAlignment);
    }
    getVerticalTextPosition(): string {
        return this.getData("verticalTextPosition") || JSTreeCellLabel.CENTER;
    }
    setVerticalTextPosition(verticalTextPosition: string) {
        this.setData("verticalTextPosition", verticalTextPosition);
        var text: string = this.getText();
        var icon = this.getIcon();
        var graphics: JSTreeCellLabelGraphics = this.getGraphics();
        switch (verticalTextPosition) {
        case JSTreeCellLabel.TOP:
            graphics.removeClass("top");
            graphics.addClass("bottom");
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-top", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSTreeCellLabel.BOTTOM:
            graphics.removeClass("bottom");
            graphics.addClass("top");
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-bottom", (icon && text) ? (this.getIconTextGap() + "px") : "0");
            break;
        case JSTreeCellLabel.CENTER:
        default:
            graphics.removeClass("top");
            graphics.removeClass("bottom");
            graphics.setStyle("margin", "0");
            graphics.setStyle("margin-right", (icon && text) ? (this.getIconTextGap() + "px") : "0");
        }
        if (this.isValid()) {
            this.revalidate();
        }
    }
    getPreferredWidth(): number {
        var whiteSpace = this.getStyle("whiteSpace");
        this.setStyle("white-space", "nowrap");
        var preferredWidth: number = super.getPreferredWidth();
        if (whiteSpace) {
            this.setStyle("white-space", whiteSpace);
        } else {
            this.removeStyle("white-space");
        }
        return preferredWidth;
    }
    */
}
