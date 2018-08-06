/// <reference path = "../jsuis.ts"/>
class JSComboBox extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLSelectElement);
    constructor(items: Array<string>);
    // overload
    constructor(elementOrItems?: HTMLSelectElement | Array<string>) {
        // constructor();
        // constructor(element: HTMLSelectElement);
        super(elementOrItems === undefined || !(elementOrItems instanceof HTMLSelectElement) ? document.createElement("select") : elementOrItems);
        if (elementOrItems !== undefined && !(elementOrItems instanceof HTMLSelectElement)) {
            // constructor(items: Array<string>);
            for (var i: number = 0; i < elementOrItems.length; i++) {
                var item: string = elementOrItems[i];
                var option: JSOption = new JSOption(item);
                this.add(option);
            }
        }
    }
    init(): void {
        this.addClass("JSComboBox");
    }
}