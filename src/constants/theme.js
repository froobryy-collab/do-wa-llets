export const colors = {
  bg: "var(--bg)",
  card: "var(--card)",
  textMain: "var(--text-main)",
  textMuted: "var(--text-muted)",
  border: "var(--border)",
  success: "#10B981",
  danger: "#EF4444",
  blue: "#3B82F6",
  warning: "#F59E0B"
};

export const styles = {
  bodyWrapper: {
    background: colors.bg,
    minHeight: "100vh",
    width: "100%",
    padding: "0",
    boxSizing: "border-box"
  },
  fullContainer: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    width: "100%",
    margin: "0",
    color: colors.textMain
  },
  brankasHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '35px',
    gap: '8px',
    textAlign: 'center'
  },
  brankasTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '2.8rem',
    fontWeight: '800',
    color: 'var(--text-main)',
    margin: 0,
    letterSpacing: '-0.04em',
    background: 'var(--title-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1.1'
  },
  globalRingkasan: {
    color: colors.textMuted,
    fontSize: '1rem',
    fontWeight: '500',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginTop: '5px'
  },
  brankasGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
    gap: '12px',
    marginBottom: '20px'
  },
  whiteCard: {
    background: colors.card,
    padding: '24px',
    borderRadius: '24px',
    border: `1px solid ${colors.border}`,
    boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
  },
  mainCard: {
    background: colors.card,
    padding: '24px',
    borderRadius: '24px',
    border: `1px solid ${colors.border}`,
    boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
  },
  cardLabel: {
    margin: 0,
    fontSize: '0.85rem',
    color: colors.textMuted,
    fontWeight: '600'
  },
  cardNumber: {
    fontSize: '1.8rem',
    fontWeight: '800',
    margin: '15px 0 0 0'
  },
  iconWrapper: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700'
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '20px'
  },
  tableResponsive: {
    overflowX: "auto",
    borderRadius: "8px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: '0.9rem'
  },
  thRow: {
    background: "var(--th-bg)",
    borderBottom: `1px solid var(--border)`
  },
  th: {
    color: "var(--th-text)",
    padding: "14px 16px",
    textAlign: "left",
    fontSize: '0.8rem',
    fontWeight: "600",
    textTransform: "uppercase"
  },
  tr: {
    borderBottom: `1px solid ${colors.border}`,
    transition: "background 0.2s"
  },
  td: {
    padding: "16px",
    color: colors.textMain,
    verticalAlign: "middle"
  },
  walletBadge: {
    background: '#E0F2FE',
    color: '#0369A1',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '700',
    cursor: 'pointer'
  },
  tableFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15px',
    padding: '0 10px'
  },
  inputGroup: { display: "flex", flexDirection: "column", flex: "1 1 150px" },
  label: { fontSize: "0.85rem", color: colors.textMain, marginBottom: "6px", fontWeight: "600" },
  input: { padding: "12px", borderRadius: "10px", border: `1.5px solid ${colors.border}`, background: "#ffffff", color: "#000000", fontSize: "0.9rem", outline: "none", transition: "border-color 0.2s" },
  button: { padding: "14px 24px", borderRadius: "14px", border: "none", color: "white", background: `linear-gradient(135deg, ${colors.success}, #059669)`, fontWeight: "700", cursor: "pointer", boxShadow: '0 4px 10px rgba(16, 185, 129, 0.25)', transition: "transform 0.2s" },
  btnSecondary: { padding: "12px 20px", borderRadius: "14px", border: `1.5px solid ${colors.border}`, background: colors.bg, color: colors.textMain, fontWeight: "600", cursor: "pointer", fontSize: "0.9rem", transition: "all 0.2s" },
  btnDanger: { padding: "10px 18px", borderRadius: "10px", border: "none", background: colors.danger, color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "0.85rem", opacity: 0.9 },
  actionBtn: { cursor: "pointer", fontSize: "1.1rem", transition: "transform 0.1s" }
};
