/// <reference path = "../jstutorial.ts"/>
/**
 * JSMenuItem_JSTableExample
 */
namespace jstutorial {
    export class JSMenuItem_JSTableExample extends JSMenuItem {
        
        static instance: JSMenuItem_JSTableExample;
        static getInstance(): JSMenuItem_JSTableExample {
            if (JSMenuItem_JSTableExample.instance === undefined) {
                JSMenuItem_JSTableExample.instance = new JSMenuItem_JSTableExample();
            }
            return JSMenuItem_JSTableExample.instance;
        }
        constructor() {
            super(JSAction_JSTableExample.getInstance());
            this.addClass("JSMenuItem_JSTableExample");
        }
    }
}
