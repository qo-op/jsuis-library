var frame = new JSFrame();
frame.setLayout(new JSGridBagLayout());

var button = new JSButton("Click me!");
frame.add(button);

var dialog = new JSDialog(frame);
dialog.setPreferredWidth(100);
dialog.setPreferredHeight(100);

button.addActionListener({
	actionPerformed(mouseEvent) {
		dialog.setVisible(true);
	}
});

frame.setVisible(true);
