var frame = new JSFrame();

frame.setLayout(new JSGridBagLayout());

var panel = new JSPanel();
frame.add(panel);

var graphics = new JSSVG(400, 210);
panel.add(graphics);

var path = new JSPath("M150 0 L75 200 L225 200 Z");
graphics.add(path);

frame.setVisible(true);
