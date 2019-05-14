/// <reference path = "../jstutorial.ts"/>
/**
 * JSMenuBar_JSTutorial
 */
namespace jstutorial {
    export class JSMenuBar_JSTutorial extends JSMenuBar {
        
        static instance: JSMenuBar_JSTutorial;
        static getInstance(): JSMenuBar_JSTutorial {
            if (JSMenuBar_JSTutorial.instance === undefined) {
                JSMenuBar_JSTutorial.instance = new JSMenuBar_JSTutorial();
            }
            return JSMenuBar_JSTutorial.instance;
        }
        constructor() {
            super();
            this.addClass("JSMenuBar_JSTutorial");
        }
    }
}
