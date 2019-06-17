/// <reference path = "../jstutorial.ts"/>
/**
 * JSButton_Collapse
 */
namespace jstutorial {
    export class JSButton_Collapse extends JSButton {
        
        static instance: JSButton_Collapse;
        static getInstance(): JSButton_Collapse {
            if (JSButton_Collapse.instance === undefined) {
                JSButton_Collapse.instance = new JSButton_Collapse();
            }
            return JSButton_Collapse.instance;
        }
        constructor() {
            super(JSAction_Collapse.getInstance());
            this.addClass("JSButton_Collapse");
            this.setUndecorated(true);
        }
    }
}
