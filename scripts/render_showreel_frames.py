import os
import subprocess
import tempfile

CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUTPUT_DIR = "/Users/hassan/mdf/public/images/showreel"
os.makedirs(OUTPUT_DIR, exist_ok=True)

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

# ----------------- SHOT 01: Cosmic Hand -----------------
html_shot_01 = BASE_HEAD + f"""
  <style>
    .glow {{
      position: absolute;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(18,84,236,0.1) 45%, transparent 70%);
      filter: blur(60px);
    }}
    .orb-glow {{
      position: absolute;
      top: 260px;
      left: 890px;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(254,240,138,0.95) 0%, rgba(251,191,36,0.6) 40%, transparent 70%);
      filter: blur(20px);
    }}
  </style>
</head>
<body>
  <div class="glow"></div>
  <div class="orb-glow"></div>
  <img src="file://{WORKSPACE_ROOT}/public/images/home-hero-hand.png" style="width: 1080px; object-fit: contain; z-index: 10; filter: drop-shadow(0 0 60px rgba(18,84,236,0.4));">
</body>
</html>
"""
render("shot_01_hand.png", html_shot_01)

# ----------------- SHOT 02: Typography Poster -----------------
html_shot_02 = BASE_HEAD + """
  <style>
    .grid-mesh {
      position: absolute;
      inset: 0;
      background-size: 60px 60px;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    }
  </style>
</head>
<body>
  <div class="grid-mesh"></div>
  <div style="position: relative; z-index: 10; text-align: center; max-width: 1400px;">
    <div class="mono" style="font-size: 14px; letter-spacing: 0.25em; text-transform: uppercase; color: #38bdf8; margin-bottom: 28px;">
      [ SYSTEM SPECIFICATION · 01 ]
    </div>
    <h1 style="font-size: 92px; font-weight: 800; line-height: 1.05; letter-spacing: -0.04em; margin-bottom: 24px;">
      Client acquisition agency helping<br>
      <span class="serif" style="font-size: 110px; font-weight: 400; font-style: italic; color: #93c5fd;">brands become top 1%</span>
    </h1>
    <p style="font-size: 22px; color: #94a3b8; max-width: 780px; margin: 0 auto; line-height: 1.6;">
      Engineered for ambitious technology firms turning complex products into predictable, multi-million dollar inbound pipelines.
    </p>
  </div>
</body>
</html>
"""
render("shot_02_typography.png", html_shot_02)

# ----------------- SHOT 04: 4 Stat Cards Grid -----------------
html_shot_04 = BASE_HEAD + """
  <style>
    .stat-grid {
      display: grid;
      grid-template-columns: repeat(2, 440px);
      gap: 28px;
      z-index: 10;
    }
    .card {
      background: rgba(255, 255, 255, 0.96);
      color: #0b1437;
      padding: 42px;
      border-radius: 28px;
      box-shadow: 0 30px 60px rgba(0,0,0,0.35);
      position: relative;
    }
  </style>
</head>
<body>
  <div class="stat-grid">
    <div class="card">
      <div class="mono" style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.14em;">TOTAL GENERATED</div>
      <div class="serif" style="font-size: 78px; font-style: italic; line-height: 1; margin: 12px 0 8px;">$1B+</div>
      <p style="font-size: 15px; color: #475569;">Tracked client enterprise value added across 300+ implementations.</p>
    </div>
    <div class="card">
      <div class="mono" style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.14em;">SYSTEM CYCLE</div>
      <div class="serif" style="font-size: 78px; font-style: italic; line-height: 1; margin: 12px 0 8px;">2-3mo</div>
      <p style="font-size: 15px; color: #475569;">From architecture audit to predictable inbound booked calls pipeline.</p>
    </div>
    <div class="card">
      <div class="mono" style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.14em;">SYSTEMS DELIVERED</div>
      <div class="serif" style="font-size: 78px; font-style: italic; line-height: 1; margin: 12px 0 8px;">500+</div>
      <p style="font-size: 15px; color: #475569;">High-ticket VSL funnels and paid acquisition architectures deployed.</p>
    </div>
    <div class="card">
      <div class="mono" style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.14em;">SERVICED TAM</div>
      <div class="serif" style="font-size: 78px; font-style: italic; line-height: 1; margin: 12px 0 8px;">$321B</div>
      <p style="font-size: 15px; color: #475569;">Combined total addressable market across active client cohorts.</p>
    </div>
  </div>
</body>
</html>
"""
render("shot_04_stat_cards.png", html_shot_04)

