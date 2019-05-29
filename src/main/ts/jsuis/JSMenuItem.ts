/// <reference path = "../jsuis.ts"/>
/**
 * JSMenuItem
 * 
 * @author Yassuo Toda
 */
class JSMenuItem extends JSPanel implements MouseListener {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(action: JSAction);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(text: string, icon: JSIcon);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setStyle("display", "block");
        
        var label: JSMenuItemLabel = this.getLabel();
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
            // constructor(text: string, icon: JSIcon);
            if (typeof args[0] === "string" && args[1] instanceof JSIcon) {
                var text: string = args[0];
                var icon: JSIcon = args[1];
                this.setText(text);
                this.setIcon(icon);
            }
            break;
        default:
        }
        
        this.addMouseListener(this);
    }
    init(): void {
        this.addClass("JSMenuItem");
    }
    getLabel(): JSMenuItemLabel {
        var label: JSMenuItemLabel = this.getData("label");
        if (!label) {
            label = new JSMenuItemLabel();
            this.setData("label", label);
        }
        return label; 
    }
    getIcon(): JSIcon {
        var label: JSMenuItemLabel = this.getLabel();
        return label.getIcon();
    }
    setIcon(icon: JSIcon) {
        var label: JSMenuItemLabel = this.getLabel();
        label.setIcon(icon);
    }
    getText(): string {
        var label: JSMenuItemLabel = this.getLabel();
        return label.getText(); 
    }
    setText(text: string) {
        var label: JSMenuItemLabel = this.getLabel();
        label.setText(text);
    }
    mouseEntered(mouseEvent: MouseEvent) {
        var parent: JSComponent = this.getParent();
        var parentSelected = parent.isSelected();
        if (parentSelected) {
            parent.getSelection().setSelected(this);
        }
        mouseEvent.stopPropagation();
    }
    mouseClicked(mouseEvent: MouseEvent) {
        var parent: JSComponent = this.getParent();
        if (parent instanceof JSPopupMenu) {
            var popuMenu: JSPopupMenu = <JSPopupMenu> parent;
            var invoker: JSComponent = popuMenu.getInvoker();
            while (invoker) {
                parent = invoker.getParent();
                if (parent instanceof JSPopupMenu) {
                    popuMenu = <JSPopupMenu> parent;
                    invoker = popuMenu.getInvoker();
                } else {
                    break;
                }
            }
            if (parent instanceof JSMenuContainer) {
                parent.setSelected(false);
            } else if (invoker instanceof JSMenu) {
                invoker.setSelected(false);
            } else {
                popuMenu.setSelected(false);
            }
        }
        mouseEvent.stopPropagation();
    }
}