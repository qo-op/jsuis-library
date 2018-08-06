/// <reference path = "../jsuis.ts"/>
class JSAction {
    
    name: string;
    icon: JSComponent;
    enabled: boolean;
    
    actionListener: ActionListener;
    mouseListener: MouseListener;
    
    propertyChangeSupport: JSPropertyChangeSupport;
    
    constructor();
    constructor(icon: JSComponent);
    constructor(name: string);
    constructor(name: string, icon: JSComponent);
    // overload
    constructor(nameOrIcon?: JSComponent | string, icon?: JSComponent) {
        if (nameOrIcon !== undefined) {
            if (nameOrIcon instanceof JSComponent) {
                this.setIcon(nameOrIcon);
            } else {
                this.setName(nameOrIcon);
                if (icon) {
                    this.setIcon(icon);
                }
            }
        }
        this.setPropertyChangeSupport(new JSPropertyChangeSupport());
    }
    
    getName(): string {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }
    getIcon(): JSComponent {
        return this.icon;
    }
    setIcon(icon: JSComponent) {
        this.icon = icon;
    }
    isEnabled(): boolean {
        return this.enabled;
    }
    setEnabled(enabled: boolean) {
        var oldEnabled = this.isEnabled();
        if (oldEnabled !== enabled) {
            this.enabled = enabled;
            this.firePropertyChange(new JSPropertyChangeEvent(this, "enabled", oldEnabled, enabled));
        }
    }
    getActionListener(): ActionListener {
        return this.actionListener;
    }
    setActionListener(actionListener: ActionListener) {
        this.actionListener = actionListener;
    }
    getMouseListener(): MouseListener {
        return this.mouseListener;
    }
    setMouseListener(mouseListener: MouseListener) {
        this.mouseListener = mouseListener;
    }
    getPropertyChangeSupport(): JSPropertyChangeSupport {
        return this.propertyChangeSupport;
    }
    setPropertyChangeSupport(propertyChangeSupport: JSPropertyChangeSupport) {
        this.propertyChangeSupport = propertyChangeSupport;
    }
    addPropertyChangeListener(propertyChangeListener: PropertyChangeListener) {
        this.getPropertyChangeSupport().addPropertyChangeListener(propertyChangeListener);
    }
    removePropertyChangeListener(propertyChangeListener: PropertyChangeListener) {
        this.getPropertyChangeSupport().removePropertyChangeListener(propertyChangeListener);
    }
    firePropertyChange(propertyChangeEvent: JSPropertyChangeEvent): void {
        this.getPropertyChangeSupport().firePropertyChange(propertyChangeEvent);
    }
}