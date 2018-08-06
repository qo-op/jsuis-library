/// <reference path = "../jsuis.ts"/>
class JSMenu extends JSHTMLComponent {
    
    delay: number = 500;
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(icon: HTMLImageElement);
    constructor(icon: JSComponent);
    constructor(text: string);
    constructor(text: string, icon: HTMLImageElement);
    constructor(text: string, icon: JSComponent);
    // overload
    constructor(elementOrIconOrText?: HTMLDivElement | HTMLImageElement | JSComponent | string, icon?: HTMLImageElement | JSComponent) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(elementOrIconOrText === undefined || !(elementOrIconOrText instanceof HTMLDivElement) ? document.createElement("div") : elementOrIconOrText);
        var popupMenuContainer = this.getPopupMenuContainer();
        if (!popupMenuContainer) {
            popupMenuContainer = new JSDiv();
            popupMenuContainer.setStyle("position", "absolute");
            super.add(popupMenuContainer);
            this.setPopupMenuContainer(popupMenuContainer);
        }
        if (elementOrIconOrText !== undefined && !(elementOrIconOrText instanceof HTMLDivElement)) {
            if (elementOrIconOrText instanceof HTMLImageElement) {
                // constructor(icon: HTMLImageElement);
                this.setIcon(new JSImageIcon(elementOrIconOrText));
            } else if (elementOrIconOrText instanceof JSComponent) {
                // constructor(icon: JSComponent);
                this.setIcon(elementOrIconOrText);
            } else {
                // constructor(text: string);
                // constructor(text: string, icon: HTMLImageElement);
                // constructor(text: string, icon: JSComponent);
                this.setText(elementOrIconOrText);
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
                var parent: JSComponent = this.getParent();
                if (parent instanceof JSPopupMenu) {
                    var parentSelected = parent.isSelected();
                    if (parentSelected) {
                        parent.getSelection().setSelected(this);
                    }
                } else {
                    this.setData("changed", false);
                    var popupMenu: JSPopupMenu = this.getPopupMenu();
                    if (popupMenu) {
                        var parentSelected = parent.isSelected();
                        if (!parentSelected) {
                            parent.setSelected(true);
                            parent.getSelection().setSelected(this);
                            this.setData("changed", true);
                        }
                    }
                }
            },
            mouseReleased(mouseEvent: MouseEvent) {
                var parent: JSComponent = this.getParent();
                if (!(parent instanceof JSPopupMenu)) {
                    var changed = this.getData("changed");
                    if (!changed) {
                        var popupMenu: JSPopupMenu = this.getPopupMenu();
                        if (popupMenu) {
                            var parentSelected = parent.isSelected();
                            if (parentSelected) {
                                parent.setSelected(false);
                            }
                        }
                    }
                }
            },
            mouseEntered(mouseEvent: MouseEvent) {
                var parent: JSComponent = this.getParent();
                if (parent instanceof JSPopupMenu) {
                    parent.clearTimeout();
                    parent.setTimeout(this, function() {
                        var parentSelected = parent.isSelected();
                        if (parentSelected) {
                            parent.getSelection().setSelected(this);
                        }
                    }, this.getDelay())
                } else {
                    var parentSelected = parent.isSelected();
                    if (parentSelected) {
                        parent.getSelection().setSelected(this);
                    }
                }
            }
        }));
    }
    init(): void {
        this.addClass("JSMenu");
        this.setBackground("#f2f2f2");
    }
    setIcon(icon: JSComponent) {
        var oldIcon: JSComponent = this.getIcon();
        if (oldIcon !== icon) {
            if (oldIcon) {
                this.remove(oldIcon);
            }
            if (icon) {
                icon.setStyle("vertical-align", "middle");
                super.add(icon, null, 1);
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
            super.add(label);
            this.setLabel(label);
        }
        label.setText(text);
    }
    getExpandIcon(): JSPathIcon {
        return this.getData("expandIcon");
    }
    setExpandIcon(expandIcon: JSPathIcon) {
        this.setData("expandIcon", expandIcon);
    }
    getPopupMenuContainer(): JSComponent {
        return this.getData("popupMenuContainer");
    }
    setPopupMenuContainer(popupMenuContainer: JSComponent) {
        this.setData("popupMenuContainer", popupMenuContainer);
    }
    getPopupMenu(): JSPopupMenu {
        return this.getData("popupMenu"); 
    }
    setPopupMenu(popupMenu: JSPopupMenu) {
        if (popupMenu) {
            var oldPopupMenu: JSPopupMenu = this.getPopupMenu();
            if (oldPopupMenu !== popupMenu) {
                var popupMenuContainer: JSComponent = this.getPopupMenuContainer();
                if (oldPopupMenu) {
                    popupMenuContainer.remove(oldPopupMenu);
                }
                if (popupMenu) {
                    popupMenuContainer.add(popupMenu, null, 0);
                    popupMenuContainer.validate();
                }
            }
        }
        this.setData("popupMenu", popupMenu);
    }
    add(component: JSComponent): void {
        if (component instanceof JSMenu || component instanceof JSMenuItem || component instanceof JSSeparator) {
            var popupMenu: JSPopupMenu = this.getPopupMenu();
            if (!popupMenu) {
                popupMenu = new JSPopupMenu();
                this.setPopupMenu(popupMenu); 
            }
            popupMenu.add(component);
            if (component instanceof JSMenu) {
                var expandIcon: JSPathIcon = component.getExpandIcon();
                if (!expandIcon) {
                    expandIcon = new JSPathIcon("M5.17,2.34L10.83,8L5.17,13.66Z", 16, 16);
                    expandIcon.getPath().setBackground("gray");
                    expandIcon.setStyle("vertical-align", "middle");
                    component.add(expandIcon);
                    component.setExpandIcon(expandIcon);
                }
            }
        } else {
            super.add(component);
        }
    }
    addSeparator(): void {
        this.add(new JSSeparator());
    }
    getDelay(): number {
        return this.delay;
    }
    setDelay(delay: number) {
        this.delay = delay;
    }
    setSelected(selected: boolean) {
        var popupMenu: JSPopupMenu = this.getPopupMenu();
        if (popupMenu) {
            if (selected) {
                var parent: JSComponent = this.getParent();
                if (parent instanceof JSPopupMenu) {
                    popupMenu.show(this, this.getWidth() - 4, 0 - popupMenu.getPaddingTop() - popupMenu.getBorderTopWidth());
                } else {
                    popupMenu.show(this, 0, this.getHeight());
                }
            } else {
                popupMenu.setSelected(false);
            }
        }
        super.setSelected(selected);
    }
}