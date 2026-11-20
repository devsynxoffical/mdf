<?php
/**
 * Lead endpoint for milliondollarfunnels.us on Hostinger (static site + PHP).
 *
 * Every valid lead is:
 *   1. saved to a CSV file outside public_html (never lost, even if email fails),
 *   2. forwarded to the CRM webhook, if one is configured,
 *   3. emailed to the notification address.
 * Responds 200 when the lead was delivered by webhook or email, 503 otherwise
 * (the form then falls back to opening the visitor's email app).
 *
 * Optional private config, one level ABOVE public_html (not web-accessible):
 *   <domain folder>/lead-config.php  →  <?php return ['notify_email' => 'you@example.com', 'webhook_url' => 'https://...'];
 */
header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');
header('Cache-Control: no-store');

function out($code, $body) { http_response_code($code); echo json_encode($body); exit; }

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') out(405, ['ok' => false, 'error' => 'method']);

$raw = file_get_contents('php://input', false, null, 0, 20000);
$d = json_decode($raw ?: '', true);
if (!is_array($d)) out(400, ['ok' => false, 'error' => 'bad_request']);

// Honeypot: bots fill the hidden field. Accept silently and drop.
if (!empty($d['company_site'])) out(200, ['ok' => true]);

$fields = ['name', 'email', 'phone', 'business', 'niche', 'revenue', 'bottleneck', 'slot', 'notes', 'page', 'referrer'];
$lead = [];
foreach ($fields as $f) {
  $v = isset($d[$f]) ? trim((string)$d[$f]) : '';
  $lead[$f] = function_exists('mb_substr') ? mb_substr($v, 0, 2000) : substr($v, 0, 2000);
}
if ($lead['name'] === '' || !filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) out(422, ['ok' => false, 'error' => 'invalid']);
$lead['submittedAt'] = gmdate('c');
$lead['source'] = 'milliondollarfunnels.us';

$base = dirname(__DIR__, 2); // folder that contains public_html
$cfgFile = $base . '/lead-config.php';
$cfg = is_file($cfgFile) ? (include $cfgFile) : [];
if (!is_array($cfg)) $cfg = [];
$notify = $cfg['notify_email'] ?? 'hello@milliondollarfunnel.com';
$webhook = $cfg['webhook_url'] ?? '';

// 1) Save (CSV-injection safe)
$dir = $base . '/leads';
if (!is_dir($dir)) @mkdir($dir, 0700, true);
$row = array_map(function ($v) { return preg_match('/^[=+\-@]/', $v) ? "'" . $v : $v; }, array_values($lead));
$csv = $dir . '/leads.csv';
if (is_dir($dir) && ($fh = @fopen($csv, 'a'))) {
  if (flock($fh, LOCK_EX)) {
    if (filesize($csv) === 0) fputcsv($fh, array_keys($lead));
    fputcsv($fh, $row);
    flock($fh, LOCK_UN);
  }
  fclose($fh);
}

$delivered = false;

// 2) CRM webhook (GoHighLevel, Zapier, Make, ...)
if ($webhook && function_exists('curl_init')) {
  $ch = curl_init($webhook);
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($lead),
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
  ]);
  curl_exec($ch);
  $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  if ($status >= 200 && $status < 300) $delivered = true;
}

// 3) Email notification
$clean = function ($s) { return str_replace(["\r", "\n"], ' ', $s); };
$subject = 'New lead: ' . $clean($lead['name']) . ($lead['niche'] ? ' (' . $clean($lead['niche']) . ')' : '');
$lines = [];
foreach ($lead as $k => $v) $lines[] = ucfirst($k) . ': ' . ($v === '' ? '-' : $v);
$headers = [
  'From: Million Dollar Funnel <no-reply@milliondollarfunnels.us>',
  'Reply-To: ' . $clean($lead['email']),
  'Content-Type: text/plain; charset=UTF-8',
];
if (@mail($notify, $subject, implode("\n", $lines), implode("\r\n", $headers))) $delivered = true;

if ($delivered) out(200, ['ok' => true]);
out(503, ['ok' => false, 'error' => 'delivery_failed']);
