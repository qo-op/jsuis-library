var frame = new JSFrame();
frame.setLayout(new JSBorderLayout());

var columnNames = [ "CNPJ Basico", "Nome Empresarial" ];
var data = [
	[ "00.175.884", "PETROSUL DISTRIBUIDORA, TRANSPORTADORA E COMERCIO DE COMBUSTIVEIS LTDA" ],
	[ "00.248.529", "DEGRADE CONFECCOES PORTO FELIZ LTDA" ],
	[ "00.352.894", "HIDROLABOR LABORATORIO DE CONTROLE DE QUALIDADE LTDA" ],
	[ "02.869.994", "LAND INTERNACIONAL LTDA" ],
	[ "03.278.105", "ACOM ENERGY LTDA." ],
	[ "03.494.783", "EUREKA GLOBAL TRADING LTDA" ],
	[ "03.872.465", "ISA - PERFIS DE ALUMINIO LTDA" ],
	[ "03.956.519", "CENTER CELL COMERCIO E SERVICOS SOROCABA LTDA" ],
	[ "04.636.859", "CENTRAL TAXI AEREO LTDA." ],
	[ "05.684.573", "FLEXTRONICS INSTITUTO DE TECNOLOGIA" ],
];

var table = new JSTable(data, columnNames);
table.setAlign(JSLayout.CENTER);
table.setPreferredWidth(200);
table.setPreferredHeight(150);

/*
var scrollPane = new JSScrollPane(table, JSScrollPane.VERTICAL_SCROLLBAR_NEVER, JSScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
scrollPane.setAlign(JSLayout.CENTER);
scrollPane.setPreferredWidth(200);
scrollPane.setPreferredHeight(150);
table.getScrollPane().setHeight(150);
frame.add(scrollPane);
*/

frame.add(table);

frame.setVisible(true);
