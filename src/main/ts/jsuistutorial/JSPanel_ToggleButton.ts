/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSPanel_ToggleButton
 */
namespace jsuistutorial {
    export class JSPanel_ToggleButton extends JSPanel {
        
        constructor() {
            super(new JSCardLayout());
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
