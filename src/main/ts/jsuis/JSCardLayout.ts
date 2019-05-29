/// <reference path = "../jsuis.ts"/>
/**
 * JSCardLayout
 * 
 * @author Yassuo Toda
 */
class JSCardLayout extends JSLayout {
    
    addLayoutComponent(component: JSComponent): void {
        component.setStyle("position", "absolute");
        this.setSelected(component.getParent(), component);
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
            if (componentPreferredOuterWidth === null) {
                return null;
            }
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
            if (componentPreferredOuterHeight === null) {
                return null;
            }
            preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredOuterHeight);
        }
        return preferredLayoutHeight;
    }
    
    layoutContainerHorizontally(container: JSComponent): void {
        if (container.isValidHorizontally()) {
            return;
        }
        var width: number = container.getWidth();
        var x: number = container.getInsetLeft();
        var components: JSComponent[] = container.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            component.setOuterWidth(width); // 100%
            component.setX(x);
        }
        container.setValidHorizontally(true);
    }
    
    layoutContainerVertically(container: JSComponent): void {
        if (container.isValidVertically()) {
            return;
        }
        var height: number = container.getHeight();
        var y: number = container.getInsetTop();
        var components: JSComponent[] = container.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            component.setOuterHeight(height); // 100%
            component.setY(y);
        }
        container.setValidVertically(true);
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
    show(...args: any[]) {
    // show(container: JSComponent, indexOrConstraints: number | string): void {
        switch (args.length) {
        case 2:
            // show(container: JSComponent, index: number): void;
            // show(container: JSComponent, constraints: string): void;
            if (args[0] instanceof JSComponent && typeof args[1] === "number") {
                var container: JSComponent = args[0];
                var index: number = args[1];
                this.setSelectedIndex(container, index);
            } else if (args[0] instanceof JSComponent && typeof args[1] === "string") {
                var container: JSComponent = args[0];
                var constraints: string = args[1];
                var components: JSComponent[] = container.getComponents();
                for (var i: number = 0; i < components.length; i++) {
                    var component: JSComponent = components[i];
                    var componentConstraints: string = <string> component.getConstraints();
                    if (componentConstraints === constraints) {
                        this.setSelectedIndex(container, i);
                        break;
                    }
                }
            }
            break;
        default:
        }
    }
}
