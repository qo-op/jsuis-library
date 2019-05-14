var frame = new JSFrame();

frame.setLayout(new JSGridBagLayout());

var panel = new JSPanel(new JSBorderLayout());
frame.add(panel);

var tab = new JSTab("top", "Hello, World!", false);
panel.add(tab);

frame.setVisible(true);