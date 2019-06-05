/// <reference path = "../jsuis.ts"/>
/**
 * PropertyChangeListener
 * 
 * @author Yassuo Toda
 */
interface PropertyChangeListener {
    propertyChange(propertyChangeEvent: JSPropertyChangeEvent, ...parameters: any[]): void;
    getSource?(): JSComponent;
}