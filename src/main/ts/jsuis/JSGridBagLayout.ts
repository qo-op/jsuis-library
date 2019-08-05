/// <reference path = "../jsuis.ts"/>
/**
 * JSGridBagLayout
 * 
 * @author Yassuo Toda
 */
class JSGridBagLayout extends JSLayout {
    
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
        var width: number = container.getContentWidth();
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
        var widthsPx: number[] = [];
        var weightxs: number[] = [];
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
            var constraints: { gridx?: number; gridy?: number; gridwidth?: number; gridheight?: number; fill?: string; anchor?: string; weightx?: number; weighty?: number } = <{ gridx?: number; gridy?: number; gridwidth?: number; gridheight?: number; fill?: string; anchor?: string; weightx?: number; weighty?: number }> component.getConstraints() || {};
            var gridx: number = constraints.gridx || 0;
            var gridwidth: number = constraints.gridwidth || 1;
            if (gridwidth === 1) {
                widthsPx[gridx] = Math.max(widthsPx[gridx] || 0, componentPreferredOuterWidth);
            } else {
                widthsPx[gridx + gridwidth - 1] = Math.max(
                    widthsPx[gridx + gridwidth - 1] || 0,
                    componentPreferredOuterWidth - (widthsPx[gridx + gridwidth - 2] || 0));
            }
            var weightx: number = (constraints.weightx || 0) / gridwidth;
            for (var j: number = 0; j < gridwidth; j++) {
                weightxs[gridx + j] = Math.max(weightxs[gridx + j] || 0, weightx);
            }
        }
        var hgap: number = this.getHgap();
        for (var i: number = 0; i < widthsPx.length; i++) {
            preferredLayoutWidth += (widthsPx[i] || 0) + hgap;
        }
        if (preferredLayoutWidth != 0) {
            preferredLayoutWidth -= hgap;
        }
        if (width) {
            var extraHorizontalSpace: number = width - preferredLayoutWidth;
            if (extraHorizontalSpace) {
                var sum: number = 0;
                for (var i: number = 0; i < weightxs.length; i++) {
                    sum += weightxs[i] || 0;
                }
                if (sum) {
                    preferredLayoutWidth = Math.max(preferredLayoutWidth, width);
                }
            }
        }
        return preferredLayoutWidth;
    }
    
    preferredLayoutHeight(container: JSComponent): number {
        var preferredLayoutHeight: number = 0;
        var height: number = container.getContentHeight();
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
        var heightsPx: number[] = [];
        var weightys: number[] = [];
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
            var constraints: { gridx?: number; gridy?: number; gridwidth?: number; gridheight?: number; fill?: string; anchor?: string; weightx?: number; weighty?: number } = <{ gridx?: number; gridy?: number; gridwidth?: number; gridheight?: number; fill?: string; anchor?: string; weightx?: number; weighty?: number }> component.getConstraints() || {};
            var gridy: number = constraints.gridy || 0;
            var gridheight: number = constraints.gridheight || 1;
            if (gridheight === 1) {
                heightsPx[gridy] = Math.max(heightsPx[gridy] || 0, componentPreferredOuterHeight);
            } else {
                heightsPx[gridy + gridheight - 1] = Math.max(
                    heightsPx[gridy + gridheight - 1] || 0,
                    componentPreferredOuterHeight - (heightsPx[gridy + gridheight - 2] || 0));
            }
            var weighty: number = (constraints.weighty || 0) / gridheight;
            for (var j: number = 0; j < gridheight; j++) {
                weightys[gridy + j] = Math.max(weightys[gridy + j] || 0, weighty);
            }
        }
        var vgap: number = this.getVgap();
        for (var i: number = 0; i < heightsPx.length; i++) {
            preferredLayoutHeight += (heightsPx[i] || 0) + vgap;
        }
        if (preferredLayoutHeight != 0) {
            preferredLayoutHeight -= vgap;
        }
        if (height) {
            var extraVerticalSpace: number = height - preferredLayoutHeight;
            if (extraVerticalSpace) {
                var sum: number = 0;
                for (var i: number = 0; i < weightys.length; i++) {
                    sum += weightys[i] || 0;
                }
                if (sum) {
                    preferredLayoutHeight = Math.max(preferredLayoutHeight, height);
                }
            }
        }
        return preferredLayoutHeight;
    }
    
    layoutContainerHorizontally(container: JSComponent): void {
        if (container.isValidHorizontally()) {
            return;
        }
        var preferredLayoutWidth: number = 0;
        var width: number = container.getContentWidth();
        var width100: number = width + container.getPaddingLeft() + container.getPaddingRight();
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
        var widthsPx: number[] = [];
        var widthsPc: number[] = [];
        var weightxs: number[] = [];
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
            if (componentPreferredOuterWidth === null) {
                return;
            }
            var constraints: { gridx?: number; gridy?: number; gridwidth?: number; gridheight?: number; fill?: string; anchor?: string; weightx?: number; weighty?: number } = <{ gridx?: number; gridy?: number; gridwidth?: number; gridheight?: number; fill?: string; anchor?: string; weightx?: number; weighty?: number }> component.getConstraints() || {};
            var gridx: number = constraints.gridx || 0;
            var gridwidth: number = constraints.gridwidth || 1;
            if (gridwidth === 1) {
                widthsPx[gridx] = Math.max(widthsPx[gridx] || 0, componentPreferredOuterWidth);
            } else {
                widthsPx[gridx + gridwidth - 1] = Math.max(
                    widthsPx[gridx + gridwidth - 1] || 0,
                    componentPreferredOuterWidth - (widthsPx[gridx + gridwidth - 2] || 0));
            }
            var weightx: number = (constraints.weightx || 0) / gridwidth;
            for (var j: number = 0; j < gridwidth; j++) {
                weightxs[gridx + j] = Math.max(weightxs[gridx + j] || 0, weightx);
            }
        }
        var hgap: number = this.getHgap();
        for (var i: number = 0; i < widthsPx.length; i++) {
            preferredLayoutWidth += (widthsPx[i] || 0) + hgap;
        }
        if (preferredLayoutWidth != 0) {
            preferredLayoutWidth -= hgap;
        }
        if (width) {
            var extraHorizontalSpace: number = width - preferredLayoutWidth;
            if (extraHorizontalSpace) {
                var sum: number = 0;
                for (var i: number = 0; i < weightxs.length; i++) {
                    sum += weightxs[i] || 0;
                }
                if (sum) {
                    for (var i: number = 0; i < widthsPx.length; i++) {
                        widthsPx[i] = (widthsPx[i] || 0) + extraHorizontalSpace * (weightxs[i] || 0) / sum - width100 * (weightxs[i] || 0) / sum;
                        widthsPc[i] = 100 * (weightxs[i] || 0) / sum;
                    }
                    preferredLayoutWidth = Math.max(preferredLayoutWidth, width);
                }
            }
        }
        
        var xsPx: number[] = [ container.getInsetLeft() ];
        var xsPc: number[] = [ 0 ];
        var extraHorizontalSpace: number = width - preferredLayoutWidth;
        if (extraHorizontalSpace) {
            var sum: number = 0;
            for (var i: number = 0; i < weightxs.length; i++) {
                sum += weightxs[i] || 0;
            }
            if (!sum) {
                xsPx[0] = container.getInsetLeft() + extraHorizontalSpace / 2 - width100 / 2;
                xsPc[0] = 50;
            }
        }
        for (var i: number = 0; i < widthsPx.length; i++) {
            xsPx[i + 1] = xsPx[i] + (widthsPx[i] || 0) + hgap;
            xsPc[i + 1] = xsPc[i] + (widthsPc[i] || 0);
        }
        components = container.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints: { gridx?: number; gridy?: number; gridwidth?: number; gridheight?: number; fill?: string; anchor?: string; weightx?: number; weighty?: number } = <{ gridx?: number; gridy?: number; gridwidth?: number; gridheight?: number; fill?: string; anchor?: string; weightx?: number; weighty?: number }> component.getConstraints() || {};
            var gridx: number = constraints.gridx || 0;
            var gridwidth: number = constraints.gridwidth || 1;
            var fill: string = constraints.fill;
            var anchor: string = constraints.anchor;
            switch (fill) {
            case JSGridBagLayout.BOTH:
                component.setOuterWidth(xsPx[gridx + gridwidth] - xsPx[gridx] - hgap + (xsPc[gridx + gridwidth] - xsPc[gridx]) * width100 / 100);
                component.setX(xsPx[gridx] + xsPc[gridx] * width100 / 100);
                break;
            case JSGridBagLayout.HORIZONTAL:
                component.setOuterWidth(xsPx[gridx + gridwidth] - xsPx[gridx] - hgap + (xsPc[gridx + gridwidth] - xsPc[gridx]) * width100 / 100);
                component.setX(xsPx[gridx] + xsPc[gridx] * width100 / 100);
                break;
            case JSGridBagLayout.VERTICAL:
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                if (componentPreferredOuterWidth === null) {
                    return;
                }
                component.setOuterWidth(componentPreferredOuterWidth);
                switch (anchor) {
                case JSGridBagLayout.WEST:
                    component.setX(xsPx[gridx] + xsPc[gridx] * width100 / 100);
                    break;
                case JSGridBagLayout.EAST:
                    var xPx = xsPx[gridx + gridwidth] - hgap - componentPreferredOuterWidth;
                    component.setX(xPx + xsPc[gridx + gridwidth] * width100 / 100);
                    break;
                case JSGridBagLayout.CENTER:
                default:
                    var xPc = xsPc[gridx] + (xsPc[gridx + gridwidth] - xsPc[gridx]) / 2;
                    var xPx = xsPx[gridx] + (xsPx[gridx + gridwidth] - xsPx[gridx] - hgap - componentPreferredOuterWidth) / 2;
                    component.setX(xPx + xPc * width100 / 100);
                }
                break;
            case JSGridBagLayout.NONE:
            default:
                var componentPreferredOuterWidth: number = component.getPreferredOuterWidth();
                if (componentPreferredOuterWidth === null) {
                    return;
                }
                component.setOuterWidth(componentPreferredOuterWidth);
                switch (anchor) {
                case JSGridBagLayout.WEST:
                case JSGridBagLayout.NORTHWEST:
                case JSGridBagLayout.SOUTHWEST:
                    component.setX(xsPx[gridx] + xsPc[gridx] * width100 / 100);
                    break;
                case JSGridBagLayout.EAST:
                case JSGridBagLayout.NORTHEAST:
                case JSGridBagLayout.SOUTHEAST:
                    var xPx = xsPx[gridx + gridwidth] - hgap - componentPreferredOuterWidth;
                    component.setX(xPx + xsPc[gridx + gridwidth] * width100 / 100);
                    break;
                case JSGridBagLayout.CENTER:
                default:
                    var xPc = xsPc[gridx] + (xsPc[gridx + gridwidth] - xsPc[gridx]) / 2;
                    var xPx = xsPx[gridx] + (xsPx[gridx + gridwidth] - xsPx[gridx] - hgap - componentPreferredOuterWidth) / 2;
                    component.setX(xPx + xPc * width100 / 100);
                }
            }
        }
        container.setValidHorizontally(true);
    }
    
    layoutContainerVertically(container: JSComponent): void {
        if (container.isValidVertically()) {
            return;
        }
        if (!container.isValidHorizontally()) {
            return;
        }
        var preferredLayoutHeight: number = 0;
        var height: number = container.getContentHeight();
        var height100: number = height + container.getPaddingTop() + container.getPaddingBottom();
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
        var heightsPx: number[] = [];
        var heightsPc: number[] = [];
        var weightys: number[] = [];
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
            if (componentPreferredOuterHeight === null) {
                return;
            }
            var constraints: { gridx?: number; gridy?: number; gridwidth?: number; gridheight?: number; fill?: string; anchor?: string; weightx?: number; weighty?: number } = <{ gridx?: number; gridy?: number; gridwidth?: number; gridheight?: number; fill?: string; anchor?: string; weightx?: number; weighty?: number }> component.getConstraints() || {};
            var gridy: number = constraints.gridy || 0;
            var gridheight: number = constraints.gridheight || 1;
            if (gridheight === 1) {
                heightsPx[gridy] = Math.max(heightsPx[gridy] || 0, componentPreferredOuterHeight);
            } else {
                heightsPx[gridy + gridheight - 1] = Math.max(
                    heightsPx[gridy + gridheight - 1] || 0,
                    componentPreferredOuterHeight - (heightsPx[gridy + gridheight - 2] || 0));
            }
            var weighty: number = (constraints.weighty || 0) / gridheight;
            for (var j: number = 0; j < gridheight; j++) {
                weightys[gridy + j] = Math.max(weightys[gridy + j] || 0, weighty);
            }
        }
        var vgap: number = this.getVgap();
        for (var i: number = 0; i < heightsPx.length; i++) {
            preferredLayoutHeight += (heightsPx[i] || 0) + vgap;
        }
        if (preferredLayoutHeight != 0) {
            preferredLayoutHeight -= vgap;
        }
        if (height) {
            var extraVerticalSpace: number = height - preferredLayoutHeight;
            if (extraVerticalSpace) {
                var sum: number = 0;
                for (var i: number = 0; i < weightys.length; i++) {
                    sum += weightys[i] || 0;
                }
                if (sum) {
                    for (var i: number = 0; i < heightsPx.length; i++) {
                        heightsPx[i] = (heightsPx[i] || 0) + extraVerticalSpace * (weightys[i] || 0) / sum - height100 * (weightys[i] || 0) / sum;
                        heightsPc[i] = 100 * (weightys[i] || 0) / sum;
                    }
                    preferredLayoutHeight = Math.max(preferredLayoutHeight, height);
                }
            }
        }
        
        var ysPx: number[] = [ container.getInsetTop() ];
        var ysPc: number[] = [ 0 ];
        var extraVerticalSpace: number = height - preferredLayoutHeight;
        if (extraVerticalSpace) {
            var sum: number = 0;
            for (var i: number = 0; i < weightys.length; i++) {
                sum += weightys[i] || 0;
            }
            if (!sum) {
                ysPx[0] = container.getInsetTop() + extraVerticalSpace / 2 - height100 / 2;
                ysPc[0] = 50;
            }
        }
        for (var i: number = 0; i < heightsPx.length; i++) {
            ysPx[i + 1] = ysPx[i] + (heightsPx[i] || 0) + vgap;
            ysPc[i + 1] = ysPc[i] + (heightsPc[i] || 0);
        }
        
        components = container.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            var constraints: { gridx?: number; gridy?: number; gridwidth?: number; gridheight?: number; fill?: string; anchor?: string; weightx?: number; weighty?: number } = <{ gridx?: number; gridy?: number; gridwidth?: number; gridheight?: number; fill?: string; anchor?: string; weightx?: number; weighty?: number }> component.getConstraints() || {};
            var gridy: number = constraints.gridy || 0;
            var gridheight: number = constraints.gridheight || 1;
            var fill: string = constraints.fill;
            var anchor: string = constraints.anchor;
            switch (fill) {
            case JSGridBagLayout.BOTH:
                component.setOuterHeight(ysPx[gridy + gridheight] - ysPx[gridy] - vgap + (ysPc[gridy + gridheight] - ysPc[gridy]) * height100 / 100);
                component.setY(ysPx[gridy] + ysPc[gridy] * height100 / 100);
                break;
            case JSGridBagLayout.HORIZONTAL:
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (componentPreferredOuterHeight === null) {
                    return;
                }
                component.setOuterHeight(componentPreferredOuterHeight);
                switch (anchor) {
                case JSGridBagLayout.NORTH:
                    component.setY(ysPx[gridy] + ysPc[gridy] * height100 / 100);
                    break;
                case JSGridBagLayout.SOUTH:
                    var yPx = ysPx[gridy + gridheight] - vgap - componentPreferredOuterHeight;
                    component.setY(yPx + ysPc[gridy + gridheight] * height100 / 100);
                    break;
                case JSGridBagLayout.CENTER:
                default:
                    var yPc = ysPc[gridy] + (ysPc[gridy + gridheight] - ysPc[gridy]) / 2;
                    var yPx = ysPx[gridy] + (ysPx[gridy + gridheight] - ysPx[gridy] - vgap - componentPreferredOuterHeight) / 2;
                    component.setY(yPx + yPc * height100 / 100);
                }
                break;
            case JSGridBagLayout.VERTICAL:
                component.setOuterHeight(ysPx[gridy + gridheight] - ysPx[gridy] - vgap + (ysPc[gridy + gridheight] - ysPc[gridy]) * height100 / 100);
                component.setY(ysPx[gridy] + ysPc[gridy] * height100 / 100);
                break;
            case JSGridBagLayout.NONE:
            default:
                var componentPreferredOuterHeight: number = component.getPreferredOuterHeight();
                if (componentPreferredOuterHeight === null) {
                    return;
                }
                component.setOuterHeight(componentPreferredOuterHeight);
                switch (anchor) {
                case JSGridBagLayout.NORTH:
                case JSGridBagLayout.NORTHWEST:
                case JSGridBagLayout.NORTHEAST:
                    component.setY(ysPx[gridy] + ysPc[gridy] * height100 / 100);
                    break;
                case JSGridBagLayout.SOUTH:
                case JSGridBagLayout.SOUTHWEST:
                case JSGridBagLayout.SOUTHEAST:
                    var yPx = ysPx[gridy + gridheight] - vgap - componentPreferredOuterHeight;
                    component.setY(yPx + ysPc[gridy + gridheight] * height100 / 100);
                    break;
                case JSGridBagLayout.CENTER:
                default:
                    var yPc = ysPc[gridy] + (ysPc[gridy + gridheight] - ysPc[gridy]) / 2;
                    var yPx = ysPx[gridy] + (ysPx[gridy + gridheight] - ysPx[gridy] - vgap - componentPreferredOuterHeight) / 2;
                    component.setY(yPx + yPc * height100 / 100);
                }
            }
        }
        container.setValidVertically(true);
    }
}