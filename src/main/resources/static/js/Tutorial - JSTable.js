var frame = new JSFrame();
frame.setLayout(new JSBorderLayout());

var columnNames = [ "First Name", "Last Name", "Sport", "# of Years", "Vegetarian" ];
var data = [
	[ "Kathy", "Smith", "Snowboarding", 5, false ],
	[ "John", "Doe", "Rowing", 3, true ],
	[ "Sue", "Black", "Knitting", 2, false ],
	[ "Jane", "White", "Speed reading", 20, true ],
	[ "Joe", "Brown", "Pool", 10, false ],
	
	[ "Kathy", "Smith", "Snowboarding", 5, false ],
	[ "John", "Doe", "Rowing", 3, true ],
	[ "Sue", "Black", "Knitting", 2, false ],
	[ "Jane", "White", "Speed reading", 20, true ],
	[ "Joe", "Brown", "Pool", 10, false ],
	
	[ "Kathy", "Smith", "Snowboarding", 5, false ],
	[ "John", "Doe", "Rowing", 3, true ],
	[ "Sue", "Black", "Knitting", 2, false ],
	[ "Jane", "White", "Speed reading", 20, true ],
	[ "Joe", "Brown", "Pool", 10, false ],
];

var table = new JSTable(data, columnNames);
// table.setAlign(JSLayout.CENTER);
// table.setPreferredWidth(200);
// table.setPreferredHeight(150);

// var scrollPane = new JSScrollPane(table);
// scrollPane.setAlign(JSLayout.CENTER);
// scrollPane.setPreferredWidth(200);
// scrollPane.setPreferredHeight(150);
// frame.add(scrollPane);
frame.add(table);

frame.setVisible(true);
