/// <reference path = "../jstutorial.ts"/>
/**
 * JSPanel_ToggleButtonPanel
 */
namespace jstutorial {
    export class JSPanel_ToggleButtonPanel extends JSPanel {
        
        static instance: JSPanel_ToggleButtonPanel;
        static getInstance(): JSPanel_ToggleButtonPanel {
            if (JSPanel_ToggleButtonPanel.instance === undefined) {
                JSPanel_ToggleButtonPanel.instance = new JSPanel_ToggleButtonPanel();
            }
            return JSPanel_ToggleButtonPanel.instance;
        }
        constructor() {
            super(new JSCardLayout());
            this.addClass("JSPanel_ToggleButtonPanel");
        }
        toggle(): void {
            var cardLayout: JSCardLayout = <JSCardLayout> this.getLayout();
            var selectedIndex: number = cardLayout.getSelectedIndex(this);
            var componentCount: number = this.getComponentCount();
            selectedIndex = (selectedIndex + 1) % componentCount;
            cardLayout.setSelectedIndex(this, selectedIndex);
        }
        first(): void {
            var cardLayout: JSCardLayout = <JSCardLayout> this.getLayout();
            cardLayout.first(this);
        }
        last(): void {
            var cardLayout: JSCardLayout = <JSCardLayout> this.getLayout();
            cardLayout.last(this);
        }
    }
}
