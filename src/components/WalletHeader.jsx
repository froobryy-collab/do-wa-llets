import React from 'react';
import { List as ListIcon, PieChart as ChartIcon } from 'lucide-react';
import { colors, styles } from '../constants/theme';

const WalletHeader = ({ 
  isAnalyzing, 
  setIsAnalyzing, 
  kodeDompet, 
  handleEditWalletName, 
  setIsJoined, 
  setPengeluaran, 
  fetchDaftarDompet, 
  handleDeleteWallet, 
  toggleThemeButton 
}) => {
  return (
    <header style={{ ...styles.whiteCard, marginBottom: '20px', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }} className="mobile-stack">
        <div>
          <h1 style={{ ...styles.brankasTitle, fontSize: '1.5rem', marginBottom: '0' }}>💸 Catatan Keuangan</h1>
          <p style={{ color: colors.textMuted, fontSize: '0.9rem', marginTop: '5px' }}>
            Dompet: <span style={{ color: colors.success, fontWeight: '700' }}>#{kodeDompet.toLowerCase()}</span>
            <span 
              onClick={handleEditWalletName} 
              style={{ cursor: 'pointer', marginLeft: '6px' }} 
              title="Ubah Nama"
            >
              ✏️
            </span>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => setIsAnalyzing(!isAnalyzing)}
            style={{ ...styles.button, background: colors.blue, display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 15px' }}
          >
            {isAnalyzing ? <><ListIcon size={18} /> Lihat Tabel</> : <><ChartIcon size={18} /> Analisis Grafik</>}
          </button>
          <button 
            onClick={() => { 
              setIsJoined(false); 
              setIsAnalyzing(false); 
              setPengeluaran([]); 
              setKodeDompet(""); 
              fetchDaftarDompet(); 
            }} 
            style={styles.btnSecondary}
          >
            Lobby Pusat
          </button>
          <button onClick={handleDeleteWallet} style={styles.btnDanger}>Hapus Dompet</button>
          {toggleThemeButton}
        </div>
      </div>
    </header>
  );
};

export default WalletHeader;
