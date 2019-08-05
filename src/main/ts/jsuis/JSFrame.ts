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
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSFrame");
        this.setLayout(new JSBorderLayout());
        this.setVisible(false);
        var body: JSBody = JSBody.getInstance();
        body.addFrame(this);
    }
    getContentPane(): JSComponent {
        var contentPane: JSComponent = this.getData("contentPane");
        if (!contentPane) {
            contentPane = this;
            this.setContentPane(contentPane);
        }
        return contentPane;
    }
    setContentPane(contentPane: JSComponent) {
        var oldContentPane: JSComponent = this.getData("contentPane");
        if (oldContentPane === contentPane) {
            return;
        }
        if (oldContentPane && oldContentPane !== this) {
            super.remove(oldContentPane);
        }
        if (contentPane && contentPane !== this) {
            super.add(contentPane);
        }
        this.setData("contentPane", contentPane);
    }
    getLayout(): JSLayout {
        var contentPane: JSComponent = this.getContentPane();
        if (contentPane !== this) {
            return contentPane.getLayout();
        } else {
            return super.getLayout();
        }
    }
    setLayout(layout: JSLayout) {
        var contentPane: JSComponent = this.getContentPane();
        if (contentPane !== this) {
            contentPane.setLayout(layout);
        } else {
            super.setLayout(layout);
        }
    }
    /*
    validateHorizontally(): void {
        var validHorizontally: boolean = this.isValidHorizontally();
        if (!validHorizontally) {
            var layout: JSLayout = super.getLayout();
            if (layout) {
                layout.layoutContainerHorizontally(this);
                validHorizontally = this.isValidHorizontally();
                if (!validHorizontally) {
                    JSLayout.validateLater(this);
                }
            } else {
                this.setValidHorizontally(true);
                var components: JSComponent[] = this.getComponents();
                for (var i: number = 0; i < components.length; i++) {
                    var component: JSComponent = components[i];
                    component.setValidHorizontally(false);
                    component.validateHorizontally();
                }
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
                if (!validVertically) {
                    JSLayout.validateLater(this);
                }
            } else {
                this.setValidVertically(true);
                var components: JSComponent[] = this.getComponents();
                for (var i: number = 0; i < components.length; i++) {
                    var component: JSComponent = components[i];
                    component.setValidVertically(false);
                    component.validateVertically();
                }
            }
        }
    }
    */
    add(component: JSComponent): void;
    add(component: JSComponent, constraints: number | string | { [ key: string ]: number | string }): void;
    add(component: JSComponent, constraints: number | string | { [ key: string ]: number | string }, index: number): void;
    // overload
    add(): void {
        var contentPane: JSComponent = this.getContentPane();
        if (contentPane !== this) {
            contentPane.add.apply(contentPane, arguments);
        } else {
            super.add.apply(this, arguments);
        }
    }
    remove(index: number): void;
    remove(component: JSComponent): void;
    // overload
    remove(): void {
        var contentPane: JSComponent = this.getContentPane();
        if (contentPane !== this) {
            contentPane.remove.apply(contentPane, arguments);
        } else {
            super.remove.apply(this, arguments);
        }
    }
    removeAll() {
        var contentPane: JSComponent = this.getContentPane();
        if (contentPane !== this) {
            contentPane.removeAll.apply(contentPane, arguments);
        } else {
            super.removeAll.apply(this, arguments);
        }
    }
    setVisible(visible: boolean) {
        if (visible) {
            var body: JSBody = JSBody.getInstance();
            body.setFrame(this);
            body.revalidate();
        }
        super.setVisible(visible);
    }
}