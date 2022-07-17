package jsuis.cron.parser;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import jsuis.cron.parser.expression.JSCronAllExpression;
import jsuis.cron.parser.expression.JSCronAnnuallyExpression;
import jsuis.cron.parser.expression.JSCronDailyExpression;
import jsuis.cron.parser.expression.JSCronDayExpression;
import jsuis.cron.parser.expression.JSCronDayOfWeekExpression;
import jsuis.cron.parser.expression.JSCronFieldExpression;
import jsuis.cron.parser.expression.JSCronHourlyExpression;
import jsuis.cron.parser.expression.JSCronMidnightExpression;
import jsuis.cron.parser.expression.JSCronMonthlyExpresion;
import jsuis.cron.parser.expression.JSCronNumberExpression;
import jsuis.cron.parser.expression.JSCronOrdinalExpression;
import jsuis.cron.parser.expression.JSCronRangeExpression;
import jsuis.cron.parser.expression.JSCronRebootExpression;
import jsuis.cron.parser.expression.JSCronScheduleExpression;
import jsuis.cron.parser.expression.JSCronStepExpression;
import jsuis.cron.parser.expression.JSCronWeeklyExpression;
import jsuis.cron.parser.expression.JSCronWorkdayExpression;
import jsuis.cron.parser.expression.JSCronYearlyExpression;
import jsuis.cron.parser.statement.JSCronScheduledJobStatement;
import jsuis.cron.scanner.JSCronTokenType;
import jsuis.interpreter.parser.JSParser;
import jsuis.interpreter.parser.expression.JSExpression;
import jsuis.interpreter.parser.statement.JSStatement;
import jsuis.interpreter.scanner.JSToken;

/**
 * Cron parser
 * 
 * @author Yassuo Toda
 */
public class JSCronParser extends JSParser {

	public JSCronParser(List<JSToken> tokenList) {
		super(tokenList);
	}
	
	// statement ::= ( SPACE | TAB ) * ( ( HASH comment ) | ( REBOOT | YEARLY | ANNUALLY | MONTHLY | WEEKLY | DAILY | MIDNIGHT | HOURLY | expression ) command ) ( LINE_FEED | EOF )
	@Override
	public JSStatement statement() {
		while (match(JSCronTokenType.SPACE, JSCronTokenType.TAB)) {
		}
		JSStatement statement;
		if (match(JSCronTokenType.HASH)) {
			statement = new JSCronScheduledJobStatement(null, "#" + comment());
		} else if (match(JSCronTokenType.REBOOT)) {
			statement = new JSCronScheduledJobStatement(new JSCronRebootExpression(), command());
		} else if (match(JSCronTokenType.YEARLY)) {
			statement = new JSCronScheduledJobStatement(new JSCronYearlyExpression(), command());
		} else if (match(JSCronTokenType.ANNUALLY)) {
			statement = new JSCronScheduledJobStatement(new JSCronAnnuallyExpression(), command());
		} else if (match(JSCronTokenType.MONTHLY)) {
			statement = new JSCronScheduledJobStatement(new JSCronMonthlyExpresion(), command());
		} else if (match(JSCronTokenType.WEEKLY)) {
			statement = new JSCronScheduledJobStatement(new JSCronWeeklyExpression(), command());
		} else if (match(JSCronTokenType.DAILY)) {
			statement = new JSCronScheduledJobStatement(new JSCronDailyExpression(), command());
		} else if (match(JSCronTokenType.MIDNIGHT)) {
			statement = new JSCronScheduledJobStatement(new JSCronMidnightExpression(), command());
		} else if (match(JSCronTokenType.HOURLY)) {
			statement = new JSCronScheduledJobStatement(new JSCronHourlyExpression(), command());
		} else {
			statement = new JSCronScheduledJobStatement(expression(), command());
		}
		if (!isAtEnd()) {
			consume(JSCronTokenType.LINE_FEED, "Expected '\\n' after statement.");
		}
		return statement;
	}
	
	// comment ::= HASH .*
	public String comment() {
		StringBuffer comment = new StringBuffer();
		while (!isAtEnd() && !match(JSCronTokenType.LINE_FEED)) {
			comment.append(advance().lexeme); 
		}
		return comment.toString().trim();
	}
	
