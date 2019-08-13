/// <reference path = "../jsuis.ts"/>
/**
 * JSChangeListener
 * 
 * @author Yassuo Toda
 */
interface JSChangeListener {
    stateChanged(event: Event, ...parameters: any[]): void;
}