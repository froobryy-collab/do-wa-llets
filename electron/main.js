import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "Do-Wa-llets",
    show: false, // Jangan tampilkan jendela sebelum siap
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  // Jika dalam mode produksi, muat file dari folder dist
  // Jika dalam mode pengembangan, muat dari localhost vite
  if (app.isPackaged) {
    const indexPath = path.join(__dirname, '../dist/index.html');
    win.loadFile(indexPath).catch(err => console.error("Gagal memuat index.html:", err));
  } else {
    win.loadURL('http://localhost:5173');
    // win.webContents.openDevTools(); // Aktifkan di dev mode jika perlu
  }

  win.once('ready-to-show', () => {
    win.show();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
