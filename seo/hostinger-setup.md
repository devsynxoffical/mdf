# Moving milliondollarfunnels.us to Hostinger

The site is a static export. The built files are on the GitHub branch `hostinger` of `devsynxoffical/mdf`.

## 1. Add the website in Hostinger
hPanel → **Websites → Add website** → choose **milliondollarfunnels.us** ("Empty website" / use existing domain).

## 2. Pull the files from GitHub
1. hPanel → the website → **Advanced → GIT**.
2. Repository: `https://github.com/devsynxoffical/mdf.git`
3. Branch: `hostinger`
4. Install path: leave empty (this means `public_html`). `public_html` must be empty first: delete Hostinger's default `default.php` / `index.php`.
5. Click **Create**, then **Deploy**.
6. Optional: turn on **Auto Deployment**. Hostinger shows a webhook URL; add it in GitHub → repo Settings → Webhooks, so every update to the `hostinger` branch goes live automatically.

## 3. Lead settings (private)
1. File Manager → open the folder that **contains** `public_html` (one level up).
2. Create a file named `lead-config.php` with:

```php
<?php return [
  'notify_email' => 'YOUR-REAL-INBOX@example.com',
  'webhook_url'  => '',   // optional: GoHighLevel / Zapier / Make webhook URL
];
```

3. Every lead is also saved to `leads/leads.csv` in that same folder (not reachable from the web).
4. Optional: create a mailbox `no-reply@milliondollarfunnels.us` in hPanel → Emails, so lead emails are not marked as spam.

## 4. Point the domain to Hostinger
- **If the domain is registered at Hostinger:** hPanel → Domains → milliondollarfunnels.us → DNS → remove the Vercel records (A `76.76.21.21`, CNAME `cname.vercel-dns.com`) and use Hostinger's default records or nameservers.
- **If it is registered elsewhere:** at the registrar, set the nameservers to Hostinger's (`ns1.dns-parking.com`, `ns2.dns-parking.com`), or point the A record of `@` and `www` to the IP shown in hPanel → Website → Dashboard.

## 5. SSL
hPanel → **Security → SSL** → install the free SSL for milliondollarfunnels.us, including www. The `.htaccess` file forces https://milliondollarfunnels.us.

## 6. Check
1. Open https://milliondollarfunnels.us, /services and /lead-generation/hvac.
2. Submit the form on /book with name "TEST - ignore". You should see "Request received" and get the email.
