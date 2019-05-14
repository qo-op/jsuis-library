/// <reference path = "../jstutorial.ts"/>
/**
 * JSDiv_JSButtonTutorial
 */
namespace jstutorial {
    export class JSDiv_JSButtonTutorial extends JSDiv {
        
        static instance: JSDiv_JSButtonTutorial;
        static getInstance(): JSDiv_JSButtonTutorial {
            if (JSDiv_JSButtonTutorial.instance === undefined) {
                JSDiv_JSButtonTutorial.instance = new JSDiv_JSButtonTutorial();
            }
            return JSDiv_JSButtonTutorial.instance;
        }
        constructor() {
            super();
            this.addClass("JSDiv_JSButtonTutorial");
            
            var p: JSP = new JSP("JSButton is a button.");
            this.add(p);
        }
    }
}
