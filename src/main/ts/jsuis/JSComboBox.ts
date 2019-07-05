/// <reference path = "../jsuis.ts"/>
/**
 * JSComboBox
 * 
 * @author Yassuo Toda
 */
class JSComboBox extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(items: Array<string>);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLSelectElement) ? document.createElement("select") : arguments[0]);
        this.setUI("JSComboBox");
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
        return this.getData("items");
    }
    setItems(items: Array<any>) {
        this.setData("items", items);
        this.removeAll();
        for (var i: number = 0; i < items.length; i++) {
            var item: any = items[i];
            var option: JSOption = new JSOption(item.toString());
            this.add(option);
        }
    }
    getSelectedIndex(): number {
        return (<HTMLSelectElement> this.element).selectedIndex;
    }
    setSelectedIndex(selectedIndex: number) {
        (<HTMLSelectElement> this.element).selectedIndex = selectedIndex;
        this.fireActionPerformed(null);
    }
    getSelectedItem(): any {
        var items: Array<any> = this.getItems();
        var selectedIndex = this.getSelectedIndex();
        return items[selectedIndex];
    }
    addActionListener(actionListener: ActionListener, useCapture?: boolean): JSActionListener {
        var actionListeners: ActionListener[] = this.getActionListeners();
        var jsActionListeners: JSActionListener[] = this.getJSActionListeners();
        var index = actionListeners.indexOf(actionListener);
        if (index !== -1) {
            return jsActionListeners[index];;
        }
        actionListeners.push(actionListener);
        var jsActionListener: JSActionListener = new JSActionListener(actionListener);
        jsActionListeners.push(jsActionListener);
        var changeListener: ChangeListener = this.getData("changeListener" + !!useCapture);
        if (!changeListener) {
            changeListener = {
                stateChanged(event: Event, source: JSComponent): void {
                    source.fireActionPerformed(event);
                    event.stopPropagation();
                }
            };
            this.addChangeListener(changeListener, !!useCapture).withParameters(this);
            this.setData("changeListener" + !!useCapture, changeListener);
        }
        return jsActionListener.withParameters(this);
    }
}