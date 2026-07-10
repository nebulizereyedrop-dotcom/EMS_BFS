"use client";
import React, { useMemo } from 'react';
import { Joyride, Step } from 'react-joyride';
import { usePathname, useRouter } from 'next/navigation';
import { useTutorial } from '@/contexts/TutorialContext';
import { useTheme } from 'next-themes';
import next from 'next';

const JoyrideComponent = Joyride as any;

const CustomBeacon = React.forwardRef<HTMLSpanElement, any>((props, ref) => {
  // We extract out the non-DOM props injected by react-joyride
  const { continuous, index, isLastStep, size, step, ...domProps } = props;

  return (
    <span
      {...domProps}
      ref={ref}
      className="relative flex items-center justify-center group outline-none"
    >
      {/* Outer Pulse/Ping */}
      <span className="absolute w-8 h-8 bg-blue-500 rounded-full animate-ping opacity-75"></span>
      {/* Inner Dot */}
      <span className="relative z-10 w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-md transition-transform transform hover:scale-110"></span>
      {/* Text Popup */}
      <span className="absolute left-10 whitespace-nowrap bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl pointer-events-none animate-bounce">
        Klik untuk memulai
      </span>
    </span>
  );
});
CustomBeacon.displayName = "CustomBeacon";

export default function TutorialComponent() {
  const pathname = usePathname();
  const router = useRouter();
  const { status: tutorialStatus, stopTutorial, pauseTutorial, resumeTutorial } = useTutorial();
  const { theme } = useTheme();

  // Automatically resume the tutorial on the new page after navigation
  React.useEffect(() => {
    if (tutorialStatus === 'paused') {
      const timer = setTimeout(() => {
        resumeTutorial();
      }, 700); // 700ms delay to allow Next.js route transition and render
      return () => clearTimeout(timer);
    }
  }, [pathname, tutorialStatus, resumeTutorial]);

  const steps = useMemo<Step[]>(() => {
    switch (pathname) {
      case '/':
        return [
          {
            target: 'h1',
            content: 'Selamat datang di Dasbor Sistem! Anda dapat memantau seluruh ruangan secara realtime di sini.',
            disableBeacon: true,
          },
          {
            target: '#dashboard-room-filter',
            content: 'Gunakan filter ini untuk menyaring tampilan kartu ruangan berdasarkan kelompoknya.',
            placement: 'bottom',
          },
          {
            target: '#dashboard-kpi-summary',
            content: 'Bagian ini menampilkan ringkasan Status Sistem, unit aktif, dan peringatan (anomali) yang sedang terjadi.',
          },
          {
            target: '#dashboard-realtime-grid',
            content: 'Di sini Anda dapat melihat data sensor (Suhu, Kelembapan, dan Tekanan) untuk setiap ruangan secara langsung.',
          },
          {
            target: '#sidebar',
            content: 'Di sinilah Anda dapat menavigasi ke halaman lain.',
            placement: 'right',
          },
          {
            target: '#DataManagementMenu',
            content: 'Klik di sini untuk melanjutkan ke halaman Manajemen Data.',
            placement: 'right',
            locale: { last: 'Lanjut ke Manajemen Data' }
          }
        ];
      case '/data-management':
        return [
          {
            target: '#room-list-filter',
            content: 'Gunakan filter ruangan untuk menentukan ruangan yang ingin diambil datanya',
            placement: 'right',
          },
          {
            target: '#start-date',
            content: 'Gunakan filter tanggal awal untuk menentukan data yang ingin diambil datanya',
            placement: 'right',
          },
          {
            target: '#end-date',
            content: 'Gunakan filter tanggal akhir untuk menentukan data yang ingin diambil datanya',
            placement: 'right',
          },
          {
            target: '#interval-filter',
            content: 'Gunakan interval data ini untuk menentukan interval waktu dari data yang ingin diambil',
            placement: 'right',
          },
          {
            target: '#fetch-data-button',
            content: 'Setelah semua filter terisi, klik tombol ini untuk mengambil data',
            placement: 'right',
          },
          {
            target: '#table-data',
            content: 'Data hasil pencarian akan ditampilkan pada tabel ini',
            placement: 'top',
          },
          {
            target: "#room-form",
            content: 'Ini adalah form untuk menambahkan ruangan baru',
            placement: 'right',
          },
          {
            target: "#room-name",
            content: 'Isi nama ruangan yang ingin ditambahkan',
            placement: 'right',
          },
          {
            target: "#temp",
            content: 'Isi data sensor untuk Temperature',
            placement: 'right',
          },
          {
            target: "#rh",
            content: 'Isi data sensor untuk Relative Humidity',
            placement: 'right',
          },
          {
            target: "#dp1",
            content: 'Isi data sensor untuk Differential Pressure',
            placement: 'right',
          },
          {
            target: "#add-new-parameter",
            content: 'Klik tombol ini untuk menambahkan parameter baru',
            placement: 'right',
          },
          {
            target: "#line",
            content: 'Gunakan filter line untuk menentukan line yang ingin ditambahkan',
            placement: 'right',
          },
          {
            target: "#room-status",
            content: 'Pilih status tag (Aktif / non-Aktif) untuk ruangan yang ingin ditambahkan',
            placement: 'right',
          },
          {
            target: "#submit",
            content: 'Klik tombol ini untuk mulai menambahkan data ruangan',
            placement: 'right',
          },
          {
            target: '#exclusion-form',
            content: 'Dan disini adalah form untuk mengecualikan data Fumigasi maupun PM',
            placement: 'right',
          },
          {
            target: '#room-list',
            content: 'Gunakan filter ruangan untuk menentukan ruangan yang ingin dikecualikan',
            placement: 'right',
          },
          {
            target: "#keterangan-list",
            content: 'Pilih tipe pengecualian',
            placement: 'right',
          },
          {
            target: "#datepicker",
            content: 'Pilih tanggal dan waktu pengecualian',
            placement: 'right',
          },
          {
            target: "#alasan",
            content: 'Isi alasan pengecualian',
            placement: 'right',
          },
          {
            target: "#exclusion-status",
            content: 'Pilih status tag pengecualian',
            placement: 'right',
          },
          {
            target: '#exclude-submit',
            content: 'Klik tombol ini untuk mulai memindahkan data ke tabel pengecualian',
            placement: 'right',
          },
          {
            target: '#exclusion-list',
            content: 'Daftar semua pengecualian data (seperti Fumigasi/PM) yang sedang aktif akan muncul di sini. Anda juga dapat menghapusnya jika terjadi kesalahan.',
            placement: 'right',
          },
          {
            target: '#ReportsMenu',
            content: 'Klik di sini untuk melanjutkan ke halaman Laporan.',
            placement: 'right',
            locale: { last: 'Lanjut ke Laporan' }
          },
        ];
      case '/reports':
        return [
          {
            target: 'h1',
            content: 'Halaman Laporan Sistem memungkinkan Anda menarik data riwayat dan mengunduhnya sebagai file PDF.',
            disableBeacon: true,
          },
          {
            target: '#report-room-filter',
            content: 'Pilih ruangan yang ingin Anda tampilkan laporannya',
            placement: 'bottom',
          },
          {
            target: '#report-start-date',
            content: 'Tentukan batas awal waktu data',
            placement: 'bottom',
          },
          {
            target: '#report-end-date',
            content: 'Tentukan batas akhir waktu data',
            placement: 'bottom',
          },
          {
            target: '#report-interval-filter',
            content: 'Pilih interval waktu pembacaan data',
            placement: 'bottom',
          },
          {
            target: '#report-type-filter',
            content: 'Tentukan jenis status data yang akan dimasukkan dalam laporan',
            placement: 'bottom',
          },
          {
            target: '#report-exclude-param',
            content: 'Pilih parameter yang tidak ingin dimasukkan (dikecualikan)',
            placement: 'top',
          },
          {
            target: '#report-pull-data-btn',
            content: 'Klik tombol ini untuk mulai memuat data dari server',
            placement: 'right',
          },
          {
            target: '#report-summary-cards',
            content: 'Total ringkasan data yang berhasil ditarik akan ditampilkan di sini',
            placement: 'top',
          },
          {
            target: '#report-chart-preview',
            content: 'Pratinjau visual berupa grafik data sensor akan muncul di area ini',
            placement: 'top',
          },
          {
            target: '#report-pdf-export',
            content: 'Jika data dan grafik sudah sesuai, klik Download untuk mengekspor ke PDF',
            placement: 'left',
          },
          {
            target: '#EmailAlertsMenu',
            content: 'Klik di sini untuk melanjutkan ke halaman Email Alerts.',
            placement: 'right',
            locale: { last: 'Lanjut ke Email Alerts' }
          }
        ];
      case '/emails':
        return [
          {
            target: 'h1',
            content: 'Pengaturan Email Alert. Kelola daftar penerima email notifikasi ketika sistem mendeteksi adanya anomali.',
            disableBeacon: true,
          },
          {
            target: '#email-alarm-config',
            content: 'Atur durasi interval pengiriman email peringatan agar tidak terjadi spam saat anomali terdeteksi.',
            placement: 'right',
          },
          {
            target: '#email-add-form',
            content: 'Isi formulir ini untuk menambahkan email baru sebagai penerima notifikasi sistem.',
            placement: 'right',
          },
          {
            target: '#email-list-table',
            content: 'Daftar semua email penerima alert akan ditampilkan di sini. Anda juga bisa menghapusnya dari daftar ini.',
            placement: 'left',
          },
          {
            target: '#AuditLogMenu',
            content: 'Klik di sini untuk melanjutkan ke halaman Audit Trail.',
            placement: 'right',
            locale: { last: 'Lanjut ke Audit Trail' }
          }
        ];
      case '/audit-log':
        return [
          {
            target: 'h1',
            content: 'Halaman Audit Trail menyimpan rekam jejak setiap interaksi dan aktivitas pengguna dalam sistem.',
            disableBeacon: true,
          },
          {
            target: '#audit-filter-panel',
            content: 'Anda dapat melakukan filter data berdasarkan periode waktu, jenis aksi, atau modul yang diakses.',
          },
          {
            target: '#audit-log-table',
            content: 'Seluruh riwayat aktivitas beserta detail user, alamat IP, dan waktu kejadian tersimpan pada tabel ini.',
          },
          {
            target: '#tutorial-toggler',
            content: 'Klik di sini untuk mengaktifkan / mengakhiri tutorial.',
            placement: 'right',
            locale: { last: 'Selesai' }
          }
        ];
      default:
        return [
          {
            target: 'body',
            content: 'Fitur tutorial belum tersedia untuk halaman ini.',
            placement: 'center',
          }
        ];
    }
  }, [pathname]);

  const handleJoyrideCallback = (data: any) => {
    const { status, action } = data;
    const finishedStatuses = ['finished', 'skipped'];

    if (finishedStatuses.includes(status) || action === 'close') {
      if (status === 'finished') {
        let nextPage = '';
        if (pathname === '/') nextPage = '/data-management';
        else if (pathname === '/data-management') nextPage = '/reports';
        else if (pathname === '/reports') nextPage = '/emails';
        else if (pathname === '/emails') nextPage = '/audit-log';
        else if (pathname === '/audit-log') {

          return;
        }

        if (nextPage) {
          pauseTutorial();
          router.push(nextPage);
          return;
        }
      }
      stopTutorial();
    }
  };

  if (tutorialStatus !== 'running') return null;

  return (
    <JoyrideComponent
      key={pathname}
      steps={steps}
      run={true}
      beaconComponent={CustomBeacon}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      locale={{
        back: 'Kembali',
        close: 'Tutup',
        last: 'Selesai',
        next: 'Lanjut',
        skip: 'Lewati',
      }}
      styles={({
        options: {
          zIndex: 10000,
          primaryColor: '#3b82f6',
          backgroundColor: theme === 'dark' ? '#3b82f6' : '#ffffff',
          textColor: theme === 'dark' ? '#f8fafc' : '#3b82f6',
          arrowColor: theme === 'dark' ? '#3b82f6' : '#ffffff',
        },
      }) as any}
    />
  );
}