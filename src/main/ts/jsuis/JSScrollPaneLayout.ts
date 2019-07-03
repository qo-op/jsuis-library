/// <reference path = "../jsuis.ts"/>
/**
 * JSScrollPaneLayout
 * 
 * @author Yassuo Toda
 */
class JSScrollPaneLayout extends JSLayout {
    
    addLayoutComponent(component: JSComponent): void {
        // component.setStyle("position", "absolute");
    }
    
    preferredLayoutWidth(container: JSComponent): number {
        var view: JSComponent = (<JSScrollPane> container).getViewportView();
        if (view) {
            return view.getPreferredWidth();
        } else {
            return super.preferredLayoutWidth(container);
        }
    }
    
    preferredLayoutHeight(container: JSComponent): number {
        var view: JSComponent = (<JSScrollPane> container).getViewportView();
        if (view) {
            return view.getPreferredHeight();
        } else {
            return super.preferredLayoutHeight(container);
        }
    }
    
    layoutContainerHorizontally(container: JSComponent): void {
        if (container.isValidHorizontally()) {
            return;
        }
        var view: JSComponent = (<JSScrollPane> container).getViewportView();
        if (view) {
            var width: number = container.element.clientWidth;
            view.setWidth(view.getPreferredWidth());
        }
        container.setValidHorizontally(true);
    }
    
    layoutContainerVertically(container: JSComponent): void {
        if (container.isValidVertically()) {
            return;
        }
        var view: JSComponent = (<JSScrollPane> container).getViewportView();
        if (view) {
            var height: number = container.element.clientHeight;
            view.setHeight(view.getPreferredHeight());
        }
        container.setValidVertically(true);
    }
}
