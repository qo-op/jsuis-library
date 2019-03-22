/// <reference path = "../jsuis.ts"/>
class JSPopupMenu extends JSHTMLComponent {
    
    invoker: JSComponent;
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(element?: HTMLDivElement) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(element === undefined ? document.createElement("div") : element);
        this.setLayout(new JSPopupMenuLayout());
        
        this.addEventListener("contextmenu", function(mouseEvent: MouseEvent) {
            mouseEvent.preventDefault();
            mouseEvent.stopPropagation();
        }, false);
        var popupMenu: JSPopupMenu = this;
        var body: JSBody = JSBody.getInstance();
        body.addMouseListener({
            mousePressed(mouseEvent: MouseEvent) {
                var invoker: JSComponent = popupMenu.getInvoker();
                if (!(invoker instanceof JSMenu)) {
                    popupMenu.setData("close", true);
                    body.setTimeout(popupMenu, function() {
                        var close = popupMenu.getData("close");
                        if (close) {
                            popupMenu.setSelected(false);
                        }
                    });
                }
            }
        }, true);
        this.addMouseListener({
            mousePressed() {
                popupMenu.setData("close", false);
            }
        }, true);
        
        this.setBackground("#f2f2f2");
        this.setStyle("border", "1px solid gray");
        this.setStyle("padding", "4px 0");
        this.setStyle("position", "absolute");
        this.setVisible(false);
        this.setZIndex(JSLayeredPane.POPUP_LAYER);
    }
    init(): void {
        this.addClass("JSPopupMenu");
    }
    add(component: JSComponent): void {
        var selection: JSSelection = this.getSelection();
        if (!selection) {
            selection = new JSSelection();
            this.setSelection(selection);
        }
        selection.add(component);
        super.add(component);
    }
    addSeparator(): void {
        this.add(new JSSeparator());
    }
    getInvoker(): JSComponent {
        return this.invoker;
    }
    setInvoker(invoker: JSComponent) {
        this.invoker = invoker;
    }
    show(invoker: JSComponent, x: number, y: number): void {
        if (!(invoker instanceof JSMenu)) {
            var body: JSBody = JSBody.getInstance();
            body.setPopupMenu(this);
        }
        this.setInvoker(invoker);
        this.setX(x);
        this.setY(y);
        this.setSelected(true);
        this.setData("close", false);
    }
    setSelected(selected: boolean) {
        this.setVisible(selected);
        if (!selected) {
            var selection: JSSelection = this.getSelection();
            if (selection) {
                selection.setSelected(null);
            }
        }
        super.setSelected(selected);
    }
}