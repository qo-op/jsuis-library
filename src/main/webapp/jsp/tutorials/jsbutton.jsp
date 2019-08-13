<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
	<title>How to use JS Button</title>
	<link rel="stylesheet" href="/css/jsuis-${version}.css${build}">
	<script src="/js/jsuis-${version}.js${build}"></script>
	<link rel="stylesheet" href="/css/jsuistutorial-${version}.css${build}">
	<script src="/js/jsuistutorial-${version}.js${build}"></script>
</head>
<body>
	<div style="display: none">
		<div id="tutorial">
		
<h3>How to use JS Button</h3>
<p>The following application displays three buttons (based on <a target="_blank" href="https://docs.oracle.com/javase/tutorial/uiswing/examples/components/ButtonDemoProject/src/components/ButtonDemo.java">ButtonDemo.java</a>).</p>

<div id="example1" style="position: relative; border: 1px solid Gray; background-color: Silver;"></div>

<p>Example 1 (see <a target="_self" href="/examples/jsbutton">ButtonDemo.html</a> for a more complete example)</p>
<p>Click the left button to disable the middle button.<br>
Click the right button to enable the middle button.<br>
Click the middle button and nothing happens.</p>
<pre>
&lt;head&gt;
	&lt;link rel="stylesheet" href="/css/jsuis-${version}.css"&gt;
	&lt;script src="/js/jsuis-${version}.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script&gt;
	var frame = new JSFrame();
	var buttonDemo = new JSPanel();
	var b1 = new JSButton("Disable middle button");
	var b2 = new JSButton("Middle button");
	var b3 = new JSButton("Enable middle button");
	b3.setEnabled(false);
	b1.addActionListener({
		actionPerformed: function(mouseEvent) {
			b2.setEnabled(false);
			b1.setEnabled(false);
			b3.setEnabled(true);
		}
	});
	b3.addActionListener({
		actionPerformed: function(mouseEvent) {
			b2.setEnabled(true);
			b1.setEnabled(true);
			b3.setEnabled(false);
		}
	});
	buttonDemo.add(b1);
	buttonDemo.add(b2);
	buttonDemo.add(b3);
	frame.setContentPane(buttonDemo);
	frame.setVisible(true);
&lt;/script&gt;
&lt;/body&gt;
</pre>

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
		var buttonDemo = new JSPanel();
		var b1 = new JSButton("Disable middle button");
		var b2 = new JSButton("Middle button");
		var b3 = new JSButton("Enable middle button");
		b3.setEnabled(false);
		b1.addActionListener({
			actionPerformed: function(mouseEvent) {
				b2.setEnabled(false);
				b1.setEnabled(false);
				b3.setEnabled(true);
			}
		});
		b3.addActionListener({
			actionPerformed: function(mouseEvent) {
				b2.setEnabled(true);
				b1.setEnabled(true);
				b3.setEnabled(false);
			}
		});
		buttonDemo.add(b1);
		buttonDemo.add(b2);
		buttonDemo.add(b3);
		frame.add(buttonDemo);
		jsuis_Tutorial.getFrame().setVisible(true);
	</script>
</body>
</html>
