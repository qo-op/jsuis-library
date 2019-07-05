/// <reference path = "../jsuis.ts"/>
/**
 * JSMenu
 * 
 * @author Yassuo Toda
 */
/// <reference path = "../jsuis.ts"/>
class JSMenu extends JSMenuItem implements MouseListener, Runnable {
    
    static DELAY: number = 200;
    
    static SUBMENU_ICON: JSIcon = new JSPathIcon("M5.17,2.34L10.83,8L5.17,13.66Z", 16, 16).withFill("gray");
    
    delay: number = JSMenu.DELAY;
    
    constructor();
    constructor(element: HTMLElement);
    constructor(icon: JSIcon);
    constructor(text: string);
    constructor(text: string, icon: JSIcon);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSMenu");
        
        var graphics: JSMenuGraphics = this.getGraphics();
        super.add(graphics);
        
        var popupMenuContainer: JSPopupMenuContainer = this.getPopupMenuContainer();
        super.add(popupMenuContainer);
        
        switch (arguments.length) {
        case 1:
            // constructor(icon: JSIcon);
            // constructor(text: string);
            if (arguments[0] instanceof JSIcon) {
                var icon: JSIcon = arguments[0];
                this.setIcon(icon);
            } else if (typeof arguments[0] === "string") {
                var text: string = arguments[0];
                this.setText(text);
            }
            break;
        case 2:
            // constructor(text: string, icon: JSIcon);
            if (typeof arguments[0] === "string" && arguments[1] instanceof JSIcon) {
                var text: string = arguments[0];
                var icon: JSIcon = arguments[1];
                this.setText(text);
                this.setIcon(icon);
            }
            break;
        default:
        }
    }
    getGraphics(): JSMenuGraphics {
        var graphics: JSMenuGraphics = this.getData("graphics");
        if (!graphics) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSMenuGraphics");
            if (element) {
                graphics = new JSMenuGraphics(element);
            } else {
                graphics = new JSMenuGraphics();
            }
            graphics.setStyle("position", "absolute");
            graphics.setStyle("right", "0");
            this.setData("graphics", graphics);
        }
        return graphics;
    }
    getPopupMenuContainer(): JSPopupMenuContainer {
        var popupMenuContainer: JSPopupMenuContainer = this.getData("popupMenuContainer");
        if (!popupMenuContainer) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSPopupMenuContainer");
            if (element) {
                popupMenuContainer = new JSPopupMenuContainer(element);
            } else {
                popupMenuContainer = new JSPopupMenuContainer();
            }
            popupMenuContainer.setStyle("position", "absolute");
            popupMenuContainer.setStyle("display", "block");
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
                    var popupMenuLayout: JSLayout = popupMenu.getLayout();
                    if (popupMenuLayout) {
                        popupMenu.setWidth(popupMenu.getPreferredWidth());
                        popupMenu.setHeight(popupMenu.getPreferredHeight());
                        popupMenu.revalidate();
                    }
                }
            }
        }
        this.setData("popupMenu", popupMenu);
    }
    getSubmenuIcon(): JSPathIcon {
        return this.getData("submenuIcon");
    }
    setSubmenuIcon(icon: JSIcon) {
        this.setData("submenuIcon", icon);
        var graphics: JSMenuGraphics = this.getGraphics();
        if (graphics) {
            if (icon) {
                icon.paintIcon(this, graphics);
            } else {
                graphics.removeAll();
            }
            graphics.setStyle("top", "50%");
            graphics.setStyle("margin-top", -(icon.getIconHeight() / 2) + "px");
        }
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
    add(component: JSComponent): void {
        if (component instanceof JSMenu || component instanceof JSMenuItem || component instanceof JSCheckBoxMenuItem || component instanceof JSSeparator) {
            var popupMenu: JSPopupMenu = this.getPopupMenu();
            if (!popupMenu) {
                popupMenu = new JSPopupMenu();
                this.setPopupMenu(popupMenu);
            }
            popupMenu.add(component);
            if (component instanceof JSMenu) {
                component.setStyle("display", "block");
                component.setSubmenuIcon(JSMenu.SUBMENU_ICON);
                var label: JSLabel = component.getLabel();
                label.setStyle("margin-right", JSMenu.SUBMENU_ICON.getIconWidth() + "px");
            }
        } else {
            super.add(component);
        }
    }
    addSeparator(): void {
        var separator = new JSSeparator();
        separator.setStyle("display", "block");
        this.add(separator);
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
        mouseEvent.stopPropagation();
    }
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
        mouseEvent.stopPropagation();
    }
    mouseClicked(mouseEvent: MouseEvent) {
        mouseEvent.stopPropagation();
    }
    mouseEntered(mouseEvent: MouseEvent) {
        var parent: JSComponent = this.getParent();
        if (parent instanceof JSPopupMenu) {
            var timer: JSTimer = this.getTimer();
            timer.cancel();
            timer.schedule(this, this.getDelay());
        } else {
            var parentSelected = parent.isSelected();
            if (parentSelected) {
                parent.getSelection().setSelected(this);
            }
        }
        mouseEvent.stopPropagation();
    }
    mouseExited(mouseEvent: MouseEvent) {
        var parent: JSComponent = this.getParent();
        if (parent instanceof JSPopupMenu) {
            var timer: JSTimer = this.getTimer();
            timer.cancel();
        }
    }
    run(): void {
        var parent: JSComponent = this.getParent();
        var parentSelected = parent.isSelected();
        if (parentSelected) {
            parent.getSelection().setSelected(this);
        }
    }
}