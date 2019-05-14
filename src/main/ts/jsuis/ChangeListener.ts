/// <reference path = "../jsuis.ts"/>
/**
 * ChangeListener
 * 
 * @author Yassuo Toda
 */
interface ChangeListener {
    stateChanged(event: Event, ...parameters: any[]): void;
}