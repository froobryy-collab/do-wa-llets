import React from 'react';
import { Mail, MessageSquare, ShieldCheck, Zap, Globe } from 'lucide-react';
import { colors, styles } from '../constants/theme';

export default function LandingView({ onEnterApp }) {
  const containerStyle = {
    minHeight: '100vh',
    background: colors.bg,
    color: colors.textMain,
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
      background: colors.card,
      padding: '24px',
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      boxShadow: 'var(--shadow-card)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <div style={{ color: colors.blue }}>{icon}</div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{title}</h3>
      <p style={{ color: colors.textMuted, fontSize: '0.95rem', lineHeight: '1.5' }}>{desc}</p>
    </div>
  );


  return (
    <div style={containerStyle}>
      {/* Header / Hero */}
      <div style={heroStyle}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(59, 130, 246, 0.2)', padding: '8px 16px', borderRadius: '50px', marginBottom: '20px' }}>
          <ShieldCheck size={16} color={colors.blue} />
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: colors.blue }}>Aman & Terpercaya</span>
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.02em', background: `linear-gradient(135deg, ${colors.success}, ${colors.blue})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Do-Wa-llets
        </h1>
        <p style={{ fontSize: '1.2rem', color: colors.textMuted, lineHeight: '1.6', marginBottom: '32px' }}>
          Kelola keuangan bersama jadi lebih mudah, transparan, dan teratur. 
          Satu dompet untuk semua rencana masa depan Anda.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={onEnterApp}
            style={{ ...styles.button, padding: '14px 40px', fontSize: '1.1rem', borderRadius: '50px', background: colors.success }}
          >
            Mulai Sekarang (Web)
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={cardContainerStyle}>
        {featureCard(<Zap size={24} />, "Cepat & Ringan", "Akses instan ke data keuangan Anda tanpa loading lama.")}
        {featureCard(<Globe size={24} />, "Akses di Mana Saja", "Buka lewat Browser di HP, Tablet, atau Laptop tanpa perlu instal.")}
        {featureCard(<MessageSquare size={24} />, "Saran & Masukan", "Kirim saran langsung ke pengembang untuk fitur yang lebih baik.")}
      </div>


      {/* Footer / Contact */}
      <div style={{ marginTop: 'auto', textAlign: 'center', padding: '40px 0', borderTop: `1px solid ${colors.border}`, width: '100%', maxWidth: '800px' }}>
        <p style={{ color: colors.textMuted, marginBottom: '16px' }}>Ada pertanyaan atau saran fitur?</p>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
          <a href="mailto:admin@do-wa-llets.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textMain, textDecoration: 'none', fontWeight: '600' }}>
            <Mail size={18} color={colors.blue} /> admin@app.com
          </a>
          <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textMain, textDecoration: 'none', fontWeight: '600' }}>
            <MessageSquare size={18} color={colors.success} /> WhatsApp Kami
          </a>
        </div>
        <p style={{ marginTop: '30px', fontSize: '0.8rem', color: colors.textMuted }}>© 2026 Do-Wa-llets Project. Made with ❤️ for everyone.</p>
      </div>
    </div>
  );
}
