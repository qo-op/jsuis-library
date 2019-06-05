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
            var splitPane_JSTutorial: JSSplitPane_JSTutorial = JSSplitPane_JSTutorial.getInstance();
            var splitPane_JSTutorial_JSSplitPaneLeftContainer: JSSplitPaneLeftContainer = splitPane_JSTutorial.getLeftContainer();
            splitPane_JSTutorial.setDividerLocation(splitPane_JSTutorial_JSSplitPaneLeftContainer.getBorderRightWidth());
            var panel_ToggleButtonPanel: JSPanel_ToggleButtonPanel = JSPanel_ToggleButtonPanel.getInstance();
            panel_ToggleButtonPanel.first();
        }
    }
}
