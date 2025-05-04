import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // 🧠 Important : utiliser `win.loadFile('./dist/index.html')` pour base './'
  win.loadFile(path.join(__dirname, 'dist', 'index.html'));

  // ✅ Ouvre les DevTools si besoin pour debug
  // win.webContents.openDevTools();
}

// ✅ Nécessaire pour macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
