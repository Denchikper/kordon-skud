const { app, BrowserWindow, nativeTheme, ipcMain } = require('electron');
const path = require("path");
const { execFile } = require('child_process');
const fs = require('fs-extra');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 625,
    height: 288,
    icon: path.join(__dirname, 'img/maintenance.png'),
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        enableRemoteModule: false
      }
  });
  win.setMenuBarVisibility(false);
  win.setTitle("Утилита СКУД");
  win.loadFile('index.html');
};

nativeTheme.themeSource = 'light';

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') 
        app.quit();
});

ipcMain.on('run-program', (event, programPath) => {
    execFile(programPath, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing file: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
});

ipcMain.on('copy-file', async (event, { source, destination }) => {
    try {
        await fs.copy(source, destination);
        event.reply('copy-file-success', 'File copied successfully');
    } catch (err) {
        console.error('Error copying file:', err);
        event.reply('copy-file-error', 'Error copying file');
    }
});

ipcMain.on('delete-file', async (event, filePath) => {
  try {
      await fs.remove(filePath);
      event.reply('delete-file-success', 'File deleted successfully');
  } catch (err) {
      console.error('Error deleting file:', err);
      event.reply('delete-file-error', 'Error deleting file');
  }
});