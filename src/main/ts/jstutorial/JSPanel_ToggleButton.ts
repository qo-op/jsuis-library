/// <reference path = "../jstutorial.ts"/>
/**
 * JSPanel_ToggleButton
 */
namespace jstutorial {
    export class JSPanel_ToggleButton extends JSPanel {
        
        static instance: JSPanel_ToggleButton;
        static getInstance(): JSPanel_ToggleButton {
            if (JSPanel_ToggleButton.instance === undefined) {
                JSPanel_ToggleButton.instance = new JSPanel_ToggleButton();
            }
            return JSPanel_ToggleButton.instance;
        }
        constructor() {
            super(new JSCardLayout());
            this.addClass("JSPanel_ToggleButton");
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
        isFirst(): boolean {
            var cardLayout: JSCardLayout = <JSCardLayout> this.getLayout();
            var selectedIndex: number = cardLayout.getSelectedIndex(this);
            return (selectedIndex === 0);
        }
        isLast(): boolean {
            var cardLayout: JSCardLayout = <JSCardLayout> this.getLayout();
            var selectedIndex: number = cardLayout.getSelectedIndex(this);
            var componentCount: number = this.getComponentCount();
            return (selectedIndex === (componentCount - 1));
        }
    }
}
