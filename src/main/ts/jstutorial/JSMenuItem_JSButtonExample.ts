/// <reference path = "../jstutorial.ts"/>
/**
 * JSMenuItem_JSButtonExample
 */
namespace jstutorial {
    export class JSMenuItem_JSButtonExample extends JSMenuItem {
        
        static instance: JSMenuItem_JSButtonExample;
        static getInstance(): JSMenuItem_JSButtonExample {
            if (JSMenuItem_JSButtonExample.instance === undefined) {
                JSMenuItem_JSButtonExample.instance = new JSMenuItem_JSButtonExample();
            }
            return JSMenuItem_JSButtonExample.instance;
        }
        constructor() {
            super("JS Button example");
            this.addClass("JSMenuItem_JSButtonExample");
        }
    }
}
