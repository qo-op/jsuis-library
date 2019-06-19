/// <reference path = "../jsuis.ts"/>
/**
 * JSFlowLayout
 * 
 * @author Yassuo Toda
 */
class JSFlowLayout extends JSLayout {
    
    border: string = JSFlowLayout.NORTH;
    align: string = JSFlowLayout.CENTER;
    hgap: number = 0;
    vgap: number = 0;
    
    constructor();
    constructor(border: string, align: string);
    constructor(border: string, align: string, hgap: number, vgap: number);
    // overload
    constructor(...args: any[]) {
        super();
        switch (args.length) {
        case 0:
            // constructor;
            break;
        case 2:
            // constructor(border: string, align: string);
            if (typeof args[0] === "string" && typeof args[1] === "string") {
                var border: string = args[0];
                var align: string = args[1];
                this.setBorder(border);
                this.setAlign(align);
            }
            break;
        case 4:
            // constructor(border: string, align: string, hgap: number, vgap: number);
            if (typeof args[0] === "string" && typeof args[1] === "string" && typeof args[2] === "number" && typeof args[3] === "number") {
                var border: string = args[0];
                var align: string = args[1];
                var hgap: number = args[2];
                var vgap: number = args[3];
                this.setBorder(border);
                this.setAlign(align);
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
    getAlign(): string {
        return this.align;
    }
    setAlign(align: string) {
        this.align = align;
    }
    getBorder(): string {
        return this.border;
    }
    setBorder(region: string) {
        this.border = region;
    }
    
    addLayoutComponent(component: JSComponent): void {
        component.setStyle("position", "absolute");
    }
    
    preferredLayoutWidth(container: JSComponent): number {
        var preferredLayoutWidth: number = 0;
        var border = this.getBorder();
        var hgap: number = this.getHgap();
        var vgap: number = this.getVgap();
        var components: JSComponent[] = container.getComponents();
        if (border === JSFlowLayout.WEST || border === JSFlowLayout.EAST) {
            if (!container.isValidVertically()) {
                return null;
            }
            var containerHeight: number = container.getHeight();
            var rowHeight: number = 0;
            var rowWidth: number = 0;
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (componentPreferredOuterHeight === null) {
                    return null;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                if (componentPreferredOuterWidth === null) {
                    return null;
                }
                if (rowHeight + componentPreferredOuterHeight > containerHeight) {
                    preferredLayoutWidth += rowWidth;
                    rowHeight = 0;
                    rowWidth = 0;
                }
                rowHeight += componentPreferredOuterHeight + vgap;
                rowWidth = Math.max(rowWidth, componentPreferredOuterWidth + hgap);
            }
            preferredLayoutWidth += rowWidth;
            if (preferredLayoutWidth != 0) {
                preferredLayoutWidth -= hgap;
            }
        } else {
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                if (componentPreferredOuterWidth === null) {
                    return null;
                }
                preferredLayoutWidth += componentPreferredOuterWidth + hgap;
            }
            if (preferredLayoutWidth != 0) {
                preferredLayoutWidth -= hgap;
            }
            var width = container.getWidth();
            if (width) {
                preferredLayoutWidth = Math.min(preferredLayoutWidth, width);
            }
        }
        return preferredLayoutWidth;
    }
    
    preferredLayoutHeight(container: JSComponent): number {
        var preferredLayoutHeight: number = 0;
        var border = this.getBorder();
        var hgap: number = this.getHgap();
        var vgap: number = this.getVgap();
        var components: JSComponent[] = container.getComponents();
        if (border === JSFlowLayout.WEST || border === JSFlowLayout.EAST) {
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (componentPreferredOuterHeight === null) {
                    return null;
                }
                preferredLayoutHeight += componentPreferredOuterHeight + vgap;
            }
            if (preferredLayoutHeight != 0) {
                preferredLayoutHeight -= vgap;
            }
            var height = container.getHeight();
            if (height) {
                preferredLayoutHeight = Math.min(preferredLayoutHeight, height);
            }
        } else {
            if (!container.isValidHorizontally()) {
                return null;
            }
            var containerWidth: number = container.getWidth();
            var rowWidth: number = 0;
            var rowHeight: number = 0;
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                if (componentPreferredOuterWidth === null) {
                    return null;
                }
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (componentPreferredOuterHeight === null) {
                    return null;
                }
                if (rowWidth + componentPreferredOuterWidth > containerWidth) {
                    preferredLayoutHeight += rowHeight;
                    rowWidth = 0;
                    rowHeight = 0;
                }
                rowWidth += componentPreferredOuterWidth + hgap;
                rowHeight = Math.max(rowHeight, componentPreferredOuterHeight + vgap);
            }
            preferredLayoutHeight += rowHeight;
            if (preferredLayoutHeight != 0) {
                preferredLayoutHeight -= vgap;
            }
        }
        return preferredLayoutHeight;
    }
    
