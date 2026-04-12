import React from 'react';
import { Download, Smartphone, Laptop, Mail, MessageSquare, ShieldCheck, Zap, Globe } from 'lucide-react';
import { colors, styles } from '../constants/theme';

export default function LandingView({ onEnterApp }) {
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    color: '#ffffff',
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
  };

  const heroStyle = {
    textAlign: 'center',
    maxWidth: '800px',
    marginBottom: '60px',
  };

  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    width: '100%',
    maxWidth: '1000px',
    marginBottom: '60px',
  };

  const featureCard = (icon, title, desc) => (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <div style={{ color: colors.blue }}>{icon}</div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{title}</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>{desc}</p>
    </div>
  );

  const downloadCard = (icon, title, platform, link) => (
    <a href={link} target="_blank" rel="noopener noreferrer" style={{
      textDecoration: 'none',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '30px',
      borderRadius: '20px',
      border: `2px solid ${colors.blue}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      transition: 'transform 0.2s',
      color: '#fff'
    }} className="hover:scale-105">
      {icon}
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{title}</h3>
        <p style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{platform}</p>
      </div>
      <div style={{ 
        backgroundColor: colors.blue, 
        padding: '8px 20px', 
        borderRadius: '50px',
        fontWeight: '600',
        fontSize: '0.9rem'
      }}>Download</div>
    </a>
  );

  return (
    <div style={containerStyle}>
      {/* Header / Hero */}
      <div style={heroStyle}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(59, 130, 246, 0.2)', padding: '8px 16px', borderRadius: '50px', marginBottom: '20px' }}>
          <ShieldCheck size={16} color={colors.blue} />
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: colors.blue }}>Aman & Terpercaya</span>
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Do-Wa-llets
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '32px' }}>
          Kelola keuangan bersama jadi lebih mudah, transparan, dan teratur. 
          Satu dompet untuk semua rencana masa depan Anda.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={onEnterApp}
            style={{ ...styles.btnPrimary, padding: '14px 40px', fontSize: '1.1rem', borderRadius: '50px', background: colors.blue }}
          >
            Mulai Sekarang (Web)
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={cardContainerStyle}>
        {featureCard(<Zap size={24} />, "Cepat & Ringan", "Akses instan ke data keuangan Anda tanpa loading lama.")}
        {featureCard(<Globe size={24} />, "Multi-Device", "Sinkronisasi otomatis antara Browser, Android, dan Windows.")}
        {featureCard(<MessageSquare size={24} />, "Saran & Masukan", "Kirim saran langsung ke pengembang untuk fitur yang lebih baik.")}
      </div>

      {/* Download Section */}
      <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '30px' }}>Dapatkan Aplikasi Native</h2>
      <div style={{ ...cardContainerStyle, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', maxWidth: '600px' }}>
        {downloadCard(<Smartphone size={40} color={colors.success} />, "Android App", "Versi APK Terbaru", "https://github.com/froobryy-collab/do-wa-llets/releases/download/v1.0.0/Do-Wa-llets-Android.apk")}
        {downloadCard(<Laptop size={40} color={colors.blue} />, "Windows App", "Versi Desktop .exe", "https://github.com/froobryy-collab/do-wa-llets/releases/download/v1.0.0/Do-Wa-llets-Windows-Setup.exe")}
      </div>

      {/* Footer / Contact */}
      <div style={{ marginTop: 'auto', textAlign: 'center', padding: '40px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)', width: '100%', maxWidth: '800px' }}>
        <p style={{ color: '#64748b', marginBottom: '16px' }}>Ada pertanyaan atau saran fitur?</p>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
          <a href="mailto:admin@do-wa-llets.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none' }}>
            <Mail size={18} color={colors.blue} /> admin@app.com
          </a>
          <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none' }}>
            <MessageSquare size={18} color={colors.success} /> WhatsApp Kami
          </a>
        </div>
        <p style={{ marginTop: '30px', fontSize: '0.8rem', color: '#475569' }}>© 2026 Do-Wa-llets Project. Made with ❤️ for everyone.</p>
      </div>
    </div>
  );
}
