import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { colors, styles } from '../constants/theme';

const HistoryView = ({ setIsHistory, riwayatData, totals }) => {
  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.fullContainer}>
        <div style={styles.brankasHeader}>
          <h1 style={styles.brankasTitle}>Riwayat Kas</h1>
          <span style={styles.globalRingkasan}>Arsip Bulanan</span>
          <button onClick={() => setIsHistory(false)} style={{ ...styles.btnSecondary, marginTop: '15px' }}>
            <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Kembali ke Lobby
          </button>
        </div>

        <div style={styles.mainCard}>
          <div style={styles.tableResponsive}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thRow}>
                  <th style={styles.th}>Bulan</th>
                  <th style={styles.th} className="mobile-hide">Modal Aktif</th>
                  <th style={{ ...styles.th, color: colors.success }}>Pemasukan</th>
                  <th style={{ ...styles.th, color: colors.danger }}>Pengeluaran</th>
                  <th style={{ ...styles.th, color: colors.blue }}>Tabungan</th>
                </tr>
              </thead>
              <tbody>
                {riwayatData.map((row, i) => (
                  <tr key={i} style={styles.tr}>
                    <td style={{ ...styles.td, fontWeight: '700' }}>
                      {new Date(row.bulan + "-01").toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
                    </td>
                    <td style={styles.td} className="mobile-hide">Rp {totals.modalTerdaftar.toLocaleString("id-ID")}</td>
                    <td style={{ ...styles.td, color: colors.success }}>+ Rp {row.pemasukan.toLocaleString("id-ID")}</td>
                    <td style={{ ...styles.td, color: colors.danger }}>- Rp {row.pengeluaran.toLocaleString("id-ID")}</td>
                    <td style={{ ...styles.td, color: colors.blue }}>🔒 Rp {row.tabungan.toLocaleString("id-ID")}</td>
                  </tr>
                ))}
                {riwayatData.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ ...styles.td, textAlign: 'center', padding: '50px' }}>
                      Belum ada arsip riwayat bulan sebelumnya.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer / Version Marker */}
        <div style={{ textAlign: 'center', padding: '20px', color: colors.textMuted, fontSize: '0.8rem', opacity: 0.6 }}>
          Do-Wa-llets v1.1 - Validated System
        </div>
      </div>
    </div>
  );
};

export default HistoryView;
