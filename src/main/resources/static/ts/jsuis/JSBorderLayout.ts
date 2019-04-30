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
        super();
        switch (args.length) {
        case 0:
            // constructor();
            break;
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
            if (!constraints || constraints === JSBorderLayout.CENTER) {
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
            if (!constraints || constraints === JSBorderLayout.CENTER) {
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
            if (!constraints || constraints === JSBorderLayout.CENTER) {
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
            if (!constraints || constraints === JSBorderLayout.CENTER) {
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
            if (!constraints || constraints === JSBorderLayout.CENTER) {
                continue;
            }
            switch (constraints) {
            case JSBorderLayout.NORTH:
                component.setOuterWidth(width - width100, 100);
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                component.setOuterHeight(componentPreferredOuterHeight);
                component.setX(x);
                component.setY(y);
                height -= componentPreferredOuterHeight + vgap;
                y += componentPreferredOuterHeight + vgap;
                break;
            case JSBorderLayout.SOUTH:
                component.setOuterWidth(width - width100, 100);
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                component.setOuterHeight(componentPreferredOuterHeight);
                component.setX(x);
                component.setY(height - height100 + y - componentPreferredOuterHeight -
                        component.getMarginTop() - component.getBorderTopWidth() - component.getPaddingTop() -
                        component.getPaddingBottom() - component.getBorderBottomWidth() - component.getMarginBottom(), 100);
                height -= componentPreferredOuterHeight + vgap;
                break;
            case JSBorderLayout.WEST:
                component.setOuterHeight(height - height100, 100);
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                component.setOuterWidth(componentPreferredOuterWidth);
                component.setX(x);
                component.setY(y);
                width -= componentPreferredOuterWidth + hgap;
                x += componentPreferredOuterWidth + hgap;
                break;
            case JSBorderLayout.EAST:
                component.setOuterHeight(height - height100, 100);
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                component.setOuterWidth(componentPreferredOuterWidth);
                component.setX(width - width100 + x - componentPreferredOuterWidth -
                        component.getMarginLeft() - component.getBorderLeftWidth() - component.getPaddingLeft() -
                        component.getPaddingRight() - component.getBorderRightWidth() - component.getMarginRight(), 100);
                component.setY(y);
                width -= componentPreferredOuterWidth + hgap;
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
            if (!constraints || constraints === JSBorderLayout.CENTER) {
                component.setOuterWidth(width - width100, 100);
                component.setOuterHeight(height - height100, 100);
                component.setX(x);
                component.setY(y);
            }
        }
    }
}
