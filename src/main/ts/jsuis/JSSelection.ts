/// <reference path = "../jsuis.ts"/>
/**
 * JSSelection
 * 
 * @author Yassuo Toda
 */
class JSSelection {
    components: JSComponent[] = [];
    selected: JSComponent = null;
    constructor() {
    }
    add(component: JSComponent): void {
        var components: JSComponent[] = this.getComponents();
        components.push(component);
    }
    remove(component: JSComponent): void {
        var components: JSComponent[] = this.getComponents();
        var index: number = components.indexOf(component);
        if (index === -1) {
            return;
        }
        components.splice(index, 1);
        var selected = this.getSelected();
        if (selected === component) {
            this.setSelected(null);
        }
    }
    getComponents(): JSComponent[] {
        return this.components;
    }
    getSelected(): JSComponent {
        return this.selected;
    }
    setSelected(component: JSComponent) {
        var selected = this.getSelected();
        if (selected === component) {
            return;
        }
        if (selected) {
            selected.setSelected(false);
        } else {
            var components: JSComponent[] = this.getComponents();
            for (var i: number = 0; i < components.length; i++) {
                components[i].setSelected(false);
            }
        }
        if (component) {
            component.setSelected(true);
        }
        this.selected = component;
    }
    setSelectedIndex(selectedIndex: number) {
        var components: JSComponent[] = this.getComponents();
        this.setSelected(components[selectedIndex]);
    }
    getSelectedIndex(): number {
        var components: JSComponent[] = this.getComponents();
        return components.indexOf(this.getSelected());
    }
}