/// <reference path = "../jsuis.ts"/>
class JSMenuItem extends JSHTMLComponent {
    
    delay: number = 500;
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(action: JSAction);
    constructor(icon: HTMLImageElement);
    constructor(icon: JSComponent);
    constructor(text: string);
    constructor(text: string, icon: HTMLImageElement);
    constructor(text: string, icon: JSComponent);
    // overload
    constructor(elementOrActionOrIconOrText?: HTMLDivElement | JSAction | HTMLImageElement | JSComponent | string, icon?: HTMLImageElement | JSComponent) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(elementOrActionOrIconOrText === undefined || !(elementOrActionOrIconOrText instanceof HTMLDivElement) ? document.createElement("div") : elementOrActionOrIconOrText);
        if (elementOrActionOrIconOrText !== undefined && !(elementOrActionOrIconOrText instanceof HTMLDivElement)) {
            if (elementOrActionOrIconOrText instanceof JSAction) {
                this.setAction(elementOrActionOrIconOrText);
            } else if (elementOrActionOrIconOrText instanceof HTMLImageElement) {
                // constructor(icon: HTMLImageElement);
                this.setIcon(new JSImageIcon(elementOrActionOrIconOrText));
            } else if (elementOrActionOrIconOrText instanceof JSComponent) {
                // constructor(icon: JSComponent);
                this.setIcon(elementOrActionOrIconOrText);
            } else {
                // constructor(text: string);
                // constructor(text: string, icon: HTMLImageElement);
                // constructor(text: string, icon: JSComponent);
                this.setText(elementOrActionOrIconOrText);
                if (icon !== undefined) {
                    if (icon instanceof HTMLImageElement) {
                        this.setIcon(new JSImageIcon(icon));
                    } else {
                        this.setIcon(icon);
                    }
                }
            }
        }
        this.addMouseListener(new JSMouseListener(this, {
            mouseEntered(mouseEvent: MouseEvent) {
                this.setBackground("#e6e6e6");
            },
            mouseExited(mouseEvent: MouseEvent) {
                this.setBackground(null);
            }
        }));
        this.addMouseListener(new JSMouseListener(this, {
            mousePressed(mouseEvent: MouseEvent) {
            },
            mouseReleased(mouseEvent: MouseEvent) {
            },
            mouseEntered(mouseEvent: MouseEvent) {
                var parent: JSComponent = this.getParent();
                var parentSelected = parent.isSelected();
                if (parentSelected) {
                    parent.getSelection().setSelected(this);
                }
            },
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
                    if (parent instanceof JSMenuBarContainer) {
                        parent.setSelected(false);
                    } else if (invoker instanceof JSMenu) {
                        invoker.setSelected(false);
                    } else {
                        popuMenu.setSelected(false);
                    }
                }
            }
        }));
    }
    init(): void {
        this.addClass("JSMenuItem");
        this.setStyle("white-space", "nowrap");
    }
    setIcon(icon: JSComponent) {
        var oldIcon: JSComponent = this.getIcon();
        if (oldIcon !== icon) {
            if (oldIcon) {
                this.remove(oldIcon);
            }
            if (icon) {
                icon.setStyle("vertical-align", "middle");
                this.add(icon, null, 0);
            }
        }
        super.setIcon(icon);
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