/// <reference path = "../jsuis.ts"/>
/**
 * JSMenuItemMouseListener
 * 
 * @author Yassuo Toda
 */
class JSMenuItemMouseListener implements MouseListener {
    
    private menuItem: JSMenuItem;
    
    constructor(menuItem: JSMenuItem) {
        this.setMenuItem(menuItem);
    }
    getMenuItem(): JSMenuItem {
        return this.menuItem;
    }
    setMenuItem(menuItem: JSMenuItem) {
        this.menuItem = menuItem;
    }
    /*
    mouseEntered(mouseEvent: MouseEvent) {
        var menuItem: JSMenuItem = this.getMenuItem();
        var parent: JSComponent = menuItem.getParent();
        var parentSelected = parent.isSelected();
        if (parentSelected) {
            parent.getSelection().setSelected(menuItem);
        }
        mouseEvent.stopPropagation();
    }
    */
    mouseClicked(mouseEvent: MouseEvent) {
        var menuItem: JSMenuItem = this.getMenuItem();
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
            if (parent instanceof JSMenuContainer) {
                parent.setSelected(false);
            } else if (invoker instanceof JSMenu) {
                invoker.setSelected(false);
            } else {
                popuMenu.setSelected(false);
            }
        }
        mouseEvent.stopPropagation();
    }
}