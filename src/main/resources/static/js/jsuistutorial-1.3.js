var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var jsuistutorial;
(function (jsuistutorial) {
    var JSUIS_Tutorial = (function () {
        function JSUIS_Tutorial() {
        }
        JSUIS_Tutorial.getInstance = function () {
            if (JSUIS_Tutorial.instance === undefined) {
                JSUIS_Tutorial.instance = new JSUIS_Tutorial();
            }
            return JSUIS_Tutorial.instance;
        };
        JSUIS_Tutorial.prototype.getAboutAction = function () {
            if (!this.action_About) {
                this.action_About = new jsuistutorial.JSAction_About();
                this.action_About.dialog_About = this.getAboutDialog();
            }
            return this.action_About;
        };
        JSUIS_Tutorial.prototype.getCollapseAction = function () {
            if (!this.action_Collapse) {
                this.action_Collapse = new jsuistutorial.JSAction_Collapse();
                this.action_Collapse.panel_ToggleButton = this.getToggleButtonPanel();
                this.action_Collapse.splitPane = this.getSplitPane();
            }
            return this.action_Collapse;
        };
        JSUIS_Tutorial.prototype.getExpandAction = function () {
            if (!this.action_Expand) {
                this.action_Expand = new jsuistutorial.JSAction_Expand();
                this.action_Expand.panel_ToggleButton = this.getToggleButtonPanel();
                this.action_Expand.splitPane = this.getSplitPane();
            }
            return this.action_Expand;
        };
        JSUIS_Tutorial.prototype.getJSButtonExampleAction = function () {
            if (!this.action_JSButtonExample) {
                this.action_JSButtonExample = new jsuistutorial.JSAction_JSButtonExample();
                this.action_JSButtonExample.setIcon(this.getLeafIcon());
            }
            return this.action_JSButtonExample;
        };
        JSUIS_Tutorial.prototype.getJSButtonTutorialAction = function () {
            if (!this.action_JSButtonTutorial) {
                this.action_JSButtonTutorial = new jsuistutorial.JSAction_JSButtonTutorial();
                this.action_JSButtonTutorial.setIcon(this.getLeafIcon());
            }
            return this.action_JSButtonTutorial;
        };
        JSUIS_Tutorial.prototype.getJSFrameExampleAction = function () {
            if (!this.action_JSFrameExample) {
                this.action_JSFrameExample = new jsuistutorial.JSAction_JSFrameExample();
                this.action_JSFrameExample.setIcon(this.getLeafIcon());
            }
            return this.action_JSFrameExample;
        };
        JSUIS_Tutorial.prototype.getJSFrameTutorialAction = function () {
            if (!this.action_JSFrameTutorial) {
                this.action_JSFrameTutorial = new jsuistutorial.JSAction_JSFrameTutorial();
                this.action_JSFrameTutorial.setIcon(this.getLeafIcon());
            }
            return this.action_JSFrameTutorial;
        };
        JSUIS_Tutorial.prototype.getJSTableExampleAction = function () {
            if (!this.action_JSTableExample) {
                this.action_JSTableExample = new jsuistutorial.JSAction_JSTableExample();
                this.action_JSTableExample.setIcon(this.getLeafIcon());
            }
            return this.action_JSTableExample;
        };
        JSUIS_Tutorial.prototype.getJSUISTutorialAction = function () {
            if (!this.action_JSUISTutorial) {
                this.action_JSUISTutorial = new jsuistutorial.JSAction_JSUISTutorial();
                this.action_JSUISTutorial.setIcon(this.getLeafIcon());
            }
            return this.action_JSUISTutorial;
        };
        JSUIS_Tutorial.prototype.getCollapseButton = function () {
            if (!this.button_Collapse) {
                this.button_Collapse = new jsuistutorial.JSButton_Collapse();
                this.button_Collapse.setAction(this.getCollapseAction());
            }
            return this.button_Collapse;
        };
        JSUIS_Tutorial.prototype.getExpandButton = function () {
            if (!this.button_Expand) {
                this.button_Expand = new jsuistutorial.JSButton_Expand();
                this.button_Expand.setAction(this.getExpandAction());
            }
            return this.button_Expand;
        };
        JSUIS_Tutorial.prototype.getAboutDialog = function () {
            if (!this.dialog_About) {
                this.dialog_About = new jsuistutorial.JSDialog_About();
            }
            return this.dialog_About;
        };
        JSUIS_Tutorial.prototype.getFrame = function () {
            if (!this.frame) {
                this.frame = new jsuistutorial.JSFrame_Tutorial();
                this.frame.setLayout(new JSBorderLayout());
                var label_Title = this.getTitleLabel();
                this.frame.add(label_Title, JSBorderLayout.NORTH);
                var menuBar = this.getMenuBar();
                this.frame.add(menuBar, JSBorderLayout.NORTH);
                var tabbedPane = this.getTutorialTabbedPane();
                var tabbedPaneTabContainer_Tutorial = tabbedPane.getTabContainer();
                tabbedPaneTabContainer_Tutorial.addClass("JSTabbedPaneTabContainer_Tutorial");
                this.frame.add(tabbedPaneTabContainer_Tutorial, JSBorderLayout.WEST);
                var splitPane = this.getSplitPane();
                this.frame.add(splitPane);
                var tabbedPaneCardContainer_Tutorial = tabbedPane.getCardContainer();
                splitPane.setLeftComponent(tabbedPaneCardContainer_Tutorial);
                var panel_ToggleButton = this.getToggleButtonPanel();
                panel_ToggleButton.setAlign(JSFlowLayout.TOP);
                tabbedPaneTabContainer_Tutorial.add(panel_ToggleButton);
                var tree_Tutorials = this.getTutorialsTree();
                tabbedPane.addTab("Tutorials", new JSImageIcon("/img/baseline-local_library-24px-GoldenRod.svg", 24, 24), new JSScrollPane(tree_Tutorials));
                var tree_Examples = this.getExamplesTree();
                tabbedPane.addTab("Examples", new JSImageIcon("/img/baseline-playlist_play-24px-Green.svg", 24, 24), new JSScrollPane(tree_Examples));
                tabbedPane.setSelectedIndex(0);
                var action_ExpandButton = this.getExpandAction();
                tabbedPane.getTabComponentAt(0).addActionListener(action_ExpandButton);
                tabbedPane.getTabComponentAt(1).addActionListener(action_ExpandButton);
                splitPane.setDividerLocation(splitPane.getLeftContainer().getPreferredOuterWidth());
                var element = document.getElementById("tutorial");
                if (element) {
                    var div_Tutorial = new JSDiv(element);
                    splitPane.setRightComponent(new JSScrollPane(div_Tutorial));
                }
                else {
                    element = document.getElementById("example");
                    if (element) {
                        var tabbedPane_Example = this.getExampleTabbedPane();
                        splitPane.setRightComponent(tabbedPane_Example);
                    }
                }
                var properties = this.getProperties();
                var panel_ToggleButton_first = JSON.parse(properties.getProperty("panel_ToggleButton_first"));
                if (panel_ToggleButton_first) {
                    var action_Collapse = this.getCollapseAction();
                    action_Collapse.actionPerformed(null);
                }
                else {
                    var splitPane_dividerLocation = JSON.parse(properties.getProperty("splitPane_dividerLocation"));
                    if (splitPane_dividerLocation !== null) {
                        splitPane.setDividerLocation(splitPane_dividerLocation);
                    }
                }
                var tabbedPane_selectedIndex = JSON.parse(properties.getProperty("tabbedPane_selectedIndex"));
                if (tabbedPane_selectedIndex !== null && tabbedPane_selectedIndex !== -1) {
                    var tabbedPane = this.getTutorialTabbedPane();
                    tabbedPane.setSelectedIndex(tabbedPane_selectedIndex);
                }
            }
            return this.frame;
        };
        JSUIS_Tutorial.prototype.getClosedIcon = function () {
            if (!this.icon_Closed) {
                this.icon_Closed = new jsuistutorial.JSIcon_Closed();
            }
            return this.icon_Closed;
        };
        JSUIS_Tutorial.prototype.getLeafIcon = function () {
            if (!this.icon_Leaf) {
                this.icon_Leaf = new jsuistutorial.JSIcon_Leaf();
            }
            return this.icon_Leaf;
        };
        JSUIS_Tutorial.prototype.getOpenIcon = function () {
            if (!this.icon_Open) {
                this.icon_Open = new jsuistutorial.JSIcon_Open();
            }
            return this.icon_Open;
        };
        JSUIS_Tutorial.prototype.getTitleLabel = function () {
            if (!this.label_Title) {
                this.label_Title = new jsuistutorial.JSLabel_Title();
            }
            return this.label_Title;
        };
        JSUIS_Tutorial.prototype.getAboutMenuItem = function () {
            if (!this.menuItem_About) {
                this.menuItem_About = new jsuistutorial.JSMenuItem_About();
                this.menuItem_About.setAction(this.getAboutAction());
            }
            return this.menuItem_About;
        };
        JSUIS_Tutorial.prototype.getJSButtonExampleMenuItem = function () {
            if (!this.menuItem_JSButtonExample) {
                this.menuItem_JSButtonExample = new jsuistutorial.JSMenuItem_JSButtonExample();
                this.menuItem_JSButtonExample.setAction(this.getJSButtonExampleAction());
            }
            return this.menuItem_JSButtonExample;
        };
        JSUIS_Tutorial.prototype.getJSButtonTutorialMenuItem = function () {
            if (!this.menuItem_JSButtonTutorial) {
                this.menuItem_JSButtonTutorial = new jsuistutorial.JSMenuItem_JSButtonTutorial();
                this.menuItem_JSButtonTutorial.setAction(this.getJSButtonTutorialAction());
            }
            return this.menuItem_JSButtonTutorial;
        };
        JSUIS_Tutorial.prototype.getJSFrameExampleMenuItem = function () {
            if (!this.menuItem_JSFrameExample) {
                this.menuItem_JSFrameExample = new jsuistutorial.JSMenuItem_JSFrameExample();
                this.menuItem_JSFrameExample.setAction(this.getJSFrameExampleAction());
            }
            return this.menuItem_JSFrameExample;
        };
        JSUIS_Tutorial.prototype.getJSFrameTutorialMenuItem = function () {
            if (!this.menuItem_JSFrameTutorial) {
                this.menuItem_JSFrameTutorial = new jsuistutorial.JSMenuItem_JSFrameTutorial();
                this.menuItem_JSFrameTutorial.setAction(this.getJSFrameTutorialAction());
            }
            return this.menuItem_JSFrameTutorial;
        };
        JSUIS_Tutorial.prototype.getJSTableExampleMenuItem = function () {
            if (!this.menuItem_JSTableExample) {
                this.menuItem_JSTableExample = new jsuistutorial.JSMenuItem_JSTableExample();
                this.menuItem_JSTableExample.setAction(this.getJSTableExampleAction());
            }
            return this.menuItem_JSTableExample;
        };
        JSUIS_Tutorial.prototype.getJSUISTutorialMenuItem = function () {
            if (!this.menuItem_JSUISTutorial) {
                this.menuItem_JSUISTutorial = new jsuistutorial.JSMenuItem_JSUISTutorial();
                this.menuItem_JSUISTutorial.setAction(this.getJSUISTutorialAction());
            }
            return this.menuItem_JSUISTutorial;
        };
        JSUIS_Tutorial.prototype.getComponentExamplesMenu = function () {
            if (!this.menu_ComponentExamples) {
                this.menu_ComponentExamples = new jsuistutorial.JSMenu_ComponentExamples();
                this.menu_ComponentExamples.setIcon(this.getClosedIcon());
                var menuItem_JSButtonExample = this.getJSButtonExampleMenuItem();
                this.menu_ComponentExamples.add(menuItem_JSButtonExample);
                var menuItem_JSTableExample = this.getJSTableExampleMenuItem();
            }
            return this.menu_ComponentExamples;
        };
        JSUIS_Tutorial.prototype.getComponentTutorialsMenu = function () {
            if (!this.menu_ComponentTutorials) {
                this.menu_ComponentTutorials = new jsuistutorial.JSMenu_ComponentTutorials();
                this.menu_ComponentTutorials.setIcon(this.getClosedIcon());
                var menuItem_JSButtonTutorial = this.getJSButtonTutorialMenuItem();
                this.menu_ComponentTutorials.add(menuItem_JSButtonTutorial);
            }
            return this.menu_ComponentTutorials;
        };
        JSUIS_Tutorial.prototype.getContainerExamplesMenu = function () {
            if (!this.menu_ContainerExamples) {
                this.menu_ContainerExamples = new jsuistutorial.JSMenu_ContainerExamples();
                this.menu_ContainerExamples.setIcon(this.getClosedIcon());
                var menuItem_JSFrameExample = this.getJSFrameExampleMenuItem();
                this.menu_ContainerExamples.add(menuItem_JSFrameExample);
            }
            return this.menu_ContainerExamples;
        };
        JSUIS_Tutorial.prototype.getContainerTutorialsMenu = function () {
            if (!this.menu_ContainerTutorials) {
                this.menu_ContainerTutorials = new jsuistutorial.JSMenu_ContainerTutorials();
                this.menu_ContainerTutorials.setIcon(this.getClosedIcon());
                var menuItem_JSFrameTutorial = this.getJSFrameTutorialMenuItem();
                this.menu_ContainerTutorials.add(menuItem_JSFrameTutorial);
            }
            return this.menu_ContainerTutorials;
        };
        JSUIS_Tutorial.prototype.getExamplesMenu = function () {
            if (!this.menu_Examples) {
                this.menu_Examples = new jsuistutorial.JSMenu_Examples();
                var menu_ContainerExamples = this.getContainerExamplesMenu();
                this.menu_Examples.add(menu_ContainerExamples);
                var menu_ComponentExamples = this.getComponentExamplesMenu();
                this.menu_Examples.add(menu_ComponentExamples);
            }
            return this.menu_Examples;
        };
        JSUIS_Tutorial.prototype.getHelpMenu = function () {
            if (!this.menu_Help) {
                this.menu_Help = new jsuistutorial.JSMenu_Help();
                var menuItem_About = this.getAboutMenuItem();
                this.menu_Help.add(menuItem_About);
            }
            return this.menu_Help;
        };
        JSUIS_Tutorial.prototype.getTutorialsMenu = function () {
            if (!this.menu_Tutorials) {
                this.menu_Tutorials = new jsuistutorial.JSMenu_Tutorials();
                var menuItem_JSUISTutorial = this.getJSUISTutorialMenuItem();
                this.menu_Tutorials.add(menuItem_JSUISTutorial);
                this.menu_Tutorials.addSeparator();
                var menu_ContainerTutorials = this.getContainerTutorialsMenu();
                this.menu_Tutorials.add(menu_ContainerTutorials);
                var menu_ComponentTutorials = this.getComponentTutorialsMenu();
                this.menu_Tutorials.add(menu_ComponentTutorials);
            }
            return this.menu_Tutorials;
        };
        JSUIS_Tutorial.prototype.getMenuBar = function () {
            if (!this.menuBar) {
                this.menuBar = new jsuistutorial.JSMenuBar_Tutorial();
                var menu_Tutorials = this.getTutorialsMenu();
                this.menuBar.add(menu_Tutorials);
                var menu_Examples = this.getExamplesMenu();
                this.menuBar.add(menu_Examples);
                var menu_Help = this.getHelpMenu();
                this.menuBar.add(menu_Help);
            }
            return this.menuBar;
        };
        JSUIS_Tutorial.prototype.getToggleButtonPanel = function () {
            if (!this.panel_ToggleButton) {
                this.panel_ToggleButton = new jsuistutorial.JSPanel_ToggleButton();
                var button_Expand = this.getExpandButton();
                this.panel_ToggleButton.add(button_Expand);
                var button_Collapse = this.getCollapseButton();
                this.panel_ToggleButton.add(button_Collapse);
            }
            return this.panel_ToggleButton;
        };
        JSUIS_Tutorial.prototype.getProperties = function () {
            if (!this.properties) {
                this.properties = new jsuistutorial.JSProperties_Tutorial();
            }
            return this.properties;
        };
        JSUIS_Tutorial.prototype.getSplitPane = function () {
            if (!this.splitPane) {
                this.splitPane = new jsuistutorial.JSSplitPane_Tutorial();
            }
            return this.splitPane;
        };
        JSUIS_Tutorial.prototype.getExampleTabbedPane = function () {
            if (!this.tabbedPane_Example) {
                this.tabbedPane_Example = new jsuistutorial.JSTabbedPane_Example();
            }
            return this.tabbedPane_Example;
        };
        JSUIS_Tutorial.prototype.getTutorialTabbedPane = function () {
            if (!this.tabbedPane) {
                this.tabbedPane = new jsuistutorial.JSTabbedPane_Tutorial();
            }
            return this.tabbedPane;
        };
        JSUIS_Tutorial.prototype.getExamplesTree = function () {
            if (!this.tree_Examples) {
                this.tree_Examples = new jsuistutorial.JSTree_Examples();
                var treeCellRenderer_Examples = this.tree_Examples.getTreeCellRenderer();
                treeCellRenderer_Examples.setLeafIcon(this.getLeafIcon());
                treeCellRenderer_Examples.setOpenIcon(this.getOpenIcon());
                treeCellRenderer_Examples.setClosedIcon(this.getClosedIcon());
                var treeNode_ExamplesRoot = new JSTreeNode();
                this.tree_Examples.setRoot(treeNode_ExamplesRoot);
                var treeNode_ContainerExamples = this.getContainerExamplesTreeNode();
                treeNode_ExamplesRoot.add(treeNode_ContainerExamples);
                var treeNode_JSFrameExample = new JSTreeNode(this.getJSFrameExampleAction());
                treeNode_ContainerExamples.add(treeNode_JSFrameExample);
                var treeNode_ComponentExamples = this.getComponentExamplesTreeNode();
                treeNode_ExamplesRoot.add(treeNode_ComponentExamples);
                var treeNode_JSButtonExample = new JSTreeNode(this.getJSButtonExampleAction());
                treeNode_ComponentExamples.add(treeNode_JSButtonExample);
                var properties = this.getProperties();
                var treeNode_ContainerExamples_expanded = JSON.parse(properties.getProperty("treeNode_ContainerExamples_expanded"));
                if (treeNode_ContainerExamples_expanded !== null) {
                    if (treeNode_ContainerExamples_expanded) {
                        this.tree_Examples.expand(treeNode_ContainerExamples);
                    }
                    else {
                        this.tree_Examples.collapse(treeNode_ContainerExamples);
                    }
                }
                else {
                    this.tree_Examples.expand(treeNode_ContainerExamples);
                }
                var treeNode_ComponentExamples_expanded = JSON.parse(properties.getProperty("treeNode_ComponentExamples_expanded"));
                if (treeNode_ComponentExamples_expanded !== null) {
                    if (treeNode_ComponentExamples_expanded) {
                        this.tree_Examples.expand(treeNode_ComponentExamples);
                    }
                    else {
                        this.tree_Examples.collapse(treeNode_ComponentExamples);
                    }
                }
                else {
                    this.tree_Examples.expand(treeNode_ComponentExamples);
                }
            }
            return this.tree_Examples;
        };
        JSUIS_Tutorial.prototype.getTutorialsTree = function () {
            if (!this.tree_Tutorials) {
                this.tree_Tutorials = new jsuistutorial.JSTree_Tutorials();
                var treeCellRenderer_Tutorials = this.tree_Tutorials.getTreeCellRenderer();
                treeCellRenderer_Tutorials.setLeafIcon(this.getLeafIcon());
                treeCellRenderer_Tutorials.setOpenIcon(this.getOpenIcon());
                treeCellRenderer_Tutorials.setClosedIcon(this.getClosedIcon());
                var treeNode_TutorialsRoot = new JSTreeNode();
                this.tree_Tutorials.setRoot(treeNode_TutorialsRoot);
                var treeNode_JSUISTutorials = new JSTreeNode(this.getJSUISTutorialAction());
                treeNode_TutorialsRoot.add(treeNode_JSUISTutorials);
                var treeNode_ContainerTutorials = this.getContainerTutorialsTreeNode();
                treeNode_TutorialsRoot.add(treeNode_ContainerTutorials);
                var treeNode_JSFrameTutorial = new JSTreeNode(this.getJSFrameTutorialAction());
                treeNode_ContainerTutorials.add(treeNode_JSFrameTutorial);
                var treeNode_ComponentTutorials = this.getComponentTutorialsTreeNode();
                treeNode_TutorialsRoot.add(treeNode_ComponentTutorials);
                var treeNode_JSButtonTutorial = new JSTreeNode(this.getJSButtonTutorialAction());
                treeNode_ComponentTutorials.add(treeNode_JSButtonTutorial);
                var properties = this.getProperties();
                var treeNode_ContainerTutorials_expanded = JSON.parse(properties.getProperty("treeNode_ContainerTutorials_expanded"));
                if (treeNode_ContainerTutorials_expanded !== null) {
                    if (treeNode_ContainerTutorials_expanded) {
                        this.tree_Tutorials.expand(treeNode_ContainerTutorials);
                    }
                    else {
                        this.tree_Tutorials.collapse(treeNode_ContainerTutorials);
                    }
                }
                else {
                    this.tree_Tutorials.expand(treeNode_ContainerTutorials);
                }
                var treeNode_ComponentTutorials_expanded = JSON.parse(properties.getProperty("treeNode_ComponentTutorials_expanded"));
                if (treeNode_ComponentTutorials_expanded !== null) {
                    if (treeNode_ComponentTutorials_expanded) {
                        this.tree_Tutorials.expand(treeNode_ComponentTutorials);
                    }
                    else {
                        this.tree_Tutorials.collapse(treeNode_ComponentTutorials);
                    }
                }
                else {
                    this.tree_Tutorials.expand(treeNode_ComponentTutorials);
                }
            }
            return this.tree_Tutorials;
        };
        JSUIS_Tutorial.prototype.getComponentExamplesTreeNode = function () {
            if (!this.treeNode_ComponentExamples) {
                this.treeNode_ComponentExamples = new jsuistutorial.JSTreeNode_ComponentExamples();
            }
            return this.treeNode_ComponentExamples;
        };
        JSUIS_Tutorial.prototype.getComponentTutorialsTreeNode = function () {
            if (!this.treeNode_ComponentTutorials) {
                this.treeNode_ComponentTutorials = new jsuistutorial.JSTreeNode_ComponentTutorials();
            }
            return this.treeNode_ComponentTutorials;
        };
        JSUIS_Tutorial.prototype.getContainerExamplesTreeNode = function () {
            if (!this.treeNode_ContainerExamples) {
                this.treeNode_ContainerExamples = new jsuistutorial.JSTreeNode_ContainerExamples();
            }
            return this.treeNode_ContainerExamples;
        };
        JSUIS_Tutorial.prototype.getContainerTutorialsTreeNode = function () {
            if (!this.treeNode_ContainerTutorials) {
                this.treeNode_ContainerTutorials = new jsuistutorial.JSTreeNode_ContainerTutorials();
            }
            return this.treeNode_ContainerTutorials;
        };
        JSUIS_Tutorial.prototype.getParams = function () {
            var tutorial = JSUIS_Tutorial.getInstance();
            var params = {};
            params["panel_ToggleButton_first"] = "\"" + this.getToggleButtonPanel().isFirst() + "\"";
            params["splitPane_dividerLocation"] = "\"" + this.getSplitPane().getDividerLocation() + "\"";
            params["tabbedPane_selectedIndex"] = "\"" + this.getTutorialTabbedPane().getSelectedIndex() + "\"";
            params["treeNode_ContainerTutorials_expanded"] = "\"" + this.getContainerTutorialsTreeNode().isExpanded() + "\"";
            params["treeNode_ComponentTutorials_expanded"] = "\"" + this.getComponentTutorialsTreeNode().isExpanded() + "\"";
            params["treeNode_ContainerExamples_expanded"] = "\"" + this.getContainerExamplesTreeNode().isExpanded() + "\"";
            params["treeNode_ComponentExamples_expanded"] = "\"" + this.getComponentExamplesTreeNode().isExpanded() + "\"";
            return params;
        };
        return JSUIS_Tutorial;
    }());
    jsuistutorial.JSUIS_Tutorial = JSUIS_Tutorial;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSAction_About = (function (_super) {
        __extends(JSAction_About, _super);
        function JSAction_About() {
            return _super.call(this, "About", new JSImageIcon("/img/baseline-info-24px-Gold.svg", 16, 16)) || this;
        }
        JSAction_About.prototype.actionPerformed = function (mouseEvent) {
            this.dialog_About.setVisible(true);
        };
        return JSAction_About;
    }(JSAction));
    jsuistutorial.JSAction_About = JSAction_About;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSAction_Collapse = (function (_super) {
        __extends(JSAction_Collapse, _super);
        function JSAction_Collapse() {
            return _super.call(this, new JSImageIcon("/img/baseline-keyboard_arrow_left-24px.svg", 24, 24)) || this;
        }
        JSAction_Collapse.prototype.actionPerformed = function (mouseEvent) {
            var splitPaneLeftContainer_Tutorial = this.splitPane.getLeftContainer();
            this.splitPane.setDividerLocation(splitPaneLeftContainer_Tutorial.getBorderRightWidth());
            this.panel_ToggleButton.first();
        };
        return JSAction_Collapse;
    }(JSAction));
    jsuistutorial.JSAction_Collapse = JSAction_Collapse;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSAction_Expand = (function (_super) {
        __extends(JSAction_Expand, _super);
        function JSAction_Expand() {
            return _super.call(this, new JSImageIcon("/img/baseline-keyboard_arrow_right-24px.svg", 24, 24)) || this;
        }
        JSAction_Expand.prototype.actionPerformed = function (mouseEvent) {
            var panel_ToggleButton = this.panel_ToggleButton;
            if (panel_ToggleButton.isFirst()) {
                this.splitPane.setDividerLocation(this.splitPane.getLeftContainer().getPreferredOuterWidth());
                panel_ToggleButton.last();
            }
        };
        return JSAction_Expand;
    }(JSAction));
    jsuistutorial.JSAction_Expand = JSAction_Expand;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSAction_JSButtonExample = (function (_super) {
        __extends(JSAction_JSButtonExample, _super);
        function JSAction_JSButtonExample() {
            return _super.call(this, "JS Button example(s)") || this;
        }
        JSAction_JSButtonExample.prototype.actionPerformed = function (mouseEvent) {
            var tutorial = jsuistutorial.JSUIS_Tutorial.getInstance();
            JSForm.post("/examples/jsbutton", tutorial.getParams());
        };
        return JSAction_JSButtonExample;
    }(JSAction));
    jsuistutorial.JSAction_JSButtonExample = JSAction_JSButtonExample;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSAction_JSButtonTutorial = (function (_super) {
        __extends(JSAction_JSButtonTutorial, _super);
        function JSAction_JSButtonTutorial() {
            return _super.call(this, "How to use JS Button") || this;
        }
        JSAction_JSButtonTutorial.prototype.actionPerformed = function (mouseEvent) {
            var tutorial = jsuistutorial.JSUIS_Tutorial.getInstance();
            JSForm.post("/tutorials/jsbutton", tutorial.getParams());
        };
        return JSAction_JSButtonTutorial;
    }(JSAction));
    jsuistutorial.JSAction_JSButtonTutorial = JSAction_JSButtonTutorial;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSAction_JSFrameExample = (function (_super) {
        __extends(JSAction_JSFrameExample, _super);
        function JSAction_JSFrameExample() {
            return _super.call(this, "JS Frame example(s)") || this;
        }
        JSAction_JSFrameExample.prototype.actionPerformed = function (mouseEvent) {
            var tutorial = jsuistutorial.JSUIS_Tutorial.getInstance();
            JSForm.post("/examples/jsframe", tutorial.getParams());
        };
        return JSAction_JSFrameExample;
    }(JSAction));
    jsuistutorial.JSAction_JSFrameExample = JSAction_JSFrameExample;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSAction_JSFrameTutorial = (function (_super) {
        __extends(JSAction_JSFrameTutorial, _super);
        function JSAction_JSFrameTutorial() {
            return _super.call(this, "How to use JS Frame") || this;
        }
        JSAction_JSFrameTutorial.prototype.actionPerformed = function (mouseEvent) {
            var tutorial = jsuistutorial.JSUIS_Tutorial.getInstance();
            JSForm.post("/tutorials/jsframe", tutorial.getParams());
        };
        return JSAction_JSFrameTutorial;
    }(JSAction));
    jsuistutorial.JSAction_JSFrameTutorial = JSAction_JSFrameTutorial;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSAction_JSTableExample = (function (_super) {
        __extends(JSAction_JSTableExample, _super);
        function JSAction_JSTableExample() {
            return _super.call(this, "JS Table example(s)") || this;
        }
        JSAction_JSTableExample.prototype.actionPerformed = function (mouseEvent) {
            var tutorial = jsuistutorial.JSUIS_Tutorial.getInstance();
            JSForm.post("/examples/jstable", tutorial.getParams());
        };
        return JSAction_JSTableExample;
    }(JSAction));
    jsuistutorial.JSAction_JSTableExample = JSAction_JSTableExample;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSAction_JSUISTutorial = (function (_super) {
        __extends(JSAction_JSUISTutorial, _super);
        function JSAction_JSUISTutorial() {
            return _super.call(this, "How to use JSUIS") || this;
        }
        JSAction_JSUISTutorial.prototype.actionPerformed = function (mouseEvent) {
            var tutorial = jsuistutorial.JSUIS_Tutorial.getInstance();
            JSForm.post("/", tutorial.getParams());
        };
        return JSAction_JSUISTutorial;
    }(JSAction));
    jsuistutorial.JSAction_JSUISTutorial = JSAction_JSUISTutorial;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSButton_Collapse = (function (_super) {
        __extends(JSButton_Collapse, _super);
        function JSButton_Collapse() {
            var _this = _super.call(this) || this;
            _this.setUndecorated(true);
            return _this;
        }
        return JSButton_Collapse;
    }(JSButton));
    jsuistutorial.JSButton_Collapse = JSButton_Collapse;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSButton_Expand = (function (_super) {
        __extends(JSButton_Expand, _super);
        function JSButton_Expand() {
            var _this = _super.call(this) || this;
            _this.setUndecorated(true);
            return _this;
        }
        return JSButton_Expand;
    }(JSButton));
    jsuistutorial.JSButton_Expand = JSButton_Expand;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSDialog_About = (function (_super) {
        __extends(JSDialog_About, _super);
        function JSDialog_About() {
            var _this = _super.call(this, "About", true) || this;
            _this.setLayout(new JSBorderLayout());
            _this.add(new JSParagraph("JSUIS library").withStyle("margin-bottom", "4px"), JSLayout.NORTH);
            var buttonPanel = new JSPanel();
            buttonPanel.setStyle("white-space", "nowrap");
            _this.add(buttonPanel, JSLayout.SOUTH);
            var okButton = new JSButton("OK");
            buttonPanel.add(okButton);
            var cancelButton = new JSButton("Cancel");
            cancelButton.setStyle("margin-left", "4px");
            buttonPanel.add(cancelButton);
            var actionListener = new JSDialogActionListener(_this);
            okButton.addActionListener(actionListener);
            cancelButton.addActionListener(actionListener);
            return _this;
        }
        return JSDialog_About;
    }(JSDialog));
    jsuistutorial.JSDialog_About = JSDialog_About;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSFrame_Tutorial = (function (_super) {
        __extends(JSFrame_Tutorial, _super);
        function JSFrame_Tutorial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return JSFrame_Tutorial;
    }(JSFrame));
    jsuistutorial.JSFrame_Tutorial = JSFrame_Tutorial;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSIcon_Closed = (function (_super) {
        __extends(JSIcon_Closed, _super);
        function JSIcon_Closed() {
            var _this = _super.call(this, "0 0 24 24", "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z", 16, 16) || this;
            _this.setFill("Gold");
            return _this;
        }
        return JSIcon_Closed;
    }(JSPathIcon));
    jsuistutorial.JSIcon_Closed = JSIcon_Closed;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSIcon_Leaf = (function (_super) {
        __extends(JSIcon_Leaf, _super);
        function JSIcon_Leaf() {
            var _this = _super.call(this, "0 0 24 24", "M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z", 16, 16) || this;
            _this.setFill("Silver");
            return _this;
        }
        return JSIcon_Leaf;
    }(JSPathIcon));
    jsuistutorial.JSIcon_Leaf = JSIcon_Leaf;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSIcon_Open = (function (_super) {
        __extends(JSIcon_Open, _super);
        function JSIcon_Open() {
            var _this = _super.call(this, "0 0 24 24", "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z", 16, 16) || this;
            _this.setFill("Gold");
            return _this;
        }
        return JSIcon_Open;
    }(JSPathIcon));
    jsuistutorial.JSIcon_Open = JSIcon_Open;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSLabel_Title = (function (_super) {
        __extends(JSLabel_Title, _super);
        function JSLabel_Title() {
            return _super.call(this, "JSUIS - JavaScript User Interface", JSLabel.CENTER) || this;
        }
        return JSLabel_Title;
    }(JSLabel));
    jsuistutorial.JSLabel_Title = JSLabel_Title;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSMenu_ComponentExamples = (function (_super) {
        __extends(JSMenu_ComponentExamples, _super);
        function JSMenu_ComponentExamples() {
            return _super.call(this, "Component examples") || this;
        }
        return JSMenu_ComponentExamples;
    }(JSMenu));
    jsuistutorial.JSMenu_ComponentExamples = JSMenu_ComponentExamples;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSMenu_ComponentTutorials = (function (_super) {
        __extends(JSMenu_ComponentTutorials, _super);
        function JSMenu_ComponentTutorials() {
            return _super.call(this, "Component tutorials") || this;
        }
        return JSMenu_ComponentTutorials;
    }(JSMenu));
    jsuistutorial.JSMenu_ComponentTutorials = JSMenu_ComponentTutorials;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSMenu_ContainerExamples = (function (_super) {
        __extends(JSMenu_ContainerExamples, _super);
        function JSMenu_ContainerExamples() {
            return _super.call(this, "Container examples") || this;
        }
        return JSMenu_ContainerExamples;
    }(JSMenu));
    jsuistutorial.JSMenu_ContainerExamples = JSMenu_ContainerExamples;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSMenu_ContainerTutorials = (function (_super) {
        __extends(JSMenu_ContainerTutorials, _super);
        function JSMenu_ContainerTutorials() {
            return _super.call(this, "Container tutorials") || this;
        }
        return JSMenu_ContainerTutorials;
    }(JSMenu));
    jsuistutorial.JSMenu_ContainerTutorials = JSMenu_ContainerTutorials;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSMenu_Examples = (function (_super) {
        __extends(JSMenu_Examples, _super);
        function JSMenu_Examples() {
            return _super.call(this, "Examples") || this;
        }
        return JSMenu_Examples;
    }(JSMenu));
    jsuistutorial.JSMenu_Examples = JSMenu_Examples;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSMenu_Help = (function (_super) {
        __extends(JSMenu_Help, _super);
        function JSMenu_Help() {
            return _super.call(this, "Help") || this;
        }
        return JSMenu_Help;
    }(JSMenu));
    jsuistutorial.JSMenu_Help = JSMenu_Help;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSMenu_Tutorials = (function (_super) {
        __extends(JSMenu_Tutorials, _super);
        function JSMenu_Tutorials() {
            return _super.call(this, "Tutorials") || this;
        }
        return JSMenu_Tutorials;
    }(JSMenu));
    jsuistutorial.JSMenu_Tutorials = JSMenu_Tutorials;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSMenuBar_Tutorial = (function (_super) {
        __extends(JSMenuBar_Tutorial, _super);
        function JSMenuBar_Tutorial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return JSMenuBar_Tutorial;
    }(JSMenuBar));
    jsuistutorial.JSMenuBar_Tutorial = JSMenuBar_Tutorial;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSMenuItem_About = (function (_super) {
        __extends(JSMenuItem_About, _super);
        function JSMenuItem_About() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return JSMenuItem_About;
    }(JSMenuItem));
    jsuistutorial.JSMenuItem_About = JSMenuItem_About;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSMenuItem_JSButtonExample = (function (_super) {
        __extends(JSMenuItem_JSButtonExample, _super);
        function JSMenuItem_JSButtonExample() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return JSMenuItem_JSButtonExample;
    }(JSMenuItem));
    jsuistutorial.JSMenuItem_JSButtonExample = JSMenuItem_JSButtonExample;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSMenuItem_JSButtonTutorial = (function (_super) {
        __extends(JSMenuItem_JSButtonTutorial, _super);
        function JSMenuItem_JSButtonTutorial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return JSMenuItem_JSButtonTutorial;
    }(JSMenuItem));
    jsuistutorial.JSMenuItem_JSButtonTutorial = JSMenuItem_JSButtonTutorial;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSMenuItem_JSFrameExample = (function (_super) {
        __extends(JSMenuItem_JSFrameExample, _super);
        function JSMenuItem_JSFrameExample() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return JSMenuItem_JSFrameExample;
    }(JSMenuItem));
    jsuistutorial.JSMenuItem_JSFrameExample = JSMenuItem_JSFrameExample;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSMenuItem_JSFrameTutorial = (function (_super) {
        __extends(JSMenuItem_JSFrameTutorial, _super);
        function JSMenuItem_JSFrameTutorial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return JSMenuItem_JSFrameTutorial;
    }(JSMenuItem));
    jsuistutorial.JSMenuItem_JSFrameTutorial = JSMenuItem_JSFrameTutorial;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSMenuItem_JSTableExample = (function (_super) {
        __extends(JSMenuItem_JSTableExample, _super);
        function JSMenuItem_JSTableExample() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return JSMenuItem_JSTableExample;
    }(JSMenuItem));
    jsuistutorial.JSMenuItem_JSTableExample = JSMenuItem_JSTableExample;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSMenuItem_JSUISTutorial = (function (_super) {
        __extends(JSMenuItem_JSUISTutorial, _super);
        function JSMenuItem_JSUISTutorial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return JSMenuItem_JSUISTutorial;
    }(JSMenuItem));
    jsuistutorial.JSMenuItem_JSUISTutorial = JSMenuItem_JSUISTutorial;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSPanel_ToggleButton = (function (_super) {
        __extends(JSPanel_ToggleButton, _super);
        function JSPanel_ToggleButton() {
            return _super.call(this, new JSCardLayout()) || this;
        }
        JSPanel_ToggleButton.prototype.toggle = function () {
            var cardLayout = this.getLayout();
            var selectedIndex = cardLayout.getSelectedIndex(this);
            var componentCount = this.getComponentCount();
            selectedIndex = (selectedIndex + 1) % componentCount;
            cardLayout.setSelectedIndex(this, selectedIndex);
        };
        JSPanel_ToggleButton.prototype.first = function () {
            var cardLayout = this.getLayout();
            cardLayout.first(this);
        };
        JSPanel_ToggleButton.prototype.last = function () {
            var cardLayout = this.getLayout();
            cardLayout.last(this);
        };
        JSPanel_ToggleButton.prototype.isFirst = function () {
            var cardLayout = this.getLayout();
            var selectedIndex = cardLayout.getSelectedIndex(this);
            return (selectedIndex === 0);
        };
        JSPanel_ToggleButton.prototype.isLast = function () {
            var cardLayout = this.getLayout();
            var selectedIndex = cardLayout.getSelectedIndex(this);
            var componentCount = this.getComponentCount();
            return (selectedIndex === (componentCount - 1));
        };
        return JSPanel_ToggleButton;
    }(JSPanel));
    jsuistutorial.JSPanel_ToggleButton = JSPanel_ToggleButton;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSProperties_Tutorial = (function (_super) {
        __extends(JSProperties_Tutorial, _super);
        function JSProperties_Tutorial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JSProperties_Tutorial.prototype.setProperty = function (key, value) {
            switch (key) {
                case "args":
                    if (value) {
                        var args = JSON.parse(value);
                        for (key in args) {
                            this.setProperty(key, args[key]);
                        }
                    }
                    break;
                default:
                    _super.prototype.setProperty.call(this, key, value);
            }
        };
        return JSProperties_Tutorial;
    }(JSProperties));
    jsuistutorial.JSProperties_Tutorial = JSProperties_Tutorial;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSSplitPane_Tutorial = (function (_super) {
        __extends(JSSplitPane_Tutorial, _super);
        function JSSplitPane_Tutorial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return JSSplitPane_Tutorial;
    }(JSSplitPane));
    jsuistutorial.JSSplitPane_Tutorial = JSSplitPane_Tutorial;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSTabbedPane_Tutorial = (function (_super) {
        __extends(JSTabbedPane_Tutorial, _super);
        function JSTabbedPane_Tutorial() {
            return _super.call(this, JSTabbedPane.LEFT) || this;
        }
        return JSTabbedPane_Tutorial;
    }(JSTabbedPane));
    jsuistutorial.JSTabbedPane_Tutorial = JSTabbedPane_Tutorial;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSTabbedPane_Example = (function (_super) {
        __extends(JSTabbedPane_Example, _super);
        function JSTabbedPane_Example() {
            return _super.call(this, JSTabbedPane.TOP) || this;
        }
        return JSTabbedPane_Example;
    }(JSTabbedPane));
    jsuistutorial.JSTabbedPane_Example = JSTabbedPane_Example;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSTree_Examples = (function (_super) {
        __extends(JSTree_Examples, _super);
        function JSTree_Examples() {
            var _this = _super.call(this) || this;
            _this.setRootVisible(false);
            _this.addMouseListener(_this);
            return _this;
        }
        JSTree_Examples.prototype.mouseClicked = function (mouseEvent) {
            var treeNode = this.getSelectionTreeNode();
            var userObject = treeNode.getUserObject();
            if (userObject instanceof JSAction) {
                var action = userObject;
                action.actionPerformed(null);
            }
        };
        return JSTree_Examples;
    }(JSTree));
    jsuistutorial.JSTree_Examples = JSTree_Examples;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSTree_Tutorials = (function (_super) {
        __extends(JSTree_Tutorials, _super);
        function JSTree_Tutorials() {
            var _this = _super.call(this) || this;
            _this.setRootVisible(false);
            _this.addMouseListener(_this);
            return _this;
        }
        JSTree_Tutorials.prototype.mouseClicked = function (mouseEvent) {
            var treeNode = this.getSelectionTreeNode();
            var userObject = treeNode.getUserObject();
            if (userObject instanceof JSAction) {
                var action = userObject;
                action.actionPerformed(null);
            }
        };
        return JSTree_Tutorials;
    }(JSTree));
    jsuistutorial.JSTree_Tutorials = JSTree_Tutorials;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSTreeNode_ComponentExamples = (function (_super) {
        __extends(JSTreeNode_ComponentExamples, _super);
        function JSTreeNode_ComponentExamples() {
            return _super.call(this, "Component examples") || this;
        }
        return JSTreeNode_ComponentExamples;
    }(JSTreeNode));
    jsuistutorial.JSTreeNode_ComponentExamples = JSTreeNode_ComponentExamples;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSTreeNode_ComponentTutorials = (function (_super) {
        __extends(JSTreeNode_ComponentTutorials, _super);
        function JSTreeNode_ComponentTutorials() {
            return _super.call(this, "Component tutorials") || this;
        }
        return JSTreeNode_ComponentTutorials;
    }(JSTreeNode));
    jsuistutorial.JSTreeNode_ComponentTutorials = JSTreeNode_ComponentTutorials;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSTreeNode_ContainerExamples = (function (_super) {
        __extends(JSTreeNode_ContainerExamples, _super);
        function JSTreeNode_ContainerExamples() {
            return _super.call(this, "Container examples") || this;
        }
        return JSTreeNode_ContainerExamples;
    }(JSTreeNode));
    jsuistutorial.JSTreeNode_ContainerExamples = JSTreeNode_ContainerExamples;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSTreeNode_ContainerTutorials = (function (_super) {
        __extends(JSTreeNode_ContainerTutorials, _super);
        function JSTreeNode_ContainerTutorials() {
            return _super.call(this, "Container tutorials") || this;
        }
        return JSTreeNode_ContainerTutorials;
    }(JSTreeNode));
    jsuistutorial.JSTreeNode_ContainerTutorials = JSTreeNode_ContainerTutorials;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSUIS_Example = (function () {
        function JSUIS_Example() {
        }
        JSUIS_Example.prototype.getRunAction = function () {
            if (!this.action_Run) {
                this.action_Run = new jsuistutorial.JSAction_ExampleRun();
                this.action_Run.setIcon(this.getRunIcon());
                this.action_Run.iFrame = this.getIFrame();
                this.action_Run.panel = this.getPanel();
                this.action_Run.splitPane = this.getSplitPane();
            }
            return this.action_Run;
        };
        JSUIS_Example.prototype.getRunButton = function () {
            if (!this.button_Run) {
                this.button_Run = new jsuistutorial.JSButton_ExampleRun();
                this.button_Run.setAction(this.getRunAction());
            }
            return this.button_Run;
        };
        JSUIS_Example.prototype.getRunIcon = function () {
            if (!this.icon_Run) {
                this.icon_Run = new jsuistutorial.JSIcon_ExampleRun();
            }
            return this.icon_Run;
        };
        JSUIS_Example.prototype.getIFrame = function () {
            if (!this.iFrame) {
                this.iFrame = new jsuistutorial.JSIFrame_Example();
            }
            return this.iFrame;
        };
        JSUIS_Example.prototype.getPanel = function () {
            if (!this.panel) {
                this.panel = new jsuistutorial.JSPanel_Example();
                var toolBar = this.getToolBar();
                this.panel.add(toolBar, JSBorderLayout.NORTH);
                var runButton = this.getRunButton();
                toolBar.add(runButton);
                var splitPane = this.getSplitPane();
                this.panel.add(splitPane);
                var iframe = this.getIFrame();
                splitPane.setRightComponent(iframe);
            }
            return this.panel;
        };
        JSUIS_Example.prototype.getSplitPane = function () {
            if (!this.splitPane) {
                this.splitPane = new jsuistutorial.JSSplitPane_Example();
            }
            return this.splitPane;
        };
        JSUIS_Example.prototype.getToolBar = function () {
            if (!this.toolBar) {
                this.toolBar = new jsuistutorial.JSToolBar_Example();
            }
            return this.toolBar;
        };
        return JSUIS_Example;
    }());
    jsuistutorial.JSUIS_Example = JSUIS_Example;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSAction_ExampleRun = (function (_super) {
        __extends(JSAction_ExampleRun, _super);
        function JSAction_ExampleRun() {
            return _super.call(this, "Run") || this;
        }
        JSAction_ExampleRun.prototype.actionPerformed = function (mouseEvent) {
            var iframe = this.iFrame;
            var panel = this.panel;
            var splitPane = this.splitPane;
            iframe.setSource("javascript:void(0);");
            var leftComponent = splitPane.getLeftComponent();
            var content = leftComponent.getText();
            iframe.open();
            iframe.write(content);
            iframe.close();
        };
        return JSAction_ExampleRun;
    }(JSAction));
    jsuistutorial.JSAction_ExampleRun = JSAction_ExampleRun;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSButton_ExampleRun = (function (_super) {
        __extends(JSButton_ExampleRun, _super);
        function JSButton_ExampleRun() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return JSButton_ExampleRun;
    }(JSButton));
    jsuistutorial.JSButton_ExampleRun = JSButton_ExampleRun;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSIcon_ExampleRun = (function (_super) {
        __extends(JSIcon_ExampleRun, _super);
        function JSIcon_ExampleRun() {
            return _super.call(this, "/img/baseline-play_arrow-24px-Green.svg", 16, 16) || this;
        }
        return JSIcon_ExampleRun;
    }(JSImageIcon));
    jsuistutorial.JSIcon_ExampleRun = JSIcon_ExampleRun;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSIFrame_Example = (function (_super) {
        __extends(JSIFrame_Example, _super);
        function JSIFrame_Example() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return JSIFrame_Example;
    }(JSIFrame));
    jsuistutorial.JSIFrame_Example = JSIFrame_Example;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSPanel_Example = (function (_super) {
        __extends(JSPanel_Example, _super);
        function JSPanel_Example() {
            return _super.call(this, new JSBorderLayout()) || this;
        }
        return JSPanel_Example;
    }(JSPanel));
    jsuistutorial.JSPanel_Example = JSPanel_Example;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSSplitPane_Example = (function (_super) {
        __extends(JSSplitPane_Example, _super);
        function JSSplitPane_Example() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return JSSplitPane_Example;
    }(JSSplitPane));
    jsuistutorial.JSSplitPane_Example = JSSplitPane_Example;
})(jsuistutorial || (jsuistutorial = {}));
var jsuistutorial;
(function (jsuistutorial) {
    var JSToolBar_Example = (function (_super) {
        __extends(JSToolBar_Example, _super);
        function JSToolBar_Example() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return JSToolBar_Example;
    }(JSToolBar));
    jsuistutorial.JSToolBar_Example = JSToolBar_Example;
})(jsuistutorial || (jsuistutorial = {}));
