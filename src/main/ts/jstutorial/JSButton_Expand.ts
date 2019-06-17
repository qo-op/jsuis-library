/// <reference path = "../jstutorial.ts"/>
/**
 * JSButton_Expand
 */
namespace jstutorial {
    export class JSButton_Expand extends JSButton {
        
        static instance: JSButton_Expand;
        static getInstance(): JSButton_Expand {
            if (JSButton_Expand.instance === undefined) {
                JSButton_Expand.instance = new JSButton_Expand();
            }
            return JSButton_Expand.instance;
        }
        constructor() {
            super(JSAction_Expand.getInstance());
            this.addClass("JSButton_Expand");
            this.setUndecorated(true);
        }
    }
}
