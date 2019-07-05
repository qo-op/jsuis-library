/// <reference path = "../jsuis.ts"/>
/**
 * JSBorderLayout
 * 
 * @author Yassuo Toda
 */
class JSBorderLayout extends JSLayout {
    
    constructor();
    constructor(hgap: number, vgap: number);
    // overload
    constructor() {
        // constructor();
        super();
        switch (arguments.length) {
        case 2:
            // constructor(hgap: number, vgap: number);
            if (typeof arguments[0] === "number" && typeof arguments[1] === "number") {
                var hgap: number = arguments[0];
                var vgap: number = arguments[1];
                this.setHgap(hgap);
                this.setVgap(vgap);
            }
            break;
        default:
        }
    }
    
    addLayoutComponent(component: JSComponent): void {
        component.setStyle("position", "absolute");
    }
    
    preferredLayoutWidth(container: JSComponent): number {
        var preferredLayoutWidth: number = 0;
        var hgap: number = this.getHgap();
        var components: JSComponent[] = container.getComponents();
        for (var i: number = components.length - 1; i >= 0; i--) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints: string = <string> component.getConstraints();
            if (!constraints || constraints === JSLayout.CENTER) {
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                if (componentPreferredOuterWidth === null) {
                    return null;
                }
                preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredOuterWidth + hgap);
            }
        }
        for (var i: number = components.length - 1; i >= 0; i--) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints: string = <string> component.getConstraints();
            if (!constraints || constraints === JSLayout.CENTER) {
                continue;
            }
            var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
            if (componentPreferredOuterWidth === null) {
                return null;
            }
            switch (constraints) {
            case JSBorderLayout.WEST:
            case JSBorderLayout.EAST:
                preferredLayoutWidth += componentPreferredOuterWidth + hgap;
                break;
            case JSBorderLayout.NORTH:
            case JSBorderLayout.SOUTH:
                preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredOuterWidth + hgap);
                break;
            default:
            }
        }
        if (preferredLayoutWidth != 0) {
            preferredLayoutWidth -= hgap;
        }
        return preferredLayoutWidth;
    }
    
    preferredLayoutHeight(container: JSComponent): number {
        var preferredLayoutHeight: number = 0;
        var vgap: number = this.getVgap();
        var components: JSComponent[] = container.getComponents();
        for (var i: number = components.length - 1; i >= 0; i--) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints: string = <string> component.getConstraints();
            if (!constraints || constraints === JSLayout.CENTER) {
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (componentPreferredOuterHeight === null) {
                    return null;
                }
                preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredOuterHeight + vgap);
            }
        }
        for (var i: number = components.length - 1; i >= 0; i--) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints: string = <string> component.getConstraints();
            if (!constraints || constraints === JSLayout.CENTER) {
                continue;
            }
            var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
            if (componentPreferredOuterHeight === null) {
                return null;
            }
            switch (constraints) {
            case JSBorderLayout.NORTH:
            case JSBorderLayout.SOUTH:
                preferredLayoutHeight += componentPreferredOuterHeight + vgap;
                break;
            case JSBorderLayout.EAST:
            case JSBorderLayout.WEST:
                preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredOuterHeight + vgap);
                break;
            default:
            }
        }
        if (preferredLayoutHeight != 0) {
            preferredLayoutHeight -= vgap;
        }
        return preferredLayoutHeight;
    }
    
    layoutContainerHorizontally(container: JSComponent): void {
        if (container.isValidHorizontally()) {
            return;
        }
        var hgap: number = this.getHgap();
        var width: number = container.getContentWidth();
        var x: number = container.getInsetLeft();
        var components: JSComponent[] = container.getComponents().slice();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints: string = <string> component.getConstraints();
            if (!constraints || constraints === JSLayout.CENTER) {
                continue;
            }
            var align: string = <string> component.getAlign();
            switch (constraints) {
            case JSBorderLayout.NORTH:
            case JSBorderLayout.SOUTH:
                switch (align) {
                case JSLayout.LEFT:
                    var componentOuterWidth: number = component.getPreferredOuterWidth();
                    if (componentOuterWidth === null) {
                        return;
                    }
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x);
                    break;
                case JSLayout.RIGHT:
                    var componentOuterWidth: number = component.getPreferredOuterWidth();
                    if (componentOuterWidth === null) {
                        return;
                    }
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x + width - componentOuterWidth); // 100%
                    break;
                case JSLayout.CENTER:
                    var componentOuterWidth: number = component.getPreferredOuterWidth();
                    if (componentOuterWidth === null) {
                        return;
                    }
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x + (width - componentOuterWidth) / 2); // 50%
                    break;
                default:
                    component.setOuterWidth(width); // 100%
                    component.setX(x);
                }
                break;
            case JSBorderLayout.WEST:
                var componentOuterWidth: number = component.getPreferredOuterWidth();
                if (componentOuterWidth === null) {
                    return;
                }
                component.setOuterWidth(componentOuterWidth);
                component.setX(x);
                width -= componentOuterWidth + hgap;
                x += componentOuterWidth + hgap;
                break;
            case JSBorderLayout.EAST:
                var componentOuterWidth: number = component.getPreferredOuterWidth();
                if (componentOuterWidth === null) {
                    return;
                }
                component.setOuterWidth(componentOuterWidth);
                component.setX(x + width - componentOuterWidth); // 100%
                width -= componentOuterWidth + hgap;
                break;
            default:
            }
        }
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints: string = <string> component.getConstraints();
            if (!constraints || constraints === JSLayout.CENTER) {
                var align: string = <string> component.getAlign();
                switch (align) {
                case JSLayout.TOP:
                    var componentOuterWidth: number = component.getPreferredOuterWidth();
                    if (componentOuterWidth === null) {
                        return;
                    }
                    componentOuterWidth = Math.min(componentOuterWidth, width);
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x + (width - componentOuterWidth) / 2); // 50%
                    break;
                case JSLayout.BOTTOM:
                    var componentOuterWidth: number = component.getPreferredOuterWidth();
                    if (componentOuterWidth === null) {
                        return;
                    }
                    componentOuterWidth = Math.min(componentOuterWidth, width);
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x + (width - componentOuterWidth) / 2); // 50%
                    break;
                case JSLayout.LEFT:
                    var componentOuterWidth: number = component.getPreferredOuterWidth();
                    if (componentOuterWidth === null) {
                        return;
                    }
                    componentOuterWidth = Math.min(componentOuterWidth, width);
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x);
                    break;
                case JSLayout.RIGHT:
                    var componentOuterWidth: number = component.getPreferredOuterWidth();
                    if (componentOuterWidth === null) {
                        return;
                    }
                    componentOuterWidth = Math.min(componentOuterWidth, width);
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x + width - componentOuterWidth); // 100%
                    break;
                case JSLayout.CENTER:
                    var componentOuterWidth: number = component.getPreferredOuterWidth();
                    if (componentOuterWidth === null) {
                        return;
                    }
                    componentOuterWidth = Math.min(componentOuterWidth, width);
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x + (width - componentOuterWidth) / 2); // 50%
                    break;
                case JSLayout.LEFT_RIGHT:
                    component.setOuterWidth(width); // 100%
                    component.setX(x);
                    break;
                default:
                    component.setOuterWidth(width); // 100%
                    component.setX(x);
                }
            }
        }
        container.setValidHorizontally(true);
    }
    
    layoutContainerVertically(container: JSComponent): void {
        if (container.isValidVertically()) {
            return;
        }
        var vgap: number = this.getVgap();
        var height: number = container.getContentHeight();
        var y: number = container.getInsetTop();
        var components: JSComponent[] = container.getComponents().slice();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints: string = <string> component.getConstraints();
            if (!constraints || constraints === JSLayout.CENTER) {
                continue;
            }
            var align: string = <string> component.getAlign();
            switch (constraints) {
            case JSBorderLayout.NORTH:
                var componentOuterHeight: number = component.getPreferredOuterHeight();
                if (componentOuterHeight === null) {
                    return;
                }
                component.setOuterHeight(componentOuterHeight);
                component.setY(y);
                height -= componentOuterHeight + vgap;
                y += componentOuterHeight + vgap;
                break;
            case JSBorderLayout.SOUTH:
                var componentOuterHeight: number = component.getPreferredOuterHeight();
                if (componentOuterHeight === null) {
                    return;
                }
                component.setOuterHeight(componentOuterHeight);
                component.setY(y + height - componentOuterHeight); // 100%
                height -= componentOuterHeight + vgap;
                break;
            case JSBorderLayout.WEST:
            case JSBorderLayout.EAST:
                switch (align) {
                case JSLayout.TOP:
                    var componentOuterHeight: number = component.getPreferredOuterHeight();
                    if (componentOuterHeight === null) {
                        return;
                    }
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y);
                    break;
                case JSLayout.BOTTOM:
                    var componentOuterHeight: number = component.getPreferredOuterHeight();
                    if (componentOuterHeight === null) {
                        return;
                    }
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + height - componentOuterHeight); // 100%
                    break;
                case JSLayout.CENTER:
                    var componentOuterHeight: number = component.getPreferredOuterHeight();
                    if (componentOuterHeight === null) {
                        return;
                    }
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + (height - componentOuterHeight) / 2); // 50%
                    break;
                default:
                    component.setOuterHeight(height); // 100%
                    component.setY(y);
                }
                break;
            default:
            }
        }
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints: string = <string> component.getConstraints();
            if (!constraints || constraints === JSLayout.CENTER) {
                var align: string = <string> component.getAlign();
                switch (align) {
                case JSLayout.TOP:
                    var componentOuterHeight: number = component.getPreferredOuterHeight();
                    if (componentOuterHeight === null) {
                        return;
                    }
                    componentOuterHeight = Math.min(componentOuterHeight, height);
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y);
                    break;
                case JSLayout.BOTTOM:
                    var componentOuterHeight: number = component.getPreferredOuterHeight();
                    if (componentOuterHeight === null) {
                        return;
                    }
                    componentOuterHeight = Math.min(componentOuterHeight, height);
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + height - componentOuterHeight); // 100%
                    break;
                case JSLayout.LEFT:
                    var componentOuterHeight: number = component.getPreferredOuterHeight();
                    if (componentOuterHeight === null) {
                        return;
                    }
                    componentOuterHeight = Math.min(componentOuterHeight, height);
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + (height - componentOuterHeight) / 2); // 50%
                    break;
                case JSLayout.RIGHT:
                    var componentOuterHeight: number = component.getPreferredOuterHeight();
                    if (componentOuterHeight === null) {
                        return;
                    }
                    componentOuterHeight = Math.min(componentOuterHeight, height);
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + (height - componentOuterHeight) / 2); // 50%
                    break;
                case JSLayout.CENTER:
                    var componentOuterHeight: number = component.getPreferredOuterHeight();
                    if (componentOuterHeight === null) {
                        return;
                    }
                    componentOuterHeight = Math.min(componentOuterHeight, height);
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + (height - componentOuterHeight) / 2); // 50%
                    break;
                case JSLayout.LEFT_RIGHT:
                    var componentOuterHeight: number = component.getPreferredOuterHeight();
                    if (componentOuterHeight === null) {
                        return;
                    }
                    componentOuterHeight = Math.min(componentOuterHeight, height);
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + (height - componentOuterHeight) / 2); // 50%
                    break;
                default:
                    component.setOuterHeight(height); // 100%
                    component.setY(y);
                }
            }
        }
        container.setValidVertically(true);
    }
}
