/// <reference path = "../jsuis.ts"/>
/**
 * JSSplitPane
 * 
 * @author Yassuo Toda
 */
class JSSplitPane extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(orientation: string);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        
        switch (args.length) {
        case 1:
            // constructor(selected: boolean);
            if (typeof args[0] === "string") {
                var orientation: string = args[0];
                this.setOrientation(orientation);
            }
            break;
        default:
        }
        
        this.setLayout(new JSSplitPaneLayout());
        
        var leftContainer: JSSplitPaneLeftContainer = this.getLeftContainer();
        this.add(leftContainer);
        
        var divider: JSSplitPaneDivider = this.getDivider();
        this.add(divider);
        
        var rightContainer: JSSplitPaneRightContainer = this.getRightContainer();
        this.add(rightContainer);
        
        this.setDividerSize(4);
        
        this.setDividerProportionalLocation(.5);
    }
    init(): void {
        this.addClass("JSSplitPane");
    }
    getOrientation(): string {
        return this.getAttribute("data-orientation");
    }
    private setOrientation(orientation: string) {
        this.setAttribute("data-orientation", orientation);
    }
    getLeftContainer(): JSSplitPaneLeftContainer {
        var leftContainer: JSSplitPaneLeftContainer = this.getData("leftContainer");
        if (!leftContainer) {
            leftContainer = new JSSplitPaneLeftContainer();
            this.setData("leftContainer", leftContainer);
        }
        return leftContainer;
    }
    getRightContainer(): JSSplitPaneRightContainer {
        var rightContainer: JSSplitPaneRightContainer = this.getData("rightContainer");
        if (!rightContainer) {
            rightContainer = new JSSplitPaneRightContainer();
            this.setData("rightContainer", rightContainer);
        }
        return rightContainer;
    }
    getLeftComponent(): JSComponent {
        var leftContainer: JSSplitPaneLeftContainer = this.getLeftContainer();
        var components: JSComponent[] = leftContainer.getComponents();
        if (components.length === 1) {
            return components[0];
        }
        return null;
    }
    setLeftComponent(leftComponent: JSComponent) {
        var leftContainer: JSSplitPaneLeftContainer = this.getLeftContainer();
        leftContainer.removeAll();
        leftContainer.add(leftComponent);
    }
    getRightComponent(): JSComponent {
        var rightContainer: JSSplitPaneRightContainer = this.getRightContainer();
        var components: JSComponent[] = rightContainer.getComponents();
        if (components.length === 1) {
            return components[0];
        }
        return null;
    }
    setRightComponent(rightComponent: JSComponent) {
        var rightContainer: JSSplitPaneRightContainer = this.getRightContainer();
        rightContainer.removeAll();
        rightContainer.add(rightComponent);
    }
    getTopComponent(): JSComponent {
        return this.getLeftComponent();
    }
    setTopComponent(component: JSComponent) {
        this.setLeftComponent(component);
    }
    getBottomComponent(): JSComponent {
        return this.getRightComponent();
    }
    setBottomComponent(component: JSComponent) {
        this.setRightComponent(component);
    }
    getDivider(): JSSplitPaneDivider {
        var divider: JSSplitPaneDivider = this.getData("divider");
        if (!divider) {
            divider = new JSSplitPaneDivider();
            var orientation: string = this.getOrientation();
            divider.setCursor(orientation === JSSplitPane.VERTICAL_SPLIT ? "ns-resize" : "ew-resize");
            this.setData("divider", divider);
        }
        return divider;
    }
    getDividerSize() {
        return +this.getAttribute("data-divider-size");
    }
    setDividerSize(dividerSize: number) {
        this.setAttribute("data-divider-size", "" + dividerSize);
    }
    dividerLocation: number;
    getDividerLocation(): number {
        return this.dividerLocation;
    }
    setDividerLocation(dividerLocation: number, dividerProportionalLocation: number = 0): void {
        this.dividerLocation = dividerLocation;
        this.dividerProportionalLocation = dividerProportionalLocation;
        this.validate();
    }
    dividerProportionalLocation: number
    getDividerProportionalLocation(): number {
        return this.dividerProportionalLocation;
    }
    setDividerProportionalLocation(dividerProportionalLocation: number) {
        this.dividerProportionalLocation = dividerProportionalLocation;
        this.dividerLocation = 0;
        this.validate();
    }
    getMinimumDividerLocation(): number {
        return 0;
    }
    getMaximumDividerLocation(): number {
        var dividerSize = this.getDividerSize();
        var orientation: string = this.getOrientation();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            return this.getHeight() - dividerSize;
        } else {
            return this.getWidth() - dividerSize;
        }
    }
}