# JSUIS - JavaScript User Interface Library

JSUIS is a javascript library that can be used to build user interfaces. Its components, containers and layouts are similar to Java Swing components, containers and layouts.

For example, the following code creates a simple user interface.

	<head>
		<link rel="stylesheet" href="/css/jsuis-1.1.2.css">
		<script src="/js/jsuis-1.1.2.js"></script>
	</head>
	<body>
	<script>
		var frame = new JSFrame();
		frame.setLayout(new JSGridBagLayout());
		var button = new JSButton("Click me!");
		frame.add(button);
		button.addActionListener({
			actionPerformed: function(mouseEvent) {
				alert("Hello, World!");
			}
		});
		frame.setVisible(true);
	</script>
	</body>
	
See [How to use JSUIS](https://jsuis-library.appspot.com/) for tutorials and examples.