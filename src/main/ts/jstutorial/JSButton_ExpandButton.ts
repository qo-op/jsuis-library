/// <reference path = "../jstutorial.ts"/>
/**
 * JSButton_ExpandButton
 */
namespace jstutorial {
    export class JSButton_ExpandButton extends JSButton {
        
        static instance: JSButton_ExpandButton;
        static getInstance(): JSButton_ExpandButton {
            if (JSButton_ExpandButton.instance === undefined) {
                JSButton_ExpandButton.instance = new JSButton_ExpandButton();
            }
            return JSButton_ExpandButton.instance;
        }
        constructor() {
            super(JSAction_Expand.getInstance());
            this.addClass("JSButton_ExpandButton");
            this.setUndecorated(true);
        }
    }
}
