/// <reference path = "../jsuis.ts"/>
/**
 * JSActionListener
 * 
 * @author Yassuo Toda
 */
class JSRunnable implements Runnable {
    
    run: (...parameters: any[]) => void;
    
    pid: number;
    
    parameters: any[] = [];
    
    constructor(runnable: Runnable) {
        var jsRunnable: JSRunnable = this;
        this.run = function() {
            var parameters: any[] = jsRunnable.getParameters().slice();
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
