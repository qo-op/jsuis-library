/// <reference path = "../jsuis.ts"/>
/**
 * JSForm
 * 
 * @author Yassuo Toda
 */
class JSForm extends JSHTMLComponent {
    
    static POST = "post";
    static GET = "get";
    
    static post(url: string, params?: { [ key: string ]: string }) {
        if (params) {
            new JSForm().post(url, params);
        } else {
            new JSForm().post(url);
        }
    }
    
    constructor();
    constructor(element: HTMLFormElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLFormElement) ? document.createElement("form") : args[0]);
    }
    init(): void {
        this.addClass("JSForm");
    }
    getMethod(): string {
        return (<HTMLFormElement> this.element).method;
    }
    setMethod(method: string) {
        (<HTMLFormElement> this.element).method = method;
    }
    getUrl(): string {
        return (<HTMLFormElement> this.element).action;
    }
    setUrl(url: string) {
        (<HTMLFormElement> this.element).action = url;
    }
    submit() {
        JSBody.getInstance().add(this);
        (<HTMLFormElement> this.element).submit();
    }
    post(url: string, params?: { [ key: string ]: string }) {
        this.setMethod(JSForm.POST);
        this.setUrl(url);
        this.submit();
    }
}
