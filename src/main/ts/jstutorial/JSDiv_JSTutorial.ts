/// <reference path = "../jstutorial.ts"/>
/**
 * JSDiv_JSTutorial
 */
namespace jstutorial {
    export class JSDiv_JSTutorial extends JSDiv {
        
        static instance: JSDiv_JSTutorial;
        static getInstance(): JSDiv_JSTutorial {
            if (JSDiv_JSTutorial.instance === undefined) {
                JSDiv_JSTutorial.instance = new JSDiv_JSTutorial();
            }
            return JSDiv_JSTutorial.instance;
        }
        constructor() {
            super();
            this.addClass("JSDiv_JSTutorial");
            
            var p: JSP = new JSP("JSUIS is a javascript library to build complex user interfaces.");
            this.add(p);
        }
    }
}
