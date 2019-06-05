/// <reference path = "../jsuis.ts"/>
/**
 * TreeSelectionListener
 * 
 * @author Yassuo Toda
 */
interface TreeSelectionListener {
    valueChanged(treeSelectionEvent: JSTreeSelectionEvent, ...parameters: any[]): void;
}