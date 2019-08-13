/// <reference path = "../jsuis.ts"/>
/**
 * JSAdjustmentListener
 * 
 * @author Yassuo Toda
 */
interface JSAdjustmentListener {
    adjustmentValueChanged(event: Event, ...parameters: any[]): void;
}