# ----------------- SHOT 06: VSL Player Interface -----------------
html_shot_06 = BASE_HEAD + """
</head>
<body style="background: #1e1b4b;">
  <div style="width: 1300px; height: 740px; background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255,255,255,0.15); border-radius: 36px; padding: 48px; box-shadow: 0 40px 80px rgba(0,0,0,0.5); display: flex; flex-direction: column; justify-content: space-between;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="width: 14px; height: 14px; border-radius: 50%; background: #ef4444;"></div>
        <span class="mono" style="font-size: 14px; letter-spacing: 0.15em;">HIGH-TICKET VSL MASTER · 4K UHD</span>
      </div>
      <div style="background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8; color: #38bdf8; padding: 8px 18px; border-radius: 999px; font-size: 13px; font-weight: 600;">
        78.4% RETENTION RATE
      </div>
    </div>
    <div style="text-align: center;">
      <div style="width: 100px; height: 100px; border-radius: 50%; background: #ffffff; color: #020926; display: flex; align-items: center; justify-content: center; margin: 0 auto 28px; box-shadow: 0 0 50px rgba(255,255,255,0.4);">
        <svg viewBox="0 0 24 24" width="42" height="42" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </div>
      <h2 style="font-size: 42px; font-weight: 700;">How We Architect Inbound High-Ticket Conversion</h2>
      <p style="font-size: 18px; color: #94a3b8; margin-top: 10px;">Executive Briefing · The Proprietary 3-Phase Conversion Funnel</p>
    </div>
    <!-- Waveform -->
    <div style="display: flex; align-items: center; gap: 6px; height: 60px;">
      <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; position: relative;">
        <div style="width: 64%; height: 100%; background: #38bdf8; border-radius: 2px;"></div>
      </div>
    </div>
  </div>
</body>
</html>
"""
render("shot_06_vsl_player.png", html_shot_06)

# ----------------- SHOT 07: Lead Flow Calculator -----------------
html_shot_07 = BASE_HEAD + """
</head>
<body style="background: #0f172a;">
  <div style="width: 1100px; background: #020926; border: 1px solid rgba(255,255,255,0.12); border-radius: 36px; padding: 60px; box-shadow: 0 40px 100px rgba(0,0,0,0.6);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
      <div>
        <div class="mono" style="font-size: 13px; color: #38bdf8; letter-spacing: 0.15em;">ROI TELEMETRY ENGINE</div>
        <h2 style="font-size: 36px; font-weight: 700; margin-top: 6px;">Inbound Revenue Modeling</h2>
      </div>
      <div class="mono" style="background: #1e293b; padding: 10px 20px; border-radius: 14px; color: #a5f3fc; font-size: 15px;">
        ALGORITHM V3.4
      </div>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
      <div>
        <label class="mono" style="font-size: 13px; color: #94a3b8;">CURRENT REVENUE RUN RATE</label>
        <div style="font-size: 56px; font-weight: 800; margin: 12px 0 24px; color: #ffffff;">$500,000 <span style="font-size: 24px; color: #64748b;">/ mo</span></div>
        <div style="height: 12px; width: 100%; background: #1e293b; border-radius: 6px; position: relative;">
          <div style="width: 65%; height: 100%; background: linear-gradient(to right, #38bdf8, #34d399); border-radius: 6px;"></div>
        </div>
      </div>
      <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(52, 211, 153, 0.3); border-radius: 24px; padding: 36px; text-align: center;">
        <div class="mono" style="font-size: 13px; color: #34d399; letter-spacing: 0.15em;">PROJECTED NEW PIPELINE</div>
        <div class="serif" style="font-size: 72px; font-style: italic; color: #34d399; margin: 10px 0;">+$2.4M</div>
        <p style="font-size: 15px; color: #a7f3d0;">Estimated 90-day pipeline value with 60s AI qualification</p>
      </div>
    </div>
  </div>
</body>
</html>
"""
render("shot_07_calculator.png", html_shot_07)

