/// <reference path = "../jstutorial.ts"/>
/**
 * JSFrame_JSTutorial
 */
namespace jstutorial {
    export class JSFrame_JSTutorial extends JSFrame {
        
        constructor(args: any) {
            
            super();
            
            this.setLayout(new JSBorderLayout());
            
            /*
             * JSUIS - JavaScript User Interface
             */
            this.setTitle("JSUIS - JavaScript User Interface");
            
            /*
             * Tutorials | Examples | Help
             */
            var menuBar_JSTutorial: JSMenuBar_JSTutorial = JSMenuBar_JSTutorial.getInstance();
            this.setMenuBar(menuBar_JSTutorial);
            
            /*
             * Tutorials
             */
            var menu_Tutorials: JSMenu_Tutorials = JSMenu_Tutorials.getInstance();
            menuBar_JSTutorial.add(menu_Tutorials);
            
            /*
             * Examples
             */
            var menu_Examples: JSMenu_Examples = JSMenu_Examples.getInstance();
            menuBar_JSTutorial.add(menu_Examples);
            
            /*
             * Help
             */
            var menu_Help: JSMenu_Help = JSMenu_Help.getInstance();
            menuBar_JSTutorial.add(menu_Help);
            
            /*
             * Tutorials
             * 
             * How to use JSUIS
             * -------------------
             * Container tutorials
             * Component tutorials
             */
            var menuItem_JSUISTutorial: JSMenuItem_JSUISTutorial = JSMenuItem_JSUISTutorial.getInstance();
            menu_Tutorials.add(menuItem_JSUISTutorial);
            
            menu_Tutorials.addSeparator();
            
            var menu_ContainerTutorials: JSMenu_ContainerTutorials = JSMenu_ContainerTutorials.getInstance();
            menu_Tutorials.add(menu_ContainerTutorials);
            
            var menu_ComponentTutorials: JSMenu_ComponentTutorials = JSMenu_ComponentTutorials.getInstance();
            menu_Tutorials.add(menu_ComponentTutorials);
            
            /*
             * Examples
             * 
             * Container examples
             * Component examples
             */
            var menu_ContainerExamples: JSMenu_ContainerExamples = JSMenu_ContainerExamples.getInstance();
            menu_Examples.add(menu_ContainerExamples);
            
            var menu_ComponentExamples: JSMenu_ComponentExamples = JSMenu_ComponentExamples.getInstance();
            menu_Examples.add(menu_ComponentExamples);
            
            /*
             * Help
             * 
             * About
             */
            var menuItem_About: JSMenuItem_About = JSMenuItem_About.getInstance();
            menu_Help.add(menuItem_About);
            
            /*
             * Tutorials > Container tutorials
             * 
             * How to use JS Frame
             */
            var menuItem_JSFrameTutorial: JSMenuItem_JSFrameTutorial = JSMenuItem_JSFrameTutorial.getInstance();
            menu_ContainerTutorials.add(menuItem_JSFrameTutorial);
            
            /*
             * Tutorials > Component tutorials
             * 
             * How to use JS Button
             */
            var menuItem_JSButtonTutorial: JSMenuItem_JSButtonTutorial = JSMenuItem_JSButtonTutorial.getInstance();
            menu_ComponentTutorials.add(menuItem_JSButtonTutorial);
            
            /*
             * Examples > Container examples
             * 
             * JS Frame example
             */
            var menuItem_JSFrameExample: JSMenuItem_JSFrameExample = JSMenuItem_JSFrameExample.getInstance();
            menu_ContainerExamples.add(menuItem_JSFrameExample);
            
            /*
             * Examples > Component examples
             * 
             * JS Button example(s)
             * JS Table example(s)
             */
            var menuItem_JSButtonExample: JSMenuItem_JSButtonExample = JSMenuItem_JSButtonExample.getInstance();
            menu_ComponentExamples.add(menuItem_JSButtonExample);
            
            var menuItem_JSTableExample: JSMenuItem_JSTableExample = JSMenuItem_JSTableExample.getInstance();
            // menu_ComponentExamples.add(menuItem_JSTableExample);
            
            /*
             * <
             * Tutorials
             * Examples
             */
            var tabbedPane_JSTutorial: JSTabbedPane_JSTutorial = JSTabbedPane_JSTutorial.getInstance();
            
            var tabbedPaneTabContainer_JSTutorial: JSTabbedPaneTabContainer = tabbedPane_JSTutorial.getTabContainer();
            tabbedPaneTabContainer_JSTutorial.setId("tabbedPaneTabContainer_JSTutorial");
            this.add(tabbedPaneTabContainer_JSTutorial, JSBorderLayout.WEST);
            
            var splitPane_JSTutorial: JSSplitPane_JSTutorial = JSSplitPane_JSTutorial.getInstance();
            this.add(splitPane_JSTutorial);
            
            var tabbedPaneCardContainer_JSTutorial: JSTabbedPaneCardContainer = tabbedPane_JSTutorial.getCardContainer();
            splitPane_JSTutorial.setLeftComponent(tabbedPaneCardContainer_JSTutorial);
            
            /*
             * [<|>]
             */
            var tabbedPaneButtonContainer_JSTutorial: JSTabbedPaneButtonContainer = tabbedPane_JSTutorial.getButtonContainer();
            
            var panel_ToogleButtonPanel: JSPanel_ToggleButtonPanel = JSPanel_ToggleButtonPanel.getInstance();
            tabbedPaneButtonContainer_JSTutorial.add(panel_ToogleButtonPanel);
            
            var button_ExpandButton: JSButton_ExpandButton = JSButton_ExpandButton.getInstance();
            panel_ToogleButtonPanel.add(button_ExpandButton);
            
            var button_CollapseButton: JSButton_CollapseButton = JSButton_CollapseButton.getInstance();
            panel_ToogleButtonPanel.add(button_CollapseButton);
            
            /*
             * Tutorials
             * How to use JSUIS
             * > Container tutorials
             *     How to use JS Frame
             * > Component tutorials
             *     How to use JS Button
             */
            var tree_Tutorials: JSTree = JSTree_Tutorials.getInstance();
            tabbedPane_JSTutorial.addTab("Tutorials", new JSImageIcon("/img/baseline-local_library-24px-GoldenRod.svg", 24, 24), new JSScrollPane(tree_Tutorials));
            
            var treeNode_TutorialsRoot: JSTreeNode = new JSTreeNode();
            tree_Tutorials.setRoot(treeNode_TutorialsRoot);
            var treeNode_JSUISTutorials: JSTreeNode = new JSTreeNode(JSAction_JSUISTutorial.getInstance());
            treeNode_TutorialsRoot.add(treeNode_JSUISTutorials);
            var treeNode_ContainerTutorials: JSTreeNode_ContainerTutorials = JSTreeNode_ContainerTutorials.getInstance();
            treeNode_TutorialsRoot.add(treeNode_ContainerTutorials);
            var treeNode_JSFrameTutorial = new JSTreeNode(JSAction_JSFrameTutorial.getInstance());
            treeNode_ContainerTutorials.add(treeNode_JSFrameTutorial);
            var treeNode_ComponentTutorials: JSTreeNode_ComponentTutorials = JSTreeNode_ComponentTutorials.getInstance();
            treeNode_TutorialsRoot.add(treeNode_ComponentTutorials);
            var treeNode_JSButtonTutorial = new JSTreeNode(JSAction_JSButtonTutorial.getInstance());
            treeNode_ComponentTutorials.add(treeNode_JSButtonTutorial);
            
            var icon_Leaf: JSIcon_Open = JSIcon_Leaf.getInstance();
            var icon_Open: JSIcon_Open = JSIcon_Open.getInstance();
            var icon_Closed: JSIcon_Closed = JSIcon_Closed.getInstance();
            
            var treeCellRenderer_Tutorials = tree_Tutorials.getTreeCellRenderer();
            treeCellRenderer_Tutorials.setLeafIcon(icon_Leaf);
            treeCellRenderer_Tutorials.setOpenIcon(icon_Open);
            treeCellRenderer_Tutorials.setClosedIcon(icon_Closed);
            
            /*
             * Examples
             * > Container examples
             *     JS Frame example(s)
             * > Component examples
             *     JS Button example(s)
             */
            var tree_Examples: JSTree = JSTree_Examples.getInstance();
            tabbedPane_JSTutorial.addTab("Examples", new JSImageIcon("/img/baseline-playlist_play-24px-Green.svg", 24, 24), new JSScrollPane(tree_Examples));
            
            var treeNode_ExamplesRoot: JSTreeNode = new JSTreeNode();
            tree_Examples.setRoot(treeNode_ExamplesRoot);
            var treeNode_ContainerExamples: JSTreeNode_ContainerExamples = JSTreeNode_ContainerExamples.getInstance();
            treeNode_ExamplesRoot.add(treeNode_ContainerExamples);
            var treeNode_JSFrameExample = new JSTreeNode(JSAction_JSFrameExample.getInstance());
            treeNode_ContainerExamples.add(treeNode_JSFrameExample);
            var treeNode_ComponentExamples: JSTreeNode_ComponentExamples = JSTreeNode_ComponentExamples.getInstance();
            treeNode_ExamplesRoot.add(treeNode_ComponentExamples);
            var treeNode_JSButtonExample = new JSTreeNode(JSAction_JSButtonExample.getInstance());
            treeNode_ComponentExamples.add(treeNode_JSButtonExample);
            
            var treeCellRenderer_Tutorials = tree_Examples.getTreeCellRenderer();
            treeCellRenderer_Tutorials.setLeafIcon(icon_Leaf);
            treeCellRenderer_Tutorials.setOpenIcon(icon_Open);
            treeCellRenderer_Tutorials.setClosedIcon(icon_Closed);
            
            tabbedPane_JSTutorial.setSelectedIndex(0);
            
            var action_ExpandButton: JSAction_Expand = JSAction_Expand.getInstance();
            tabbedPane_JSTutorial.getTabComponentAt(0).addActionListener(action_ExpandButton);
            tabbedPane_JSTutorial.getTabComponentAt(1).addActionListener(action_ExpandButton);
            
            tree_Tutorials.expand(treeNode_ContainerTutorials);
            tree_Tutorials.expand(treeNode_ComponentTutorials);
            tree_Examples.expand(treeNode_ContainerExamples);
            tree_Examples.expand(treeNode_ComponentExamples);

            splitPane_JSTutorial.setDividerLocation(splitPane_JSTutorial.getLeftComponent().getPreferredOuterWidth() + 1);
            
            var content: JSDiv = new JSDiv(document.getElementById("content"));
            splitPane_JSTutorial.setRightComponent(new JSScrollPane(content));
            
            if (args) {
                this.setArgs(args);
            }
        }
        
