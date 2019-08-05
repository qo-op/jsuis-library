/// <reference path = "../jsuis.ts"/>
/**
 * JSMenuItem
 * 
 * @author Yassuo Toda
 */
class JSMenuItem extends JSDiv {
    
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
        this.addMouseListener(this.getMenuItemMouseListener());
    }
    getInputSpan(): JSSpan {
        var span_Input: JSSpan = this.getData("span_Input");
        if (!span_Input) {
            span_Input = new JSSpan();
            this.setData("span_Input", span_Input);
        }
        return span_Input;
    }
    getIconSpan(): JSSpan {
        var span_Icon: JSSpan = this.getData("span_Icon");
        if (!span_Icon) {
            span_Icon = new JSSpan();
            this.setData("span_Icon", span_Icon);
        }
        return span_Icon;
    }
    getTextSpan(): JSSpan {
        var span_Text: JSSpan = this.getData("span_Text");
        if (!span_Text) {
            span_Text = new JSSpan();
            span_Text.setStyle("vertical-align", "middle");
            this.setData("span_Text", span_Text);
        }
        return span_Text;
    }
    getInput(): JSComponent {
        return this.getData("input");
    }
    setInput(input: JSComponent) {
        this.setData("input", input);
        var span_Input: JSSpan = this.getInputSpan();
        var parent: JSComponent = span_Input.getParent();
        if (!input) {
            if (parent === this) {
                this.remove(span_Input);
            }
        } else {
            if (parent !== this) {
                this.add(span_Input, null, 0);
                span_Input.removeAll();
                span_Input.add(input);
            }
        }
    }
    getGraphics(): JSComponent {
        return this.getData("graphics");
    }
    setGraphics(graphics: JSComponent) {
        this.setData("graphics", graphics);
    }
    setIcon(icon: JSIcon) {
        var graphics: JSComponent = this.getGraphics();
        if (!icon) {
            if (graphics) {
                this.remove(graphics);
            }
        } else {
            var input: JSComponent = this.getInput();
            var text: string = this.getText();
            if (!text) {
                if (!graphics) {
                    graphics = this.getIconSpan();
                    this.add(graphics, null, input ? 1: 0);
                    this.setGraphics(graphics);
                }
                graphics.setStyle("margin-right", "0");
            } else {
                if (!graphics) {
                    graphics = this.getIconSpan();
                    this.add(graphics, null, input ? 1: 0);
                    this.setGraphics(graphics);
                }
                var iconTextGap: number = this.getIconTextGap();
                graphics.setStyle("margin-right", iconTextGap + "px");
            }
        }
        super.setIcon(icon);
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
            var input: JSComponent = this.getInput();
            if (!icon) {
                if (parent !== this) {
                    this.add(span_Text, null, input ? 1 : 0);
                }
            } else {
                if (parent !== this) {
                    this.add(span_Text, null, input ? 2 : 1);
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
    getMenuItemMouseListener(): MouseListener {
        var mouseListener_MenuItem: MouseListener = this.getData("_mouseListener_MenuItem");
        if (!mouseListener_MenuItem) {
            mouseListener_MenuItem = new JSMenuItemMouseListener(this);
            this.setData("_mouseListener_MenuItem", mouseListener_MenuItem);
        }
        return mouseListener_MenuItem;
    }
}