# ----------------- SHOT 09: Ad Telemetry -----------------
html_shot_09 = BASE_HEAD + """
</head>
<body style="background: #042f2e;">
  <div style="width: 1360px; background: rgba(2, 9, 38, 0.95); border: 1px solid rgba(45, 212, 191, 0.3); border-radius: 32px; padding: 48px; box-shadow: 0 40px 100px rgba(0,0,0,0.5);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="width: 14px; height: 14px; border-radius: 50%; background: #2dd4bf; box-shadow: 0 0 15px #2dd4bf;"></div>
        <h2 style="font-size: 28px; font-weight: 700;">Paid Media Telemetry · Meta & Google Scaling</h2>
      </div>
      <span class="mono" style="color: #2dd4bf; font-size: 14px;">LIVE ATTRIBUTION ACTIVE</span>
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      <div style="background: #0b1437; padding: 32px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08);">
        <div class="mono" style="font-size: 12px; color: #94a3b8;">COST PER ACQUISITION (CPA)</div>
        <div style="font-size: 48px; font-weight: 800; margin: 12px 0 6px; color: #2dd4bf;">$42.10</div>
        <div style="color: #34d399; font-size: 14px; font-weight: 600;">↓ 38.4% vs industry baseline</div>
      </div>
      <div style="background: #0b1437; padding: 32px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08);">
        <div class="mono" style="font-size: 12px; color: #94a3b8;">RETURN ON AD SPEND (ROAS)</div>
        <div style="font-size: 48px; font-weight: 800; margin: 12px 0 6px; color: #38bdf8;">4.8x</div>
        <div style="color: #38bdf8; font-size: 14px; font-weight: 600;">Targeted high-intent cohorts</div>
      </div>
      <div style="background: #0b1437; padding: 32px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08);">
        <div class="mono" style="font-size: 12px; color: #94a3b8;">TOTAL CLOSED REVENUE</div>
        <div style="font-size: 48px; font-weight: 800; margin: 12px 0 6px; color: #ffffff;">$1.24M</div>
        <div style="color: #94a3b8; font-size: 14px; font-weight: 600;">90-Day Cohort Attribution</div>
      </div>
    </div>
  </div>
</body>
</html>
"""
render("shot_09_ad_telemetry.png", html_shot_09)

# ----------------- SHOT 10: Exponential ROAS Curve -----------------
html_shot_10 = BASE_HEAD + """
</head>
<body>
  <div style="width: 1400px; height: 800px; position: relative; display: flex; flex-direction: column; justify-content: space-between;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <div class="mono" style="font-size: 13px; color: #34d399; letter-spacing: 0.2em;">EXPONENTIAL SCALING MATRIX</div>
        <h2 style="font-size: 46px; font-weight: 800; margin-top: 8px;">From $50K to $1.2M+ Monthly Trajectory</h2>
      </div>
      <div class="mono" style="background: rgba(52, 211, 153, 0.15); border: 1px solid #34d399; color: #34d399; padding: 12px 24px; border-radius: 999px; font-size: 15px; font-weight: 600;">
        ROAS VELOCITY · +412%
      </div>
    </div>
    <!-- Vector Curve Graph -->
    <svg viewBox="0 0 1400 480" style="width: 100%; height: 480px; overflow: visible;">
      <defs>
        <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="60%" stop-color="#2dd4bf" />
          <stop offset="100%" stop-color="#34d399" />
        </linearGradient>
        <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(52, 211, 153, 0.25)" />
          <stop offset="100%" stop-color="transparent" />
        </linearGradient>
      </defs>
      <!-- Grid lines -->
      <line x1="0" y1="400" x2="1400" y2="400" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
      <line x1="0" y1="300" x2="1400" y2="300" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
      <line x1="0" y1="200" x2="1400" y2="200" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
      <line x1="0" y1="100" x2="1400" y2="100" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
      <!-- Area & Path -->
      <path d="M 0 420 Q 400 400 700 280 T 1400 40 L 1400 480 L 0 480 Z" fill="url(#areaGrad)" />
      <path d="M 0 420 Q 400 400 700 280 T 1400 40" fill="none" stroke="url(#curveGrad)" stroke-width="8" stroke-linecap="round" style="filter: drop-shadow(0 0 20px #34d399);" />
      <!-- Milestones -->
      <circle cx="0" cy="420" r="10" fill="#38bdf8" />
      <circle cx="700" cy="280" r="10" fill="#2dd4bf" />
      <circle cx="1400" cy="40" r="14" fill="#34d399" style="filter: drop-shadow(0 0 15px #34d399);" />
    </svg>
  </div>
</body>
</html>
"""
render("shot_10_roas_curve.png", html_shot_10)

