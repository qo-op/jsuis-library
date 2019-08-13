<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
	<title>How to use JS Frame</title>
	<link rel="stylesheet" href="/css/jsuis-${version}.css${build}">
	<script src="/js/jsuis-${version}.js${build}"></script>
	<link rel="stylesheet" href="/css/jsuistutorial-${version}.css${build}">
	<script src="/js/jsuistutorial-${version}.js${build}"></script>
</head>
<body>
	<div style="display: none">
		<div id="tutorial">
		
<h3>How to use JS Frame</h3>
<p>JS Frame is the main container of a web application.</p>
<p>The following example creates and shows a frame with a "Hello, World!" label.</p>
<pre>
&lt;head&gt;
	&lt;link rel="stylesheet" href="/css/jsuis-${version}.css"&gt;
	&lt;script src="/js/jsuis-${version}.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script&gt;
	var frame = new JSFrame(); // Create the frame.
	var label = new JSLabel("Hello, World!"); // Create a "Hello, World!" label.
	frame.add(label); // Add the label.
	frame.setVisible(true); // Show the frame.
&lt;/script&gt;
&lt;/body&gt;
</pre>

<div id="example1" style="position: relative; border: 1px solid Gray; background-color: Silver;"></div>

<p>Example 1: Hello, World!</p>

		</div>
	</div>
	<script>
	</script>
	<script>
		var jsuis_Tutorial = jsuistutorial.JSUIS_Tutorial.getInstance();
		jsuis_Tutorial.getProperties().setProperty("args", JSON.stringify(${args}));
		var div_Tutorial = jsuis_Tutorial.getDiv_Tutorial();
		var frame = new JSDiv(document.getElementById("example1"));
		frame.setPreferredHeight(100);
		div_Tutorial.getComponents().push(frame);
		frame.setParent(div_Tutorial);
		frame.setLayout(new JSBorderLayout());
		var label = new JSLabel("Hello, World!"); // Create a "Hello, World!" label.
		frame.add(label); // Add the label.
		jsuis_Tutorial.getFrame().setVisible(true);
	</script>
</body>
</html>

