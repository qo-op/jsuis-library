/// <reference path = "../jsuis.ts"/>
/**
 * JSMenu
 * 
 * @author Yassuo Toda
 */
/// <reference path = "../jsuis.ts"/>
class JSMenu extends JSHTMLComponent {
    
    static DELAY: number = 200;
    
    static SUBMENU_ICON: JSIcon = new JSPathIcon("M5.17,2.34L10.83,8L5.17,13.66Z", 16, 16).withFill("gray");
    
    delay: number = JSMenu.DELAY;
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(text: string, icon: JSIcon);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        
        var label: JSLabel = this.getLabel();
        super.add(label);
        
        var graphics: JSGraphics = this.getGraphics();
        super.add(graphics);
        
        var popupMenuContainer: JSDiv = this.getPopupMenuContainer();
        super.add(popupMenuContainer);
        
        switch (args.length) {
        case 1:
            // constructor(icon: JSIcon);
            // constructor(text: string);
            if (args[0] instanceof JSIcon) {
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
            mousePressed(mouseEvent: MouseEvent, menu: JSMenu) {
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
            mouseReleased(mouseEvent: MouseEvent, menu: JSMenu) {
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
            mouseEntered(mouseEvent: MouseEvent, menu: JSMenu) {
                var parent: JSComponent = menu.getParent();
                if (parent instanceof JSPopupMenu) {
                    var timer: JSTimer = menu.getTimer();
                    timer.cancel();
                    timer.schedule({
                        run(): void {
                            var parentSelected = parent.isSelected();
                            if (parentSelected) {
                                parent.getSelection().setSelected(menu);
                            }
                        }
                    }, menu.getDelay());
                } else {
                    var parentSelected = parent.isSelected();
                    if (parentSelected) {
                        parent.getSelection().setSelected(menu);
                    }
                }
                mouseEvent.stopPropagation();
            },
            mouseExited(mouseEvent: MouseEvent, menu: JSMenu) {
                var parent: JSComponent = menu.getParent();
                if (parent instanceof JSPopupMenu) {
                    var timer: JSTimer = menu.getTimer();
                    timer.cancel();
                }
            }
        }).withParameters(this);
    }
    init(): void {
        this.addClass("JSMenu");
    }
    getLabel(): JSLabel {
        var label: JSLabel = this.getData("label");
        if (!label) {
            label = new JSLabel();
            this.setData("label", label);
        }
        return label;
    }
    getIcon(): JSIcon {
        var label: JSComponent = this.getLabel();
        return label.getIcon();
    }
    setIcon(icon: JSIcon) {
        var label: JSComponent = this.getLabel();
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
    getDelay(): number {
        return this.delay;
    }
    setDelay(delay: number) {
        this.delay = delay;
    }
    getTimer(): JSTimer {
        var timer: JSTimer = this.getData("timer");
        if (!timer) {
            timer = new JSTimer();
            this.setData("timer", timer); 
        }
        return timer;
    }
    getSubmenuIcon(): JSPathIcon {
        return this.getData("submenuIcon");
    }
    setSubmenuIcon(icon: JSIcon) {
        this.setData("submenuIcon", icon);
        var graphics: JSGraphics = this.getGraphics();
        if (graphics) {
            if (icon) {
                icon.paintIcon(this, graphics);
            } else {
                graphics.removeAll();
            }
            graphics.setStyle("top", "calc(50% - " + (icon.getIconHeight() / 2) + "px)");
        }
    }
    getGraphics(): JSGraphics {
        var graphics: JSGraphics = this.getData("graphics");
        if (!graphics) {
            graphics = new JSGraphics();
            graphics.setStyle("position", "absolute");
            graphics.setStyle("right", "0");
            this.setData("graphics", graphics);
        }
        return graphics;
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
        if (component instanceof JSMenu || component instanceof JSMenuItem || component instanceof JSCheckBoxMenuItem || component instanceof JSHorizontalSeparator) {
            var popupMenu: JSPopupMenu = this.getPopupMenu();
            if (!popupMenu) {
                popupMenu = new JSPopupMenu();
                this.setPopupMenu(popupMenu);
            }
            popupMenu.add(component);
            if (component instanceof JSMenu) {
                component.setStyle("display", "block");
                /*
                var expandIcon: JSIcon = component.getSubmenuIcon();
                if (!expandIcon) {
                    expandIcon = JSMenu.EXPAND_ICON;
                    component.setSubmenuIcon(expandIcon);
                }
                */
                component.setSubmenuIcon(JSMenu.SUBMENU_ICON);
                var label: JSLabel = component.getLabel();
                label.setStyle("margin-right", JSMenu.SUBMENU_ICON.getIconWidth() + "px");
            }
        } else {
            super.add(component);
        }
    }
    addSeparator(): void {
        this.add(new JSHorizontalSeparator());
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