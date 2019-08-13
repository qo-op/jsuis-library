/// <reference path = "../jsuis.ts"/>
/**
 * JSCheckBoxMenuItemUI
 * 
 * @author Yassuo Toda
 */
class JSCheckBoxMenuItemUI implements JSUI {
    
    private static instance: JSCheckBoxMenuItemUI;
    static getInstance(): JSCheckBoxMenuItemUI {
        if (JSCheckBoxMenuItemUI.instance === undefined) {
            JSCheckBoxMenuItemUI.instance = new JSCheckBoxMenuItemUI();
        }
        return JSCheckBoxMenuItemUI.instance;
    }
    
    installUI(component: JSCheckBoxMenuItem): void {
        component.setClass("JSCheckBoxMenuItem");
    }
}
