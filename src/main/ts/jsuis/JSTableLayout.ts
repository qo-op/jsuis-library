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
        var verticalScrollBar: JSVerticalScrollBar = table.getVerticalScrollBar();
        if (verticalScrollBar.isVisible()) {
            return tableContent.getPreferredOuterWidth() + verticalScrollBar.getPreferredOuterWidth();
        } else {
            return tableContent.getPreferredOuterWidth();
        }
    }
    
    preferredLayoutHeight(container: JSComponent): number {
        var table: JSTable = <JSTable> container;
        var tableContent: JSTableContent = table.getTableContent();
        var horizontalScrollBar: JSHorizontalScrollBar = table.getHorizontalScrollBar();
        if (horizontalScrollBar.isVisible()) {
            return tableContent.getPreferredOuterHeight() + horizontalScrollBar.getPreferredOuterHeight();
        } else {
            return tableContent.getPreferredOuterHeight();
        }
    }
    
    layoutContainerHorizontally(container: JSComponent): void {
        if (container.isValidHorizontally()) {
            return;
        }
        var hgap: number = this.getHgap();
        var width: number = container.getContentWidth();
        var x: number = container.getInsetLeft();
        
        var table: JSTable = <JSTable> container;
        
        /*
        var scrollPane: JSScrollPane = table.getScrollPane();
        scrollPane.setOuterWidth(width);
        scrollPane.setX(x);
        */
        
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
        var tableContentBody: JSTableBody = tableContent.getTableBody();
        for (var i: number = 0; i < tableContentHeadCells.length; i++) {
            var tableContentHeadCell: JSTableHeadCell = <JSTableHeadCell> tableContentHeadCells[i];
            
            
            
            var tableHeaderHeadCell: JSTableHeadCell = <JSTableHeadCell> tableHeaderHeadCells[i];
            tableHeaderHeadCell.getContainer().setOuterWidth(tableContentHeadCell.getWidth());
        }
        var tableHeaderPreferredOuterWidth = tableHeader.getPreferredOuterWidth();
        
        if (width > tableHeaderPreferredOuterWidth) {
            var tableContentHeadCell: JSTableHeadCell = <JSTableHeadCell> tableContentHeadCells[tableContentHeadCells.length - 1];
            var tableContentHeadCellPreferredWidth = tableContentHeadCell.getPreferredWidth();
            var tableHeaderHeadCell: JSTableHeadCell = <JSTableHeadCell> tableHeaderHeadCells[tableHeaderHeadCells.length - 1];
            tableHeaderHeadCell.getContainer().setOuterWidth(tableContentHeadCellPreferredWidth + (width - tableHeaderPreferredOuterWidth));
            tableContentHeadCell.setWidth(tableContentHeadCellPreferredWidth + (width - tableHeaderPreferredOuterWidth));
        }
        
        // var scrollPaneView: JSComponent = scrollPane.getViewportView();
        var tableContentPreferredOuterWidth: number = tableContent.getPreferredOuterWidth();
        var tableContentPreferredOuterHeight: number = tableContent.getPreferredOuterHeight();
        // scrollPaneView.setOuterWidth(tableContentPreferredOuterWidth);
        
        var verticalScrollPane: JSScrollPane = table.getVerticalScrollPane();
        var horizontalScrollBar: JSHorizontalScrollBar = table.getHorizontalScrollBar();
        var horizontalScrollBarPreferredOuterHeight: number = horizontalScrollBar.getPreferredOuterHeight();
        var verticalScrollBar: JSVerticalScrollBar = table.getVerticalScrollBar();
        var verticalScrollBarPreferredOuterWidth: number = verticalScrollBar.getPreferredOuterWidth();
        verticalScrollBar.setOuterWidth(verticalScrollBarPreferredOuterWidth);
        
        // var scrollPaneOuterHeight: number = scrollPane.getOuterHeight();
        var horizontalScrollPaneOuterHeight: number = horizontalScrollPane.getOuterHeight();
        if (tableContentPreferredOuterWidth > width) {
            horizontalScrollBar.setMaximum(tableContentPreferredOuterWidth);
            if (tableContentPreferredOuterHeight > horizontalScrollPaneOuterHeight) {
                horizontalScrollPane.setOuterWidth(width - verticalScrollBarPreferredOuterWidth);
                horizontalScrollBar.setOuterWidth(width - verticalScrollBarPreferredOuterWidth);
            } else {
                horizontalScrollPane.setOuterWidth(width);
                horizontalScrollBar.setOuterWidth(width);
            }
            horizontalScrollBar.setY(horizontalScrollPaneOuterHeight - horizontalScrollBarPreferredOuterHeight);
            horizontalScrollBar.setVisible(true);
        } else {
            horizontalScrollBar.setVisible(false);
            horizontalScrollPane.setOuterWidth(width);
        }
        
        var tableLowerRightCorner: JSTableLowerRightCorner = table.getTableLowerRightCorner();
        tableLowerRightCorner.setX(width - verticalScrollBar.getWidth());
        
        container.setValidHorizontally(true);
    }
    
    layoutContainerVertically(container: JSComponent): void {
        if (container.isValidVertically()) {
            return;
        }
        var vgap: number = this.getVgap();
        var width: number = container.getContentWidth();
        var height: number = container.getContentHeight();
        var y: number = container.getInsetTop();
        
        var table: JSTable = <JSTable> container;
        
        /*
        var scrollPane: JSScrollPane = table.getScrollPane();
        scrollPane.setOuterHeight(height);
        scrollPane.setY(y);
        */
        
        var horizontalScrollPane: JSScrollPane = table.getHorizontalScrollPane();
        horizontalScrollPane.setOuterHeight(height);
        horizontalScrollPane.setY(y);
        
        // var scrollPaneView: JSComponent = scrollPane.getViewportView();
        var tableContent: JSTableContent = table.getTableContent();
        var tableContentPreferredOuterWidth: number = tableContent.getPreferredOuterWidth();
        var tableContentPreferredOuterHeight: number = tableContent.getPreferredOuterHeight();
        // scrollPaneView.setOuterHeight(tableContentPreferredOuterHeight);
        
        var verticalScrollPane: JSScrollPane = table.getVerticalScrollPane();
        var horizontalScrollBar: JSHorizontalScrollBar = table.getHorizontalScrollBar();
        var horizontalScrollBarPreferredOuterHeight: number = horizontalScrollBar.getPreferredOuterHeight();
        horizontalScrollBar.setOuterHeight(horizontalScrollBarPreferredOuterHeight);
        var verticalScrollBar: JSVerticalScrollBar = table.getVerticalScrollBar();
        var verticalScrollBarPreferredOuterWidth: number = verticalScrollBar.getPreferredOuterWidth();

        var tableHeader: JSTableHeader = table.getTableHeader();
        var tableHeaderPreferredOuterHeight = tableHeader.getPreferredOuterHeight();
        
        // var scrollPaneOuterWidth: number = scrollPane.getOuterWidth();
        if (tableContentPreferredOuterHeight > height) {
            verticalScrollBar.setMaximum(tableContentPreferredOuterHeight);
            if (tableContentPreferredOuterWidth > width) {
                horizontalScrollPane.setOuterHeight(height - horizontalScrollBarPreferredOuterHeight);
                verticalScrollPane.setOuterHeight(height - horizontalScrollBarPreferredOuterHeight);
                verticalScrollBar.setOuterHeight(height - horizontalScrollBarPreferredOuterHeight - tableHeaderPreferredOuterHeight);
                verticalScrollBar.setY(y + tableHeaderPreferredOuterHeight);
            } else {
                horizontalScrollPane.setOuterHeight(height);
                verticalScrollPane.setOuterHeight(height);
                verticalScrollBar.setOuterHeight(height - tableHeaderPreferredOuterHeight);
                verticalScrollBar.setY(y + tableHeaderPreferredOuterHeight);
            }
            verticalScrollBar.setX(width - verticalScrollBarPreferredOuterWidth);
            verticalScrollBar.setVisible(true);
        } else {
            verticalScrollBar.setVisible(false);
            horizontalScrollPane.setOuterHeight(height);
            verticalScrollPane.setOuterHeight(height);
        }
        
        if (tableContentPreferredOuterWidth > width) {
            horizontalScrollBar.setMaximum(tableContentPreferredOuterWidth);
            if (tableContentPreferredOuterHeight > height) {
                horizontalScrollPane.setOuterWidth(width - verticalScrollBarPreferredOuterWidth);
                horizontalScrollBar.setOuterWidth(width - verticalScrollBarPreferredOuterWidth);
            } else {
                horizontalScrollPane.setOuterWidth(width);
                horizontalScrollBar.setOuterWidth(width);
            }
            horizontalScrollBar.setY(height - horizontalScrollBarPreferredOuterHeight);
            horizontalScrollBar.setVisible(true);
        } else {
            horizontalScrollBar.setVisible(false);
            horizontalScrollPane.setOuterWidth(width);
        }
        
        var tableLowerRightCorner: JSTableLowerRightCorner = table.getTableLowerRightCorner();
        tableLowerRightCorner.setX(width - verticalScrollBar.getWidth());
        tableLowerRightCorner.setY(height - horizontalScrollBar.getHeight());
        tableLowerRightCorner.setVisible(horizontalScrollBar.isVisible() && verticalScrollBar.isVisible());
        
        container.setValidVertically(true);
    }
}
