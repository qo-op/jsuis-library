/// <reference path = "../jsuis.ts"/>
/**
 * JSLayout
 * 
 * @author Yassuo Toda
 */
class JSLayout {
    
    /*
     * border
     */
    static NORTH: string = "north";
    static SOUTH: string = "south";
    static WEST: string = "west";
    static EAST: string = "east";
    static CENTER: string = "center";
    
    /*
     * align
     */
    static TOP: string = "top";
    static LEFT: string = "left";
    static BOTTOM: string = "bottom";
    static RIGHT: string = "right";
    static LEFT_RIGHT: string = "left_right";
    // static CENTER: string = "center";
    
    /*
     * fill
     */
    static HORIZONTAL: string = "horizontal";
    static VERTICAL: string = "vertical";
    static BOTH: string = "both";
    static NONE: string = "none";
    
    /*
     * anchor
     */
    // static NORTH: string = "north";
    // static SOUTH: string = "south";
    // static WEST: string = "west";
    // static EAST: string = "east";
    // static CENTER: string = "center";
    static NORTHWEST: string = "northwest";
    static NORTHEAST: string = "northeast";
    static SOUTHWEST: string = "southwest";
    static SOUTHEAST: string = "southeast";
    
    static containers: JSComponent[] = [];
    static getContainers(): JSComponent[] {
        return JSLayout.containers;
    }
    static validateLater(container: JSComponent): void {
        var containers: JSComponent[] = JSLayout.getContainers();
        if (containers.indexOf(container) === -1) {
            containers.push(container);
        }
    }
    static validateContainers(): void {
        var containers: JSComponent[] = JSLayout.getContainers();
        var container: JSComponent = containers.shift();
        var valid: boolean = container.isValid();
        if (!valid) {
            var layout: JSLayout = container.getLayout();
            if (layout) {
                layout.layoutContainer(container);
            }
        }
        while (container = containers.shift()) {
            var validHorizontally: boolean = container.isValidHorizontally();
            var validVertically: boolean = container.isValidVertically();
            if (!validHorizontally && !validVertically) {
                console.log("WARNING: Incompatible layout types!");
                continue;
            }
            if (!validHorizontally || !validVertically) {
                var layout: JSLayout = container.getLayout();
                if (layout) {
                    layout.layoutContainer(container);
                }
            }
        }
    }
    
    addLayoutComponent(component: JSComponent): void {
    }
    
    removeLayoutComponent(component: JSComponent): void {
    }
    
    preferredLayoutWidth(container: JSComponent): number {
        var layout: JSLayout = container.getLayout();
        container.setLayout(null);
        var preferredLayoutWidth = container.getPreferredWidth();
        container.setLayout(layout);
        return preferredLayoutWidth;
    }
    
    preferredLayoutHeight(container: JSComponent): number {
        var layout: JSLayout = container.getLayout();
        container.setLayout(null);
        var preferredLayoutHeight = container.getPreferredHeight();
        container.setLayout(layout);
        return preferredLayoutHeight;
    }
    
    layoutContainer(container: JSComponent): void {
        this.layoutContainerHorizontally(container);
        this.layoutContainerVertically(container);
    }
    
    layoutContainerHorizontally(container: JSComponent): void {
        if (container.isValidHorizontally()) {
            return;
        }
        var components: JSComponent[] = container.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var layout: JSLayout = component.getLayout();
            if (layout) {
                component.setWidth(layout.preferredLayoutWidth(component));
            }
        }
        container.setValidHorizontally(true);
    }
    
    layoutContainerVertically(container: JSComponent): void {
        if (container.isValidVertically()) {
            return;
        }
        var components: JSComponent[] = container.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var layout: JSLayout = component.getLayout();
            if (layout) {
                component.setHeight(layout.preferredLayoutHeight(component));
            }
        }
        container.setValidVertically(true);
    }
}