# ----------------- SHOT 14: 60s AI Voice Qualification -----------------
html_shot_14 = BASE_HEAD + """
</head>
<body style="background: #311042;">
  <div style="width: 820px; background: rgba(15, 23, 42, 0.96); border: 1px solid rgba(216, 180, 254, 0.3); border-radius: 40px; padding: 50px; box-shadow: 0 40px 100px rgba(0,0,0,0.6);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 36px;">
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="width: 14px; height: 14px; border-radius: 50%; background: #c084fc; box-shadow: 0 0 15px #c084fc;"></div>
        <span class="mono" style="font-size: 14px; color: #e9d5ff; letter-spacing: 0.15em;">AI QUALIFICATION DISPATCH</span>
      </div>
      <div class="mono" style="background: rgba(192, 132, 252, 0.15); border: 1px solid #c084fc; color: #e9d5ff; padding: 8px 16px; border-radius: 999px; font-size: 13px;">
        RESPONSE TIME: 42s
      </div>
    </div>
    <div style="background: #1e1b4b; border-radius: 24px; padding: 28px; margin-bottom: 20px; border-left: 4px solid #c084fc;">
      <div class="mono" style="font-size: 12px; color: #a5b4fc; margin-bottom: 8px;">INBOUND PROSPECT · ENTERPRISE TIED</div>
      <p style="font-size: 18px; color: #ffffff; line-height: 1.5;">"We are currently scaling past $8M ARR and need an inbound funnel architecture to close Series B enterprise clients."</p>
    </div>
    <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(52, 211, 153, 0.4); border-radius: 24px; padding: 28px;">
      <div class="mono" style="font-size: 12px; color: #34d399; margin-bottom: 8px;">AI SYSTEM VERDICT · 100% MATCH</div>
      <p style="font-size: 20px; font-weight: 700; color: #ffffff;">Qualified for Executive Strategy Call · CRM Updated · Calendar Booked</p>
    </div>
  </div>
</body>
</html>
"""
render("shot_14_ai_screener.png", html_shot_14)

# ----------------- SHOT 15: Calendar Booking -----------------
html_shot_15 = BASE_HEAD + """
</head>
<body style="background: #0f172a;">
  <div style="width: 1200px; background: #ffffff; color: #0b1437; border-radius: 36px; padding: 56px; box-shadow: 0 40px 100px rgba(0,0,0,0.5);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
      <div>
        <div class="mono" style="font-size: 13px; color: #2563eb; letter-spacing: 0.15em;">CALENDAR ORCHESTRATION</div>
        <h2 style="font-size: 38px; font-weight: 800; margin-top: 4px;">Executive Inbound Appointments</h2>
      </div>
      <div style="background: #eff6ff; color: #1d4ed8; padding: 10px 22px; border-radius: 999px; font-weight: 600; font-size: 14px;">
        100% QUALIFIED CEO SLOTS
      </div>
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 20px; padding: 28px; border-top: 6px solid #2563eb;">
        <div class="mono" style="font-size: 12px; color: #64748b;">TODAY · 2:00 PM EST</div>
        <div style="font-size: 20px; font-weight: 700; margin: 10px 0 6px;">Series B SaaS Founder</div>
        <p style="font-size: 14px; color: #64748b;">$12M ARR · Enterprise Funnel Architecture</p>
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 20px; padding: 28px; border-top: 6px solid #10b981;">
        <div class="mono" style="font-size: 12px; color: #64748b;">TODAY · 4:30 PM EST</div>
        <div style="font-size: 20px; font-weight: 700; margin: 10px 0 6px;">Fintech CEO</div>
        <p style="font-size: 14px; color: #64748b;">$25M ARR · High-Ticket Media Buying</p>
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 20px; padding: 28px; border-top: 6px solid #8b5cf6;">
        <div class="mono" style="font-size: 12px; color: #64748b;">TOMORROW · 11:00 AM EST</div>
        <div style="font-size: 20px; font-weight: 700; margin: 10px 0 6px;">AI Platform Founder</div>
        <p style="font-size: 14px; color: #64748b;">$6M ARR · 60s AI Qualification Engine</p>
      </div>
    </div>
  </div>
</body>
</html>
"""
render("shot_15_calendar_booked.png", html_shot_15)

