/// <reference path = "../jsuis.ts"/>
/**
 * JSComboBox
 * 
 * @author Yassuo Toda
 */
class JSComboBox extends JSHTMLComponent {
    
    private items: Array<any>;
    private comboBoxActionListenerHandler: JSComboBoxActionListenerHandler;
    
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
        return this.items;
    }
    setItems(items: Array<any>) {
        this.items = items;
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
    addActionListener(actionListener: JSActionListener): JSComponentActionListener {
        var actionListeners: JSActionListener[] = this.getActionListeners();
        var componentActionListeners: JSComponentActionListener[] = this.getComponentActionListeners();
        var index = actionListeners.indexOf(actionListener);
        if (index !== -1) {
            return componentActionListeners[index];;
        }
        actionListeners.push(actionListener);
        var componentActionListener: JSComponentActionListener = new JSComponentActionListener(actionListener);
        componentActionListeners.push(componentActionListener);
        var comboBoxActionListenerHandler: JSComboBoxActionListenerHandler = this.getComboBoxActionListenerHandler();
        if (!comboBoxActionListenerHandler) {
            comboBoxActionListenerHandler = new JSComboBoxActionListenerHandler(this);
            this.addChangeListener(comboBoxActionListenerHandler);
            this.setComboBoxActionListenerHandler(comboBoxActionListenerHandler);
        }
        return componentActionListener.withParameters(this);
    }
    getComboBoxActionListenerHandler(): JSComboBoxActionListenerHandler {
        return this.comboBoxActionListenerHandler;
    }
    setComboBoxActionListenerHandler(comboBoxActionListenerHandler: JSComboBoxActionListenerHandler) {
        this.comboBoxActionListenerHandler = comboBoxActionListenerHandler;
    }
    
    setAction(action: JSAction) {
        var oldAction: JSAction = this.getAction();
        if (oldAction) {
            this.removeActionListener(oldAction);
        }
        this.action = action;
        this.addActionListener(action);
    }
}