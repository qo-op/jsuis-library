/// <reference path = "../jsuis.ts"/>
/**
 * JSFrame
 * 
 * @author Yassuo Toda
 */
class JSFrame extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setVisible(false);
        var body: JSBody = JSBody.getInstance();
        body.setContentPane(this);
        super.setLayout(new JSBorderLayout());
        var titleLabel: JSFrameTitleLabel = this.getTitleLabel();
        super.add(titleLabel, JSLayout.NORTH);
        var menuBarContainer: JSFrameMenuBarContainer = this.getMenuBarContainer();
        super.add(menuBarContainer, JSLayout.NORTH);
        var contentPane: JSComponent = this.getContentPane();
        super.add(contentPane);
    }
    init(): void {
        this.addClass("JSFrame");
    }
    getTitleLabel(): JSFrameTitleLabel {
        var titleLabel: JSFrameTitleLabel = this.getData("frameTitleLabel");
        if (!titleLabel) {
            titleLabel = new JSFrameTitleLabel();
            titleLabel.setPreferredHeight(0);
            this.setData("frameTitleLabel", titleLabel);
        }
        return titleLabel;
    }
    getMenuBarContainer(): JSFrameMenuBarContainer {
        var menuBarContainer: JSFrameMenuBarContainer = this.getData("menuBarContainer");
        if (!menuBarContainer) {
            menuBarContainer = new JSFrameMenuBarContainer();
            this.setData("menuBarContainer", menuBarContainer);
        }
        return menuBarContainer;
    }
    getContentPane(): JSComponent {
        var contentPane: JSComponent = this.getData("contentPane");
        if (!contentPane) {
            contentPane = new JSPanel();
            this.setData("contentPane", contentPane);
        }
        return contentPane;
    }
    setContentPane(contentPane: JSComponent) {
        var oldContentPane: JSComponent = this.getData("contentPane");
        if (oldContentPane) {
            this.remove(oldContentPane);
        }
        if (contentPane) {
            super.add(contentPane);
        }
        this.setData("contentPane", contentPane);
    }
    getTitle(): string {
        var titleLabel: JSFrameTitleLabel = this.getTitleLabel();
        return titleLabel.getText();
    }
    setTitle(title: string) {
        var titleLabel: JSFrameTitleLabel = this.getTitleLabel();
        titleLabel.setText(title);
        if (title) {
            titleLabel.setPreferredHeight(null);
        }
        if (this.isValid()) {
            this.revalidate();
        }
    }
    setMenuBar(menuBar: JSMenuBar) {
        var menuBarContainer: JSFrameMenuBarContainer = this.getMenuBarContainer();
        menuBarContainer.add(menuBar);
    }
    setLayout(layout: JSLayout) {
        var contentPane: JSComponent = this.getContentPane();
        contentPane.setLayout(layout);
    }
    add(component: JSComponent): void;
    add(component: JSComponent, constraints: number | string | { [ key: string ]: number | string }): void;
    add(component: JSComponent, constraints: number | string | { [ key: string ]: number | string }, index: number): void;
    // overload
    add(): void {
        var contentPane: JSComponent = this.getContentPane();
        contentPane.add.apply(this, arguments);
    }
    setVisible(visible: boolean) {
        if (visible) {
            var body: JSBody = JSBody.getInstance();
            body.revalidate();
        }
        super.setVisible(visible);
    }
}