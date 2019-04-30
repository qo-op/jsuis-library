/// <reference path = "../jsuis.ts"/>
/**
 * PropertyChangeListener
 * 
 * @author Yassuo Toda
 */
interface PropertyChangeListener {
    propertyChange(propertyChangeEvent: JSPropertyChangeEvent): void;
}