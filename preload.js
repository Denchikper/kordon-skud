const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    runProgram: (programPath) => ipcRenderer.send('run-program', programPath),
    copyFile: (source, destination) => ipcRenderer.send('copy-file', { source, destination }),
    deleteFile: (filePath) => ipcRenderer.send('delete-file', filePath),
});