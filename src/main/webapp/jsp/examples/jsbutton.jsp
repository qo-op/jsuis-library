<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
	<title>JS Button example(s)</title>
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
	var frame = new JSFrame();
	frame.setLayout(new JSFlowLayout());
	var leftButtonIcon = new JSImageIcon("/img/right.gif", 20, 22);
	var middleButtonIcon = new JSImageIcon("/img/middle.gif", 20, 22);
	var rightButtonIcon = new JSImageIcon("/img/left.gif", 20, 22);
	var b1 = new JSButton("Disable middle button", leftButtonIcon);
	var b2 = new JSButton("Middle button", middleButtonIcon);
	b2.setVerticalTextPosition(JSButton.BOTTOM);
	var b3 = new JSButton("Enable middle button", rightButtonIcon);
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
	frame.add(b1);
	frame.add(b2);
	frame.add(b3);
	frame.setVisible(true);
</script>
</body>
			</textarea>
			
		</div>
	</div>
	<script>
		var tutorial = jsuistutorial.JSUIS_Tutorial.getInstance();
	    var tabbedPane_Example = tutorial.getExampleTabbedPane();
        var icon = new JSImageIcon("/img/baseline-playlist_play-24px-Green.svg", 24, 24);
        var example = new jsuistutorial.JSUIS_Example();
        var panel = example.getPanel();
        tabbedPane_Example.addTab("ButtonDemo.html", icon, panel).addClass("example");
        
        var element = document.getElementById("example1");
        var example1 = new JSTextArea(element);
        example.getSplitPane().setLeftComponent(example1);
        
		addEventListener("load", function() {
			example.getRunAction().actionPerformed(null);
		});
	</script>
	<script>
		var tutorial = jsuistutorial.JSUIS_Tutorial.getInstance();
		tutorial.getProperties().setProperty("args", JSON.stringify(${args}));
		tutorial.getFrame().setVisible(true);
	</script>
</body>
</html>
