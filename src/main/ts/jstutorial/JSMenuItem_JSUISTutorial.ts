/// <reference path = "../jstutorial.ts"/>
/**
 * JSMenuItem_JSUISTutorial
 */
namespace jstutorial {
    export class JSMenuItem_JSUISTutorial extends JSMenuItem {
        
        static instance: JSMenuItem_JSUISTutorial;
        static getInstance(): JSMenuItem_JSUISTutorial {
            if (JSMenuItem_JSUISTutorial.instance === undefined) {
                JSMenuItem_JSUISTutorial.instance = new JSMenuItem_JSUISTutorial();
            }
            return JSMenuItem_JSUISTutorial.instance;
        }
        constructor() {
            super(JSAction_JSUISTutorial.getInstance());
            this.addClass("JSMenuItem_JSUISTutorial");
        }
    }
}
