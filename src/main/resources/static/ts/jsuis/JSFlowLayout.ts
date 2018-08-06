/// <reference path = "../jsuis.ts"/>
class JSFlowLayout extends JSLayout {
    
    hgap: number = 0;
    vgap: number = 0;
    align: string = JSFlowLayout.CENTER;
    orientation: string = JSFlowLayout.TOP_TO_BOTTOM;
    
    constructor();
    constructor(hgap: number, vgap: number);
    constructor(align: string);
    constructor(align: string, hgap: number, vgap: number);
    constructor(orientation: string, align: string);
    constructor(orientation: string, align: string, hgap: number, vgap: number);
    // overload
    constructor(hgapOrAlignOrOrientation?: number | string, vgapOrHgapOrAlign?: number | string, vgapOrHgap?: number, vgap?: number) {
        // constructor();
        super();
        if (hgapOrAlignOrOrientation !== undefined) {
            if (typeof hgapOrAlignOrOrientation === "number") {
                // constructor(hgap: number, vgap: number);
                this.setHgap(hgapOrAlignOrOrientation);
                this.setVgap(<number> vgapOrHgapOrAlign);
            } else if (vgapOrHgapOrAlign === undefined) {
                // constructor(align: string);
                this.setAlign(hgapOrAlignOrOrientation);
            } else if (typeof vgapOrHgapOrAlign === "number") {
                // constructor(align: string, hgap: number, vgap: number);
                this.setAlign(hgapOrAlignOrOrientation);
                this.setHgap(vgapOrHgapOrAlign);
                this.setVgap(vgapOrHgap);
            } else {
                // constructor(orientation: string, align: string);
                // constructor(orientation: string, align: string, hgap: number, vgap: number);
                this.setOrientation(hgapOrAlignOrOrientation);
                this.setAlign(vgapOrHgapOrAlign);
                if (vgapOrHgap !== undefined) {
                    this.setHgap(vgapOrHgap);
                    this.setVgap(vgap);
                }
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
    getAlign(): string {
        return this.align;
    }
    setAlign(align: string) {
        this.align = align;
    }
    getOrientation(): string {
        return this.orientation;
    }
    setOrientation(orientation: string) {
        this.orientation = orientation;
    }
    addLayoutComponent(component: JSComponent): void {
        component.setStyle("position", "absolute");
    }
    preferredLayoutWidth(container: JSComponent): number {
        var preferredLayoutWidth: number = 0;
        var hgap: number = this.getHgap();
        var vgap: number = this.getVgap();
        var components: JSComponent[] = container.getComponents();
        var whiteSpace = container.getStyle("white-space");
        var orientation = this.getOrientation();
        if (orientation === JSFlowLayout.LEFT_TO_RIGHT || orientation === JSFlowLayout.RIGHT_TO_LEFT) {
            if (whiteSpace === "nowrap") {
                for (var i: number = 0; i < components.length; i++) {
                    var component: JSComponent = components[i];
                    if (!component.isDisplayable()) {
                        continue;
                    }
                    var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                    preferredLayoutWidth = Math.max(preferredLayoutWidth, componentPreferredOuterWidth);
                }
            } else {
                var containerHeight: number = container.getHeight();
                var rowWidth: number = 0;
                var rowHeight: number = 0;
                for (var i: number = 0; i < components.length; i++) {
                    var component: JSComponent = components[i];
                    if (!component.isDisplayable()) {
                        continue;
                    }
                    var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                    var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                    if (rowHeight + componentPreferredOuterHeight > containerHeight) {
                        preferredLayoutWidth += rowWidth;
                        rowWidth = 0;
                        rowHeight = 0;
                    }
                    rowWidth = Math.max(rowWidth, componentPreferredOuterWidth + hgap);
                    rowHeight += componentPreferredOuterHeight + vgap;
                }
                preferredLayoutWidth += rowWidth;
                if (preferredLayoutWidth != 0) {
                    preferredLayoutWidth -= hgap;
                }
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
            if (whiteSpace !== "nowrap") {
                var parent = container.getParent();
                preferredLayoutWidth = Math.min(preferredLayoutWidth, parent.getWidth());
            }
        }
        return preferredLayoutWidth;
    }
    preferredLayoutHeight(container: JSComponent): number {
        var preferredLayoutHeight: number = 0;
        var hgap: number = this.getHgap();
        var vgap: number = this.getVgap();
        var components: JSComponent[] = container.getComponents();
        var whiteSpace = container.getStyle("white-space");
        var orientation = this.getOrientation();
        if (orientation === JSFlowLayout.LEFT_TO_RIGHT || orientation === JSFlowLayout.RIGHT_TO_LEFT) {
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
            if (whiteSpace !== "nowrap") {
                var parent = container.getParent();
                preferredLayoutHeight = Math.min(preferredLayoutHeight, parent.getHeight());
            }
        } else {
            if (whiteSpace === "nowrap") {
                for (var i: number = 0; i < components.length; i++) {
                    var component: JSComponent = components[i];
                    if (!component.isDisplayable()) {
                        continue;
                    }
                    var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                    preferredLayoutHeight = Math.max(preferredLayoutHeight, componentPreferredOuterHeight);
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
        }
        return preferredLayoutHeight;
    }
    layoutContainer(container: JSComponent): void {
        var hgap: number = this.getHgap();
        var vgap: number = this.getVgap();
        var containerWidth: number = container.getWidth();
        var containerHeight: number = container.getHeight();
        var rowWidth: number = 0;
        var rowHeight: number = 0;
        var n: number = 0;
        var components: JSComponent[] = container.getComponents();
        var orientation = this.getOrientation();
        if (orientation === JSFlowLayout.RIGHT_TO_LEFT) {
            var x: number = containerWidth - container.getInsetRight();
            var y: number = container.getInsetTop();
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (rowHeight + componentPreferredOuterHeight > containerHeight) {
                    rowHeight -= vgap;
                    this.layoutComponents(container, components.slice(n, i), x - rowWidth, y, rowWidth, rowHeight);
                    x -= rowWidth;
                    rowWidth = 0;
                    rowHeight = 0;
                    n = i;
                }
                rowWidth = Math.max(rowWidth, componentPreferredOuterWidth + hgap);
                rowHeight += componentPreferredOuterHeight + vgap;
            }
            if (n < i) {
                rowHeight -= vgap;
                this.layoutComponents(container, components.slice(n, i), x - rowWidth, y, rowWidth, rowHeight);
            }
        } else if (orientation === JSFlowLayout.LEFT_TO_RIGHT) {
            var x: number = container.getInsetLeft();
            var y: number = container.getInsetTop();
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (rowHeight + componentPreferredOuterHeight > containerHeight) {
                    rowHeight -= vgap;
                    this.layoutComponents(container, components.slice(n, i), x, y, rowWidth, rowHeight);
                    x += rowWidth;
                    rowWidth = 0;
                    rowHeight = 0;
                    n = i;
                }
                rowWidth = Math.max(rowWidth, componentPreferredOuterWidth + hgap);
                rowHeight += componentPreferredOuterHeight + vgap;
            }
            if (n < i) {
                rowHeight -= vgap;
                this.layoutComponents(container, components.slice(n, i), x, y, rowWidth, rowHeight);
            }
        } else if (orientation === JSFlowLayout.BOTTOM_TO_TOP) {
            var x: number = container.getInsetLeft();
            var y: number = containerHeight - container.getInsetBottom();
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                if (!component.isDisplayable()) {
                    continue;
                }
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (rowWidth + componentPreferredOuterWidth > containerWidth) {
                    rowWidth -= hgap;
                    this.layoutComponents(container, components.slice(n, i), x, y - rowHeight, rowWidth, rowHeight);
                    y -= rowHeight;
                    rowWidth = 0;
                    rowHeight = 0;
                    n = i;
                }
                rowWidth += componentPreferredOuterWidth + hgap;
                rowHeight = Math.max(rowHeight, componentPreferredOuterHeight + vgap);
            }
            if (n < i) {
                rowWidth -= hgap;
                this.layoutComponents(container, components.slice(n, i), x, y - rowHeight, rowWidth, rowHeight);
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
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (rowWidth + componentPreferredOuterWidth > containerWidth) {
                    rowWidth -= hgap;
                    this.layoutComponents(container, components.slice(n, i), x, y, rowWidth, rowHeight);
                    y += rowHeight;
                    rowWidth = 0;
                    rowHeight = 0;
                    n = i;
                }
                rowWidth += componentPreferredOuterWidth + hgap;
                rowHeight = Math.max(rowHeight, componentPreferredOuterHeight + vgap);
            }
            if (n < i) {
                rowWidth -= hgap;
                this.layoutComponents(container, components.slice(n, i), x, y, rowWidth, rowHeight);
            }
        }
    }
    layoutComponents(container: JSComponent, components: JSComponent[], x: number, y: number, rowWidth: number, rowHeight: number): void {
        var align: string = this.getAlign();
        var hgap: number = this.getHgap();
        var vgap: number = this.getVgap();
        var containerWidth: number = container.getWidth();
        var containerHeight: number = container.getHeight();
        var z: number;
        var orientation = this.getOrientation();
        if (orientation === JSFlowLayout.LEFT_TO_RIGHT || orientation === JSFlowLayout.RIGHT_TO_LEFT) {
            switch (align) {
            case JSFlowLayout.TOP:
                // y += 0;
                z = containerHeight;
                break;
            case JSFlowLayout.BOTTOM:
                y += containerHeight - rowHeight;
                z = 0;
                break;
            case JSFlowLayout.CENTER:
            default:
                y += (containerHeight - rowHeight) / 2;
            }
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                component.setOuterHeight(componentPreferredOuterHeight);
                var constraints: { fill?: string; anchor?: string } = <{ fill?: string; anchor?: string }> component.getConstraints() || {};
                var fill: string = constraints.fill;
                var anchor: string = constraints.anchor;
                switch (fill) {
                case JSFlowLayout.BOTH:
                case JSFlowLayout.HORIZONTAL:
                    component.setX(x);
                    component.setOuterWidth(rowWidth);
                    break;
                case JSFlowLayout.NONE:
                case JSFlowLayout.VERTICAL:
                default:
                    var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                    component.setOuterWidth(componentPreferredOuterWidth);
                    switch (anchor) {
                    case JSFlowLayout.WEST:
                    case JSFlowLayout.NORTHWEST:
                    case JSFlowLayout.SOUTHWEST:
                        component.setX(x);
                        break;
                    case JSFlowLayout.EAST:
                    case JSFlowLayout.NORTHEAST:
                    case JSFlowLayout.SOUTHEAST:
                        component.setX(x + rowWidth - componentPreferredOuterWidth);
                        break;
                    case JSFlowLayout.CENTER:
                    default:
                        component.setX(x + (rowWidth - componentPreferredOuterWidth) / 2);
                    }
                }
                if (align === JSFlowLayout.TOP && (anchor === JSFlowLayout.SOUTH || anchor === JSFlowLayout.SOUTHWEST || anchor === JSFlowLayout.SOUTHEAST)) {
                    component.setY(z - componentPreferredOuterHeight);
                    z -= componentPreferredOuterHeight + vgap;
                } else if (align === JSFlowLayout.BOTTOM && (anchor === JSFlowLayout.NORTH || anchor === JSFlowLayout.NORTHWEST || anchor === JSFlowLayout.NORTHEAST)) {
                    component.setY(z);
                    z += componentPreferredOuterHeight + vgap;
                } else {
                    component.setY(y);
                    y += componentPreferredOuterHeight + vgap;
                }
            }
        } else {
            switch (align) {
            case JSFlowLayout.LEFT:
                // x += 0;
                z = containerWidth;
                break;
            case JSFlowLayout.RIGHT:
                x += containerWidth - rowWidth;
                z = 0;
                break;
            case JSFlowLayout.CENTER:
            default:
                x += (containerWidth - rowWidth) / 2;
            }
            for (var i: number = 0; i < components.length; i++) {
                var component: JSComponent = components[i];
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                component.setOuterWidth(componentPreferredOuterWidth);
                var constraints: { fill?: string; anchor?: string } = <{ fill?: string; anchor?: string }> component.getConstraints() || {};
                var fill: string = constraints.fill;
                var anchor: string = constraints.anchor;
                switch (fill) {
                case JSFlowLayout.BOTH:
                case JSFlowLayout.VERTICAL:
                    component.setOuterHeight(rowHeight);
                    component.setY(y);
                    break;
                case JSFlowLayout.NONE:
                case JSFlowLayout.HORIZONTAL:
                default:
                    var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                    component.setOuterHeight(componentPreferredOuterHeight);
                    switch (anchor) {
                    case JSFlowLayout.NORTH:
                    case JSFlowLayout.NORTHWEST:
                    case JSFlowLayout.NORTHEAST:
                        component.setY(y);
                        break;
                    case JSFlowLayout.SOUTH:
                    case JSFlowLayout.SOUTHWEST:
                    case JSFlowLayout.SOUTHEAST:
                        component.setY(y + rowHeight - componentPreferredOuterHeight);
                        break;
                    case JSFlowLayout.CENTER:
                    default:
                        component.setY(y + (rowHeight - componentPreferredOuterHeight) / 2);
                    }
                }
                if (align === JSFlowLayout.LEFT && (anchor === JSFlowLayout.EAST || anchor === JSFlowLayout.NORTHEAST || anchor === JSFlowLayout.SOUTHEAST)) {
                    component.setX(z - componentPreferredOuterWidth);
                    z -= componentPreferredOuterWidth + hgap;
                } else if (align === JSFlowLayout.RIGHT && (anchor === JSFlowLayout.WEST || anchor === JSFlowLayout.NORTHWEST || anchor === JSFlowLayout.SOUTHWEST)) {
                    component.setX(z);
                    z += componentPreferredOuterWidth + hgap;
                } else {
                    component.setX(x);
                    x += componentPreferredOuterWidth + hgap;
                }
            }
        }
    }
}