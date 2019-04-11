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
    
    popupMenu: JSComponent;
    dragSource: JSComponent;
    dragImage: Element;
    fileChooser: JSFileChooser;
    
    constructor() {
        super(document.body);
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
        this.setClass("JSBody");
        document.documentElement.style.height = "100%";
        this.setStyle("height", "100%");
        this.setStyle("margin", "0");
        this.setStyle("overflow", "hidden");
        this.setStyle("user-select", "none");
        this.setStyle("-ms-user-select", "none");
        this.setStyle("-moz-user-select", "none");
        this.setStyle("-webkit-user-select", "none");
        this.setDragImage(new Image(0, 0));
    }
    getContentPane(): JSComponent {
        return this.getData("contentPane");
    }
    setContentPane(contentPane: JSComponent) {
        if (contentPane) {
            var oldContentPane: JSComponent = this.getContentPane();
            if (oldContentPane !== contentPane) {
                if (oldContentPane) {
                    this.remove(oldContentPane);
                }
                if (contentPane) {
                    this.add(contentPane);
                }
            }
        }
        this.setData("contentPane", contentPane);
    }
    getDefs(): JSDefs {
        var defs: JSDefs = this.getData("JSBody.defs");
        if (!defs) {
            defs = new JSDefs().withName("JSBody.defs");
            var graphics: JSGraphics = this.getGraphics();
            graphics.add(defs);
            this.setData("JSBody.defs", defs);
        }
        return defs;
    }
    getGraphics(): JSGraphics {
        var graphics: JSGraphics = this.getData("JSBody.graphics");
        if (!graphics) {
            graphics = new JSGraphics().withName("JSBody.graphics");
            graphics.setStyle("position", "absolute");
            graphics.setWidth(0);
            graphics.setHeight(0);
            this.add(graphics, null, 0);
            this.setData("JSBody.graphics", graphics);
        }
        return graphics;
    }
    getPopupMenuContainer(): JSComponent {
        var popupMenuContainer: JSComponent = this.getData("JSBody.popupMenuContainer");
        if (!popupMenuContainer) {
            popupMenuContainer = new JSPanel().withName("JSBody.popupMenuContainer");
            popupMenuContainer.setStyle("position", "absolute");
            popupMenuContainer.setWidth(0);
            popupMenuContainer.setHeight(0);
            this.add(popupMenuContainer, null, 0);
            this.setData("JSBody.popupMenuContainer", popupMenuContainer);
        }
        return popupMenuContainer;
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
    getDragImageContainer(): JSComponent {
        var dragImageContainer: JSComponent = this.getData("JSBody.dragImageContainer");
        if (!dragImageContainer) {
            dragImageContainer = new JSPanel().withName("JSBody.dragImageContainer");
            dragImageContainer.setVisible(false);
            dragImageContainer.setStyle("position", "absolute");
            dragImageContainer.setWidth(0);
            dragImageContainer.setHeight(0);
            this.add(dragImageContainer, null, 0);
            this.setData("JSBody.dragImageContainer", dragImageContainer);
        }
        return dragImageContainer;
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
    getDragSource(): JSComponent {
        return this.dragSource;
    }
    setDragSource(dragSource: JSComponent) {
        this.dragSource = dragSource;
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