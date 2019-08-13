/// <reference path = "../jsuis.ts"/>
/**
 * JSCheckBoxTreeCell
 * 
 * @author Yassuo Toda
 */
class JSCheckBoxTreeCell extends JSTreeCell {
    
    private div_Content: JSDiv;
    private div_Glass: JSDiv;
    private span_Input: JSSpan;
    private checkBoxInput: JSCheckBoxInput;
    private mouseListener_CheckBoxTreeCell: JSMouseListener;
    
    constructor();
    constructor(element: HTMLElement);
    constructor(value: any);
    constructor(value: any, icon: JSIcon);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI(JSCheckBoxTreeCellUI.getInstance());
        
        var div_Content: JSDiv = this.getContentDiv();
        this.add(div_Content);
        
        var span_Input: JSSpan = this.getInputSpan();
        div_Content.add(span_Input);
        
        var checkBoxInput = this.getInput();
        span_Input.add(checkBoxInput);
        
        switch (arguments.length) {
        case 1:
            // constructor(value: any);
            if (!(arguments[0] instanceof HTMLDivElement)) {
                var value: any = arguments[0];
                this.setValue(value);
            }
            break;
        case 2:
            // constructor(value: any, icon: JSICon);
            if (arguments[1] instanceof JSIcon) {
                var value: any= arguments[0];
                var icon: JSIcon = arguments[1];
                this.setValue(value);
                this.setIcon(icon);
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
    setHandleIcon(icon: JSIcon) {
        var div_Content: JSDiv = this.getContentDiv();
        var span_Handle: JSSpan = this.getHandleSpan();
        var parent: JSComponent = span_Handle.getParent();
        if (!icon) {
            if (parent === this) {
                div_Content.remove(span_Handle);
            }
        } else {
            if (parent !== this) {
                div_Content.add(span_Handle, null, 0);
            }
            icon.paintIcon(this, span_Handle);
        }
        if (this.isValid()) {
            this.revalidate();
        }
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
                    div_Content.add(graphics);
                }
                graphics.setStyle("margin-right", "0");
            } else {
                if (parent !== this) {
                    div_Content.add(graphics, null, div_Content.getComponents().length - 1);
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
                    div_Content.add(span_Text);
                }
            } else {
                if (parent !== this) {
                    div_Content.add(span_Text);
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
}
