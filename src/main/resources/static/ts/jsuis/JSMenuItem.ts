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
        this.setStyle("padding", "0 4px");
        this.addMouseListener({
            mousePressed(mouseEvent: MouseEvent, component: JSComponent) {
                mouseEvent.stopPropagation();
            },
            mouseReleased(mouseEvent: MouseEvent, component: JSComponent) {
                mouseEvent.stopPropagation();
            },
            mouseEntered(mouseEvent: MouseEvent, component: JSComponent) {
                component.setBackground("#e6e6e6");
                mouseEvent.stopPropagation();
                var parent: JSComponent = component.getParent();
                var parentSelected = parent.isSelected();
                if (parentSelected) {
                    parent.getSelection().setSelected(component);
                }
                mouseEvent.stopPropagation();
            },
            mouseExited(mouseEvent: MouseEvent, component: JSComponent) {
                component.setBackground(null);
                mouseEvent.stopPropagation();
            },
            mouseClicked(mouseEvent: MouseEvent, component: JSComponent) {
                var parent: JSComponent = component.getParent();
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
                    if (parent instanceof JSMenuBarContainer) {
                        parent.setSelected(false);
                    } else if (invoker instanceof JSMenu) {
                        invoker.setSelected(false);
                    } else {
                        popuMenu.setSelected(false);
                    }
                }
                mouseEvent.stopPropagation();
            }
        });
        this.setClass("JSMenuItem");
        this.setStyle("white-space", "nowrap");
    }
    setIcon(icon: JSIcon) {
        super.setIcon(icon);
        var oldImage: JSComponent = this.getImage();
        if (oldImage) {
            this.remove(oldImage);
        }
        if (icon) {
            var image: JSComponent;
            if (icon instanceof JSPathIcon) {
                image = new JSPathImage(icon);
            } else {
                image = new JSImage(icon);
            }
            image.setStyle("vertical-align", "middle");
            var text = this.getText();
            if (text) {
                image.setStyle("margin-right", "4px");
            }
            this.add(image, null, 0);
            this.setImage(image);
        }
    }
    getLabel(): JSLabel {
        var label = this.getData("label");
        if (!label) {
            label = new JSLabel();
            label.setStyle("vertical-align", "middle");
            this.add(label);
            this.setData("label", label);
        }
        return label; 
    }
    getText(): string {
        var label: JSComponent = this.getLabel();
        return label.getText(); 
    }
    setText(text: string) {
        var image = this.getImage();
        if (image) {
            image.setStyle("margin-right", text ? "4px" : "0");
        }
        var label: JSLabel = this.getLabel();
        label.setText(text);
    }
    getDelay(): number {
        return this.delay;
    }
    setDelay(delay: number) {
        this.delay = delay;
    }
}