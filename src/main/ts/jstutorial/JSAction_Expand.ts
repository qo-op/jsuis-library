/// <reference path = "../jstutorial.ts"/>
/**
 * JSAction_Expand
 */
namespace jstutorial {
    export class JSAction_Expand extends JSAction {
        
        static instance: JSAction_Expand;
        static getInstance(): JSAction_Expand {
            if (JSAction_Expand.instance === undefined) {
                JSAction_Expand.instance = new JSAction_Expand();
            }
            return JSAction_Expand.instance;
        }
        constructor() {
            super(new JSImageIcon("/img/baseline-keyboard_arrow_right-24px.svg", 24, 24));
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var jsSplitPane_Main: JSSplitPane_JSTutorial = JSSplitPane_JSTutorial.getInstance();
            jsSplitPane_Main.setDividerLocation(jsSplitPane_Main.getLeftComponent().getPreferredOuterWidth() + 1);
            var jsPanel_ToggleButtonPanel: JSPanel_ToggleButtonPanel = JSPanel_ToggleButtonPanel.getInstance();
            jsPanel_ToggleButtonPanel.last();
        }
    }
}
