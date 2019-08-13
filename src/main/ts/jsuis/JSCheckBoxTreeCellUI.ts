/// <reference path = "../jsuis.ts"/>
/**
 * JSCheckBoxTreeCellUI
 * 
 * @author Yassuo Toda
 */
class JSCheckBoxTreeCellUI implements JSUI {
    
    private static instance: JSCheckBoxTreeCellUI;
    static getInstance(): JSCheckBoxTreeCellUI {
        if (JSCheckBoxTreeCellUI.instance === undefined) {
            JSCheckBoxTreeCellUI.instance = new JSCheckBoxTreeCellUI();
        }
        return JSCheckBoxTreeCellUI.instance;
    }
    
    installUI(component: JSCheckBoxTreeCell): void {
        component.setClass("JSCheckBoxTreeCell");
    }
}
