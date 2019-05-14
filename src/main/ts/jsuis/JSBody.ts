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
    dragImage: Element;
    dragSource: JSComponent;
    fileChooser: JSFileChooser;
    
    constructor() {
        super(document.body);
        
        this.setLayout(new JSBorderLayout());
        
        var svg: JSSVG = this.getSVG();
        this.add(svg, JSBorderLayout.NORTH);
        
        var defs: JSDefs = this.getDefs();
        svg.add(defs);
        
        var popupMenuContainer: JSPanel = this.getPopupMenuContainer();
        this.add(popupMenuContainer, JSBorderLayout.NORTH);
        
        var dragImageContainer: JSPanel = this.getDragImageContainer();
        this.add(dragImageContainer, JSBorderLayout.NORTH);
        
        this.addMouseListener(this, true);
        
        window.addEventListener("resize", function() {
            JSBody.getInstance().validate();
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
    getSVG(): JSSVG {
        var svg: JSSVG = this.getData("svg");
        if (!svg) {
            svg = new JSSVG();
            svg.setWidth(0);
            svg.setHeight(0);
            this.setData("svg", svg);
        }
        return svg;
    }
    getDefs(): JSDefs {
        var defs: JSDefs = this.getData("defs");
        if (!defs) {
            defs = new JSDefs();
            this.setData("defs", defs);
        }
        return defs;
    }
    getPopupMenuContainer(): JSPanel {
        var popupMenuContainer: JSPanel = this.getData("popupMenuContainer");
        if (!popupMenuContainer) {
            popupMenuContainer = new JSPanel();
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
                popupMenu.validate();
            }
        }
        this.popupMenu = popupMenu;
    }
    getDragImageContainer(): JSPanel {
        var dragImageContainer: JSPanel = this.getData("dragImageContainer");
        if (!dragImageContainer) {
            dragImageContainer = new JSPanel();
            dragImageContainer.setVisible(false);
            this.setData("dragImageContainer", dragImageContainer);
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