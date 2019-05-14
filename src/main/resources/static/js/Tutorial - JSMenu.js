var frame = new JSFrame();

var menuBar = new JSMenuBar();
frame.add(menuBar, JSBorderLayout.NORTH);

var menu = new JSMenu("A Menu");
menuBar.add(menu);

var textOnlyMenuItem = new JSMenuItem("A text-only menu item");
menu.add(textOnlyMenuItem);

var bothTextAndIconMenuItem = new JSMenuItem("Both text and icon", new JSImageIcon("/img/middle.gif", 16, 16));
menu.add(bothTextAndIconMenuItem);

var iconOnlyMenuItem = new JSMenuItem(new JSImageIcon("/img/middle.gif", 16, 16));
menu.add(iconOnlyMenuItem);

menu.addSeparator();

var submenu = new JSMenu("A submenu");
menu.add(submenu);

var submenuMenuItem = new JSMenuItem("An item in the submenu");
submenu.add(submenuMenuItem);

var anotherSubmenuMenuItem = new JSMenuItem("Another item");
submenu.add(anotherSubmenuMenuItem);

var anotherMenu = new JSMenu("Another Menu");
menuBar.add(anotherMenu);

frame.setVisible(true);
