/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSUIS_Tutorial
 */
namespace jsuistutorial {
    export class JSUIS_Tutorial {
        
        private static instance: JSUIS_Tutorial;
        static getInstance(): JSUIS_Tutorial {
            if (JSUIS_Tutorial.instance === undefined) {
                JSUIS_Tutorial.instance = new JSUIS_Tutorial();
            }
            return JSUIS_Tutorial.instance;
        }
        
        private action_About: JSAction_About;
        private action_Collapse: JSAction_Collapse;
        private action_Expand: JSAction_Expand;
        private action_JSButtonExample: JSAction_JSButtonExample;
        private action_JSButtonTutorial: JSAction_JSButtonTutorial;
        private action_JSFrameExample: JSAction_JSFrameExample;
        private action_JSFrameTutorial: JSAction_JSFrameTutorial;
        private action_JSProgressBarExample: JSAction_JSProgressBarExample;
        private action_JSTableExample: JSAction_JSTableExample;
        private action_JSTextFieldExample: JSAction_JSTextFieldExample;
        private action_JSUISTutorial: JSAction_JSUISTutorial;
        private button_Collapse: JSButton_Collapse;
        private button_Expand: JSButton_Expand;
        private dialog_About: JSDialog_About;
        private div_Tutorial: JSDiv;
        private frame: JSFrame_Tutorial;
        private icon_Closed: JSIcon_Closed;
        private icon_Leaf: JSIcon_Leaf;
        private icon_Open: JSIcon_Open;
        private label_Title: JSLabel_Title;
        private menu_ComponentExamples: JSMenu_ComponentExamples;
        private menu_ComponentTutorials: JSMenu_ComponentTutorials;
        private menu_ContainerExamples: JSMenu_ContainerExamples;
        private menu_ContainerTutorials: JSMenu_ContainerTutorials;
        private menu_Examples: JSMenu_Examples;
        private menu_Help: JSMenu_Help;
        private menu_Tutorials: JSMenu_Tutorials;
        private menuBar: JSMenuBar_Tutorial;
        private menuItem_About: JSMenuItem_About;
        private menuItem_JSButtonExample: JSMenuItem_JSButtonExample
        private menuItem_JSButtonTutorial: JSMenuItem_JSButtonTutorial;
        private menuItem_JSFrameExample: JSMenuItem_JSFrameExample;
        private menuItem_JSFrameTutorial: JSMenuItem_JSFrameTutorial;
        private menuItem_JSTableExample: JSMenuItem_JSTableExample;
        private menuItem_JSUISTutorial: JSMenuItem_JSUISTutorial;
        private panel_ToggleButton: JSPanel_ToggleButton;
        private properties: JSProperties_Tutorial;
        private splitPane: JSSplitPane_Tutorial;
        private tabbedPane_Example: JSTabbedPane_Example;
        private tabbedPane: JSTabbedPane_Tutorial;
        private tree_Examples: JSTree_Examples;
        private tree_Tutorials: JSTree_Tutorials;
        private treeNode_ComponentExamples: JSTreeNode_ComponentExamples;
        private treeNode_ComponentTutorials: JSTreeNode_ComponentTutorials;
        private treeNode_ContainerExamples: JSTreeNode_ContainerExamples;
        private treeNode_ContainerTutorials: JSTreeNode_ContainerTutorials;
        
