/// <reference path = "../jstutorial.ts"/>
/**
 * JSMenuItem_JSFrameExample
 */
namespace jstutorial {
    export class JSMenuItem_JSFrameExample extends JSMenuItem {
        
        static instance: JSMenuItem_JSFrameExample;
        static getInstance(): JSMenuItem_JSFrameExample {
            if (JSMenuItem_JSFrameExample.instance === undefined) {
                JSMenuItem_JSFrameExample.instance = new JSMenuItem_JSFrameExample();
            }
            return JSMenuItem_JSFrameExample.instance;
        }
        constructor() {
            super("JS Frame example");
            this.addClass("JSMenuItem_JSFrameExample");
        }
    }
}
