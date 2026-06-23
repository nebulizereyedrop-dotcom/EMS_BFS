import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import pool from '@/lib/db';
import AuditReportClient from '@/components/audit/AuditReportClient';

export const metadata: Metadata = {
  title: 'Audit Logs | Central AC Dashboard',
};

// Pastikan halaman ini selalu di-render dinamis (tidak di-cache secara statis)
export const dynamic = 'force-dynamic';

async function getInitialAuditLogs() {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT 
        id, 
        user_id, 
        user_email, 
        action, 
        module, 
        description, 
        route_path, 
        ip_address, 
        created_at 
      FROM ems_audit_logs
      ORDER BY created_at DESC
      LIMIT 100
    `);
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error fetching initial audit logs:', error);
    return [];
  }
}

export default async function AuditLogPage() {
  // Route disabled: redirecting to home. Remove this redirect to re-enable.
  redirect('/');
  // execution will never reach here due to redirect
}
