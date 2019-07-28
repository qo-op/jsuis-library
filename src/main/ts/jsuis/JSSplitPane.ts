/// <reference path = "../jsuis.ts"/>
/**
 * JSSplitPane
 * 
 * @author Yassuo Toda
 */
class JSSplitPane extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(orientation: string);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSSplitPane");
        
        switch (arguments.length) {
        case 1:
            // constructor(selected: boolean);
            if (typeof arguments[0] === "string") {
                var orientation: string = arguments[0];
                this.setOrientation(orientation);
            }
            break;
        default:
        }
        
        this.setLayout(new JSSplitPaneLayout());
        
        var leftContainer: JSSplitPaneLeftContainer = this.getLeftContainer();
        this.add(leftContainer);
        
        var rightContainer: JSSplitPaneRightContainer = this.getRightContainer();
        this.add(rightContainer);
        
        var divider: JSSplitPaneDivider = this.getDivider();
        this.add(divider);
        
        this.setDividerProportionalLocation(.5);
    }
    init() {
        var divider: JSSplitPaneDivider = this.getDivider();
        divider.addMouseListener(new JSSplitPaneMouseListener(this));
    }
    getOrientation(): string {
        return this.getAttribute("data-orientation");
    }
    setOrientation(orientation: string) {
        this.setAttribute("data-orientation", orientation);
    }
    getLeftContainer(): JSSplitPaneLeftContainer {
        var leftContainer: JSSplitPaneLeftContainer = this.getData("leftContainer");
        if (!leftContainer) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSSplitPaneLeftContainer");
            if (element) {
                leftContainer = new JSSplitPaneLeftContainer(element);
            } else {
                leftContainer = new JSSplitPaneLeftContainer();
            }
            this.setData("leftContainer", leftContainer);
        }
        return leftContainer;
    }
    getRightContainer(): JSSplitPaneRightContainer {
        var rightContainer: JSSplitPaneRightContainer = this.getData("rightContainer");
        if (!rightContainer) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSSplitPaneRightContainer");
            if (element) {
                rightContainer = new JSSplitPaneRightContainer(element);
            } else {
                rightContainer = new JSSplitPaneRightContainer();
            }
            this.setData("rightContainer", rightContainer);
        }
        return rightContainer;
    }
    getDivider(): JSSplitPaneDivider {
        var divider: JSSplitPaneDivider = this.getData("divider");
        if (!divider) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSSplitPaneDivider");
            if (element) {
                divider = new JSSplitPaneDivider(element);
            } else {
                divider = new JSSplitPaneDivider();
            }
            var orientation: string = this.getOrientation();
            if (orientation === JSComponent.VERTICAL_SPLIT) {
                divider.removeClass("horizontal");
                divider.addClass("vertical");
            } else {
                divider.removeClass("vertical");
                divider.addClass("horizontal");
            }
            divider.setCursor(orientation === JSComponent.VERTICAL_SPLIT ? "ns-resize" : "ew-resize");
            this.setData("divider", divider);
        }
        return divider;
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
        if (this.isValid()) {
            leftComponent.revalidate(leftContainer);
        }
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
        if (this.isValid()) {
            rightComponent.revalidate(rightContainer);
        }
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
    getDividerSize() {
        var divider: JSSplitPaneDivider = this.getData("divider");
        var orientation: string = this.getOrientation();
        if (orientation === JSComponent.VERTICAL_SPLIT) {
            return divider.getOuterHeight();
        } else {
            return divider.getOuterWidth();
        }
    }
    setDividerSize(dividerSize: number) {
        var divider: JSSplitPaneDivider = this.getData("divider");
        var orientation: string = this.getOrientation();
        if (orientation === JSComponent.VERTICAL_SPLIT) {
            divider.setOuterHeight(dividerSize);
        } else {
            divider.setOuterWidth(dividerSize);
        }
    }
    dividerLocation: number;
    getDividerLocation(): number {
        return this.dividerLocation;
    }
    setDividerLocation(dividerLocation: number, dividerProportionalLocation: number = 0): void {
        this.dividerLocation = dividerLocation;
        this.dividerProportionalLocation = dividerProportionalLocation;
        if (this.isValid()) {
            this.revalidate(this);
        }
    }
    dividerProportionalLocation: number
    getDividerProportionalLocation(): number {
        return this.dividerProportionalLocation;
    }
    setDividerProportionalLocation(dividerProportionalLocation: number) {
        this.dividerProportionalLocation = dividerProportionalLocation;
        this.dividerLocation = 0;
        if (this.isValid()) {
            this.revalidate(this);
        }
    }
    getMinimumDividerLocation(): number {
        return 0;
    }
    getMaximumDividerLocation(): number {
        var dividerSize = this.getDividerSize();
        var orientation: string = this.getOrientation();
        if (orientation === JSComponent.VERTICAL_SPLIT) {
            return this.getHeight() - dividerSize;
        } else {
            return this.getWidth() - dividerSize;
        }
    }
}