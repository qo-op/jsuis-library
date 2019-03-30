/// <reference path = "../jsuis.ts"/>
class JSCardLayout extends JSLayout {
    
    addLayoutComponent(component: JSComponent): void {
        component.setStyle("position", "absolute");
    }
    preferredLayoutWidth(container: JSComponent): number {
        var preferredLayoutWidth: number = 0;
        var components: JSComponent[] = container.getComponents();
        for (var i: number = components.length - 1; i >= 0; i--) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
            preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredOuterWidth);
        }
        return preferredLayoutWidth;
    }
    preferredLayoutHeight(container: JSComponent): number {
        var preferredLayoutHeight: number = 0;
        var components: JSComponent[] = container.getComponents();
        for (var i: number = components.length - 1; i >= 0; i--) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
            preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredOuterHeight);
        }
        return preferredLayoutHeight;
    }
    layoutContainer(container: JSComponent): void {
        var width: number = container.getWidth();
        var height: number = container.getHeight();
        var x: number = container.getInsetLeft();
        var y: number = container.getInsetTop();
        var components: JSComponent[] = container.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            // component.setOuterWidth(width);
            component.setWidth("100%");
            // component.setOuterHeight(height);
            component.setHeight("100%");
            // component.setX(x);
            // component.setY(y);
        }
        var selected = this.getSelected();
        if (!selected) {
            this.first(container);
        }
    }
    
    selected: JSComponent = null;
    
    getSelected(): JSComponent {
        return this.selected;
    }
    setSelected(container: JSComponent, component: JSComponent) {
        var selected = this.getSelected();
        if (selected === component) {
            return;
        }
        if (selected) {
            selected.setVisible(false);
        } else {
            var components: JSComponent[] = container.getComponents();
            for (var i: number = 0; i < components.length; i++) {
                components[i].setVisible(false);
            }
        }
        if (component) {
            component.setVisible(true);
        }
        this.selected = component;
    }
    setSelectedIndex(container: JSComponent, selectedIndex: number) {
        var components: JSComponent[] = container.getComponents();
        this.setSelected(container, components[selectedIndex]);
    }
    getSelectedIndex(container: JSComponent): number {
        var components: JSComponent[] = container.getComponents();
        return components.indexOf(this.getSelected());
    }
    
    first(container: JSComponent): void {
        this.setSelectedIndex(container, 0);
    }
    next(container: JSComponent): void {
        var componentCount = container.getComponentCount();
        this.setSelectedIndex(container, (this.getSelectedIndex(container) + 1) % componentCount);
    }
    previous(container: JSComponent): void {
        var componentCount = container.getComponentCount();
        this.setSelectedIndex(container, (this.getSelectedIndex(container) - 1 + componentCount) % componentCount);
    }
    last(container: JSComponent): void {
        var componentCount = container.getComponentCount();
        this.setSelectedIndex(container, componentCount - 1);
    }
    show(container: JSComponent, index: number): void;
    show(container: JSComponent, constraints: string): void;
    // overload
    show(container: JSComponent, indexOrConstraints: number | string): void {
        if (typeof indexOrConstraints === "number") {
            // show(container: JSComponent, index: number);
            this.setSelectedIndex(container, indexOrConstraints);
        } else {
            // show(container: JSComponent, constraints: string);
            var components: JSComponent[] = container.getComponents();
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                var constraints: string = <string> component.getConstraints();
                if (constraints === indexOrConstraints) {
                    this.setSelectedIndex(container, i);
                    break;
                }
            }
        }
    }
}
