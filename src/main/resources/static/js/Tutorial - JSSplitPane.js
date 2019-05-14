var frame = new JSFrame();
frame.setLayout(new JSBorderLayout());

var splitPane = new JSSplitPane();
frame.add(splitPane);

var leftPanel = new JSPanel(new JSGridBagLayout());
leftPanel.setStyle("border", "1px solid gray");
leftPanel.add(new JSLabel("Left"));
splitPane.setLeftComponent(leftPanel);

var rightPanel = new JSPanel(new JSGridBagLayout());
rightPanel.setStyle("border", "1px solid gray");
rightPanel.add(new JSLabel("Right"));
splitPane.setRightComponent(rightPanel);

frame.setVisible(true);