# ----------------- SHOT 17: Meridian (Electric Orange) -----------------
html_shot_17 = BASE_HEAD + f"""
</head>
<body style="background: #FA4D09;">
  <div style="width: 1500px; display: flex; flex-direction: column; align-items: center; text-align: center;">
    <div class="mono" style="font-size: 14px; letter-spacing: 0.2em; color: rgba(255,255,255,0.8); margin-bottom: 16px;">
      CASE STUDY ( 01 ) · ENTERPRISE LOGISTICS
    </div>
    <h1 style="font-size: 84px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 40px;">
      Meridian: Rebuilding Global Logistics
    </h1>
    <div style="display: flex; gap: 32px; justify-content: center; width: 100%;">
      <img src="file://{WORKSPACE_ROOT}/public/images/shots/shot1.webp" style="width: 440px; height: 320px; object-fit: cover; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.4);">
      <img src="file://{WORKSPACE_ROOT}/public/images/shots/shot2.webp" style="width: 440px; height: 320px; object-fit: cover; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.4);">
      <img src="file://{WORKSPACE_ROOT}/public/images/shots/shot3.webp" style="width: 440px; height: 320px; object-fit: cover; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.4);">
    </div>
  </div>
</body>
</html>
"""
render("shot_17_meridian.png", html_shot_17)

# ----------------- SHOT 18: Heimdall Power (Vermilion) -----------------
html_shot_18 = BASE_HEAD + f"""
</head>
<body style="background: #E8431E;">
  <div style="width: 1500px; display: flex; flex-direction: column; align-items: center; text-align: center;">
    <div class="mono" style="font-size: 14px; letter-spacing: 0.2em; color: rgba(255,255,255,0.8); margin-bottom: 16px;">
      CASE STUDY ( 02 ) · ENERGY INFRASTRUCTURE
    </div>
    <h1 style="font-size: 84px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 40px;">
      Heimdall Power: Intelligence for the Grid
    </h1>
    <div style="display: flex; gap: 32px; justify-content: center; width: 100%;">
      <img src="file://{WORKSPACE_ROOT}/public/images/shots/shot4.webp" style="width: 440px; height: 320px; object-fit: cover; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.4);">
      <img src="file://{WORKSPACE_ROOT}/public/images/shots/shot5.webp" style="width: 440px; height: 320px; object-fit: cover; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.4);">
      <img src="file://{WORKSPACE_ROOT}/public/images/shots/shot6.webp" style="width: 440px; height: 320px; object-fit: cover; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.4);">
    </div>
  </div>
</body>
</html>
"""
render("shot_18_heimdall.png", html_shot_18)

# ----------------- SHOT 19: Space Capital (Midnight Navy) -----------------
html_shot_19 = BASE_HEAD + f"""
</head>
<body style="background: #0B1437;">
  <div style="width: 1500px; display: flex; flex-direction: column; align-items: center; text-align: center;">
    <div class="mono" style="font-size: 14px; letter-spacing: 0.2em; color: rgba(56,189,248,0.8); margin-bottom: 16px;">
      CASE STUDY ( 03 ) · SPACE ECONOMY VENTURE
    </div>
    <h1 style="font-size: 84px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 40px;">
      Space Capital: Investing in the Final Frontier
    </h1>
    <div style="display: flex; gap: 32px; justify-content: center; width: 100%;">
      <img src="file://{WORKSPACE_ROOT}/public/images/shots/shot7.webp" style="width: 440px; height: 320px; object-fit: cover; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.6);">
      <img src="file://{WORKSPACE_ROOT}/public/images/shots/shot8.webp" style="width: 440px; height: 320px; object-fit: cover; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.6);">
      <img src="file://{WORKSPACE_ROOT}/public/images/shots/shot9.webp" style="width: 440px; height: 320px; object-fit: cover; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.6);">
    </div>
  </div>
</body>
</html>
"""
render("shot_19_space_capital.png", html_shot_19)

