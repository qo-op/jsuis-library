/// <reference path = "../jsuis.ts"/>
/**
 * JSMenuItem
 * 
 * @author Yassuo Toda
 */
class JSMenuItem extends JSDiv {
    
    private span_Icon: JSSpan;
    private span_Text: JSSpan;
    private mouseListener_MenuItem: JSMouseListener;
    
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
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI(JSMenuItemUI.getInstance());
        this.setIconTextGap(4);
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
    init() {
        this.addMouseListener(this.getMouseListener());
    }
    getIconSpan(): JSSpan {
        if (!this.span_Icon) {
            this.span_Icon = new JSSpan();
        }
        return this.span_Icon;
    }
    getTextSpan(): JSSpan {
        if (!this.span_Text) {
            this.span_Text = new JSSpan();
            this.span_Text.setStyle("vertical-align", "middle");
        }
        return this.span_Text;
    }
    getGraphics(): JSComponent {
        return this.getIconSpan();
    }
    setIcon(icon: JSIcon) {
        var graphics: JSComponent = this.getGraphics();
        var parent: JSComponent = graphics.getParent();
        if (!icon) {
            if (parent === this) {
                this.remove(graphics);
            }
        } else {
            var text: string = this.getText();
            if (!text) {
                if (parent !== this) {
                    this.add(graphics, null, 0);
                }
                graphics.setStyle("margin-right", "0");
            } else {
                if (parent !== this) {
                    this.add(graphics, null, 0);
                }
                var iconTextGap: number = this.getIconTextGap();
                graphics.setStyle("margin-right", iconTextGap + "px");
            }
            icon.paintIcon(this, graphics);
        }
        if (this.isValid()) {
            this.revalidate();
        }
    }
    getText(): string {
        var span_Text: JSSpan = this.getTextSpan();
        return span_Text.getText();
    }
    setText(text: string) {
        var span_Text: JSSpan = this.getTextSpan();
        span_Text.setText(text);
        var parent: JSComponent = span_Text.getParent();
        var icon: JSIcon = this.getIcon();
        var graphics: JSComponent = this.getGraphics();
        if (!text) {
            if (parent === this) {
                this.remove(span_Text);
                if (graphics) {
                    graphics.setStyle("margin-right", "0");
                }
            }
        } else {
            if (!icon) {
                if (parent !== this) {
                    this.add(span_Text, null, 0);
                }
            } else {
                if (parent !== this) {
                    this.add(span_Text, null, 1);
                }
                if (graphics) {
                    var iconTextGap: number = this.getIconTextGap();
                    graphics.setStyle("margin-right", iconTextGap + "px");
                }
            }
        }
        if (this.isValid()) {
            this.revalidate();
        }
    }
    getIconTextGap(): number {
        return +this.getAttribute("data--icon-text-gap");
    }
    setIconTextGap(iconTextGap: number) {
        this.setAttribute("data--icon-text-gap", "" + iconTextGap);
        var icon: JSIcon = this.getIcon();
        if (!icon) {
            return;
        }
        var text: string = this.getText();
        if (!text) {
            return;
        }
        var graphics: JSComponent = this.getGraphics();
        graphics.setStyle("margin-right", iconTextGap + "px");
        if (this.isValid()) {
            this.revalidate();
        }
    }
    getMouseListener(): JSMouseListener {
        if (!this.mouseListener_MenuItem) {
            this.mouseListener_MenuItem = new JSMenuItemMouseListener(this);
        }
        return this.mouseListener_MenuItem;
    }
}
