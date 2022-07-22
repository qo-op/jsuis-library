package scheduler;

import java.awt.AWTException;
import java.awt.Dimension;
import java.awt.Image;
import java.awt.MenuItem;
import java.awt.PopupMenu;
import java.awt.SystemTray;
import java.awt.TrayIcon;
import java.awt.event.ActionEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.channels.FileLock;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.TreeSet;

import javax.swing.AbstractAction;
import javax.swing.Action;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.SwingUtilities;
import javax.swing.event.TableModelListener;
import javax.swing.table.TableModel;

import org.apache.commons.cli.ParseException;
import org.apache.commons.io.FileUtils;

import jsuis.JSWorker;
import jsuis.cmd.parser.JSCmdParser;
import jsuis.cmd.scanner.JSCmdScanner;
import jsuis.cmd.visitor.JSCmdTextListPrinter;
import jsuis.cron.parser.JSCronParser;
import jsuis.cron.parser.expression.JSCronRebootExpression;
import jsuis.cron.parser.statement.JSCronScheduledJobStatement;
import jsuis.cron.scanner.JSCronScanner;
import jsuis.cron.visitor.JSCronCommandPrinter;
import jsuis.cron.visitor.JSCronDateCalculator;
import jsuis.cron.visitor.JSCronHourCalculator;
import jsuis.cron.visitor.JSCronMinuteCalculator;
import jsuis.file.JSFileUtils;
import jsuis.interpreter.parser.statement.JSStatement;
import jsuis.interpreter.scanner.JSToken;
import jsuis.util.JSI18n;
import jsuis.util.JSProperties;
import scheduler.view.JSSchedulerFrame;
import scheduler.view.JSSchedulerInputDialog;
import scheduler.view.JSSchedulerTableModel;

/**
 * @author Yassuo Toda
 */
public class JSScheduler {
	
	private static JSScheduler instance = null;
	
	public static JSScheduler getInstance() {
		if (instance == null) {
			instance = new JSScheduler();
		}
		return instance;
	}
	
	private JSProperties properties;
	
