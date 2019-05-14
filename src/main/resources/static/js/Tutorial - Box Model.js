var frame = new JSFrame();

frame.setLayout(new JSGridBagLayout());

var panel = new JSPanel();
panel.setPreferredWidth(400);
panel.setPreferredHeight(300);
panel.setStyle("margin", "10px");
panel.setStyle("border", "20px solid black");
panel.setStyle("padding", "40px");
frame.add(panel);

panel.setLayout(new JSBorderLayout());

var css = new JSPanel();
css.setBackground("blue");
panel.add(css);

frame.setVisible(true);

console.log("width: " + panel.getWidth());
console.log("height: " + panel.getHeight());
console.log("clientWidth: " + panel.element.clientWidth);
console.log("clientHeight: " + panel.element.clientHeight);
console.log("offsetWidth: " + panel.element.offsetWidth);
console.log("offsetHeight: " + panel.element.offsetHeight);
console.log("boundingClientWidth: " + panel.getBoundingClientRect().width);
console.log("boundingClientHeight: " + panel.getBoundingClientRect().height);

console.log("left:" + panel.getX());
console.log("height: " + panel.getY());
console.log("clientLeft: " + panel.element.clientLeft);
console.log("clientTop: " + panel.element.clientTop);
console.log("offsetLeft: " + panel.element.offsetLeft);
console.log("offsetTop: " + panel.element.offsetTop);
console.log("boundingClientLeft: " + panel.getBoundingClientRect().left);
console.log("boundingClientTop: " + panel.getBoundingClientRect().top);
