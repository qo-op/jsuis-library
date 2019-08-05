/// <reference path = "../jsuis.ts"/>
/**
 * JSCheckBoxMenuItemUI
 * 
 * @author Yassuo Toda
 */
class JSCheckBoxMenuItemUI implements UI {
    
    private static instance: JSCheckBoxMenuItemUI;
    static getInstance(): JSCheckBoxMenuItemUI {
        if (JSCheckBoxMenuItemUI.instance === undefined) {
            JSCheckBoxMenuItemUI.instance = new JSCheckBoxMenuItemUI();
        }
        return JSCheckBoxMenuItemUI.instance;
    }
    
    installUI(component: JSCheckBoxMenuItem): void {
        component.setClass("JSCheckBoxMenuItem");
        component.setStyle("padding", "0 4px");
        component.setStyle("white-space", "nowrap");
    }
}
