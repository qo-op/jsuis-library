/// <reference path = "../jsuis.ts"/>
/**
 * JSBorderLayout
 * 
 * @author Yassuo Toda
 */
class JSBorderLayout extends JSLayout {
    
    hgap: number = 0;
    vgap: number = 0;
    
    constructor();
    constructor(hgap: number, vgap: number);
    // overload
    constructor(...args: any[]) {
        // constructor();
        super();
        switch (args.length) {
        case 2:
            // constructor(hgap: number, vgap: number);
            if (typeof args[0] === "number" && typeof args[1] === "number") {
                var hgap: number = args[0];
                var vgap: number = args[1];
                this.setHgap(hgap);
                this.setVgap(vgap);
            }
            break;
        default:
        }
    }
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
    layoutContainer(container: JSComponent): void {
        var hgap: number = this.getHgap();
        var vgap: number = this.getVgap();
        var width: number = container.getWidth();
        var height: number = container.getHeight();
        var width100: number = width + container.getPaddingLeft() + container.getPaddingRight();
        var height100: number = height + container.getPaddingTop() + container.getPaddingBottom();
        var x: number = container.getInsetLeft();
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
                switch (align) {
                case JSLayout.LEFT:
                    var componentOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x);
                    break;
                case JSLayout.RIGHT:
                    var componentOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x + width - componentOuterWidth); // 100%
                    break;
                case JSLayout.CENTER:
                    var componentOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x + (width - componentOuterWidth) / 2); // 50%
                    break;
                default:
                    component.setOuterWidth(width); // 100%
                    component.setX(x);
                }
                var componentOuterHeight: number = component.getPreferredOuterHeight();
                component.setOuterHeight(componentOuterHeight);
                component.setY(y);
                height -= componentOuterHeight + vgap;
                y += componentOuterHeight + vgap;
                break;
            case JSBorderLayout.SOUTH:
                switch (align) {
                case JSLayout.LEFT:
                    var componentOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x);
                    break;
                case JSLayout.RIGHT:
                    var componentOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x + width - componentOuterWidth); // 100%
                    break;
                case JSLayout.CENTER:
                    var componentOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x + (width - componentOuterWidth) / 2); // 50%
                    break;
                default:
                    component.setOuterWidth(width); // 100%
                    component.setX(x);
                }
                var componentOuterHeight: number = component.getPreferredOuterHeight();
                component.setOuterHeight(componentOuterHeight);
                component.setY(y + height - componentOuterHeight); // 100%
                height -= componentOuterHeight + vgap;
                break;
            case JSBorderLayout.WEST:
                switch (align) {
                case JSLayout.TOP:
                    var componentOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y);
                    break;
                case JSLayout.BOTTOM:
                    var componentOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + height - componentOuterHeight); // 100%
                    break;
                case JSLayout.CENTER:
                    var componentOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + (height - componentOuterHeight) / 2); // 50%
                    break;
                default:
                    component.setOuterHeight(height); // 100%
                    component.setY(y);
                }
                var componentOuterWidth: number = component.getPreferredOuterWidth();
                component.setOuterWidth(componentOuterWidth);
                component.setX(x);
                width -= componentOuterWidth + hgap;
                x += componentOuterWidth + hgap;
                break;
            case JSBorderLayout.EAST:
                switch (align) {
                case JSLayout.TOP:
                    var componentOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y);
                    break;
                case JSLayout.BOTTOM:
                    var componentOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + height - componentOuterHeight); // 100%
                    break;
                case JSLayout.CENTER:
                    var componentOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + (height - componentOuterHeight) / 2); // 50%
                    break;
                default:
                    component.setOuterHeight(height); // 100%
                    component.setY(y);
                }
                var componentOuterWidth: number = component.getPreferredOuterWidth();
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
                    var componentOuterWidth: number = Math.min(component.getPreferredOuterWidth(), width);
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x + (width - componentOuterWidth) / 2); // 50%
                    var componentOuterHeight: number = Math.min(component.getPreferredOuterHeight(), height);
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y);
                    break;
                case JSLayout.BOTTOM:
                    var componentOuterWidth: number = Math.min(component.getPreferredOuterWidth(), width);
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x + (width - componentOuterWidth) / 2); // 50%
                    var componentOuterHeight: number = Math.min(component.getPreferredOuterHeight(), height);
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + height - componentOuterHeight); // 100%
                    break;
                case JSLayout.LEFT:
                    var componentOuterWidth: number = Math.min(component.getPreferredOuterWidth(), width);
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x);
                    var componentOuterHeight: number = Math.min(component.getPreferredOuterHeight(), height);
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + (height - componentOuterHeight) / 2); // 50%
                    break;
                case JSLayout.RIGHT:
                    var componentOuterWidth: number = Math.min(component.getPreferredOuterWidth(), width);
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x + width - componentOuterWidth); // 100%
                    var componentOuterHeight: number = Math.min(component.getPreferredOuterHeight(), height);
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + (height - componentOuterHeight) / 2); // 50%
                    break;
                case JSLayout.LEFT_RIGHT:
                    component.setOuterWidth(width); // 100%
                    component.setX(x);
                    var componentOuterHeight: number = Math.min(component.getPreferredOuterHeight(), height);
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + (height - componentOuterHeight) / 2); // 50%
                    break;
                case JSLayout.CENTER:
                    var componentOuterWidth: number = Math.min(component.getPreferredOuterWidth(), width);
                    component.setOuterWidth(componentOuterWidth);
                    component.setX(x + (width - componentOuterWidth) / 2); // 50%
                    var componentOuterHeight: number = Math.min(component.getPreferredOuterHeight(), height);
                    component.setOuterHeight(componentOuterHeight);
                    component.setY(y + (height - componentOuterHeight) / 2); // 50%
                    break;
                default:
                    component.setOuterWidth(width); // 100%
                    component.setOuterHeight(height); // 100%
                    component.setX(x);
                    component.setY(y);
                }
            }
        }
    }
}
