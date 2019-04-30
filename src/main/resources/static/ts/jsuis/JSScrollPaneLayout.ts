/// <reference path = "../jsuis.ts"/>
/**
 * JSScrollPaneLayout
 * 
 * @author Yassuo Toda
 */
class JSScrollPaneLayout extends JSLayout {
    
    preferredLayoutWidth(scrollPane: JSScrollPane): number {
        var preferredLayoutWidth: number = 0;
        var viewportView: JSComponent = scrollPane.getViewportView();
        if (viewportView && viewportView.isDisplayable()) {
            preferredLayoutWidth = viewportView.getPreferredOuterWidth();
        }
        return preferredLayoutWidth;
    }
    preferredLayoutHeight(scrollPane: JSScrollPane): number {
        var preferredLayoutHeight: number = 0;
        var viewportView: JSComponent = scrollPane.getViewportView();
        if (viewportView && viewportView.isDisplayable()) {
            preferredLayoutHeight = viewportView.getPreferredOuterHeight();
        }
        return preferredLayoutHeight;
    }
    /*
    layoutContainer(scrollPane: JSScrollPane): void {
        var viewportView: JSComponent = scrollPane.getViewportView();
        if (viewportView && viewportView.isDisplayable()) {
            var vsbPolicy = scrollPane.getVsbPolicy();
            var hsbPolicy = scrollPane.getHsbPolicy();
            if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_NEVER && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_NEVER) {
                viewportView.setOuterWidth(scrollPane.getWidth());
                viewportView.setOuterHeight(scrollPane.getHeight());
            } else if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_NEVER && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS) {
                viewportView.setOuterWidth(Math.max(scrollPane.getWidth(), viewportView.getPreferredOuterWidth()));
                viewportView.setOuterHeight(scrollPane.element.clientHeight - 1);
            } else if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_NEVER && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED) {
                viewportView.setOuterWidth(Math.max(scrollPane.getWidth(), viewportView.getPreferredOuterWidth()));
                viewportView.setOuterHeight(scrollPane.element.clientHeight - 1);
            } else if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_ALWAYS && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_NEVER) {
                viewportView.setOuterHeight(Math.max(scrollPane.getHeight(), viewportView.getPreferredOuterHeight()));
                viewportView.setOuterWidth(scrollPane.element.clientWidth - 1);
            } else if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_ALWAYS && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS) {
                viewportView.setOuterWidth(Math.max(scrollPane.element.clientWidth - 1, viewportView.getPreferredOuterWidth()));
                viewportView.setOuterHeight(Math.max(scrollPane.element.clientHeight - 1, viewportView.getPreferredOuterHeight()));
            } else if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_ALWAYS && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED) {
                viewportView.setOuterWidth(Math.max(scrollPane.element.clientWidth - 1, viewportView.getPreferredOuterWidth()));
                viewportView.setOuterHeight(Math.max(scrollPane.element.clientHeight - 1, viewportView.getPreferredOuterHeight()));
            } else if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_NEVER) {
                viewportView.setOuterHeight(Math.max(scrollPane.getHeight(), viewportView.getPreferredHeight()));
                viewportView.setOuterWidth(scrollPane.element.clientWidth - 1);
            } else if (vsbPolicy === JSScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED && hsbPolicy === JSScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS) {
                viewportView.setOuterHeight(Math.max(scrollPane.element.clientHeight - 1, viewportView.getPreferredHeight()));
                viewportView.setOuterWidth(Math.max(scrollPane.element.clientWidth - 1, viewportView.getPreferredWidth()));
            } else {
                viewportView.setOuterWidth(Math.max(scrollPane.getWidth(), viewportView.getPreferredWidth()));
                viewportView.setOuterHeight(Math.max(scrollPane.element.clientHeight - 1, viewportView.getPreferredHeight()));
                viewportView.setOuterWidth(Math.max(scrollPane.element.clientWidth - 1, viewportView.getPreferredWidth()));
                viewportView.setOuterHeight(Math.max(scrollPane.element.clientHeight - 1, viewportView.getPreferredHeight()));
            }
        }
    }
    */
}