/// <reference path = "../jsuis.ts"/>
/**
 * JSRadioButtonMenuItemMouseListener
 * 
 * @author Yassuo Toda
 */
class JSRadioButtonMenuItemMouseListener implements JSMouseListener {
    
    private menuItem: JSRadioButtonMenuItem;
    
    constructor(menuItem: JSRadioButtonMenuItem) {
        this.setRadioButtonMenuItem(menuItem);
    }
    getRadioButtonMenuItem(): JSRadioButtonMenuItem {
        return this.menuItem;
    }
    setRadioButtonMenuItem(menuItem: JSRadioButtonMenuItem) {
        this.menuItem = menuItem;
    }
    mouseClicked(mouseEvent: MouseEvent) {
        var checkBoxMenuItem: JSRadioButtonMenuItem = this.getRadioButtonMenuItem();
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
        checkBoxMenuItem.setSelected(true);
        mouseEvent.stopPropagation();
    }
}
