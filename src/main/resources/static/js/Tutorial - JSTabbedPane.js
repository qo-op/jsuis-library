var frame = new JSFrame();

var leftPanel = new JSPanel();
leftPanel.setPreferredWidth(100);
frame.add(leftPanel, JSBorderLayout.WEST);

var tabbedPane = new JSTabbedPane(JSTabbedPane.LEFT);
frame.add(tabbedPane);

var panel1 = new JSPanel(new JSGridBagLayout());
panel1.add(new JSLabel("Panel #1"));
var tab1 = tabbedPane.addCloseableTab("Tab 1", new JSImageIcon("/img/middle.gif", 16, 16), panel1);
//tabbedPane.addTab("Tab 1", panel1);

var panel2 = new JSPanel(new JSGridBagLayout());
panel2.add(new JSLabel("Panel #2"));
var tab2 = tabbedPane.addCloseableTab("Tab 2", new JSImageIcon("/img/middle.gif", 16, 16), panel2);
//tabbedPane.addTab("Tab 2", panel2);

var panel3 = new JSPanel(new JSGridBagLayout());
panel3.add(new JSLabel("Panel #3"));
var tab3 = tabbedPane.addCloseableTab("Tab 3", new JSImageIcon("/img/middle.gif", 16, 16), panel3);
//tabbedPane.addTab("Tab 3", panel3);

var panel4 = new JSPanel(new JSGridBagLayout());
panel4.add(new JSLabel("Panel #4"));
var tab4 = tabbedPane.addCloseableTab("Tab 4", new JSImageIcon("/img/middle.gif", 16, 16), panel4);
//tabbedPane.addTab("Tab 4", panel4);

tabbedPane.addTabListener(new JSTabListener(tabbedPane, {
    tabClosing: function(tabEvent, component) {
        var tab = tabEvent.getSource();
        tabbedPane.removeTabAt(tabbedPane.indexOfTab(tab));
        tabbedPane.validate();
    }
}));

frame.setVisible(true);