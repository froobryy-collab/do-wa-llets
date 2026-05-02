import React from 'react';
import { colors, styles } from '../constants/theme';
import { Wallet, User, UserCheck, ArrowRight, ShieldCheck } from 'lucide-react';

const WelcomeView = ({ onChooseGuest, onChooseLogin }) => {
  return (
    <div style={{
      ...styles.bodyWrapper,
      display: 'block',
      minHeight: '100vh',
      padding: '20px',
      paddingTop: '10vh',
      backgroundColor: colors.bg
    }}>
      <div style={{
        ...styles.whiteCard,
        maxWidth: '480px',
        margin: '0 auto',
        width: '100%',
        padding: '50px 40px',
        textAlign: 'center'
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${colors.success}, ${colors.blue})`,
          width: '70px',
          height: '70px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 25px',
          color: 'white',
          boxShadow: `0 10px 20px rgba(16, 185, 129, 0.3)`
        }}>
          <Wallet size={35} />
        </div>

        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: '800',
          letterSpacing: '-0.04em',
          lineHeight: '1.1',
          fontSize: '2.5rem',
          marginBottom: '10px',
          background: `linear-gradient(135deg, ${colors.success}, ${colors.blue})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Do-Wa-llets</h1>
        <p style={{
          ...styles.globalRingkasan,
          fontSize: '0.9rem',
          marginBottom: '40px',
          color: colors.textMuted
        }}>Kelola Keuangan dengan Gaya & Privasi</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* OPSI LOGIN */}
          <button
            onClick={onChooseLogin}
            style={{
              ...styles.button,
              background: colors.success,
              padding: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontSize: '1rem',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <UserCheck size={20} />
            Masuk Akun Pribadi
            <ArrowRight size={18} style={{ opacity: 0.6 }} />
          </button>

          {/* OPSI GUEST */}
          <button
            onClick={onChooseGuest}
            style={{
              ...styles.btnSecondary,
              padding: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontSize: '1rem',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = colors.blue}
            onMouseOut={(e) => e.currentTarget.style.borderColor = colors.border}
          >
            <User size={20} style={{ color: colors.success }} />
            Gunakan sebagai Guest
          </button>
        </div>

        <div style={{
          marginTop: '40px',
          padding: '15px',
          borderRadius: '12px',
          background: 'var(--input-bg, #ffffff)',
          border: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textAlign: 'left'
        }}>
          <ShieldCheck size={20} style={{ color: colors.success, flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '0.75rem', color: colors.textMuted, lineHeight: '1.4' }}>
            <strong>Mode Member:</strong> Data tersimpan privat & aman.<br/>
            <strong>Mode Guest:</strong> Data tersimpan umum (tanpa login).
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;