        getAboutAction(): JSAction_About {
            if (!this.action_About) {
                this.action_About = new JSAction_About();
                this.action_About.dialog_About = this.getAboutDialog();
            }
            return this.action_About
        }
        getCollapseAction(): JSAction_Collapse {
            if (!this.action_Collapse) {
                this.action_Collapse = new JSAction_Collapse();
                this.action_Collapse.panel_ToggleButton = this.getToggleButtonPanel();
                this.action_Collapse.splitPane = this.getSplitPane();
            }
            return this.action_Collapse;
        }
        getExpandAction(): JSAction_Expand {
            if (!this.action_Expand) {
                this.action_Expand = new JSAction_Expand();
                this.action_Expand.panel_ToggleButton = this.getToggleButtonPanel();
                this.action_Expand.splitPane = this.getSplitPane();
            }
            return this.action_Expand;
        }
        getJSButtonExampleAction(): JSAction_JSButtonExample {
            if (!this.action_JSButtonExample) {
                this.action_JSButtonExample = new JSAction_JSButtonExample();
                this.action_JSButtonExample.setIcon(this.getLeafIcon());
            }
            return this.action_JSButtonExample;
        }
        getJSButtonTutorialAction(): JSAction_JSButtonTutorial {
            if (!this.action_JSButtonTutorial) {
                this.action_JSButtonTutorial = new JSAction_JSButtonTutorial();
                this.action_JSButtonTutorial.setIcon(this.getLeafIcon());
            }
            return this.action_JSButtonTutorial;
        }
        getJSFrameExampleAction(): JSAction_JSFrameExample {
            if (!this.action_JSFrameExample) {
                this.action_JSFrameExample = new JSAction_JSFrameExample();
                this.action_JSFrameExample.setIcon(this.getLeafIcon());
            }
            return this.action_JSFrameExample;
        }
        getJSFrameTutorialAction(): JSAction_JSFrameTutorial {
            if (!this.action_JSFrameTutorial) {
                this.action_JSFrameTutorial = new JSAction_JSFrameTutorial();
                this.action_JSFrameTutorial.setIcon(this.getLeafIcon());
            }
            return this.action_JSFrameTutorial;
        }
        getJSProgressBarExampleAction(): JSAction_JSProgressBarExample {
            if (!this.action_JSProgressBarExample) {
                this.action_JSProgressBarExample = new JSAction_JSProgressBarExample();
                this.action_JSProgressBarExample.setIcon(this.getLeafIcon());
            }
            return this.action_JSProgressBarExample;
        }
        getJSTableExampleAction(): JSAction_JSTableExample {
            if (!this.action_JSTableExample) {
                this.action_JSTableExample = new JSAction_JSTableExample();
                this.action_JSTableExample.setIcon(this.getLeafIcon());
            }
            return this.action_JSTableExample;
        }
        getJSTextFieldExampleAction(): JSAction_JSTextFieldExample {
            if (!this.action_JSTextFieldExample) {
                this.action_JSTextFieldExample = new JSAction_JSTextFieldExample();
                this.action_JSTextFieldExample.setIcon(this.getLeafIcon());
            }
            return this.action_JSTextFieldExample;
        }
        getJSUISTutorialAction(): JSAction_JSUISTutorial {
            if (!this.action_JSUISTutorial) {
                this.action_JSUISTutorial = new JSAction_JSUISTutorial();
                this.action_JSUISTutorial.setIcon(this.getLeafIcon());
            }
            return this.action_JSUISTutorial;
        }
        getCollapseButton(): JSButton_Collapse {
            if (!this.button_Collapse) {
                this.button_Collapse = new JSButton_Collapse();
                this.button_Collapse.setAction(this.getCollapseAction());
            }
            return this.button_Collapse;
        }
        getExpandButton(): JSButton_Expand {
            if (!this.button_Expand) {
                this.button_Expand = new JSButton_Expand();
                this.button_Expand.setAction(this.getExpandAction());
            }
            return this.button_Expand;
        }
        getAboutDialog(): JSDialog_About {
            if (!this.dialog_About) {
                this.dialog_About = new JSDialog_About();
            }
            return this.dialog_About;
        }
        getFrame(): JSFrame_Tutorial {
            if (!this.frame) {
                this.frame = new JSFrame_Tutorial();
                
                this.frame.setLayout(new JSBorderLayout());
                
                var label_Title: JSLabel_Title = this.getTitleLabel();
                this.frame.add(label_Title, JSBorderLayout.NORTH);
                
                var menuBar: JSMenuBar_Tutorial = this.getMenuBar();
                this.frame.add(menuBar, JSBorderLayout.NORTH);
                
                var tabbedPane: JSTabbedPane_Tutorial = this.getTutorialTabbedPane();
                
                var tabbedPaneTabContainer_Tutorial: JSTabbedPaneTabContainer = tabbedPane.getTabContainer();
                tabbedPaneTabContainer_Tutorial.addClass("JSTabbedPaneTabContainer_Tutorial");
                this.frame.add(tabbedPaneTabContainer_Tutorial, JSBorderLayout.WEST);
                
                var splitPane: JSSplitPane_Tutorial = this.getSplitPane();
                this.frame.add(splitPane);
                
                var tabbedPaneCardContainer_Tutorial: JSTabbedPaneCardContainer = tabbedPane.getCardContainer();
                splitPane.setLeftComponent(tabbedPaneCardContainer_Tutorial);
                
                var panel_ToggleButton: JSPanel_ToggleButton = this.getToggleButtonPanel();
                panel_ToggleButton.setAlign(JSFlowLayout.TOP);
                tabbedPaneTabContainer_Tutorial.add(panel_ToggleButton);
                
                var tree_Tutorials: JSTree = this.getTutorialsTree();
                tabbedPane.addTab("Tutorials", new JSImageIcon("/img/baseline-local_library-24px-GoldenRod.svg", 24, 24), new JSScrollPane(tree_Tutorials));
                
                var tree_Examples: JSTree = this.getExamplesTree();
                tabbedPane.addTab("Examples", new JSImageIcon("/img/baseline-playlist_play-24px-Green.svg", 24, 24), new JSScrollPane(tree_Examples));
                
                tabbedPane.setSelectedIndex(0);
                
                var action_ExpandButton: JSAction_Expand = this.getExpandAction();
                tabbedPane.getTabComponentAt(0).addActionListener(action_ExpandButton);
                tabbedPane.getTabComponentAt(1).addActionListener(action_ExpandButton);
                
                splitPane.setDividerLocation(splitPane.getLeftContainer().getPreferredOuterWidth());
                
                var div_Tutorial: JSDiv = this.getDiv_Tutorial();
                if (div_Tutorial) {
                    splitPane.setRightComponent(new JSScrollPane(div_Tutorial));
                } else {
                    var tabbedPane_Example: JSTabbedPane_Example = this.getExampleTabbedPane();
                    splitPane.setRightComponent(tabbedPane_Example);
                }
                
                /*
                var element = document.getElementById("tutorial");
                if (element) {
                    var div_Tutorial: JSDiv = new JSDiv(element);
                    splitPane.setRightComponent(new JSScrollPane(div_Tutorial));
                } else {
                    element = document.getElementById("example");
                    if (element) {
                        var tabbedPane_Example: JSTabbedPane_Example = this.getExampleTabbedPane();
                        splitPane.setRightComponent(tabbedPane_Example);
                    }
                }
                */
                
                var properties: JSProperties_Tutorial = this.getProperties();
                var panel_ToggleButton_first: boolean = JSON.parse(properties.getProperty("panel_ToggleButton_first"));
                if (panel_ToggleButton_first) {
                    var action_Collapse: JSAction_Collapse = this.getCollapseAction();
                    action_Collapse.actionPerformed(null);
                } else {
                    var splitPane_dividerLocation: number = JSON.parse(properties.getProperty("splitPane_dividerLocation"));
                    if (splitPane_dividerLocation !== null) {
                        splitPane.setDividerLocation(splitPane_dividerLocation);
                    }
                }
                var tabbedPane_selectedIndex: number = JSON.parse(properties.getProperty("tabbedPane_selectedIndex"));
                if (tabbedPane_selectedIndex !== null && tabbedPane_selectedIndex !== -1) {
                    var tabbedPane: JSTabbedPane_Tutorial = this.getTutorialTabbedPane();
                    tabbedPane.setSelectedIndex(tabbedPane_selectedIndex);
                }
            }
            return this.frame;
        }
        getClosedIcon(): JSIcon_Closed {
            if (!this.icon_Closed) {
                this.icon_Closed = new JSIcon_Closed();
            }
            return this.icon_Closed;
        }
        getDiv_Tutorial(): JSDiv {
            if (!this.div_Tutorial) {
                var element = document.getElementById("tutorial");
                if (element) {
                    this.div_Tutorial = new JSDiv(element);
                }
            }
            return this.div_Tutorial;
        }
        getLeafIcon(): JSIcon_Leaf {
            if (!this.icon_Leaf) {
                this.icon_Leaf = new JSIcon_Leaf();
            }
            return this.icon_Leaf;
        }
        getOpenIcon(): JSIcon_Open {
            if (!this.icon_Open) {
                this.icon_Open = new JSIcon_Open();
            }
            return this.icon_Open;
        }
        getTitleLabel(): JSLabel_Title {
            if (!this.label_Title) {
                this.label_Title = new JSLabel_Title();
            }
            return this.label_Title;
        }
        getAboutMenuItem(): JSMenuItem_About {
            if (!this.menuItem_About) {
                this.menuItem_About = new JSMenuItem_About();
                this.menuItem_About.setAction(this.getAboutAction());
            }
            return this.menuItem_About;
        }
        getJSButtonExampleMenuItem(): JSMenuItem_JSButtonExample {
            if (!this.menuItem_JSButtonExample) {
                this.menuItem_JSButtonExample = new JSMenuItem_JSButtonExample();
                this.menuItem_JSButtonExample.setAction(this.getJSButtonExampleAction());
            }
            return this.menuItem_JSButtonExample;
        }
        getJSButtonTutorialMenuItem(): JSMenuItem_JSButtonTutorial {
            if (!this.menuItem_JSButtonTutorial) {
                this.menuItem_JSButtonTutorial = new JSMenuItem_JSButtonTutorial();
                this.menuItem_JSButtonTutorial.setAction(this.getJSButtonTutorialAction());
            }
            return this.menuItem_JSButtonTutorial;
        }
        getJSFrameExampleMenuItem(): JSMenuItem_JSFrameExample {
            if (!this.menuItem_JSFrameExample) {
                this.menuItem_JSFrameExample = new JSMenuItem_JSFrameExample();
                this.menuItem_JSFrameExample.setAction(this.getJSFrameExampleAction());
            }
            return this.menuItem_JSFrameExample;
        }
        getJSFrameTutorialMenuItem(): JSMenuItem_JSFrameTutorial {
            if (!this.menuItem_JSFrameTutorial) {
                this.menuItem_JSFrameTutorial = new JSMenuItem_JSFrameTutorial();
                this.menuItem_JSFrameTutorial.setAction(this.getJSFrameTutorialAction());
            }
            return this.menuItem_JSFrameTutorial;
        }
        getJSTableExampleMenuItem(): JSMenuItem_JSTableExample {
            if (!this.menuItem_JSTableExample) {
                this.menuItem_JSTableExample = new JSMenuItem_JSTableExample();
                this.menuItem_JSTableExample.setAction(this.getJSTableExampleAction());
            }
            return this.menuItem_JSTableExample;
        }
        getJSUISTutorialMenuItem(): JSMenuItem_JSUISTutorial {
            if (!this.menuItem_JSUISTutorial) {
                this.menuItem_JSUISTutorial = new JSMenuItem_JSUISTutorial();
                this.menuItem_JSUISTutorial.setAction(this.getJSUISTutorialAction());
            }
            return this.menuItem_JSUISTutorial;
        }
        getComponentExamplesMenu(): JSMenu_ComponentExamples {
            if (!this.menu_ComponentExamples) {
                this.menu_ComponentExamples = new JSMenu_ComponentExamples();
                this.menu_ComponentExamples.setIcon(this.getClosedIcon());
                
                var menuItem_JSButtonExample: JSMenuItem_JSButtonExample = this.getJSButtonExampleMenuItem();
                this.menu_ComponentExamples.add(menuItem_JSButtonExample);
                
                var menuItem_JSTableExample: JSMenuItem_JSTableExample = this.getJSTableExampleMenuItem();
                // this.menu_ComponentExamples.add(menuItem_JSTableExample);
            }
            return this.menu_ComponentExamples;
        }
        getComponentTutorialsMenu(): JSMenu_ComponentTutorials {
            if (!this.menu_ComponentTutorials) {
                this.menu_ComponentTutorials = new JSMenu_ComponentTutorials();
                this.menu_ComponentTutorials.setIcon(this.getClosedIcon());
                
                var menuItem_JSButtonTutorial: JSMenuItem_JSButtonTutorial = this.getJSButtonTutorialMenuItem();
                this.menu_ComponentTutorials.add(menuItem_JSButtonTutorial);
            }
            return this.menu_ComponentTutorials;
        }
        getContainerExamplesMenu(): JSMenu_ContainerExamples {
            if (!this.menu_ContainerExamples) {
                this.menu_ContainerExamples = new JSMenu_ContainerExamples();
                this.menu_ContainerExamples.setIcon(this.getClosedIcon());
                
                var menuItem_JSFrameExample: JSMenuItem_JSFrameExample = this.getJSFrameExampleMenuItem();
                this.menu_ContainerExamples.add(menuItem_JSFrameExample);
            }
            return this.menu_ContainerExamples;
        }
        getContainerTutorialsMenu(): JSMenu_ContainerTutorials {
            if (!this.menu_ContainerTutorials) {
                this.menu_ContainerTutorials = new JSMenu_ContainerTutorials();
                this.menu_ContainerTutorials.setIcon(this.getClosedIcon());
                
                var menuItem_JSFrameTutorial: JSMenuItem_JSFrameTutorial = this.getJSFrameTutorialMenuItem();
                this.menu_ContainerTutorials.add(menuItem_JSFrameTutorial);
            }
            return this.menu_ContainerTutorials;
        }
        getExamplesMenu(): JSMenu_Examples {
            if (!this.menu_Examples) {
                this.menu_Examples = new JSMenu_Examples();
                
                var menu_ContainerExamples: JSMenu_ContainerExamples = this.getContainerExamplesMenu();
                this.menu_Examples.add(menu_ContainerExamples);
                
                var menu_ComponentExamples: JSMenu_ComponentExamples = this.getComponentExamplesMenu();
                this.menu_Examples.add(menu_ComponentExamples);
            }
            return this.menu_Examples;
        }
        getHelpMenu(): JSMenu_Help {
            if (!this.menu_Help) {
                this.menu_Help = new JSMenu_Help();
                
                var menuItem_About: JSMenuItem_About = this.getAboutMenuItem();
                this.menu_Help.add(menuItem_About);
            }
            return this.menu_Help;
        }
        getTutorialsMenu(): JSMenu_Tutorials {
            if (!this.menu_Tutorials) {
                this.menu_Tutorials = new JSMenu_Tutorials();
                
                var menuItem_JSUISTutorial: JSMenuItem_JSUISTutorial = this.getJSUISTutorialMenuItem();
                this.menu_Tutorials.add(menuItem_JSUISTutorial);
                
                this.menu_Tutorials.addSeparator();
                
                var menu_ContainerTutorials: JSMenu_ContainerTutorials = this.getContainerTutorialsMenu();
                this.menu_Tutorials.add(menu_ContainerTutorials);
                
                var menu_ComponentTutorials: JSMenu_ComponentTutorials = this.getComponentTutorialsMenu();
                this.menu_Tutorials.add(menu_ComponentTutorials);
            }
            return this.menu_Tutorials;
        }
        getMenuBar(): JSMenuBar_Tutorial {
            if (!this.menuBar) {
                this.menuBar = new JSMenuBar_Tutorial();
                
                var menu_Tutorials: JSMenu_Tutorials = this.getTutorialsMenu();
                this.menuBar.add(menu_Tutorials);
                
                var menu_Examples: JSMenu_Examples = this.getExamplesMenu();
                this.menuBar.add(menu_Examples);
                
                var menu_Help: JSMenu_Help = this.getHelpMenu();
                this.menuBar.add(menu_Help);
            }
            return this.menuBar;
        }
        getToggleButtonPanel(): JSPanel_ToggleButton {
            if (!this.panel_ToggleButton) {
                this.panel_ToggleButton = new JSPanel_ToggleButton();
                
                var button_Expand: JSButton_Expand = this.getExpandButton();
                this.panel_ToggleButton.add(button_Expand);
                
                var button_Collapse: JSButton_Collapse = this.getCollapseButton();
                this.panel_ToggleButton.add(button_Collapse);
            }
            return this.panel_ToggleButton;
        }
        getProperties(): JSProperties_Tutorial {
            if (!this.properties) {
                this.properties = new JSProperties_Tutorial();
            }
            return this.properties;
        }
        getSplitPane(): JSSplitPane_Tutorial {
            if (!this.splitPane) {
                this.splitPane = new JSSplitPane_Tutorial();
            }
            return this.splitPane;
        }
        getExampleTabbedPane(): JSTabbedPane_Example {
            if (!this.tabbedPane_Example) {
                this.tabbedPane_Example = new JSTabbedPane_Example();
            }
            return this.tabbedPane_Example;
        }
        getTutorialTabbedPane(): JSTabbedPane_Tutorial {
            if (!this.tabbedPane) {
                this.tabbedPane = new JSTabbedPane_Tutorial();
            }
            return this.tabbedPane;
        }
        getExamplesTree(): JSTree_Examples {
            if (!this.tree_Examples) {
                this.tree_Examples = new JSTree_Examples();
                
                var treeCellRenderer_Examples = this.tree_Examples.getTreeCellRenderer();
                treeCellRenderer_Examples.setLeafIcon(this.getLeafIcon());
                treeCellRenderer_Examples.setOpenIcon(this.getOpenIcon());
                treeCellRenderer_Examples.setClosedIcon(this.getClosedIcon());
                
                var treeNode_ExamplesRoot: JSTreeNode = new JSTreeNode();
                this.tree_Examples.setRoot(treeNode_ExamplesRoot);
                var treeNode_ContainerExamples: JSTreeNode_ContainerExamples = this.getContainerExamplesTreeNode();
                treeNode_ExamplesRoot.add(treeNode_ContainerExamples);
                var treeNode_JSFrameExample = new JSTreeNode(this.getJSFrameExampleAction());
                treeNode_ContainerExamples.add(treeNode_JSFrameExample);
                var treeNode_ComponentExamples: JSTreeNode_ComponentExamples = this.getComponentExamplesTreeNode();
                treeNode_ExamplesRoot.add(treeNode_ComponentExamples);
                var treeNode_JSButtonExample = new JSTreeNode(this.getJSButtonExampleAction());
                treeNode_ComponentExamples.add(treeNode_JSButtonExample);
                var treeNode_JSProgressBarExample = new JSTreeNode(this.getJSProgressBarExampleAction());
                treeNode_ComponentExamples.add(treeNode_JSProgressBarExample);
                var treeNode_JSTextFieldExample = new JSTreeNode(this.getJSTextFieldExampleAction());
                treeNode_ComponentExamples.add(treeNode_JSTextFieldExample);
                
                var properties: JSProperties_Tutorial = this.getProperties();
                
                var treeNode_ContainerExamples_expanded: boolean = JSON.parse(properties.getProperty("treeNode_ContainerExamples_expanded"));
                if (treeNode_ContainerExamples_expanded !== null) {
                    if (treeNode_ContainerExamples_expanded) {
                        this.tree_Examples.expand(treeNode_ContainerExamples);
                    } else {
                        this.tree_Examples.collapse(treeNode_ContainerExamples);
                    }
                } else {
                    this.tree_Examples.expand(treeNode_ContainerExamples);
                }
                var treeNode_ComponentExamples_expanded: boolean = JSON.parse(properties.getProperty("treeNode_ComponentExamples_expanded"));
                if (treeNode_ComponentExamples_expanded !== null) {
                    if (treeNode_ComponentExamples_expanded) {
                        this.tree_Examples.expand(treeNode_ComponentExamples);
                    } else {
                        this.tree_Examples.collapse(treeNode_ComponentExamples);
                    }
                } else {
                    this.tree_Examples.expand(treeNode_ComponentExamples);
                }
            }
            return this.tree_Examples;
        }
        getTutorialsTree(): JSTree_Tutorials {
            if (!this.tree_Tutorials) {
                this.tree_Tutorials = new JSTree_Tutorials();
                
                var treeCellRenderer_Tutorials = this.tree_Tutorials.getTreeCellRenderer();
                treeCellRenderer_Tutorials.setLeafIcon(this.getLeafIcon());
                treeCellRenderer_Tutorials.setOpenIcon(this.getOpenIcon());
                treeCellRenderer_Tutorials.setClosedIcon(this.getClosedIcon());
                
                var treeNode_TutorialsRoot: JSTreeNode = new JSTreeNode();
                this.tree_Tutorials.setRoot(treeNode_TutorialsRoot);
                var treeNode_JSUISTutorials: JSTreeNode = new JSTreeNode(this.getJSUISTutorialAction());
                treeNode_TutorialsRoot.add(treeNode_JSUISTutorials);
                var treeNode_ContainerTutorials: JSTreeNode_ContainerTutorials = this. getContainerTutorialsTreeNode();
                treeNode_TutorialsRoot.add(treeNode_ContainerTutorials);
                var treeNode_JSFrameTutorial = new JSTreeNode(this.getJSFrameTutorialAction());
                treeNode_ContainerTutorials.add(treeNode_JSFrameTutorial);
                var treeNode_ComponentTutorials: JSTreeNode_ComponentTutorials = this.getComponentTutorialsTreeNode();
                treeNode_TutorialsRoot.add(treeNode_ComponentTutorials);
                var treeNode_JSButtonTutorial = new JSTreeNode(this.getJSButtonTutorialAction());
                treeNode_ComponentTutorials.add(treeNode_JSButtonTutorial);
                
                var properties: JSProperties_Tutorial = this.getProperties();
                
                var treeNode_ContainerTutorials_expanded: boolean = JSON.parse(properties.getProperty("treeNode_ContainerTutorials_expanded"));
                if (treeNode_ContainerTutorials_expanded !== null) {
                    if (treeNode_ContainerTutorials_expanded) {
                        this.tree_Tutorials.expand(treeNode_ContainerTutorials);
                    } else {
                        this.tree_Tutorials.collapse(treeNode_ContainerTutorials);
                    }
                } else {
                    this.tree_Tutorials.expand(treeNode_ContainerTutorials);
                }
                var treeNode_ComponentTutorials_expanded: boolean = JSON.parse(properties.getProperty("treeNode_ComponentTutorials_expanded"));
                if (treeNode_ComponentTutorials_expanded !== null) {
                    if (treeNode_ComponentTutorials_expanded) {
                        this.tree_Tutorials.expand(treeNode_ComponentTutorials);
                    } else {
                        this.tree_Tutorials.collapse(treeNode_ComponentTutorials);
                    }
                } else {
                    this.tree_Tutorials.expand(treeNode_ComponentTutorials);
                }
            }
            return this.tree_Tutorials;
        }
        getComponentExamplesTreeNode(): JSTreeNode_ComponentExamples {
            if (!this.treeNode_ComponentExamples) {
                this.treeNode_ComponentExamples = new JSTreeNode_ComponentExamples();
            }
            return this.treeNode_ComponentExamples;
        }
        getComponentTutorialsTreeNode(): JSTreeNode_ComponentTutorials {
            if (!this.treeNode_ComponentTutorials) {
                this.treeNode_ComponentTutorials = new JSTreeNode_ComponentTutorials();
            }
            return this.treeNode_ComponentTutorials;
        }
        getContainerExamplesTreeNode(): JSTreeNode_ContainerExamples {
            if (!this.treeNode_ContainerExamples) {
                this.treeNode_ContainerExamples = new JSTreeNode_ContainerExamples();
            }
            return this.treeNode_ContainerExamples;
        }
        getContainerTutorialsTreeNode(): JSTreeNode_ContainerTutorials {
            if (!this.treeNode_ContainerTutorials) {
                this.treeNode_ContainerTutorials = new JSTreeNode_ContainerTutorials();
            }
            return this.treeNode_ContainerTutorials;
        }
        getParams(): { [ key: string ]: string } {
            var tutorial: JSUIS_Tutorial = JSUIS_Tutorial.getInstance();
            var params: { [ key: string ]: string } = {};
            params["panel_ToggleButton_first"] = "\"" + this.getToggleButtonPanel().isFirst() + "\"";
            params["splitPane_dividerLocation"] = "\"" + this.getSplitPane().getDividerLocation() + "\"";
            params["tabbedPane_selectedIndex"] = "\"" + this.getTutorialTabbedPane().getSelectedIndex() + "\"";
            params["treeNode_ContainerTutorials_expanded"] = "\"" + this.getContainerTutorialsTreeNode().isExpanded() + "\"";
            params["treeNode_ComponentTutorials_expanded"] = "\"" + this.getComponentTutorialsTreeNode().isExpanded() + "\"";
            params["treeNode_ContainerExamples_expanded"] = "\"" + this.getContainerExamplesTreeNode().isExpanded() + "\"";
            params["treeNode_ComponentExamples_expanded"] = "\"" + this.getComponentExamplesTreeNode().isExpanded() + "\"";
            return params;
        }
    }
}
