/// <reference path = "../jsuis.ts"/>
class JSSplitPane extends JSHTMLComponent {
    
    dividerLocation: number = -1;
    dividerProportionalLocation: number = -1;
    lastDividerLocation: number = -1;
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(orientation: string);
    // overload
    constructor(elementOrOrientation?: HTMLDivElement | string) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(elementOrOrientation === undefined || !(elementOrOrientation instanceof HTMLDivElement) ? document.createElement("div") : elementOrOrientation);
        if (elementOrOrientation !== undefined && !(elementOrOrientation instanceof HTMLDivElement)) {
            // constructor(orientation: string);
            this.setOrientation(elementOrOrientation);
        }
        this.setLayout(new JSSplitPaneLayout());
        var orientation: string = this.getOrientation();
        var leftContainer: JSPanel = this.getLeftContainer();
        if (!leftContainer) {
            leftContainer = new JSPanel(new JSBorderLayout());
            leftContainer.setBackground("white");
            leftContainer.setStyle("overflow", "hidden");
            this.add(leftContainer);
            this.setLeftContainer(leftContainer);
        }
        var rightContainer: JSPanel = this.getRightContainer();
        if (!rightContainer) {
            rightContainer = new JSPanel(new JSBorderLayout());
            rightContainer.setBackground("white");
            rightContainer.setStyle("overflow", "hidden");
            this.add(rightContainer);
            this.setRightContainer(rightContainer);
        }
        var divider: JSPanel = this.getDivider();
        if (!divider) {
            divider = new JSPanel(new JSBorderLayout());
            divider.setBackground("#f2f2f2");
            divider.setCursor(orientation === JSSplitPane.VERTICAL_SPLIT ? "ns-resize" : "ew-resize");
            this.add(divider);
            divider.addMouseListener(new JSMouseListener(this, {
                mousePressed(mouseEvent: MouseEvent) {
                    var orientation = this.getOrientation();
                    if (orientation === JSSplitPane.VERTICAL_SPLIT) {
                        this.setData("dy", mouseEvent.y - this.getDividerLocation());
                    } else {
                        this.setData("dx", mouseEvent.x - this.getDividerLocation());
                    }
                },
                mouseDragged(mouseEvent: MouseEvent) {
                    var orientation = this.getOrientation();
                    if (orientation === JSSplitPane.VERTICAL_SPLIT) {
                        var y = mouseEvent.y;
                        if (y) {
                            this.setDividerLocation(y - this.getData("dy"));
                        }
                    } else {
                        var x = mouseEvent.x;
                        if (x) {
                            this.setDividerLocation(x - this.getData("dx"));
                        }
                    }
                }
            }));
            this.setDivider(divider);
        }
    }
    init(): void {
        this.addClass("JSSplitPane");
        this.setDividerSize(4);
    }
    getOrientation(): string {
        return this.getAttribute("data-orientation");
    }
    setOrientation(orientation: string) {
        this.setAttribute("data-orientation", orientation);
    }
    getLeftContainer(): JSPanel {
        return this.getData("leftContainer"); 
    }
    setLeftContainer(leftContainer: JSPanel) {
        this.setData("leftContainer", leftContainer);
    }
    getRightContainer(): JSPanel {
        return this.getData("rightContainer"); 
    }
    setRightContainer(rightContainer: JSPanel) {
        this.setData("rightContainer", rightContainer);
    }
    getLeftComponent(): JSComponent {
        var leftContainer: JSPanel = this.getLeftContainer();
        var components: JSComponent[] = leftContainer.getComponents();
        if (components.length === 1) {
            return components[0];
        }
        return null;
    }
    setLeftComponent(leftComponent: JSComponent) {
        var leftContainer: JSPanel = this.getLeftContainer();
        leftContainer.removeAll();
        leftContainer.add(leftComponent);
    }
    getRightComponent(): JSComponent {
        var rightContainer: JSPanel = this.getRightContainer();
        var components: JSComponent[] = rightContainer.getComponents();
        if (components.length === 1) {
            return components[0];
        }
        return null;
    }
    setRightComponent(rightComponent: JSComponent) {
        var rightContainer: JSPanel = this.getRightContainer();
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
    getDivider(): JSPanel {
        return this.getData("divider");
    }
    setDivider(divider: JSPanel) {
        this.setData("divider", divider);
    }
    getDividerSize() {
        return +this.getAttribute("data-divider-size");
    }
    setDividerSize(dividerSize: number) {
        this.setAttribute("data-divider-size", "" + dividerSize);
    }
    getDividerLocation(): number {
        return this.dividerLocation;
    }
    getDividerProportionalLocation(): number {
        return this.dividerProportionalLocation;
    }
    setDividerProportionalLocation(dividerProportionalLocation: number) {
        this.dividerProportionalLocation = dividerProportionalLocation;
    }
    setDividerLocation(dividerLocation: number) {
        this._setDividerLocation(dividerLocation);
        this.validateChildren();
    }
    _setDividerLocation(dividerLocation: number) {
        dividerLocation = Math.min(Math.max(dividerLocation, this.getMinimumDividerLocation()), this.getMaximumDividerLocation());
        this.dividerLocation = dividerLocation;
        var orientation: string = this.getOrientation();
        var leftContainer: JSPanel = this.getLeftContainer();
        var rightContainer: JSPanel = this.getRightContainer();
        var divider: JSPanel = this.getDivider();
        var dividerSize: number = this.getDividerSize();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            var height: number = this.getHeight();
            divider.setY(dividerLocation);
            rightContainer.setY(dividerLocation + dividerSize);
            leftContainer.setOuterHeight(dividerLocation);
            rightContainer.setOuterHeight(height - dividerLocation - dividerSize);
        } else {
            var width: number = this.getWidth();
            divider.setX(dividerLocation);
            rightContainer.setX(dividerLocation + dividerSize);
            leftContainer.setOuterWidth(dividerLocation);
            rightContainer.setOuterWidth(width - dividerLocation - dividerSize);
        }
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