/// <reference path = "../jsuis.ts"/>
/**
 * JSComponentRunnable
 * 
 * @author Yassuo Toda
 */
class JSComponentRunnable implements JSRunnable {
    
    run: (...parameters: any[]) => void;
    
    pid: number;
    
    parameters: any[] = [];
    
    constructor(runnable: JSRunnable) {
        var componentRunnable: JSComponentRunnable = this;
        this.run = function() {
            var parameters: any[] = componentRunnable.getParameters().slice();
            runnable.run.apply(runnable, parameters);
        }
    }
    getPid(): number {
        return this.pid;
    }
    setPid(pid: number) {
        this.pid = pid;
    }
    getParameters(): any[] {
        return this.parameters;
    }
    setParameters(...parameters: any[]) {
        this.parameters = parameters;
    }
    withParameters(...parameters: any[]) {
        this.parameters = parameters;
        return this;
    }
}
