/// <reference path = "../tutorial.ts"/>
/**
 * JSUIS tutorial
 */
class JSTutorial extends JSFrame {
    
    constructor() {
        super();
        
        this.setLayout(new JSBorderLayout());
        
        var titleLabel: JSLabel = this.getTitleLabel();
        this.add(titleLabel, JSBorderLayout.NORTH);
        
        var tabbedPane: JSTabbedPane = this.getTabbedPane();
        
        var tabContainer: JSTabContainer = tabbedPane.getTabContainer();
        tabContainer.setBorder(new JSMatteBorder(1, 1, 1, 0, "gray"));
        this.add(tabContainer, JSBorderLayout.WEST);
        
        var tabbedPaneButtonContainer: JSPanel = this.getTabbedPaneButtonContainer();
        tabContainer.add(tabbedPaneButtonContainer, JSFlowLayout.HORIZONTAL);
        
        var collapseButton: JSButton = this.getCollapseButton();
        tabbedPaneButtonContainer.add(collapseButton);
        
        var expandButton: JSButton = this.getExpandButton();
        tabbedPaneButtonContainer.add(expandButton);
        
        var splitPane: JSSplitPane = this.getSplitPane();
        this.add(splitPane);
        
        var cardContainer: JSPanel = tabbedPane.getCardContainer();
        cardContainer.setBorder(new JSMatteBorder(1, 0, 1, 1, "gray"));
        splitPane.setLeftComponent(cardContainer);
        
        var rightContainer = splitPane.getRightContainer();
        rightContainer.setStyle("border", "1px solid gray");
        
        var tutorialsTree: JSTree = this.getTutorialsTree();
        tabbedPane.addTab("Tutorials", new JSIcon("img/baseline-local_library-24px.svg", 24, 24), new JSScrollPane(tutorialsTree));
        
        var tutorialsRoot: JSTreeNode = this.getTutorialsRoot();
        tutorialsTree.setRoot(tutorialsRoot);
        var containerTutorialsTreeNode: JSTreeNode = new JSTreeNode("Container tutorials");
        tutorialsRoot.add(containerTutorialsTreeNode);
        var frameTutorialTreeNode = new JSTreeNode("How to use JS Frame");
        containerTutorialsTreeNode.add(frameTutorialTreeNode);
        var componentTutorialsTreeNode: JSTreeNode = new JSTreeNode("Component tutorials");
        tutorialsRoot.add(componentTutorialsTreeNode);
        var buttonTutorialTreeNode = new JSTreeNode("How to use JS Button");
        componentTutorialsTreeNode.add(buttonTutorialTreeNode);
        
        var examplesTree: JSTree = this.getExamplesTree();
        tabbedPane.addTab("Examples", new JSIcon("img/baseline-playlist_play-24px.svg", 24, 24), new JSScrollPane(examplesTree));
        
        var examplesRoot: JSTreeNode = this.getExamplesRoot();
        examplesTree.setRoot(examplesRoot);
        var containerExamplesTreeNode: JSTreeNode = new JSTreeNode("Container examples");
        examplesRoot.add(containerExamplesTreeNode);
        var frameExampleTreeNode = new JSTreeNode("JS Frame example");
        containerExamplesTreeNode.add(frameExampleTreeNode);
        var componentExamplesTreeNode: JSTreeNode = new JSTreeNode("Component examples");
        examplesRoot.add(componentExamplesTreeNode);
        var buttonExampleTreeNode = new JSTreeNode("JS Button example");
        componentExamplesTreeNode.add(buttonExampleTreeNode);
        
        tabbedPane.setSelectedIndex(0);
        tutorialsTree.expand(containerTutorialsTreeNode);
        tutorialsTree.expand(componentTutorialsTreeNode);
        examplesTree.expand(containerExamplesTreeNode);
        examplesTree.expand(componentExamplesTreeNode);
        
        collapseButton.addActionListener({
            actionPerformed(mouseEvent: MouseEvent, tutorial: JSTutorial) {
                var splitPane: JSSplitPane = tutorial.getSplitPane();
                splitPane.putClientProperty("leftContainerPreferredOuterWidth", splitPane.getLeftContainer().getPreferredOuterWidth());
                splitPane.setDividerLocation(1);
                var tabbedPaneButtonContainer: JSPanel = tutorial.getTabbedPaneButtonContainer();
                var cardLayout: JSCardLayout = <JSCardLayout> tabbedPaneButtonContainer.getLayout();
                cardLayout.last(tabbedPaneButtonContainer);
            }
        }).withArgs(this);
        
        var actionListener = {
            actionPerformed(mouseEvent: MouseEvent, tutorial: JSTutorial) {
                var splitPane: JSSplitPane = tutorial.getSplitPane();
                splitPane.setDividerLocation(splitPane.getClientProperty("leftContainerPreferredOuterWidth"));
                var tabbedPaneButtonContainer: JSPanel = tutorial.getTabbedPaneButtonContainer();
                var cardLayout: JSCardLayout = <JSCardLayout> tabbedPaneButtonContainer.getLayout();
                cardLayout.first(tabbedPaneButtonContainer);
            }
        };
        
        expandButton.addActionListener(actionListener).withArgs(this);
        tabbedPane.getTabComponentAt(0).addActionListener(actionListener).withArgs(this);
        tabbedPane.getTabComponentAt(1).addActionListener(actionListener).withArgs(this);
    }
    getTitleLabel(): JSLabel {
        var titleLabel: JSLabel = this.getData("titleLabel");
        if (!titleLabel) {
            titleLabel = new JSLabel("JSUIS - JavaScript User Interface", JSLabel.CENTER).withName("title");
            titleLabel.setStyle("padding", "8px");
            titleLabel.setBackground("gainsboro");
            this.setData("titleLabel", titleLabel);
        }
        return titleLabel;
    }
    getTabbedPane(): JSTabbedPane {
        var tabbedPane: JSTabbedPane = this.getData("tabbedPane");
        if (!tabbedPane) {
            tabbedPane = new JSTabbedPane(JSTabbedPane.LEFT);
            this.setData("tabbedPane", tabbedPane);
        }
        return tabbedPane;
    }
    getTabbedPaneButtonContainer(): JSPanel {
        var tabbedPaneButtonContainer: JSPanel = this.getData("tabbedPaneButtonContainer");
        if (!tabbedPaneButtonContainer) {
            tabbedPaneButtonContainer = new JSPanel(new JSCardLayout());
            tabbedPaneButtonContainer.setAlign(JSFlowLayout.TOP);
            tabbedPaneButtonContainer.setStyle("border-bottom", "1px solid darkGray");
            this.setData("tabbedPaneButtonContainer", tabbedPaneButtonContainer);
        }
        return tabbedPaneButtonContainer;
    }
    getCollapseButton(): JSButton {
        var collapseButton: JSButton = this.getData("collapseButton");
        if (!collapseButton) {
            collapseButton = new JSButton(new JSIcon("img/baseline-keyboard_arrow_left-24px.svg", 24, 24));
            collapseButton.setUndecorated(true);
            this.setData("collapseButton", collapseButton);
        }
        return collapseButton;
    }
    getExpandButton(): JSButton {
        var expandButton: JSButton = this.getData("expandButton");
        if (!expandButton) {
            expandButton = new JSButton(new JSIcon("img/baseline-keyboard_arrow_right-24px.svg", 24, 24));
            expandButton.setUndecorated(true);
            this.setData("expandButton", expandButton);
        }
        return expandButton;
    }
    getSplitPane(): JSSplitPane {
        var splitPane: JSSplitPane = this.getData("splitPane");
        if (!splitPane) {
            splitPane = new JSSplitPane();
            splitPane.getDivider().setStyle("background-color", "gainsboro")
            this.setData("splitPane", splitPane);
        }
        return splitPane;
    }
    getTutorialsTree(): JSTree {
        var tutorialTree: JSTree = this.getData("tutorialTree");
        if (!tutorialTree) {
            tutorialTree = new JSTree();
            tutorialTree.setRootVisible(false);
            this.setData("tutorialTree", tutorialTree);
        }
        return tutorialTree;
    }
    getTutorialsRoot(): JSTreeNode {
        var tutorialRoot: JSTreeNode = this.getData("tutorialRoot");
        if (!tutorialRoot) {
            tutorialRoot = new JSTreeNode("JSUIS library");
            this.setData("tutorialRoot", tutorialRoot);
        }
        return tutorialRoot;
    }
    getExamplesTree(): JSTree {
        var exampleTree: JSTree = this.getData("exampleTree");
        if (!exampleTree) {
            exampleTree = new JSTree();
            exampleTree.setRootVisible(false);
            this.setData("exampleTree", exampleTree);
        }
        return exampleTree;
    }
    getExamplesRoot(): JSTreeNode {
        var exampleRoot: JSTreeNode = this.getData("exampleRoot");
        if (!exampleRoot) {
            exampleRoot = new JSTreeNode("JSUIS library");
            this.setData("exampleRoot", exampleRoot);
        }
        return exampleRoot;
    }
}
