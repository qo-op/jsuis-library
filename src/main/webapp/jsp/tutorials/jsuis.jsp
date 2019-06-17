<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>How to use JSUIS</title>
	<link rel="stylesheet" href="/css/jsuis-${version}.css${build}">
	<script src="/js/jsuis-${version}.js${build}"></script>
	<link rel="stylesheet" href="/css/jstutorial-${version}.css${build}">
	<script src="/js/jstutorial-${version}.js${build}"></script>
</head>
<body>
	<div style="display: none">
		<div id="tutorial">

<h3>How to use JSUIS</h3>
<p>JSUIS is a javascript library that can be used to build user interfaces. Its components, containers and layouts are similar to Java Swing components, containers and layouts.</p>
<p>For example, the following code creates a simple user interface.</p>
<pre>
&lt;head&gt;
	&lt;link rel="stylesheet" href="/css/jsuis-${version}.css"&gt;
	&lt;script src="/js/jsuis-${version}.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script&gt;
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
&lt;/script&gt;
&lt;/body&gt;
</pre>
<p>When you click on the button [Click me!], it displays an alert box with the text "Hello, World!".</p>

<div id="example1" style="position: relative; border: 1px solid Gray; background-color: Silver; height: 100px"></div>

<p>Example 1: Hello, World!</p>
<p>The first line written in javascript: <b class="monospaced">var frame = new JSFrame();</b> creates a JSFrame container.</p>
<p>The second line: <b class="monospaced">frame.setLayout(new JSGridBagLayout());</b> sets the layout of the frame to JSGridBagLayout.</p>
<p>JSGridBagLayout is used here to center the button that is created in the third line: <b class="monospaced">var button = new JSButton("Click me!");</b></p>
<p>After adding the button to the frame: <b class="monospaced">frame.add(button);</b>, the remaining lines add an action listener to the button and set the frame visible.</p>
<h3>Download JSUIS library</h3>
<p>In order to use JSUIS library, download the JSUIS js and css files.</p>
<a href="/download/jsuisjs">jsuis-${version}.js</a> (beta version)<br>
<a href="/download/jsuiscss">jsuis-${version}.css</a> (beta version)<br><br>
<a href="/download/jsuisjs">jsuis-${previous_version}.js</a> (stable version)<br>
<a href="/download/jsuiscss">jsuis-${previous_version}.css</a> (stable version)<br><br>

		</div>
	</div>
	<script>
    	var tutorial = new JSDiv(document.getElementById("tutorial"));
		var frame = new JSDiv(document.getElementById("example1"));
		frame.setLayout(new JSBorderLayout());
		tutorial.getComponents().push(frame);
		
		frame.setLayout(new JSGridBagLayout());
		var button = new JSButton("Click me!");
		frame.add(button);
		button.addActionListener({
			actionPerformed: function(mouseEvent) {
				alert("Hello, World!");
			}
		});
	</script>
	<script>
		new jstutorial.JSFrame_JSTutorial(${args}).setVisible(true);
	</script>
</body>
</html>
