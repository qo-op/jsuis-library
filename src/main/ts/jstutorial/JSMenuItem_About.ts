/// <reference path = "../jstutorial.ts"/>
/**
 * JSMenuItem_About
 */
namespace jstutorial {
    export class JSMenuItem_About extends JSMenuItem {
        
        static instance: JSMenuItem_About;
        static getInstance(): JSMenuItem_About {
            if (JSMenuItem_About.instance === undefined) {
                JSMenuItem_About.instance = new JSMenuItem_About();
            }
            return JSMenuItem_About.instance;
        }
        constructor() {
            super(JSAction_About.getInstance());
            this.addClass("JSMenuItem_About");
        }
    }
}
