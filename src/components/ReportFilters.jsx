import React from 'react';
import { colors, styles } from '../constants/theme';

const ReportFilters = ({
  filterCetak,
  setFilterCetak,
  pilihanTgl,
  setPilihanTgl,
  pilihanBln,
  setPilihanBln,
  pilihanThn,
  setPilihanThn,
  handlePrint,
  isArchive = false
}) => {
  return (
    <div style={{ ...styles.whiteCard, padding: '15px', marginBottom: '15px', display: 'flex', gap: '15px', alignItems: 'center', background: colors.bg, flexWrap: 'wrap' }}>
      <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>🖨️ Cetak Laporan:</p>

      <select
        value={filterCetak}
        onChange={(e) => setFilterCetak(e.target.value)}
        style={{ ...styles.input, padding: '5px 10px', fontSize: '0.85rem' }}
      >
        <option value="semua">Semua</option>
        <option value="harian">Pilih Tanggal</option>
        {isArchive && <option value="bulanan">Pilih Bulan</option>}
        {isArchive && <option value="tahunan">Pilih Tahun</option>}
      </select>

      {filterCetak === "harian" && (
        <input type="date" value={pilihanTgl} onChange={(e) => setPilihanTgl(e.target.value)} style={{ ...styles.input, padding: '5px', fontSize: '0.85rem' }} />
      )}

      {isArchive && filterCetak === "bulanan" && (
        <input type="month" value={pilihanBln} onChange={(e) => setPilihanBln(e.target.value)} style={{ ...styles.input, padding: '5px', fontSize: '0.85rem' }} />
      )}

      {isArchive && filterCetak === "tahunan" && (
        <input type="number" min="2000" max="2100" value={pilihanThn} onChange={(e) => setPilihanThn(e.target.value)} style={{ ...styles.input, padding: '5px', fontSize: '0.85rem', width: '80px' }} />
      )}

      <button onClick={handlePrint} style={{ ...styles.button, padding: '8px 15px', fontSize: '0.8rem', background: colors.blue, boxShadow: '0 4px 10px rgba(59, 130, 246, 0.2)' }}>Pesan Laporan</button>
      <p style={{ margin: 0, fontSize: '0.75rem', color: colors.textMuted }}>*Gunakan filter untuk mencetak data tertentu.</p>
    </div>
  );
};

export default ReportFilters;
