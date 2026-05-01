import React, { useState, useEffect } from 'react';
import { colors, styles } from '../constants/theme';

const WalletDashboard = ({
  inputModal,
  setInputModal,
  handleSetModal,
  keuangan,
  sisaUangAktif,
  totalTabunganKeseluruhan,
  kodeDompet
}) => {
  const [savingsName, setSavingsName] = useState(() => {
    return localStorage.getItem(`savingsName_${kodeDompet}`) || "Nama Tabungan";
  });

  useEffect(() => {
    localStorage.setItem(`savingsName_${kodeDompet}`, savingsName);
  }, [savingsName, kodeDompet]);

  // Reset name if wallet changes and no name exists
  useEffect(() => {
    const saved = localStorage.getItem(`savingsName_${kodeDompet}`);
    if (saved) setSavingsName(saved);
    else setSavingsName("Nama Tabungan");
  }, [kodeDompet]);

  return (
    <div style={{ ...styles.brankasGrid, marginBottom: '20px' }} className="mobile-grid-1">
      <div style={styles.whiteCard}>
        <p style={styles.cardLabel}>Atur Modal Awal</p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <input
            type="number"
            placeholder="Nominal"
            value={inputModal}
            onChange={(e) => setInputModal(e.target.value)}
            style={{ ...styles.input, padding: '8px', flex: 1, fontSize: '0.9rem' }}
          />
          <button
            onClick={handleSetModal}
            style={{ ...styles.button, padding: '0 12px', height: 'auto', fontSize: '0.9rem' }}
          >
            OK
          </button>
        </div>
        <p style={{ margin: "8px 0 0 0", fontSize: "0.85rem", color: colors.textMuted }}>
          Saat ini: <b style={{ color: colors.textMain }}>Rp {keuangan.modal_awal.toLocaleString("id-ID")}</b>
        </p>
      </div>

      <div style={{ ...styles.whiteCard, background: sisaUangAktif >= 0 ? "#ECFDF5" : "#FEF2F2" }}>
        <p style={{ ...styles.cardLabel, color: sisaUangAktif >= 0 ? colors.success : colors.danger }}>Sisa Modal Aktif</p>
        <h2 style={{
          margin: "5px 0 0 0",
          color: sisaUangAktif >= 0 ? colors.success : colors.danger,
          fontSize: '1.6rem',
          fontWeight: '800'
        }} className="card-number">
          Rp {sisaUangAktif.toLocaleString("id-ID")}
        </h2>
      </div>

      <div style={{ ...styles.whiteCard, background: "#EFF6FF" }}>
        <p style={{ ...styles.cardLabel, color: colors.blue }}>Total Tabungan Terkunci</p>
        <h2 style={{ margin: "5px 0 0 0", color: colors.blue, fontSize: '1.6rem', fontWeight: '800' }} className="card-number">
          Rp {totalTabunganKeseluruhan.toLocaleString("id-ID")}
        </h2>
        <div style={{ marginTop: '5px' }}>
          <input 
            type="text"
            value={savingsName}
            onChange={(e) => setSavingsName(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: `1px dashed ${colors.border}`,
              color: colors.textMuted,
              fontSize: '0.75rem',
              width: '100%',
              padding: '2px 0',
              outline: 'none',
              textAlign: 'left'
            }}
            placeholder="Nama Tabungan (cth: Beli Motor)"
          />
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;
