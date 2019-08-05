/// <reference path = "../jsuis.ts"/>
/**
 * JSMenuMouseListener
 * 
 * @author Yassuo Toda
 */
class JSMenuMouseListener implements MouseListener {
    
    private menu: JSMenu;
    
    constructor(menu: JSMenu) {
        this.setMenu(menu);
    }
    getMenu(): JSMenu {
        return this.menu;
    }
    setMenu(menu: JSMenu) {
        this.menu = menu;
    }
    mousePressed(mouseEvent: MouseEvent) {
        var menu: JSMenu = this.getMenu();
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
    }
    mouseReleased(mouseEvent: MouseEvent) {
        var menu: JSMenu = this.getMenu();
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
    }
    mouseClicked(mouseEvent: MouseEvent) {
        mouseEvent.stopPropagation();
    }
    mouseEntered(mouseEvent: MouseEvent) {
        var menu: JSMenu = this.getMenu();
        var parent: JSComponent = menu.getParent();
        if (parent instanceof JSPopupMenu) {
            var timer: JSTimer = menu.getTimer();
            timer.cancel();
            timer.schedule(menu, menu.getDelay());
        } else {
            var parentSelected = parent.isSelected();
            if (parentSelected) {
                parent.getSelection().setSelected(menu);
            }
        }
        mouseEvent.stopPropagation();
    }
    mouseExited(mouseEvent: MouseEvent) {
        var menu: JSMenu = this.getMenu();
        var parent: JSComponent = menu.getParent();
        if (parent instanceof JSPopupMenu) {
            var timer: JSTimer = menu.getTimer();
            timer.cancel();
        }
    }
}