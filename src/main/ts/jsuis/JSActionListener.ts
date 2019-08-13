/// <reference path = "../jsuis.ts"/>
/**
 * ActionListener
 * 
 * @author Yassuo Toda
 */
interface JSActionListener {
    actionPerformed(event: Event, ...parameters: any[]): void;
}