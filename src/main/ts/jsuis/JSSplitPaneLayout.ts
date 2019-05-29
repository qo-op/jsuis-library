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
        var leftContainerPreferredOuterWidth: number = leftContainer.getPreferredOuterWidth();
        if (leftContainerPreferredOuterWidth === null) {
            return null;
        }
        var rightContainerPreferredOuterWidth: number = rightContainer.getPreferredOuterWidth();
        if (rightContainerPreferredOuterWidth === null) {
            return null;
        }
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            return Math.max(leftContainerPreferredOuterWidth, rightContainer.getPreferredOuterWidth());
        } else {
            return leftContainerPreferredOuterWidth + splitPane.getDividerSize() + rightContainerPreferredOuterWidth;
        }
    }
    
    preferredLayoutHeight(splitPane: JSSplitPane): number {
        var orientation: string = splitPane.getOrientation();
        var leftContainer: JSPanel = splitPane.getLeftContainer();
        var rightContainer: JSPanel = splitPane.getRightContainer();
        var leftContainerPreferredOuterHeight: number = leftContainer.getPreferredOuterHeight();
        if (leftContainerPreferredOuterHeight === null) {
            return null;
        }
        var rightContainerPreferredOuterHeight: number = rightContainer.getPreferredOuterHeight();
        if (rightContainerPreferredOuterHeight === null) {
            return null;
        }
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            return leftContainerPreferredOuterHeight + splitPane.getDividerSize() + rightContainerPreferredOuterHeight;
        } else {
            return Math.max(leftContainerPreferredOuterHeight, rightContainerPreferredOuterHeight);
        }
    }
    
    layoutContainerHorizontally(splitPane: JSSplitPane): void {
        if (splitPane.isValidHorizontally()) {
            return;
        }
        var width: number = splitPane.getWidth();
        var width100: number = width + splitPane.getPaddingLeft() + splitPane.getPaddingRight();
        var x: number = splitPane.getInsetLeft();
        var leftContainer: JSSplitPaneLeftContainer = splitPane.getLeftContainer();
        var divider: JSSplitPaneDivider = splitPane.getDivider();
        var dividerSize: number = splitPane.getDividerSize();
        var rightContainer: JSSplitPaneRightContainer = splitPane.getRightContainer();
        var orientation: string = splitPane.getOrientation();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            leftContainer.setOuterWidth(width); // 100%
            divider.setOuterWidth(width); // 100%
            rightContainer.setOuterWidth(width); // 100%
            leftContainer.setX(x);
            divider.setX(x);
            rightContainer.setX(x);
        } else {
            var dividerLocation: number = splitPane.getDividerLocation() || 0;
            var dividerProportionalLocation: number = splitPane.getDividerProportionalLocation() || 0;
            dividerLocation += dividerProportionalLocation * width100;
            leftContainer.setOuterWidth(dividerLocation - x);
            leftContainer.setX(x);
            divider.setOuterWidth(dividerSize);
            divider.setX(dividerLocation);
            rightContainer.setOuterWidth(width - (dividerLocation - x) - dividerSize); // 100%
            rightContainer.setX(dividerLocation + dividerSize);
        }
        splitPane.setValidHorizontally(true);
    }
    
    layoutContainerVertically(splitPane: JSSplitPane): void {
        if (splitPane.isValidVertically()) {
            return;
        }
        var height: number = splitPane.getHeight();
        var height100: number = height + splitPane.getPaddingTop() + splitPane.getPaddingBottom();
        var y: number = splitPane.getInsetTop();
        var leftContainer: JSSplitPaneLeftContainer = splitPane.getLeftContainer();
        var divider: JSSplitPaneDivider = splitPane.getDivider();
        var dividerSize: number = splitPane.getDividerSize();
        var rightContainer: JSSplitPaneRightContainer = splitPane.getRightContainer();
        var orientation: string = splitPane.getOrientation();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            var dividerLocation: number = splitPane.getDividerLocation() || 0;
            var dividerProportionalLocation: number = splitPane.getDividerProportionalLocation() || 0;
            dividerLocation += dividerProportionalLocation * height100;
            leftContainer.setOuterHeight(dividerLocation - y);
            leftContainer.setY(y);
            divider.setOuterHeight(dividerSize);
            divider.setY(dividerLocation);
            rightContainer.setOuterHeight(height - (dividerSize - y) - dividerLocation); // 100%
            rightContainer.setY(dividerLocation + dividerSize);
        } else {
            leftContainer.setOuterHeight(height); // 100%
            divider.setOuterHeight(height); // 100%
            rightContainer.setOuterHeight(height); // 100%
            leftContainer.setY(y);
            divider.setY(y);
            rightContainer.setY(y);
        }
        splitPane.setValidVertically(true);
    }
}