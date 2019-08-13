<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
	<title>JS Frame example(s)</title>
	<link rel="stylesheet" href="/css/jsuis-${version}.css${build}">
	<script src="/js/jsuis-${version}.js${build}"></script>
	<link rel="stylesheet" href="/css/jsuistutorial-${version}.css${build}">
	<script src="/js/jsuistutorial-${version}.js${build}"></script>
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
		var jsuis_Tutorial = jsuistutorial.JSUIS_Tutorial.getInstance();
	    var tabbedPane_Example = jsuis_Tutorial.getExampleTabbedPane();
        var icon = new JSImageIcon("/img/baseline-playlist_play-24px-Green.svg", 24, 24);
        var example = new jsuistutorial.JSUIS_Example();
        var panel = example.getPanel();
        tabbedPane_Example.addTab("FrameDemo.html", icon, panel).addClass("example");
        
        var element = document.getElementById("example1");
        var example1 = new JSTextArea(element);
        example.getSplitPane().setLeftComponent(example1);
        
		addEventListener("load", function() {
			example.getRunAction().actionPerformed(null);
		});
	</script>
	<script>
		var jsuis_Tutorial = jsuistutorial.JSUIS_Tutorial.getInstance();
		jsuis_Tutorial.getProperties().setProperty("args", JSON.stringify(${args}));
		
		jsuis_Tutorial.getFrame().setVisible(true);
	</script>
</body>
</html>
