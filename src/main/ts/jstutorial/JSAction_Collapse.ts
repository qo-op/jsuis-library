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
            var splitPane_Left: JSSplitPane_Left = JSSplitPane_Left.getInstance();
            var splitPaneLeftContainer_Left: JSSplitPaneLeftContainer = splitPane_Left.getLeftContainer();
            splitPane_Left.setDividerLocation(splitPaneLeftContainer_Left.getBorderRightWidth());
            var panel_ToggleButton: JSPanel_ToggleButton = JSPanel_ToggleButton.getInstance();
            panel_ToggleButton.first();
        }
    }
}
