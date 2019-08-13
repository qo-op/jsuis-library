/// <reference path = "../jsuis.ts"/>
/**
 * JSOList
 * 
 * @author Yassuo Toda
 */
class JSOList extends JSHTMLComponent {
    
    private items: Array<any>;
    
    constructor();
    constructor(element: HTMLElement);
    constructor(items: Array<string>);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLOListElement) ? document.createElement("ol") : arguments[0]);
        this.setUI("JSOList");
        switch (arguments.length) {
        case 1:
            // constructor(items: Array<string>);
            if (arguments[0] instanceof Array) {
                var items: Array<any> = arguments[0];
                this.setItems(items);
            }
            break;
        default:
        }
    }
    getItems(): Array<any> {
        return this.items;
    }
    setItems(items: Array<any>) {
        this.items = items;
        for (var i: number = 0; i < items.length; i++) {
            var item: any = items[i];
            var li: JSLI = new JSLI(item);
            this.add(li);
        }
    }
    getType(): string {
        return this.getAttribute("type");
    }
    setType(t: string) {
        this.setAttribute("type", t);
    }
    withType(t: string) {
        this.setType(t);
        return this;
    }
}