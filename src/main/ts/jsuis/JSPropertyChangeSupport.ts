/// <reference path = "../jsuis.ts"/>
/**
 * JSPropertyChangeSupport
 * 
 * @author Yassuo Toda
 */
class JSPropertyChangeSupport {
    
    propertyChangeListeners: JSPropertyChangeListener[];
    
    getPropertyChangeListeners(): JSPropertyChangeListener[] {
        var propertyChangeListeners: JSPropertyChangeListener[] = this.propertyChangeListeners;
        if (propertyChangeListeners === undefined) {
            propertyChangeListeners = [];
            this.propertyChangeListeners = propertyChangeListeners;
        }
        return propertyChangeListeners;
    }
    addPropertyChangeListener(propertyChangeListener: JSPropertyChangeListener) {
        var propertyChangeListeners: JSPropertyChangeListener[] = this.getPropertyChangeListeners();
        propertyChangeListeners.push(propertyChangeListener);
    }
    removePropertyChangeListener(propertyChangeListener: JSPropertyChangeListener) {
        var propertyChangeListeners: JSPropertyChangeListener[] = this.getPropertyChangeListeners();
        var index = propertyChangeListeners.indexOf(propertyChangeListener);
        if (index !== -1) {
            propertyChangeListeners.splice(index, 1);
        }
    }
    firePropertyChange(propertyChangeEvent: JSPropertyChangeEvent): void {
        var propertyChangeListeners: JSPropertyChangeListener[] = this.getPropertyChangeListeners();
        for (var i: number = 0; i < propertyChangeListeners.length; i++) {
            var propertyChangeListener = propertyChangeListeners[i];
            propertyChangeListener.propertyChange.apply(propertyChangeListener, arguments);
        }
    }
}