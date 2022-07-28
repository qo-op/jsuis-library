package jsuis.script.executor;

import java.util.ArrayList;
import java.util.List;

import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import org.jsoup.Jsoup;
import org.jsoup.helper.W3CDom;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import jsuis.script.annotation.JSRequired;

/**
 * Html get texts executor
 * 
 * @author Yassuo Toda
 */
public class JSHtmlGetTextList extends JSExecutor<List<String>> {

	@JSRequired private String html;
	@JSRequired private String xpath;
	private List<String> result;
	
	public JSHtmlGetTextList html(String html) {
		this.html = html;
		return this;
	}

	public JSHtmlGetTextList xpath(String xpath) {
		this.xpath = xpath;
		return this;
	}

	public List<String> result() {
		return result;
	}
	
	public void run() throws Exception {
		
		Document document = new W3CDom().fromJsoup(Jsoup.parse(html));
		XPathFactory xpathFactory = XPathFactory.newInstance();
		XPathExpression xpathExpression = xpathFactory.newXPath().compile(xpath);
		NodeList nodeList = (NodeList) xpathExpression.evaluate(document, XPathConstants.NODESET);
		List<String> textList = new ArrayList<>();
		int length = nodeList.getLength();
		for (int i = 0; i < length; i++) {
			Node node = nodeList.item(i);
			String value = node.getNodeValue();
			textList.add(value);
		}
		result = textList;
	}
}
