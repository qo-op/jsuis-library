/// <reference path = "../jsuis.ts"/>
/**
 * ActionListener
 * 
 * @author Yassuo Toda
 */
interface ActionListener {
    actionPerformed(event: Event, ...parameters: any[]): void;
}