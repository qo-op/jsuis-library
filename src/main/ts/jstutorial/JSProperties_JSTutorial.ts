/// <reference path = "../jstutorial.ts"/>
/**
 * JSProperties_JSTutorial
 */
namespace jstutorial {
    export class JSProperties_JSTutorial extends JSProperties {
        
        static instance: JSProperties_JSTutorial;
        static getInstance(): JSProperties_JSTutorial {
            if (JSProperties_JSTutorial.instance === undefined) {
                JSProperties_JSTutorial.instance = new JSProperties_JSTutorial();
            }
            return JSProperties_JSTutorial.instance;
        }
    }
}
