package jsuis.script.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Parameter annotation
 * 
 * Button ::= String { Boolean }
 * Canvas ::= Image
 * CheckBox ::= Table ? Boolean
 * ComboBox ::= ( String | Table ) { Void + }
 * ImageIcon ::= Image
 * Label ::= Void { name() = "" }
 * Menu ::= String { Void }
 * Panel ::= Void
 * ProgressBar ::= Double Double Double String
 * RadioButton ::= List { Boolean + }
 * Slider ::= Double Double Double
 * SplitPane ::= Double Double
 * Tab ::= List { ( Boolean Void ) + }
 * Table ::= ( List { List + } | Map )
 * TextArea ::= List { String }
 * TextField ::= ( String | Date | Decimal | Double | File | Integer | Object )
 * Tree ::= List { File + }
 * 
 * @author Yassuo Toda
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Repeatable(JSParameters.class)
public @interface JSParameter {
	Class<?> type() default String.class; // input type: ( Text | Boolean | Date | Decimal | Double | File | Image | Integer | List | Map | Object | Void )
	String name() default "name";
	String value() default "";
	String format() default "";
	String parent() default "";
	String label() default "";
	String description() default "";
}
