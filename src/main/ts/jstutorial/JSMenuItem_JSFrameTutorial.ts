/// <reference path = "../jstutorial.ts"/>
/**
 * JSMenuItem_JSFrameTutorial
 */
namespace jstutorial {
    export class JSMenuItem_JSFrameTutorial extends JSMenuItem {
        
        static instance: JSMenuItem_JSFrameTutorial;
        static getInstance(): JSMenuItem_JSFrameTutorial {
            if (JSMenuItem_JSFrameTutorial.instance === undefined) {
                JSMenuItem_JSFrameTutorial.instance = new JSMenuItem_JSFrameTutorial();
            }
            return JSMenuItem_JSFrameTutorial.instance;
        }
        constructor() {
            super(JSAction_JSFrameTutorial.getInstance());
            this.addClass("JSMenuItem_JSFrameTutorial");
        }
    }
}
