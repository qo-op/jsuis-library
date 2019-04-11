/// <reference path = "../jsuis.ts"/>
/**
 * JSActionEvent
 * 
 * @author Yassuo Toda
 */
class JSActionEvent {
    
    source: any;
    actionCommand: string;
    
    constructor(source: any);
    constructor(source: any, actionCommand: string);
    constructor(source: any, actionCommand?: string) {
        this.setSource(source);
        if (actionCommand !== undefined) {
            this.setActionCommand(actionCommand);
        }
    }
    
    getSource(): any {
        return this.source;
    }
    setSource(source: any) {
        this.source = source;
    }
    getActionCommand(): string {
        return this.actionCommand;
    }
    setActionCommand(actionCommand: string) {
        this.actionCommand = actionCommand;
    }
}