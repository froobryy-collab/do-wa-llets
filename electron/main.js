import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inisialisasi variabel global
let logPath = null;

/**
 * Fungsi pencatat error yang sangat aman.
 * Jika folder belum siap, ia akan mencoba membuatnya.
 */
function logError(message) {
  try {
    if (!logPath) {
      const userData = app.getPath('userData');
      if (!fs.existsSync(userData)) {
        fs.mkdirSync(userData, { recursive: true });
      }
      logPath = path.join(userData, 'debug-log.txt');
    }
    
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logPath, entry);
    console.log(entry); 
  } catch (e) {
    // Jika logging gagal, setidaknya muncul di console internal electron
    console.error("Gagal menulis log:", e);
  }
}

// Tangkap error tak terduga di level tertinggi
process.on('uncaughtException', (error) => {
  logError(`FATAL ERROR: ${error.message}\n${error.stack}`);
  // Jangan langsung quit agar user sempat melihat jika ada jendela muncul, 
  // tapi dalam kasus startup fail, quit biasanya terbaik.
  setTimeout(() => app.quit(), 3000);
});

function createWindow() {
  try {
    logError("--- Memulai Sesi Aplikasi ---");
    logError(`Platform: ${process.platform} | Versi: ${app.getVersion()}`);
    
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
      // Menggunakan __dirname yang biasanya menunjuk ke path di dalam asar
      // Struktur: resources/app.asar/electron/main.js
      // Target: resources/app.asar/dist/index.html
      const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
      
      logError(`Mencoba memuat file: ${indexPath}`);
      
      if (fs.existsSync(indexPath)) {
        win.loadFile(indexPath).catch(err => {
          logError(`Gagal loadFile: ${err.message}`);
        });
      } else {
        logError(`KRITIS: File index.html tidak ditemukan di jalur asar!`);
        // Coba jalur alternatif jika struktur foldernya berbeda (misal di root asar)
        const altPath = path.join(__dirname, 'dist', 'index.html');
        logError(`Mencoba jalur alternatif: ${altPath}`);
        if(fs.existsSync(altPath)) {
            win.loadFile(altPath);
        }
      }
    } else {
      win.loadURL('http://localhost:5173');
    }

    win.once('ready-to-show', () => {
      logError("Jendela sukses dimuat dan siap ditampilkan.");
      win.show();
    });

    win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      logError(`Gagal memuat konten: ${errorCode} - ${errorDescription}`);
    });

  } catch (err) {
    logError(`Gagal fatal di createWindow: ${err.message}`);
  }
}

// Inisialisasi App
app.whenReady().then(() => {
  try {
    logError("Aplikasi siap (Ready).");
    createWindow();
  } catch (e) {
    logError(`Gagal di app.whenReady: ${e.message}`);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
