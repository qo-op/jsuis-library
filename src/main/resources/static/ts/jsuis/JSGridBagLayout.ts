/// <reference path = "../jsuis.ts"/>
class JSGridBagLayout extends JSLayout {
    
    hgap: number = 0;
    vgap: number = 0;
    
    preferredWidths: number[];
    preferredHeights: number[];
    
    weightxs: number[];
    weightys: number[];
    
    constructor();
    constructor(hgap: number, vgap: number);
    // overload
    constructor(hgap?: number, vgap?: number) {
        // constructor();
        super();
        if (hgap !== undefined) {
            // constructor(hgap: number, vgap: number);
            this.setHgap(hgap);
            this.setVgap(vgap);
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
    getPreferredWidths(): number[] {
        return this.preferredWidths;
    }
    setPreferredWidths(preferredWidths: number[]) {
        this.preferredWidths = preferredWidths;
    }
    getPreferredHeights(): number[] {
        return this.preferredHeights;
    }
    setPreferredHeights(preferredHeights: number[]) {
        this.preferredHeights = preferredHeights;
    }
    getWeightxs(): number[] {
        return this.weightxs;
    }
    setWeightxs(weightxs: number[]) {
        this.weightxs = weightxs;
    }
    getWeightys(): number[] {
        return this.weightys;
    }
    setWeightys(weightys: number[]) {
        this.weightys = weightys;
    }
    addLayoutComponent(component: JSComponent): void {
        component.setStyle("position", "absolute");
    }
    preferredLayoutWidth(container: JSComponent): number {
        var preferredLayoutWidth: number = 0;
        var hgap: number = this.getHgap();
        var preferredWidths: number[] = [];
        this.setPreferredWidths(preferredWidths);
        var weightxs: number[] = [];
        this.setWeightxs(weightxs);
        var components: JSComponent[] = container.getComponents().slice();
        components.sort(function (a, b) {
            var c: number = ((<{ gridx?: number }> a.getConstraints() || {}).gridx || 0) + ((<{ gridwidth?: number }> a.getConstraints() || {}).gridwidth || 1);
            var d: number = ((<{ gridx?: number }> b.getConstraints() || {}).gridx || 0) + ((<{ gridwidth?: number }> b.getConstraints() || {}).gridwidth || 1);
            if (c < d) {
                return -1;
            }
            if (c > d) {
                return 1; 
            }
            return 0;
        });
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
            var constraints: { gridx?: number; gridwidth?: number; weightx?: number } = <{ gridx?: number; gridwidth?: number; weightx?: number }> component.getConstraints() || {};
            var gridx: number = constraints.gridx || 0;
            var gridwidth: number = constraints.gridwidth || 1;
            if (gridwidth === 1) {
                preferredWidths[gridx] = Math.max(preferredWidths[gridx] || 0, componentPreferredOuterWidth);
            } else {
                preferredWidths[gridx + gridwidth - 1] = Math.max(
                    preferredWidths[gridx + gridwidth - 1] || 0,
                    componentPreferredOuterWidth - (preferredWidths[gridx + gridwidth - 2] || 0));
            }
            var weightx: number = (constraints.weightx || 0) / gridwidth;
            for (var j: number = 0; j < gridwidth; j++) {
                weightxs[gridx + j] = Math.max(weightxs[gridx + j] || 0, weightx);
            }
        }
        for (var i: number = 0; i < preferredWidths.length; i++) {
            preferredLayoutWidth += (preferredWidths[i] || 0) + hgap;
        }
        if (preferredLayoutWidth != 0) {
            preferredLayoutWidth -= hgap;
        }
        return preferredLayoutWidth;
    }
    preferredLayoutHeight(container: JSComponent): number {
        var preferredLayoutHeight: number = 0;
        var vgap: number = this.getVgap();
        var preferredHeights: number[] = [];
        this.setPreferredHeights(preferredHeights);
        var weightys: number[] = [];
        this.setWeightys(weightys);
        var components: JSComponent[] = container.getComponents().slice();
        components.sort(function (a, b) {
            var c: number = ((<{ gridy?: number }> a.getConstraints() || {}).gridy || 0) + ((<{ gridheight?: number }> a.getConstraints() || {}).gridheight || 1);
            var d: number = ((<{ gridy?: number }> b.getConstraints() || {}).gridy || 0) + ((<{ gridheight?: number }> b.getConstraints() || {}).gridheight || 1);
            if (c < d) {
                return -1;
            }
            if (c > d) {
                return 1; 
            }
            return 0;
        });
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
            var constraints: { gridy?: number; gridheight?: number; weighty?: number } = <{ gridy?: number; gridheight?: number; weighty?: number }> component.getConstraints() || {};
            var gridy: number = constraints.gridy || 0;
            var gridheight: number = constraints.gridheight || 1;
            if (gridheight === 1) {
                preferredHeights[gridy] = Math.max(preferredHeights[gridy] || 0, componentPreferredOuterHeight);
            } else {
                preferredHeights[gridy + gridheight - 1] = Math.max(
                    preferredHeights[gridy + gridheight - 1] || 0,
                    componentPreferredOuterHeight - (preferredHeights[gridy + gridheight - 2] || 0));
            }
            var weighty: number = (constraints.weighty || 0) / gridheight;
            for (var j: number = 0; j < gridheight; j++) {
                weightys[gridy + j] = Math.max(weightys[gridy + j] || 0, weighty);
            }
        }
        for (var i: number = 0; i < preferredHeights.length; i++) {
            preferredLayoutHeight += (preferredHeights[i] || 0) + vgap;
        }
        if (preferredLayoutHeight != 0) {
            preferredLayoutHeight -= vgap;
        }
        return preferredLayoutHeight;
    }
    layoutContainer(container: JSComponent): void {
        var hgap: number = this.getHgap();
        var vgap: number = this.getVgap();
        var preferredWidths: number[] = this.getPreferredWidths();
        var preferredHeights: number[] = this.getPreferredHeights();
        var preferredLayoutWidth: number = 0;
        if (preferredWidths && preferredWidths.length) {
            for (var i: number = 0; i < preferredWidths.length; i++) {
                preferredLayoutWidth += (preferredWidths[i] || 0) + hgap;
            }
            if (preferredLayoutWidth != 0) {
                preferredLayoutWidth -= hgap;
            }
        } else {
            preferredLayoutWidth = this.preferredLayoutWidth(container);
            preferredWidths = this.getPreferredWidths();
        }
        var preferredLayoutHeight: number = 0;
        if (preferredHeights && preferredHeights.length) {
            for (var i: number = 0; i < preferredHeights.length; i++) {
                preferredLayoutHeight += (preferredHeights[i] || 0) + vgap;
            }
            if (preferredLayoutHeight != 0) {
                preferredLayoutHeight -= vgap;
            }
        } else {
            preferredLayoutHeight = this.preferredLayoutHeight(container);
            preferredHeights = this.getPreferredHeights();
        }
        var weightxs: number[] = this.getWeightxs();
        var weightys: number[] = this.getWeightys();
        var containerWidth: number = container.getWidth();
        var containerHeight: number = container.getHeight();
        var left: number = container.getInsetLeft();
        var widths: number[] = preferredWidths.slice();
        var extraHorizontalSpace: number = Math.max(containerWidth - preferredLayoutWidth, 0);
        if (extraHorizontalSpace) {
            var sum: number = 0;
            for (var i: number = 0; i < weightxs.length; i++) {
                sum += weightxs[i] || 0;
            }
            if (sum) {
                for (var i: number = 0; i < widths.length; i++) {
                    widths[i] = (widths[i] || 0) + extraHorizontalSpace * (weightxs[i] || 0) / sum;
                }
            } else {
                left += extraHorizontalSpace / 2;
            }
        }
        var xs: number[] = [ left ];
        for (var i: number = 0; i < widths.length; i++) {
            xs[i + 1] = xs[i] + (widths[i] || 0) + hgap;
        }
        var top: number = container.getInsetTop();
        var heights: number[] = preferredHeights.slice();
        var extraVerticalSpace: number = Math.max(containerHeight - preferredLayoutHeight, 0);
        if (extraVerticalSpace) {
            var sum: number = 0;
            for (var i: number = 0; i < weightys.length; i++) {
                sum += weightys[i] || 0;
            }
            if (sum) {
                for (var i: number = 0; i < heights.length; i++) {
                    heights[i] = (heights[i] || 0) + extraVerticalSpace * (weightys[i] || 0) / sum;
                }
            } else {
                top +=  extraVerticalSpace / 2;
            }
        }
        var ys: number[] = [ top ];
        for (var i: number = 0; i < heights.length; i++) {
            ys[i + 1] = ys[i] + (heights[i] || 0) + vgap;
        }
        var components: JSComponent[] = container.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints: { gridx?: number; gridy?: number; gridwidth?: number; gridheight?: number; fill?: string; anchor?: string } = <{ gridx?: number; gridy?: number; gridwidth?: number; gridheight?: number; fill?: string; anchor?: string }> component.getConstraints() || {};
            var gridx: number = constraints.gridx || 0;
            var gridy: number = constraints.gridy || 0;
            var gridwidth: number = constraints.gridwidth || 1;
            var gridheight: number = constraints.gridheight || 1;
            var fill: string = constraints.fill;
            var anchor: string = constraints.anchor;
            switch (fill) {
            case JSGridBagLayout.BOTH:
                component.setX(xs[gridx]);
                component.setY(ys[gridy]);
                component.setOuterWidth(xs[gridx + gridwidth] - hgap - xs[gridx]);
                component.setOuterHeight(ys[gridy + gridheight] - vgap - ys[gridy]);
                break;
            case JSGridBagLayout.HORIZONTAL:
                component.setOuterWidth(xs[gridx + gridwidth] - hgap - xs[gridx]);
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                component.setOuterHeight(componentPreferredOuterHeight);
                component.setX(xs[gridx]);
                switch (anchor) {
                case JSGridBagLayout.NORTH:
                    component.setY(ys[gridy]);
                    break;
                case JSGridBagLayout.SOUTH:
                    component.setY(ys[gridy + gridheight] - vgap - componentPreferredOuterHeight);
                    break;
                case JSGridBagLayout.CENTER:
                default:
                    component.setY(ys[gridy] + (ys[gridy + gridheight] - vgap - ys[gridy] - componentPreferredOuterHeight) / 2);
                }
                break;
            case JSGridBagLayout.VERTICAL:
                component.setOuterHeight(ys[gridy + gridheight] - vgap - ys[gridy]);
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                component.setOuterWidth(componentPreferredOuterWidth);
                component.setY(ys[gridy]);
                switch (anchor) {
                case JSGridBagLayout.WEST:
                    component.setX(xs[gridx]);
                    break;
                case JSGridBagLayout.EAST:
                    component.setX(xs[gridx + gridwidth] - hgap - componentPreferredOuterWidth);
                    break;
                case JSGridBagLayout.CENTER:
                default:
                    component.setX(xs[gridx] + (xs[gridx + gridwidth] - hgap - xs[gridx] - componentPreferredOuterWidth) / 2);
                }
                break;
            case JSGridBagLayout.NONE:
            default:
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                component.setOuterWidth(componentPreferredOuterWidth);
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                component.setOuterHeight(componentPreferredOuterHeight);
                switch (anchor) {
                case JSGridBagLayout.WEST:
                case JSGridBagLayout.NORTHWEST:
                case JSGridBagLayout.SOUTHWEST:
                    component.setX(xs[gridx]);
                    break;
                case JSGridBagLayout.EAST:
                case JSGridBagLayout.NORTHEAST:
                case JSGridBagLayout.SOUTHEAST:
                    component.setX(xs[gridx + gridwidth] - hgap - componentPreferredOuterWidth);
                    break;
                case JSGridBagLayout.CENTER:
                default:
                    component.setX(xs[gridx] + (xs[gridx + gridwidth] - hgap - xs[gridx] - componentPreferredOuterWidth) / 2);
                }
                switch (anchor) {
                case JSGridBagLayout.NORTH:
                case JSGridBagLayout.NORTHWEST:
                case JSGridBagLayout.NORTHEAST:
                    component.setY(ys[gridy]);
                    break;
                case JSGridBagLayout.SOUTH:
                case JSGridBagLayout.SOUTHWEST:
                case JSGridBagLayout.SOUTHEAST:
                    component.setY(ys[gridy + gridheight] - vgap - componentPreferredOuterHeight);
                    break;
                case JSGridBagLayout.CENTER:
                default:
                    component.setY(ys[gridy] + (ys[gridy + gridheight] - vgap - ys[gridy] - componentPreferredOuterHeight) / 2);
                }
            }
        }
        this.setPreferredWidths(null);
        this.setPreferredHeights(null);
    }
}