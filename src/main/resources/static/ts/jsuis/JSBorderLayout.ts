/// <reference path = "../jsuis.ts"/>
/**
 * JSBorderLayout
 * 
 * @author Yassuo Toda
 */
class JSBorderLayout extends JSLayout {
    
    hgap: number = 0;
    vgap: number = 0;
    float: boolean = false;
    
    constructor();
    constructor(float: boolean);
    constructor(hgap: number, vgap: number);
    constructor(float: boolean, hgap: number, vgap: number);
    // overload
    constructor(...args: any[]) {
        super();
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(float: boolean);
            if (typeof args[0] === "boolean") {
                var float: boolean = args[0];
                this.setFloat(float);
            }
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
        case 3:
            // constructor(float: boolean, hgap: number, vgap: number);
            if (typeof args[0] === "boolean" && typeof args[1] === "number" && typeof args[2] === "number") {
                var float: boolean = args[0];
                var hgap: number = args[1];
                var vgap: number = args[2];
                this.setFloat(float);
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
        var width: number = container.getWidth();
        var height: number = container.getHeight();
        var width100: number = width + container.getPaddingLeft() + container.getPaddingRight();
        var height100: number = height + container.getPaddingTop() + container.getPaddingBottom();
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
                case JSBorderLayout.CENTER:
                default:
                    component.setOuterWidth(width - width100, 100);
                    component.setOuterHeight(height - height100, 100);
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
                    component.setOuterWidth(width - width100, 100);
                    var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    component.setX(x);
                    component.setY(y);
                    height -= componentPreferredOuterHeight + vgap;
                    y += componentPreferredOuterHeight + vgap;
                } else if (constraints === JSBorderLayout.SOUTH) {
                    component.setOuterWidth(width - width100, 100);
                    var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    component.setX(x);
                    component.setY(height - height100 + y - componentPreferredOuterHeight -
                            component.getMarginTop() - component.getBorderTopWidth() - component.getPaddingTop() -
                            component.getPaddingBottom() - component.getBorderBottomWidth() - component.getMarginBottom(), 100);
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
                    component.setOuterHeight(height - height100, 100);
                    var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    component.setX(x);
                    component.setY(y);
                    width -= componentPreferredOuterWidth + hgap;
                    x += componentPreferredOuterWidth + hgap;
                } else if (constraints === JSBorderLayout.EAST) {
                    component.setOuterHeight(height - height100, 100);
                    var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    component.setX(width - width100 + x - componentPreferredOuterWidth -
                            component.getMarginLeft() - component.getBorderLeftWidth() - component.getPaddingLeft() -
                            component.getPaddingRight() - component.getBorderRightWidth() - component.getMarginRight(), 100);
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
                    component.setOuterWidth(width - width100, 100);
                    component.setOuterHeight(height - height100, 100);
                    component.setX(x);
                    component.setY(y);
                }
            }
        }
    }
}
