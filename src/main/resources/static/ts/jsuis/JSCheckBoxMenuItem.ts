/// <reference path = "../jsuis.ts"/>
/**
 * JSCheckBoxMenuItem
 * 
 * @author Yassuo Toda
 */
class JSCheckBoxMenuItem extends JSHTMLComponent {
    
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
        this.setClass("JSMenuItem");
        this.setStyle("white-space", "nowrap");
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
            mousePressed(mouseEvent: MouseEvent, component: JSComponent) {
                mouseEvent.stopPropagation();
            },
            mouseReleased(mouseEvent: MouseEvent, component: JSComponent) {
                mouseEvent.stopPropagation();
            },
            mouseEntered(mouseEvent: MouseEvent, component: JSComponent) {
                var parent: JSComponent = component.getParent();
                var parentSelected = parent.isSelected();
                if (parentSelected) {
                    parent.getSelection().setSelected(component);
                }
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
            this.add(image, null, 0);
            this.setImage(image);
        }
    }
    getLabel(): JSLabel {
        return this.getData("label"); 
    }
    setLabel(label: JSLabel) {
        this.setData("label", label);
    }
    getText(): string {
        var label: JSComponent = this.getLabel();
        return label.getText(); 
    }
    setText(text: string) {
        var label: JSLabel = this.getLabel();
        if (!label) {
            label = new JSLabel();
            label.setStyle("vertical-align", "middle");
            this.add(label);
            this.setLabel(label);
        }
        label.setText(text);
    }
    getDelay(): number {
        return this.delay;
    }
    setDelay(delay: number) {
        this.delay = delay;
    }
}