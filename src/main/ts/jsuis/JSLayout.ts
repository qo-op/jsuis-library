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
    static TOP_BOTTOM: string = "top_bottom";
    static JUSTIFY: string = "justify";
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
        // console.log((<any> container.constructor).name);
        var containers: JSComponent[] = JSLayout.getContainers();
        containers.push(container);
    }
    static validateContainers(): void {
        var containers: JSComponent[] = JSLayout.getContainers();
        while (containers.length) {
            var container: JSComponent = containers[0];
            container.setValid(false);
            var layout: JSLayout = container.getLayout();
            if (layout) {
                layout.layoutContainer(container);
            } else {
                container.validateHorizontally();
                container.validateVertically();
            }
            var valid: boolean = container.isValid();
            if (!valid) {
                JSLayout.validateLater(container);
            }
            containers.shift();
        }
    }
    
    hgap: number = 0;
    vgap: number = 0;
    
    getHgap(): number {
        return this.hgap;
    }
    setHgap(hgap: number) {
        this.hgap = hgap;
    }
    getVgap(): number {
        return this.vgap;
    }
    setVgap(vgap: number) {
        this.vgap = vgap;
    }
    
    isHorizontal(): boolean {
        return true;
    }
    /*
    invalidateLayout(container: JSComponent): void {
        var components: JSComponent[] = container.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            component.setValid(false);
        }
    }
    */
    invalidateLayoutHorizontally(container: JSComponent): void {
        /*
        container.setValidHorizontally(false);
        var components: JSComponent[] = container.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            component.setValidHorizontally(false);
        }
        var containerParent: JSComponent = container.getParent();
        if (containerParent) {
            var containerParentLayout: JSLayout = containerParent.getLayout();
            if (containerParentLayout) {
                if (containerParentLayout.isHorizontal()) {
                    this.invalidateLayoutVertically(container);
                    JSLayout.validateLater(container);
                }
            }
        }
        */
    }
    invalidateLayoutVertically(container: JSComponent): void {
        /*
        container.setValidVertically(false);
        var components: JSComponent[] = container.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            component.setValidVertically(false);
        }
        */
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
            component.setValidHorizontally(false);
        }
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var componentLayout: JSLayout = component.getLayout();
            if (componentLayout) {
                component.setOuterWidth(component.getPreferredOuterWidth());
                component.setStyle("position", "relative");
            } else {
                component.validateHorizontally();
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
            component.setValidVertically(false);
        }
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var componentLayout: JSLayout = component.getLayout();
            if (componentLayout) {
                component.setOuterHeight(component.getPreferredOuterHeight());
                component.setStyle("position", "relative");
            } else {
                component.validateVertically();
            }
        }
        container.setValidVertically(true);
    }
}