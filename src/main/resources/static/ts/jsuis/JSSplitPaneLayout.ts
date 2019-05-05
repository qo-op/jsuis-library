/**
 * JSSplitPaneLayout
 * 
 * @author Yassuo Toda
 */
class JSSplitPaneLayout extends JSLayout {
    
    addLayoutComponent(component: JSComponent): void {
        component.setStyle("position", "absolute");
    }
    preferredLayoutWidth(splitPane: JSSplitPane): number {
        var orientation: string = splitPane.getOrientation();
        var leftContainer: JSPanel = splitPane.getLeftContainer();
        var rightContainer: JSPanel = splitPane.getRightContainer();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            return Math.max(leftContainer.getPreferredOuterWidth(), rightContainer.getPreferredOuterWidth());
        } else {
            return leftContainer.getPreferredOuterWidth() + splitPane.getDividerSize() + rightContainer.getPreferredOuterWidth();
        }
    }
    preferredLayoutHeight(splitPane: JSSplitPane): number {
        var orientation: string = splitPane.getOrientation();
        var leftContainer: JSPanel = splitPane.getLeftContainer();
        var rightContainer: JSPanel = splitPane.getRightContainer();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            return leftContainer.getPreferredOuterHeight() + splitPane.getDividerSize() + rightContainer.getPreferredOuterHeight();
        } else {
            return Math.max(leftContainer.getPreferredOuterHeight(), rightContainer.getPreferredOuterHeight());
        }
    }
    layoutContainer(splitPane: JSSplitPane): void {
        var width: number = splitPane.getWidth();
        var height: number = splitPane.getHeight();
        var width100: number = width + splitPane.getPaddingLeft() + splitPane.getPaddingRight();
        var height100: number = height + splitPane.getPaddingTop() + splitPane.getPaddingBottom();
        var x: number = splitPane.getInsetLeft();
        var y: number = splitPane.getInsetTop();
        var orientation: string = splitPane.getOrientation();
        var leftContainer: JSPanel = splitPane.getLeftContainer();
        var rightContainer: JSPanel = splitPane.getRightContainer();
        var divider: JSPanel = splitPane.getDivider();
        var dividerSize: number = splitPane.getDividerSize();
        var dividerLocation: number = splitPane.getDividerLocation();
        var dividerProportionalLocation: number = splitPane.getDividerProportionalLocation();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            // leftContainer.setOuterWidth(width);
            leftContainer.setOuterWidth(width - width100, 100);
            // rightContainer.setOuterWidth(width);
            rightContainer.setOuterWidth(width - width100, 100);
            // divider.setOuterWidth(width);
            divider.setOuterWidth(width - width100, 100);
            leftContainer.setX(x);
            rightContainer.setX(x);
            divider.setX(x);
            leftContainer.setY(y);
            divider.setOuterHeight(dividerSize);
            if (dividerLocation === -1) {
                if (dividerProportionalLocation !== -1) {
                    dividerLocation = (splitPane.getMaximumDividerLocation() - splitPane.getMinimumDividerLocation()) * dividerProportionalLocation;
                } else {
                    dividerLocation = leftContainer.getPreferredOuterHeight();
                }
            }
        } else {
            // leftContainer.setOuterHeight(height);
            leftContainer.setOuterHeight(height - height100, 100);
            // rightContainer.setOuterHeight(height);
            rightContainer.setOuterHeight(height - height100, 100);
            // divider.setOuterHeight(height);
            divider.setOuterHeight(height - height100, 100);
            leftContainer.setY(y);
            rightContainer.setY(y);
            divider.setY(y);
            leftContainer.setX(x);
            divider.setOuterWidth(dividerSize);
            if (dividerLocation === -1) {
                if (dividerProportionalLocation !== -1) {
                    dividerLocation = (splitPane.getMaximumDividerLocation() - splitPane.getMinimumDividerLocation()) * dividerProportionalLocation;
                } else {
                    dividerLocation = leftContainer.getPreferredOuterWidth();
                }
            }
        }
        splitPane._setDividerLocation(dividerLocation);
    }
}