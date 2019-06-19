var frame = new JSFrame();

var panel = new JSPanel();
panel.setStyle("padding", "4px");
panel.setStyle("white-space", "nowrap");
/*
panel.setStyle("overflow-x", "auto");
*/

var scrollPane = new JSScrollPane(panel);
frame.add(scrollPane);
// frame.add(panel);

var button1 = new JSButton("Button 1");
panel.add(button1);

var button2 = new JSButton("Button 2");
panel.add(button2);

var button3 = new JSButton("Button 3");
panel.add(button3);

var button4 = new JSButton("Button 4");
panel.add(button4);

var button5 = new JSButton("Button 5");
panel.add(button5);

frame.setVisible(true);
