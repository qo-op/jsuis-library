var frame = new JSFrame();
frame.setStyle("padding", "4px");

var panel = new JSPanel();
frame.add(panel, JSBorderLayout.WEST);

panel.setLayout(new JSFlowLayout(JSFlowLayout.WEST, JSFlowLayout.CENTER, 4, 4));

var ok = new JSButton("Ok");
ok.setAlign(JSLayout.LEFT);
panel.add(ok);

var open = new JSButton("Open");
open.setAlign(JSLayout.LEFT);
panel.add(open);

var close = new JSButton("Close");
panel.add(close);

var exit = new JSButton("Exit");
panel.add(exit);

frame.setVisible(true);