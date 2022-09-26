package jsuis.script.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Parameter annotation
 * 
 * Button ::= String Boolean
 * Canvas ::= Image
 * CheckBox ::= Table ? Boolean
 * ComboBox ::= ( String | Table ) Void Void +
 * Label ::= Void { name() = "" }
 * Menu ::= String Void
 * Panel ::= Void
 * ProgressBar ::= Double Double Double String
 * RadioButton ::= List Boolean +
 * Slider ::= Double Double Double
 * SplitPane ::= Double Double
 * Tab ::= List ( String Boolean ) +
 * Table ::= ( List + | Map )
 * TextArea ::= String String
 * TextField ::= Table ? ( String | Date | Decimal | Double | File | Integer | Object )
 * Tree ::= List File +
 * 
 * @author Yassuo Toda
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Repeatable(JSParameters.class)
public @interface JSParameter {
 	boolean required() default false;
	Class<?> type() default String.class; // type: ( String | Boolean | Date | Decimal | Double | File | Image | Integer | List | Map | Object )
	String parent() default "";
	String name() default "";
	String value() default "";
	String label() default "";
	String description() default "";
	String component() default "Field"; // component: ( Button | Check | Combo | Directory | Field | File | Image | Label | Menu | Panel | Password | Progress | Radio | Slider | Split | Tab | Table | Text | Tree )
}
