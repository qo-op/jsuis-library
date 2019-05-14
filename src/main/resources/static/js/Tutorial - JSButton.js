var frame = new JSFrame();

frame.setLayout(new JSGridBagLayout());

var button = new JSButton("Click me!", new JSImageIcon("/img/middle.gif", 16, 16));
frame.add(button);

button.addActionListener({
	actionPerformed: function(mouseEvent) {
		alert("Action performed!");
	}
});

frame.setVisible(true);
