/// <reference path = "../jsuis.ts"/>
/**
 * JSOList
 * 
 * @author Yassuo Toda
 */
class JSOList extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(items: Array<string>);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLOListElement) ? document.createElement("ol") : args[0]);
        this.setUI("JSOList");
        switch (args.length) {
        case 1:
            // constructor(items: Array<string>);
            if (args[0] instanceof Array) {
                var items: Array<any> = args[0];
                this.setItems(items);
            }
            break;
        default:
        }
    }
    getItems(): Array<any> {
        return this.getData("item");
    }
    setItems(items: Array<any>) {
        this.setData("items", items);
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