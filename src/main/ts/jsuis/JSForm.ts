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
        var form: JSForm = new JSForm();
        form.post.apply(form, arguments);
    }
    static get(url: string, params?: { [ key: string ]: string }) {
        var form: JSForm = new JSForm();
        form.get.apply(form, arguments);
    }
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
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
        if (params) {
            for (var key in params) {
                var hiddenInput: JSHiddenInput = new JSHiddenInput(key, params[key]);
                this.add(hiddenInput);
            }
        }
        this.submit();
    }
    get(url: string, params?: { [ key: string ]: string }) {
        this.setMethod(JSForm.GET);
        this.setUrl(url);
        if (params) {
            for (var key in params) {
                var hiddenInput: JSHiddenInput = new JSHiddenInput(key, params[key]);
                this.add(hiddenInput);
            }
        }
        this.submit();
    }
}