# ----------------- SHOT 22: Team & Culture Marquee -----------------
html_shot_22 = BASE_HEAD + f"""
</head>
<body>
  <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
    <div class="mono" style="font-size: 14px; letter-spacing: 0.2em; color: #38bdf8; margin-bottom: 28px;">
      THE TEAM BEHIND THE ACQUISITION ENGINE
    </div>
    <div style="display: flex; gap: 24px;">
      <img src="file://{WORKSPACE_ROOT}/public/images/culture/team1.jpg" style="width: 280px; height: 280px; object-fit: cover; border-radius: 24px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
      <img src="file://{WORKSPACE_ROOT}/public/images/culture/team2.jpg" style="width: 280px; height: 280px; object-fit: cover; border-radius: 24px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
      <img src="file://{WORKSPACE_ROOT}/public/images/culture/team3.jpg" style="width: 280px; height: 280px; object-fit: cover; border-radius: 24px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
      <img src="file://{WORKSPACE_ROOT}/public/images/culture/team4.jpg" style="width: 280px; height: 280px; object-fit: cover; border-radius: 24px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
      <img src="file://{WORKSPACE_ROOT}/public/images/culture/team5.jpg" style="width: 280px; height: 280px; object-fit: cover; border-radius: 24px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
    </div>
  </div>
</body>
</html>
"""
render("shot_22_culture_strip.png", html_shot_22)

# ----------------- SHOT 23: MDF Brand Lockup -----------------
html_shot_23 = BASE_HEAD + """
  <style>
    .aurora {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.25) 0%, rgba(142, 123, 255, 0.15) 40%, transparent 70%);
      filter: blur(80px);
    }
  </style>
</head>
<body>
  <div class="aurora"></div>
  <div style="position: relative; z-index: 10; text-align: center;">
    <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 24px;">
      <div style="width: 20px; height: 20px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 20px #38bdf8;"></div>
      <span style="font-size: 64px; font-weight: 900; letter-spacing: -0.04em;">MDF<sup style="font-size: 24px; font-weight: 600; vertical-align: super;">™</sup></span>
    </div>
    <div style="font-size: 40px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff;">
      CLIENT ACQUISITION FOR THE TOP 1%
    </div>
    <p class="mono" style="font-size: 16px; color: #94a3b8; letter-spacing: 0.15em; margin-top: 20px;">
      CRAFTED BY HUMANS · ACCELERATED BY AI
    </p>
  </div>
</body>
</html>
"""
render("shot_23_mdf_brand.png", html_shot_23)

# ----------------- SHOT 24: CTA Vault Door -----------------
html_shot_24 = BASE_HEAD + """
</head>
<body>
  <div style="text-align: center; z-index: 10;">
    <div class="mono" style="font-size: 14px; letter-spacing: 0.25em; color: #38bdf8; margin-bottom: 28px;">
      ACCEPTING 3 PARTNERS THIS QUARTER
    </div>
    <h1 style="font-size: 80px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 48px;">
      Ready to Architect Your Pipeline?
    </h1>
    <div style="display: inline-flex; align-items: center; gap: 16px; background: #ffffff; color: #020926; padding: 22px 52px; border-radius: 999px; font-size: 22px; font-weight: 700; box-shadow: 0 0 50px rgba(56, 189, 248, 0.4);">
      <span>Book a Discovery Call</span>
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M7 17L17 7M17 7H7M17 7V17" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="mono" style="font-size: 15px; color: #64748b; margin-top: 40px;">
      DEVSYNX.COM/MDF · 60s RESPONSE TIME
    </div>
  </div>
</body>
</html>
"""
render("shot_24_cta_door.png", html_shot_24)

print("All studio pictures successfully generated!")
