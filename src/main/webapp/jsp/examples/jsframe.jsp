<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>JS Frame example(s)</title>
	<link rel="stylesheet" href="/css/jsuis-${version}.css${build}">
	<script src="/js/jsuis-${version}.js${build}"></script>
	<link rel="stylesheet" href="/css/jstutorial-${version}.css${build}">
	<script src="/js/jstutorial-${version}.js${build}"></script>
</head>
<body>
	<div style="display: none">
		<div id="example">

			<textarea id="example1" style="padding: 4px;">
<head>
	<link rel="stylesheet" href="/css/jsuis-${version}.css">
	<script src="/js/jsuis-${version}.js"></script>
</head>
<body>
<script>
	var frame = new JSFrame(); // Create the frame.
	var label = new JSLabel("Hello, World!"); // Create a "Hello, World!" label.
	frame.add(label); // Add the label.
	frame.setVisible(true); // Show the frame.
</script>
</body>
			</textarea>

		</div>
	</div>
	<script>
	    var tabbedPane_Example = jstutorial.JSTabbedPane_Example.getInstance();
        var icon_Example = new JSImageIcon("/img/baseline-playlist_play-24px-Green.svg", 24, 24);
        var panel_Example = new jstutorial.JSPanel_Example();
        tabbedPane_Example.addTab("FrameDemo.html", icon_Example, panel_Example).addClass("example");
        
        var element = document.getElementById("example1");
        var example1 = new JSTextArea(element);
        panel_Example.getSplitPane().setLeftComponent(example1);
        
		addEventListener("load", function() {
	        panel_Example.getRunButton().getAction().actionPerformed(null);
		});
	</script>
	<script>
		new jstutorial.JSFrame_JSTutorial(${args}).setVisible(true);
	</script>
</body>
</html>
