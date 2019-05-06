/// <reference path = "../jsuis.ts"/>
/**
 * JSLayout
 * 
 * @author Yassuo Toda
 */
class JSLayout {
    
    /*
     * border
     */
    static NORTH: string = "north";
    static SOUTH: string = "south";
    static WEST: string = "west";
    static EAST: string = "east";
    static CENTER: string = "center";
    
    /*
     * align
     */
    static TOP: string = "top";
    static LEFT: string = "left";
    static BOTTOM: string = "bottom";
    static RIGHT: string = "right";
    // static CENTER: string = "center";
    
    /*
     * fill
     */
    static HORIZONTAL: string = "horizontal";
    static VERTICAL: string = "vertical";
    static BOTH: string = "both";
    static NONE: string = "none";
    
    /*
     * anchor
     */
    // static NORTH: string = "north";
    // static SOUTH: string = "south";
    // static WEST: string = "west";
    // static EAST: string = "east";
    // static CENTER: string = "center";
    static NORTHWEST: string = "northwest";
    static NORTHEAST: string = "northeast";
    static SOUTHWEST: string = "southwest";
    static SOUTHEAST: string = "southeast";
    
    addLayoutComponent(component: JSComponent): void {
    }
    removeLayoutComponent(component: JSComponent): void {
    }
    preferredLayoutWidth(container: JSComponent): number {
        var cssWidth: string = container.getStyle("width");
        if (cssWidth) {
            container.removeStyle("width");
        }
        var widthAttribute: string = container.getAttribute("width");
        if (widthAttribute) {
            container.removeAttribute("width");
        }
        var width = container.element.getBoundingClientRect().width - container.getBorderLeftWidth() - container.getPaddingLeft() - container.getPaddingRight() - container.getBorderRightWidth();
        if (widthAttribute) {
            container.setAttribute("width", widthAttribute);
        }
        if (cssWidth) {
            container.setStyle("width", cssWidth);
        }
        return width;
    }
    preferredLayoutHeight(container: JSComponent): number {
        var cssHeight: string = container.getStyle("height");
        if (cssHeight) {
            container.removeStyle("height");
        }
        var heightAttribute: string = container.getAttribute("height");
        if (heightAttribute) {
            container.removeAttribute("height");
        }
        var height = container.element.getBoundingClientRect().height - container.getBorderTopWidth() - container.getPaddingTop() - container.getPaddingBottom() - container.getBorderBottomWidth();
        if (heightAttribute) {
            container.setAttribute("height", heightAttribute);
        }
        if (cssHeight) {
            container.setStyle("height", cssHeight);
        }
        return height;
    }
    layoutContainer(container: JSComponent): void {
    }
}