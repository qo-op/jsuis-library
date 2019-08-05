/// <reference path = "../jsuis.ts"/>
/**
 * JSFlowLayout
 * 
 * @author Yassuo Toda
 */
class JSFlowLayout extends JSLayout {
    
    border: string = JSFlowLayout.NORTH;
    align: string = JSFlowLayout.CENTER;
    
    constructor();
    constructor(align: string);
    constructor(hgap: number, vgap: number);
    constructor(border: string, align: string);
    constructor(align: string, hgap: number, vgap: number);
    constructor(border: string, align: string, hgap: number, vgap: number);
    // overload
    constructor() {
        super();
        switch (arguments.length) {
        case 0:
            // constructor;
            break;
        case 1:
            // constructor(align: string);
            if (typeof arguments[0] === "string") {
                var align: string = arguments[0];
                this.setAlign(align);
            }
            break;
        case 2:
            // constructor(border: string, align: string);
            if (typeof arguments[0] === "string" && typeof arguments[1] === "string") {
                var border: string = arguments[0];
                var align: string = arguments[1];
                this.setBorder(border);
                this.setAlign(align);
            } else if (typeof arguments[0] === "number" && typeof arguments[1] === "number") {
                var hgap: number = arguments[0];
                var vgap: number = arguments[1];
                this.setHgap(hgap);
                this.setVgap(vgap);
            }
            break;
        case 3:
            // constructor(align: string, hgap: number, vgap: number);
            if (typeof arguments[0] === "string" && typeof arguments[1] === "number" && typeof arguments[2] === "number") {
                var align: string = arguments[0];
                var hgap: number = arguments[1];
                var vgap: number = arguments[2];
                this.setAlign(align);
                this.setHgap(hgap);
                this.setVgap(vgap);
            }
            break;
        case 4:
            // constructor(border: string, align: string, hgap: number, vgap: number);
            if (typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "number" && typeof arguments[3] === "number") {
                var border: string = arguments[0];
                var align: string = arguments[1];
                var hgap: number = arguments[2];
                var vgap: number = arguments[3];
                this.setBorder(border);
                this.setAlign(align);
                this.setHgap(hgap);
                this.setVgap(vgap);
            }
            break;
        default:
        }
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
    isHorizontal(): boolean {
        var border = this.getBorder();
        return (border !== JSFlowLayout.WEST && border !== JSFlowLayout.EAST);
    }
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
        if (this.isHorizontal()) {
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
        if (!this.isHorizontal()) {
            var containerParent: JSComponent = container.getParent();
            if (containerParent) {
                var containerParentLayout: JSLayout = containerParent.getLayout();
                if (containerParentLayout) {
                    if (!containerParentLayout.isHorizontal()) {
                        this.invalidateLayoutHorizontally(container);
                        JSLayout.validateLater(container);
                    }
                }
            }
        }
            */
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
            var containerHeight: number = container.getHeight();
            var rowHeight: number = 0;
            var rowWidth: number = 0;
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
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
                preferredLayoutWidth += componentPreferredOuterWidth + hgap;
            }
            if (preferredLayoutWidth != 0) {
                preferredLayoutWidth -= hgap;
            }
            var width: number = container.getContentWidth();
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
                preferredLayoutHeight += componentPreferredOuterHeight + vgap;
            }
            if (preferredLayoutHeight != 0) {
                preferredLayoutHeight -= vgap;
            }
            var height: number = container.getContentHeight();
            if (height) {
                preferredLayoutHeight = Math.min(preferredLayoutHeight, height);
            }
        } else {
            var containerWidth: number = container.getWidth();
            var rowWidth: number = 0;
            var rowHeight: number = 0;
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
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
            this.layoutContainerVertically(container);
            this.layoutContainerHorizontally(container);
        } else {
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
        var width: number = container.getContentWidth();
        var height: number = container.getContentHeight();
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
        var width: number = container.getContentWidth();
        var height: number = container.getContentHeight();
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
        var width: number = container.getContentWidth();
        if (border === JSFlowLayout.WEST || border === JSFlowLayout.EAST) {
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
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
                if (!component.isDisplayable()) {
                    continue;
                }
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
            var xmin: number = x;
            var xmax: number = x + width;
            var extraHorizontalSpace: number = width - rowWidth;
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentAlign: string = component.getAlign();
                if (componentAlign !== JSFlowLayout.LEFT && componentAlign !== JSFlowLayout.RIGHT) {
                    continue;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                component.setOuterWidth(componentPreferredOuterWidth);
                if (componentAlign === JSFlowLayout.LEFT) {
                    component.setX(xmin);
                    xmin += componentPreferredOuterWidth + hgap;
                } else {
                    xmax -= componentPreferredOuterWidth;
                    component.setX(xmax); // 100%
                    xmax -= hgap;
                }
                rowWidth -= componentPreferredOuterWidth + hgap;
            }
            switch (align) {
            case JSFlowLayout.LEFT:
            case JSFlowLayout.LEFT_RIGHT:
            case JSFlowLayout.JUSTIFY:
                x = xmin;
                break;
            case JSFlowLayout.RIGHT:
                x = xmax - rowWidth;
                break;
            case JSFlowLayout.CENTER:
            default:
                x = Math.min(Math.max(x + (width - rowWidth) / 2, xmin), xmax - rowWidth);
            }
            if (align === JSFlowLayout.LEFT_RIGHT || align === JSFlowLayout.JUSTIFY) {
                for (var i: number = 0; i < components.length; i++) {
                    var component: JSComponent = components[i];
                    if (!component.isDisplayable()) {
                        continue;
                    }
                    var componentAlign: string = component.getAlign();
                    if (componentAlign === JSFlowLayout.LEFT || componentAlign === JSFlowLayout.RIGHT) {
                        continue;
                    }
                    var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth + extraHorizontalSpace / components.length);
                    component.setX(x);
                    x += componentPreferredOuterWidth + extraHorizontalSpace / components.length + hgap;
                }
            } else {
                for (var i: number = 0; i < components.length; i++) {
                    var component: JSComponent = components[i];
                    if (!component.isDisplayable()) {
                        continue;
                    }
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
    }
    
    layoutComponentsVertically(container: JSComponent, components: JSComponent[], y: number, rowHeight: number): void {
        var border = this.getBorder();
        var align: string = this.getAlign();
        var vgap: number = this.getVgap();
        var height: number = container.getContentHeight();
        if (border === JSFlowLayout.WEST || border === JSFlowLayout.EAST) {
            var ymin: number = y;
            var ymax: number = y + height;
            var extraVerticalSpace: number = height - rowHeight;
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentAlign: string = component.getAlign();
                if (componentAlign !== JSFlowLayout.TOP && componentAlign !== JSFlowLayout.BOTTOM) {
                    continue;
                }
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                component.setOuterHeight(componentPreferredOuterHeight);
                if (componentAlign === JSFlowLayout.TOP) {
                    component.setY(ymin);
                    ymin += componentPreferredOuterHeight + vgap;
                } else {
                    ymax -= componentPreferredOuterHeight;
                    component.setY(ymax); // 100%
                    ymax -= vgap;
                }
                rowHeight -= componentPreferredOuterHeight + vgap;
            }
            switch (align) {
            case JSFlowLayout.TOP:
                y = ymin;
                break;
            case JSFlowLayout.BOTTOM:
                y = ymax - rowHeight;
                break;
            case JSFlowLayout.CENTER:
            default:
                y = Math.min(Math.max(y + (height - rowHeight) / 2, ymin), ymax - rowHeight);
            }
            if (align === JSFlowLayout.LEFT_RIGHT || align === JSFlowLayout.JUSTIFY) {
                for (var i: number = 0; i < components.length; i++) {
                    var component: JSComponent = components[i];
                    if (!component.isDisplayable()) {
                        continue;
                    }
                    var componentAlign: string = component.getAlign();
                    if (componentAlign === JSFlowLayout.TOP || componentAlign === JSFlowLayout.BOTTOM) {
                        continue;
                    }
                    var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight + extraVerticalSpace / components.length);
                    component.setY(y);
                    y += componentPreferredOuterHeight + extraVerticalSpace / components.length + vgap;
                }
            } else {
                for (var i: number = 0; i < components.length; i++) {
                    var component: JSComponent = components[i];
                    if (!component.isDisplayable()) {
                        continue;
                    }
                    var componentAlign: string = component.getAlign();
                    if (componentAlign === JSFlowLayout.TOP || componentAlign === JSFlowLayout.BOTTOM) {
                        continue;
                    }
                    var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    component.setY(y);
                    y += componentPreferredOuterHeight + vgap;
                }
            }
        } else {
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
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
                if (!component.isDisplayable()) {
                    continue;
                }
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