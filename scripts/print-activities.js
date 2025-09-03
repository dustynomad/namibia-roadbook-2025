import puppeteer from "puppeteer";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function openAllDetails(page) {
  const clicked = await page.evaluate(() => {
    const isVisible = (el) =>
      !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length));
    let count = 0;

    document.querySelectorAll('[data-activity]').forEach((card) => {
      const expanded = card.getAttribute('aria-expanded');
      if (expanded === 'false' || expanded === null) {
        const btn = card.querySelector('button');
        if (isVisible(btn)) { btn.click(); count++; }
      }
    });

    document.querySelectorAll('button').forEach((btn) => {
      const label = (btn.textContent || '').trim().toLowerCase();
      if (!isVisible(btn)) return;
      if ((label.includes('details') || label.includes('öffnen') || label.includes('expand')) &&
          !label.includes('schließen') && !label.includes('close')) {
        btn.click(); count++;
      }
    });
    return count;
  });
  return clicked;
}

async function preparePage(page) {
  await page.emulateMediaType("screen");
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
  );

  await page.waitForSelector('body', { timeout: 15000 });
  await sleep(200);

  // 1) erst öffnen (Buttons sind noch sichtbar)
  const toggled = await openAllDetails(page);
  console.log("🔓 geöffnete Activity-Karten:", toggled);
  await sleep(300);

  // 2) Lazy an iframes aus + reload
  await page.evaluate(() => {
    document.querySelectorAll('iframe[data-map]').forEach((el) => {
      el.removeAttribute('loading');
      try { el.src = el.src; } catch {}
    });
  });

  // 3) iframes kurz anscrollen
  const framesCount = await page.$$eval('iframe[data-map]', els => els.length);
  for (let i = 0; i < framesCount; i++) {
    await page.evaluate((idx) => {
      const els = Array.from(document.querySelectorAll('iframe[data-map]'));
      els[idx]?.scrollIntoView({ block: 'center' });
    }, i);
    await sleep(150);
  }

  // 4) JETZT Druck-Styles
  await page.addStyleTag({ content: `
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none !important; }
    .page-break { break-after: page; }
    .page-keep { break-inside: avoid; page-break-inside: avoid; }
    iframe[data-map] { transform: translateZ(0); will-change: transform; }
  `});

  if (typeof page.waitForNetworkIdle === "function") {
    try { await page.waitForNetworkIdle({ idleTime: 800, timeout: 12000 }); } catch {}
  }
  await sleep(2500);
}

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage"],
});

try {
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => { window.print = () => {}; });

  // ⚠️ Deine Dev-URL hat einen Base-Pfad:
  // http://localhost:5173/namibia-roadbook-2025/
  const url = process.env.ACTIVITIES_URL
    ?? "http://localhost:5173/namibia-roadbook-2025/print/activities";

  await page.setViewport({ width: 1400, height: 2200 });
  await page.goto(url, { waitUntil: "domcontentloaded" });

  await preparePage(page);

  await page.pdf({
    path: "Aktivitäten.pdf",
    format: "A4",
    printBackground: true,
    margin: { top: "10mm", right: "10mm", bottom: "12mm", left: "10mm" },
  });

  console.log("✅ Aktivitäten.pdf erstellt");
} finally {
  await browser.close();
}
