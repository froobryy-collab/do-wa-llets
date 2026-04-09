import React from 'react';
import { colors, styles } from '../constants/theme';

const TransactionTable = ({
  pengeluaran,
  dailySummaries,
  totalPemasukanAktif,
  totalPengeluaranAktif,
  handleEditClick,
  handleDeleteTransaction
}) => {
  return (
    <div style={styles.mainCard}>
      <h3 style={styles.sectionTitle}>Riwayat Transaksi Terakhir</h3>
      <div style={styles.tableResponsive}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th} className="mobile-hide">Tanggal</th>
              <th style={styles.th}>Kategori & Keterangan</th>
              <th style={{ ...styles.th, textAlign: 'right' }}>Nominal</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pengeluaran.map((item, index) => {
              const isIncome = item.jenis === "pemasukan";
              const isSaving = item.jenis === "tarik_tabungan";

              const summary = dailySummaries[item.tanggal] || { income: 0, outcome: 0, saved: 0, balance: 0 };
              const totalPemasukanHariIni = summary.income;
              const totalPengeluaranHariIni = summary.outcome;
              const totalSavedHariIni = summary.saved;
              const sisaHariIni = summary.balance;

              const isLastRowInDate = index === pengeluaran.length - 1 || pengeluaran[index + 1].tanggal !== item.tanggal;

              return (
                <React.Fragment key={index}>
                  <tr style={styles.tr}>
                    <td style={styles.td} className="mobile-hide">{item.tanggal}</td>
                    <td style={styles.td}>
                      <div style={{ fontSize: '0.7rem', color: colors.textMuted, textTransform: 'uppercase', fontWeight: 'bold' }}>
                        {item.kategori || 'lainnya'}
                      </div>
                      {item.keterangan}
                      <span style={{
                        fontSize: '0.72rem',
                        color: isIncome ? colors.success : (isSaving ? colors.blue : colors.danger),
                        background: 'transparent',
                        border: `1px solid ${isIncome ? colors.success : (isSaving ? colors.blue : colors.danger)}`,
                        padding: '1px 6px',
                        borderRadius: '6px',
                        marginLeft: '8px',
                        fontWeight: '700',
                        textTransform: 'uppercase'
                      }}>
                        {isIncome ? 'Income' : (isSaving ? 'Saved 🔒' : 'Outcome')}
                      </span>
                    </td>
                    <td style={{ ...styles.td, textAlign: 'right', color: isIncome ? colors.success : colors.textMain, fontWeight: isIncome ? '700' : '500' }}>
                      {isIncome ? "+ " : ""}Rp {parseFloat(item.nominal).toLocaleString("id-ID")}
                    </td>
                    <td style={{ ...styles.td, textAlign: 'center' }}>
                      <span style={{ ...styles.actionBtn, color: colors.blue }} onClick={() => handleEditClick(item)}>✏️</span>
                      <span style={{ ...styles.actionBtn, color: colors.danger, marginLeft: '10px' }} onClick={() => handleDeleteTransaction(item.id)}>🗑️</span>
                    </td>
                  </tr>

                  {isLastRowInDate && (
                    <tr style={{ background: "var(--th-bg)", borderTop: `2px solid var(--border)` }}>
                      <td colSpan="3" style={{ ...styles.td, color: "var(--th-text)", fontSize: '0.85rem' }}>
                        📅 <b>{item.tanggal}</b> |
                        <span style={{ color: colors.blue }}> Saved: <b>Rp {totalSavedHariIni.toLocaleString("id-ID")}</b></span> |
                        <span style={{ color: colors.danger }}> Out: <b>Rp {totalPengeluaranHariIni.toLocaleString("id-ID")}</b></span> |
                        <span style={{ color: colors.success }}> In: <b>Rp {totalPemasukanHariIni.toLocaleString("id-ID")}</b></span>
                      </td>
                      <td colSpan="1" style={{ ...styles.td, fontSize: "0.85rem", textAlign: "right", color: sisaHariIni >= 0 ? colors.success : colors.danger, fontWeight: '700' }}>
                        Arus: {sisaHariIni >= 0 ? "+" : ""}Rp {sisaHariIni.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}

            {/* TOTALAN */}
            <tr style={{ background: colors.bg, borderTop: `2px solid ${colors.border}` }}>
              <td colSpan="2" style={{ ...styles.td, fontWeight: 'bold', textAlign: 'right', color: colors.textMuted }}>Total Pemasukan:</td>
              <td style={{ ...styles.td, fontWeight: 'bold', textAlign: 'right', color: colors.success }}>Rp {totalPemasukanAktif.toLocaleString("id-ID")}</td>
              <td></td>
            </tr>
            <tr style={{ background: colors.bg }}>
              <td colSpan="2" style={{ ...styles.td, fontWeight: 'bold', textAlign: 'right', color: colors.textMuted }}>Total Pengeluaran:</td>
              <td style={{ ...styles.td, fontWeight: 'bold', textAlign: 'right', color: colors.danger }}>Rp {totalPengeluaranAktif.toLocaleString("id-ID")}</td>
              <td></td>
            </tr>
            <tr style={{ background: colors.border }}>
              <td colSpan="2" style={{ ...styles.td, fontWeight: '800', textAlign: 'center', color: colors.textMain }}>TOTAL ARUS KAS AKTIF</td>
              <td style={{ ...styles.td, fontWeight: '800', textAlign: 'right', color: colors.textMain }}>
                Rp {(totalPemasukanAktif - totalPengeluaranAktif).toLocaleString("id-ID")}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
