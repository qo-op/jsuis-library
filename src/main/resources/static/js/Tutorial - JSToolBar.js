var frame = new JSFrame();

var toolBar = new JSToolBar();
frame.add(toolBar, JSBorderLayout.NORTH);

var previousButton = new JSButton(new JSImageIcon("/img/Back24.gif", 24, 24));
toolBar.add(previousButton);

var upButton = new JSButton(new JSImageIcon("/img/Up24.gif", 24, 24));
toolBar.add(upButton);

var nextButton = new JSButton(new JSImageIcon("/img/Forward24.gif", 24, 24));
toolBar.add(nextButton);

frame.setVisible(true);
