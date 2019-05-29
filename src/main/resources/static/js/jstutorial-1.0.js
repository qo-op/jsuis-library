var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
            return _super.call(this, "About", new JSPathIcon("0 0 24 24", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z", 16, 16).withFill("GoldenRod")) || this;
        }
        JSAction_About.getInstance = function () {
            if (JSAction_About.instance === undefined) {
                JSAction_About.instance = new JSAction_About();
            }
            return JSAction_About.instance;
        };
        JSAction_About.prototype.actionPerformed = function (mouseEvent) {
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
            var jsSplitPane_Main = jstutorial.JSSplitPane_JSTutorial.getInstance();
            var jsSplitPane_Main_JSSplitPaneLeftContainer = jsSplitPane_Main.getLeftContainer();
            jsSplitPane_Main.setDividerLocation(jsSplitPane_Main_JSSplitPaneLeftContainer.getBorderRightWidth());
            var jsPanel_ToggleButtonPanel = jstutorial.JSPanel_ToggleButtonPanel.getInstance();
            jsPanel_ToggleButtonPanel.first();
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
            var jsSplitPane_Main = jstutorial.JSSplitPane_JSTutorial.getInstance();
            jsSplitPane_Main.setDividerLocation(jsSplitPane_Main.getLeftComponent().getPreferredOuterWidth() + 1);
            var jsPanel_ToggleButtonPanel = jstutorial.JSPanel_ToggleButtonPanel.getInstance();
            jsPanel_ToggleButtonPanel.last();
        };
        return JSAction_Expand;
    }(JSAction));
    jstutorial.JSAction_Expand = JSAction_Expand;
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
            JSForm.post("/tutorials/jsbutton");
        };
        return JSAction_JSButtonTutorial;
    }(JSAction));
    jstutorial.JSAction_JSButtonTutorial = JSAction_JSButtonTutorial;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSAction_JSUISTutorial = (function (_super) {
        __extends(JSAction_JSUISTutorial, _super);
        function JSAction_JSUISTutorial() {
            return _super.call(this, "How to use JSUIS") || this;
        }
        JSAction_JSUISTutorial.getInstance = function () {
            if (JSAction_JSUISTutorial.instance === undefined) {
                JSAction_JSUISTutorial.instance = new JSAction_JSUISTutorial();
            }
            return JSAction_JSUISTutorial.instance;
        };
        JSAction_JSUISTutorial.prototype.actionPerformed = function (mouseEvent) {
            JSForm.post("/tutorials/jsuis.html");
        };
        return JSAction_JSUISTutorial;
    }(JSAction));
    jstutorial.JSAction_JSUISTutorial = JSAction_JSUISTutorial;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSButton_CollapseButton = (function (_super) {
        __extends(JSButton_CollapseButton, _super);
        function JSButton_CollapseButton() {
            var _this = _super.call(this, jstutorial.JSAction_Collapse.getInstance()) || this;
            _this.addClass("JSButton_CollapseButton");
            _this.setUndecorated(true);
            return _this;
        }
        JSButton_CollapseButton.getInstance = function () {
            if (JSButton_CollapseButton.instance === undefined) {
                JSButton_CollapseButton.instance = new JSButton_CollapseButton();
            }
            return JSButton_CollapseButton.instance;
        };
        return JSButton_CollapseButton;
    }(JSButton));
    jstutorial.JSButton_CollapseButton = JSButton_CollapseButton;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSButton_ExpandButton = (function (_super) {
        __extends(JSButton_ExpandButton, _super);
        function JSButton_ExpandButton() {
            var _this = _super.call(this, jstutorial.JSAction_Expand.getInstance()) || this;
            _this.addClass("JSButton_ExpandButton");
            _this.setUndecorated(true);
            return _this;
        }
        JSButton_ExpandButton.getInstance = function () {
            if (JSButton_ExpandButton.instance === undefined) {
                JSButton_ExpandButton.instance = new JSButton_ExpandButton();
            }
            return JSButton_ExpandButton.instance;
        };
        return JSButton_ExpandButton;
    }(JSButton));
    jstutorial.JSButton_ExpandButton = JSButton_ExpandButton;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSFrame_JSTutorial = (function (_super) {
        __extends(JSFrame_JSTutorial, _super);
        function JSFrame_JSTutorial() {
            var _this = _super.call(this) || this;
            _this.setLayout(new JSBorderLayout());
            _this.setTitle("JSUIS - JavaScript User Interface");
            var jsMenuBar_Main = jstutorial.JSMenuBar_JSTutorial.getInstance();
            _this.setMenuBar(jsMenuBar_Main);
            var jsMenu_Tutorials = jstutorial.JSMenu_Tutorials.getInstance();
            jsMenuBar_Main.add(jsMenu_Tutorials);
            var jsMenu_Examples = jstutorial.JSMenu_Examples.getInstance();
            jsMenuBar_Main.add(jsMenu_Examples);
            var jsMenu_Help = jstutorial.JSMenu_Help.getInstance();
            jsMenuBar_Main.add(jsMenu_Help);
            var jsMenuItem_JSUISTutorial = jstutorial.JSMenuItem_JSUISTutorial.getInstance();
            jsMenu_Tutorials.add(jsMenuItem_JSUISTutorial);
            jsMenu_Tutorials.addSeparator();
            var jsMenu_ContainerTutorials = jstutorial.JSMenu_ContainerTutorials.getInstance();
            jsMenu_Tutorials.add(jsMenu_ContainerTutorials);
            var jsMenu_ComponentTutorials = jstutorial.JSMenu_ComponentTutorials.getInstance();
            jsMenu_Tutorials.add(jsMenu_ComponentTutorials);
            var jsMenu_ContainerExamples = jstutorial.JSMenu_ContainerExamples.getInstance();
            jsMenu_Examples.add(jsMenu_ContainerExamples);
            var jsMenu_ComponentExamples = jstutorial.JSMenu_ComponentExamples.getInstance();
            jsMenu_Examples.add(jsMenu_ComponentExamples);
            var jsMenuItem_About = jstutorial.JSMenuItem_About.getInstance();
            jsMenu_Help.add(jsMenuItem_About);
            var jsMenuItem_JSFrameTutorial = jstutorial.JSMenuItem_JSFrameTutorial.getInstance();
            jsMenu_ContainerTutorials.add(jsMenuItem_JSFrameTutorial);
            var jsMenuItem_JSButtonTutorial = jstutorial.JSMenuItem_JSButtonTutorial.getInstance();
            jsMenu_ComponentTutorials.add(jsMenuItem_JSButtonTutorial);
            var jsMenuItem_JSFrameExample = jstutorial.JSMenuItem_JSFrameExample.getInstance();
            jsMenu_ContainerExamples.add(jsMenuItem_JSFrameExample);
            var jsMenuItem_JSButtonExample = jstutorial.JSMenuItem_JSButtonExample.getInstance();
            jsMenu_ComponentExamples.add(jsMenuItem_JSButtonExample);
            var jsTabbedPane_JSTutorial = jstutorial.JSTabbedPane_JSTutorial.getInstance();
            var jsTabbedPaneTabContainer_JSTutorial = jsTabbedPane_JSTutorial.getTabContainer();
            _this.add(jsTabbedPaneTabContainer_JSTutorial, JSBorderLayout.WEST);
            var jsSplitPane_JSTutorial = jstutorial.JSSplitPane_JSTutorial.getInstance();
            _this.add(jsSplitPane_JSTutorial);
            var jsTabbedPaneCardContainer_JSTutorial = jsTabbedPane_JSTutorial.getCardContainer();
            jsSplitPane_JSTutorial.setLeftComponent(jsTabbedPaneCardContainer_JSTutorial);
            var jsTabbedPaneButtonContainer_JSTutorial = jsTabbedPane_JSTutorial.getButtonContainer();
            var jsPanel_ToogleButtonPanel = jstutorial.JSPanel_ToggleButtonPanel.getInstance();
            jsTabbedPaneButtonContainer_JSTutorial.add(jsPanel_ToogleButtonPanel);
            var jsButton_ExpandButton = jstutorial.JSButton_ExpandButton.getInstance();
            jsPanel_ToogleButtonPanel.add(jsButton_ExpandButton);
            var jsButton_CollapseButton = jstutorial.JSButton_CollapseButton.getInstance();
            jsPanel_ToogleButtonPanel.add(jsButton_CollapseButton);
            var jsTree_Tutorials = jstutorial.JSTree_Tutorials.getInstance();
            jsTabbedPane_JSTutorial.addTab("Tutorials", new JSImageIcon("/img/baseline-local_library-24px.svg", 24, 24), new JSScrollPane(jsTree_Tutorials));
            var jsTreeNode_TutorialsRoot = new JSTreeNode();
            jsTree_Tutorials.setRoot(jsTreeNode_TutorialsRoot);
            var jsTreeNode_ContainerTutorials = new JSTreeNode("Container tutorials");
            jsTreeNode_TutorialsRoot.add(jsTreeNode_ContainerTutorials);
            var jsTreeNode_JSFrameTutorial = new JSTreeNode("How to use JS Frame");
            jsTreeNode_ContainerTutorials.add(jsTreeNode_JSFrameTutorial);
            var jsTreeNode_ComponentTutorials = new JSTreeNode("Component tutorials");
            jsTreeNode_TutorialsRoot.add(jsTreeNode_ComponentTutorials);
            var jsTreeNode_JSButtonTutorial = new JSTreeNode("How to use JS Button");
            jsTreeNode_ComponentTutorials.add(jsTreeNode_JSButtonTutorial);
            var jsIcon_Leaf = jstutorial.JSIcon_Leaf.getInstance();
            var jsIcon_Open = jstutorial.JSIcon_Open.getInstance();
            var jsIcon_Closed = jstutorial.JSIcon_Closed.getInstance();
            var treeCellRenderer_Tutorials = jsTree_Tutorials.getTreeCellRenderer();
            treeCellRenderer_Tutorials.setLeafIcon(jsIcon_Leaf);
            treeCellRenderer_Tutorials.setOpenIcon(jsIcon_Open);
            treeCellRenderer_Tutorials.setClosedIcon(jsIcon_Closed);
            var jsTree_Examples = jstutorial.JSTree_Examples.getInstance();
            jsTabbedPane_JSTutorial.addTab("Examples", new JSImageIcon("/img/baseline-playlist_play-24px.svg", 24, 24), new JSScrollPane(jsTree_Examples));
            var jsTreeNode_ExamplesRoot = new JSTreeNode();
            jsTree_Examples.setRoot(jsTreeNode_ExamplesRoot);
            var jsTreeNode_ContainerExamples = new JSTreeNode("Container examples");
            jsTreeNode_ExamplesRoot.add(jsTreeNode_ContainerExamples);
            var jsTreeNode_JSFrameExample = new JSTreeNode("JS Frame example(s)");
            jsTreeNode_ContainerExamples.add(jsTreeNode_JSFrameExample);
            var jsTreeNode_ComponentExamples = new JSTreeNode("Component examples");
            jsTreeNode_ExamplesRoot.add(jsTreeNode_ComponentExamples);
            var jsTreeNode_JSButtonExample = new JSTreeNode("JS Button example(s)");
            jsTreeNode_ComponentExamples.add(jsTreeNode_JSButtonExample);
            var treeCellRenderer_Tutorials = jsTree_Examples.getTreeCellRenderer();
            treeCellRenderer_Tutorials.setLeafIcon(jsIcon_Leaf);
            treeCellRenderer_Tutorials.setOpenIcon(jsIcon_Open);
            treeCellRenderer_Tutorials.setClosedIcon(jsIcon_Closed);
            jsTabbedPane_JSTutorial.setSelectedIndex(0);
            jsTree_Tutorials.expand(jsTreeNode_ContainerTutorials);
            jsTree_Tutorials.expand(jsTreeNode_ComponentTutorials);
            jsTree_Examples.expand(jsTreeNode_ContainerExamples);
            jsTree_Examples.expand(jsTreeNode_ComponentExamples);
            jsSplitPane_JSTutorial.setDividerLocation(jsSplitPane_JSTutorial.getLeftComponent().getPreferredOuterWidth() + 1);
            var jsAction_ExpandButton = jstutorial.JSAction_Expand.getInstance();
            jsTabbedPane_JSTutorial.getTabComponentAt(0).addActionListener(jsAction_ExpandButton);
            jsTabbedPane_JSTutorial.getTabComponentAt(1).addActionListener(jsAction_ExpandButton);
            return _this;
        }
        JSFrame_JSTutorial.prototype.init = function () {
            this.addClass("JSFrame");
            this.addClass("JSFrame_JSTutorial");
            var jsSplitPane_JSTutorial = jstutorial.JSSplitPane_JSTutorial.getInstance();
            var jsPanel = new JSPanel(document.getElementById("content"));
            jsSplitPane_JSTutorial.setRightComponent(new JSScrollPane(jsPanel));
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
            var _this = _super.call(this, "JS Button example") || this;
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
            var _this = _super.call(this, "JS Frame example") || this;
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
            var _this = _super.call(this, "How to use JS Frame") || this;
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
    var JSPanel_ToggleButtonPanel = (function (_super) {
        __extends(JSPanel_ToggleButtonPanel, _super);
        function JSPanel_ToggleButtonPanel() {
            var _this = _super.call(this, new JSCardLayout()) || this;
            _this.addClass("JSPanel_ToggleButtonPanel");
            return _this;
        }
        JSPanel_ToggleButtonPanel.getInstance = function () {
            if (JSPanel_ToggleButtonPanel.instance === undefined) {
                JSPanel_ToggleButtonPanel.instance = new JSPanel_ToggleButtonPanel();
            }
            return JSPanel_ToggleButtonPanel.instance;
        };
        JSPanel_ToggleButtonPanel.prototype.toggle = function () {
            var cardLayout = this.getLayout();
            var selectedIndex = cardLayout.getSelectedIndex(this);
            var componentCount = this.getComponentCount();
            selectedIndex = (selectedIndex + 1) % componentCount;
            cardLayout.setSelectedIndex(this, selectedIndex);
        };
        JSPanel_ToggleButtonPanel.prototype.first = function () {
            var cardLayout = this.getLayout();
            cardLayout.first(this);
        };
        JSPanel_ToggleButtonPanel.prototype.last = function () {
            var cardLayout = this.getLayout();
            cardLayout.last(this);
        };
        return JSPanel_ToggleButtonPanel;
    }(JSPanel));
    jstutorial.JSPanel_ToggleButtonPanel = JSPanel_ToggleButtonPanel;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSSplitPane_JSTutorial = (function (_super) {
        __extends(JSSplitPane_JSTutorial, _super);
        function JSSplitPane_JSTutorial() {
            var _this = _super.call(this) || this;
            _this.addClass("JSSplitPane_JSTutorial");
            return _this;
        }
        JSSplitPane_JSTutorial.getInstance = function () {
            if (JSSplitPane_JSTutorial.instance === undefined) {
                JSSplitPane_JSTutorial.instance = new JSSplitPane_JSTutorial();
            }
            return JSSplitPane_JSTutorial.instance;
        };
        return JSSplitPane_JSTutorial;
    }(JSSplitPane));
    jstutorial.JSSplitPane_JSTutorial = JSSplitPane_JSTutorial;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSTabbedPane_JSTutorial = (function (_super) {
        __extends(JSTabbedPane_JSTutorial, _super);
        function JSTabbedPane_JSTutorial() {
            var _this = _super.call(this, JSTabbedPane.LEFT) || this;
            _this.addClass("JSTabbedPane_JSTutorial");
            return _this;
        }
        JSTabbedPane_JSTutorial.getInstance = function () {
            if (JSTabbedPane_JSTutorial.instance === undefined) {
                JSTabbedPane_JSTutorial.instance = new JSTabbedPane_JSTutorial();
            }
            return JSTabbedPane_JSTutorial.instance;
        };
        return JSTabbedPane_JSTutorial;
    }(JSTabbedPane));
    jstutorial.JSTabbedPane_JSTutorial = JSTabbedPane_JSTutorial;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSTree_Examples = (function (_super) {
        __extends(JSTree_Examples, _super);
        function JSTree_Examples() {
            var _this = _super.call(this) || this;
            _this.setRootVisible(false);
            _this.setStyle("margin", "4px 0");
            _this.addClass("JSTree_Examples");
            return _this;
        }
        JSTree_Examples.getInstance = function () {
            if (JSTree_Examples.instance === undefined) {
                JSTree_Examples.instance = new JSTree_Examples();
            }
            return JSTree_Examples.instance;
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
            _this.setStyle("margin", "4px 0");
            _this.addClass("JSTree_Tutorials");
            return _this;
        }
        JSTree_Tutorials.getInstance = function () {
            if (JSTree_Tutorials.instance === undefined) {
                JSTree_Tutorials.instance = new JSTree_Tutorials();
            }
            return JSTree_Tutorials.instance;
        };
        return JSTree_Tutorials;
    }(JSTree));
    jstutorial.JSTree_Tutorials = JSTree_Tutorials;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSFrame_JSButtonTutorial = (function (_super) {
        __extends(JSFrame_JSButtonTutorial, _super);
        function JSFrame_JSButtonTutorial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JSFrame_JSButtonTutorial.prototype.init = function () {
            this.addClass("JSFrame");
            this.addClass("JSFrame_JSButtonTutorial");
            var jsSplitPane_JSTutorial = jstutorial.JSSplitPane_JSTutorial.getInstance();
            var jsPanel = new JSPanel(document.getElementById("content"));
            jsSplitPane_JSTutorial.setRightComponent(new JSScrollPane(jsPanel));
        };
        return JSFrame_JSButtonTutorial;
    }(jstutorial.JSFrame_JSTutorial));
    jstutorial.JSFrame_JSButtonTutorial = JSFrame_JSButtonTutorial;
})(jstutorial || (jstutorial = {}));
var jstutorial;
(function (jstutorial) {
    var JSFrame_JSUISTutorial = (function (_super) {
        __extends(JSFrame_JSUISTutorial, _super);
        function JSFrame_JSUISTutorial() {
            var _this = _super.call(this) || this;
            _this.addClass("JSFrame_JSUISTutorial");
            var jsTutorialSplitPane = jstutorial.JSSplitPane_JSTutorial.getInstance();
            var contentPanel = new JSPanel();
            jsTutorialSplitPane.setRightComponent(contentPanel);
            var blahLabel = new JSLabel("blah");
            contentPanel.add(blahLabel);
            return _this;
        }
        return JSFrame_JSUISTutorial;
    }(jstutorial.JSFrame_JSTutorial));
    jstutorial.JSFrame_JSUISTutorial = JSFrame_JSUISTutorial;
})(jstutorial || (jstutorial = {}));
