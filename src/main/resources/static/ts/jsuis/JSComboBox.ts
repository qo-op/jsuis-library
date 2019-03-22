/// <reference path = "../jsuis.ts"/>
class JSComboBox extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLSelectElement);
    constructor(items: Array<string>);
    // overload
    constructor(elementOrItems?: HTMLSelectElement | Array<any>) {
        // constructor();
        // constructor(element: HTMLSelectElement);
        super(elementOrItems === undefined || !(elementOrItems instanceof HTMLSelectElement) ? document.createElement("select") : elementOrItems);
        if (elementOrItems !== undefined && !(elementOrItems instanceof HTMLSelectElement)) {
            // constructor(items: Array<string>);
            this.setItems(elementOrItems);
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
    init(): void {
        this.addClass("JSComboBox");
    }
}