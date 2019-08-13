/// <reference path = "../jsuis.ts"/>
/**
 * JSPropertyChangeListener
 * 
 * @author Yassuo Toda
 */
interface JSPropertyChangeListener {
    propertyChange(propertyChangeEvent: JSPropertyChangeEvent, ...parameters: any[]): void;
    getSource?(): JSComponent;
}