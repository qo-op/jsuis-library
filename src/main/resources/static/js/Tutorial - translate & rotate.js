var frame = new JSFrame();

frame.setLayout(new JSGridBagLayout());

var a = new JSPanel();
a.setBackground("red");
a.setPreferredWidth(100);
a.setPreferredHeight(20);
frame.add(a, { gridx: 0, gridy: 0});

var b = new JSPanel();
b.setBackground("blue");
b.setPreferredWidth(100);
b.setPreferredHeight(20);
frame.add(b, { gridx: 1, gridy: 0});

frame.setVisible(true);