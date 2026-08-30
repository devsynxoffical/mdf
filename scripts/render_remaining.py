import os
import subprocess
import tempfile

CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUTPUT_DIR = "/Users/hassan/mdf/public/images/showreel"
WORKSPACE_ROOT = "/Users/hassan/mdf"

def render(filename, html_content):
    with tempfile.NamedTemporaryFile(suffix=".html", mode="w", delete=False) as f:
        f.write(html_content)
        temp_html_path = f.name

    out_path = os.path.join(OUTPUT_DIR, filename)
    cmd = [
        CHROME_PATH,
        "--headless",
        "--disable-gpu",
        "--hide-scrollbars",
        "--window-size=1920,1080",
        f"--screenshot={out_path}",
        temp_html_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(temp_html_path):
        os.remove(temp_html_path)
    print(f"✅ Rendered: {filename}")

BASE_HEAD = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1920px;
      height: 1080px;
      overflow: hidden;
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #020926;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .serif { font-family: 'Instrument Serif', serif; }
    .mono { font-family: 'JetBrains Mono', monospace; }
  </style>
"""

# SHOT 08: Multi-Device Grid
html_08 = BASE_HEAD + f"""
</head>
<body style="background: #0b1329;">
  <div style="width: 1500px; text-align: center;">
    <div class="mono" style="font-size: 14px; letter-spacing: 0.2em; color: #38bdf8; margin-bottom: 20px;">
      CROSS-DEVICE CONVERSION ARCHITECTURE
    </div>
    <h2 style="font-size: 52px; font-weight: 800; margin-bottom: 40px;">Synchronized High-Ticket Funnel Flow</h2>
    <div style="display: flex; gap: 36px; justify-content: center; align-items: center;">
      <img src="file://{WORKSPACE_ROOT}/public/images/shots/shot10.webp" style="width: 480px; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.5);">
      <img src="file://{WORKSPACE_ROOT}/public/images/shots/shot11.webp" style="width: 420px; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.5); transform: translateY(-20px);">
      <img src="file://{WORKSPACE_ROOT}/public/images/shots/shot12.webp" style="width: 320px; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.5);">
    </div>
  </div>
</body>
</html>
"""
render("shot_08_multi_device.png", html_08)

# SHOT 11: Global Heatmap
html_11 = BASE_HEAD + """
</head>
<body style="background: #020b1f;">
  <div style="width: 1300px; text-align: center;">
    <div class="mono" style="font-size: 14px; letter-spacing: 0.2em; color: #2dd4bf; margin-bottom: 16px;">
      GLOBAL ATTRIBUTION NETWORK
    </div>
    <h2 style="font-size: 52px; font-weight: 800; margin-bottom: 40px;">Worldwide Inbound Buyer Routing</h2>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
      <div style="background: #0b1739; padding: 32px; border-radius: 24px; border: 1px solid rgba(45,212,191,0.2);">
        <div class="mono" style="color: #2dd4bf; font-size: 13px;">NORTH AMERICA</div>
        <div style="font-size: 40px; font-weight: 800; margin: 10px 0;">58.4%</div>
        <p style="font-size: 14px; color: #94a3b8;">High-ticket enterprise SaaS</p>
      </div>
      <div style="background: #0b1739; padding: 32px; border-radius: 24px; border: 1px solid rgba(45,212,191,0.2);">
        <div class="mono" style="color: #2dd4bf; font-size: 13px;">UNITED KINGDOM</div>
        <div style="font-size: 40px; font-weight: 800; margin: 10px 0;">22.1%</div>
        <p style="font-size: 14px; color: #94a3b8;">Fintech & wealth management</p>
      </div>
      <div style="background: #0b1739; padding: 32px; border-radius: 24px; border: 1px solid rgba(45,212,191,0.2);">
        <div class="mono" style="color: #2dd4bf; font-size: 13px;">EUROPE (DACH)</div>
        <div style="font-size: 40px; font-weight: 800; margin: 10px 0;">12.8%</div>
        <p style="font-size: 14px; color: #94a3b8;">Industrial & energy tech</p>
      </div>
      <div style="background: #0b1739; padding: 32px; border-radius: 24px; border: 1px solid rgba(45,212,191,0.2);">
        <div class="mono" style="color: #2dd4bf; font-size: 13px;">APAC & SINGAPORE</div>
        <div style="font-size: 40px; font-weight: 800; margin: 10px 0;">6.7%</div>
        <p style="font-size: 14px; color: #94a3b8;">AI infrastructure & cross-border</p>
      </div>
    </div>
  </div>
</body>
</html>
"""
render("shot_11_global_heatmap.png", html_11)

# SHOT 12: Revenue Ticker
html_12 = BASE_HEAD + """
</head>
<body style="background: #050505;">
  <div style="width: 1400px; text-align: center;">
    <div class="mono" style="font-size: 13px; letter-spacing: 0.25em; color: #10b981; margin-bottom: 24px;">
      LIVE REVENUE TELEMETRY STREAM
    </div>
    <div style="display: flex; gap: 28px; justify-content: center;">
      <div style="background: #111827; border: 1px solid #10b981; border-radius: 20px; padding: 28px 36px; text-align: left;">
        <div class="mono" style="color: #10b981; font-size: 12px;">CONTRACT SIGNED · 2m AGO</div>
        <div class="mono" style="font-size: 38px; font-weight: 700; color: #34d399; margin-top: 6px;">+$50,000</div>
      </div>
      <div style="background: #111827; border: 1px solid #38bdf8; border-radius: 20px; padding: 28px 36px; text-align: left;">
        <div class="mono" style="color: #38bdf8; font-size: 12px;">WIRE RECEIVED · 8m AGO</div>
        <div class="mono" style="font-size: 38px; font-weight: 700; color: #38bdf8; margin-top: 6px;">+$28,500</div>
      </div>
      <div style="background: #111827; border: 1px solid #a855f7; border-radius: 20px; padding: 28px 36px; text-align: left;">
        <div class="mono" style="color: #a855f7; font-size: 12px;">STRATEGY DEPOSIT · 14m AGO</div>
        <div class="mono" style="font-size: 38px; font-weight: 700; color: #c084fc; margin-top: 6px;">+$15,000</div>
      </div>
    </div>
  </div>
</body>
</html>
"""
render("shot_12_revenue_ticker.png", html_12)

# SHOT 16: CRM Nodes
html_16 = BASE_HEAD + """
</head>
<body style="background: #020b1f;">
  <div style="width: 1400px; text-align: center;">
    <div class="mono" style="font-size: 13px; letter-spacing: 0.2em; color: #818cf8; margin-bottom: 20px;">
      SYSTEM ARCHITECTURE
    </div>
    <h2 style="font-size: 48px; font-weight: 800; margin-bottom: 50px;">Automated Client Acquisition Stack</h2>
    <div style="display: flex; align-items: center; justify-content: center; gap: 24px;">
      <div style="background: #0b1739; border: 1px solid #38bdf8; padding: 28px 36px; border-radius: 20px;">
        <div class="mono" style="color: #38bdf8; font-size: 12px;">STAGE 1</div>
        <div style="font-size: 22px; font-weight: 700; margin-top: 6px;">Inbound Webhook</div>
      </div>
      <div style="color: #64748b; font-size: 28px;">→</div>
      <div style="background: #0b1739; border: 1px solid #c084fc; padding: 28px 36px; border-radius: 20px;">
        <div class="mono" style="color: #c084fc; font-size: 12px;">STAGE 2</div>
        <div style="font-size: 22px; font-weight: 700; margin-top: 6px;">AI 60s Qualification</div>
      </div>
      <div style="color: #64748b; font-size: 28px;">→</div>
      <div style="background: #0b1739; border: 1px solid #34d399; padding: 28px 36px; border-radius: 20px;">
        <div class="mono" style="color: #34d399; font-size: 12px;">STAGE 3</div>
        <div style="font-size: 22px; font-weight: 700; margin-top: 6px;">HubSpot CRM Sync</div>
      </div>
      <div style="color: #64748b; font-size: 28px;">→</div>
      <div style="background: #0b1739; border: 1px solid #fbbf24; padding: 28px 36px; border-radius: 20px;">
        <div class="mono" style="color: #fbbf24; font-size: 12px;">STAGE 4</div>
        <div style="font-size: 22px; font-weight: 700; margin-top: 6px;">CEO Calendar Locked</div>
      </div>
    </div>
  </div>
</body>
</html>
"""
render("shot_16_crm_nodes.png", html_16)

# SHOT 20: Testimonials Proof
html_20 = BASE_HEAD + """
</head>
<body style="background: #020926;">
  <div style="width: 1400px; text-align: center;">
    <div class="mono" style="font-size: 13px; letter-spacing: 0.2em; color: #38bdf8; margin-bottom: 16px;">
      VERIFIED PARTNER FEEDBACK
    </div>
    <h2 style="font-size: 48px; font-weight: 800; margin-bottom: 48px;">What Founders Say</h2>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
      <div style="background: #081638; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 36px; text-align: left;">
        <div style="color: #fbbf24; font-size: 20px; margin-bottom: 12px;">★★★★★</div>
        <p style="font-size: 18px; line-height: 1.5; color: #e2e8f0;">"Rebuilt our acquisition pipeline in three weeks. The calendar hasn't had an open slot since."</p>
        <div class="mono" style="font-size: 13px; color: #94a3b8; margin-top: 20px;">SARAH K. · FOUNDER</div>
      </div>
      <div style="background: #081638; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 36px; text-align: left;">
        <div style="color: #fbbf24; font-size: 20px; margin-bottom: 12px;">★★★★★</div>
        <p style="font-size: 18px; line-height: 1.5; color: #e2e8f0;">"First team to treat follow-up and instant AI response as the product itself. Game changer."</p>
        <div class="mono" style="font-size: 13px; color: #94a3b8; margin-top: 20px;">DANIEL R. · CEO</div>
      </div>
      <div style="background: #081638; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 36px; text-align: left;">
        <div style="color: #fbbf24; font-size: 20px; margin-bottom: 12px;">★★★★★</div>
        <p style="font-size: 18px; line-height: 1.5; color: #e2e8f0;">"I stopped guessing where revenue was leaking. Now we see the entire high-ticket machine."</p>
        <div class="mono" style="font-size: 13px; color: #94a3b8; margin-top: 20px;">PRIYA S. · MANAGING PARTNER</div>
      </div>
    </div>
  </div>
</body>
</html>
"""
render("shot_20_growth_proof.png", html_20)

# SHOT 21: 3D Diamond Crystal
html_21 = BASE_HEAD + """
  <style>
    .diamond-box {
      width: 400px;
      height: 400px;
      position: relative;
      background: linear-gradient(135deg, rgba(56,189,248,0.2), rgba(168,85,247,0.3));
      clip-path: polygon(50% 0%, 100% 35%, 50% 100%, 0% 35%);
      box-shadow: 0 0 100px rgba(56,189,248,0.5);
      border: 2px solid rgba(255,255,255,0.4);
    }
  </style>
</head>
<body style="background: #020926;">
  <div style="text-align: center;">
    <div class="diamond-box" style="margin: 0 auto 40px;"></div>
    <div class="mono" style="font-size: 14px; letter-spacing: 0.25em; color: #38bdf8;">
      ENGINEERED FOR THE TOP 1%
    </div>
    <h2 class="serif" style="font-size: 64px; font-style: italic; margin-top: 10px;">The MDF Standard</h2>
  </div>
</body>
</html>
"""
render("shot_21_diamond.png", html_21)

print("Remaining 6 shots rendered!")
