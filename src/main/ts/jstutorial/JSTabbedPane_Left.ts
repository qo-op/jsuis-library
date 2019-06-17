/// <reference path = "../jstutorial.ts"/>
/**
 * JSTabbedPane_Left
 */
namespace jstutorial {
    export class JSTabbedPane_Left extends JSTabbedPane {
        
        static instance: JSTabbedPane_Left;
        static getInstance(): JSTabbedPane_Left {
            if (JSTabbedPane_Left.instance === undefined) {
                JSTabbedPane_Left.instance = new JSTabbedPane_Left();
            }
            return JSTabbedPane_Left.instance;
        }
        constructor() {
            super(JSTabbedPane.LEFT);
            this.addClass("JSTabbedPane_Left");
        }
    }
}
