# Dokumentasi Perubahan: Penyamaan Format Report

## Tujuan
Menyamakan format output laporan (`/reports`) dengan tampilan tabel di halaman Data Management agar setiap ruangan hanya tampil sebagai satu entitas utama.

Perubahan ini dibuat untuk:
- menghindari satu ruangan muncul menjadi beberapa baris terpisah karena unit `DP-1` dan `DP-2`
- mengurangi beban resource saat generate report
- membuat laporan lebih mudah dibaca dan lebih konsisten dengan format Data Management

## File yang Diubah
- `components/reports/ReportGenerator.tsx`

## Ringkasan Perubahan
1. Logika `groupReadings()` ditambahkan/diubah di `ReportGenerator.tsx`.
   - Unit sensor dengan nama seperti `Buffer 3 DP-1`, `Buffer 3 - DP 1`, `Buffer 3 DP-2`, atau `Buffer 3 - DP 2` sekarang diubah menjadi `Buffer 3`.
   - Pengelompokan dilakukan berdasarkan kombinasi `timestampValue` + `baseUnit`.
   - Nilai `Differential Pressure` dari sub-unit `DP-1` disimpan ke `dp1`.
   - Nilai `Differential Pressure` dari sub-unit `DP-2` disimpan ke `dp2`.
   - Data suhu (`temperature`) dan kelembapan (`relative_humidity`) tetap disimpan di entry utama.

2. Hasil pengelompokan digunakan untuk menampilkan baris yang lebih ringkas di PDF report.
   - Jika baris data berisi `dp1` dan/atau `dp2`, kolom `Differential Pressure 1 (Pa)` dan `Differential Pressure 2 (Pa)` ditampilkan.
   - Jika hanya ada satu DP tanpa sub-unit, nilai tetap ditampilkan di kolom `Differential Pressure 1 (Pa)`.

## Dampak
- Satu ruangan seperti `Buffer 3` tidak lagi terpecah menjadi entri `Buffer 3 DP-1` dan `Buffer 3 DP-2` di output report.
- Laporan menjadi lebih efisien dan lebih mudah dianalisa.
- Format header PDF dibuat konsisten dengan tampilan manajemen data.

## Verifikasi
- Buka halaman `/reports` dan generate report untuk ruangan yang memiliki unit `DP-1`/`DP-2`.
- Pastikan data yang tampil di PDF hanya memiliki satu baris per timestamp per ruangan utama.
- Pastikan kolom `Differential Pressure 1 (Pa)` dan `Differential Pressure 2 (Pa)` tampil dengan benar.
