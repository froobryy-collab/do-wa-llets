import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- SISTEM LOGGING UNTUK DEBUGGING ---
const logPath = path.join(app.getPath('userData'), 'debug-log.txt');
function logError(message) {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logPath, entry);
  console.error(entry);
}

process.on('uncaughtException', (error) => {
  logError(`Uncaught Exception: ${error.message}\n${error.stack}`);
  app.quit();
});

function createWindow() {
  try {
    logError("Memulai pembuatan jendela...");
    
    const win = new BrowserWindow({
      width: 1280,
      height: 800,
      title: "Do-Wa-llets",
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      }
    });

    if (app.isPackaged) {
      // Jalur absolut untuk asar
      const indexPath = path.resolve(__dirname, '..', 'dist', 'index.html');
      logError(`Mencoba memuat: ${indexPath}`);
      
      if (!fs.existsSync(indexPath)) {
        logError(`ERROR: File tidak ditemukan di ${indexPath}`);
      }

      win.loadFile(indexPath).catch(err => {
        logError(`Gagal memuat index.html: ${err.message}`);
      });
    } else {
      win.loadURL('http://localhost:5173');
    }

    win.once('ready-to-show', () => {
      logError("Jendela siap ditampilkan.");
      win.show();
    });

    win.on('unresponsive', () => logError("Jendela tidak responsif!"));

  } catch (err) {
    logError(`Gagal di createWindow: ${err.message}`);
  }
}

app.whenReady().then(() => {
  logError("App Ready.");
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