	// command ::= .*
	public String command() {
		StringBuffer command = new StringBuffer();
		while (!isAtEnd() && !match(JSCronTokenType.LINE_FEED)) {
			command.append(advance().lexeme); 
		}
		return command.toString().trim();
	}
	
	// expression ::= field { 5 } year ? 
	@Override
	public JSExpression expression() {
		return new JSCronScheduleExpression(field(JSCronFieldType.MINUTE), field(JSCronFieldType.HOUR), field(JSCronFieldType.DAY_OF_MONTH), field(JSCronFieldType.MONTH), field(JSCronFieldType.DAY_OF_WEEK), year());
	}
	
	// year ::= field ?
	public JSExpression year() {
		if (check(JSCronTokenType.NUMBER)) {
			return field(JSCronFieldType.YEAR);
		}
		return null;
	}
	
	// field ::= item ( COMMA item ) * ( SPACE | TAB) +
	public JSExpression field(JSCronFieldType fieldType) {
		JSExpression item = item(fieldType);
		if (match(JSCronTokenType.COMMA)) {
			List<JSExpression> expressionList = new ArrayList<>();
			expressionList.add(item);
			do {
				expressionList.add(item(fieldType));
			} while (match(JSCronTokenType.COMMA));
			consume(Arrays.asList(JSCronTokenType.SPACE, JSCronTokenType.TAB), "Expected space or tab.");
			while (match(JSCronTokenType.SPACE, JSCronTokenType.TAB)) {
			}
			return new JSCronFieldExpression(expressionList);
		}
		consume(Arrays.asList(JSCronTokenType.SPACE, JSCronTokenType.TAB), "Expected space or tab.");
		while (match(JSCronTokenType.SPACE, JSCronTokenType.TAB)) {
		}
		return item;
	}
	
	// item ::= range ( SLASH NUMBER ) ?
	public JSExpression item(JSCronFieldType fieldType) {
		if (fieldType == JSCronFieldType.YEAR) {
			return number(fieldType);
		}
		JSExpression range = range(fieldType);
		if (match(JSCronTokenType.SLASH)) {
			return new JSCronStepExpression(range, (int) consume(JSCronTokenType.NUMBER, "Expected number after '/'.").literal, fieldType);
		}
		return range;
	}
	
	// range ::= ( ASTERISK | number ( DASH NUMBER ) ? )
	public JSExpression range(JSCronFieldType fieldType) {
		if (match(JSCronTokenType.ASTERISK)) {
			return new JSCronAllExpression(fieldType);
		}
		JSExpression number = number(fieldType);
		if (number instanceof JSCronNumberExpression) {
			if (match(JSCronTokenType.DASH)) {
				JSExpression max = number(fieldType);
				if (max instanceof JSCronNumberExpression) {
					return new JSCronRangeExpression(number, max, fieldType);
				} else {
					error(previous(), "Expected number.");
				}
			}
		}
		return number;
	}
	
	// number ::= ( dayOfMonth | dayOfWeek | NUMBER )
	public JSExpression number(JSCronFieldType fieldType) {
		switch (fieldType) {
		case DAY_OF_MONTH:
			return dayOfMonth();
		case DAY_OF_WEEK:
			return dayOfWeek();
		default:
			int number = (int) consume(JSCronTokenType.NUMBER, "Expected number.").literal;
			switch (fieldType) {
			case MINUTE:
				if (number > 59) {
					error(previous(), "Invalid minute (0-59).");
				}
				break;
			case HOUR:
				if (number > 59) {
					error(previous(), "Invalid hour (0-23).");
				}
				break;
			case MONTH:
				if (number < 1 || number > 12) {
					error(previous(), "Invalid month (1-12).");
				}
				break;
			case YEAR:
				if (number < 1970) {
					error(previous(), "Invalid year (1970-).");
				}
				break;
			default:
			}
			return new JSCronNumberExpression(number, fieldType);
		}
	}
	
