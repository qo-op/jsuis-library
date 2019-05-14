var frame = new JSFrame();

frame.setLayout(new JSGridBagLayout());

var pathImage = new JSPathImage("M150 0 L75 200 L225 200 Z", 400, 210);
frame.add(pathImage);

frame.setVisible(true);
