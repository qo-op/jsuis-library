var frame = new JSFrame();

frame.setLayout(new JSGridBagLayout());

var comboBox = new JSComboBox(["Bird", "Cat", "Dog", "Rabbit", "Pig"]);
frame.add(comboBox);

frame.setVisible(true);