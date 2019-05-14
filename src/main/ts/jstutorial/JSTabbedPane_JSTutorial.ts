/// <reference path = "../jstutorial.ts"/>
/**
 * JSTabbedPane_JSTutorial
 */
namespace jstutorial {
    export class JSTabbedPane_JSTutorial extends JSTabbedPane {
        
        static instance: JSTabbedPane_JSTutorial;
        static getInstance(): JSTabbedPane_JSTutorial {
            if (JSTabbedPane_JSTutorial.instance === undefined) {
                JSTabbedPane_JSTutorial.instance = new JSTabbedPane_JSTutorial();
            }
            return JSTabbedPane_JSTutorial.instance;
        }
        constructor() {
            super(JSTabbedPane.LEFT);
            this.addClass("JSTabbedPane_JSTutorial");
        }
    }
}
