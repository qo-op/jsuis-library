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
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSLabel");
        
        this.setLayout(new JSBorderLayout(4, 4));
        
        var graphics: JSLabelGraphics = this.getGraphics();
        this.add(graphics, JSBorderLayout.WEST);
        
        var textComponent: JSLabelText = this.getTextComponent();
        // textComponent.setAlign(JSBorderLayout.LEFT_RIGHT);
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
        var graphics: JSLabelGraphics = this.getGraphics();
        graphics.setStyle("display", icon ? "": "none");
        if (this.isValid()) {
            this.revalidate();
        }
    }
    getText(): string {
        var textComponent: JSLabelText = this.getTextComponent();
        return textComponent.getText();
    }
    setText(text: string) {
        var textComponent: JSLabelText = this.getTextComponent();
        textComponent.setText(text);
        textComponent.setStyle("display", text ? "": "none");
        if (this.isValid()) {
            this.revalidate();
        }
    }
    getIconTextGap(): number {
        var layout: JSLayout = this.getLayout();
        return layout.getHgap() || layout.getVgap();
    }
    setIconTextGap(iconTextGap: number) {
        var layout: JSLayout = this.getLayout();
        layout.setHgap(iconTextGap);
        layout.setVgap(iconTextGap);
        if (this.isValid()) {
            this.revalidate();
        }
    }
    getHorizontalAlignment(): string {
        var textComponent: JSLabelText = this.getTextComponent();
        return textComponent.getHorizontalAlign();
    }
    setHorizontalAlignment(horizontalAlignment: string) {
        var textComponent: JSLabelText = this.getTextComponent();
        textComponent.setHorizontalAlign(horizontalAlignment);
    }
    getVerticalTextPosition(): string {
        return this.getData("verticalTextPosition") || JSLabel.CENTER;
    }
    setVerticalTextPosition(verticalTextPosition: string) {
        this.setData("verticalTextPosition", verticalTextPosition);
        var graphics: JSLabelGraphics = this.getGraphics();
        switch (verticalTextPosition) {
        case JSLabel.TOP:
            graphics.setConstraints(JSBorderLayout.SOUTH);
            break;
        case JSLabel.BOTTOM:
            graphics.setConstraints(JSBorderLayout.NORTH);
            break;
        case JSLabel.CENTER:
        default:
            graphics.setConstraints(JSBorderLayout.WEST);
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
    getPreferredHeight(): number {
        if (!this.isValidHorizontally()) {
            return null;
        }
        return super.getPreferredHeight();
    }
}
