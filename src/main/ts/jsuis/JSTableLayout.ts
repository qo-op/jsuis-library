/// <reference path = "../jsuis.ts"/>
/**
 * JSTableLayout
 * 
 * @author Yassuo Toda
 */
class JSTableLayout extends JSBorderLayout {
    
    preferredLayoutWidth(container: JSComponent): number {
        var table: JSTable = <JSTable> container;
        var tableContent: JSTableContent = table.getTableContent();
        return tableContent.getPreferredOuterWidth();
    }
    
    preferredLayoutHeight(container: JSComponent): number {
        var table: JSTable = <JSTable> container;
        var tableContent: JSTableContent = table.getTableContent();
        return tableContent.getPreferredOuterHeight();
    }
    
    layoutContainerHorizontally(container: JSComponent): void {
        if (container.isValidHorizontally()) {
            return;
        }
        var hgap: number = this.getHgap();
        var width: number = container.getWidth();
        var x: number = container.getInsetLeft();
        
        var table: JSTable = <JSTable> container;
        
        var scrollPane: JSScrollPane = table.getScrollPane();
        scrollPane.setOuterWidth(width);
        scrollPane.setX(x);
        
        var horizontalScrollPane: JSScrollPane = table.getHorizontalScrollPane();
        horizontalScrollPane.setOuterWidth(width);
        horizontalScrollPane.setX(x);
        
        var tableHeader: JSTableHeader = table.getTableHeader();
        var tableHeaderHead: JSTableHead = tableHeader.getTableHead();
        var tableHeaderHeadRow: JSTableHeadRow = tableHeaderHead.getTableHeadRow();
        var tableHeaderHeadCells: JSComponent[] = tableHeaderHeadRow.getComponents();
        
        var tableContent: JSTableContent = table.getTableContent();
        var tableContentHead: JSTableHead = tableContent.getTableHead();
        var tableContentHeadRow: JSTableHeadRow = tableContentHead.getTableHeadRow();
        var tableContentHeadCells: JSComponent[] = tableContentHeadRow.getComponents();
        for (var i: number = 0; i < tableContentHeadCells.length; i++) {
            var tableContentHeadCell: JSTableHeadCell = <JSTableHeadCell> tableContentHeadCells[i];
            var tableHeaderHeadCell: JSTableHeadCell = <JSTableHeadCell> tableHeaderHeadCells[i];
            tableHeaderHeadCell.getContainer().setWidth(tableContentHeadCell.getPreferredWidth());
        }
        
        var scrollPaneView: JSComponent = scrollPane.getViewportView();
        scrollPaneView.setOuterWidth(tableContent.getPreferredOuterWidth());
        
        horizontalScrollPane.setWidth(scrollPane.element.clientWidth);
        horizontalScrollPane.setHeight(scrollPane.element.clientHeight);
        
        var verticalScrollPane: JSScrollPane = table.getVerticalScrollPane();
        verticalScrollPane.setHeight(scrollPane.element.clientHeight);
        
        container.setValidHorizontally(true);
    }
    
    layoutContainerVertically(container: JSComponent): void {
        if (container.isValidVertically()) {
            return;
        }
        var vgap: number = this.getVgap();
        var height: number = container.getHeight();
        var y: number = container.getInsetTop();
        
        var table: JSTable = <JSTable> container;
        
        var scrollPane: JSScrollPane = table.getScrollPane();
        scrollPane.setOuterHeight(height);
        scrollPane.setY(y);
        
        var horizontalScrollPane: JSScrollPane = table.getHorizontalScrollPane();
        horizontalScrollPane.setOuterHeight(height);
        horizontalScrollPane.setY(y);
        
        var scrollPaneView: JSComponent = scrollPane.getViewportView();
        var tableContent: JSTableContent = table.getTableContent();
        scrollPaneView.setOuterHeight(tableContent.getPreferredHeight());
        
        horizontalScrollPane.setWidth(scrollPane.element.clientWidth);
        horizontalScrollPane.setHeight(scrollPane.element.clientHeight);
        
        var verticalScrollPane: JSScrollPane = table.getVerticalScrollPane();
        verticalScrollPane.setHeight(scrollPane.element.clientHeight);
        
        container.setValidVertically(true);
    }
}
