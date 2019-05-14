var frame = new JSFrame();

frame.setLayout(new JSGridBagLayout());

var textArea = new JSTextArea("Text area", 10, 20);

// var scrollPane = new JSScrollPane(textArea);

// frame.add(scrollPane);

frame.add(textArea);

frame.setVisible(true);