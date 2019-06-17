<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>JS Button example(s)</title>
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
</script>
</body>
			</textarea>
			
		</div>
	</div>
	<script>
	    var tabbedPane_Example = jstutorial.JSTabbedPane_Example.getInstance();
        var icon_Example = new JSImageIcon("/img/baseline-playlist_play-24px-Green.svg", 24, 24);
        var panel_Example = new jstutorial.JSPanel_Example();
        tabbedPane_Example.addTab("ButtonDemo.html", icon_Example, panel_Example).addClass("example");
        
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
