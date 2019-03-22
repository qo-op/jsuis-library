/// <reference path = "../jsuis.ts"/>
class JSPopupMenuLayout extends JSLayout {
    
    hgap: number = 8;
    preferredWidths: number[];
    
    getHgap(): number {
        return this.hgap;
    }
    setHgap(hgap: number) {
        this.hgap = hgap;
    }
    getPreferredWidths(): number[] {
        return this.preferredWidths;
    }
    setPreferredWidths(preferredWidths: number[]) {
        this.preferredWidths = preferredWidths;
    }
    preferredLayoutWidth(container: JSComponent): number {
        var preferredLayoutWidth: number = 0;
        var hgap = this.getHgap();
        var preferredWidths: number[] = [];
        this.setPreferredWidths(preferredWidths);
        var components: JSComponent[] = container.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (component instanceof JSMenu || component instanceof JSMenuItem) {
                var icon: JSComponent = component.getIcon();
                if (icon) {
                    var iconPreferredWidth: number = icon.getPreferredWidth();
                    preferredWidths[0] = Math.max(preferredWidths[0] || 0, iconPreferredWidth);
                }
                var label: JSLabel = component.getLabel();
                if (label) {
                    var labelPreferredWidth: number = label.getPreferredWidth();
                    if (component instanceof JSMenu) {
                        var expandIcon: JSPathIcon = component.getExpandIcon();
                        if (expandIcon) {
                            var expandIconPreferredWidth = expandIcon.getPreferredWidth();
                            labelPreferredWidth += hgap / 2 + expandIconPreferredWidth;
                        }
                    }
                    preferredWidths[1] = Math.max(preferredWidths[1] || 0, labelPreferredWidth);
                }
            }
        }
        for (var i: number = 0; i < preferredWidths.length; i++) {
            if (preferredWidths[i]) {
                preferredLayoutWidth += preferredWidths[i] + hgap;
            }
        }
        if (preferredLayoutWidth != 0) {
            preferredLayoutWidth -= hgap;
        }
        return hgap + preferredLayoutWidth + hgap;
    }
    layoutContainer(container: JSComponent): void {
        var hgap: number = this.getHgap();
        var preferredWidths: number[] = this.getPreferredWidths();
        var preferredLayoutWidth: number = 0;
        if (preferredWidths && preferredWidths.length) {
            for (var i: number = 0; i < preferredWidths.length; i++) {
                if (preferredWidths[i]) {
                    preferredLayoutWidth += preferredWidths[i] + hgap;
                }
            }
            if (preferredLayoutWidth != 0) {
                preferredLayoutWidth -= hgap;
            }
            preferredLayoutWidth = hgap + preferredLayoutWidth + hgap;
        } else {
            preferredLayoutWidth = this.preferredLayoutWidth(container);
            preferredWidths = this.getPreferredWidths();
        }
        container.setWidth(preferredLayoutWidth);
        var xs: number[] = [ hgap ];
        for (var i: number = 0; i < preferredWidths.length; i++) {
            if (preferredWidths[i]) {
                xs[i + 1] = xs[i] + preferredWidths[i] + hgap;
            } else {
                xs[i + 1] = xs[i];
            }
        }
        var components: JSComponent[] = container.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (component instanceof JSMenu || component instanceof JSMenuItem) {
                var x: number = 0;
                var icon: JSComponent = component.getIcon();
                if (icon) {
                    var iconPreferredWidth = icon.getPreferredWidth();
                    x = xs[0] + (xs[1] - hgap - xs[0] - iconPreferredWidth) / 2;
                    icon.setStyle("margin-left", x + "px");
                    x += iconPreferredWidth;
                }
                var label: JSLabel = component.getLabel();
                if (label) {
                    var labelPreferredWidth = label.getPreferredWidth();
                    if (icon) {
                        label.setStyle("margin-left", (xs[1] - x) + "px");
                    } else {
                        label.setStyle("margin-left", xs[1] + "px");
                    }
                    x = xs[1] + labelPreferredWidth;
                }
                if (component instanceof JSMenu) {
                    var expandIcon: JSPathIcon = component.getExpandIcon();
                    if (expandIcon) {
                        var expandIconPreferredWidth = expandIcon.getPreferredWidth();
                        expandIcon.setStyle("margin-left", (preferredLayoutWidth - hgap / 2 - expandIconPreferredWidth - x) + "px");
                    }
                }
            }
        }
        this.setPreferredWidths(null);
    }
}