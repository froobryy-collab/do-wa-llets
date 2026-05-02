import React, { useState } from 'react';
import { supabase } from '../supabase';
import { colors, styles } from '../constants/theme';
import { Wallet, User, Lock, ArrowRight } from 'lucide-react';

const AuthView = ({ setSession, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Format username ke email internal secara otomatis
    const internalEmail = `${username.toLowerCase().trim()}@app.com`;

    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email: internalEmail,
          password,
        });
        if (error) throw error;
        setMessage('Pendaftaran berhasil! Silakan masuk.');
        setIsRegister(false);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: internalEmail,
          password,
        });
        if (error) throw error;
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = () => {
    alert("Karena privasi tanpa email asli, pemulihan akun dilakukan manual. Silakan hubungi admin atau gunakan akun baru jika benar-benar lupa.");
  };

  return (
    <div style={{
      display: 'block',
      padding: '20px',
      paddingTop: '10vh',
      minHeight: '100vh',
      backgroundColor: colors.bg
    }}>
      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
        width: '100%',
        padding: '30px 20px',
        textAlign: 'center',
        background: colors.card,
        border: `1px solid ${colors.border}`,
        boxShadow: 'var(--shadow-card)',
        borderRadius: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> Kembali
          </button>
        </div>

        <div style={{
          background: `linear-gradient(135deg, ${colors.success}, ${colors.blue})`,
          width: '60px',
          height: '60px',
          borderRadius: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          color: 'white'
        }}>
          <Wallet size={32} />
        </div>

        <h1 style={{
          ...styles.brankasTitle,
          fontSize: '2rem',
          marginBottom: '30px',
          background: `linear-gradient(135deg, ${colors.success}, ${colors.blue})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Do-Wa-llets</h1>

        <form onSubmit={handleAuth} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ ...styles.label, color: colors.textMuted }}>Username</label>
            <input
              type="text"
              placeholder="Masukkan username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: `1.5px solid ${colors.border}`,
                background: 'var(--input-bg, #ffffff)',
                color: 'var(--input-text, #000000)',
                fontSize: '16px',
                boxSizing: 'border-box',
                WebkitUserSelect: 'text',
                userSelect: 'text',
                pointerEvents: 'auto'
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ ...styles.label, marginBottom: 0, color: colors.textMuted }}>Password</label>
              <button type="button" onClick={handleForgot} style={{ background: 'none', border: 'none', color: colors.blue, fontSize: '0.75rem', cursor: 'pointer', fontWeight: '700' }}>Lupa Akun?</button>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: `1.5px solid ${colors.border}`,
                background: 'var(--input-bg, #ffffff)',
                color: 'var(--input-text, #000000)',
                fontSize: '16px',
                boxSizing: 'border-box',
                WebkitUserSelect: 'text',
                userSelect: 'text',
                pointerEvents: 'auto'
              }}
            />
          </div>

          {message && (
            <div style={{
              padding: '12px',
              borderRadius: '8px',
              background: message.includes('berhasil') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: message.includes('berhasil') ? colors.success : colors.danger,
              fontSize: '0.85rem',
              marginBottom: '20px',
              fontWeight: '600',
              border: `1px solid ${message.includes('berhasil') ? colors.success : colors.danger}`
            }}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              background: colors.success,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Processing...' : (isRegister ? 'Konfirmasi Pendaftaran' : 'Masuk ke Aplikasi')}
          </button>
        </form>

        <div style={{ marginTop: '25px', fontSize: '0.9rem', color: colors.textMuted }}>
          {isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'}
          <button
            onClick={() => setIsRegister(!isRegister)}
            style={{
              background: 'none',
              border: 'none',
              color: colors.blue,
              fontWeight: '700',
              marginLeft: '5px',
              cursor: 'pointer'
            }}
          >
            {isRegister ? 'Login di sini' : 'Daftar sekarang'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
