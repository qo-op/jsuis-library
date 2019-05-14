/// <reference path = "../jsuis.ts"/>
/**
 * JSTimer
 * 
 * @author Yassuo Toda
 */
class JSTimer {
    
    pids: { [ key: string ]: any } = {};
    getPids(): { [ key: string ]: any } {
        return this.pids;
    }
    schedule(runnable: Runnable, delay: number): JSRunnable {
        var jsRunnable: JSRunnable = new JSRunnable(runnable);
        var pids: { [ key: string ]: any } = this.getPids();
        var pid: number = setTimeout(function() {
            jsRunnable.run();
            var pid: number = jsRunnable.getPid();
            delete pids["" + pid];
        }, delay);
        pids["" + pid] = null;
        jsRunnable.setPid(pid);
        return jsRunnable;
    }
    cancel(): void {
        var pids: { [ key: string ]: any } = this.getPids();
        for (var pid in pids) {
            clearTimeout(+pid);
            delete pids[pid]; 
        }
    }
}