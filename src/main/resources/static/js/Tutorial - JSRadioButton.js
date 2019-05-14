var frame = new JSFrame();

frame.setLayout(new JSGridBagLayout(4, 4));

var birdButton = new JSRadioButton();
birdButton.setName("animals");
frame.add(birdButton, { gridx: 0, gridy: 0 });

var birdLabel = new JSLabel("Bird");
frame.add(birdLabel, { gridx: 1, gridy: 0 });

var catButton = new JSRadioButton();
catButton.setName("animals");
frame.add(catButton, { gridx: 0, gridy: 1 });

var catLabel = new JSLabel("Cat");
frame.add(catLabel, { gridx: 1, gridy: 1 });

frame.setVisible(true);
