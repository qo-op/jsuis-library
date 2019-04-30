/// <reference path = "../jsuis.ts"/>
/**
 * JSComboBox
 * 
 * @author Yassuo Toda
 */
class JSComboBox extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLSelectElement);
    constructor(items: Array<string>);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLSelectElement) ? document.createElement("select") : args[0]);
        this.setClass("JSComboBox");
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLSelectElement);
            // constructor(items: Array<string>);
            if (args[0] instanceof HTMLSelectElement) {
            } else if (args[0] instanceof Array) {
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
            var option: JSOption = new JSOption(item);
            this.add(option);
        }
    }
    getSelectedIndex(): number {
        return (<HTMLSelectElement> this.element).selectedIndex;
    }
    getSelectedItem(): any {
        var items: Array<any> = this.getItems();
        var selectedIndex = this.getSelectedIndex();
        return items[selectedIndex];
    }
}