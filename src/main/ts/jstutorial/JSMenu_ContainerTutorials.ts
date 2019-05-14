/// <reference path = "../jstutorial.ts"/>
/**
 * JSMenu_ContainerTutorials
 */
namespace jstutorial {
    export class JSMenu_ContainerTutorials extends JSMenu {
        
        static instance: JSMenu_ContainerTutorials;
        static getInstance(): JSMenu_ContainerTutorials {
            if (JSMenu_ContainerTutorials.instance === undefined) {
                JSMenu_ContainerTutorials.instance = new JSMenu_ContainerTutorials();
            }
            return JSMenu_ContainerTutorials.instance;
        }
        constructor() {
            super("Container tutorials", JSIcon_Closed.getInstance());
            this.addClass("JSMenu_ContainerTutorials");
        }
    }
}
