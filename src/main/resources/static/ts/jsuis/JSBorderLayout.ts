/// <reference path = "../jsuis.ts"/>
class JSBorderLayout extends JSLayout {
    
    hgap: number = 0;
    vgap: number = 0;
    float: boolean = false;
    
    constructor();
    constructor(hgap: number, vgap: number);
    constructor(float: boolean);
    constructor(float: boolean, hgap: number, vgap: number);
    // overload
    constructor(hgapOrFloat?: number | boolean, vgapOrHgap?: number, vgap?: number) {
        // constructor();
        super();
        if (typeof hgapOrFloat === "number") {
            // constructor(hgap: number, vgap: number);
            this.setHgap(hgapOrFloat);
            this.setVgap(vgapOrHgap);
        } else {
            // constructor(float: boolean);
            // constructor(float: boolean, hgap: number, vgap: number);
            this.setFloat(hgapOrFloat);
            if (vgapOrHgap !== undefined) {
                this.setHgap(vgapOrHgap);
                this.setVgap(vgap);
            }
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
    isFloat(): boolean {
        return this.float;
    }
    setFloat(float: boolean) {
        this.float = float;
    }
    
    addLayoutComponent(component: JSComponent): void {
        component.setStyle("position", "absolute");
    }
    preferredLayoutWidth(container: JSComponent): number {
        var preferredLayoutWidth: number = 0;
        var hgap: number = this.getHgap();
        var float: boolean = this.isFloat();
        var components: JSComponent[] = container.getComponents();
        if (float) {
            for (var i: number = components.length - 1; i >= 0; i--) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                var constraints: string = <string> component.getConstraints();
                switch (constraints) {
                case JSBorderLayout.WEST:
                case JSBorderLayout.EAST:
                    preferredLayoutWidth += componentPreferredOuterWidth + hgap;
                    break;
                case JSBorderLayout.NORTH:
                case JSBorderLayout.SOUTH:
                case JSBorderLayout.CENTER:
                default:
                    preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredOuterWidth + hgap);
                }
            }
        } else {
            for (var i: number = components.length - 1; i >= 0; i--) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints: string = <string> component.getConstraints();
                if (!constraints || constraints === JSBorderLayout.CENTER) {
                    preferredLayoutWidth = Math.max(preferredLayoutWidth, component.getPreferredOuterWidth() + hgap);
                }
            }
            for (var i: number = components.length - 1; i >= 0; i--) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints: string = <string> component.getConstraints();
                if (constraints === JSBorderLayout.WEST || constraints === JSBorderLayout.EAST) {
                    preferredLayoutWidth += component.getPreferredOuterWidth() + hgap;
                }
            }
            for (var i: number = components.length - 1; i >= 0; i--) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints: string = <string> component.getConstraints();
                if (constraints === JSBorderLayout.NORTH || constraints === JSBorderLayout.SOUTH) {
                    preferredLayoutWidth = Math.max(preferredLayoutWidth, component.getPreferredOuterWidth() + hgap);
                }
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
        var float: boolean = this.isFloat();
        var components: JSComponent[] = container.getComponents();
        if (float) {
            for (var i: number = components.length - 1; i >= 0; i--) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                var constraints: string = <string> component.getConstraints();
                switch (constraints) {
                case JSBorderLayout.NORTH:
                case JSBorderLayout.SOUTH:
                    preferredLayoutHeight += componentPreferredOuterHeight + vgap;
                    break;
                case JSBorderLayout.EAST:
                case JSBorderLayout.WEST:
                case JSBorderLayout.CENTER:
                default:
                    preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredOuterHeight + vgap);
                }
            }
        } else {
            for (var i: number = components.length - 1; i >= 0; i--) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints: string = <string> component.getConstraints();
                if (!constraints || constraints === JSBorderLayout.CENTER) {
                    preferredLayoutHeight = Math.max(preferredLayoutHeight, component.getPreferredOuterHeight() + vgap);
                }
            }
            for (var i: number = components.length - 1; i >= 0; i--) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints: string = <string> component.getConstraints();
                if (constraints === JSBorderLayout.WEST || constraints === JSBorderLayout.EAST) {
                    preferredLayoutHeight = Math.max(preferredLayoutHeight, component.getPreferredOuterHeight() + vgap);
                }
            }
            for (var i: number = components.length - 1; i >= 0; i--) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints: string = <string> component.getConstraints();
                if (constraints === JSBorderLayout.NORTH || constraints === JSBorderLayout.SOUTH) {
                    preferredLayoutHeight += component.getPreferredOuterHeight() + vgap;
                }
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
        var float: boolean = this.isFloat();
        var containerWidth: number = container.getWidth();
        var containerHeight: number = container.getHeight();
        var width: number = containerWidth;
        var height: number = containerHeight;
        var x: number = container.getInsetLeft();
        var y: number = container.getInsetTop();
        var components: JSComponent[] = container.getComponents().slice();
        if (float) {
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints: string = <string> component.getConstraints();
                switch (constraints) {
                case JSBorderLayout.NORTH:
                    // component.setOuterWidth(width);
                    component.setWidth("calc(100% - " + (containerWidth - width +
                            component.getMarginLeft() + component.getBorderLeftWidth() + component.getPaddingLeft() +
                            component.getPaddingRight() + component.getBorderRightWidth() + component.getMarginRight()) + "px)");
                    var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    component.setX(x);
                    component.setY(y);
                    height -= componentPreferredOuterHeight + vgap;
                    y += componentPreferredOuterHeight + vgap;
                    break;
                case JSBorderLayout.SOUTH:
                    // component.setOuterWidth(width);
                    component.setWidth("calc(100% - " + (containerWidth - width +
                            component.getMarginLeft() + component.getBorderLeftWidth() + component.getPaddingLeft() +
                            component.getPaddingRight() + component.getBorderRightWidth() + component.getMarginRight()) + "px)");
                    var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    component.setX(x);
                    // component.setY(y + height - componentPreferredOuterHeight);
                    component.setY("calc(100% - " + (containerHeight - height +
                            component.getMarginTop() + component.getBorderTopWidth() + component.getPaddingTop() +
                            component.getPaddingBottom() + component.getBorderBottomWidth() + component.getMarginBottom() - y + componentPreferredOuterHeight) + "px)");
                    height -= componentPreferredOuterHeight + vgap;
                    break;
                case JSBorderLayout.WEST:
                    // component.setOuterHeight(height);
                    component.setHeight("calc(100% - " + (containerHeight - height +
                            component.getMarginTop() + component.getBorderTopWidth() + component.getPaddingTop() +
                            component.getPaddingBottom() + component.getBorderBottomWidth() + component.getMarginBottom()) + "px)");
                    var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    component.setX(x);
                    component.setY(y);
                    width -= componentPreferredOuterWidth + hgap;
                    x += componentPreferredOuterWidth + hgap;
                    break;
                case JSBorderLayout.EAST:
                    // component.setOuterHeight(height);
                    component.setHeight("calc(100% - " + (containerHeight - height +
                            component.getMarginTop() + component.getBorderTopWidth() + component.getPaddingTop() +
                            component.getPaddingBottom() + component.getBorderBottomWidth() + component.getMarginBottom()) + "px)");
                    var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    // component.setX(x + width - componentPreferredOuterWidth);
                    component.setX("calc(100% - " + (containerWidth - width +
                            component.getMarginLeft() + component.getBorderLeftWidth() + component.getPaddingLeft() +
                            component.getPaddingRight() + component.getBorderRightWidth() + component.getMarginRight() - x + componentPreferredOuterWidth) + "px)");
                    component.setY(y);
                    width -= componentPreferredOuterWidth + hgap;
                    break;
                case JSBorderLayout.CENTER:
                default:
                    // component.setOuterWidth(width);
                    component.setWidth("calc(100% - " + (containerWidth - width +
                            component.getMarginLeft() + component.getBorderLeftWidth() + component.getPaddingLeft() +
                            component.getPaddingRight() + component.getBorderRightWidth() + component.getMarginRight()) + "px)");
                    // component.setOuterHeight(height);
                    component.setHeight("calc(100% - " + (containerHeight - height +
                            component.getMarginTop() + component.getBorderTopWidth() + component.getPaddingTop() +
                            component.getPaddingBottom() + component.getBorderBottomWidth() + component.getMarginBottom()) + "px)");
                    component.setX(x);
                    component.setY(y);
                }
            }
        } else {
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints: string = <string> component.getConstraints();
                if (constraints === JSBorderLayout.NORTH) {
                    // component.setOuterWidth(width);
                    component.setWidth("calc(100% - " + (containerWidth - width +
                            component.getMarginLeft() + component.getBorderLeftWidth() + component.getPaddingLeft() +
                            component.getPaddingRight() + component.getBorderRightWidth() + component.getMarginRight()) + "px)");
                    var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    component.setX(x);
                    component.setY(y);
                    height -= componentPreferredOuterHeight + vgap;
                    y += componentPreferredOuterHeight + vgap;
                } else if (constraints === JSBorderLayout.SOUTH) {
                    // component.setOuterWidth(width);
                    component.setWidth("calc(100% - " + (containerWidth - width +
                            component.getMarginLeft() + component.getBorderLeftWidth() + component.getPaddingLeft() +
                            component.getPaddingRight() + component.getBorderRightWidth() + component.getMarginRight()) + "px)");
                    var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    component.setX(x);
                    // component.setY(y + height - componentPreferredOuterHeight);
                    component.setY("calc(100% - " + (containerHeight - height +
                            component.getMarginTop() + component.getBorderTopWidth() + component.getPaddingTop() +
                            component.getPaddingBottom() + component.getBorderBottomWidth() + component.getMarginBottom() - y + componentPreferredOuterHeight) + "px)");
                    height -= componentPreferredOuterHeight + vgap;
                }
            }
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints: string = <string> component.getConstraints();
                if (constraints === JSBorderLayout.WEST) {
                    // component.setOuterHeight(height);
                    component.setHeight("calc(100% - " + (containerHeight - height +
                            component.getMarginTop() + component.getBorderTopWidth() + component.getPaddingTop() +
                            component.getPaddingBottom() + component.getBorderBottomWidth() + component.getMarginBottom()) + "px)");
                    var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    component.setX(x);
                    component.setY(y);
                    width -= componentPreferredOuterWidth + hgap;
                    x += componentPreferredOuterWidth + hgap;
                } else if (constraints === JSBorderLayout.EAST) {
                    // component.setOuterHeight(height);
                    component.setHeight("calc(100% - " + (containerHeight - height +
                            component.getMarginTop() + component.getBorderTopWidth() + component.getPaddingTop() +
                            component.getPaddingBottom() + component.getBorderBottomWidth() + component.getMarginBottom()) + "px)");
                    var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    // component.setX(x + width - componentPreferredOuterWidth);
                    component.setX("calc(100% - " + (containerWidth - width +
                            component.getMarginLeft() + component.getBorderLeftWidth() + component.getPaddingLeft() +
                            component.getPaddingRight() + component.getBorderRightWidth() + component.getMarginRight() - x + componentPreferredOuterWidth) + "px)");
                    component.setY(y);
                    width -= componentPreferredOuterWidth + hgap;
                }
            }
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var constraints: string = <string> component.getConstraints();
                if (!constraints || constraints === JSBorderLayout.CENTER) {
                    // component.setOuterWidth(width);
                    component.setWidth("calc(100% - " + (containerWidth - width +
                            component.getMarginLeft() + component.getBorderLeftWidth() + component.getPaddingLeft() +
                            component.getPaddingRight() + component.getBorderRightWidth() + component.getMarginRight()) + "px)");
                    // component.setOuterHeight(height);
                    component.setHeight("calc(100% - " + (containerHeight - height +
                            component.getMarginTop() + component.getBorderTopWidth() + component.getPaddingTop() +
                            component.getPaddingBottom() + component.getBorderBottomWidth() + component.getMarginBottom()) + "px)");
                    component.setX(x);
                    component.setY(y);
                }
            }
        }
    }
}
