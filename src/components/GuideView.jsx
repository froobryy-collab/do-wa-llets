import React from 'react';
import { X, CheckCircle, Info, PieChart, Database, CreditCard, Calendar, ArrowRight } from 'lucide-react';
import { colors, styles } from '../constants/theme';

const GuideView = ({ onClose }) => {
  const guideSteps = [
    {
      title: "Lobby Pusat (Brankas)",
      description: "Halaman utama untuk melihat ringkasan keuangan global. Kamu bisa melihat total modal, pemasukan, pengeluaran, dan tabungan dari semua dompet yang kamu miliki.",
      icon: <Database size={24} color={colors.blue} />,
      details: [
        "Akses Dompet: Masukkan kode dompet unik untuk membuka catatan spesifik.",
        "Ringkasan Global: Pantau performa keuangan secara real-time.",
        "Riwayat Bulanan: Lihat arsip data dari bulan-bulan sebelumnya."
      ]
    },
    {
      title: "Pencatatan Transaksi",
      description: "Catat setiap arus uang masuk dan keluar dengan detail kategori agar keuanganmu lebih terorganisir.",
      icon: <CreditCard size={24} color={colors.success} />,
      details: [
        "Pemasukan: Uang yang masuk ke dompet.",
        "Pengeluaran: Biaya belanja atau pengeluaran harian.",
        "Tarik Tabungan: Khusus untuk memindahkan sisa uang ke pos Tabungan Terkunci."
      ]
    },
    {
      title: "Analisis & Grafik",
      description: "Visualisasikan data keuanganmu dalam bentuk grafik pie dan tren harian.",
      icon: <PieChart size={24} color={colors.warning} />,
      details: [
        "Grafik Pie: Lihat persentase pengeluaran berdasarkan kategori.",
        "Grafik Tren: Pantau fluktuasi pemasukan dan pengeluaran setiap hari.",
        "Filter Laporan: Cetak laporan harian, bulanan, atau tahunan ke PDF."
      ]
    },
    {
      title: "Siklus Rollover Bulanan",
      description: "Sistem cerdas yang membantu kamu memulai bulan baru dengan rapi.",
      icon: <Calendar size={24} color={colors.danger} />,
      details: [
        "Arsip Otomatis: Di setiap awal bulan baru (mulai Mei 2026), sistem akan meminta kamu mengatur modal baru.",
        "Sisa Uang: Sisa uang bulan lalu akan ditawarkan untuk menjadi modal awal atau masuk ke tabungan.",
        "Tertata Rapi: Transaksi bulan lalu dipindahkan ke arsip agar pencatatan bulan ini tetap ringan."
      ]
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        ...styles.whiteCard,
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        padding: '40px',
        animation: 'fadeInSlide 0.4s ease-out'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: colors.textMuted
          }}
        >
          <X size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ ...styles.brankasTitle, fontSize: '2.5rem', marginBottom: '10px' }}>Panduan Do-Wa-llets</h1>
          <p style={{ color: colors.textMuted, fontSize: '1.1rem' }}>Selamat datang! Yuk pelajari fitur lengkap aplikasi ini agar pengelolaan keuanganmu makin maksimal.</p>
        </div>

              <div key={index} style={{ 
                display: 'flex', 
                gap: '24px', 
                padding: '28px', 
                borderRadius: '24px', 
                background: 'var(--card)', // Adaptable background
                border: `1.5px solid ${colors.border}`,
                boxShadow: 'var(--shadow)',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{ 
                  minWidth: '56px', 
                  height: '56px', 
                  borderRadius: '16px', 
                  background: 'var(--day-header-bg)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}>
                  {step.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    margin: '0 0 12px 0', 
                    fontSize: '1.3rem', 
                    fontWeight: '800', 
                    color: 'var(--text-main)', // Dynamic color
                    letterSpacing: '-0.01em'
                  }}>{step.title}</h3>
                  <p style={{ 
                    fontSize: '1rem', 
                    color: 'var(--text-muted)', // Dynamic color 
                    lineHeight: '1.6', 
                    marginBottom: '20px' 
                  }}>{step.description}</p>
                  
                  {/* Background Text Points */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {step.details.map((detail, idx) => (
                      <div key={idx} style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '12px', 
                        fontSize: '0.92rem',
                        background: 'var(--bg)', // High contrast sub-bg
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid var(--border)'
                      }}>
                        <div style={{ marginTop: '4px' }}>
                          <CheckCircle size={14} color={colors.success} />
                        </div>
                        <span style={{ color: 'var(--text-main)', lineHeight: '1.4', fontWeight: '500' }}>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button 
            onClick={onClose}
            style={{ 
              ...styles.button, 
              padding: '16px 40px', 
              fontSize: '1.1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            Mulai Sekarang <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default GuideView;
