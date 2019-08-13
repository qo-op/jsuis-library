/// <reference path = "../jsuis.ts"/>
/**
 * JSMenu
 * 
 * @author Yassuo Toda
 */
/// <reference path = "../jsuis.ts"/>
class JSMenu extends JSMenuItem implements JSRunnable {
    
    static DELAY: number = 200;
    
    static SUBMENU_ICON: JSIcon = new JSPathIcon("M5.17,2.34L10.83,8L5.17,13.66Z", 16, 16).withFill("gray");
    
    delay: number = JSMenu.DELAY;
    
    private span_Submenu: JSSpan;
    private span_Box: JSSpan;
    private div_PopupMenu: JSDiv;
    private popupMenu: JSPopupMenu;
    private mouseListener_Menu: JSMouseListener;
    private timer: JSTimer;
    
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
    getSubmenuSpan(): JSSpan {
        if (!this.span_Submenu) {
            this.span_Submenu = new JSSpan();
            this.span_Submenu.setStyle("float", "right");
            this.span_Submenu.setStyle("right", "0");
            this.span_Submenu.setStyle("position", "absolute");
        }
        return this.span_Submenu;
    }
    getBoxSpan(): JSSpan {
        if (!this.span_Box) {
            this.span_Box = new JSSpan();
        }
        return this.span_Box;
    }
    setSubmenuIcon(icon: JSIcon) {
        var span_Submenu: JSSpan = this.getSubmenuSpan();
        var parent: JSComponent = span_Submenu.getParent();
        if (!icon) {
            if (parent === this) {
                this.remove(span_Submenu);
            }
        } else {
            if (parent !== this) {
                var span_Box: JSSpan = this.getBoxSpan();
                span_Box.setPadding(0, icon.getIconWidth(), 0, 0);
                var div_PopupMenu: JSDiv = this.getDiv_PopupMenu();
                if (div_PopupMenu) {
                    this.add(span_Box, null, this.getComponents().length - 1);
                    this.add(span_Submenu, null, this.getComponents().length - 1);
                } else {
                    this.add(span_Box);
                    this.add(span_Submenu);
                }
            }
            icon.paintIcon(this, span_Submenu);
        }
        if (this.isValid()) {
            this.revalidate();
        }
    }
    getDiv_PopupMenu(): JSDiv {
        if (!this.div_PopupMenu) {
            this.div_PopupMenu = new JSDiv();
            this.div_PopupMenu.setStyle("position", "absolute");
            super.add(this.div_PopupMenu);
        }
        return this.div_PopupMenu;
    }
    getPopupMenu(): JSPopupMenu {
        if (!this.popupMenu) {
            this.popupMenu = new JSPopupMenu();
            var container: JSDiv = this.getDiv_PopupMenu();
            container.add(this.popupMenu);
            this.popupMenu.revalidate(container);
        }
        return this.popupMenu;
    }
    getDelay(): number {
        return this.delay;
    }
    setDelay(delay: number) {
        this.delay = delay;
    }
    getTimer(): JSTimer {
        if (!this.timer) {
            this.timer = new JSTimer();
        }
        return this.timer;
    }
    add(component: JSComponent, constraints?: number | Number | string | { [ key: string ]: number | string }, index?: number): void {
        if (component instanceof JSMenu || component instanceof JSMenuItem || component instanceof JSCheckBoxMenuItem || component instanceof JSSeparator) {
            var popupMenu: JSPopupMenu = this.getPopupMenu();
            popupMenu.add.apply(popupMenu, arguments);
            if (component instanceof JSMenu) {
                component.setSubmenuIcon(JSMenu.SUBMENU_ICON);
            }
        } else {
            super.add.apply(this, arguments);
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
    run(): void {
        var parent: JSComponent = this.getParent();
        var parentSelected = parent.isSelected();
        if (parentSelected) {
            parent.getSelection().setSelected(this);
        }
    }
    getMouseListener(): JSMouseListener {
        if (!this.mouseListener_Menu) {
            this.mouseListener_Menu = new JSMenuMouseListener(this);
        }
        return this.mouseListener_Menu;
    }
}