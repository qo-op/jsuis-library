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
        return view.getPreferredWidth();
    }
    
    preferredLayoutHeight(container: JSComponent): number {
        var view: JSComponent = (<JSScrollPane> container).getViewportView();
        return view.getPreferredHeight();
    }
    
    layoutContainerHorizontally(container: JSComponent): void {
        if (container.isValidHorizontally()) {
            return;
        }
        var view: JSComponent = (<JSScrollPane> container).getViewportView();
        view.setWidth(view.getPreferredWidth());
        container.setValidHorizontally(true);
    }
    
    layoutContainerVertically(container: JSComponent): void {
        if (container.isValidVertically()) {
            return;
        }
        var view: JSComponent = (<JSScrollPane> container).getViewportView();
        view.setHeight(view.getPreferredHeight());
        container.setValidVertically(true);
    }
}
