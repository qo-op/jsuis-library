/// <reference path = "../jsuis.ts"/>
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
        var graphics: JSGraphics = this.getGraphics();
        if (!graphics) {
            graphics = new JSGraphics();
            graphics.setHeight(0);
            graphics.setStyle("position", "absolute");
            this.add(graphics);
            this.setGraphics(graphics);
        }
        var defs: JSDefs = this.getDefs();
        if (!defs) {
            defs = new JSDefs();
            graphics.add(defs);
            this.setDefs(defs);
        }
        var popupMenuContainer = this.getPopupMenuContainer();
        if (!popupMenuContainer) {
            popupMenuContainer = new JSDiv();
            this.add(popupMenuContainer, JSBorderLayout.NORTH);
            this.setPopupMenuContainer(popupMenuContainer);
        }
        var dragImageContainer = this.getDragImageContainer();
        if (!dragImageContainer) {
            dragImageContainer = new JSDiv();
            dragImageContainer.setVisible(false);
            this.add(dragImageContainer, JSBorderLayout.NORTH);
            this.setDragImageContainer(dragImageContainer);
        }
        this.addMouseListener({
            mouseReleased(mouseEvent: MouseEvent, component: JSComponent) {
                var body: JSBody = <JSBody> component;
                body.setDragSource(null);
            },
            mouseMoved(mouseEvent: MouseEvent, component: JSComponent) {
                var body: JSBody = <JSBody> component;
                var dragSource: JSComponent = body.getDragSource();
                if (dragSource) {
                    dragSource.fireMouseDragged(mouseEvent, dragSource);
                }
            }
        }, true);
        /*
        window.addEventListener("resize", function() {
            JSBody.getInstance().validate();
        });
        */
    }
    init(): void {
        this.addClass("JSBody");
        this.setStyle("height", "100%");
        this.setStyle("margin", "0");
        this.setStyle("overflow", "hidden");
        this.setStyle("user-select", "none");
        this.setStyle("-ms-user-select", "none");
        this.setStyle("-moz-user-select", "none");
        this.setStyle("-webkit-user-select", "none");
        document.documentElement.style.height = "100%";
    }
    getGraphics(): JSGraphics {
        return this.getData("graphics");
    }
    setGraphics(graphics: JSGraphics) {
        this.setData("graphics", graphics);
    }
    getDefs(): JSDefs {
        return this.getData("defs");
    }
    setDefs(defs: JSDefs) {
        this.setData("defs", defs);
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
    getPopupMenuContainer(): JSComponent {
        return this.getData("popupMenuContainer");
    }
    setPopupMenuContainer(popupMenuContainer: JSComponent) {
        this.setData("popupMenuContainer", popupMenuContainer);
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
                popupMenuContainer.validate();
            }
        }
        this.popupMenu = popupMenu;
    }
    getDragImageContainer(): JSComponent {
        return this.getData("dragImageContainer");
    }
    setDragImageContainer(dragImageContainer: JSComponent) {
        this.setData("dragImageContainer", dragImageContainer);
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