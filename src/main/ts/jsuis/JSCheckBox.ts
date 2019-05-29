/// <reference path = "../jsuis.ts"/>
/**
 * JSCheckBox
 * 
 * @author Yassuo Toda
 */
class JSCheckBox extends JSHTMLComponent {
    
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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setStyle("white-space", "nowrap");
        
        var input: JSCheckBoxInput = this.getInput();
        this.add(input);
        
        var label: JSCheckBoxLabel = this.getLabel();
        this.add(label);
        
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
            // constructor(icon: JSIcon, selected: boolean);
            // constructor(text: string, selected: boolean);
            // constructor(text: string, icon: JSIcon);
            if (args[0] instanceof JSIcon && typeof args[1] === "boolean") {
                var icon: JSIcon = args[0];
                var selected: boolean = args[1];
                this.setIcon(icon);
                this.setSelected(selected);
            } else if (typeof args[0] === "string" && typeof args[1] === "boolean") {
                var text: string = args[0];
                var selected: boolean = args[1];
                this.setText(text);
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
    }
    init(): void {
        this.addClass("JSCheckBox");
    }
    getInput(): JSCheckBoxInput {
        var input: JSCheckBoxInput = this.getData("input");
        if (!input) {
            input = new JSCheckBoxInput();
            this.setData("input", input);
        }
        return input;
    }
    getLabel(): JSCheckBoxLabel {
        var label: JSCheckBoxLabel = this.getData("label");
        if (!label) {
            label = new JSCheckBoxLabel();
            this.setData("label", label);
        }
        return label; 
    }
    getIcon(): JSIcon {
        var label: JSCheckBoxLabel = this.getLabel();
        return label.getIcon();
    }
    setIcon(icon: JSIcon) {
        var label: JSCheckBoxLabel = this.getLabel();
        label.setIcon(icon);
    }
    getText(): string {
        var label: JSCheckBoxLabel = this.getLabel();
        return label.getText(); 
    }
    setText(text: string) {
        var label: JSCheckBoxLabel = this.getLabel();
        label.setText(text);
    }
    isSelected() {
        var input: JSCheckBoxInput = this.getInput()
        return input.isSelected();
    }
    setSelected(selected: boolean) {
        var input: JSCheckBoxInput = this.getInput()
        input.setSelected(selected);
    }
}
