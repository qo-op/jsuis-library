/// <reference path = "../jsuis.ts"/>
/**
 * JSMenuItem
 * 
 * @author Yassuo Toda
 */
class JSMenuItem extends JSHTMLComponent {
    
    delay: number = 500;
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(action: JSAction);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(text: string, icon: JSIcon);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        
        var label: JSLabel = this.getLabel();
        this.add(label);
        
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
        this.addMouseListener({
            mousePressed(mouseEvent: MouseEvent) {
                mouseEvent.stopPropagation();
            },
            mouseReleased(mouseEvent: MouseEvent) {
                mouseEvent.stopPropagation();
            },
            mouseEntered(mouseEvent: MouseEvent, menuItem: JSMenuItem) {
                var parent: JSComponent = menuItem.getParent();
                var parentSelected = parent.isSelected();
                if (parentSelected) {
                    parent.getSelection().setSelected(menuItem);
                }
                mouseEvent.stopPropagation();
            },
            mouseClicked(mouseEvent: MouseEvent, menuItem: JSMenuItem) {
                var parent: JSComponent = menuItem.getParent();
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
                    // if (parent instanceof JSMenuBarContainer) {
                    if (parent instanceof JSMenuBar) {
                        parent.setSelected(false);
                    } else if (invoker instanceof JSMenu) {
                        invoker.setSelected(false);
                    } else {
                        popuMenu.setSelected(false);
                    }
                }
                mouseEvent.stopPropagation();
            }
        }).withArgs(this);
    }
    init(): void {
        this.addClass("JSMenuItem");
    }
    getIcon(): JSIcon {
        var label: JSLabel = this.getLabel();
        return label.getIcon();
    }
    setIcon(icon: JSIcon) {
        var label: JSLabel = this.getLabel();
        label.setIcon(icon);
    }
    getText(): string {
        var label: JSComponent = this.getLabel();
        return label.getText(); 
    }
    setText(text: string) {
        var label: JSLabel = this.getLabel();
        label.setText(text);
    }
    getLabel(): JSLabel {
        var label = this.getData("label");
        if (!label) {
            label = new JSLabel();
            this.setData("label", label);
        }
        return label; 
    }
    getDelay(): number {
        return this.delay;
    }
    setDelay(delay: number) {
        this.delay = delay;
    }
}