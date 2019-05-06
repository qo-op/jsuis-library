/// <reference path = "../jsuis.ts"/>
/**
 * JSChangeListener
 * 
 * @author Yassuo Toda
 */
class JSChangeListener implements ChangeListener {
    
    stateChanged: (event: Event, ...parameters: any[]) => void;
    
    parameters: any[] = [];
    
    constructor(changeListener: ChangeListener) {
        var jsChangeListener: JSChangeListener = this;
        this.stateChanged = function(event: Event) {
            var args: any[] = jsChangeListener.getArgs().slice();
            args.unshift(event);
            changeListener.stateChanged.apply(changeListener, args);
        }
    }
    getArgs(): any[] {
        return this.parameters;
    }
    setArgs(...parameters: any[]) {
        this.parameters = parameters;
    }
    withArgs(...parameters: any[]) {
        this.parameters = parameters;
        return this;
    }
}