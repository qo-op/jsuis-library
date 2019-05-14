/// <reference path = "../jstutorial.ts"/>
/**
 * JSFrame_JSTutorial
 */
namespace jstutorial {
    export class JSFrame_JSTutorial extends JSFrame {
        
        constructor() {
            
            super();
            
            this.setLayout(new JSBorderLayout());
    
            /*
             * JSUIS - JavaScript User Interface
             */
            var jsPanel_Title: JSPanel_Title = JSPanel_Title.getInstance();
            this.add(jsPanel_Title, JSBorderLayout.NORTH);
            
            /*
             * Tutorials | Examples | Help
             */
            var jsMenuBar_Main: JSMenuBar_JSTutorial = JSMenuBar_JSTutorial.getInstance();
            this.add(jsMenuBar_Main, JSBorderLayout.NORTH);
            
            /*
             * Tutorials
             */
            var jsMenu_Tutorials: JSMenu_Tutorials = JSMenu_Tutorials.getInstance();
            jsMenuBar_Main.add(jsMenu_Tutorials);
            
            /*
             * Examples
             */
            var jsMenu_Examples: JSMenu_Examples = JSMenu_Examples.getInstance();
            jsMenuBar_Main.add(jsMenu_Examples);
            
            /*
             * Help
             */
            var jsMenu_Help: JSMenu_Help = JSMenu_Help.getInstance();
            jsMenuBar_Main.add(jsMenu_Help);
            
            /*
             * Tutorials
             * 
             * How to use JSUIS
             * -------------------
             * Container tutorials
             * Component tutorials
             */
            var jsMenuItem_JSUISTutorial: JSMenuItem_JSUISTutorial = JSMenuItem_JSUISTutorial.getInstance();
            jsMenu_Tutorials.add(jsMenuItem_JSUISTutorial);
            
            jsMenu_Tutorials.addSeparator();
            
            var jsMenu_ContainerTutorials: JSMenu_ContainerTutorials = JSMenu_ContainerTutorials.getInstance();
            jsMenu_Tutorials.add(jsMenu_ContainerTutorials);
            
            var jsMenu_ComponentTutorials: JSMenu_ComponentTutorials = JSMenu_ComponentTutorials.getInstance();
            jsMenu_Tutorials.add(jsMenu_ComponentTutorials);
            
            /*
             * Examples
             * 
             * Container examples
             * Component examples
             */
            var jsMenu_ContainerExamples: JSMenu_ContainerExamples = JSMenu_ContainerExamples.getInstance();
            jsMenu_Examples.add(jsMenu_ContainerExamples);
            
            var jsMenu_ComponentExamples: JSMenu_ComponentExamples = JSMenu_ComponentExamples.getInstance();
            jsMenu_Examples.add(jsMenu_ComponentExamples);
            
            /*
             * Help
             * 
             * About
             */
            var jsMenuItem_About: JSMenuItem_About = JSMenuItem_About.getInstance();
            jsMenu_Help.add(jsMenuItem_About);
            
            /*
             * Tutorials > Container tutorials
             * 
             * How to use JS Frame
             */
            var jsMenuItem_JSFrameTutorial: JSMenuItem_JSFrameTutorial = JSMenuItem_JSFrameTutorial.getInstance();
            jsMenu_ContainerTutorials.add(jsMenuItem_JSFrameTutorial);
            
            /*
             * Tutorials > Component tutorials
             * 
             * How to use JS Button
             */
            var jsMenuItem_JSButtonTutorial: JSMenuItem_JSButtonTutorial = JSMenuItem_JSButtonTutorial.getInstance();
            jsMenu_ComponentTutorials.add(jsMenuItem_JSButtonTutorial);
            
            /*
             * Examples > Container examples
             * 
             * JS Frame example
             */
            var jsMenuItem_JSFrameExample: JSMenuItem_JSFrameExample = JSMenuItem_JSFrameExample.getInstance();
            jsMenu_ContainerExamples.add(jsMenuItem_JSFrameExample);
            
            /*
             * Examples > Component examples
             * 
             * JS Button example
             */
            var jsMenuItem_JSButtonExample: JSMenuItem_JSButtonExample = JSMenuItem_JSButtonExample.getInstance();
            jsMenu_ComponentExamples.add(jsMenuItem_JSButtonExample); 
            
            /*
             * <
             * Tutorials
             * Examples
             */
            var jsTabbedPane_JSTutorial: JSTabbedPane_JSTutorial = JSTabbedPane_JSTutorial.getInstance();
            
            var jsTabbedPaneTabContainer_JSTutorial: JSTabbedPaneTabContainer = jsTabbedPane_JSTutorial.getTabContainer();
            this.add(jsTabbedPaneTabContainer_JSTutorial, JSBorderLayout.WEST);
            
            var jsSplitPane_JSTutorial: JSSplitPane_JSTutorial = JSSplitPane_JSTutorial.getInstance();
            this.add(jsSplitPane_JSTutorial);
            
            var jsTabbedPaneCardContainer_JSTutorial: JSTabbedPaneCardContainer = jsTabbedPane_JSTutorial.getCardContainer();
            jsSplitPane_JSTutorial.setLeftComponent(jsTabbedPaneCardContainer_JSTutorial);
            
            /*
             * [<|>]
             */
            var jsTabbedPaneButtonContainer_JSTutorial: JSTabbedPaneButtonContainer = jsTabbedPane_JSTutorial.getButtonContainer();
            
            var jsPanel_ToogleButtonPanel: JSPanel_ToggleButtonPanel = JSPanel_ToggleButtonPanel.getInstance();
            jsTabbedPaneButtonContainer_JSTutorial.add(jsPanel_ToogleButtonPanel);
            
            var jsButton_CollapseButton: JSButton_CollapseButton = JSButton_CollapseButton.getInstance();
            jsPanel_ToogleButtonPanel.add(jsButton_CollapseButton);
            
            var jsButton_ExpandButton: JSButton_ExpandButton = JSButton_ExpandButton.getInstance();
            jsPanel_ToogleButtonPanel.add(jsButton_ExpandButton);
            
            var jsIcon_Leaf: JSIcon_Open = JSIcon_Leaf.getInstance();
            var jsIcon_Open: JSIcon_Open = JSIcon_Open.getInstance();
            var jsIcon_Closed: JSIcon_Closed = JSIcon_Closed.getInstance();
            
            /*
             * Tutorials
             * > Container tutorials
             *     How to use JS Frame
             * > Component tutorials
             *     How to use JS Button
             */
            var jsTree_Tutorials: JSTree = JSTree_Tutorials.getInstance();
            jsTabbedPane_JSTutorial.addTab("Tutorials", new JSImageIcon("/img/baseline-local_library-24px.svg", 24, 24), new JSScrollPane(jsTree_Tutorials));
            
            var jsTreeNode_TutorialsRoot: JSTreeNode = new JSTreeNode();
            jsTree_Tutorials.setRoot(jsTreeNode_TutorialsRoot);
            var jsTreeNode_ContainerTutorials: JSTreeNode = new JSTreeNode("Container tutorials");
            jsTreeNode_TutorialsRoot.add(jsTreeNode_ContainerTutorials);
            var jsTreeNode_JSFrameTutorial = new JSTreeNode("How to use JS Frame");
            jsTreeNode_ContainerTutorials.add(jsTreeNode_JSFrameTutorial);
            var jsTreeNode_ComponentTutorials: JSTreeNode = new JSTreeNode("Component tutorials");
            jsTreeNode_TutorialsRoot.add(jsTreeNode_ComponentTutorials);
            var jsTreeNode_JSButtonTutorial = new JSTreeNode("How to use JS Button");
            jsTreeNode_ComponentTutorials.add(jsTreeNode_JSButtonTutorial);
            
            var treeCellRenderer_Tutorials = jsTree_Tutorials.getTreeCellRenderer();
            treeCellRenderer_Tutorials.setLeafIcon(jsIcon_Leaf);
            treeCellRenderer_Tutorials.setOpenIcon(jsIcon_Open);
            treeCellRenderer_Tutorials.setClosedIcon(jsIcon_Closed);
            
            /*
             * Examples
             * > Container examples
             *     JS Frame example(s)
             * > Component examples
             *     JS Button example(s)
             */
            var jsTree_Examples: JSTree = JSTree_Examples.getInstance();
            jsTabbedPane_JSTutorial.addTab("Examples", new JSImageIcon("/img/baseline-playlist_play-24px.svg", 24, 24), new JSScrollPane(jsTree_Examples));
            
            var jsTreeNode_ExamplesRoot: JSTreeNode = new JSTreeNode();
            jsTree_Examples.setRoot(jsTreeNode_ExamplesRoot);
            var jsTreeNode_ContainerExamples: JSTreeNode = new JSTreeNode("Container examples");
            jsTreeNode_ExamplesRoot.add(jsTreeNode_ContainerExamples);
            var jsTreeNode_JSFrameExample = new JSTreeNode("JS Frame example(s)");
            jsTreeNode_ContainerExamples.add(jsTreeNode_JSFrameExample);
            var jsTreeNode_ComponentExamples: JSTreeNode = new JSTreeNode("Component examples");
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
            
            var jsAction_ExpandButton: JSAction_Expand = JSAction_Expand.getInstance();
            jsTabbedPane_JSTutorial.getTabComponentAt(0).addActionListener(jsAction_ExpandButton);
            jsTabbedPane_JSTutorial.getTabComponentAt(1).addActionListener(jsAction_ExpandButton);
        }
        
        init(): void {
            this.addClass("JSFrame");
            this.addClass("JSFrame_JSTutorial");
            
            var jsSplitPane_JSTutorial: JSSplitPane_JSTutorial = JSSplitPane_JSTutorial.getInstance();
            
            var jsDiv_JSTutorial: JSDiv_JSTutorial = JSDiv_JSTutorial.getInstance();
            jsSplitPane_JSTutorial.setRightComponent(new JSScrollPane(jsDiv_JSTutorial));
        }
    }
}