        init(): void {
            super.init();
            this.addClass("JSFrame_JSTutorial");
        }
        
        setArgs(args: { [ key: string ]: any }) {
            // console.log(args);
            if (args["panel_ToggleButtonPanel_first"] !== undefined && args["panel_ToggleButtonPanel_first"]) {
                var action_Collapse: JSAction_Collapse = JSAction_Collapse.getInstance();
                action_Collapse.actionPerformed(null);
            } else if (args["splitPane_JSTutorial_dividerLocation"] !== undefined) {
                var splitPane_JSTutorial: JSSplitPane_JSTutorial = JSSplitPane_JSTutorial.getInstance();
                splitPane_JSTutorial.setDividerLocation(args["splitPane_JSTutorial_dividerLocation"]);
            }
            if (args["tabbedPane_JSTutorial_selectedIndex"] !== undefined && args["tabbedPane_JSTutorial_selectedIndex"] !== -1) {
                var tabbedPane_JSTutorial = JSTabbedPane_JSTutorial.getInstance();
                tabbedPane_JSTutorial.setSelectedIndex(args["tabbedPane_JSTutorial_selectedIndex"]);
            }
            var tree_Tutorials: JSTree = JSTree_Tutorials.getInstance();
            if (args["treeNode_ContainerTutorials_expanded"] !== undefined) {
                var treeNode_ContainerTutorials: JSTreeNode_ContainerTutorials = JSTreeNode_ContainerTutorials.getInstance();
                if (args["treeNode_ContainerTutorials_expanded"]) {
                    tree_Tutorials.expand(treeNode_ContainerTutorials);
                } else {
                    tree_Tutorials.collapse(treeNode_ContainerTutorials);
                }
            }
            if (args["treeNode_ComponentTutorials_expanded"] !== undefined) {
                var treeNode_ComponentTutorials: JSTreeNode_ComponentTutorials = JSTreeNode_ComponentTutorials.getInstance();
                if (args["treeNode_ComponentTutorials_expanded"]) {
                    tree_Tutorials.expand(treeNode_ComponentTutorials);
                } else {
                    tree_Tutorials.collapse(treeNode_ComponentTutorials);
                }
            }
            var tree_Examples: JSTree = JSTree_Examples.getInstance();
            if (args["treeNode_ContainerExamples_expanded"] !== undefined) {
                var treeNode_ContainerExamples: JSTreeNode_ContainerExamples = JSTreeNode_ContainerExamples.getInstance();
                if (args["treeNode_ContainerExamples_expanded"]) {
                    tree_Examples.expand(treeNode_ContainerExamples);
                } else {
                    tree_Examples.collapse(treeNode_ContainerExamples);
                }
            }
            if (args["treeNode_ComponentExamples_expanded"] !== undefined) {
                var treeNode_ComponentExamples: JSTreeNode_ComponentExamples = JSTreeNode_ComponentExamples.getInstance();
                if (args["treeNode_ComponentExamples_expanded"]) {
                    tree_Examples.expand(treeNode_ComponentExamples);
                } else {
                    tree_Examples.collapse(treeNode_ComponentExamples);
                }
            }
        }
        
        static getParams(): { [ key: string ]: string } {
            var params: { [ key: string ]: string } = {};
            params["panel_ToggleButtonPanel_first"] = "" + JSPanel_ToggleButtonPanel.getInstance().isFirst();
            params["splitPane_JSTutorial_dividerLocation"] = "" + JSSplitPane_JSTutorial.getInstance().getDividerLocation();
            params["tabbedPane_JSTutorial_selectedIndex"] = "" + JSTabbedPane_JSTutorial.getInstance().getSelectedIndex();
            params["treeNode_ContainerTutorials_expanded"] = "" + JSTreeNode_ContainerTutorials.getInstance().isExpanded();
            params["treeNode_ComponentTutorials_expanded"] = "" + JSTreeNode_ComponentTutorials.getInstance().isExpanded();
            params["treeNode_ContainerExamples_expanded"] = "" + JSTreeNode_ContainerExamples.getInstance().isExpanded();
            params["treeNode_ComponentExamples_expanded"] = "" + JSTreeNode_ComponentExamples.getInstance().isExpanded();
            return params;
        }
    }
}