/// <reference path = "../jstutorial.ts"/>
/**
 * JSAction_Collapse
 */
namespace jstutorial {
    export class JSAction_Collapse extends JSAction {
        
        static instance: JSAction_Collapse;
        static getInstance(): JSAction_Collapse {
            if (JSAction_Collapse.instance === undefined) {
                JSAction_Collapse.instance = new JSAction_Collapse();
            }
            return JSAction_Collapse.instance;
        }
        constructor() {
            super(new JSImageIcon("/img/baseline-keyboard_arrow_left-24px.svg", 24, 24));
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var jsSplitPane_Main: JSSplitPane_JSTutorial = JSSplitPane_JSTutorial.getInstance();
            var jsSplitPane_Main_JSSplitPaneLeftContainer: JSSplitPaneLeftContainer = jsSplitPane_Main.getLeftContainer();
            jsSplitPane_Main.setDividerLocation(jsSplitPane_Main_JSSplitPaneLeftContainer.getBorderRightWidth());
            var jsPanel_ToggleButtonPanel: JSPanel_ToggleButtonPanel = JSPanel_ToggleButtonPanel.getInstance();
            jsPanel_ToggleButtonPanel.first();
        }
    }
}
