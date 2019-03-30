/// <reference path = "../jsuis.ts"/>
class JSMenu extends JSHTMLComponent {
    
    delay: number = 500;
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(text: string, icon: JSIcon);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        var popupMenuContainer = this.getPopupMenuContainer();
        if (!popupMenuContainer) {
            popupMenuContainer = new JSDiv();
            popupMenuContainer.setStyle("position", "absolute");
            super.add(popupMenuContainer);
            this.setPopupMenuContainer(popupMenuContainer);
        }
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLDivElement);
            // constructor(icon: JSIcon);
            // constructor(text: string);
            if (args[0] instanceof HTMLDivElement) {
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
                var menu: JSMenu = <JSMenu> component;
                var parent: JSComponent = menu.getParent();
                if (parent instanceof JSPopupMenu) {
                    var parentSelected = parent.isSelected();
                    if (parentSelected) {
                        parent.getSelection().setSelected(menu);
                    }
                } else {
                    menu.setData("changed", false);
                    var popupMenu: JSPopupMenu = menu.getPopupMenu();
                    if (popupMenu) {
                        var parentSelected = parent.isSelected();
                        if (!parentSelected) {
                            parent.setSelected(true);
                            parent.getSelection().setSelected(menu);
                            menu.setData("changed", true);
                        }
                    }
                }
                mouseEvent.stopPropagation();
            },
            mouseReleased(mouseEvent: MouseEvent, component: JSComponent) {
                var menu: JSMenu = <JSMenu> component;
                var parent: JSComponent = menu.getParent();
                if (!(parent instanceof JSPopupMenu)) {
                    var changed = menu.getData("changed");
                    if (!changed) {
                        var popupMenu: JSPopupMenu = menu.getPopupMenu();
                        if (popupMenu) {
                            var parentSelected = parent.isSelected();
                            if (parentSelected) {
                                parent.setSelected(false);
                            }
                        }
                    }
                }
                mouseEvent.stopPropagation();
            },
            mouseEntered(mouseEvent: MouseEvent, component: JSComponent) {
                var menu: JSMenu = <JSMenu> component;
                var parent: JSComponent = menu.getParent();
                if (parent instanceof JSPopupMenu) {
                    parent.clearTimeout();
                    parent.setTimeout(menu, function() {
                        var parentSelected = parent.isSelected();
                        if (parentSelected) {
                            parent.getSelection().setSelected(menu);
                        }
                    }, menu.getDelay())
                } else {
                    var parentSelected = parent.isSelected();
                    if (parentSelected) {
                        parent.getSelection().setSelected(menu);
                    }
                }
                menu.setBackground("#e6e6e6");
                mouseEvent.stopPropagation();
            },
            mouseExited(mouseEvent: MouseEvent, component: JSComponent) {
                var menu: JSMenu = <JSMenu> component;
                menu.setBackground(null);
                mouseEvent.stopPropagation();
            }
        });
    }
    init(): void {
        this.addClass("JSMenu");
        this.setBackground("#f2f2f2");
    }
    setIcon(icon: JSIcon) {
        super.setIcon(icon);
        var oldImage: JSComponent = this.getImage();
        if (oldImage) {
            this.remove(oldImage);
        }
        if (icon) {
            var image: JSImageIcon = new JSImageIcon(icon);
            image.setStyle("vertical-align", "middle");
            super.add(image, null, 1);
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
                    component.setExpandIcon(expandIcon);
                }
                var expandImage: JSPathImage = new JSPathImage(expandIcon);
                expandImage.getPath().setBackground("gray");
                expandImage.setStyle("vertical-align", "middle");
                component.setImage(expandImage);
                component.add(expandImage);
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