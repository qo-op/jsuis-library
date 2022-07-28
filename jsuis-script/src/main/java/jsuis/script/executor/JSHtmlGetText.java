package jsuis.script.executor;

import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import org.jsoup.Jsoup;
import org.jsoup.helper.W3CDom;
import org.w3c.dom.Document;
import org.w3c.dom.Node;

import jsuis.script.annotation.JSRequired;

/**
 * Html get texts executor
 * 
 * @author Yassuo Toda
 */
public class JSHtmlGetText extends JSExecutor<String> {

	@JSRequired private String html;
	@JSRequired private String xpath;
	private String result;
	
	public JSHtmlGetText html(String html) {
		this.html = html;
		return this;
	}

	public JSHtmlGetText xpath(String xpath) {
		this.xpath = xpath;
		return this;
	}

	public String result() {
		return result;
	}
	
	public void run() throws Exception {
		
		Document document = new W3CDom().fromJsoup(Jsoup.parse(html));
		XPathFactory xpathFactory = XPathFactory.newInstance();
		XPathExpression xpathExpression = xpathFactory.newXPath().compile(xpath);
		Node node = (Node) xpathExpression.evaluate(document, XPathConstants.NODE);
		String value = node.getNodeValue();
		result = value;
	}
}
