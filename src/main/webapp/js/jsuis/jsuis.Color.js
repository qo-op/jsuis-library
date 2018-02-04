/**
 * jsuis.Color
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.Color = jsuis.Object.extend(SUPER, function(r, g, b, a) {
		SUPER.prototype.constructor.call(this);
		this.setR(nvl(r, 0));
		this.setG(nvl(g, 0));
		this.setB(nvl(b, 0));
		this.setA(nvl(a, 255));
	});
	jsuis.Object.addProperties(jsuis.Color,
			new jsuis.Property("r"),
			new jsuis.Property("g"),
			new jsuis.Property("b"),
			new jsuis.Property("a")
	);
	jsuis.Color.getColor = function(rgb, a) {
		return new jsuis.Color((rgb >> 16) & 0xFF, (rgb >> 8) & 0xFF, (rgb >> 0) & 0xFF, a);
	}
	jsuis.Color.prototype.getRed = function() {
		return this.getR();
	}
	jsuis.Color.prototype.getGreen = function() {
		return this.getG();
	}
	jsuis.Color.prototype.getBlue = function() {
		return this.getB();
	}
	jsuis.Color.prototype.getAlpha = function() {
		return this.getA();
	}
	jsuis.Color.prototype.withRed = function(red) {
		return this.clone().setR(red);
	}
	jsuis.Color.prototype.withGreen = function(green) {
		return this.clone().setG(green);
	}
	jsuis.Color.prototype.withBlue = function(blue) {
		return this.clone().setB(blue);
	}
	jsuis.Color.prototype.withAlpha = function(alpha) {
		return this.clone().setA(alpha);
	}
	jsuis.Color.prototype.clone = function() {
		return new jsuis.Color(this.getR(), this.getG(), this.getB(), this.getA());
	}
	jsuis.Color.prototype.toString = function() {
		return "rgba(" + this.getR() + "," + this.getG() + "," + this.getB() + "," + (this.getA() / 255) + ")";
	}
	
	var COLORS = {
			AliceBlue: jsuis.Color.getColor(0xF0F8FF),
			AntiqueWhite: jsuis.Color.getColor(0xFAEBD7),
			Aqua: jsuis.Color.getColor(0x00FFFF),
			Aquamarine: jsuis.Color.getColor(0x7FFFD4),
			Azure: jsuis.Color.getColor(0xF0FFFF),
			Beige: jsuis.Color.getColor(0xF5F5DC),
			Bisque: jsuis.Color.getColor(0xFFE4C4),
			Black: jsuis.Color.getColor(0x000000),
			BlanchedAlmond: jsuis.Color.getColor(0xFFEBCD),
			Blue: jsuis.Color.getColor(0x0000FF),
			BlueViolet: jsuis.Color.getColor(0x8A2BE2),
			Brown: jsuis.Color.getColor(0xA52A2A),
			BurlyWood: jsuis.Color.getColor(0xDEB887),
			CadetBlue: jsuis.Color.getColor(0x5F9EA0),
			Chartreuse: jsuis.Color.getColor(0x7FFF00),
			Chocolate: jsuis.Color.getColor(0xD2691E),
			Coral: jsuis.Color.getColor(0xFF7F50),
			CornflowerBlue: jsuis.Color.getColor(0x6495ED),
			Cornsilk: jsuis.Color.getColor(0xFFF8DC),
			Crimson: jsuis.Color.getColor(0xDC143C),
			Cyan: jsuis.Color.getColor(0x00FFFF),
			DarkBlue: jsuis.Color.getColor(0x00008B),
			DarkCyan: jsuis.Color.getColor(0x008B8B),
			DarkGoldenRod: jsuis.Color.getColor(0xB8860B),
			DarkGray: jsuis.Color.getColor(0xA9A9A9),
			DarkGrey: jsuis.Color.getColor(0xA9A9A9),
			DarkGreen: jsuis.Color.getColor(0x006400),
			DarkKhaki: jsuis.Color.getColor(0xBDB76B),
			DarkMagenta: jsuis.Color.getColor(0x8B008B),
			DarkOliveGreen: jsuis.Color.getColor(0x556B2F),
			DarkOrange: jsuis.Color.getColor(0xFF8C00),
			DarkOrchid: jsuis.Color.getColor(0x9932CC),
			DarkRed: jsuis.Color.getColor(0x8B0000),
			DarkSalmon: jsuis.Color.getColor(0xE9967A),
			DarkSeaGreen: jsuis.Color.getColor(0x8FBC8F),
			DarkSlateBlue: jsuis.Color.getColor(0x483D8B),
			DarkSlateGray: jsuis.Color.getColor(0x2F4F4F),
			DarkSlateGray: jsuis.Color.getColor(0x2F4F4F),
			DarkTurquoise: jsuis.Color.getColor(0x00CED1),
			DarkViolet: jsuis.Color.getColor(0x9400D3),
			DeepPink: jsuis.Color.getColor(0xFF1493),
			DeepSkyBlue: jsuis.Color.getColor(0x00BFFF),
			DimGray: jsuis.Color.getColor(0x696969),
			DimGrey: jsuis.Color.getColor(0x696969),
			DodgerBlue: jsuis.Color.getColor(0x1E90FF),
			FireBrick: jsuis.Color.getColor(0xB22222),
			FloralWhite: jsuis.Color.getColor(0xFFFAF0),
			ForestGreen: jsuis.Color.getColor(0x228B22),
			Fuchsia: jsuis.Color.getColor(0xFF00FF),
			Gainsboro: jsuis.Color.getColor(0xDCDCDC),
			GhostWhite: jsuis.Color.getColor(0xF8F8FF),
			Gold: jsuis.Color.getColor(0xFFD700),
			GoldenRod: jsuis.Color.getColor(0xDAA520),
			Gray: jsuis.Color.getColor(0x808080),
			Grey: jsuis.Color.getColor(0x808080),
			Green: jsuis.Color.getColor(0x008000),
			GreenYellow: jsuis.Color.getColor(0xADFF2F),
			HoneyDew: jsuis.Color.getColor(0xF0FFF0),
			HotPink: jsuis.Color.getColor(0xFF69B4),
			IndianRed: jsuis.Color.getColor(0xCD5C5C),
			Indigo: jsuis.Color.getColor(0x4B0082),
			Ivory: jsuis.Color.getColor(0xFFFFF0),
			Khaki: jsuis.Color.getColor(0xF0E68C),
			Lavender: jsuis.Color.getColor(0xE6E6FA),
			LavenderBlush: jsuis.Color.getColor(0xFFF0F5),
			LawnGreen: jsuis.Color.getColor(0x7CFC00),
			LemonChiffon: jsuis.Color.getColor(0xFFFACD),
			LightBlue: jsuis.Color.getColor(0xADD8E6),
			LightCoral: jsuis.Color.getColor(0xF08080),
			LightCyan: jsuis.Color.getColor(0xE0FFFF),
			LightGoldenRodYellow: jsuis.Color.getColor(0xFAFAD2),
			LightGray: jsuis.Color.getColor(0xD3D3D3),
			LightGrey: jsuis.Color.getColor(0xD3D3D3),
			LightGreen: jsuis.Color.getColor(0x90EE90),
			LightPink: jsuis.Color.getColor(0xFFB6C1),
			LightSalmon: jsuis.Color.getColor(0xFFA07A),
			LightSeaGreen: jsuis.Color.getColor(0x20B2AA),
			LightSkyBlue: jsuis.Color.getColor(0x87CEFA),
			LightSlateGray: jsuis.Color.getColor(0x778899),
			LightSlateGrey: jsuis.Color.getColor(0x778899),
			LightSteelBlue: jsuis.Color.getColor(0xB0C4DE),
			LightYellow: jsuis.Color.getColor(0xFFFFE0),
			Lime: jsuis.Color.getColor(0x00FF00),
			LimeGreen: jsuis.Color.getColor(0x32CD32),
			Linen: jsuis.Color.getColor(0xFAF0E6),
			Magenta: jsuis.Color.getColor(0xFF00FF),
			Maroon: jsuis.Color.getColor(0x800000),
			MediumAquaMarine: jsuis.Color.getColor(0x66CDAA),
			MediumBlue: jsuis.Color.getColor(0x0000CD),
			MediumOrchid: jsuis.Color.getColor(0xBA55D3),
			MediumPurple: jsuis.Color.getColor(0x9370DB),
			MediumSeaGreen: jsuis.Color.getColor(0x3CB371),
			MediumSlateBlue: jsuis.Color.getColor(0x7B68EE),
			MediumSpringGreen: jsuis.Color.getColor(0x00FA9A),
			MediumTurquoise: jsuis.Color.getColor(0x48D1CC),
			MediumVioletRed: jsuis.Color.getColor(0xC71585),
			MidnightBlue: jsuis.Color.getColor(0x191970),
			MintCream: jsuis.Color.getColor(0xF5FFFA),
			MistyRose: jsuis.Color.getColor(0xFFE4E1),
			Moccasin: jsuis.Color.getColor(0xFFE4B5),
			NavajoWhite: jsuis.Color.getColor(0xFFDEAD),
			Navy: jsuis.Color.getColor(0x000080),
			OldLace: jsuis.Color.getColor(0xFDF5E6),
			Olive: jsuis.Color.getColor(0x808000),
			OliveDrab: jsuis.Color.getColor(0x6B8E23),
			Orange: jsuis.Color.getColor(0xFFA500),
			OrangeRed: jsuis.Color.getColor(0xFF4500),
			Orchid: jsuis.Color.getColor(0xDA70D6),
			PaleGoldenRod: jsuis.Color.getColor(0xEEE8AA),
			PaleGreen: jsuis.Color.getColor(0x98FB98),
			PaleTurquoise: jsuis.Color.getColor(0xAFEEEE),
			PaleVioletRed: jsuis.Color.getColor(0xDB7093),
			PapayaWhip: jsuis.Color.getColor(0xFFEFD5),
			PeachPuff: jsuis.Color.getColor(0xFFDAB9),
			Peru: jsuis.Color.getColor(0xCD853F),
			Pink: jsuis.Color.getColor(0xFFC0CB),
			Plum: jsuis.Color.getColor(0xDDA0DD),
			PowderBlue: jsuis.Color.getColor(0xB0E0E6),
			Purple: jsuis.Color.getColor(0x800080),
			RebeccaPurple: jsuis.Color.getColor(0x663399),
			Red: jsuis.Color.getColor(0xFF0000),
			RosyBrown: jsuis.Color.getColor(0xBC8F8F),
			RoyalBlue: jsuis.Color.getColor(0x4169E1),
			SaddleBrown: jsuis.Color.getColor(0x8B4513),
			Salmon: jsuis.Color.getColor(0xFA8072),
			SandyBrown: jsuis.Color.getColor(0xF4A460),
			SeaGreen: jsuis.Color.getColor(0x2E8B57),
			SeaShell: jsuis.Color.getColor(0xFFF5EE),
			Sienna: jsuis.Color.getColor(0xA0522D),
			Silver: jsuis.Color.getColor(0xC0C0C0),
			SkyBlue: jsuis.Color.getColor(0x87CEEB),
			SlateBlue: jsuis.Color.getColor(0x6A5ACD),
			SlateGray: jsuis.Color.getColor(0x708090),
			SlateGrey: jsuis.Color.getColor(0x708090),
			Snow: jsuis.Color.getColor(0xFFFAFA),
			SpringGreen: jsuis.Color.getColor(0x00FF7F),
			SteelBlue: jsuis.Color.getColor(0x4682B4),
			Tan: jsuis.Color.getColor(0xD2B48C),
			Teal: jsuis.Color.getColor(0x008080),
			Thistle: jsuis.Color.getColor(0xD8BFD8),
			Tomato: jsuis.Color.getColor(0xFF6347),
			Turquoise: jsuis.Color.getColor(0x40E0D0),
			Violet: jsuis.Color.getColor(0xEE82EE),
			Wheat: jsuis.Color.getColor(0xF5DEB3),
			White: jsuis.Color.getColor(0xFFFFFF),
			WhiteSmoke: jsuis.Color.getColor(0xF5F5F5),
			Yellow: jsuis.Color.getColor(0xFFFF00),
			YellowGreen: jsuis.Color.getColor(0x9ACD32)
	};
	
	for (var key in COLORS) {
		jsuis.Color[key] = COLORS[key];
		jsuis.Color[key.toUpperCase()] = COLORS[key];
		jsuis.Color[key.charAt(0).toLowerCase() + key.slice(1)] = COLORS[key];
		jsuis.Color[key.replace(/([A-Z])/g, "_$1").slice(1).toUpperCase()] = COLORS[key];
	}
	
}) (jsuis);
