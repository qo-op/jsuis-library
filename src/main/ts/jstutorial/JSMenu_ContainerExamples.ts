/// <reference path = "../jstutorial.ts"/>
/**
 * JSMenu_ContainerExamples
 */
namespace jstutorial {
    export class JSMenu_ContainerExamples extends JSMenu {
        
        static instance: JSMenu_ContainerExamples;
        static getInstance(): JSMenu_ContainerExamples {
            if (JSMenu_ContainerExamples.instance === undefined) {
                JSMenu_ContainerExamples.instance = new JSMenu_ContainerExamples();
            }
            return JSMenu_ContainerExamples.instance;
        }
        constructor() {
            super("Container examples", JSIcon_Closed.getInstance());
            this.addClass("JSMenu_ContainerExamples");
        }
    }
}
