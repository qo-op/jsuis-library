/// <reference path = "../jsuis.ts"/>
/**
 * JSCheckBoxMenuItemMouseListener
 * 
 * @author Yassuo Toda
 */
class JSCheckBoxMenuItemMouseListener implements JSMouseListener {
    
    private menuItem: JSCheckBoxMenuItem;
    
    constructor(menuItem: JSCheckBoxMenuItem) {
        this.setCheckBoxMenuItem(menuItem);
    }
    getCheckBoxMenuItem(): JSCheckBoxMenuItem {
        return this.menuItem;
    }
    setCheckBoxMenuItem(menuItem: JSCheckBoxMenuItem) {
        this.menuItem = menuItem;
    }
    mouseClicked(mouseEvent: MouseEvent) {
        var checkBoxMenuItem: JSCheckBoxMenuItem = this.getCheckBoxMenuItem();
        var parent: JSComponent = checkBoxMenuItem.getParent();
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
        checkBoxMenuItem.setSelected(!checkBoxMenuItem.isSelected());
        mouseEvent.stopPropagation();
    }
}
