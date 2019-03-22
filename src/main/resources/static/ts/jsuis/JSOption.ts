/// <reference path = "../jsuis.ts"/>
class JSOption extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLOptionElement);
    constructor(text: string);
    // overload
    constructor(elementOrText?: HTMLOptionElement | string) {
        // constructor();
        // constructor(element: HTMLOptionElement);
        super(elementOrText === undefined || !(elementOrText instanceof HTMLOptionElement) ? document.createElement("option") : elementOrText);
        if (elementOrText !== undefined && !(elementOrText instanceof HTMLOptionElement)) {
            // constructor(text: string);
            this.setText(elementOrText);
            this.setValue(elementOrText);
        }
    }
    init(): void {
        this.addClass("JSOption");
    }
    getText(): string {
        return (<HTMLOptionElement> this.element).text;
    }
    setText(text: string) {
        (<HTMLOptionElement> this.element).text = "" + text;
    }
    getValue(): string {
        return (<HTMLOptionElement> this.element).value;
    }
    setValue(value: string) {
        (<HTMLOptionElement> this.element).value = value;
    }
}