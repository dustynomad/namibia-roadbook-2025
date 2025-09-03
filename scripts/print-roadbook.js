import puppeteer from "puppeteer";

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function openAllDetails(page) {
  const clicked = await page.evaluate(() => {
    const isVisible = (el) =>
      !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length));
    let count = 0;

    // gezielt DayCards mit aria-expanded
    document.querySelectorAll('[data-day]').forEach((card) => {
      const expanded = card.getAttribute('aria-expanded');
      if (expanded === 'false' || expanded === null) {
        const btn = card.querySelector('button');
        if (isVisible(btn)) { btn.click(); count++; }
      }
    });

    // Fallback: Buttons mit "Details"/"öffnen"
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
  // 1) Screen-CSS (Maps rendern so zuverlässiger)
  await page.emulateMediaType("screen");

  // 2) Realer UA
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
  );

  // 3) Sicherstellen, dass DayCards im DOM sind
  await page.waitForSelector('[data-day]', { timeout: 15000 });
  await sleep(200);

  // 4) **JETZT** alle Details öffnen (BEVOR .no-print versteckt wird!)
  const toggled = await openAllDetails(page);
  console.log("🔓 geöffnet:", toggled);
  await sleep(300);

  // 5) Lazy an iframes aus + sanfter Reload
  await page.evaluate(() => {
    document.querySelectorAll('iframe[data-map]').forEach((el) => {
      el.removeAttribute('loading');
      try { el.src = el.src; } catch {}
    });
  });

  // 6) iframes kurz in Sicht scrollen (triggert Paint)
  const framesCount = await page.$$eval('iframe[data-map]', els => els.length);
  console.log("🗺️ Karten-iframes:", framesCount);
  for (let i = 0; i < framesCount; i++) {
    await page.evaluate((idx) => {
      const els = Array.from(document.querySelectorAll('iframe[data-map]'));
      els[idx]?.scrollIntoView({ block: 'center' });
    }, i);
    await sleep(180);
  }

  // 7) **Erst jetzt** Druck-Styles injizieren (Buttons aus, Umbrüche etc.)
  await page.addStyleTag({ content: `
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none !important; }
    .page-break { break-after: page; }
    .page-keep { break-inside: avoid; page-break-inside: avoid; }
    iframe[data-map] { transform: translateZ(0); will-change: transform; }
  `});

  // 8) Netzwerk & Puffer
  if (typeof page.waitForNetworkIdle === "function") {
    try { await page.waitForNetworkIdle({ idleTime: 1000, timeout: 15000 }); } catch {}
  }
  await sleep(4000);
}


// -----------------------------------------
// Rest deines Scripts: Browser starten, URL, goto, preparePage, pdf, close
// Beispiel:
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage"],
});
try {
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => { window.print = () => {}; });

  // Achte auf deinen Base-Pfad!
  const url = process.env.ROADBOOK_URL
    ?? "http://localhost:5173/namibia-roadbook-2025/print";

  await page.setViewport({ width: 1400, height: 2500 });
  await page.goto(url, { waitUntil: "domcontentloaded" });

  await preparePage(page);

  await page.pdf({
    path: "Roadbook.pdf",
    format: "A4",
    printBackground: true,
    margin: { top: "10mm", right: "10mm", bottom: "12mm", left: "10mm" },
  });

  console.log("✅ Roadbook.pdf erstellt");
} finally {
  await browser.close();
}
