/// <reference path = "../jsuis.ts"/>
/**
 * JSCheckBoxMenuItem
 * 
 * @author Yassuo Toda
 */
class JSCheckBoxMenuItem extends JSMenuItem {
    
    private div_Content: JSDiv;
    private div_Glass: JSDiv;
    private span_Input: JSSpan;
    private checkBoxInput: JSCheckBoxInput;
    private mouseListener_CheckBoxMenuItem: JSMouseListener;
    
    constructor();
    constructor(element: HTMLElement);
    constructor(action: JSAction);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(icon: JSIcon, selected: boolean);
    constructor(text: string, selected: boolean);
    constructor(text: string, icon: JSIcon);
    constructor(text: string, icon: JSIcon, selected: boolean);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI(JSCheckBoxMenuItemUI.getInstance());
        
        var div_Content: JSDiv = this.getContentDiv();
        this.add(div_Content);
        
        var div_Glass: JSDiv = this.getGlassDiv();
        div_Content.add(div_Glass);
        
        var span_Input: JSSpan = this.getInputSpan();
        div_Content.add(span_Input);
        
        var checkBoxInput = this.getInput();
        span_Input.add(checkBoxInput);
        
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
            // constructor(icon: JSIcon, selected: boolean);
            // constructor(text: string, selected: boolean);
            // constructor(text: string, icon: JSIcon);
            if (arguments[0] instanceof JSIcon && typeof arguments[1] === "boolean") {
                var icon: JSIcon = arguments[0];
                var selected: boolean = arguments[1];
                this.setIcon(icon);
                this.setSelected(selected);
            } else if (typeof arguments[0] === "string" && typeof arguments[1] === "boolean") {
                var text: string = arguments[0];
                var selected: boolean = arguments[1];
                this.setText(text);
                this.setSelected(selected);
            } else if (typeof arguments[0] === "string" && arguments[1] instanceof JSIcon) {
                var text: string = arguments[0];
                var icon: JSIcon = arguments[1];
                this.setText(text);
                this.setIcon(icon);
            }
            break;
        case 3:
            // constructor(text: string, icon: JSIcon, selected: boolean);
            if (typeof arguments[0] === "string" && arguments[1] instanceof JSIcon && typeof arguments[2] === "boolean") {
                var text: string = arguments[0];
                var icon: JSIcon = arguments[1];
                var selected: boolean = arguments[2];
                this.setText(text);
                this.setIcon(icon);
                this.setSelected(selected);
            }
            break;
        default:
        }
    }
    getContentDiv(): JSDiv {
        if (!this.div_Content) {
            this.div_Content = new JSDiv();
            this.div_Content.setStyle("position", "relative");
        }
        return this.div_Content;
    }
    getGlassDiv(): JSDiv {
        if (!this.div_Glass) {
            this.div_Glass = new JSDiv();
            this.div_Glass.setStyle("position", "absolute");
            this.div_Glass.setStyle("width", "100%");
            this.div_Glass.setStyle("height", "100%");
        }
        return this.div_Glass;
    }
    getInputSpan(): JSSpan {
        if (!this.span_Input) {
            this.span_Input = new JSSpan();
        }
        return this.span_Input;
    }
    getInput(): JSComponent {
        if (!this.checkBoxInput) {
            this.checkBoxInput = new JSCheckBoxInput();
        }
        return this.checkBoxInput;
    }
    setIcon(icon: JSIcon) {
        var div_Content: JSDiv = this.getContentDiv();
        var graphics: JSComponent = this.getGraphics();
        var parent: JSComponent = graphics.getParent();
        if (!icon) {
            if (parent === this) {
                div_Content.remove(graphics);
            }
        } else {
            var input: JSComponent = this.getInput();
            var text: string = this.getText();
            if (!text) {
                if (parent !== this) {
                    div_Content.add(graphics, null, input ? 2: 0);
                }
                graphics.setStyle("margin-right", "0");
            } else {
                if (parent !== this) {
                    div_Content.add(graphics, null, input ? 2: 0);
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
    setText(text: string) {
        var div_Content: JSDiv = this.getContentDiv();
        var span_Text: JSSpan = this.getTextSpan();
        span_Text.setText(text);
        var parent: JSComponent = span_Text.getParent();
        var icon: JSIcon = this.getIcon();
        var graphics: JSComponent = this.getGraphics();
        if (!text) {
            if (parent === this) {
                div_Content.remove(span_Text);
                graphics.setStyle("margin-right", "0");
            }
        } else {
            var input: JSComponent = this.getInput();
            if (!icon) {
                if (parent !== this) {
                    div_Content.add(span_Text, null, input ? 2 : 0);
                }
            } else {
                if (parent !== this) {
                    div_Content.add(span_Text, null, input ? 3 : 1);
                }
                var iconTextGap: number = this.getIconTextGap();
                graphics.setStyle("margin-right", iconTextGap + "px");
            }
        }
        if (this.isValid()) {
            this.revalidate();
        }
    }
    isSelected() {
        var input: JSComponent = this.getInput()
        return input.isSelected();
    }
    setSelected(selected: boolean) {
        var input: JSComponent = this.getInput()
        input.setSelected(selected);
    }
    getMouseListener(): JSMouseListener {
        if (!this.mouseListener_CheckBoxMenuItem) {
            this.mouseListener_CheckBoxMenuItem = new JSCheckBoxMenuItemMouseListener(this);
        }
        return this.mouseListener_CheckBoxMenuItem;
    }
}
