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
    dialog: JSDialog;
    dragImage: JSComponent;
    dragSource: JSComponent;
    fileChooser: JSFileChooser;
    
    constructor() {
        super(document.body);
        this.setUI("JSBody");
        
        this.setLayout(new JSBorderLayout());
        
        var index: number = 0;
        
        var defsContainer: JSBodyDefsContainer = this.getDefsContainer();
        this.add(defsContainer, JSBorderLayout.NORTH, index++);
        
        var defs: JSDefs = this.getDefs();
        defsContainer.add(defs);
        
        var popupMenuContainer: JSBodyPopupMenuContainer = this.getPopupMenuContainer();
        this.add(popupMenuContainer, JSBorderLayout.NORTH, index++);
        
        var dialogContainer: JSBodyDialogContainer = this.getDialogContainer();
        this.add(dialogContainer, JSBorderLayout.NORTH, index++);
        
        var modal: JSBodyModal = this.getModal();
        dialogContainer.add(modal);
        
        var dragImageContainer: JSBodyDragImageContainer = this.getDragImageContainer();
        this.add(dragImageContainer, JSBorderLayout.NORTH, index++);
        
        this.addMouseListener(this, true);
        
        window.addEventListener("resize", function() {
            JSBody.getInstance().revalidate();
        });
    }
    getFrame(): JSFrame {
        var frame: JSFrame = this.getData("frame");
        if (!frame) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSFrame");
            if (element) {
                frame = new JSFrame(element);
                this.setData("frame", frame);
            }
        }
        return frame;
    }
    setFrame(frame: JSFrame) {
        var oldFrame: JSFrame = this.getData("frame");
        if (oldFrame === frame) {
            return;
        }
        if (oldFrame) {
            this.remove(oldFrame);
        }
        if (frame) {
            this.add(frame);
        }
        this.setData("frame", frame);
    }
    getDefsContainer(): JSBodyDefsContainer {
        var defsContainer: JSBodyDefsContainer = this.getData("defsContainer");
        if (!defsContainer) {
            var element: SVGElement = <SVGElement> this.getChild("JSBodyDefsContainer");
            if (element) {
                defsContainer = new JSBodyDefsContainer(element);
            } else {
                defsContainer = new JSBodyDefsContainer();
            }
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
            var element: HTMLElement = <HTMLElement> this.getChild("JSBodyPopupMenuContainer");
            if (element) {
                popupMenuContainer = new JSBodyPopupMenuContainer(element);
            } else {
                popupMenuContainer = new JSBodyPopupMenuContainer();
            }
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
                var popupMenuLayout: JSLayout = popupMenu.getLayout();
                if (popupMenuLayout) {
                    popupMenu.setWidth(this.getWidth());
                    popupMenu.setHeight(this.getHeight());
                    popupMenu.revalidate();
                }
                popupMenu.setWidth(popupMenu.getPreferredWidth());
                popupMenu.setHeight(popupMenu.getPreferredHeight());
                popupMenu.revalidate();
            }
        }
        this.popupMenu = popupMenu;
    }
    getDialogContainer(): JSBodyDialogContainer {
        var dialogContainer: JSBodyDialogContainer = this.getData("dialogContainer");
        if (!dialogContainer) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSBodyDialogContainer");
            if (element) {
                dialogContainer = new JSBodyDialogContainer(element);
            } else {
                dialogContainer = new JSBodyDialogContainer();
            }
            this.setData("dialogContainer", dialogContainer);
        }
        return dialogContainer;
    }
    getModal(): JSBodyModal {
        var modal: JSBodyModal = this.getData("modal");
        if (!modal) {
            var dialogContainer: JSBodyDialogContainer = this.getData("dialogContainer");
            var element: HTMLElement = <HTMLElement> dialogContainer.getChild("JSBodyModal");
            if (element) {
                modal = new JSBodyModal(element);
            } else {
                modal = new JSBodyModal();
            }
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
                var dialogLayout: JSLayout = dialog.getLayout();
                if (dialogLayout) {
                    dialog.setWidth(this.getWidth());
                    dialog.setHeight(this.getHeight());
                    dialog.revalidate();
                }
                dialog.setWidth(dialog.getPreferredWidth());
                dialog.setHeight(dialog.getPreferredHeight());
                dialog.revalidate();
                dialog.setX(dialog.getX() || (this.getWidth() - dialog.getWidth()) / 2);
                dialog.setY(dialog.getY() || (this.getHeight() - dialog.getHeight()) / 2);
            }
        }
        this.dialog = dialog;
    }
    getDragImageContainer(): JSBodyDragImageContainer {
        var dragImageContainer: JSBodyDragImageContainer = this.getData("dragImageContainer");
        if (!dragImageContainer) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSBodyDragImageContainer");
            if (element) {
                dragImageContainer = new JSBodyDragImageContainer(element);
            } else {
                dragImageContainer = new JSBodyDragImageContainer();
            }
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