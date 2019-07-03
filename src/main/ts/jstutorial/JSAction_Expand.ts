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
            var panel_ToggleButton: JSPanel_ToggleButton = JSPanel_ToggleButton.getInstance();
            if (panel_ToggleButton.isFirst()) {
                var splitPane_Left: JSSplitPane_Left = JSSplitPane_Left.getInstance();
                splitPane_Left.setDividerLocation(splitPane_Left.getLeftContainer().getPreferredOuterWidth());
                panel_ToggleButton.last();
            }
        }
    }
}
