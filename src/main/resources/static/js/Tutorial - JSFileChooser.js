var frame = new JSFrame();

frame.setLayout(new JSGridBagLayout());

var button = new JSButton("Click me!");
frame.add(button);

button.addMouseListener({
	mouseClicked: function(mouseEvent) {
		var fileChooser = new JSFileChooser();
		fileChooser.addChangeListener({
            stateChanged: function(event) {
        		var selectedFiles = fileChooser.getSelectedFiles();
                var fileReader = new FileReader();
                fileReader.onload = function(){
                    var text = fileReader.result;
                    console.log(text.substring(0, 200));
                };
                fileReader.readAsText(selectedFiles[0]);
            }
        });
		fileChooser.showOpenDialog();
	}
});

frame.setVisible(true);