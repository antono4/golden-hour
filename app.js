/* ============================================================
   Golden Hour — app logic (no-token demo studio)
   ============================================================ */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const { RAIL, TOOLS, TEMPLATES, TESTIMONIALS, CODE, PROMPT_PRESETS } =
    window.GH || { RAIL: [], TOOLS: [], TEMPLATES: [], TESTIMONIALS: [], CODE: {}, PROMPT_PRESETS: {} };

  /* ---------- mobile drawer ---------- */
  const burger = $("#burger"), drawer = $("#drawer");
  if (burger) burger.addEventListener("click", () => {
    drawer.hidden = !drawer.hidden;
  });

  /* ---------- nav scroll state ---------- */
  const nav = $("#nav");
  const onScroll = () => {
    if (window.scrollY > 20) nav.style.background = "linear-gradient(180deg,rgba(16,11,6,.95),rgba(16,11,6,.8))";
    else nav.style.background = "";
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- hero rail (duplicate for seamless loop) ---------- */
  const rail = $("#rail");
  if (rail) {
    const cards = [...RAIL, ...RAIL];
    rail.innerHTML = cards.map(t => `
      <div class="rail__card">
        <div class="rail__art ${t.art}"></div>
        <div class="rail__name">${t.name}<small>${t.time}</small></div>
      </div>`).join("");
  }

  /* ---------- tool catalog ---------- */
  const grid = $("#toolGrid");
  let showingAll = false;
  function renderTools(cat = "all") {
    if (!grid) return;
    const list = TOOLS.filter(t => cat === "all" || t.c === cat);
    const shown = showingAll ? list : list.slice(0, 12);
    grid.innerHTML = shown.map(t => `
      <article class="tool" data-cat="${t.c}" data-name="${t.n}">
        <div class="tool__art" style="background:${t.a}">
          <span class="tool__free">Free</span>
          <span class="tool__cat">${t.c}</span>
          <div class="tool__play"><span>▶</span></div>
        </div>
        <div class="tool__body">
          <div class="tool__name">${t.n}</div>
          <div class="tool__desc">${t.d}</div>
        </div>
      </article>`).join("");
    const foot = $(".catalog__foot");
    if (foot) foot.style.display = (cat === "all" && !showingAll && TOOLS.length > 12) ? "" : "none";
    // wire clicks → studio
    $$(".tool").forEach(el => el.addEventListener("click", () => {
      const name = el.dataset.name.toLowerCase();
      const sel = $("#studioTool");
      if (!sel) return;
      [...sel.options].forEach(o => { if (o.text.toLowerCase().includes(name) || o.value.includes(name.replace(/\s/g,"-"))) sel.value = o.value; });
      sel.value = sel.value || "text-to-video";
      $("#create").scrollIntoView({ behavior: "smooth" });
      onToolChange();
    }));
  }
  renderTools();

  $$(".chip").forEach(chip => chip.addEventListener("click", () => {
    $$(".chip").forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    showingAll = false;
    renderTools(chip.dataset.cat);
  }));
  const showAll = $("#showAll");
  if (showAll) showAll.addEventListener("click", () => { showingAll = true; renderTools($(".chip.is-active").dataset.cat); });

  /* ---------- nav pill filters (cosmetic sync) ---------- */
  $$(".nav__pill").forEach(p => p.addEventListener("click", () => {
    $$(".nav__pill").forEach(x => x.classList.remove("is-active"));
    p.classList.add("is-active");
    const cat = p.dataset.filter;
    const chip = $$(".chip").find(c => c.dataset.cat === cat) || $$(".chip")[0];
    if (chip) chip.click();
    $("#catalog").scrollIntoView({ behavior: "smooth" });
  }));

  /* ---------- templates ---------- */
  const tg = $("#templatesGrid");
  if (tg) tg.innerHTML = TEMPLATES.map(t => `
    <div class="tplate" style="background:${t.a}">
      <span class="tplate__ratio">${t.r}</span>
      <span class="tplate__tag">${t.t}</span>
    </div>`).join("");

  /* ---------- testimonials (duplicate for loop) ---------- */
  const tt = $("#testimonialsTrack");
  if (tt) {
    const list = [...TESTIMONIALS, ...TESTIMONIALS];
    tt.innerHTML = list.map(t => `
      <article class="tcard">
        <div class="tcard__who">
          <div class="tcard__avatar">${t.initial}</div>
          <div>
            <div class="tcard__name">${t.name}</div>
            <div class="tcard__role">${t.role}</div>
          </div>
        </div>
        <div class="tcard__stars">★★★★★</div>
        <p class="tcard__body">“${t.body}”</p>
      </article>`).join("");
  }

  /* ---------- code tabs ---------- */
  const codeBlock = $("#codeBlock");
  function renderCode(lang) {
    if (codeBlock) codeBlock.innerHTML = CODE[lang] || "";
  }
  renderCode("python");
  $$(".code__tab").forEach(tab => tab.addEventListener("click", () => {
    $$(".code__tab").forEach(t => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    renderCode(tab.dataset.lang);
  }));

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$(".trusted__card,.section-head,.compare__table,.tplate,.teams__card,.dev__cols,.plan,.faq__item,.cta__inner")
    .forEach(el => { el.classList.add("reveal"); io.observe(el); });

  /* ============================================================
     STUDIO — no-token render (canvas animation)
     ============================================================ */
  const canvas = $("#studioCanvas");
  const video = $("#studioVideo");
  const empty = $("#studioEmpty");
  const viewport = $("#studioViewport");
  const meta = $("#studioMeta");
  const metaTool = $("#metaTool"), metaSpec = $("#metaSpec"), metaTime = $("#metaTime");
  const progress = $("#studioProgress"), fill = $("#progressFill"), progressText = $("#progressText");
  const genBtn = $("#studioGenerate");
  const toolSel = $("#studioTool"), promptEl = $("#studioPrompt"), aspectEl = $("#studioAspect"), lenEl = $("#studioLen"), resEl = $("#studioRes");
  let ctx, W, H, animId = null, startTime = 0, recording = false;

  function onToolChange() {
    if (!toolSel || !promptEl) return;
    const v = toolSel.value;
    if (PROMPT_PRESETS[v]) promptEl.value = PROMPT_PRESETS[v];
  }
  if (toolSel) { toolSel.addEventListener("change", onToolChange); }

  // hash-based palette from prompt string
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return Math.abs(h); }
  function palette(prompt) {
    const h = hashStr(prompt) % 360;
    return {
      sky: `hsl(${(h + 30) % 360}, 78%, 62%)`,
      sky2: `hsl(${(h + 350) % 360}, 70%, 38%)`,
      sun: `hsl(${(h + 50) % 360}, 92%, 72%)`,
      sunCore: `hsl(${(h + 55) % 360}, 100%, 92%)`,
      ground: `hsl(${(h + 12) % 360}, 45%, 12%)`,
      accent: `hsl(${(h + 200) % 360}, 60%, 55%)`,
    };
  }

  function resizeCanvas() {
    if (!canvas) return;
    const r = viewport.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = Math.floor(r.width * dpr);
    H = canvas.height = Math.floor(r.height * dpr);
    canvas.style.width = r.width + "px";
    canvas.style.height = r.height + "px";
    ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // draw frame for a given render type + progress
  function drawFrame(type, p, pal, prompt) {
    if (!ctx) return;
    const w = canvas.width / (window.devicePixelRatio > 2 ? 2 : 1);
    const h = canvas.height / (window.devicePixelRatio > 2 ? 2 : 1);
    const r = viewport.getBoundingClientRect();
    const cw = r.width, ch = r.height;

    // sky gradient
    const g = ctx.createLinearGradient(0, 0, 0, ch);
    g.addColorStop(0, pal.sky2);
    g.addColorStop(0.55, pal.sky);
    g.addColorStop(1, pal.ground);
    ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch);

    // sun
    const sunY = ch * 0.58 - Math.sin(p * Math.PI) * 30;
    const sunX = cw * 0.5;
    const sunR = Math.min(cw, ch) * 0.13;
    const sg = ctx.createRadialGradient(sunX, sunY, sunR * 0.2, sunX, sunY, sunR);
    sg.addColorStop(0, pal.sunCore); sg.addColorStop(0.5, pal.sun); sg.addColorStop(1, "transparent");
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2); ctx.fill();

    // type-specific flourishes
    if (type.includes("face") || type.includes("lip") || type.includes("talking")) {
      // draw a simple head silhouette
      const hx = cw * 0.5, hy = ch * 0.46, hr = Math.min(cw, ch) * 0.16;
      ctx.fillStyle = "rgba(20,12,6,.85)";
      ctx.beginPath(); ctx.arc(hx, hy, hr, 0, Math.PI * 2); ctx.fill();
      // shoulders
      ctx.fillRect(hx - hr * 1.6, hy + hr * 0.7, hr * 3.2, ch);
      // mouth (animate)
      const mouth = Math.abs(Math.sin(p * Math.PI * 8)) * (type.includes("lip") ? hr * 0.18 : hr * 0.06);
      ctx.fillStyle = pal.accent;
      ctx.beginPath(); ctx.ellipse(hx, hy + hr * 0.25, hr * 0.3, mouth + 2, 0, 0, Math.PI * 2); ctx.fill();
    } else if (type.includes("upscaler") || type.includes("image")) {
      // pixel grid that resolves into sharpness
      const cell = Math.max(4, 18 - Math.floor(p * 14));
      ctx.globalAlpha = 0.18;
      for (let y = 0; y < ch; y += cell)
        for (let x = 0; x < cw; x += cell) {
          const v = (Math.sin(x * 0.05 + y * 0.05 + p * 6) + 1) / 2;
          ctx.fillStyle = v > 0.6 ? pal.sun : pal.sky2;
          ctx.fillRect(x, y, cell, cell);
        }
      ctx.globalAlpha = 1;
    } else if (type.includes("gif")) {
      // 3-frame loop
      const frame = Math.floor(p * 3) % 3;
      ctx.fillStyle = ["rgba(255,140,66,.5)","rgba(255,94,58,.5)","rgba(245,196,81,.5)"][frame];
      ctx.fillRect(0, ch * 0.7, cw, ch * 0.3);
    } else {
      // waves for video types
      ctx.strokeStyle = "rgba(255,243,214,.35)";
      ctx.lineWidth = 2;
      for (let layer = 0; layer < 4; layer++) {
        ctx.globalAlpha = 0.18 + layer * 0.12;
        ctx.beginPath();
        const base = ch * (0.72 + layer * 0.06);
        for (let x = 0; x <= cw; x += 8) {
          const y = base + Math.sin(x * 0.03 + p * 8 + layer) * (8 + layer * 3);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    // golden particles
    for (let i = 0; i < 18; i++) {
      const seed = i * 13.7;
      const px = (seed * 7 + p * 60) % cw;
      const py = (ch - ((seed * 11 + p * 90) % ch));
      ctx.fillStyle = `rgba(255,179,71,${0.25 + 0.5 * Math.abs(Math.sin(seed + p * 6))})`;
      ctx.beginPath(); ctx.arc(px, py, 1.6, 0, Math.PI * 2); ctx.fill();
    }

    // film grain
    ctx.globalAlpha = 0.04;
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "#fff" : "#000";
      ctx.fillRect(Math.random() * cw, Math.random() * ch, 1, 1);
    }
    ctx.globalAlpha = 1;

    // vignette
    const vg = ctx.createRadialGradient(cw / 2, ch / 2, ch * 0.2, cw / 2, ch / 2, ch * 0.75);
    vg.addColorStop(0, "transparent"); vg.addColorStop(1, "rgba(0,0,0,.6)");
    ctx.fillStyle = vg; ctx.fillRect(0, 0, cw, ch);

    // watermark
    ctx.fillStyle = "rgba(255,243,214,.5)";
    ctx.font = "600 11px 'Space Grotesk', sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("GOLDEN HOUR · no token", cw - 12, ch - 12);
  }

  function cleanup() {
    if (animId) { cancelAnimationFrame(animId); animId = null; }
    if (video) { video.pause(); video.removeAttribute("src"); video.load(); video.hidden = true; }
    recording = false;
  }

  function generate() {
    if (!canvas || recording) return;
    cleanup();
    resizeCanvas();
    canvas.hidden = false; empty.style.display = "none";
    meta.hidden = true; progress.hidden = false; genBtn.disabled = true;
    fill.style.width = "0%";

    const type = toolSel.value;
    const prompt = promptEl.value || "golden hour";
    const pal = palette(prompt);
    const len = parseInt(lenEl.value) || 10;
    const aspect = aspectEl.value;
    const res = resEl.value;

    metaTool.textContent = toolSel.options[toolSel.selectedIndex].text;
    metaSpec.textContent = `${res} · ${len}s · ${aspect}`;
    const t0 = performance.now();
    startTime = t0;
    recording = true;

    const renderMs = 2600 + (len * 120); // simulated render time

    function loop(now) {
      if (!recording) return;
      const elapsed = now - t0;
      const prog = Math.min(1, elapsed / renderMs);
      fill.style.width = (prog * 100).toFixed(1) + "%";
      progressText.textContent = prog < 1
        ? `Rendering ${type}… ${Math.floor(prog * 100)}%`
        : "Finalizing…";

      drawFrame(type, prog, pal, prompt);

      if (prog < 1) { animId = requestAnimationFrame(loop); }
      else { progressText.textContent = "Finalizing…"; finish(elapsed); }
    }
    animId = requestAnimationFrame(loop);

    function finish(elapsed) {
      recording = false;
      progress.hidden = true;
      progressText.textContent = "Done";
      meta.hidden = false;
      metaTime.textContent = `rendered in ${(elapsed / 1000).toFixed(1)}s`;
      genBtn.disabled = false;
      // keep the final frame animating gently
      let p = 1;
      function idle() {
        if (recording) return;
        p += 0.004;
        drawFrame(type, (Math.sin(p) * 0.5 + 0.5) || 1, pal, prompt);
        animId = requestAnimationFrame(idle);
      }
      idle();
    }
  }

  if (genBtn) genBtn.addEventListener("click", generate);
  window.addEventListener("resize", () => { if (canvas && !canvas.hidden) { resizeCanvas(); } });

  // keyboard: cmd/ctrl + enter generates
  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      const el = document.activeElement;
      if (el && el.closest(".studio")) { e.preventDefault(); generate(); }
    }
  });

  // expose for debugging
  window.GHStudio = { generate };
})();
