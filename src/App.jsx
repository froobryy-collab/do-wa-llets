import { useState, useEffect } from "react";
import { supabase } from "./supabase";
// Import alat grafik dan ikon
import { ResponsiveContainer } from 'recharts';
import { ArrowLeft, PieChart as ChartIcon, List as ListIcon, Sun, Moon, TrendingUp } from 'lucide-react';

// Import tema & gaya
import { colors, styles } from "./constants/theme";

// Import Komponen Modular
import HistoryView from "./components/HistoryView";
import LobbyView from "./components/LobbyView";
import AnalyticsView from "./components/AnalyticsView";
import TransactionTable from "./components/TransactionTable";
import TransactionForm from "./components/TransactionForm";
import WalletHeader from "./components/WalletHeader";
import WalletDashboard from "./components/WalletDashboard";
import ReportFilters from "./components/ReportFilters";
import AuthView from "./components/AuthView";
import { LogOut } from 'lucide-react';
import WelcomeView from "./components/WelcomeView";

// 🎨 PALET WARNA BRANKAS PUSAT (Sekarang Dinamis)



export default function App() {
  document.title = "Do-Wa-llets";

  // Auth & Navigation State
  const [session, setSession] = useState(null);
  const [appMode, setAppMode] = useState("welcome"); // welcome | guest | member

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setAppMode("member");
        handleSpecialClaim(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setAppMode("member");
        handleSpecialClaim(session.user);
      } else {
        setAppMode("welcome");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // FITUR KLAIM SPESIAL FOR frodowawa
  const handleSpecialClaim = async (user) => {
    const specialUsername = "frodowawa@app.com";
    if (user.email === specialUsername) {
      // Klaim dompet lama yang belum ada pemiliknya (antisipasi casing)
      const targets = ["dompetfrodo", "dompetwawa", "DOMPETFRODO", "DOMPETWAWA"];
      await supabase.from("pengeluaran").update({ user_id: user.id }).in("kode_grup", targets).is("user_id", null);
      await supabase.from("tabungan").update({ user_id: user.id }).in("kode_grup", targets).is("user_id", null);
      fetchDaftarDompet();
    }
  };

  const onChooseGuest = () => setAppMode("guest");
  const onChooseLogin = () => setAppMode("auth");

  // LOGIKA DARK MODE
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleThemeButton = (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{ ...styles.btnSecondary, display: 'flex', alignItems: 'center', gap: '8px', padding: '10px' }}
        title="Ganti Mode"
      >
        {isDarkMode ? <Sun size={18} color={colors.warning} /> : <Moon size={18} color={colors.blue} />}
      </button>
      {appMode === 'member' && session && (
        <button
          onClick={() => supabase.auth.signOut()}
          style={{ ...styles.btnSecondary, display: 'flex', alignItems: 'center', gap: '8px', padding: '10px' }}
          title="Keluar"
        >
          <LogOut size={18} color={colors.danger} />
        </button>
      )}
    </div>
  );



  const [pengeluaran, setPengeluaran] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [kodeDompet, setKodeDompet] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const [riwayatData, setRiwayatData] = useState([]);
  const [dailySummaries, setDailySummaries] = useState({}); // State baru untuk optimasi

  const [daftarDompet, setDaftarDompet] = useState([]);



  // State agregasi untuk top cards
  const [totals, setTotals] = useState({
    modalTerdaftar: 0,
    totalPemasukan: 0,
    totalPengeluaran: 0,
    tabunganTerkunci: 0
  });

  const [keuangan, setKeuangan] = useState({
    modal_awal: 0,
    tabungan_bulan_ini: 0,
    total_tabungan_semua: 0,
    bulan_aktif: ""
  });

  const [inputModal, setInputModal] = useState("");

  const [form, setForm] = useState({
    keterangan: "",
    nominal: "",
    tanggal: new Date().toISOString().slice(0, 10),
    jenis: "pengeluaran",
    kategori: ""
  });


  const [filterCetak, setFilterCetak] = useState("semua");
  const [pilihanTgl, setPilihanTgl] = useState(new Date().toISOString().slice(0, 10));
  const [pilihanBln, setPilihanBln] = useState(new Date().toISOString().slice(0, 7));
  const [pilihanThn, setPilihanThn] = useState(new Date().getFullYear().toString());

  // --- LOGIKA OPTIMASI (Pre-Calculation) ---
  const updateDailyAggregates = (data) => {
    if (!data) return;
    const summaries = data.reduce((acc, curr) => {
      const date = curr.tanggal;
      if (!acc[date]) acc[date] = { income: 0, outcome: 0, saved: 0, balance: 0 };

      const nominal = parseFloat(curr.nominal) || 0;
      if (curr.jenis === "pemasukan") acc[date].income += nominal;
      else if (curr.jenis === "pengeluaran") acc[date].outcome += nominal;
      else if (curr.jenis === "tarik_tabungan") acc[date].saved += nominal;

      acc[date].balance = acc[date].income - (acc[date].outcome + acc[date].saved);
      return acc;
    }, {});
    setDailySummaries(summaries);
  };

  // Format data untuk Grafik Tren (LineChart)
  const getTrendData = () => {
    return Object.keys(dailySummaries)
      .sort((a, b) => a.localeCompare(b)) // Urutkan tanggal
      .map(date => ({
        name: date.split("-").slice(2).join("/") + "/" + date.split("-")[1], // Format DD/MM
        masuk: dailySummaries[date].income,
        keluar: dailySummaries[date].outcome + dailySummaries[date].saved, // Total arus keluar
      }));
  };

  // --- LOGIKA ASLI ---

  const fetchDaftarDompet = async () => {
    if (appMode === "welcome" || appMode === "auth") return;
    
    // Logika Filter Hybrid
    let queryPengeluaran = supabase.from("pengeluaran").select("kode_grup, nominal, jenis, tanggal");
    let queryTabungan = supabase.from("tabungan").select("*");

    if (appMode === "member" && session) {
      queryPengeluaran = queryPengeluaran.eq("user_id", session.user.id);
      queryTabungan = queryTabungan.eq("user_id", session.user.id);
    } else {
      queryPengeluaran = queryPengeluaran.is("user_id", null);
      queryTabungan = queryTabungan.is("user_id", null);
    }

    const { data: dataPengeluaran } = await queryPengeluaran;
    const { data: dataTabungan } = await queryTabungan;

    if (dataPengeluaran) {
      const bulanSekarang = new Date().toISOString().slice(0, 7);
      const uniqueWallets = [...new Set(dataPengeluaran.map(item => item.kode_grup))].filter(Boolean);

      let hitungModalTerdaftar = 0;
      let hitungTotalPemasukan = 0;
      let hitungTotalPengeluaran = 0;
      let hitungTabunganTerkunci = 0;

      // 1. FILTER DATA UNTUK DASHBOARD (BULAN INI)
      const listLengkap = uniqueWallets.map(namaDompet => {
        const dataTab = dataTabungan?.find(t => t.kode_grup === namaDompet);
        const pengeluaranDompet = dataPengeluaran.filter(p => p.kode_grup === namaDompet && p.tanggal.startsWith(bulanSekarang));

        const totalPemasukan = pengeluaranDompet.filter(p => p.jenis === "pemasukan").reduce((acc, c) => acc + parseFloat(c.nominal), 0);
        const totalPengeluaran = pengeluaranDompet.filter(p => p.jenis === "pengeluaran").reduce((acc, c) => acc + parseFloat(c.nominal), 0);

        const modal = dataTab ? parseFloat(dataTab.modal_awal) : 0;
        const tabunganBulanIni = dataTab ? parseFloat(dataTab.tabungan_bulan_ini) : 0;
        const totalSemua = dataTab ? parseFloat(dataTab.total_tabungan_semua) : 0;

        const sisaUang = modal + totalPemasukan - totalPengeluaran;

        hitungModalTerdaftar += modal;
        hitungTotalPemasukan += totalPemasukan;
        hitungTotalPengeluaran += totalPengeluaran;

        return {
          nama: namaDompet,
          modalAwal: modal,
          pemasukan: totalPemasukan,
          pengeluaran: totalPengeluaran,
          sisaUang: sisaUang,
        };
      });

      // 2. HITUNG TOTAL TABUNGAN TERKUNCI (GLOBAL)
      dataTabungan?.forEach(t => {
        hitungTabunganTerkunci += (parseFloat(t.tabungan_bulan_ini) + parseFloat(t.total_tabungan_semua));
      });

      // 3. LOGIKA AGREGASI RIWAYAT (PER BULAN)
      const grupRiwayat = dataPengeluaran.reduce((acc, curr) => {
        const bulan = curr.tanggal.slice(0, 7);
        if (!acc[bulan]) acc[bulan] = { bulan, pemasukan: 0, pengeluaran: 0, tabungan: 0 };

        if (curr.jenis === "pemasukan") acc[bulan].pemasukan += parseFloat(curr.nominal);
        else if (curr.jenis === "pengeluaran") acc[bulan].pengeluaran += parseFloat(curr.nominal);
        else if (curr.jenis === "tarik_tabungan") acc[bulan].tabungan += parseFloat(curr.nominal);

        return acc;
      }, {});

      setDaftarDompet(listLengkap);
      setRiwayatData(Object.values(grupRiwayat).sort((a, b) => b.bulan.localeCompare(a.bulan)));
      setTotals({
        modalTerdaftar: hitungModalTerdaftar,
        totalPemasukan: hitungTotalPemasukan,
        totalPengeluaran: hitungTotalPengeluaran,
        tabunganTerkunci: hitungTabunganTerkunci
      });
    }
  };


  const fetchKeuanganDompet = async () => {
    if (!kodeDompet) return;
    let query = supabase.from("tabungan").select("*").eq("kode_grup", kodeDompet.toLowerCase());
    
    if (appMode === "member" && session) {
      query = query.eq("user_id", session.user.id);
    } else {
      query = query.is("user_id", null);
    }

    const { data, error } = await query.single();

    if (!error && data) {
      setKeuangan({
        modal_awal: parseFloat(data.modal_awal),
        tabungan_bulan_ini: parseFloat(data.tabungan_bulan_ini),
        total_tabungan_semua: parseFloat(data.total_tabungan_semua),
        bulan_aktif: data.bulan_aktif
      });
    } else {
      setKeuangan({ modal_awal: 0, tabungan_bulan_ini: 0, total_tabungan_semua: 0, bulan_aktif: "" });
    }
  };

  const checkAndSweepMonthlyData = async () => {
    if (!kodeDompet) return;
    const bulanSekarang = new Date().toISOString().slice(0, 7);

    let queryBulan = supabase.from("tabungan").select("*").eq("kode_grup", kodeDompet.toLowerCase());
    if (appMode === "member" && session) {
      queryBulan = queryBulan.eq("user_id", session.user.id);
    } else {
      queryBulan = queryBulan.is("user_id", null);
    }

    const { data: dataKeuangan } = await queryBulan.single();

    if (dataKeuangan && dataKeuangan.bulan_aktif && dataKeuangan.bulan_aktif !== bulanSekarang) {
      let queryTrans = supabase.from("pengeluaran").select("*").eq("kode_grup", kodeDompet.toLowerCase());
      if (appMode === "member" && session) {
        queryTrans = queryTrans.eq("user_id", session.user.id);
      } else {
        queryTrans = queryTrans.is("user_id", null);
      }
      
      const { data: semuaTransaksi } = await queryTrans;

      // Sekarang kita hanya mengambil transaksi yang tipenya "tarik_tabungan"
      const totalYangDiSaved = semuaTransaksi
        .filter(p => p.jenis === "tarik_tabungan")
        .reduce((acc, c) => acc + parseFloat(c.nominal), 0);

      // Sisa uang bulan lalu (untuk modal bulan baru) tetap dihitung utuh
      const totalPemasukan = semuaTransaksi.filter(p => p.jenis === "pemasukan").reduce((acc, c) => acc + parseFloat(c.nominal), 0);
      const totalPengeluaran = semuaTransaksi.filter(p => p.jenis !== "pemasukan").reduce((acc, c) => acc + parseFloat(c.nominal), 0);
      const sisaUangBulanLalu = parseFloat(dataKeuangan.modal_awal) + totalPemasukan - totalPengeluaran;

      // Tabungan permanen hanya bertambah dari yang kamu "Saved" saja
      const totalTabunganBaru = parseFloat(dataKeuangan.total_tabungan_semua) + totalYangDiSaved;

      await supabase
        .from("tabungan")
        .update({
          modal_awal: sisaUangBulanLalu, // Sisa uang bulan lalu otomatis jadi modal sekarang
          tabungan_bulan_ini: totalYangDiSaved, // Menampilkan berapa yang berhasil ditabung bulan lalu
          total_tabungan_semua: totalTabunganBaru,
          bulan_aktif: bulanSekarang
        })
        .eq("kode_grup", kodeDompet.toLowerCase());

      alert(`📅 Bulan Baru (${bulanSekarang})! Saldo yang kamu "Saved" sebesar Rp ${totalYangDiSaved.toLocaleString("id-ID")} telah masuk ke Brankas Permanen. Sisa saldo lainnya otomatis jadi modal awal baru.`);
      fetchKeuanganDompet();
    }
  };

  const handleSetModal = async () => {
    if (!inputModal || isNaN(inputModal)) return alert("Masukkan angka nominal modal yang valid!");
    const bulanSekarang = new Date().toISOString().slice(0, 7);
    setLoading(true);

    let queryAda = supabase.from("tabungan").select("*").eq("kode_grup", kodeDompet.toLowerCase());
    if (appMode === "member" && session) {
      queryAda = queryAda.eq("user_id", session.user.id);
    } else {
      queryAda = queryAda.is("user_id", null);
    }

    const { data: adaData } = await queryAda.single();

    if (adaData) {
      let updateQuery = supabase.from("tabungan").update({ modal_awal: parseFloat(inputModal), bulan_aktif: bulanSekarang }).eq("kode_grup", kodeDompet.toLowerCase());
      if (appMode === "member" && session) {
        updateQuery = updateQuery.eq("user_id", session.user.id);
      } else {
        updateQuery = updateQuery.is("user_id", null);
      }
      await updateQuery;
    } else {
      const payload = { 
        kode_grup: kodeDompet.toLowerCase(), 
        modal_awal: parseFloat(inputModal), 
        bulan_aktif: bulanSekarang,
        user_id: (appMode === "member" && session) ? session.user.id : null
      };
      await supabase.from("tabungan").insert([payload]);
    }

    setLoading(false);
    setInputModal("");
    alert("Modal awal bulan ini berhasil diatur!");
    fetchKeuanganDompet();
    fetchDaftarDompet();
  };

  const fetchData = async () => {
    if (!kodeDompet) return;
    let queryFetch = supabase.from("pengeluaran").select("*").eq("kode_grup", kodeDompet.toLowerCase());
    
    if (appMode === "member" && session) {
      queryFetch = queryFetch.eq("user_id", session.user.id);
    } else {
      queryFetch = queryFetch.is("user_id", null);
    }

    const { data, error } = await queryFetch
      // Pertama, urutkan tanggal terbaru di atas
      .order("tanggal", { ascending: false })
      // Kedua, jika tanggal sama, urutkan input terbaru (ID terbesar) di atas
      .order("id", { ascending: false });

    if (error) {
      console.error(error.message);
      alert("Gagal mengambil data: " + error.message);
    } else {
      setPengeluaran(data);
      updateDailyAggregates(data); // Update rangkuman harian
    }

  };

  useEffect(() => { 
    if (appMode === "guest" || (appMode === "member" && session)) {
      fetchDaftarDompet(); 
    }
  }, [appMode, session]);

  useEffect(() => {
    if (isJoined) {
      fetchData();
      fetchKeuanganDompet();
      checkAndSweepMonthlyData();
    }
  }, [isJoined]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!kodeDompet.trim()) return alert("Masukkan kode dompet dulu!");
    setIsJoined(true);
  };

  const handleEditWalletName = async () => {
    const namaBaru = window.prompt(`Ubah nama dompet #${kodeDompet} menjadi:`, kodeDompet);
    if (namaBaru && namaBaru.trim() !== "" && namaBaru.toLowerCase() !== kodeDompet.toLowerCase()) {
      const fixNamaBaru = namaBaru.trim().toLowerCase();
      setLoading(true);
      let up1 = supabase.from("pengeluaran").update({ kode_grup: fixNamaBaru }).eq("kode_grup", kodeDompet.toLowerCase());
      let up2 = supabase.from("tabungan").update({ kode_grup: fixNamaBaru }).eq("kode_grup", kodeDompet.toLowerCase());
      
      if (appMode === "member" && session) {
        up1 = up1.eq("user_id", session.user.id);
        up2 = up2.eq("user_id", session.user.id);
      } else {
        up1 = up1.is("user_id", null);
        up2 = up2.is("user_id", null);
      }

      await up1;
      await up2;
      setLoading(false);
      alert(`Nama dompet berhasil diubah menjadi #${fixNamaBaru}!`);
      setKodeDompet(fixNamaBaru);
      fetchDaftarDompet();
    }
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setForm({ keterangan: item.keterangan, nominal: item.nominal, tanggal: item.tanggal, jenis: item.jenis || "pengeluaran", kategori: item.kategori || "lainnya" });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentId(null);
    setForm({ keterangan: "", nominal: "", tanggal: new Date().toISOString().slice(0, 10), jenis: "pengeluaran", kategori: "" });
  };

  const handleDeleteTransaction = async (id) => {
    const confirmation = window.confirm("Apakah kamu yakin ingin menghapus catatan transaksi ini?");
    if (confirmation) {
      setLoading(true);
      let queryDel = supabase.from("pengeluaran").delete().eq("id", id);
      if (appMode === "member" && session) {
        queryDel = queryDel.eq("user_id", session.user.id);
      } else {
        queryDel = queryDel.is("user_id", null);
      }
      await queryDel;
      setLoading(false);
      alert("Catatan berhasil dihapus!");
      fetchData();
      fetchDaftarDompet();
    }
  };

  const handleDeleteWallet = async () => {
    const confirmation = window.confirm(`Apakah kamu yakin ingin menghapus DOMPET #${kodeDompet.toLowerCase()}?`);
    if (confirmation) {
      setLoading(true);
      let d1 = supabase.from("pengeluaran").delete().eq("kode_grup", kodeDompet.toLowerCase());
      let d2 = supabase.from("tabungan").delete().eq("kode_grup", kodeDompet.toLowerCase());
      
      if (appMode === "member" && session) {
        d1 = d1.eq("user_id", session.user.id);
        d2 = d2.eq("user_id", session.user.id);
      } else {
        d1 = d1.is("user_id", null);
        d2 = d2.is("user_id", null);
      }

      await d1;
      await d2;
      setLoading(false);
      alert("Dompet dan Tabungan berhasil dihapus!");
      setPengeluaran([]);
      setDailySummaries({}); // Reset rangkuman harian
      setIsJoined(false);
      setKodeDompet("");
      fetchDaftarDompet();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.keterangan || !form.nominal || !form.kategori) return alert("Isi semua data termasuk kategori dulu ya!");
    setLoading(true);

    if (isEditing) {
      let queryUp = supabase
        .from("pengeluaran")
        .update({ keterangan: form.keterangan, nominal: parseFloat(form.nominal), tanggal: form.tanggal, jenis: form.jenis, kategori: form.kategori })
        .eq('id', currentId);
        
      if (appMode === "member" && session) {
        queryUp = queryUp.eq("user_id", session.user.id);
      } else {
        queryUp = queryUp.is("user_id", null);
      }
      
      const { error } = await queryUp;

      if (error) {
        alert("Gagal Update: " + error.message);
      } else {
        handleCancelEdit();
      }
    } else {
      const { error } = await supabase.from("pengeluaran").insert([{ 
        keterangan: form.keterangan, 
        nominal: parseFloat(form.nominal), 
        tanggal: form.tanggal, 
        kode_grup: kodeDompet.toLowerCase(), 
        jenis: form.jenis, 
        kategori: form.kategori,
        user_id: (appMode === "member" && session) ? session.user.id : null 
      }]);

      if (error) {
        alert("Gagal Simpan: " + error.message);
      } else {
        setForm({ ...form, keterangan: "", nominal: "", jenis: "pengeluaran", kategori: "" });
      }
    }



    setLoading(false);
    fetchData();
    fetchDaftarDompet();
  };

  const handleCetak = () => {
    const dataDisaring = pengeluaran.filter(item => {
      if (filterCetak === "harian") return item.tanggal === pilihanTgl;
      if (filterCetak === "bulanan") return item.tanggal.startsWith(pilihanBln);
      if (filterCetak === "tahunan") return item.tanggal.startsWith(pilihanThn);
      return true;
    });

    const labelPeriode = filterCetak === "harian" ? pilihanTgl : (filterCetak === "bulanan" ? pilihanBln : (filterCetak === "tahunan" ? pilihanThn : "Semua"));

    // Perhitungan Terpisah
    const tlnPemasukan = dataDisaring.filter(p => p.jenis === "pemasukan").reduce((acc, curr) => acc + parseFloat(curr.nominal), 0);
    const tlnPengeluaran = dataDisaring.filter(p => p.jenis === "pengeluaran").reduce((acc, curr) => acc + parseFloat(curr.nominal), 0);
    const tlnSaved = dataDisaring.filter(p => p.jenis === "tarik_tabungan").reduce((acc, curr) => acc + parseFloat(curr.nominal), 0);

    const cetakWindow = window.open("", "_blank");


    cetakWindow.document.write(`
      <html>
        <head>
          <title>Laporan Arus Kas - ${kodeDompet}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #f4f4f4; }
            .header { text-align: center; margin-bottom: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Laporan Arus Kas: ${kodeDompet.toUpperCase()}</h2>
            <p>Periode laporan: <b>${labelPeriode}</b> (Dicetak pada: ${new Date().toISOString().slice(0, 10)})</p>

          </div>
          <table>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Kategori</th>
                <th>Keterangan</th>
                <th>Nominal</th>
              </tr>
            </thead>
            <tbody>
              ${dataDisaring.map(item => `
                <tr>
                  <td>${item.tanggal}</td>
                  <td>${item.kategori || "lainnya"}</td>
                  <td>${item.keterangan}</td>
                  <td>Rp ${parseFloat(item.nominal).toLocaleString("id-ID")}</td>
                </tr>

              `).join("")}
            </tbody>
                        <tfoot style="background-color: #f8fafc; font-weight: bold;">
              <tr>
                <td colspan="3" style="text-align: right; color: #10B981;">TOTAL PEMASUKAN (+):</td>
                <td style="color: #10B981;">Rp ${tlnPemasukan.toLocaleString("id-ID")}</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right; color: #EF4444;">TOTAL PENGELUARAN (-):</td>
                <td style="color: #EF4444;">Rp ${tlnPengeluaran.toLocaleString("id-ID")}</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right; color: #3B82F6;">TOTAL TABUNGAN (🔒):</td>
                <td style="color: #3B82F6;">Rp ${tlnSaved.toLocaleString("id-ID")}</td>
              </tr>
              <tr style="background-color: #f1f5f9; font-size: 1.1em;">
                <td colspan="3" style="text-align: right;">SALDO AKHIR PERIODE:</td>
                <td>Rp ${(tlnPemasukan - tlnPengeluaran - tlnSaved).toLocaleString("id-ID")}</td>
              </tr>
            </tfoot>

          </table>
          <script>window.print();</script>

        </body>
      </html>
    `);
    cetakWindow.document.close();
  };

  const totalPemasukanAktif = pengeluaran

    .filter(item => item.jenis === "pemasukan")
    .reduce((acc, curr) => acc + parseFloat(curr.nominal), 0);
  const totalPengeluaranAktif = pengeluaran
    .filter(item => item.jenis === "pengeluaran" || item.jenis === "tarik_tabungan")
    .reduce((acc, curr) => acc + parseFloat(curr.nominal), 0);
  const sisaUangAktif = keuangan.modal_awal + totalPemasukanAktif - totalPengeluaranAktif;

  // --- RENDERING VIEWS (STATE MACHINE) ---
  
  // 1. WELCOME SCREEN
  if (appMode === "welcome" && !session) {
    return <WelcomeView onChooseGuest={onChooseGuest} onChooseLogin={onChooseLogin} />;
  }

  // 2. AUTH VIEW (LOGIN SCREEN)
  if (appMode === "auth" && !session) {
    return <AuthView setSession={setSession} onBack={() => setAppMode("welcome")} />;
  }

  // 3. MAIN APP (GUEST OR MEMBER)
  
  // TAMPILAN 0.1: HALAMAN RIWAYAT
  if (isHistory) return <HistoryView setIsHistory={setIsHistory} riwayatData={riwayatData} totals={totals} />;

  // TAMPILAN 1: BRANKAS PUSAT (LOBBY BARU)
  if (!isJoined) {
    return (
      <LobbyView
        toggleThemeButton={toggleThemeButton}
        totals={totals}
        handleJoin={handleJoin}
        kodeDompet={kodeDompet}
        setKodeDompet={setKodeDompet}
        setIsHistory={setIsHistory}
        daftarDompet={daftarDompet}
        setIsJoined={setIsJoined}
        appMode={appMode}
        onChooseLogin={onChooseLogin}
      />
    );
  }

  // TAMPILAN 2: HALAMAN PENCATATAN DOMPET (Sama seperti sebelumnya, diselaraskan palet warnanya)
  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.fullContainer} className="mobile-p-10">
        <WalletHeader
          isAnalyzing={isAnalyzing}
          setIsAnalyzing={setIsAnalyzing}
          kodeDompet={kodeDompet}
          handleEditWalletName={handleEditWalletName}
          setIsJoined={setIsJoined}
          setPengeluaran={setPengeluaran}
          fetchDaftarDompet={fetchDaftarDompet}
          handleDeleteWallet={handleDeleteWallet}
          toggleThemeButton={toggleThemeButton}
        />

        {/* METRICS DASHBOARD */}
        <WalletDashboard
          inputModal={inputModal}
          setInputModal={setInputModal}
          handleSetModal={handleSetModal}
          keuangan={keuangan}
          sisaUangAktif={sisaUangAktif}
        />

        {/* HALAMAN ANALISIS GRAFIK */}
        {isAnalyzing && (
          <AnalyticsView
            setIsAnalyzing={setIsAnalyzing}
            totalPengeluaranAktif={totalPengeluaranAktif}
            pengeluaran={pengeluaran}
            getTrendData={getTrendData}
          />
        )}

        {/* SEMBUNYIKAN FORM & TABEL JIKA SEDANG ANALISIS */}
        {!isAnalyzing && (
          <>
            {/* FORM INPUT */}
            <TransactionForm
              handleSubmit={handleSubmit}
              form={form}
              setForm={setForm}
              loading={loading}
              isEditing={isEditing}
              handleCancelEdit={handleCancelEdit}
            />

            <ReportFilters
              filterCetak={filterCetak}
              setFilterCetak={setFilterCetak}
              pilihanTgl={pilihanTgl}
              setPilihanTgl={setPilihanTgl}
              pilihanBln={pilihanBln}
              setPilihanBln={setPilihanBln}
              pilihanThn={pilihanThn}
              setPilihanThn={setPilihanThn}
              handlePrint={handleCetak}
            />


            {/* TABEL TRANSAKSI */}
            <div style={{ ...styles.whiteCard, padding: '20px' }}>

              <div style={styles.tableResponsive}>
                {/* DAFTAR TRANSAKSI */}
                <TransactionTable
                  pengeluaran={pengeluaran}
                  dailySummaries={dailySummaries}
                  totalPemasukanAktif={totalPemasukanAktif}
                  totalPengeluaranAktif={totalPengeluaranAktif}
                  handleEditClick={handleEditClick}
                  handleDeleteTransaction={handleDeleteTransaction}
                />
              </div>
            </div>

          </>
        )}
      </div>
      {/* Footer / Version Marker */}
      <div style={{ textAlign: 'center', padding: '20px', color: colors.textMuted, fontSize: '0.8rem', opacity: 0.6 }}>
        Do-Wa-llets v1.1 - Validated System
      </div>
    </div>
  );
}


// 🎨 FINTECH STYLES SYSTEM (FULL WINDOW & MOBILE RESPONSIVE)
