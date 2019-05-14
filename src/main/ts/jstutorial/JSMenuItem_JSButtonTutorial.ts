/// <reference path = "../jstutorial.ts"/>
/**
 * JSMenuItem_JSButtonTutorial
 */
namespace jstutorial {
    export class JSMenuItem_JSButtonTutorial extends JSMenuItem {
        
        static instance: JSMenuItem_JSButtonTutorial;
        static getInstance(): JSMenuItem_JSButtonTutorial {
            if (JSMenuItem_JSButtonTutorial.instance === undefined) {
                JSMenuItem_JSButtonTutorial.instance = new JSMenuItem_JSButtonTutorial();
            }
            return JSMenuItem_JSButtonTutorial.instance;
        }
        constructor() {
            super(JSAction_JSButtonTutorial.getInstance());
            this.addClass("JSMenuItem_JSButtonTutorial");
        }
    }
}
