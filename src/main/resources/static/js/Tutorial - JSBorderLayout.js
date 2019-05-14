var frame = new JSFrame();

frame.setLayout(new JSBorderLayout());

var north = new JSButton("NORTH");
frame.add(north, JSBorderLayout.NORTH);

var south = new JSButton("SOUTH");
frame.add(south, JSBorderLayout.SOUTH);

var west = new JSButton("WEST");
frame.add(west, JSBorderLayout.WEST);

var east = new JSButton("EAST");
frame.add(east, JSBorderLayout.EAST);

var center = new JSButton("CENTER");
frame.add(center);

frame.setVisible(true);