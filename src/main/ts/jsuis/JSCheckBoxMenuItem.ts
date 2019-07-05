/// <reference path = "../jsuis.ts"/>
/**
 * JSCheckBoxMenuItem
 * 
 * @author Yassuo Toda
 */
class JSCheckBoxMenuItem extends JSMenuItem {
    
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
        this.setUI("JSCheckBoxMenuItem");
        
        var input: JSCheckBoxInput = this.getInput();
        this.add(input);
        
        // var label: JSMenuItemLabel = this.getLabel();
        // this.add(label, null, index++);
        
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
        
        this.addMouseListener(this);
    }
    getInput(): JSCheckBoxInput {
        var input: JSCheckBoxInput = this.getData("input");
        if (!input) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSCheckBoxInput");
            if (element) {
                input = new JSCheckBoxInput(element);
            } else {
                input = new JSCheckBoxInput();
            }
            this.setData("input", input);
        }
        return input;
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
