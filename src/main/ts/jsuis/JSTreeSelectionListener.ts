/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeSelectionListener
 * 
 * @author Yassuo Toda
 */
interface JSTreeSelectionListener {
    valueChanged(treeSelectionEvent: JSTreeSelectionEvent, ...parameters: any[]): void;
}