	// dayOfMonth ::= ( NUMBER | L ) day ? workday ?
	public JSExpression dayOfMonth() {
		JSExpression expression = null;
		if (match(JSCronTokenType.NUMBER)) {
			int dayOfMonth = (int) previous().literal;
			if (dayOfMonth > 31) {
				throw error(previous(), "Invalid day of month (1-31).");
			}
			expression = new JSCronNumberExpression(dayOfMonth, JSCronFieldType.DAY_OF_MONTH);
		} else if (match(JSCronTokenType.L)) {
			expression = new JSCronNumberExpression(-1, JSCronFieldType.DAY_OF_MONTH);
		} else {
			error(peek(), "Expected number or 'L'.");
		}
		if (match(JSCronTokenType.D)) {
			expression = new JSCronDayExpression(expression, day());
		}
		if (match(JSCronTokenType.W)) {
			expression = workday(expression);
		}
		return expression;
	}
	
	// dayOfWeek ::= ( NUMBER ( ( L  | HASH ordinal ) day ? workday ? ) ? | ( SUN | MON | TUE | WED | THU | FRI | SAT ) ( HASH ordinal day ? workday ? ) ? )
	public JSExpression dayOfWeek() {
		if (match(JSCronTokenType.NUMBER)) {
			int dayOfWeek = (int) previous().literal;
			if (dayOfWeek > 6) {
				throw error(previous(), "Invalid day of week (0-6).");
			}
			JSExpression expression = new JSCronNumberExpression(dayOfWeek, JSCronFieldType.DAY_OF_WEEK);
			if (match(JSCronTokenType.L)) {
				expression = new JSCronOrdinalExpression(expression, -1);
				if (match(JSCronTokenType.D)) {
					expression = new JSCronDayExpression(expression, day());
				}
				if (match(JSCronTokenType.W)) {
					expression = workday(expression);
				}
			} else if (match(JSCronTokenType.HASH)) {
				expression = new JSCronOrdinalExpression(expression, ordinal());
				if (match(JSCronTokenType.D)) {
					expression = new JSCronDayExpression(expression, day());
				}
				if (match(JSCronTokenType.W)) {
					expression = workday(expression);
				}
			}
			return expression;
		} else if (match(JSCronTokenType.SUN, JSCronTokenType.MON, JSCronTokenType.TUE, JSCronTokenType.WED, JSCronTokenType.THU, JSCronTokenType.FRI, JSCronTokenType.SAT)) {
			JSExpression expression = new JSCronDayOfWeekExpression(previous().tokenType);
			if (match(JSCronTokenType.HASH)) {
				expression = new JSCronOrdinalExpression(expression, ordinal());
				if (match(JSCronTokenType.D)) {
					expression = new JSCronDayExpression(expression, day());
				}
				if (match(JSCronTokenType.W)) {
					expression = workday(expression);
				}
			}
			return expression;
		} else {
			throw error(peek(), "Expected 0-7 or 'SUN' or 'MON' or 'TUE' or 'WED' or 'THU' or 'FRI' or 'SAT'.");
		}
	}
	
	// workday ::= W ( day day ? | TILDE day ) ?
	public JSExpression workday(JSExpression expression) {
		if (match(JSCronTokenType.D)) {
			expression = new JSCronWorkdayExpression(expression, day());
			if (match(JSCronTokenType.D)) {
				expression = new JSCronDayExpression(expression, day());
			}
		} else if (match(JSCronTokenType.TILDE)) {
			expression = new JSCronWorkdayExpression(expression, 0);
			consume(JSCronTokenType.D, "Expected 'D' after '~'.");
			expression = new JSCronDayExpression(expression, day(), "~");
		} else {
			expression = new JSCronWorkdayExpression(expression, 0);
		}
		return expression;
	}
	
	// day ::= D ( PLUS | DASH ) NUMBER
	public int day() {
		if (match(JSCronTokenType.PLUS)) {
			return (int) consume(JSCronTokenType.NUMBER, "Expected number after '+'.").literal + 1;
		} else if (match(JSCronTokenType.DASH)) {
			return -((int) consume(JSCronTokenType.NUMBER, "Expected number after '-'.").literal + 1);
		} else {
			throw error(peek(), "Expected '+' or '-' after 'D'.");
		}
	}
	
	// ordinal ::= NUMBER
	public int ordinal() {
		int ordinal = (int) consume(JSCronTokenType.NUMBER, "Expected number after '#'.").literal;
		if (ordinal < 1 || ordinal > 5) {
			throw error(previous(), "Invalid ordinal.");
		}
		return ordinal;
	}
}
