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
    schedule(runnable: JSRunnable, delay: number): JSComponentRunnable {
        var componentRunnable: JSComponentRunnable = new JSComponentRunnable(runnable);
        var pids: { [ key: string ]: any } = this.getPids();
        var pid: number = setTimeout(function() {
            componentRunnable.run();
            var pid: number = componentRunnable.getPid();
            delete pids["" + pid];
        }, delay);
        pids["" + pid] = null;
        componentRunnable.setPid(pid);
        return componentRunnable;
    }
    cancel(): void {
        var pids: { [ key: string ]: any } = this.getPids();
        for (var pid in pids) {
            clearTimeout(+pid);
            delete pids[pid]; 
        }
    }
}