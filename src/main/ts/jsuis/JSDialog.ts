/// <reference path = "../jsuis.ts"/>
/**
 * JSPanel
 * 
 * @author Yassuo Toda
 */
class JSDialog extends JSPanel implements MouseListener, ActionListener {
    
    modal: boolean;
    title: string;
    
    constructor();
    constructor(element: HTMLElement);
    constructor(modal: boolean);
    constructor(title: string);
    constructor(title: string, modal: boolean);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSDialog");
        this.setVisible(false);
        
        super.setLayout(new JSBorderLayout());
        
        var index: number = 0;
        
        var titlePanel: JSDialogTitlePanel = this.getTitlePanel();
        super.add(titlePanel, JSLayout.NORTH, index++);
        
        var titleLabel: JSDialogTitleLabel = this.getTitleLabel();
        titlePanel.add(titleLabel);
        titleLabel.setAlign(JSLayout.LEFT_RIGHT);
        
        var closeButton: JSDialogCloseButton = this.getCloseButton();
        titlePanel.add(closeButton, JSLayout.EAST);
        
        var contentPane: JSDialogContentPane = this.getContentPane();
        super.add(contentPane, JSLayout.CENTER, index++);
        
        switch (args.length) {
        case 1:
            // constructor(modal: boolean);
            // constructor(title: string);
            if (typeof args[0] === "boolean") {
                var modal: boolean = args[0];
                this.setModal(modal);
            } else if (typeof args[0] === "string") {
                var title: string = args[0];
                this.setTitle(title);
            }
            break;
        case 2:
            // constructor(title: string, modal: boolean);
            if (typeof args[0] === "string" && typeof args[1] === "boolean") {
                var title: string = args[0];
                var modal: boolean = args[1];
                this.setTitle(title);
                this.setModal(modal);
            }
            break;
        default:
        }
        
        titleLabel.addMouseListener(this);
        
        closeButton.addActionListener(this);
    }
    getTitlePanel(): JSDialogTitlePanel {
        var titlePanel: JSDialogTitlePanel = this.getData("dialogTitlePanel");
        if (!titlePanel) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSDialogTitlePanel");
            if (element) {
                titlePanel = new JSDialogTitlePanel(element);
            } else {
                titlePanel = new JSDialogTitlePanel();
            }
            this.setData("dialogTitlePanel", titlePanel);
        }
        return titlePanel;
    }
    getTitleLabel(): JSDialogTitleLabel {
        var titleLabel: JSDialogTitleLabel = this.getData("dialogTitleLabel");
        if (!titleLabel) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSDialogTitleLabel");
            if (element) {
                titleLabel = new JSDialogTitleLabel(element);
            } else {
                titleLabel = new JSDialogTitleLabel();
            }
            titleLabel.setPreferredHeight(0);
            this.setData("dialogTitleLabel", titleLabel);
        }
        return titleLabel;
    }
    getCloseButton(): JSDialogCloseButton {
        var dialogCloseButton: JSDialogCloseButton = this.getData("dialogCloseButton");
        if (!dialogCloseButton) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSDialogCloseButton");
            if (element) {
                dialogCloseButton = new JSDialogCloseButton(element);
            } else {
                dialogCloseButton = new JSDialogCloseButton();
            }
            this.setData("dialogCloseButton", dialogCloseButton);
        }
        return dialogCloseButton;
    }
    getContentPane(): JSDialogContentPane {
        var contentPane: JSDialogContentPane = this.getData("contentPane");
        if (!contentPane) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSDialogContentPane");
            if (element) {
                contentPane = new JSDialogContentPane(element);
            } else {
                contentPane = new JSDialogContentPane();
            }
            this.setData("contentPane", contentPane);
        }
        return contentPane;
    }
    isModal(): boolean {
        return this.modal;
    }
    setModal(modal: boolean) {
        this.modal = modal;
    }
    getTitle(): string {
        var titleLabel: JSDialogTitleLabel = this.getTitleLabel();
        return titleLabel.getText();
    }
    setTitle(title: string) {
        var titleLabel: JSDialogTitleLabel = this.getTitleLabel();
        titleLabel.setText(title);
        if (title) {
            titleLabel.setPreferredHeight(null);
        }
        if (this.isValid()) {
            this.revalidate();
        }
    }
    setLayout(layout: JSLayout) {
        var contentPane: JSDialogContentPane = this.getContentPane();
        contentPane.setLayout(layout);
    }
    add(component: JSComponent): void;
    add(component: JSComponent, constraints: number | string | { [ key: string ]: number | string }): void;
    add(component: JSComponent, constraints: number | string | { [ key: string ]: number | string }, index: number): void;
    // overload
    add(): void {
        var contentPane: JSDialogContentPane = this.getContentPane();
        contentPane.add.apply(contentPane, arguments);
    }
    setVisible(visible: boolean) {
        if (visible) {
            JSBody.getInstance().setDialog(this);
            this.revalidate();
            super.setVisible(visible);
        } else {
            super.setVisible(visible);
            JSBody.getInstance().setDialog(null);
        }
    }
    mousePressed(mouseEvent: MouseEvent): void {
        this.setData("dx", mouseEvent.x - this.getX());
        this.setData("dy", mouseEvent.y - this.getY());
        mouseEvent.stopPropagation();
    }
    mouseDragged(mouseEvent: MouseEvent): void {
        this.setX(mouseEvent.x - this.getData("dx"));
        this.setY(mouseEvent.y - this.getData("dy"));
        mouseEvent.stopPropagation();
    }
    actionPerformed(mouseEvent: MouseEvent): void {
        this.setVisible(false);
        var body: JSBody = JSBody.getInstance();
        body.getModal().setStyle("display", "none");
        mouseEvent.stopPropagation();
    }
}