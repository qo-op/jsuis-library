/// <reference path = "../jsuis.ts"/>
/**
 * JSPanel
 * 
 * @author Yassuo Toda
 */
class JSDialog extends JSPanel {
    
    owner: JSComponent;
    modal: boolean;
    title: string;
    
    constructor();
    constructor(element: HTMLElement);
    constructor(owner: JSComponent);
    constructor(owner: JSComponent, modal: boolean);
    constructor(owner: JSComponent, title: string);
    constructor(owner: JSComponent, title: string, modal: boolean);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setVisible(false);
        switch (args.length) {
        case 0:
            break;
        case 1:
            // constructor(owner: JSComponent);
            if (args[0] instanceof JSComponent) {
                var owner: JSComponent = args[0];
                this.setOwner(owner);
            }
            break;
        case 2:
            // constructor(owner: JSComponent, modal: boolean);
            // constructor(owner: JSComponent, title: string);
            if (args[0] instanceof JSComponent && typeof args[1] === "boolean") {
                var owner: JSComponent = args[0];
                var modal: boolean = args[1];
                this.setOwner(owner);
                this.setModal(modal);
            } else if (args[0] instanceof JSComponent && typeof args[1] === "string") {
                var owner: JSComponent = args[0];
                var title: string = args[1];
                this.setOwner(owner);
                this.setTitle(title);
            }
            break;
        case 3:
            // constructor(owner: JSComponent, title: string, modal: boolean);
            if (args[0] instanceof JSComponent && typeof args[1] === "string" && typeof args[2] === "boolean") {
                var owner: JSComponent = args[0];
                var title: string = args[1];
                var modal: boolean = args[2];
                this.setOwner(owner);
                this.setTitle(title);
                this.setModal(modal);
            }
            break;
        default:
        }
        this.setZIndex(JSLayeredPane.MODAL_LAYER);
    }
    init(): void {
        this.addClass("JSDialog");
    }
    getOwner(): JSComponent {
        return this.owner;
    }
    setOwner(owner: JSComponent) {
        this.owner = owner;
    }
    isModal(): boolean {
        return this.modal;
    }
    setModal(modal: boolean) {
        this.modal = modal;
    }
    getTitle(): string {
        return this.title;
    }
    setTitle(title: string) {
        this.title = title;
    }
    setVisible(visible: boolean) {
        if (visible) {
            JSBody.getInstance().setPopupMenu(this);
            this.revalidate();
            super.setVisible(visible);
        } else {
            super.setVisible(visible);
            JSBody.getInstance().setPopupMenu(null);
        }
    }
}