/// <reference path = "../jstutorial.ts"/>
/**
 * JSMenu_ComponentExamples
 */
namespace jstutorial {
    export class JSMenu_ComponentExamples extends JSMenu {
        
        static instance: JSMenu_ComponentExamples;
        static getInstance(): JSMenu_ComponentExamples {
            if (JSMenu_ComponentExamples.instance === undefined) {
                JSMenu_ComponentExamples.instance = new JSMenu_ComponentExamples();
            }
            return JSMenu_ComponentExamples.instance;
        }
        constructor() {
            super("Component examples", JSIcon_Closed.getInstance());
            this.addClass("JSMenu_ComponentExamples");
        }
    }
}
