/// <reference path = "../jstutorial.ts"/>
/**
 * JSLabel_Title
 */
namespace jstutorial {
    export class JSLabel_Title extends JSLabel {
        
        static instance: JSLabel_Title;
        static getInstance(): JSLabel_Title {
            if (JSLabel_Title.instance === undefined) {
                JSLabel_Title.instance = new JSLabel_Title();
            }
            return JSLabel_Title.instance;
        }
        constructor() {
            super("JSUIS - JavaScript User Interface", JSLabel.CENTER);
            this.addClass("JSLabel_Title");
        }
    }
}
