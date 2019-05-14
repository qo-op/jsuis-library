var frame = new JSFrame();
frame.setLayout(new JSGridBagLayout());

var layerStrings = [ "Yellow (0)", "Magenta (1)", "Cyan (2)", "Red (3)", "Green (4)" ];
var layerColors = [ "yellow", "magenta", "cyan", "red", "green" ];

var layeredPaneDemo = new JSPanel(new JSBorderLayout());
frame.add(layeredPaneDemo);

var controls = new JSPanel();
layeredPaneDemo.add(controls, JSBorderLayout.NORTH);

var comboBox = new JSComboBox(layerStrings);
controls.add(comboBox);

var layeredPane = new JSLayeredPane();
layeredPane.setPreferredWidth(300 - 2);
layeredPane.setPreferredHeight(300 - 2);
layeredPane.setStyle("border", "1px solid gray");
layeredPaneDemo.add(layeredPane);

for (var i = 0; i < layerStrings.length; i++) {
	var label = new JSLabel(layerStrings[i], JSLabel.CENTER);
	label.setBackground(layerColors[i]);
	label.setX(10 + 35 * i);
	label.setY(20 + 35 * i);
	label.setWidth(140 - 2);
	label.setHeight(140 - 2);
	label.setStyle("border", "1px solid black");
	layeredPane.add(label, i);
}

var duke = new JSImage("/img/dukeWaveRed.gif", 64, 64);
duke.setX(15);
duke.setY(225);
layeredPane.add(duke, 2);

comboBox.addChangeListener({
    stateChanged(event) {
        layeredPane.setLayer(duke, comboBox.getSelectedIndex());
    }
});

layeredPane.addMouseListener({
    mouseMoved: function(mouseEvent) {
    	var boundingClientRect = layeredPane.getBoundingClientRect();
        var x = mouseEvent.x - boundingClientRect.left;
        if (x < 0 || x > 300) {
            mouseEvent.stopPropagation();
            return;
        }
        var y = mouseEvent.y - boundingClientRect.top;
        if (y < 0 || y > 310) {
            mouseEvent.stopPropagation();
            return;
        }
        duke.setX(x - 40);
        duke.setY(y - 57);
        mouseEvent.stopPropagation();
    }
});

frame.setVisible(true);
