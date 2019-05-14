/// <reference path = "../jstutorial.ts"/>
/**
 * JSMenu_ComponentTutorials
 */
namespace jstutorial {
    export class JSMenu_ComponentTutorials extends JSMenu {
        
        static instance: JSMenu_ComponentTutorials;
        static getInstance(): JSMenu_ComponentTutorials {
            if (JSMenu_ComponentTutorials.instance === undefined) {
                JSMenu_ComponentTutorials.instance = new JSMenu_ComponentTutorials();
            }
            return JSMenu_ComponentTutorials.instance;
        }
        constructor() {
            super("Component tutorials", JSIcon_Closed.getInstance());
            this.addClass("JSMenu_ComponentTutorials");
        }
    }
}
