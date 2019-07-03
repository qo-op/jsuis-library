/// <reference path = "../jsuis.ts"/>
/**
 * JSFrame
 * 
 * @author Yassuo Toda
 */
class JSFrame extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSFrame");
        
        this.setVisible(false);
        
        var body: JSBody = JSBody.getInstance();
        body.setFrame(this);
        
        super.setLayout(new JSBorderLayout());
        
        var contentPane: JSComponent = this.getContentPane();
        super.add(contentPane);
    }
    getContentPane(): JSComponent {
        var contentPane: JSFrameContentPane = this.getData("contentPane");
        if (!contentPane) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSFrameContentPane");
            if (element) {
                contentPane = new JSFrameContentPane(element);
            } else {
                contentPane = new JSFrameContentPane();
            }
            this.setData("contentPane", contentPane);
        }
        return contentPane;
    }
    setContentPane(contentPane: JSComponent) {
        var oldContentPane: JSComponent = this.getData("contentPane");
        if (oldContentPane === contentPane) {
            return;
        }
        if (oldContentPane) {
            super.remove(oldContentPane);
        }
        if (contentPane) {
            super.add(contentPane);
        }
        this.setData("contentPane", contentPane);
    }
    getLayout(): JSLayout {
        var contentPane: JSComponent = this.getContentPane();
        return contentPane.getLayout();
    }
    setLayout(layout: JSLayout) {
        var contentPane: JSComponent = this.getContentPane();
        contentPane.setLayout(layout);
    }
    validateHorizontally(): void {
        var validHorizontally: boolean = this.isValidHorizontally();
        if (!validHorizontally) {
            var layout: JSLayout = super.getLayout();
            if (layout) {
                layout.layoutContainerHorizontally(this);
                validHorizontally = this.isValidHorizontally();
            } else {
                this.setValidHorizontally(true);
                validHorizontally = true;
            }
            if (validHorizontally) {
                this.validateChildrenHorizontally();
            } else {
                JSLayout.validateLater(this);
            }
        }
    }
    validateVertically(): void {
        var validVertically: boolean = this.isValidVertically();
        if (!validVertically) {
            var layout: JSLayout = super.getLayout();
            if (layout) {
                layout.layoutContainerVertically(this);
                validVertically = this.isValidVertically();
            } else {
                this.setValidVertically(true);
                validVertically = true;
            }
            if (validVertically) {
                this.validateChildrenVertically();
            } else {
                JSLayout.validateLater(this);
            }
        }
    }
    add(component: JSComponent): void;
    add(component: JSComponent, constraints: number | string | { [ key: string ]: number | string }): void;
    add(component: JSComponent, constraints: number | string | { [ key: string ]: number | string }, index: number): void;
    // overload
    add(): void {
        var contentPane: JSComponent = this.getContentPane();
        contentPane.add.apply(contentPane, arguments);
    }
    remove(index: number): void;
    remove(component: JSComponent): void;
    // overload
    remove(indexOrComponent: number | JSComponent): void {
        var contentPane: JSComponent = this.getContentPane();
        contentPane.remove.apply(contentPane, arguments);
    }
    removeAll() {
        var contentPane: JSComponent = this.getContentPane();
        contentPane.removeAll.apply(contentPane, arguments);
    }    
    setVisible(visible: boolean) {
        if (visible) {
            var body: JSBody = JSBody.getInstance();
            body.revalidate();
        }
        super.setVisible(visible);
    }
}