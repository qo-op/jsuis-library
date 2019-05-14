var frame = new JSFrame();

frame.setLayout(new JSGridBagLayout(4, 4));

var chinButton = new JSCheckBox("Chin", new JSImageIcon("/img/middle.gif", 16, 16));
frame.add(chinButton);

frame.setVisible(true);