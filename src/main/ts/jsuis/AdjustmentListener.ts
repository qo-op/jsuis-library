/// <reference path = "../jsuis.ts"/>
/**
 * AdjustmentListener
 * 
 * @author Yassuo Toda
 */
interface AdjustmentListener {
    adjustmentValueChanged(event: Event, ...parameters: any[]): void;
}