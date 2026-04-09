import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { colors, styles } from '../constants/theme';

const AnalyticsView = ({
  setIsAnalyzing,
  totalPengeluaranAktif,
  pengeluaran,
  getTrendData
}) => {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>

      {/* GRAFIK TREN (LINE CHART) */}
      <div style={{ ...styles.whiteCard, marginBottom: '20px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ ...styles.iconWrapper, background: '#DBEAFE' }}>
            <TrendingUp size={18} color={colors.blue} />
          </div>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>Tren Arus Kas Harian</h3>
        </div>

        <div style={{ width: '100%', height: '250px' }}>
          <ResponsiveContainer>
            <LineChart data={getTrendData()}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: 'var(--card)',
                  border: `1px solid var(--border)`,
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => [`Rp ${value.toLocaleString("id-ID")}`]}
              />
              <Legend iconType="circle" />
              <Line type="monotone" dataKey="masuk" name="Pemasukan" stroke={colors.success} strokeWidth={3} dot={{ r: 4, fill: colors.success }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="keluar" name="Pengeluaran" stroke={colors.danger} strokeWidth={3} dot={{ r: 4, fill: colors.danger }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ ...styles.whiteCard, textAlign: 'center', marginBottom: '20px' }}>
        <p style={{ color: colors.textMuted, fontSize: '0.9rem' }}>Total Pengeluaran</p>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: colors.danger }}>
          - Rp {totalPengeluaranAktif.toLocaleString("id-ID")}
        </h2>

        {/* GRAFIK LINGKARAN */}
        <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={(() => {
                  const grouped = pengeluaran.filter(p => p.jenis === "pengeluaran" || p.jenis === "tarik_tabungan").reduce((acc, curr) => {
                    const kat = curr.kategori || "lainnya";
                    acc[kat] = (acc[kat] || 0) + parseFloat(curr.nominal);
                    return acc;
                  }, {});
                  const palette = [colors.success, colors.blue, colors.warning, colors.danger, "#C4B5FD", "#A7F3D0", "#FFB4B4", "#FDE68A"];
                  return Object.keys(grouped).map((name, i) => ({ name, value: grouped[name], color: palette[i % palette.length] }));
                })()}
                cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value"
              >
                {pengeluaran.length > 0 && Object.keys(pengeluaran.reduce((acc, curr) => {
                  const kat = curr.kategori || "lainnya";
                  acc[kat] = (acc[kat] || 0) + parseFloat(curr.nominal);
                  return acc;
                }, {})).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={[colors.success, colors.blue, colors.warning, colors.danger, "#C4B5FD", "#A7F3D0", "#FFB4B4", "#FDE68A"][index % 8]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`Rp ${value.toLocaleString("id-ID")}`]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BREAKDOWN KATEGORI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
        {(() => {
          const grouped = pengeluaran.filter(p => p.jenis === "pengeluaran" || p.jenis === "tarik_tabungan").reduce((acc, curr) => {
            const kat = curr.kategori || "lainnya";
            acc[kat] = (acc[kat] || 0) + parseFloat(curr.nominal);
            return acc;
          }, {});
          const palette = [colors.success, colors.blue, colors.warning, colors.danger, "#C4B5FD", "#A7F3D0", "#FFB4B4", "#FDE68A"];
          return Object.keys(grouped).map((name, i) => (
            <div key={i} style={{ ...styles.whiteCard, padding: '15px', display: 'flex', alignItems: 'center', gap: '12px', borderLeft: `5px solid ${palette[i % palette.length]}` }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold', color: colors.textMuted }}>{name}</p>
                <p style={{ margin: 0, fontWeight: '700' }}>Rp {grouped[name].toLocaleString("id-ID")}</p>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: colors.textMain }}>
                {((grouped[name] / totalPengeluaranAktif) * 100).toFixed(1)}%
              </div>
            </div>
          ));
        })()}
      </div>

      <button
        onClick={() => setIsAnalyzing(false)}
        style={{ ...styles.whiteCard, width: '100%', marginBottom: '30px', color: 'var(--text-main)', fontWeight: '700', padding: '16px', cursor: 'pointer', border: `1px solid ${colors.border}`, display: 'block', textAlign: 'center' }}
      >
        Kembali ke Daftar Transaksi
      </button>
    </div>
  );
};

export default AnalyticsView;
