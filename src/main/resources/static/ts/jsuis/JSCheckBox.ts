/// <reference path = "../jsuis.ts"/>
/**
 * JSCheckBox
 * 
 * @author Yassuo Toda
 */
class JSCheckBox extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(action: JSAction);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(icon: JSIcon, selected: boolean);
    constructor(text: string, icon: JSIcon);
    constructor(text: string, icon: JSIcon, selected: boolean);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setSelected(false);
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLDivElement);
            // constructor(action: JSAction);
            // constructor(icon: JSIcon);
            // constructor(text: string);
            if (args[0] instanceof HTMLDivElement) {
            } else if (args[0] instanceof JSAction) {
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
            // constructor(icon: JSIcon, selected: boolean);
            // constructor(text: string, icon: JSIcon);
            if (args[0] instanceof JSIcon && typeof args[1] === "boolean") {
                var icon: JSIcon = args[0];
                var selected: boolean = args[1];
                this.setIcon(icon);
                this.setSelected(selected);
            } else if (typeof args[0] === "string" && args[1] instanceof JSIcon) {
                var text: string = args[0];
                var icon: JSIcon = args[1];
                this.setText(text);
                this.setIcon(icon);
            }
            break;
        case 3:
            // constructor(text: string, icon: JSIcon, selected: boolean);
            if (typeof args[0] === "string" && args[1] instanceof JSIcon && typeof args[2] === "boolean") {
                var text: string = args[0];
                var icon: JSIcon = args[1];
                var selected: boolean = args[2];
                this.setText(text);
                this.setIcon(icon);
                this.setSelected(selected);
            }
            break;
        default:
        }
        this.setClass("JSCheckBox");
    }
    setIcon(icon: JSIcon) {
        super.setIcon(icon);
        var oldImage: JSComponent = this.getImage();
        if (oldImage) {
            this.remove(oldImage);
        }
        if (icon) {
            var image: JSImage = new JSImage(icon);
            image.setStyle("vertical-align", "middle");
            var text = this.getText();
            if (text) {
                image.setStyle("margin-right", "4px");
            }
            this.add(image, null, 1);
            this.setImage(image);
        }
    }
    getCheckBoxInput(): JSCheckBoxInput {
        var checkBoxInput: JSCheckBoxInput = this.getData("checkBoxInput");
        if (!checkBoxInput) {
            checkBoxInput = new JSCheckBoxInput();
            // checkBoxInput.setStyle("margin-right", "4px");
            checkBoxInput.setStyle("vertical-align", "middle");
            this.add(checkBoxInput, null, 0);
            this.setData("checkBoxInput", checkBoxInput);
        }
        return checkBoxInput;
    }
    getSpan(): JSSpan {
        var span = this.getData("span");
        if (!span) {
            span = new JSSpan();
            span.setStyle("vertical-align", "middle");
            this.add(span);
            this.setData("span", span);
        }
        return span;
    }
    isSelected() {
        var checkBoxInput: JSCheckBoxInput = this.getCheckBoxInput()
        return checkBoxInput.isSelected();
    }
    setSelected(selected: boolean) {
        var checkBoxInput: JSCheckBoxInput = this.getCheckBoxInput()
        checkBoxInput.setSelected(selected);
    }
    getText(): string {
        var span: JSSpan = this.getSpan();
        return span.getText();
    }
    setText(text: string) {
        var image = this.getImage();
        if (image) {
            image.setStyle("margin-right", text ? "4px" : "0");
        }
        var span: JSSpan = this.getSpan();
        span.setText(text);
    }
}
