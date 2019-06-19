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
var jstutorial;
(function (jstutorial) {
    var JSAction_About = (function (_super) {
        __extends(JSAction_About, _super);
        function JSAction_About() {
            return _super.call(this, "About", new JSImageIcon("/img/baseline-info-24px-Gold.svg", 16, 16)) || this;
        }
        JSAction_About.getInstance = function () {
            if (JSAction_About.instance === undefined) {
                JSAction_About.instance = new JSAction_About();
            }
            return JSAction_About.instance;
        };
        JSAction_About.prototype.actionPerformed = function (mouseEvent) {
            var dialog_About = jstutorial.JSDialog_About.getInstance();
            dialog_About.setVisible(true);
        };
        return JSAction_About;
    }(JSAction));
    jstutorial.JSAction_About = JSAction_About;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSAction_Collapse = (function (_super) {
        __extends(JSAction_Collapse, _super);
        function JSAction_Collapse() {
            return _super.call(this, new JSImageIcon("/img/baseline-keyboard_arrow_left-24px.svg", 24, 24)) || this;
        }
        JSAction_Collapse.getInstance = function () {
            if (JSAction_Collapse.instance === undefined) {
                JSAction_Collapse.instance = new JSAction_Collapse();
            }
            return JSAction_Collapse.instance;
        };
        JSAction_Collapse.prototype.actionPerformed = function (mouseEvent) {
            var splitPane_Left = jstutorial.JSSplitPane_Left.getInstance();
            var splitPaneLeftContainer_Left = splitPane_Left.getLeftContainer();
            splitPane_Left.setDividerLocation(splitPaneLeftContainer_Left.getBorderRightWidth());
            var panel_ToggleButton = jstutorial.JSPanel_ToggleButton.getInstance();
            panel_ToggleButton.first();
        };
        return JSAction_Collapse;
    }(JSAction));
    jstutorial.JSAction_Collapse = JSAction_Collapse;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSAction_Expand = (function (_super) {
        __extends(JSAction_Expand, _super);
        function JSAction_Expand() {
            return _super.call(this, new JSImageIcon("/img/baseline-keyboard_arrow_right-24px.svg", 24, 24)) || this;
        }
        JSAction_Expand.getInstance = function () {
            if (JSAction_Expand.instance === undefined) {
                JSAction_Expand.instance = new JSAction_Expand();
            }
            return JSAction_Expand.instance;
        };
        JSAction_Expand.prototype.actionPerformed = function (mouseEvent) {
            var panel_ToggleButton = jstutorial.JSPanel_ToggleButton.getInstance();
            if (panel_ToggleButton.isFirst()) {
                var splitPane_Left = jstutorial.JSSplitPane_Left.getInstance();
                splitPane_Left.setDividerLocation(splitPane_Left.getLeftComponent().getPreferredOuterWidth() + 1);
                panel_ToggleButton.last();
            }
        };
        return JSAction_Expand;
    }(JSAction));
    jstutorial.JSAction_Expand = JSAction_Expand;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSAction_JSButtonExample = (function (_super) {
        __extends(JSAction_JSButtonExample, _super);
        function JSAction_JSButtonExample() {
            return _super.call(this, "JS Button example(s)", jstutorial.JSIcon_Leaf.getInstance()) || this;
        }
        JSAction_JSButtonExample.getInstance = function () {
            if (JSAction_JSButtonExample.instance === undefined) {
                JSAction_JSButtonExample.instance = new JSAction_JSButtonExample();
            }
            return JSAction_JSButtonExample.instance;
        };
        JSAction_JSButtonExample.prototype.actionPerformed = function (mouseEvent) {
            JSForm.post("/examples/jsbutton", jstutorial.JSFrame_JSTutorial.getParams());
        };
        return JSAction_JSButtonExample;
    }(JSAction));
    jstutorial.JSAction_JSButtonExample = JSAction_JSButtonExample;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSAction_JSButtonTutorial = (function (_super) {
        __extends(JSAction_JSButtonTutorial, _super);
        function JSAction_JSButtonTutorial() {
            return _super.call(this, "How to use JS Button", jstutorial.JSIcon_Leaf.getInstance()) || this;
        }
        JSAction_JSButtonTutorial.getInstance = function () {
            if (JSAction_JSButtonTutorial.instance === undefined) {
                JSAction_JSButtonTutorial.instance = new JSAction_JSButtonTutorial();
            }
            return JSAction_JSButtonTutorial.instance;
        };
        JSAction_JSButtonTutorial.prototype.actionPerformed = function (mouseEvent) {
            JSForm.post("/tutorials/jsbutton", jstutorial.JSFrame_JSTutorial.getParams());
        };
        return JSAction_JSButtonTutorial;
    }(JSAction));
    jstutorial.JSAction_JSButtonTutorial = JSAction_JSButtonTutorial;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSAction_JSFrameExample = (function (_super) {
        __extends(JSAction_JSFrameExample, _super);
        function JSAction_JSFrameExample() {
            return _super.call(this, "JS Frame example(s)", jstutorial.JSIcon_Leaf.getInstance()) || this;
        }
        JSAction_JSFrameExample.getInstance = function () {
            if (JSAction_JSFrameExample.instance === undefined) {
                JSAction_JSFrameExample.instance = new JSAction_JSFrameExample();
            }
            return JSAction_JSFrameExample.instance;
        };
        JSAction_JSFrameExample.prototype.actionPerformed = function (mouseEvent) {
            JSForm.post("/examples/jsframe", jstutorial.JSFrame_JSTutorial.getParams());
        };
        return JSAction_JSFrameExample;
    }(JSAction));
    jstutorial.JSAction_JSFrameExample = JSAction_JSFrameExample;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSAction_JSFrameTutorial = (function (_super) {
        __extends(JSAction_JSFrameTutorial, _super);
        function JSAction_JSFrameTutorial() {
            return _super.call(this, "How to use JS Frame", jstutorial.JSIcon_Leaf.getInstance()) || this;
        }
        JSAction_JSFrameTutorial.getInstance = function () {
            if (JSAction_JSFrameTutorial.instance === undefined) {
                JSAction_JSFrameTutorial.instance = new JSAction_JSFrameTutorial();
            }
            return JSAction_JSFrameTutorial.instance;
        };
        JSAction_JSFrameTutorial.prototype.actionPerformed = function (mouseEvent) {
            JSForm.post("/tutorials/jsframe", jstutorial.JSFrame_JSTutorial.getParams());
        };
        return JSAction_JSFrameTutorial;
    }(JSAction));
    jstutorial.JSAction_JSFrameTutorial = JSAction_JSFrameTutorial;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSAction_JSTableExample = (function (_super) {
        __extends(JSAction_JSTableExample, _super);
        function JSAction_JSTableExample() {
            return _super.call(this, "JS Table example(s)", jstutorial.JSIcon_Leaf.getInstance()) || this;
        }
        JSAction_JSTableExample.getInstance = function () {
            if (JSAction_JSTableExample.instance === undefined) {
                JSAction_JSTableExample.instance = new JSAction_JSTableExample();
            }
            return JSAction_JSTableExample.instance;
        };
        JSAction_JSTableExample.prototype.actionPerformed = function (mouseEvent) {
            JSForm.post("/examples/jstable", jstutorial.JSFrame_JSTutorial.getParams());
        };
        return JSAction_JSTableExample;
    }(JSAction));
    jstutorial.JSAction_JSTableExample = JSAction_JSTableExample;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSAction_JSUISTutorial = (function (_super) {
        __extends(JSAction_JSUISTutorial, _super);
        function JSAction_JSUISTutorial() {
            return _super.call(this, "How to use JSUIS", jstutorial.JSIcon_Leaf.getInstance()) || this;
        }
        JSAction_JSUISTutorial.getInstance = function () {
            if (JSAction_JSUISTutorial.instance === undefined) {
                JSAction_JSUISTutorial.instance = new JSAction_JSUISTutorial();
            }
            return JSAction_JSUISTutorial.instance;
        };
        JSAction_JSUISTutorial.prototype.actionPerformed = function (mouseEvent) {
            JSForm.post("/", jstutorial.JSFrame_JSTutorial.getParams());
        };
        return JSAction_JSUISTutorial;
    }(JSAction));
    jstutorial.JSAction_JSUISTutorial = JSAction_JSUISTutorial;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSAction_RunExample = (function (_super) {
        __extends(JSAction_RunExample, _super);
        function JSAction_RunExample(panel_Example) {
            var _this = _super.call(this, "Run", jstutorial.JSIcon_Run.getInstance()) || this;
            _this.setPanel(panel_Example);
            return _this;
        }
        JSAction_RunExample.prototype.getPanel = function () {
            return this.panel_Example;
        };
        JSAction_RunExample.prototype.setPanel = function (panel_Example) {
            this.panel_Example = panel_Example;
        };
        JSAction_RunExample.prototype.actionPerformed = function (mouseEvent) {
            var panel_Example = this.getPanel();
            var iframe = panel_Example.getIFrame();
            iframe.setSource("javascript:void(0);");
            var splitPane = panel_Example.getSplitPane();
            var leftComponent = splitPane.getLeftComponent();
            var content = leftComponent.getText();
            iframe.open();
            iframe.write(content);
            iframe.close();
        };
        return JSAction_RunExample;
    }(JSAction));
    jstutorial.JSAction_RunExample = JSAction_RunExample;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSButton_Collapse = (function (_super) {
        __extends(JSButton_Collapse, _super);
        function JSButton_Collapse() {
            var _this = _super.call(this, jstutorial.JSAction_Collapse.getInstance()) || this;
            _this.addClass("JSButton_Collapse");
            _this.setUndecorated(true);
            return _this;
        }
        JSButton_Collapse.getInstance = function () {
            if (JSButton_Collapse.instance === undefined) {
                JSButton_Collapse.instance = new JSButton_Collapse();
            }
            return JSButton_Collapse.instance;
        };
        return JSButton_Collapse;
    }(JSButton));
    jstutorial.JSButton_Collapse = JSButton_Collapse;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSButton_Expand = (function (_super) {
        __extends(JSButton_Expand, _super);
        function JSButton_Expand() {
            var _this = _super.call(this, jstutorial.JSAction_Expand.getInstance()) || this;
            _this.addClass("JSButton_Expand");
            _this.setUndecorated(true);
            return _this;
        }
        JSButton_Expand.getInstance = function () {
            if (JSButton_Expand.instance === undefined) {
                JSButton_Expand.instance = new JSButton_Expand();
            }
            return JSButton_Expand.instance;
        };
        return JSButton_Expand;
    }(JSButton));
    jstutorial.JSButton_Expand = JSButton_Expand;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSButton_RunExample = (function (_super) {
        __extends(JSButton_RunExample, _super);
        function JSButton_RunExample(panel_Example) {
            var _this = _super.call(this, new jstutorial.JSAction_RunExample(panel_Example)) || this;
            _this.addClass("JSButton_RunExample");
            return _this;
        }
        return JSButton_RunExample;
    }(JSButton));
    jstutorial.JSButton_RunExample = JSButton_RunExample;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSDialog_About = (function (_super) {
        __extends(JSDialog_About, _super);
        function JSDialog_About() {
            var _this = _super.call(this, "About", true) || this;
            _this.addClass("JSDialog_About");
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
            okButton.addActionListener(_this);
            cancelButton.addActionListener(_this);
            return _this;
        }
        JSDialog_About.getInstance = function () {
            if (JSDialog_About.instance === undefined) {
                JSDialog_About.instance = new JSDialog_About();
            }
            return JSDialog_About.instance;
        };
        return JSDialog_About;
    }(JSDialog));
    jstutorial.JSDialog_About = JSDialog_About;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSFrame_JSTutorial = (function (_super) {
        __extends(JSFrame_JSTutorial, _super);
        function JSFrame_JSTutorial(args) {
            var _this = _super.call(this) || this;
            _this.addClass("JSFrame_JSTutorial");
            _this.setLayout(new JSBorderLayout());
            _this.setTitle("JSUIS - JavaScript User Interface");
            var menuBar_JSTutorial = jstutorial.JSMenuBar_JSTutorial.getInstance();
            _this.setMenuBar(menuBar_JSTutorial);
            var menu_Tutorials = jstutorial.JSMenu_Tutorials.getInstance();
            menuBar_JSTutorial.add(menu_Tutorials);
            var menu_Examples = jstutorial.JSMenu_Examples.getInstance();
            menuBar_JSTutorial.add(menu_Examples);
            var menu_Help = jstutorial.JSMenu_Help.getInstance();
            menuBar_JSTutorial.add(menu_Help);
            var menuItem_JSUISTutorial = jstutorial.JSMenuItem_JSUISTutorial.getInstance();
            menu_Tutorials.add(menuItem_JSUISTutorial);
            menu_Tutorials.addSeparator();
            var menu_ContainerTutorials = jstutorial.JSMenu_ContainerTutorials.getInstance();
            menu_Tutorials.add(menu_ContainerTutorials);
            var menu_ComponentTutorials = jstutorial.JSMenu_ComponentTutorials.getInstance();
            menu_Tutorials.add(menu_ComponentTutorials);
            var menu_ContainerExamples = jstutorial.JSMenu_ContainerExamples.getInstance();
            menu_Examples.add(menu_ContainerExamples);
            var menu_ComponentExamples = jstutorial.JSMenu_ComponentExamples.getInstance();
            menu_Examples.add(menu_ComponentExamples);
            var menuItem_About = jstutorial.JSMenuItem_About.getInstance();
            menu_Help.add(menuItem_About);
            var menuItem_JSFrameTutorial = jstutorial.JSMenuItem_JSFrameTutorial.getInstance();
            menu_ContainerTutorials.add(menuItem_JSFrameTutorial);
            var menuItem_JSButtonTutorial = jstutorial.JSMenuItem_JSButtonTutorial.getInstance();
            menu_ComponentTutorials.add(menuItem_JSButtonTutorial);
            var menuItem_JSFrameExample = jstutorial.JSMenuItem_JSFrameExample.getInstance();
            menu_ContainerExamples.add(menuItem_JSFrameExample);
            var menuItem_JSButtonExample = jstutorial.JSMenuItem_JSButtonExample.getInstance();
            menu_ComponentExamples.add(menuItem_JSButtonExample);
            var menuItem_JSTableExample = jstutorial.JSMenuItem_JSTableExample.getInstance();
            var tabbedPane_Left = jstutorial.JSTabbedPane_Left.getInstance();
            var tabbedPaneTabContainer_Left = tabbedPane_Left.getTabContainer();
            tabbedPaneTabContainer_Left.addClass("JSTabbedPaneTabContainer_Left");
            _this.add(tabbedPaneTabContainer_Left, JSBorderLayout.WEST);
            var splitPane_Left = jstutorial.JSSplitPane_Left.getInstance();
            _this.add(splitPane_Left);
            var tabbedPaneCardContainer_Left = tabbedPane_Left.getCardContainer();
            splitPane_Left.setLeftComponent(tabbedPaneCardContainer_Left);
            var tabbedPaneButtonContainer_Left = tabbedPane_Left.getButtonContainer();
            var panel_ToogleButton = jstutorial.JSPanel_ToggleButton.getInstance();
            tabbedPaneButtonContainer_Left.add(panel_ToogleButton);
            var button_Expand = jstutorial.JSButton_Expand.getInstance();
            panel_ToogleButton.add(button_Expand);
            var button_Collapse = jstutorial.JSButton_Collapse.getInstance();
            panel_ToogleButton.add(button_Collapse);
            var tree_Tutorials = jstutorial.JSTree_Tutorials.getInstance();
            tabbedPane_Left.addTab("Tutorials", new JSImageIcon("/img/baseline-local_library-24px-GoldenRod.svg", 24, 24), new JSScrollPane(tree_Tutorials));
            var treeNode_TutorialsRoot = new JSTreeNode();
            tree_Tutorials.setRoot(treeNode_TutorialsRoot);
            var treeNode_JSUISTutorials = new JSTreeNode(jstutorial.JSAction_JSUISTutorial.getInstance());
            treeNode_TutorialsRoot.add(treeNode_JSUISTutorials);
            var treeNode_ContainerTutorials = jstutorial.JSTreeNode_ContainerTutorials.getInstance();
            treeNode_TutorialsRoot.add(treeNode_ContainerTutorials);
            var treeNode_JSFrameTutorial = new JSTreeNode(jstutorial.JSAction_JSFrameTutorial.getInstance());
            treeNode_ContainerTutorials.add(treeNode_JSFrameTutorial);
            var treeNode_ComponentTutorials = jstutorial.JSTreeNode_ComponentTutorials.getInstance();
            treeNode_TutorialsRoot.add(treeNode_ComponentTutorials);
            var treeNode_JSButtonTutorial = new JSTreeNode(jstutorial.JSAction_JSButtonTutorial.getInstance());
            treeNode_ComponentTutorials.add(treeNode_JSButtonTutorial);
            var icon_Leaf = jstutorial.JSIcon_Leaf.getInstance();
            var icon_Open = jstutorial.JSIcon_Open.getInstance();
            var icon_Closed = jstutorial.JSIcon_Closed.getInstance();
            var treeCellRenderer_Tutorials = tree_Tutorials.getTreeCellRenderer();
            treeCellRenderer_Tutorials.setLeafIcon(icon_Leaf);
            treeCellRenderer_Tutorials.setOpenIcon(icon_Open);
            treeCellRenderer_Tutorials.setClosedIcon(icon_Closed);
            var tree_Examples = jstutorial.JSTree_Examples.getInstance();
            tabbedPane_Left.addTab("Examples", new JSImageIcon("/img/baseline-playlist_play-24px-Green.svg", 24, 24), new JSScrollPane(tree_Examples));
            var treeNode_ExamplesRoot = new JSTreeNode();
            tree_Examples.setRoot(treeNode_ExamplesRoot);
            var treeNode_ContainerExamples = jstutorial.JSTreeNode_ContainerExamples.getInstance();
            treeNode_ExamplesRoot.add(treeNode_ContainerExamples);
            var treeNode_JSFrameExample = new JSTreeNode(jstutorial.JSAction_JSFrameExample.getInstance());
            treeNode_ContainerExamples.add(treeNode_JSFrameExample);
            var treeNode_ComponentExamples = jstutorial.JSTreeNode_ComponentExamples.getInstance();
            treeNode_ExamplesRoot.add(treeNode_ComponentExamples);
            var treeNode_JSButtonExample = new JSTreeNode(jstutorial.JSAction_JSButtonExample.getInstance());
            treeNode_ComponentExamples.add(treeNode_JSButtonExample);
            var treeCellRenderer_Tutorials = tree_Examples.getTreeCellRenderer();
            treeCellRenderer_Tutorials.setLeafIcon(icon_Leaf);
            treeCellRenderer_Tutorials.setOpenIcon(icon_Open);
            treeCellRenderer_Tutorials.setClosedIcon(icon_Closed);
            tabbedPane_Left.setSelectedIndex(0);
            var action_ExpandButton = jstutorial.JSAction_Expand.getInstance();
            tabbedPane_Left.getTabComponentAt(0).addActionListener(action_ExpandButton);
            tabbedPane_Left.getTabComponentAt(1).addActionListener(action_ExpandButton);
            tree_Tutorials.expand(treeNode_ContainerTutorials);
            tree_Tutorials.expand(treeNode_ComponentTutorials);
            tree_Examples.expand(treeNode_ContainerExamples);
            tree_Examples.expand(treeNode_ComponentExamples);
            splitPane_Left.setDividerLocation(splitPane_Left.getLeftComponent().getPreferredOuterWidth() + 1);
            var element = document.getElementById("tutorial");
            if (element) {
                var tutorial = new JSDiv(element);
                splitPane_Left.setRightComponent(new JSScrollPane(tutorial));
            }
            else {
                element = document.getElementById("example");
                if (element) {
                    var tabbedPane_Example = jstutorial.JSTabbedPane_Example.getInstance();
                    splitPane_Left.setRightComponent(tabbedPane_Example);
                }
            }
            if (args) {
                _this.setArgs(args);
            }
            return _this;
        }
        JSFrame_JSTutorial.prototype.setArgs = function (args) {
            if (args["panel_ToggleButton_first"] !== undefined && args["panel_ToggleButton_first"]) {
                var action_Collapse = jstutorial.JSAction_Collapse.getInstance();
                action_Collapse.actionPerformed(null);
            }
            else if (args["splitPane_Left_dividerLocation"] !== undefined) {
                var splitPane_Left = jstutorial.JSSplitPane_Left.getInstance();
                splitPane_Left.setDividerLocation(args["splitPane_Left_dividerLocation"]);
            }
            if (args["tabbedPane_Left_selectedIndex"] !== undefined && args["tabbedPane_Left_selectedIndex"] !== -1) {
                var tabbedPane_Left = jstutorial.JSTabbedPane_Left.getInstance();
                tabbedPane_Left.setSelectedIndex(args["tabbedPane_Left_selectedIndex"]);
            }
            var tree_Tutorials = jstutorial.JSTree_Tutorials.getInstance();
            if (args["treeNode_ContainerTutorials_expanded"] !== undefined) {
                var treeNode_ContainerTutorials = jstutorial.JSTreeNode_ContainerTutorials.getInstance();
                if (args["treeNode_ContainerTutorials_expanded"]) {
                    tree_Tutorials.expand(treeNode_ContainerTutorials);
                }
                else {
                    tree_Tutorials.collapse(treeNode_ContainerTutorials);
                }
            }
            if (args["treeNode_ComponentTutorials_expanded"] !== undefined) {
                var treeNode_ComponentTutorials = jstutorial.JSTreeNode_ComponentTutorials.getInstance();
                if (args["treeNode_ComponentTutorials_expanded"]) {
                    tree_Tutorials.expand(treeNode_ComponentTutorials);
                }
                else {
                    tree_Tutorials.collapse(treeNode_ComponentTutorials);
                }
            }
            var tree_Examples = jstutorial.JSTree_Examples.getInstance();
            if (args["treeNode_ContainerExamples_expanded"] !== undefined) {
                var treeNode_ContainerExamples = jstutorial.JSTreeNode_ContainerExamples.getInstance();
                if (args["treeNode_ContainerExamples_expanded"]) {
                    tree_Examples.expand(treeNode_ContainerExamples);
                }
                else {
                    tree_Examples.collapse(treeNode_ContainerExamples);
                }
            }
            if (args["treeNode_ComponentExamples_expanded"] !== undefined) {
                var treeNode_ComponentExamples = jstutorial.JSTreeNode_ComponentExamples.getInstance();
                if (args["treeNode_ComponentExamples_expanded"]) {
                    tree_Examples.expand(treeNode_ComponentExamples);
                }
                else {
                    tree_Examples.collapse(treeNode_ComponentExamples);
                }
            }
        };
        JSFrame_JSTutorial.getParams = function () {
            var params = {};
            params["panel_ToggleButton_first"] = "" + jstutorial.JSPanel_ToggleButton.getInstance().isFirst();
            params["splitPane_Left_dividerLocation"] = "" + jstutorial.JSSplitPane_Left.getInstance().getDividerLocation();
            params["tabbedPane_Left_selectedIndex"] = "" + jstutorial.JSTabbedPane_Left.getInstance().getSelectedIndex();
            params["treeNode_ContainerTutorials_expanded"] = "" + jstutorial.JSTreeNode_ContainerTutorials.getInstance().isExpanded();
            params["treeNode_ComponentTutorials_expanded"] = "" + jstutorial.JSTreeNode_ComponentTutorials.getInstance().isExpanded();
            params["treeNode_ContainerExamples_expanded"] = "" + jstutorial.JSTreeNode_ContainerExamples.getInstance().isExpanded();
            params["treeNode_ComponentExamples_expanded"] = "" + jstutorial.JSTreeNode_ComponentExamples.getInstance().isExpanded();
            return params;
        };
        return JSFrame_JSTutorial;
    }(JSFrame));
    jstutorial.JSFrame_JSTutorial = JSFrame_JSTutorial;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSIcon_Closed = (function (_super) {
        __extends(JSIcon_Closed, _super);
        function JSIcon_Closed() {
            var _this = _super.call(this, "0 0 24 24", "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z", 16, 16) || this;
            _this.setFill("Gold");
            return _this;
        }
        JSIcon_Closed.getInstance = function () {
            if (JSIcon_Closed.instance === undefined) {
                JSIcon_Closed.instance = new JSIcon_Closed();
            }
            return JSIcon_Closed.instance;
        };
        return JSIcon_Closed;
    }(JSPathIcon));
    jstutorial.JSIcon_Closed = JSIcon_Closed;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSIcon_Leaf = (function (_super) {
        __extends(JSIcon_Leaf, _super);
        function JSIcon_Leaf() {
            var _this = _super.call(this, "0 0 24 24", "M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z", 16, 16) || this;
            _this.setFill("Silver");
            return _this;
        }
        JSIcon_Leaf.getInstance = function () {
            if (JSIcon_Leaf.instance === undefined) {
                JSIcon_Leaf.instance = new JSIcon_Leaf();
            }
            return JSIcon_Leaf.instance;
        };
        return JSIcon_Leaf;
    }(JSPathIcon));
    jstutorial.JSIcon_Leaf = JSIcon_Leaf;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSIcon_Open = (function (_super) {
        __extends(JSIcon_Open, _super);
        function JSIcon_Open() {
            var _this = _super.call(this, "0 0 24 24", "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z", 16, 16) || this;
            _this.setFill("Gold");
            return _this;
        }
        JSIcon_Open.getInstance = function () {
            if (JSIcon_Open.instance === undefined) {
                JSIcon_Open.instance = new JSIcon_Open();
            }
            return JSIcon_Open.instance;
        };
        return JSIcon_Open;
    }(JSPathIcon));
    jstutorial.JSIcon_Open = JSIcon_Open;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSIcon_Run = (function (_super) {
        __extends(JSIcon_Run, _super);
        function JSIcon_Run() {
            return _super.call(this, "/img/baseline-play_arrow-24px-Green.svg", 16, 16) || this;
        }
        JSIcon_Run.getInstance = function () {
            if (JSIcon_Run.instance === undefined) {
                JSIcon_Run.instance = new JSIcon_Run();
            }
            return JSIcon_Run.instance;
        };
        return JSIcon_Run;
    }(JSImageIcon));
    jstutorial.JSIcon_Run = JSIcon_Run;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSIFrame_Example = (function (_super) {
        __extends(JSIFrame_Example, _super);
        function JSIFrame_Example() {
            var _this = _super.call(this) || this;
            _this.addClass("JSIFrame_Example");
            return _this;
        }
        return JSIFrame_Example;
    }(JSIFrame));
    jstutorial.JSIFrame_Example = JSIFrame_Example;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSMenu_ComponentExamples = (function (_super) {
        __extends(JSMenu_ComponentExamples, _super);
        function JSMenu_ComponentExamples() {
            var _this = _super.call(this, "Component examples", jstutorial.JSIcon_Closed.getInstance()) || this;
            _this.addClass("JSMenu_ComponentExamples");
            return _this;
        }
        JSMenu_ComponentExamples.getInstance = function () {
            if (JSMenu_ComponentExamples.instance === undefined) {
                JSMenu_ComponentExamples.instance = new JSMenu_ComponentExamples();
            }
            return JSMenu_ComponentExamples.instance;
        };
        return JSMenu_ComponentExamples;
    }(JSMenu));
    jstutorial.JSMenu_ComponentExamples = JSMenu_ComponentExamples;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSMenu_ComponentTutorials = (function (_super) {
        __extends(JSMenu_ComponentTutorials, _super);
        function JSMenu_ComponentTutorials() {
            var _this = _super.call(this, "Component tutorials", jstutorial.JSIcon_Closed.getInstance()) || this;
            _this.addClass("JSMenu_ComponentTutorials");
            return _this;
        }
        JSMenu_ComponentTutorials.getInstance = function () {
            if (JSMenu_ComponentTutorials.instance === undefined) {
                JSMenu_ComponentTutorials.instance = new JSMenu_ComponentTutorials();
            }
            return JSMenu_ComponentTutorials.instance;
        };
        return JSMenu_ComponentTutorials;
    }(JSMenu));
    jstutorial.JSMenu_ComponentTutorials = JSMenu_ComponentTutorials;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSMenu_ContainerExamples = (function (_super) {
        __extends(JSMenu_ContainerExamples, _super);
        function JSMenu_ContainerExamples() {
            var _this = _super.call(this, "Container examples", jstutorial.JSIcon_Closed.getInstance()) || this;
            _this.addClass("JSMenu_ContainerExamples");
            return _this;
        }
        JSMenu_ContainerExamples.getInstance = function () {
            if (JSMenu_ContainerExamples.instance === undefined) {
                JSMenu_ContainerExamples.instance = new JSMenu_ContainerExamples();
            }
            return JSMenu_ContainerExamples.instance;
        };
        return JSMenu_ContainerExamples;
    }(JSMenu));
    jstutorial.JSMenu_ContainerExamples = JSMenu_ContainerExamples;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSMenu_ContainerTutorials = (function (_super) {
        __extends(JSMenu_ContainerTutorials, _super);
        function JSMenu_ContainerTutorials() {
            var _this = _super.call(this, "Container tutorials", jstutorial.JSIcon_Closed.getInstance()) || this;
            _this.addClass("JSMenu_ContainerTutorials");
            return _this;
        }
        JSMenu_ContainerTutorials.getInstance = function () {
            if (JSMenu_ContainerTutorials.instance === undefined) {
                JSMenu_ContainerTutorials.instance = new JSMenu_ContainerTutorials();
            }
            return JSMenu_ContainerTutorials.instance;
        };
        return JSMenu_ContainerTutorials;
    }(JSMenu));
    jstutorial.JSMenu_ContainerTutorials = JSMenu_ContainerTutorials;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSMenu_Examples = (function (_super) {
        __extends(JSMenu_Examples, _super);
        function JSMenu_Examples() {
            var _this = _super.call(this, "Examples") || this;
            _this.addClass("JSMenu_Examples");
            return _this;
        }
        JSMenu_Examples.getInstance = function () {
            if (JSMenu_Examples.instance === undefined) {
                JSMenu_Examples.instance = new JSMenu_Examples();
            }
            return JSMenu_Examples.instance;
        };
        return JSMenu_Examples;
    }(JSMenu));
    jstutorial.JSMenu_Examples = JSMenu_Examples;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSMenu_Help = (function (_super) {
        __extends(JSMenu_Help, _super);
        function JSMenu_Help() {
            var _this = _super.call(this, "Help") || this;
            _this.addClass("JSMenu_Help");
            return _this;
        }
        JSMenu_Help.getInstance = function () {
            if (JSMenu_Help.instance === undefined) {
                JSMenu_Help.instance = new JSMenu_Help();
            }
            return JSMenu_Help.instance;
        };
        return JSMenu_Help;
    }(JSMenu));
    jstutorial.JSMenu_Help = JSMenu_Help;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSMenu_Tutorials = (function (_super) {
        __extends(JSMenu_Tutorials, _super);
        function JSMenu_Tutorials() {
            var _this = _super.call(this, "Tutorials") || this;
            _this.addClass("JSMenu_Tutorials");
            return _this;
        }
        JSMenu_Tutorials.getInstance = function () {
            if (JSMenu_Tutorials.instance === undefined) {
                JSMenu_Tutorials.instance = new JSMenu_Tutorials();
            }
            return JSMenu_Tutorials.instance;
        };
        return JSMenu_Tutorials;
    }(JSMenu));
    jstutorial.JSMenu_Tutorials = JSMenu_Tutorials;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSMenuBar_JSTutorial = (function (_super) {
        __extends(JSMenuBar_JSTutorial, _super);
        function JSMenuBar_JSTutorial() {
            var _this = _super.call(this) || this;
            _this.addClass("JSMenuBar_JSTutorial");
            return _this;
        }
        JSMenuBar_JSTutorial.getInstance = function () {
            if (JSMenuBar_JSTutorial.instance === undefined) {
                JSMenuBar_JSTutorial.instance = new JSMenuBar_JSTutorial();
            }
            return JSMenuBar_JSTutorial.instance;
        };
        return JSMenuBar_JSTutorial;
    }(JSMenuBar));
    jstutorial.JSMenuBar_JSTutorial = JSMenuBar_JSTutorial;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSMenuItem_About = (function (_super) {
        __extends(JSMenuItem_About, _super);
        function JSMenuItem_About() {
            var _this = _super.call(this, jstutorial.JSAction_About.getInstance()) || this;
            _this.addClass("JSMenuItem_About");
            return _this;
        }
        JSMenuItem_About.getInstance = function () {
            if (JSMenuItem_About.instance === undefined) {
                JSMenuItem_About.instance = new JSMenuItem_About();
            }
            return JSMenuItem_About.instance;
        };
        return JSMenuItem_About;
    }(JSMenuItem));
    jstutorial.JSMenuItem_About = JSMenuItem_About;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSMenuItem_JSButtonExample = (function (_super) {
        __extends(JSMenuItem_JSButtonExample, _super);
        function JSMenuItem_JSButtonExample() {
            var _this = _super.call(this, jstutorial.JSAction_JSButtonExample.getInstance()) || this;
            _this.addClass("JSMenuItem_JSButtonExample");
            return _this;
        }
        JSMenuItem_JSButtonExample.getInstance = function () {
            if (JSMenuItem_JSButtonExample.instance === undefined) {
                JSMenuItem_JSButtonExample.instance = new JSMenuItem_JSButtonExample();
            }
            return JSMenuItem_JSButtonExample.instance;
        };
        return JSMenuItem_JSButtonExample;
    }(JSMenuItem));
    jstutorial.JSMenuItem_JSButtonExample = JSMenuItem_JSButtonExample;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSMenuItem_JSButtonTutorial = (function (_super) {
        __extends(JSMenuItem_JSButtonTutorial, _super);
        function JSMenuItem_JSButtonTutorial() {
            var _this = _super.call(this, jstutorial.JSAction_JSButtonTutorial.getInstance()) || this;
            _this.addClass("JSMenuItem_JSButtonTutorial");
            return _this;
        }
        JSMenuItem_JSButtonTutorial.getInstance = function () {
            if (JSMenuItem_JSButtonTutorial.instance === undefined) {
                JSMenuItem_JSButtonTutorial.instance = new JSMenuItem_JSButtonTutorial();
            }
            return JSMenuItem_JSButtonTutorial.instance;
        };
        return JSMenuItem_JSButtonTutorial;
    }(JSMenuItem));
    jstutorial.JSMenuItem_JSButtonTutorial = JSMenuItem_JSButtonTutorial;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSMenuItem_JSFrameExample = (function (_super) {
        __extends(JSMenuItem_JSFrameExample, _super);
        function JSMenuItem_JSFrameExample() {
            var _this = _super.call(this, jstutorial.JSAction_JSFrameExample.getInstance()) || this;
            _this.addClass("JSMenuItem_JSFrameExample");
            return _this;
        }
        JSMenuItem_JSFrameExample.getInstance = function () {
            if (JSMenuItem_JSFrameExample.instance === undefined) {
                JSMenuItem_JSFrameExample.instance = new JSMenuItem_JSFrameExample();
            }
            return JSMenuItem_JSFrameExample.instance;
        };
        return JSMenuItem_JSFrameExample;
    }(JSMenuItem));
    jstutorial.JSMenuItem_JSFrameExample = JSMenuItem_JSFrameExample;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSMenuItem_JSFrameTutorial = (function (_super) {
        __extends(JSMenuItem_JSFrameTutorial, _super);
        function JSMenuItem_JSFrameTutorial() {
            var _this = _super.call(this, jstutorial.JSAction_JSFrameTutorial.getInstance()) || this;
            _this.addClass("JSMenuItem_JSFrameTutorial");
            return _this;
        }
        JSMenuItem_JSFrameTutorial.getInstance = function () {
            if (JSMenuItem_JSFrameTutorial.instance === undefined) {
                JSMenuItem_JSFrameTutorial.instance = new JSMenuItem_JSFrameTutorial();
            }
            return JSMenuItem_JSFrameTutorial.instance;
        };
        return JSMenuItem_JSFrameTutorial;
    }(JSMenuItem));
    jstutorial.JSMenuItem_JSFrameTutorial = JSMenuItem_JSFrameTutorial;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSMenuItem_JSTableExample = (function (_super) {
        __extends(JSMenuItem_JSTableExample, _super);
        function JSMenuItem_JSTableExample() {
            var _this = _super.call(this, jstutorial.JSAction_JSTableExample.getInstance()) || this;
            _this.addClass("JSMenuItem_JSTableExample");
            return _this;
        }
        JSMenuItem_JSTableExample.getInstance = function () {
            if (JSMenuItem_JSTableExample.instance === undefined) {
                JSMenuItem_JSTableExample.instance = new JSMenuItem_JSTableExample();
            }
            return JSMenuItem_JSTableExample.instance;
        };
        return JSMenuItem_JSTableExample;
    }(JSMenuItem));
    jstutorial.JSMenuItem_JSTableExample = JSMenuItem_JSTableExample;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSMenuItem_JSUISTutorial = (function (_super) {
        __extends(JSMenuItem_JSUISTutorial, _super);
        function JSMenuItem_JSUISTutorial() {
            var _this = _super.call(this, jstutorial.JSAction_JSUISTutorial.getInstance()) || this;
            _this.addClass("JSMenuItem_JSUISTutorial");
            return _this;
        }
        JSMenuItem_JSUISTutorial.getInstance = function () {
            if (JSMenuItem_JSUISTutorial.instance === undefined) {
                JSMenuItem_JSUISTutorial.instance = new JSMenuItem_JSUISTutorial();
            }
            return JSMenuItem_JSUISTutorial.instance;
        };
        return JSMenuItem_JSUISTutorial;
    }(JSMenuItem));
    jstutorial.JSMenuItem_JSUISTutorial = JSMenuItem_JSUISTutorial;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSPanel_Example = (function (_super) {
        __extends(JSPanel_Example, _super);
        function JSPanel_Example() {
            var _this = _super.call(this, new JSBorderLayout()) || this;
            _this.addClass("JSPanel_Example");
            var toolBar = _this.getToolBar();
            _this.add(toolBar, JSBorderLayout.NORTH);
            var runButton = _this.getRunButton();
            toolBar.add(runButton);
            var splitPane_Example = _this.getSplitPane();
            _this.add(splitPane_Example);
            var iframe = _this.getIFrame();
            splitPane_Example.setRightComponent(iframe);
            return _this;
        }
        JSPanel_Example.getInstance = function () {
            if (JSPanel_Example.instance === undefined) {
                JSPanel_Example.instance = new JSPanel_Example();
            }
            return JSPanel_Example.instance;
        };
        JSPanel_Example.prototype.getToolBar = function () {
            var toolBar = this.getData("toolBar");
            if (!toolBar) {
                toolBar = new jstutorial.JSToolBar_Example();
                this.setData("toolBar", toolBar);
            }
            return toolBar;
        };
        JSPanel_Example.prototype.getRunButton = function () {
            var runButton = this.getData("runButton");
            if (!runButton) {
                runButton = new jstutorial.JSButton_RunExample(this);
                this.setData("runButton", runButton);
            }
            return runButton;
        };
        JSPanel_Example.prototype.getSplitPane = function () {
            var splitPane = this.getData("splitPane");
            if (!splitPane) {
                splitPane = new jstutorial.JSSplitPane_Example();
                this.setData("splitPane", splitPane);
            }
            return splitPane;
        };
        JSPanel_Example.prototype.getIFrame = function () {
            var iframe = this.getData("iframe");
            if (!iframe) {
                iframe = new jstutorial.JSIFrame_Example();
                this.setData("iframe", iframe);
            }
            return iframe;
        };
        return JSPanel_Example;
    }(JSPanel));
    jstutorial.JSPanel_Example = JSPanel_Example;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSPanel_ToggleButton = (function (_super) {
        __extends(JSPanel_ToggleButton, _super);
        function JSPanel_ToggleButton() {
            var _this = _super.call(this, new JSCardLayout()) || this;
            _this.addClass("JSPanel_ToggleButton");
            return _this;
        }
        JSPanel_ToggleButton.getInstance = function () {
            if (JSPanel_ToggleButton.instance === undefined) {
                JSPanel_ToggleButton.instance = new JSPanel_ToggleButton();
            }
            return JSPanel_ToggleButton.instance;
        };
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
    jstutorial.JSPanel_ToggleButton = JSPanel_ToggleButton;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSProperties_JSTutorial = (function (_super) {
        __extends(JSProperties_JSTutorial, _super);
        function JSProperties_JSTutorial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JSProperties_JSTutorial.getInstance = function () {
            if (JSProperties_JSTutorial.instance === undefined) {
                JSProperties_JSTutorial.instance = new JSProperties_JSTutorial();
            }
            return JSProperties_JSTutorial.instance;
        };
        return JSProperties_JSTutorial;
    }(JSProperties));
    jstutorial.JSProperties_JSTutorial = JSProperties_JSTutorial;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSSplitPane_Example = (function (_super) {
        __extends(JSSplitPane_Example, _super);
        function JSSplitPane_Example() {
            var _this = _super.call(this) || this;
            _this.addClass("JSSplitPane_Example");
            return _this;
        }
        return JSSplitPane_Example;
    }(JSSplitPane));
    jstutorial.JSSplitPane_Example = JSSplitPane_Example;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSSplitPane_Left = (function (_super) {
        __extends(JSSplitPane_Left, _super);
        function JSSplitPane_Left() {
            var _this = _super.call(this) || this;
            _this.addClass("JSSplitPane_Left");
            return _this;
        }
        JSSplitPane_Left.getInstance = function () {
            if (JSSplitPane_Left.instance === undefined) {
                JSSplitPane_Left.instance = new JSSplitPane_Left();
            }
            return JSSplitPane_Left.instance;
        };
        return JSSplitPane_Left;
    }(JSSplitPane));
    jstutorial.JSSplitPane_Left = JSSplitPane_Left;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSTabbedPane_Left = (function (_super) {
        __extends(JSTabbedPane_Left, _super);
        function JSTabbedPane_Left() {
            var _this = _super.call(this, JSTabbedPane.LEFT) || this;
            _this.addClass("JSTabbedPane_Left");
            return _this;
        }
        JSTabbedPane_Left.getInstance = function () {
            if (JSTabbedPane_Left.instance === undefined) {
                JSTabbedPane_Left.instance = new JSTabbedPane_Left();
            }
            return JSTabbedPane_Left.instance;
        };
        return JSTabbedPane_Left;
    }(JSTabbedPane));
    jstutorial.JSTabbedPane_Left = JSTabbedPane_Left;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSTabbedPane_Example = (function (_super) {
        __extends(JSTabbedPane_Example, _super);
        function JSTabbedPane_Example() {
            var _this = _super.call(this, JSTabbedPane.TOP) || this;
            _this.addClass("JSTabbedPane_Example");
            return _this;
        }
        JSTabbedPane_Example.getInstance = function () {
            if (JSTabbedPane_Example.instance === undefined) {
                JSTabbedPane_Example.instance = new JSTabbedPane_Example();
            }
            return JSTabbedPane_Example.instance;
        };
        return JSTabbedPane_Example;
    }(JSTabbedPane));
    jstutorial.JSTabbedPane_Example = JSTabbedPane_Example;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSToolBar_Example = (function (_super) {
        __extends(JSToolBar_Example, _super);
        function JSToolBar_Example() {
            var _this = _super.call(this) || this;
            _this.addClass("JSToolBar_Example");
            return _this;
        }
        return JSToolBar_Example;
    }(JSToolBar));
    jstutorial.JSToolBar_Example = JSToolBar_Example;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSTree_Examples = (function (_super) {
        __extends(JSTree_Examples, _super);
        function JSTree_Examples() {
            var _this = _super.call(this) || this;
            _this.setRootVisible(false);
            _this.addClass("JSTree_Examples");
            _this.addMouseListener(_this);
            return _this;
        }
        JSTree_Examples.getInstance = function () {
            if (JSTree_Examples.instance === undefined) {
                JSTree_Examples.instance = new JSTree_Examples();
            }
            return JSTree_Examples.instance;
        };
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
    jstutorial.JSTree_Examples = JSTree_Examples;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSTree_Tutorials = (function (_super) {
        __extends(JSTree_Tutorials, _super);
        function JSTree_Tutorials() {
            var _this = _super.call(this) || this;
            _this.setRootVisible(false);
            _this.addClass("JSTree_Tutorials");
            _this.addMouseListener(_this);
            return _this;
        }
        JSTree_Tutorials.getInstance = function () {
            if (JSTree_Tutorials.instance === undefined) {
                JSTree_Tutorials.instance = new JSTree_Tutorials();
            }
            return JSTree_Tutorials.instance;
        };
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
    jstutorial.JSTree_Tutorials = JSTree_Tutorials;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSTreeNode_ComponentExamples = (function (_super) {
        __extends(JSTreeNode_ComponentExamples, _super);
        function JSTreeNode_ComponentExamples() {
            return _super.call(this, "Component examples") || this;
        }
        JSTreeNode_ComponentExamples.getInstance = function () {
            if (JSTreeNode_ComponentExamples.instance === undefined) {
                JSTreeNode_ComponentExamples.instance = new JSTreeNode_ComponentExamples();
            }
            return JSTreeNode_ComponentExamples.instance;
        };
        return JSTreeNode_ComponentExamples;
    }(JSTreeNode));
    jstutorial.JSTreeNode_ComponentExamples = JSTreeNode_ComponentExamples;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSTreeNode_ComponentTutorials = (function (_super) {
        __extends(JSTreeNode_ComponentTutorials, _super);
        function JSTreeNode_ComponentTutorials() {
            return _super.call(this, "Component tutorials") || this;
        }
        JSTreeNode_ComponentTutorials.getInstance = function () {
            if (JSTreeNode_ComponentTutorials.instance === undefined) {
                JSTreeNode_ComponentTutorials.instance = new JSTreeNode_ComponentTutorials();
            }
            return JSTreeNode_ComponentTutorials.instance;
        };
        return JSTreeNode_ComponentTutorials;
    }(JSTreeNode));
    jstutorial.JSTreeNode_ComponentTutorials = JSTreeNode_ComponentTutorials;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSTreeNode_ContainerExamples = (function (_super) {
        __extends(JSTreeNode_ContainerExamples, _super);
        function JSTreeNode_ContainerExamples() {
            return _super.call(this, "Container examples") || this;
        }
        JSTreeNode_ContainerExamples.getInstance = function () {
            if (JSTreeNode_ContainerExamples.instance === undefined) {
                JSTreeNode_ContainerExamples.instance = new JSTreeNode_ContainerExamples();
            }
            return JSTreeNode_ContainerExamples.instance;
        };
        return JSTreeNode_ContainerExamples;
    }(JSTreeNode));
    jstutorial.JSTreeNode_ContainerExamples = JSTreeNode_ContainerExamples;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSTreeNode_ContainerTutorials = (function (_super) {
        __extends(JSTreeNode_ContainerTutorials, _super);
        function JSTreeNode_ContainerTutorials() {
            return _super.call(this, "Container tutorials") || this;
        }
        JSTreeNode_ContainerTutorials.getInstance = function () {
            if (JSTreeNode_ContainerTutorials.instance === undefined) {
                JSTreeNode_ContainerTutorials.instance = new JSTreeNode_ContainerTutorials();
            }
            return JSTreeNode_ContainerTutorials.instance;
        };
        return JSTreeNode_ContainerTutorials;
    }(JSTreeNode));
    jstutorial.JSTreeNode_ContainerTutorials = JSTreeNode_ContainerTutorials;
})(jstutorial || (jstutorial = {}));
