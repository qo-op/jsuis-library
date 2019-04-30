/// <reference path = "../jsuis.ts"/>
/**
 * JSBody
 * 
 * @author Yassuo Toda
 */
class JSBody extends JSHTMLComponent {
    
    static instance: JSBody;
    static getInstance(): JSBody {
        if (JSBody.instance === undefined) {
            JSBody.instance = new JSBody();
        }
        return JSBody.instance;
    }
    
    dragSource: JSComponent;
    dragImage: Element;
    popupMenu: JSComponent;
    fileChooser: JSFileChooser;
    
    constructor() {
        super(document.body);
        this.setClass("JSBody");
        this.addMouseListener({
            mouseMoved(mouseEvent: MouseEvent, component: JSComponent) {
                var body: JSBody = <JSBody> component;
                var dragSource: JSComponent = body.getDragSource();
                if (dragSource) {
                    var dragStart = dragSource.getData("dragStart");
                    if (!dragStart) {
                        dragSource.fireDragStart(mouseEvent, dragSource);
                        dragSource.setData("dragStart", true);
                    }
                    dragSource.fireDrag(mouseEvent, dragSource);
                    dragSource.fireMouseDragged(mouseEvent, dragSource);
                }
            },
            mouseReleased(mouseEvent: MouseEvent, component: JSComponent) {
                var body: JSBody = <JSBody> component;
                var dragSource: JSComponent = body.getDragSource();
                if (dragSource) {
                    setTimeout(function() {
                        var dragStart = dragSource.getData("dragStart");
                        if (dragStart) {
                            dragSource.fireDragEnd(mouseEvent, dragSource);
                            dragSource.setData("dragStart", false);
                        }
                        body.setDragSource(null);
                    });
                }
            }
        }, true);
    }
    getContentPane(): JSComponent {
        var contentPane = this.getData("contentPane");
        if (!contentPane) {
            contentPane = new JSFrame();
            this.add(contentPane);
            this.setData("contentPane", contentPane);
        }
        return contentPane;
    }
    setContentPane(contentPane: JSComponent) {
        var oldContentPane: JSComponent = this.getData("contentPane");
        if (oldContentPane) {
            this.remove(oldContentPane);
        }
        if (contentPane) {
            this.add(contentPane);
        }
        this.setData("contentPane", contentPane);
    }
    getDefs(): JSDefs {
        var defs: JSDefs = this.getData("defs");
        if (!defs) {
            defs = new JSDefs().withName("bodyDefs");
            var graphics: JSGraphics = this.getGraphics();
            graphics.add(defs);
            this.setData("defs", defs);
        }
        return defs;
    }
    getGraphics(): JSGraphics {
        var graphics: JSGraphics = this.getData("graphics");
        if (!graphics) {
            graphics = new JSGraphics().withName("bodyGraphics");
            graphics.setStyle("position", "absolute");
            graphics.setWidth(0);
            graphics.setHeight(0);
            this.add(graphics, null, 0);
            this.setData("graphics", graphics);
        }
        return graphics;
    }
    getDragSource(): JSComponent {
        return this.dragSource;
    }
    setDragSource(dragSource: JSComponent) {
        this.dragSource = dragSource;
    }
    getDragImage(): Element {
        return this.dragImage; 
    }
    setDragImage(dragImage: Element) {
        var oldDragImage: Element = this.getDragImage();
        if (oldDragImage !== dragImage) {
            var dragImageContainer: JSComponent = this.getDragImageContainer();
            if (oldDragImage) {
                dragImageContainer.remove(new JSComponent(oldDragImage));
            }
            if (dragImage) {
                dragImageContainer.add(new JSComponent(dragImage));
                dragImageContainer.validate();
            }
        }
        this.dragImage = dragImage;
    }
    getDragImageContainer(): JSComponent {
        var dragImageContainer: JSComponent = this.getData("dragImageContainer");
        if (!dragImageContainer) {
            dragImageContainer = new JSPanel().withName("bodyDragImageContainer");
            dragImageContainer.setVisible(false);
            dragImageContainer.setStyle("position", "absolute");
            dragImageContainer.setWidth(0);
            dragImageContainer.setHeight(0);
            this.add(dragImageContainer, null, 0);
            this.setData("dragImageContainer", dragImageContainer);
        }
        return dragImageContainer;
    }
    getPopupMenu(): JSComponent {
        return this.popupMenu; 
    }
    setPopupMenu(popupMenu: JSComponent) {
        var oldPopupMenu: JSComponent = this.getPopupMenu();
        if (oldPopupMenu !== popupMenu) {
            var popupMenuContainer: JSComponent = this.getPopupMenuContainer();
            if (oldPopupMenu) {
                popupMenuContainer.remove(oldPopupMenu);
            }
            if (popupMenu) {
                popupMenuContainer.add(popupMenu);
                popupMenu.validate();
            }
        }
        this.popupMenu = popupMenu;
    }
    getPopupMenuContainer(): JSComponent {
        var popupMenuContainer: JSComponent = this.getData("popupMenuContainer");
        if (!popupMenuContainer) {
            popupMenuContainer = new JSPanel().withName("bodyPopupMenuContainer");
            popupMenuContainer.setStyle("position", "absolute");
            popupMenuContainer.setWidth(0);
            popupMenuContainer.setHeight(0);
            this.add(popupMenuContainer, null, 0);
            this.setData("popupMenuContainer", popupMenuContainer);
        }
        return popupMenuContainer;
    }
    getFileChooser(): JSFileChooser {
        return this.fileChooser;
    }
    setFileChooser(fileChooser: JSFileChooser) {
        var oldFileChooser = this.getFileChooser();
        if (oldFileChooser !== fileChooser) {
            if (oldFileChooser) {
                this.remove(oldFileChooser);
            }
            if (fileChooser) {
                this.add(fileChooser);
            }
        }
        this.fileChooser = fileChooser;
    }
}