    layoutContainer(container: JSComponent): void {
        var border = this.getBorder();
        if (border === JSFlowLayout.WEST || border === JSFlowLayout.EAST) {
            /*
            if (!(container instanceof JSBody)) {
                var parent: JSComponent = container.getParent();
                if (!parent || !parent.getLayout()) {
                    var preferredHeight: number = container.getPreferredHeight();
                    if (preferredHeight !== null) {
                        container.setHeight(preferredHeight);
                    }
                    var preferredWidth: number = container.getPreferredWidth();
                    if (preferredWidth !== null) {
                        container.setWidth(preferredWidth);
                    }
                    if (preferredHeight === null && preferredWidth !== null) {
                        preferredHeight = container.getPreferredHeight();
                        if (preferredHeight !== null) {
                            container.setHeight(preferredHeight);
                        }
                    }
                }
            }
            */
            this.layoutContainerVertically(container);
            this.layoutContainerHorizontally(container);
        } else {
            /*
            if (!(container instanceof JSBody)) {
                var parent: JSComponent = container.getParent();
                if (!parent || !parent.getLayout()) {
                    var preferredWidth: number = container.getPreferredWidth();
                    if (preferredWidth !== null) {
                        container.setWidth(preferredWidth);
                    }
                    var preferredHeight: number = container.getPreferredHeight();
                    if (preferredHeight !== null) {
                        container.setHeight(preferredHeight);
                    }
                    if (preferredWidth === null && preferredHeight !== null) {
                        preferredWidth = container.getPreferredWidth();
                        if (preferredWidth !== null) {
                            container.setWidth(preferredWidth);
                        }
                    }
                }
            }
            */
            this.layoutContainerHorizontally(container);
            this.layoutContainerVertically(container);
        }
    }
    