	public JSProperties getProperties() {
		if (properties == null) {
			try {
				properties = new JSProperties(getPropertiesFile().toPath());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return properties;
	}
	
	private File propertiesFile;
	
	public File getPropertiesFile() {
		if (propertiesFile == null) {
			propertiesFile = new File(System.getProperty("user.home"), JSI18n.getText(getClass(), "e-Scheduler\\properties\\e-Scheduler.properties"));
		}
		return propertiesFile;
	}
	
    private TrayIcon trayIcon;
    
    public TrayIcon getTrayIcon() {
    	if (trayIcon == null) {
    		Image image = getImage();
    		PopupMenu popupMenu = getPopupMenu();
        	trayIcon = new TrayIcon(image, "e-Agendamento", popupMenu);
    	    trayIcon.setImageAutoSize(true);
    	}
    	return trayIcon;
    }
	
    private Image image;
    
    public Image getImage() {
    	if (image == null) {
    		image = ((ImageIcon) JSI18n.getIcon(getClass(), getClass().getSimpleName() + ".png")).getImage();
    	}
    	return image;
    }
    
    private PopupMenu popupMenu;
    
    public PopupMenu getPopupMenu() {
    	if (popupMenu == null) {
    		popupMenu = new PopupMenu();
    		MenuItem schedulerMenuItem = getSchedulerMenuItem();
    		popupMenu.add(schedulerMenuItem);
    		popupMenu.addSeparator();
    		MenuItem fecharMenuItem = getFecharMenuItem();
    		popupMenu.add(fecharMenuItem);
    	}
    	return popupMenu;
    }
    
    private MenuItem schedulerMenuItem;
    
    public MenuItem getSchedulerMenuItem() {
    	if (schedulerMenuItem == null) {
    		schedulerMenuItem = new MenuItem("Agendamentos");
    		schedulerMenuItem.addActionListener(getSchedulerAction());
    	}
    	return schedulerMenuItem;
    }
    
    private Action schedulerAction;
    
    public Action getSchedulerAction() {
    	if (schedulerAction == null) {
    		schedulerAction = new AbstractAction() {
				private static final long serialVersionUID = 1L;
				@Override
				public void actionPerformed(ActionEvent e) {
					JSSchedulerFrame schedulerFrame = getSchedulerFrame();
		    		schedulerFrame.pack();
		    		schedulerFrame.setLocationRelativeTo(null);
		    		schedulerFrame.setExtendedState(schedulerFrame.getExtendedState() | JFrame.MAXIMIZED_BOTH);
		    		schedulerFrame.setVisible(true);
				}
    		};
    	}
    	return schedulerAction;
    }
    
    private MenuItem sairMenuItem;
    
    public MenuItem getFecharMenuItem() {
    	if (sairMenuItem == null) {
    		sairMenuItem = new MenuItem("Sair");
    		sairMenuItem.addActionListener(getSairAction());
    	}
    	return sairMenuItem;
    }
    
    private Action sairAction;
    
    public Action getSairAction() {
    	if (sairAction == null) {
    		sairAction = new AbstractAction() {
				private static final long serialVersionUID = 1L;
				@Override
				public void actionPerformed(ActionEvent evt) {
    				save(getBackupFile());
					System.exit(0);
				}
    		};
    	}
    	return sairAction;
    }
    
    private JSSchedulerFrame schedulerFrame;
    
    public JSSchedulerFrame getSchedulerFrame() {
    	if (schedulerFrame == null) {
    		schedulerFrame = new JSSchedulerFrame();
    		schedulerFrame.setDefaultCloseOperation(JFrame.HIDE_ON_CLOSE);
    		schedulerFrame.addWindowListener(getSchedulerWindowListener());
    	}
    	return schedulerFrame;
    }
    
    private WindowListener schedulerWindowListener;
    
    public WindowListener getSchedulerWindowListener() {
    	if (schedulerWindowListener == null) {
    		schedulerWindowListener = new WindowAdapter() {
    		    public void windowClosing(WindowEvent e) {
    				save(getBackupFile());
    		    }
    		};
    	}
    	return schedulerWindowListener;
    }
	
    private JSSchedulerInputDialog schedulerEditDialog;
    
    public JSSchedulerInputDialog getSchedulerEditDialog() {
    	if (schedulerEditDialog == null) {
    		schedulerEditDialog = new JSSchedulerInputDialog(getSchedulerFrame());
    		schedulerEditDialog.setPreferredSize(new Dimension(800, 600));
    	}
    	return schedulerEditDialog;
    }
    
	private Thread schedulerThread;
	
	public Thread getSchedulerThread() {
		if (schedulerThread == null) {
			schedulerThread = new Thread(getSchedulerRunnable());
		}
		return schedulerThread;
	}
	
	private Runnable schedulerRunnable;
	
	public Runnable getSchedulerRunnable() {
		if (schedulerRunnable == null) {
			schedulerRunnable = new Runnable() {
				public void run() {
					long offset = JSCronDateCalculator.getInstance().getOffset();
					long start = System.currentTimeMillis();
					start = (start  - offset) / 86_400_000 * 86_400_000 + offset;
					JSScheduler scheduler = JSScheduler.getInstance();
					JSSchedulerFrame schedulerFrame = scheduler.getSchedulerFrame();
					TableModel schedulerTableModel = schedulerFrame.getSchedulerTableModel();
					int rowCount = schedulerTableModel.getRowCount();
					for (int row = 0; row < rowCount; row++) {
						String source = (String) schedulerTableModel.getValueAt(row, 0);
						if (source == null) {
							continue;
						}
						int line = row + 1;
						@SuppressWarnings("unchecked")
						List<JSStatement> statementList = (List<JSStatement>) compute(source, line, start, 3).get(0);
						if (!statementList.isEmpty()) {
							JSCronScheduledJobStatement statement = (JSCronScheduledJobStatement) statementList.get(0);
							if (statement.expression != null && statement.expression instanceof JSCronRebootExpression) {
								List<String> commandList = getCommandList(source, line, null);
								scheduler.runCommand(new ArrayList<>(commandList), line);
							}
						}
					}
					while (true) {
						long millis = System.currentTimeMillis();
						millis -= offset;
						millis /= 60_000;
						int minute = (int) (millis % 60);
						millis /= 60;
						int hour = (int) (millis % 24);
						millis -= hour;
						millis *= 3_600_000;
						millis += offset;
						Set<String> sourceSet = new LinkedHashSet<>();
						for (int row = 0; row < rowCount; row++) {
							String source = (String) schedulerTableModel.getValueAt(row, 0);
							if (source == null) {
								continue;
							}
							sourceSet.add(source);
							int line = row + 1;
							Set<Integer> minuteSet = getMinuteSet(source, line, null);
							if (!minuteSet.contains(minute)) {
								continue;
							}
							Set<Integer> hourSet = getHourSet(source, line, null);
							if (!hourSet.contains(hour)) {
								continue;
							}
							List<Long> dateList = getDateList(source, line, millis, 3, null);
							if (!dateList.contains(millis)) {
								continue;
							}
							List<String> commandList = getCommandList(source, line, null);
							scheduler.runCommand(new ArrayList<>(commandList), line);
						}
						List<String> keyList = new ArrayList<>(commandListMap.keySet());
						for (String key : keyList) {
							if (!sourceSet.contains(key)) {
								minuteSetMap.remove(key);
								hourSetMap.remove(key);
								dateListMap.remove(key);
								commandListMap.remove(key);
							}
						}
						sourceSet.clear();
						SwingUtilities.invokeLater(new Runnable() {
							public void run() {
								System.gc();
							}
						});
						long currentTimeMillis = System.currentTimeMillis();
						try {
							Thread.sleep(60_000 - currentTimeMillis % 60_000);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
					}
				}
			};
		}
		return schedulerRunnable;
	}

	public void runCommand(List<String> commandList, int line) {
		if (commandList.isEmpty()) {
			return;
		}
		if (commandList.get(commandList.size() - 1).startsWith("#")) {
			commandList.remove(commandList.size() - 1);
		}
		if (commandList.isEmpty()) {
			return;
		}
		String command = commandList.get(0);
		if (!command.startsWith("-")) {
			commandList.add(0, "cmd");
			commandList.add(1, "/c");
			new JSWorker<Void, Void>() {
				@Override
				protected Void doInBackground() throws Exception {
					try {
						ProcessBuilder processBuilder = new ProcessBuilder(commandList);
						Properties properties = getProperties();
						String directory = properties.getProperty("directory", JSI18n.getText(getClass(), "~\\Documents\\e-Scheduler"));
						File file = JSFileUtils.translate(new File(directory));
						if (file != null && file.exists()) {
							processBuilder.directory(file);
						}
						processBuilder.start();
					} catch (IOException e) {
						e.printStackTrace();
					}
					return null;
				}
			}.execute();
			return;
		}
		boolean visible = false;
		if ("-v".equals(command) || "--visible".equals(command)) {
			visible = true;
			commandList.remove(0);
		}
		if (commandList.size() < 2) {
			return;
		}
		String arquivo = null;
		command = commandList.get(0);
		if ("-s".equals(command) || "--script".equals(command)) {
			commandList.remove(0);
			arquivo = commandList.get(0);
			commandList.remove(0);
		}
		if (arquivo == null) {
			return;
		}
		if (!arquivo.trim().toLowerCase().endsWith(".json")) {
			arquivo = arquivo + ".json";
		}
		Properties properties = getProperties();
		String directory = properties.getProperty("directory", "~");
		File file = JSFileUtils.translate(new File(directory));
		if (file != null && file.exists()) {
			file = new File(file, arquivo);
			if (file.exists()) {
				arquivo = file.getAbsolutePath();
			}
		}
		String arquivoPropriedades = null;
		if (commandList.size() > 0) {
			command = commandList.get(0);
			if (!command.startsWith("-")) {
				arquivoPropriedades = command;
				commandList.remove(0);
			}
		}
		String[] commands = commandList.toArray(new String[commandList.size()]);
		commandList.clear();
		if (arquivoPropriedades != null) {
			if (!arquivoPropriedades.trim().toLowerCase().endsWith(".json")) {
				arquivoPropriedades = arquivoPropriedades + ".json";
			}
			file = JSFileUtils.translate(new File(directory));
			if (file != null && file.exists()) {
				file = new File(file, arquivoPropriedades);
				if (file.exists()) {
					arquivoPropriedades = file.getAbsolutePath();
				}
			}
			commandList.add("");
			commandList.add(arquivoPropriedades);
		}
		for (int i = 0; i < commands.length - 1; i += 2) {
			String key = commands[i];
			if (!key.startsWith("--")) {
				continue;
			}
			key = key.substring(2);
			commandList.add(key);
			commandList.add(commands[i + 1]);
		}
		/*
		ClientWork trabalho = new ClientWork(arquivo);
		boolean abrir = visible;
		new JSWorker<Void, Void>() {
			@Override
			protected Void doInBackground() throws Exception {
				if (abrir) {
					trabalho.abrir();
				}
				trabalho.rodar(commandList.toArray(new String[commandList.size()]));
				return null;
			}
		}.execute();
		*/
	}
	
	public List<Collection<?>> compute(String source, int line, long date, int size) {
		List<Collection<?>> list = new ArrayList<>();
		try {
			JSCronScanner cronScanner = new JSCronScanner(source, line);
			List<JSToken> cronTokenList = cronScanner.scan();
			JSCronParser cronParser = new JSCronParser(cronTokenList);
			List<JSStatement> cronStatementList = cronParser.parse();
			list.add(cronStatementList);
			list.add(getMinuteSet(source, line, cronStatementList));
			list.add(getHourSet(source, line, cronStatementList));
			list.add(getDateList(source, line, date, size, cronStatementList));
			list.add(getCommandList(source, line, cronStatementList));
		} catch (Exception | Error e) {
			e.printStackTrace();
		}
		return list;
	}
	
	private Map<String, Set<Integer>> minuteSetMap = new HashMap<>();
	
	public Set<Integer> getMinuteSet(String source, int line, List<JSStatement> cronStatementList) {
		Set<Integer> minuteSet = minuteSetMap.get(source);
		if (minuteSet == null) {
			try {
				if (cronStatementList == null) {
					JSCronScanner cronScanner = new JSCronScanner(source, line);
					List<JSToken> cronTokenList = cronScanner.scan();
					JSCronParser cronParser = new JSCronParser(cronTokenList);
					cronStatementList = cronParser.parse();
				}
				minuteSet = JSCronMinuteCalculator.getInstance().calculate(cronStatementList);
			} catch (Exception | Error e) {
				minuteSet = new TreeSet<>();
				e.printStackTrace();
			}
			minuteSetMap.put(source, minuteSet);
		}
		return minuteSet;
	}
	
	private Map<String, Set<Integer>> hourSetMap = new HashMap<>();
	
	public Set<Integer> getHourSet(String source, int line, List<JSStatement> cronStatementList) {
		Set<Integer> hourSet = hourSetMap.get(source);
		if (hourSet == null) {
			try {
				if (cronStatementList == null) {
					JSCronScanner cronScanner = new JSCronScanner(source, line);
					List<JSToken> cronTokenList = cronScanner.scan();
					JSCronParser cronParser = new JSCronParser(cronTokenList);
					cronStatementList = cronParser.parse();
				}
				hourSet = JSCronHourCalculator.getInstance().calculate(cronStatementList);
				hourSetMap.put(source, hourSet);
			} catch (Exception | Error e) {
				hourSet = new TreeSet<>();
				e.printStackTrace();
			}
		}
		return hourSet;
	}
	
	private Map<String, List<Long>> dateListMap = new HashMap<>();
	
	public List<Long> getDateList(String source, int line, long start, int size, List<JSStatement> cronStatementList) {
		List<Long> dateList = dateListMap.get(source);
		if (dateList == null) {
			try {
				if (cronStatementList == null) {
					JSCronScanner cronScanner = new JSCronScanner(source, line);
					List<JSToken> cronTokenList = cronScanner.scan();
					JSCronParser cronParser = new JSCronParser(cronTokenList);
					cronStatementList = cronParser.parse();
				}
				dateList = Collections.synchronizedList(JSCronDateCalculator.getInstance().calculate(cronStatementList, start, Long.MAX_VALUE, size));
				dateListMap.put(source, dateList);
			} catch (Exception | Error e) {
				dateList = new ArrayList<>();
				e.printStackTrace();
			}
		}
		refill(dateList, source, line, start, size);
		return dateList;
	}
	
	public void refill(List<Long> dateList, String source, int line, long start, int size) {
		int index = dateList.indexOf(start);
		for (int i = 0; i < index; i++) {
			dateList.remove(0);
		}
		int dateListSize = dateList.size();
		if (dateListSize < 3) {
			long date = dateList.get(dateListSize - 1);
			if (date == 0) {
				for (int i = dateListSize; i < 3; i++) {
					dateList.add(0L);
				}
			} else {
				new Thread(new Runnable() {
					public void run() {
						try {
							JSCronScanner cronScanner = new JSCronScanner(source, line);
							List<JSToken> tokenList = cronScanner.scan();
							JSCronParser cronParser = new JSCronParser(tokenList);
							List<JSStatement> statementList = cronParser.parse();
							List<Long> list = JSCronDateCalculator.getInstance().calculate(statementList, date + 86_400_000, Long.MAX_VALUE, size - dateListSize);
							for (long l : list) {
								dateList.add(l);
							}
						} catch (Exception | Error e) {
							e.printStackTrace();
						}
					}
				}).start();
			}
		}
	}
	
	private Map<String, List<String>> commandListMap = new HashMap<>();
	
	public List<String> getCommandList(String source, int line, List<JSStatement> cronStatementList) {
		List<String> commandList = commandListMap.get(source);
		if (commandList == null) {
			String command = getCommand(source, line, cronStatementList);
			JSCmdScanner cmdScanner = new JSCmdScanner(command, line);
			List<JSToken> cmdTokenList = cmdScanner.scan();
			JSCmdParser cmdParser = new JSCmdParser(cmdTokenList);
			List<JSStatement> cmdStatementList = cmdParser.parse();
			JSCmdTextListPrinter cmdCommandPrinter = new JSCmdTextListPrinter(true);
			commandList = cmdCommandPrinter.print(cmdStatementList);
			commandListMap.put(command, commandList);
		}
		return commandList;
	}
	
	public String getCommand(String source, int line, List<JSStatement> cronStatementList) {
		if (cronStatementList == null) {
			JSCronScanner cronScanner = new JSCronScanner(source, line);
			List<JSToken> cronTokenList = cronScanner.scan();
			JSCronParser cronParser = new JSCronParser(cronTokenList);
			cronStatementList = cronParser.parse();
		}
		JSCronCommandPrinter cronCommandPrinter = new JSCronCommandPrinter();
		return cronCommandPrinter.print(cronStatementList);
	}
	
	private File file = new File(System.getProperty("user.home"), ".scheduler");
	
	public File getFile() {
		return file;
	}
	
	public void setFile(File file) {
		this.file = file;
	}
	
	private File backupFile = new File(System.getProperty("user.home"), ".scheduler.backup");
	
	public File getBackupFile() {
		return backupFile;
	}
	
	public void setBackupFile(File backupFile) {
		this.backupFile = backupFile;
	}
	
	private RandomAccessFile randomAccessFile;
	
	public RandomAccessFile getRandomAccessFile() throws FileNotFoundException {
		if (randomAccessFile == null) {
			randomAccessFile = new RandomAccessFile(getFile(), "rw");
		}
		return randomAccessFile;
	}
	
	private FileLock fileLock;
	
	public FileLock getFileLock() throws IOException {
		if (fileLock == null) {
			RandomAccessFile randomAccessFile = getRandomAccessFile();
			fileLock = randomAccessFile.getChannel().tryLock();
		}
		return fileLock;
	}
	
	public boolean lock() {
		try {
			FileLock fileLock = getFileLock();
			if (fileLock != null) {
	            Runtime.getRuntime().addShutdownHook(new Thread() {
	                public void run() {
	                    try {
	                        fileLock.release();
	            			RandomAccessFile randomAccessFile = getRandomAccessFile();
	            			randomAccessFile.close();
	                    } catch (Exception e) {
	                    	e.printStackTrace();
	                    }
	                }
	            });
	            return true;
			}
	    } catch (Exception e) {
        	e.printStackTrace();
		}
		return false;
	}
	
	public synchronized void load() {
		JSSchedulerFrame schedulerFrame = getSchedulerFrame();
		JSSchedulerTableModel schedulerTableModel = (JSSchedulerTableModel) schedulerFrame.getSchedulerTableModel();
		TableModelListener schedulerTableModelListener = schedulerFrame.getSchedulerTableModelListener();
		schedulerTableModel.removeTableModelListener(schedulerTableModelListener);
		schedulerTableModel.clear();
		if (getFile().exists()) {
			try {
				RandomAccessFile randomAccessFile = getRandomAccessFile();
				long length = randomAccessFile.length();
				byte[] bytes = new byte[(int) length];
				randomAccessFile.seek(0);
				randomAccessFile.read(bytes);
				String source = new String(bytes, "ISO-8859-1");
				String[] lines = source.split("\r?\n");
				for (int i = 0; i < lines.length; i++) {
					String line = lines[i];
					schedulerTableModel.setValueAt(line, i, 0);
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		schedulerTableModel.addTableModelListener(schedulerTableModelListener);
	}
	
	public void updateRows(int firstRow, int lastRow) {
	}
	
	public synchronized void save() {
		try {
			RandomAccessFile randomAccessFile = getRandomAccessFile();
			randomAccessFile.setLength(0);
			randomAccessFile.write(toString().getBytes("ISO-8859-1"));
			randomAccessFile.getChannel().force(false);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void save(File file) {
		try {
			FileUtils.writeStringToFile(file, toString(), "ISO-8859-1");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public String toString() {
		StringBuffer content = new StringBuffer();
		JSSchedulerFrame schedulerFrame = getSchedulerFrame();
		TableModel schedulerTableModel = schedulerFrame.getSchedulerTableModel();
		int rowCount = schedulerTableModel.getRowCount();
		for (int row = 0; row < rowCount; row++) {
			String schedule = (String) schedulerTableModel.getValueAt(row, 0);
			if (schedule != null && !schedule.isEmpty()) {
				content.append(schedule);
			}
			content.append("\r\n");
		}
		return content.toString().trim();
	}
	
	public static void main(String[] args) throws ParseException, InterruptedException {
		JSScheduler scheduler = JSScheduler.getInstance();
		if (scheduler.lock()) {
		    SystemTray systemTray = SystemTray.getSystemTray();
		    try {
		        systemTray.add(JSScheduler.getInstance().getTrayIcon());
		    } catch(AWTException awtException){
		        awtException.printStackTrace();
		    }
			scheduler.load();
			Thread thread = scheduler.getSchedulerThread();
			thread.start();
			thread.join();
		}
	}
}
