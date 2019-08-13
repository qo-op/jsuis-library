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
    dialog: JSDialog;
    dragImage: JSComponent;
    dragSource: JSComponent;
    fileChooser: JSFileChooser;
    
    constructor() {
        super(document.body);
        this.setUI("JSBody");
        
        document.documentElement.style.height = "100%";
        this.setStyle("border", "0"); this.setStyle("padding", "0"); this.setStyle("margin", "0");
        this.setStyle("height", "100%");
        this.setStyle("overflow", "hidden");
        this.setStyle("user-select", "none");
        this.setStyle("-ms-user-select", "none");
        this.setStyle("-moz-user-select", "none");
        this.setStyle("-webkit-user-select", "none");
        
        this.setLayout(new JSBorderLayout());
        
        var dragContainer: JSBodyDragContainer = this.getDragContainer();
        this.add(dragContainer, JSBorderLayout.NORTH);
        
        var glassPane: JSBodyGlassPane = this.getGlassPane();
        dragContainer.add(glassPane);
        
        var defsContainer: JSBodyDefsContainer = this.getDefsContainer();
        this.add(defsContainer, JSBorderLayout.NORTH);
        
        var defs: JSDefs = this.getDefs();
        defsContainer.add(defs);
        
        var popupMenuContainer: JSBodyPopupMenuContainer = this.getPopupMenuContainer();
        this.add(popupMenuContainer, JSBorderLayout.NORTH);
        
        var dialogContainer: JSBodyDialogContainer = this.getDialogContainer();
        this.add(dialogContainer, JSBorderLayout.NORTH);
        
        var modal: JSBodyModal = this.getModal();
        dialogContainer.add(modal);
        
        var frameContainer: JSBodyFrameContainer = this.getFrameContainer();
        this.add(frameContainer);
        
        this.addMouseListener(new JSBodyMouseListener(), true);
        
        window.addEventListener("resize", function() {
            JSBody.getInstance().revalidate();
        });
    }
    getFrameContainer(): JSBodyFrameContainer {
        var frameContainer: JSBodyFrameContainer = this.getData("frameContainer");
        if (!frameContainer) {
            frameContainer = new JSBodyFrameContainer();
            this.setData("frameContainer", frameContainer);
        }
        return frameContainer;
    }
    getFrame(): JSFrame {
        return this.getData("frame");
    }
    setFrame(frame: JSFrame) {
        var frameContainer: JSBodyFrameContainer = this.getFrameContainer();
        frameContainer.removeAll();
        if (frame) {
            frameContainer.add(frame);
        }
        this.setData("frame", frame);
    }
    addFrame(frame: JSFrame) {
        var frameContainer: JSBodyFrameContainer = this.getFrameContainer();
        if (frame) {
            frameContainer.add(frame);
        }
    }
    getDragContainer(): JSBodyDragContainer {
        var dragContainer: JSBodyDragContainer = this.getData("dragContainer");
        if (!dragContainer) {
            dragContainer = new JSBodyDragContainer();
            this.setData("dragContainer", dragContainer);
        }
        return dragContainer;
    }
    getGlassPane(): JSBodyGlassPane {
        var glassPane: JSBodyGlassPane = this.getData("glassPane");
        if (!glassPane) {
            glassPane = new JSBodyGlassPane();
            this.setData("glassPane", glassPane);
        }
        return glassPane;
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
            var popupMenuContainer: JSBodyPopupMenuContainer = this.getPopupMenuContainer();
            if (oldPopupMenu) {
                popupMenuContainer.remove(oldPopupMenu);
            }
            if (popupMenu) {
                popupMenuContainer.add(popupMenu);
                popupMenu.revalidate(popupMenuContainer);
            }
        }
        this.popupMenu = popupMenu;
    }
    getDialogContainer(): JSBodyDialogContainer {
        var dialogContainer: JSBodyDialogContainer = this.getData("dialogContainer");
        if (!dialogContainer) {
            dialogContainer = new JSBodyDialogContainer();
            this.setData("dialogContainer", dialogContainer);
        }
        return dialogContainer;
    }
    getModal(): JSBodyModal {
        var modal: JSBodyModal = this.getData("modal");
        if (!modal) {
            var dialogContainer: JSBodyDialogContainer = this.getData("dialogContainer");
            modal = new JSBodyModal();
            this.setData("modal", modal);
        }
        return modal;
    }
    getDialog(): JSDialog {
        return this.dialog;
    }
    setDialog(dialog: JSDialog) {
        var oldDialog: JSDialog = this.getDialog();
        if (oldDialog !== dialog) {
            var dialogContainer: JSBodyDialogContainer = this.getDialogContainer();
            if (oldDialog) {
                dialogContainer.remove(oldDialog);
            }
            if (dialog) {
                var modal = dialog.isModal();
                if (modal) {
                    this.getModal().setStyle("display", "");
                }
                dialogContainer.add(dialog);
                dialog.revalidate(dialogContainer);
                
                console.log("dialog.getWidth():" + dialog.getWidth());
                
                dialog.setX(dialog.getX() || (this.getWidth() - dialog.getWidth()) / 2);
                dialog.setY(dialog.getY() || (this.getHeight() - dialog.getHeight()) / 2);
            }
        }
        this.dialog = dialog;
    }
    /*
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
                dragImage.revalidate(dragImageContainer);
            }
        }
        this.dragImage = dragImage;
    }
    */
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
    debug(parent: JSComponent = JSBody.getInstance(), debugId: number = 0) {
        var components: JSComponent[] = parent.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            if (!component.isDisplayable()) {
                continue;
            }
            component.setAttribute("data-jsuis-debug-id", "" + (++debugId));
            this.setData("" + debugId, component);
            debugId = this.debug(component, debugId);
        }
        return debugId;
    }
    getComponentByDebugId(debugId: number): JSComponent {
        return this.getData("" + debugId);
    }
}