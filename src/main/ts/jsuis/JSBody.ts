/// <reference path = "../jsuis.ts"/>
/**
 * JSBody
 * 
 * @author Yassuo Toda
 */
class JSBody extends JSHTMLComponent implements MouseListener {
    
    static instance: JSBody;
    static getInstance(): JSBody {
        if (JSBody.instance === undefined) {
            JSBody.instance = new JSBody();
        }
        return JSBody.instance;
    }
    
    popupMenu: JSComponent;
    dragImage: JSComponent;
    dragSource: JSComponent;
    fileChooser: JSFileChooser;
    
    constructor() {
        super(document.body);
        document.documentElement.style.height = "100%";
        this.setStyle("border", "0");
        this.setStyle("height", "100%");
        this.setStyle("margin", "0");
        this.setStyle("overflow", "hidden");
        this.setStyle("padding", "0");
        this.setStyle("user-select", "none");
        this.setStyle("-ms-user-select", "none");
        this.setStyle("-moz-user-select", "none");
        this.setStyle("-webkit-user-select", "none");
        
        this.setLayout(new JSBorderLayout());
        
        var svg: JSSVG = this.getDefsContainer();
        this.add(svg, JSBorderLayout.NORTH);
        
        var defs: JSDefs = this.getDefs();
        svg.add(defs);
        
        var popupMenuContainer: JSPanel = this.getPopupMenuContainer();
        this.add(popupMenuContainer, JSBorderLayout.NORTH);
        
        var dragImageContainer: JSPanel = this.getDragImageContainer();
        this.add(dragImageContainer, JSBorderLayout.NORTH);
        
        this.addMouseListener(this, true);
        
        window.addEventListener("resize", function() {
            JSBody.getInstance().revalidate();
        });
    }
    init(): void {
        this.addClass("JSBody");
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
    getDefsContainer(): JSBodyDefsContainer {
        var defsContainer: JSBodyDefsContainer = this.getData("defsContainer");
        if (!defsContainer) {
            defsContainer = new JSBodyDefsContainer();
            this.setData("defsContainer", defsContainer);
        }
        return defsContainer;
    }
    getDefs(): JSDefs {
        var defs: JSDefs = this.getData("defs");
        if (!defs) {
            defs = new JSDefs();
            this.setData("defs", defs);
        }
        return defs;
    }
    getPopupMenuContainer(): JSBodyPopupMenuContainer {
        var popupMenuContainer: JSBodyPopupMenuContainer = this.getData("popupMenuContainer");
        if (!popupMenuContainer) {
            popupMenuContainer = new JSBodyPopupMenuContainer();
            this.setData("popupMenuContainer", popupMenuContainer);
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
                var popupMenuLayout: JSLayout = popupMenu.getLayout();
                if (popupMenuLayout) {
                    popupMenu.setWidth(popupMenu.getPreferredWidth());
                    popupMenu.setHeight(popupMenu.getPreferredHeight());
                    popupMenu.revalidate();
                }
            }
        }
        this.popupMenu = popupMenu;
    }
    getDragImageContainer(): JSPanel {
        var dragImageContainer: JSBodyDragImageContainer = this.getData("dragImageContainer");
        if (!dragImageContainer) {
            dragImageContainer = new JSBodyDragImageContainer();
            dragImageContainer.setVisible(false);
            this.setData("dragImageContainer", dragImageContainer);
        }
        return dragImageContainer;
    }
    getDragImage(): JSComponent {
        return this.dragImage; 
    }
    setDragImage(dragImage: JSComponent) {
        var oldDragImage: JSComponent = this.getDragImage();
        if (oldDragImage !== dragImage) {
            var dragImageContainer: JSComponent = this.getDragImageContainer();
            if (oldDragImage) {
                dragImageContainer.remove(oldDragImage);
            }
            if (dragImage) {
                dragImageContainer.add(dragImage);
                var dragImageLayout: JSLayout = dragImage.getLayout();
                if (dragImageLayout) {
                    dragImage.setWidth(dragImage.getPreferredWidth());
                    dragImage.setHeight(dragImage.getPreferredHeight());
                    dragImage.revalidate();
                }
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
                this.add(fileChooser, JSBorderLayout.SOUTH);
            }
        }
        this.fileChooser = fileChooser;
    }
    getTimer(): JSTimer {
        var timer: JSTimer = this.getData("timer");
        if (!timer) {
            timer = new JSTimer();
            this.setData("timer", timer); 
        }
        return timer;
    }
    mouseMoved(mouseEvent: MouseEvent) {
        var dragSource: JSComponent = this.getDragSource();
        if (dragSource) {
            var dragStart = dragSource.getData("dragStart");
            if (!dragStart) {
                dragSource.fireDragStart(mouseEvent);
                dragSource.setData("dragStart", true);
            }
            dragSource.fireDrag(mouseEvent);
            dragSource.fireMouseDragged(mouseEvent);
        }
    }
    mouseReleased(mouseEvent: MouseEvent) {
        var dragSource: JSComponent = this.getDragSource();
        if (dragSource) {
            var timer: JSTimer = this.getTimer();
            timer.schedule({
                run() {
                    var dragStart = dragSource.getData("dragStart");
                    if (dragStart) {
                        dragSource.fireDragEnd(mouseEvent);
                        dragSource.setData("dragStart", false);
                    }
                    JSBody.getInstance().setDragSource(null);
                }
            }, 0);
        }
    }
}