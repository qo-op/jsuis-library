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
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            var leftContainer: JSPanel = splitPane.getLeftContainer();
            leftContainer.setOuterWidth(width); // 100%
            leftContainer.setX(x);
            leftContainer.setY(y);
            var divider: JSPanel = splitPane.getDivider();
            var dividerSize: number = splitPane.getDividerSize();
            divider.setOuterHeight(dividerSize);
            divider.setOuterWidth(width); // 100%
            divider.setX(x);
            var rightContainer: JSPanel = splitPane.getRightContainer();
            rightContainer.setOuterWidth(width); // 100%
            rightContainer.setX(x);
        } else {
            var leftContainer: JSPanel = splitPane.getLeftContainer();
            leftContainer.setOuterHeight(height); // 100%
            leftContainer.setX(x);
            leftContainer.setY(y);
            var divider: JSPanel = splitPane.getDivider();
            var dividerSize: number = splitPane.getDividerSize();
            divider.setOuterWidth(dividerSize);
            divider.setOuterHeight(height); // 100%
            divider.setY(y);
            var rightContainer: JSPanel = splitPane.getRightContainer();
            rightContainer.setOuterHeight(height); // 100%
            rightContainer.setY(y);
        }
        
        var dividerLocation: number = splitPane.getDividerLocation() || 0;
        var dividerProportionalLocation: number = splitPane.getDividerProportionalLocation() || 0;
        
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            dividerLocation += dividerProportionalLocation * height100;
            var leftContainer: JSSplitPaneLeftContainer = splitPane.getLeftContainer();
            leftContainer.setOuterHeight(dividerLocation - splitPane.getPaddingTop());
            var divider: JSSplitPaneDivider = splitPane.getDivider();
            divider.setY(dividerLocation);
            var rightContainer: JSSplitPaneRightContainer = splitPane.getRightContainer();
            var dividerSize: number = splitPane.getDividerSize();
            rightContainer.setOuterHeight(height - dividerSize - dividerLocation + splitPane.getPaddingTop()); // 100%
            rightContainer.setY(dividerLocation + dividerSize);
        } else {
            dividerLocation += dividerProportionalLocation * width100;
            var leftContainer: JSSplitPaneLeftContainer = splitPane.getLeftContainer();
            leftContainer.setOuterWidth(dividerLocation - splitPane.getPaddingLeft());
            var divider: JSSplitPaneDivider = splitPane.getDivider();
            divider.setX(dividerLocation);
            var rightContainer: JSSplitPaneRightContainer = splitPane.getRightContainer();
            var dividerSize: number = splitPane.getDividerSize();
            rightContainer.setOuterWidth(width - dividerSize - dividerLocation + splitPane.getPaddingLeft()); // 100%
            rightContainer.setX(dividerLocation + dividerSize);
        }
    }
}