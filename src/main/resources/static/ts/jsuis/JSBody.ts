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
        this.addMouseListener({
            mouseMoved(mouseEvent: MouseEvent) {
                var dragSource: JSComponent = JSBody.getInstance().getDragSource();
                if (dragSource) {
                    var dragStart = dragSource.getData("dragStart");
                    if (!dragStart) {
                        dragSource.fireDragStart(mouseEvent);
                        dragSource.setData("dragStart", true);
                    }
                    dragSource.fireDrag(mouseEvent);
                    dragSource.fireMouseDragged(mouseEvent);
                }
            },
            mouseReleased(mouseEvent: MouseEvent) {
                var dragSource: JSComponent = JSBody.getInstance().getDragSource();
                if (dragSource) {
                    setTimeout(function() {
                        var dragStart = dragSource.getData("dragStart");
                        if (dragStart) {
                            dragSource.fireDragEnd(mouseEvent);
                            dragSource.setData("dragStart", false);
                        }
                        JSBody.getInstance().setDragSource(null);
                    });
                }
            }
        }, true);
        window.addEventListener("resize", function() {
            JSBody.getInstance().validate();
        });
    }
    init(): void {
        this.addClass("JSBody");
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
            defs = new JSDefs();
            var graphics: JSGraphics = this.getGraphics();
            graphics.add(defs);
            this.setData("defs", defs);
        }
        return defs;
    }
    getGraphics(): JSGraphics {
        var graphics: JSGraphics = this.getData("graphics");
        if (!graphics) {
            graphics = new JSGraphics();
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
    getDragImageContainer(): JSPanel {
        var dragImageContainer: JSPanel = this.getData("dragImageContainer");
        if (!dragImageContainer) {
            dragImageContainer = new JSPanel();
            dragImageContainer.setVisible(false);
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
    getPopupMenuContainer(): JSPanel {
        var popupMenuContainer: JSPanel = this.getData("popupMenuContainer");
        if (!popupMenuContainer) {
            popupMenuContainer = new JSPanel();
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