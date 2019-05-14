var frame = new JSFrame();

frame.setLayout(new JSGridBagLayout());

var label = new JSLabel("Hello, World!", new JSImageIcon("/img/middle.gif", 16, 16));
frame.add(label);

frame.setVisible(true);
