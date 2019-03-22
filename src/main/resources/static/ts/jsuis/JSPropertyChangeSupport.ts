/// <reference path = "../jsuis.ts"/>
class JSPropertyChangeSupport {
    
    propertyChangeListeners: PropertyChangeListener[];
    
    getPropertyChangeListeners(): PropertyChangeListener[] {
        var propertyChangeListeners: PropertyChangeListener[] = this.propertyChangeListeners;
        if (propertyChangeListeners === undefined) {
            propertyChangeListeners = [];
            this.propertyChangeListeners = propertyChangeListeners;
        }
        return propertyChangeListeners;
    }
    addPropertyChangeListener(propertyChangeListener: PropertyChangeListener) {
        var propertyChangeListeners: PropertyChangeListener[] = this.getPropertyChangeListeners();
        propertyChangeListeners.push(propertyChangeListener);
    }
    removePropertyChangeListener(propertyChangeListener: PropertyChangeListener) {
        var propertyChangeListeners: PropertyChangeListener[] = this.getPropertyChangeListeners();
        var index = propertyChangeListeners.indexOf(propertyChangeListener);
        if (index !== -1) {
            propertyChangeListeners.splice(index, 1);
        }
    }
    firePropertyChange(propertyChangeEvent: JSPropertyChangeEvent): void {
        var propertyChangeListeners: PropertyChangeListener[] = this.getPropertyChangeListeners();
        for (var i: number = 0; i < propertyChangeListeners.length; i++) {
            var propertyChangeListener = propertyChangeListeners[i];
            propertyChangeListener.propertyChange(propertyChangeEvent);
        }
    }
}