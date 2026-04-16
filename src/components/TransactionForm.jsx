import React from 'react';
import { colors, styles } from '../constants/theme';

const TransactionForm = ({
  handleSubmit,
  form,
  setForm,
  loading,
  isEditing,
  handleCancelEdit
}) => {
  return (
    <div style={{ ...styles.whiteCard, padding: '20px', marginBottom: '20px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-end' }} className="mobile-stack">
        <div style={styles.inputGroup} className="mobile-full-width">
          <label style={styles.label}>Kategori</label>
          <select
            value={form.kategori}
            onChange={(e) => setForm({ ...form, kategori: e.target.value })}
            style={styles.input}
          >
            <option value="" disabled>--- Pilih Kategori ---</option>
            <option value="makan-minum">🍴 Makan & Minum</option>
            <option value="gaya hidup">🕶️ Gaya Hidup</option>
            <option value="transportasi">🚗 Transportasi</option>
            <option value="belanja pokok">🛒 Belanja Pokok</option>
            <option value="tabungan">💰 Tabungan</option>
            <option value="transfer">💸 Transfer</option>
            <option value="belanja">🛍️ Belanja</option>
            <option value="lainnya">📦 Lainnya</option>
          </select>
        </div>

        <div style={styles.inputGroup} className="mobile-full-width">
          <label style={styles.label}>Tanggal</label>
          <input
            type="date"
            value={form.tanggal}
            onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup} className="mobile-full-width">
          <label style={styles.label}>Tipe Arus</label>
          <select
            value={form.jenis}
            onChange={(e) => setForm({ ...form, jenis: e.target.value })}
            style={styles.input}
          >
            <option value="pengeluaran">➖ Uang Keluar (Jajan/Beli)</option>
            <option value="pemasukan">➕ Uang Masuk (Gaji/Bonus)</option>
            <option value="tarik_tabungan">🔒 Tarik ke Tabungan (Simpan)</option>
            <option value="ambil_tabungan">🔓 Ambil dari Tabungan (Gunakan)</option>
          </select>
        </div>

        <div style={styles.inputGroup} className="mobile-full-width">
          <label style={styles.label}>Keterangan</label>
          <input
            type="text"
            placeholder="Gaji / Jajan"
            value={form.keterangan}
            onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup} className="mobile-full-width">
          <label style={styles.label}>Nominal (Rp)</label>
          <input
            type="number"
            placeholder="0"
            value={form.nominal}
            onChange={(e) => setForm({ ...form, nominal: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }} className="mobile-full-width">
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              background: isEditing ? colors.warning : colors.success,
              height: '42px',
              width: isEditing ? 'auto' : '100px'
            }}
            className="mobile-full-width"
          >
            {loading ? "..." : isEditing ? "Update" : "Simpan"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleCancelEdit}
              style={{ ...styles.btnSecondary, height: '42px' }}
              className="mobile-full-width"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
