# 📑 UAS Pemrograman Berbasis Web (Frontend) - Kelompok 8
## ✨ GlowSpace - Aplikasi CRUD Manajemen Antrean Salon

Aplikasi GlowSpace dibangun menggunakan ekosistem modern **React (Vite)** untuk memenuhi kriteria penilaian Ujian Akhir Semester (UAS) pada program studi Sistem Informasi (Kelas SI-IV-A). Seluruh pengelolaan data dioperasikan secara dinamis di sisi klien (*client-side data persistence*).

---

## 👥 Profil Anggota Kelompok 8
Berikut adalah daftar penanggung jawab proyek aplikasi GlowSpace:

1. **Muhammad Mulky Khoiruddin Farrij** - 240160221026
2. **Faatin Ashri Widiatin** - 240160221011
3. **Nadya Zahra Aulia** - 2401602211030

---

## 📝 Tema & Deskripsi Aplikasi
**GlowSpace Management App** adalah platform berbasis web yang dirancang khusus untuk membantu kasir atau admin salon kecantikan dalam mendata, melacak, dan memperbarui antrean *treatment* pelanggan secara praktis. 

### 🚀 Fitur Utama & Logika Teknis:
1. **Create (Tambah Data):** Menyediakan formulir khusus untuk mendaftarkan nama pelanggan dan memilah jenis layanan salon. Kolom harga akan terisi secara otomatis dan dikunci (*read-only*) berdasarkan pemetaan data untuk meminimalisasi kesalahan input manual.
2. **Read (Tampilkan Data):** Menampilkan seluruh manifest antrean pelanggan dalam bentuk kartu (*cards*) informasi yang rapi, lengkap dengan label waktu otomatis saat data dibuat.
3. **Update (Pembaruan Fleksibel):** * *Status Toggle (Minimal):* Mengubah status pengerjaan secara instan dengan satu klik (*"Tandai Selesai"* / *"Batalkan Selesai"*). Warna kartu dan indikator *badge* akan ikut berubah dinamis.
   * *Full Edit:* Memuat ulang data lama ke dalam form utama agar admin dapat mengubah nama atau mengganti jenis *treatment* secara menyeluruh.
4. **Delete (Hapus Permanen):** Menghapus data dari manifest antrean pelanggan dengan proteksi umpan balik berupa dialog konfirmasi (`window.confirm()`) sebelum pembersihan permanen dilakukan.
5. **Real-time Search & Filter:** Memfilter data antrean berdasarkan kategori status (*Semua*, *Menunggu*, *Selesai*) serta kolom pencarian nama pelanggan secara langsung tanpa *reload* halaman.
6. **Data Persistence:** Memanfaatkan React Hooks (`useState` & `useEffect`) untuk menyinkronkan memori aplikasi ke `localStorage` peramban, sehingga data tidak akan hilang saat browser disegarkan (*refresh*) atau ditutup.

---

## 🗃️ Struktur Objek Data (Data Structure)
Setiap entri transaksi atau antrean di dalam aplikasi dipetakan menggunakan struktur 
data objek dengan format berikut:

```json
{
  "id": "1719463200000",
  "customerName": "Fatin",
  "serviceName": "Coloring / Hair Dye",
  "price": 250000,
  "isCompleted": false,
  "bookingDate": "27/06/2026, 11.16.28 WIB"
}

## Link Aplikasi : https://glamour-fnhba7yb1-kelompok-8salon.vercel.app/
