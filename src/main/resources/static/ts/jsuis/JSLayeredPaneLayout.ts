class JSLayeredPaneLayout extends JSLayout {
    
    addLayoutComponent(component: JSComponent): void {
        component.setStyle("position", "absolute");
    }
}