var frame = new JSFrame();

var root = new JSTreeNode("The Java Series");

var category, book;

category = new JSTreeNode("Books for Java Programmers");
root.add(category);

book = new JSTreeNode("The Java Tutorial: A Short Course on the Basics");
category.add(book);

book = new JSTreeNode("The Java Tutorial Continued: The Rest of the JDK");
category.add(book);

book = new JSTreeNode("The JFC Swing Tutorial: A Guide to Constructing GUIs");
category.add(book);

book = new JSTreeNode("Effective Java Programming Language Guide");
category.add(book);

book = new JSTreeNode("The Java Programming Language");
category.add(book);

book = new JSTreeNode("The Java Developers Almanac");
category.add(book);

category = new JSTreeNode("Books for Java Implementers");
root.add(category);

book = new JSTreeNode("The Java Virtual Machine Specification");
category.add(book);

book = new JSTreeNode("The Java Language Specification");
category.add(book);

var tree = new JSTree(root);
frame.add(tree);

frame.setVisible(true);
