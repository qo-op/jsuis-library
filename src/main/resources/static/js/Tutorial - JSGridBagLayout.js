var frame = new JSFrame();
frame.setStyle("padding", "4px");

frame.setLayout(new JSGridBagLayout(4, 4));

var button1 = new JSButton("Button 1");
frame.add(button1, { gridx: 0, gridy: 0, weightx: .5, fill: JSGridBagLayout.HORIZONTAL });

var button2 = new JSButton("Button 2");
frame.add(button2, { gridx: 1, gridy: 0, weightx: .5, fill: JSGridBagLayout.HORIZONTAL });

var button3 = new JSButton("Button 3");
frame.add(button3, { gridx: 2, gridy: 0, weightx: .5, fill: JSGridBagLayout.HORIZONTAL });

var button4 = new JSButton("Long-Named Button 4");
frame.add(button4, { gridx: 0, gridy: 1, gridwidth: 3, weightx: 0, fill: JSGridBagLayout.HORIZONTAL });

var button5 = new JSButton("5");
frame.add(button5, { gridx: 1, gridy: 2, gridwidth: 2, weighty: 1, fill: JSGridBagLayout.HORIZONTAL, anchor: JSGridBagLayout.SOUTH });

frame.setVisible(true);