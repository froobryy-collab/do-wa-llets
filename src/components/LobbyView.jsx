import React from 'react';
import { colors, styles } from '../constants/theme';

const LobbyView = ({ 
  toggleThemeButton, 
  totals, 
  handleJoin, 
  kodeDompet, 
  setKodeDompet, 
  setIsHistory, 
  daftarDompet, 
  setIsJoined,
  appMode,
  onChooseLogin
}) => {
  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.fullContainer} className="mobile-p-10">

        {/* HEADER BRANKAS PUSAT DENGAN TOMBOL DI POJOK */}
        <div style={{ position: 'relative', marginBottom: '35px' }}>
          {/* Tombol Pojok Kanan Atas (Hanya muncul jika Guest atau if needed) */}
          <div style={{ 
            position: 'absolute', 
            top: '0', 
            right: '0', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px' 
          }} className="mobile-header-actions">
            {appMode === 'guest' && (
              <button 
                onClick={onChooseLogin}
                style={{ ...styles.btnSecondary, background: colors.blue, color: 'white', border: 'none' }}
              >
                Login Member
              </button>
            )}
            {toggleThemeButton}
          </div>

          <div style={styles.brankasHeader}>
            <h1 style={styles.brankasTitle}>Do-Wa-llets</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <span style={styles.globalRingkasan}>Money for Future</span>
              {appMode === 'guest' && (
                <span style={{ 
                  background: 'rgba(245, 158, 11, 0.15)', 
                  color: colors.warning, 
                  fontSize: '0.65rem', 
                  padding: '2px 8px', 
                  borderRadius: '10px', 
                  fontWeight: '700',
                  letterSpacing: '0.05em'
                }}>MODE TAMU</span>
              )}
            </div>
          </div>
        </div>

        {/* 4 CARDS AGREGASI */}
        <div style={styles.brankasGrid} className="mobile-grid-2">
          <div style={styles.whiteCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={styles.cardLabel}>Total Modal Terdaftar</p>
                <span style={{ fontSize: '0.7rem', color: colors.textMuted }}>Aktif Saat Ini</span>
              </div>
              <div style={{ ...styles.iconWrapper, background: '#ECFDF5' }}>
                <span style={{ color: colors.success }}>💼</span>
              </div>
            </div>
            <h2 style={{ ...styles.cardNumber, color: colors.success }} className="card-number">
              Rp {totals.modalTerdaftar.toLocaleString("id-ID")}
            </h2>
          </div>

          <div style={{ ...styles.whiteCard, background: 'var(--card-success)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={styles.cardLabel}>Pemasukan</p>
                <span style={{ fontSize: '0.7rem', color: colors.success }}>Bulan Ini</span>
              </div>
              <div style={{ ...styles.iconWrapper, background: '#DEF7EC' }}>
                <span style={{ color: colors.success }}>↗</span>
              </div>
            </div>
            <h2 style={{ ...styles.cardNumber, color: colors.success }} className="card-number">
              + Rp {totals.totalPemasukan.toLocaleString("id-ID")}
            </h2>
          </div>

          <div style={{ ...styles.whiteCard, background: 'var(--card-danger)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={styles.cardLabel}>Pengeluaran</p>
              <div style={{ ...styles.iconWrapper, background: '#FDE8E8' }}>
                <span style={{ color: colors.danger }}>↘</span>
              </div>
            </div>
            <h2 style={{ ...styles.cardNumber, color: colors.danger }} className="card-number">
              - Rp {totals.totalPengeluaran.toLocaleString("id-ID")}
            </h2>
          </div>

          <div style={styles.whiteCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={styles.cardLabel}>Tabungan Terkunci</p>
              <div style={{ ...styles.iconWrapper, background: '#EFF6FF' }}>
                <span style={{ color: colors.blue }}>🔒</span>
              </div>
            </div>
            <h2 style={{ ...styles.cardNumber, color: colors.blue }} className="card-number">
              Rp {totals.tabunganTerkunci.toLocaleString("id-ID")}
            </h2>
          </div>
        </div>

        {/* BAR AKSES DOMPET DESAIN BARU */}
        <div style={{ ...styles.whiteCard, marginBottom: '30px', padding: '15px 25px' }}>
          <form onSubmit={handleJoin} style={{ display: 'flex', gap: '20px', alignItems: 'center' }} className="mobile-stack">
            <p style={{ fontWeight: '800', fontSize: '1rem', whiteSpace: 'nowrap', margin: 0 }}>Akses Dompet:</p>
            <input
              type="text"
              placeholder="Masukkan kode..."
              value={kodeDompet}
              onChange={(e) => setKodeDompet(e.target.value)}
              style={{
                flex: '1',
                background: 'var(--day-header-bg)',
                color: 'var(--text-main)',
                border: `1.5px solid ${colors.border}`,
                padding: '12px 20px',
                borderRadius: '12px',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
            <button type="submit" style={{ ...styles.button, padding: '12px 30px' }} className="mobile-full-width">Buka Brankas</button>
          </form>
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${colors.border}`, textAlign: 'center' }}>
            <button
              onClick={() => setIsHistory(true)}
              style={{ ...styles.whiteCard, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px', color: 'var(--text-main)', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              📅 Lihat Riwayat Bulanan (Arsip)
            </button>
          </div>
        </div>

        {/* TABEL MODAL AKTIF REAL-TIME */}
        <div style={styles.mainCard}>
          <h3 style={{ ...styles.sectionTitle, textAlign: 'center', fontSize: '1.4rem' }}>Modal Aktif Real-time per Dompet</h3>
          <div style={styles.tableResponsive}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thRow}>
                  <th style={{ ...styles.th, textAlign: 'center', width: '50px' }}>No.</th>
                  <th style={{ ...styles.th, textAlign: 'center' }}>Dompet</th>
                  <th style={{ ...styles.th, textAlign: 'center' }}>Modal Awal</th>
                  <th style={{ ...styles.th, textAlign: 'center' }}>Pemasukan</th>
                  <th style={{ ...styles.th, textAlign: 'center' }}>Pengeluaran</th>
                  <th style={{ ...styles.th, textAlign: 'center' }}>SISA KAS AKTIF</th>
                </tr>
              </thead>
              <tbody>
                {daftarDompet.map((dompet, index) => (
                  <tr key={index} style={styles.tr}>
                    <td style={{ ...styles.td, textAlign: 'center', fontWeight: 'bold', color: colors.textMuted }}>{index + 1}</td>
                    <td style={{ ...styles.td, textAlign: 'center' }}>
                      <span style={styles.walletBadge} onClick={() => { setKodeDompet(dompet.nama); setIsJoined(true); }}>
                        {dompet.nama.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ ...styles.td, textAlign: 'center', fontWeight: '500', color: colors.textMuted }}>
                      Rp {dompet.modalAwal.toLocaleString("id-ID")}
                    </td>
                    <td style={{ ...styles.td, textAlign: 'center', color: colors.success, fontWeight: '600' }}>
                      +Rp {dompet.pemasukan.toLocaleString("id-ID")}
                    </td>
                    <td style={{ ...styles.td, textAlign: 'center', color: colors.danger, fontWeight: '600' }}>
                      -Rp {dompet.pengeluaran.toLocaleString("id-ID")}
                    </td>
                    <td style={{ ...styles.td, textAlign: 'center', color: colors.success, fontWeight: '700' }}>
                      Rp {dompet.sisaUang.toLocaleString("id-ID")} <span style={{ color: colors.success, fontSize: '0.8rem' }}>●</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={styles.tableFooter}>
            <span style={{ color: colors.textMuted }}>Total Dompet Aktif</span>
            <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{daftarDompet.length} Dompet</span>
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

export default LobbyView;