    layoutContainerHorizontally(container: JSComponent): void {
        if (container.isValidHorizontally()) {
            return;
        }
        var border = this.getBorder();
        if (border === JSFlowLayout.WEST || border === JSFlowLayout.EAST) {
            if (!container.isValidVertically()) {
                return;
            }
        }
        var hgap: number = this.getHgap();
        var vgap: number = this.getVgap();
        var width: number = container.getWidth();
        var height: number = container.getHeight();
        var rowWidth: number = 0;
        var rowHeight: number = 0;
        var n: number = 0;
        var components: JSComponent[] = container.getComponents();
        if (border === JSFlowLayout.WEST) {
            var x: number = container.getInsetLeft();
            var y: number = container.getInsetTop();
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (componentPreferredOuterHeight === null) {
                    return;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                if (componentPreferredOuterWidth === null) {
                    return;
                }
                if (rowHeight + componentPreferredOuterHeight > height) {
                    rowHeight -= vgap;
                    this.layoutComponentsHorizontally(container, components.slice(n, i), x, rowWidth);
                    x += rowWidth;
                    rowWidth = 0;
                    rowHeight = 0;
                    n = i;
                }
                rowWidth = Math.max(rowWidth, componentPreferredOuterWidth + hgap);
                rowHeight += componentPreferredOuterHeight + vgap;
            }
            if (n < i) {
                rowWidth -= hgap;
                rowHeight -= vgap;
                this.layoutComponentsHorizontally(container, components.slice(n, i), x, rowWidth);
            }
        } else if (border === JSFlowLayout.EAST) {
            var x: number = width - container.getInsetRight();
            var y: number = container.getInsetTop();
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (componentPreferredOuterHeight === null) {
                    return;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                if (componentPreferredOuterWidth === null) {
                    return;
                }
                if (rowHeight + componentPreferredOuterHeight > height) {
                    rowHeight -= vgap;
                    this.layoutComponentsHorizontally(container, components.slice(n, i), x - rowWidth, rowWidth);
                    x -= rowWidth;
                    rowWidth = 0;
                    rowHeight = 0;
                    n = i;
                }
                rowWidth = Math.max(rowWidth, componentPreferredOuterWidth + hgap);
                rowHeight += componentPreferredOuterHeight + vgap;
            }
            if (n < i) {
                rowWidth -= hgap;
                rowHeight -= vgap;
                this.layoutComponentsHorizontally(container, components.slice(n, i), x - rowWidth, rowWidth);
            }
        } else if (border === JSFlowLayout.SOUTH) {
            var x: number = container.getInsetLeft();
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                if (componentPreferredOuterWidth === null) {
                    return;
                }
                if (rowWidth + componentPreferredOuterWidth > width) {
                    rowWidth -= hgap;
                    this.layoutComponentsHorizontally(container, components.slice(n, i), x, rowWidth);
                    rowWidth = 0;
                    n = i;
                }
                rowWidth += componentPreferredOuterWidth + hgap;
            }
            if (n < i) {
                rowWidth -= hgap;
                this.layoutComponentsHorizontally(container, components.slice(n, i), x, rowWidth);
            }
        } else {
            var x: number = container.getInsetLeft();
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                if (componentPreferredOuterWidth === null) {
                    return;
                }
                if (rowWidth + componentPreferredOuterWidth > width) {
                    rowWidth -= hgap;
                    this.layoutComponentsHorizontally(container, components.slice(n, i), x, rowWidth);
                    rowWidth = 0;
                    n = i;
                }
                rowWidth += componentPreferredOuterWidth + hgap;
            }
            if (n < i) {
                rowWidth -= hgap;
                this.layoutComponentsHorizontally(container, components.slice(n, i), x, rowWidth);
            }
        }
        container.setValidHorizontally(true);
    }
    
    layoutContainerVertically(container: JSComponent): void {
        if (container.isValidVertically()) {
            return;
        }
        var border = this.getBorder();
        if (border !== JSFlowLayout.WEST && border !== JSFlowLayout.EAST) {
            if (!container.isValidHorizontally()) {
                return;
            }
        }
        var hgap: number = this.getHgap();
        var vgap: number = this.getVgap();
        var width: number = container.getWidth();
        var height: number = container.getHeight();
        var rowWidth: number = 0;
        var rowHeight: number = 0;
        var n: number = 0;
        var components: JSComponent[] = container.getComponents();
        if (border === JSFlowLayout.WEST) {
            var y: number = container.getInsetTop();
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (componentPreferredOuterHeight === null) {
                    return;
                }
                if (rowHeight + componentPreferredOuterHeight > height) {
                    rowHeight -= vgap;
                    this.layoutComponentsVertically(container, components.slice(n, i), y, rowHeight);
                    rowHeight = 0;
                    n = i;
                }
                rowHeight += componentPreferredOuterHeight + vgap;
            }
            if (n < i) {
                rowHeight -= vgap;
                this.layoutComponentsVertically(container, components.slice(n, i), y, rowHeight);
            }
        } else if (border === JSFlowLayout.EAST) {
            var y: number = container.getInsetTop();
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (componentPreferredOuterHeight === null) {
                    return;
                }
                if (rowHeight + componentPreferredOuterHeight > height) {
                    rowHeight -= vgap;
                    this.layoutComponentsVertically(container, components.slice(n, i), y, rowHeight);
                    rowHeight = 0;
                    n = i;
                }
                rowHeight += componentPreferredOuterHeight + vgap;
            }
            if (n < i) {
                rowHeight -= vgap;
                this.layoutComponentsVertically(container, components.slice(n, i), y, rowHeight);
            }
        } else if (border === JSFlowLayout.SOUTH) {
            var x: number = container.getInsetLeft();
            var y: number = height - container.getInsetBottom();
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                if (componentPreferredOuterWidth === null) {
                    return;
                }
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (componentPreferredOuterHeight === null) {
                    return;
                }
                if (rowWidth + componentPreferredOuterWidth > width) {
                    rowWidth -= hgap;
                    this.layoutComponentsVertically(container, components.slice(n, i), y - rowHeight, rowHeight);
                    y -= rowHeight;
                    rowWidth = 0;
                    rowHeight = 0;
                    n = i;
                }
                rowHeight = Math.max(rowHeight, componentPreferredOuterHeight + vgap);
                rowWidth += componentPreferredOuterWidth + hgap;
            }
            if (n < i) {
                rowWidth -= hgap;
                rowHeight -= vgap;
                this.layoutComponentsVertically(container, components.slice(n, i), y - rowHeight, rowHeight);
            }
        } else {
            var x: number = container.getInsetLeft();
            var y: number = container.getInsetTop();
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                if (componentPreferredOuterWidth === null) {
                    return;
                }
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (componentPreferredOuterHeight === null) {
                    return;
                }
                if (rowWidth + componentPreferredOuterWidth > width) {
                    rowWidth -= hgap;
                    this.layoutComponentsVertically(container, components.slice(n, i), y, rowHeight);
                    y += rowHeight;
                    rowWidth = 0;
                    rowHeight = 0;
                    n = i;
                }
                rowHeight = Math.max(rowHeight, componentPreferredOuterHeight + vgap);
                rowWidth += componentPreferredOuterWidth + hgap;
            }
            if (n < i) {
                rowWidth -= hgap;
                rowHeight -= vgap;
                this.layoutComponentsVertically(container, components.slice(n, i), y, rowHeight);
            }
        }
        container.setValidVertically(true);
    }
    
    layoutComponentsHorizontally(container: JSComponent, components: JSComponent[], x: number, rowWidth: number): void {
        var border = this.getBorder();
        var align: string = this.getAlign();
        var hgap: number = this.getHgap();
        var width: number = container.getWidth();
        if (border === JSFlowLayout.WEST || border === JSFlowLayout.EAST) {
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                var componentAlign: string = component.getAlign();
                if (componentAlign !== JSFlowLayout.TOP && componentAlign !== JSFlowLayout.BOTTOM) {
                    continue;
                }
                var constraints: string = <string> component.getConstraints();
                if (constraints === JSFlowLayout.BOTH || constraints === JSFlowLayout.HORIZONTAL) {
                    component.setOuterWidth(rowWidth);
                    component.setX(x);
                } else {
                    var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    component.setX(x + (rowWidth - componentPreferredOuterWidth) / 2);
                }
            }
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                var componentAlign: string = component.getAlign();
                if (componentAlign === JSFlowLayout.TOP || componentAlign === JSFlowLayout.BOTTOM) {
                    continue;
                }
                switch (componentAlign) {
                case JSFlowLayout.BOTH:
                    component.setOuterWidth(rowWidth);
                    component.setX(x);
                    break;
                case JSFlowLayout.LEFT:
                    var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    component.setX(x);
                    break;
                case JSFlowLayout.RIGHT:
                    var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    component.setX(x + rowWidth - componentPreferredOuterWidth);
                    break;
                case JSFlowLayout.CENTER:
                default:
                    var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    component.setX(x + (rowWidth - componentPreferredOuterWidth) / 2);
                }
            }
        } else {
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                var componentAlign: string = component.getAlign();
                if (componentAlign !== JSFlowLayout.LEFT && componentAlign !== JSFlowLayout.RIGHT) {
                    continue;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                component.setOuterWidth(componentPreferredOuterWidth);
                if (componentAlign === JSFlowLayout.LEFT) {
                    component.setX(x);
                    x += componentPreferredOuterWidth + hgap;
                    if (align === JSFlowLayout.LEFT || align === JSFlowLayout.RIGHT) {
                        rowWidth -= componentPreferredOuterWidth + hgap;
                    } else {
                        rowWidth -= 2 * (componentPreferredOuterWidth + hgap);
                    }
                } else {
                    component.setX(x + width - componentPreferredOuterWidth); // 100%
                    if (align === JSFlowLayout.LEFT || align === JSFlowLayout.RIGHT) {
                        rowWidth -= componentPreferredOuterWidth + hgap;
                    } else {
                        x += componentPreferredOuterWidth + hgap;
                        rowWidth -= 2 * (componentPreferredOuterWidth + hgap);
                    }
                }
            }
            switch (align) {
            case JSFlowLayout.LEFT:
                break;
            case JSFlowLayout.RIGHT:
                x += width - rowWidth;
                break;
            case JSFlowLayout.CENTER:
            default:
                x += (width - rowWidth) / 2;
            }
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                var componentAlign: string = component.getAlign();
                if (componentAlign === JSFlowLayout.LEFT || componentAlign === JSFlowLayout.RIGHT) {
                    continue;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                component.setOuterWidth(componentPreferredOuterWidth);
                component.setX(x);
                x += componentPreferredOuterWidth + hgap;
            }
        }
    }
    
    layoutComponentsVertically(container: JSComponent, components: JSComponent[], y: number, rowHeight: number): void {
        var border = this.getBorder();
        var align: string = this.getAlign();
        var vgap: number = this.getVgap();
        var height: number = container.getHeight();
        if (border === JSFlowLayout.WEST || border === JSFlowLayout.EAST) {
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                var componentAlign: string = component.getAlign();
                if (componentAlign !== JSFlowLayout.TOP && componentAlign !== JSFlowLayout.BOTTOM) {
                    continue;
                }
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                component.setOuterHeight(componentPreferredOuterHeight);
                if (componentAlign === JSFlowLayout.TOP) {
                    component.setY(y);
                    y += componentPreferredOuterHeight + vgap;
                    if (align === JSFlowLayout.TOP || align === JSFlowLayout.BOTTOM) {
                        rowHeight -= componentPreferredOuterHeight + vgap;
                    } else {
                        rowHeight -= 2 * (componentPreferredOuterHeight + vgap);
                    }
                } else {
                    component.setY(y + height - componentPreferredOuterHeight); // 100%
                    if (align === JSFlowLayout.TOP || align === JSFlowLayout.BOTTOM) {
                        rowHeight -= componentPreferredOuterHeight + vgap;
                    } else {
                        y += componentPreferredOuterHeight + vgap;
                        rowHeight -= 2 * (componentPreferredOuterHeight + vgap);
                    }
                }
            }
            switch (align) {
            case JSFlowLayout.TOP:
                break;
            case JSFlowLayout.BOTTOM:
                y += height - rowHeight;
                break;
            case JSFlowLayout.CENTER:
            default:
                y += (height - rowHeight) / 2;
            }
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                var componentAlign: string = component.getAlign();
                if (componentAlign === JSFlowLayout.TOP || componentAlign === JSFlowLayout.BOTTOM) {
                    continue;
                }
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                component.setOuterHeight(componentPreferredOuterHeight);
                switch (componentAlign) {
                case JSFlowLayout.BOTH:
                    break;
                case JSFlowLayout.LEFT:
                    break;
                case JSFlowLayout.RIGHT:
                    break;
                case JSFlowLayout.CENTER:
                default:
                }
                component.setY(y);
                y += componentPreferredOuterHeight + vgap;
            }
        } else {
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                var componentAlign: string = component.getAlign();
                if (componentAlign !== JSFlowLayout.LEFT && componentAlign !== JSFlowLayout.RIGHT) {
                    continue;
                }
                var constraints: string = <string> component.getConstraints();
                if (constraints === JSFlowLayout.BOTH || constraints === JSFlowLayout.VERTICAL) {
                    component.setOuterHeight(rowHeight);
                    component.setY(y);
                } else {
                    var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    component.setY(y + (rowHeight - componentPreferredOuterHeight) / 2);
                }
            }
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                var componentAlign: string = component.getAlign();
                if (componentAlign === JSFlowLayout.LEFT || componentAlign === JSFlowLayout.RIGHT) {
                    continue;
                }
                switch (componentAlign) {
                case JSFlowLayout.BOTH:
                    component.setOuterHeight(rowHeight);
                    component.setY(y);
                    break;
                case JSFlowLayout.TOP:
                    var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    component.setY(y);
                    break;
                case JSFlowLayout.BOTTOM:
                    var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    component.setY(y + rowHeight - componentPreferredOuterHeight);
                    break;
                case JSFlowLayout.CENTER:
                default:
                    var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    component.setY(y + (rowHeight - componentPreferredOuterHeight) / 2);
                }
            }
        }
    }
}