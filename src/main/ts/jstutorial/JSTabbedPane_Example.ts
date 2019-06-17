/// <reference path = "../jstutorial.ts"/>
/**
 * JSTabbedPane_Example
 */
namespace jstutorial {
    export class JSTabbedPane_Example extends JSTabbedPane {
        
        static instance: JSTabbedPane_Example;
        static getInstance(): JSTabbedPane_Example {
            if (JSTabbedPane_Example.instance === undefined) {
                JSTabbedPane_Example.instance = new JSTabbedPane_Example();
            }
            return JSTabbedPane_Example.instance;
        }
        constructor() {
            super(JSTabbedPane.TOP);
            this.addClass("JSTabbedPane_Example");
        }
    }
}
