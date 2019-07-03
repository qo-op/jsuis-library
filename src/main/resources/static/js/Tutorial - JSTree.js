var frame = new JSFrame();

var tree = new JSTree();
tree.setRootVisible(false);
frame.add(tree);

var root = new JSTreeNode();
tree.setRoot(root);

var category1 = new JSTreeNode("Books for Java Programmers");
root.add(category1);

var book1 = new JSTreeNode("The Java Tutorial: A Short Course on the Basics");
category1.add(book1);

var book2 = new JSTreeNode("The Java Tutorial Continued: The Rest of the JDK");
category1.add(book2);

var book3 = new JSTreeNode("The JFC Swing Tutorial: A Guide to Constructing GUIs");
category1.add(book3);

var subCategory1 = new JSTreeNode("Sub Category");
category1.add(subCategory1);

var book4 = new JSTreeNode("Effective Java Programming Language Guide");
subCategory1.add(book4);

var book5 = new JSTreeNode("The Java Programming Language");
subCategory1.add(book5);

var book6 = new JSTreeNode("The Java Developers Almanac");
subCategory1.add(book6);

var category2 = new JSTreeNode("Books for Java Implementers");
root.add(category2);

var book7 = new JSTreeNode("The Java Virtual Machine Specification");
category2.add(book7);

var book8 = new JSTreeNode("The Java Language Specification");
category2.add(book8);

tree.expand(category1);
tree.expand(subCategory1);
tree.expand(category2);

frame.setVisible(true);
