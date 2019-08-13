<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
	<title>JS ProgressBar example(s)</title>
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
	frame.setLayout(new JSGridBagLayout());
	var progressBar = new JSProgressBar(0, 100);
	progressBar.setValue(50);
	frame.add(progressBar);
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
        tabbedPane_Example.addTab("ProgressBarDemo.html", icon, panel).addClass("example");
        
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
