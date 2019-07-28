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
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLButtonElement) ? document.createElement("button") : arguments[0]);
        this.setUI(JSButtonUI.getInstance());
        
        this.setLayout(new JSBorderLayout(4, 4));
        
        var graphics: JSButtonGraphics = this.getGraphics();
        this.add(graphics, JSBorderLayout.WEST);
        
        var textComponent: JSButtonText = this.getTextComponent();
        this.add(textComponent);
        
        switch (arguments.length) {
        case 1:
            // constructor(action: JSAction);
            // constructor(icon: JSIcon);
            // constructor(text: string);
            if (arguments[0] instanceof JSAction) {
                var action: JSAction = arguments[0];
                this.setAction(action);
            } else if (arguments[0] instanceof JSIcon) {
                var icon: JSIcon = arguments[0];
                this.setIcon(icon);
            } else if (typeof arguments[0] === "string") {
                var text: string = arguments[0];
                this.setText(text);
            }
            break;
        case 2:
            // constructor(text: string, icon: JSIcon);
            if (typeof arguments[0] === "string" && arguments[1] instanceof JSIcon) {
                var text: string = arguments[0];
                var icon: JSIcon = arguments[1];
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
        var graphics: JSButtonGraphics = this.getGraphics();
        graphics.setStyle("display", icon ? "": "none");
        if (this.isValid()) {
            this.revalidate();
        }
    }
    getText(): string {
        var textComponent: JSButtonText = this.getTextComponent();
        return textComponent.getText();
    }
    setText(text: string) {
        var textComponent: JSButtonText = this.getTextComponent();
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
    getVerticalTextPosition(): string {
        return this.getData("verticalTextPosition") || JSButton.CENTER;
    }
    setVerticalTextPosition(verticalTextPosition: string) {
        this.setData("verticalTextPosition", verticalTextPosition);
        var graphics: JSButtonGraphics = this.getGraphics();
        switch (verticalTextPosition) {
        case JSButton.TOP:
            graphics.setConstraints(JSBorderLayout.SOUTH);
            break;
        case JSButton.BOTTOM:
            graphics.setConstraints(JSBorderLayout.NORTH);
            break;
        case JSButton.CENTER:
        default:
            graphics.setConstraints(JSBorderLayout.WEST);
        }
        if (this.isValid()) {
            this.revalidate();
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
