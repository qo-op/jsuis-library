/// <reference path = "../jsuis.ts"/>
/**
 * JSScrollPaneLayout
 * 
 * @author Yassuo Toda
 */
class JSScrollPaneLayout extends JSLayout {
    
    addLayoutComponent(component: JSComponent): void {
    }
    
    preferredLayoutWidth(container: JSComponent): number {
        var view: JSComponent = (<JSScrollPane> container).getViewportView();
        if (view) {
            return view.getPreferredOuterWidth();
        } else {
            return 0;
        }
    }
    
    preferredLayoutHeight(container: JSComponent): number {
        var view: JSComponent = (<JSScrollPane> container).getViewportView();
        if (view) {
            return view.getPreferredOuterHeight();
        } else {
            return 0;
        }
    }
    
    layoutContainerHorizontally(container: JSComponent): void {
        if (container.isValidHorizontally()) {
            return;
        }
        var width: number = container.getContentWidth();
        var view: JSComponent = (<JSScrollPane> container).getViewportView();
        if (view) {
            view.setOuterWidth(width);
        }
        container.setValidHorizontally(true);
    }
    
    layoutContainerVertically(container: JSComponent): void {
        if (container.isValidVertically()) {
            return;
        }
        var height: number = container.getContentHeight();
        var view: JSComponent = (<JSScrollPane> container).getViewportView();
        if (view) {
            view.setOuterHeight(height);
        }
        container.setValidVertically(true);
    }
}
