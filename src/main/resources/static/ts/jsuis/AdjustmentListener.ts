/// <reference path = "../jsuis.ts"/>
interface AdjustmentListener {
    adjustmentValueChanged(event: Event, component?: JSComponent): void;
}