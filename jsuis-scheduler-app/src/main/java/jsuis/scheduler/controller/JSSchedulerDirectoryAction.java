package jsuis.scheduler.controller;

import java.awt.event.ActionEvent;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Properties;

import javax.swing.AbstractAction;
import javax.swing.Action;
import javax.swing.JOptionPane;

import jsuis.file.JSFile;
import jsuis.scheduler.JSScheduler;
import jsuis.scheduler.view.JSSchedulerFrame;
import jsuis.util.JSI18n;

/**
 * Scheduler directory action
 * 
 * @author Yassuo Toda
 */
public class JSSchedulerDirectoryAction extends AbstractAction {

	private static final long serialVersionUID = 1L;
	
	public JSSchedulerDirectoryAction() {
		putValue(Action.NAME, JSI18n.getText(getClass(), "Directory"));
	}
	
	@Override
	public void actionPerformed(ActionEvent evt) {
		JSScheduler scheduler = JSScheduler.getInstance();
		JSSchedulerFrame schedulerFrame = scheduler.getSchedulerFrame();
		Properties properties = scheduler.getProperties();
		String directory = properties.getProperty("directory", JSI18n.getText(getClass(), "~\\Documents\\e-Scheduler"));
		directory = JOptionPane.showInputDialog(schedulerFrame, "Diretório: ", directory);
		File file = new JSFile(directory);
		if (file != null && file.exists()) {
			properties.setProperty("directory", directory);
			File propertiesFile = scheduler.getPropertiesFile();
			if (propertiesFile.exists()) {
				try (OutputStream outputStream = new FileOutputStream(propertiesFile)) {
					properties.store(outputStream, null);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
