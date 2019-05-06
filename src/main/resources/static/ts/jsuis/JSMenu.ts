/// <reference path = "../jsuis.ts"/>
/**
 * JSMenu
 * 
 * @author Yassuo Toda
 */
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
        
        var label: JSLabel = this.getLabel();
        super.add(label);
        
        var popupMenuContainer: JSDiv = this.getPopupMenuContainer();
        super.add(popupMenuContainer);
        
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
                mouseEvent.stopPropagation();
            }
        });
    }
    init(): void {
        this.addClass("JSMenu");
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
        var label: JSLabel = this.getData("label");
        if (!label) {
            label = new JSLabel();
            this.setData("label", label);
        }
        return label;
    }
    getExpandIcon(): JSPathIcon {
        return this.getData("expandIcon");
    }
    setExpandIcon(expandIcon: JSIcon) {
        this.setData("expandIcon", expandIcon);
        var oldExpandImage: JSComponent = this.getExpandImage();
        if (oldExpandImage) {
            this.remove(oldExpandImage);
        }
        if (expandIcon) {
            var expandImage: JSComponent;
            if (expandIcon instanceof JSPathIcon) {
                expandImage = new JSPathImage(expandIcon);
            } else {
                expandImage = new JSImage(expandIcon);
            }
            expandImage.setStyle("top", "calc(50% - " + (expandIcon.getIconHeight() / 2) + "px)");
            var label: JSLabel = this.getLabel();
            label.setStyle("margin-right", expandIcon.getIconWidth() + "px");
            super.add(expandImage);
            this.setExpandImage(expandImage);
        }
    }
    getExpandImage(): JSComponent {
        return this.getData("expandImage");
    }
    setExpandImage(expandImage: JSComponent) {
        this.setData("expandImage", expandImage);
    }
    getPopupMenuContainer(): JSDiv {
        var popupMenuContainer = this.getData("popupMenuContainer");
        if (!popupMenuContainer) {
            popupMenuContainer = new JSDiv();
            popupMenuContainer.setStyle("position", "absolute");
            this.setData("popupMenuContainer", popupMenuContainer);
        }
        return popupMenuContainer;
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
        if (component instanceof JSMenu || component instanceof JSMenuItem || component instanceof JSMenuSeparator) {
            var popupMenu: JSPopupMenu = this.getPopupMenu();
            if (!popupMenu) {
                popupMenu = new JSPopupMenu();
                this.setPopupMenu(popupMenu);
            }
            popupMenu.add(component);
            if (component instanceof JSMenu) {
                var expandIcon: JSPathIcon = component.getExpandIcon();
                if (!expandIcon) {
                    expandIcon = new JSPathIcon("M5.17,2.34L10.83,8L5.17,13.66Z", 16, 16).withBackground("gray");;
                    component.setExpandIcon(expandIcon);
                }
            }
        } else {
            super.add(component);
        }
    }
    addSeparator(): void {
        this.add(new JSMenuSeparator());
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
                    popupMenu.show(this, this.getWidth(), 0 - this.getHeight() - popupMenu.getPaddingTop() - popupMenu.getBorderTopWidth());
                } else {
                    popupMenu.show(this, 0 - this.getPaddingLeft(), this.getPaddingBottom());
                }
            } else {
                popupMenu.setSelected(false);
            }
        }
        super.setSelected(selected);
    }
}