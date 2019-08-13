/// <reference path = "../jsuis.ts"/>
/**
 * JSAction
 * 
 * @author Yassuo Toda
 */
class JSAction implements JSActionListener {
    
    name: string;
    icon: JSIcon;
    enabled: boolean = true;
    
    propertyChangeSupport: JSPropertyChangeSupport;
    
    constructor();
    constructor(icon: JSIcon);
    constructor(name: string);
    constructor(name: string, icon: JSIcon);
    // overload
    constructor() {
        // constructor();
        switch (arguments.length) {
        case 1:
            // constructor(icon: JSIcon);
            // constructor(name: string);
            if (arguments[0] instanceof JSIcon) {
                var icon: JSIcon = arguments[0];
                this.setIcon(icon);
            } else if (typeof arguments[0] === "string") {
                var name: string = arguments[0];
                this.setName(name);
            }
            break;
        case 2:
            // constructor(name: string, icon: JSIcon);
            if (typeof arguments[0] === "string" && arguments[1] instanceof JSIcon) {
                var name: string = arguments[0];
                var icon: JSIcon = arguments[1];
                this.setName(name);
                this.setIcon(icon);
            }
            break;
        default:
        }
        this.setPropertyChangeSupport(new JSPropertyChangeSupport());
    }
    getName(): string {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }
    getIcon(): JSIcon {
        return this.icon;
    }
    setIcon(icon: JSIcon) {
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
    actionPerformed(event: Event): void {
    }
    getPropertyChangeSupport(): JSPropertyChangeSupport {
        return this.propertyChangeSupport;
    }
    setPropertyChangeSupport(propertyChangeSupport: JSPropertyChangeSupport) {
        this.propertyChangeSupport = propertyChangeSupport;
    }
    addPropertyChangeListener(propertyChangeListener: JSPropertyChangeListener) {
        this.getPropertyChangeSupport().addPropertyChangeListener(propertyChangeListener);
    }
    removePropertyChangeListener(propertyChangeListener: JSPropertyChangeListener) {
        this.getPropertyChangeSupport().removePropertyChangeListener(propertyChangeListener);
    }
    firePropertyChange(propertyChangeEvent: JSPropertyChangeEvent): void {
        this.getPropertyChangeSupport().firePropertyChange(propertyChangeEvent);
    }
    toString(): string {
        return this.getName();
    }        
}