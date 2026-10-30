(() => {
  const W = window.WEDDING;
  const $ = (s) => document.querySelector(s);
  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(W.date);

  // 한국시간 기준 날짜 요소
  const kst = new Date(date.getTime() + 9 * 3600 * 1000);
  const Y = kst.getUTCFullYear(), M = kst.getUTCMonth() + 1, D = kst.getUTCDate();
  const h = kst.getUTCHours(), m = kst.getUTCMinutes(), dow = kst.getUTCDay();
  const timeText = `${h < 12 ? "오전" : "오후"} ${h % 12 || 12}시${m ? ` ${m}분` : ""}`;

  // ---------- 텍스트 채우기 ----------
  document.querySelectorAll("[data-groom]").forEach((el) => (el.textContent = W.groom.name));
  document.querySelectorAll("[data-bride]").forEach((el) => (el.textContent = W.bride.name));
  $("#coverDate").textContent = `${Y}. ${String(M).padStart(2, "0")}. ${String(D).padStart(2, "0")}`;
  $("#coverImg").src = W.cover;
  $("#coverVenue").textContent = `${Y}년 ${M}월 ${D}일 ${DAYS[dow]}요일 ${timeText}\n${W.venue.name} ${W.venue.hall}`;
  $("#coverVenue").style.whiteSpace = "pre-line";

  $("#greetTitle").textContent = W.greeting.title;
  $("#greetMsg").textContent = W.greeting.message;
  const parentLine = (p) =>
    `<p>${p.father} · ${p.mother}<span>의 ${p.order}</span><b>${p.name}</b></p>`;
  $("#parents").innerHTML = parentLine(W.groom) + parentLine(W.bride);

  $("#dateText").textContent = `${Y}년 ${M}월 ${D}일 ${DAYS[dow]}요일 ${timeText}`;

  // ---------- 달력 ----------
  const first = new Date(Date.UTC(Y, M - 1, 1)).getUTCDay();
  const last = new Date(Date.UTC(Y, M, 0)).getUTCDate();
  let html = "<tr>" + DAYS.map((d, i) => `<th class="${i === 0 ? "sun" : i === 6 ? "sat" : ""}">${d}</th>`).join("") + "</tr><tr>";
  for (let i = 0; i < first; i++) html += "<td></td>";
  for (let d = 1; d <= last; d++) {
    const col = (first + d - 1) % 7;
    const cls = [col === 0 ? "sun" : col === 6 ? "sat" : "", d === D ? "day" : ""].join(" ");
    html += `<td class="${cls}">${d === D ? `<span>${d}</span>` : d}</td>`;
    if (col === 6 && d !== last) html += "</tr><tr>";
  }
  $("#calendar").innerHTML = html + "</tr>";

  // ---------- 카운트다운 ----------
  const tick = () => {
    const diff = date - Date.now();
    const abs = Math.max(diff, 0);
    const units = [
      [Math.floor(abs / 86400000), "DAYS"],
      [Math.floor(abs / 3600000) % 24, "HOUR"],
      [Math.floor(abs / 60000) % 60, "MIN"],
      [Math.floor(abs / 1000) % 60, "SEC"],
    ];
    $("#countdown").innerHTML = units.map(([v, l]) => `<div><b>${v}</b><small>${l}</small></div>`).join("");
    const days = Math.ceil(diff / 86400000);
    $("#dday").innerHTML =
      days > 0 ? `${W.groom.name} ♥ ${W.bride.name}의 결혼식이 <em>${days}일</em> 남았습니다.`
      : days === 0 ? `오늘은 <em>${W.groom.name} ♥ ${W.bride.name}</em>의 결혼식입니다.`
      : `${W.groom.name} ♥ ${W.bride.name}, 결혼한 지 <em>${-days}일</em>째입니다.`;
  };
  tick();
  setInterval(tick, 1000);

  // ---------- 갤러리 + 라이트박스 ----------
  const gallery = $("#gallery");
  W.gallery.forEach((src, i) => {
    const b = document.createElement("button");
    b.innerHTML = `<img src="${src}" alt="갤러리 사진 ${i + 1}" loading="lazy" />`;
    b.onclick = () => openLb(i);
    gallery.appendChild(b);
  });

  const lb = $("#lightbox"), lbImg = lb.querySelector("img");
  let cur = 0;
  const showLb = () => {
    lbImg.src = W.gallery[cur];
    lb.querySelector(".lb-count").textContent = `${cur + 1} / ${W.gallery.length}`;
  };
  const openLb = (i) => { cur = i; showLb(); lb.hidden = false; document.body.style.overflow = "hidden"; };
  const closeLb = () => { lb.hidden = true; document.body.style.overflow = ""; };
  const move = (d) => { cur = (cur + d + W.gallery.length) % W.gallery.length; showLb(); };
  lb.querySelector(".lb-close").onclick = closeLb;
  lb.querySelector(".lb-prev").onclick = () => move(-1);
  lb.querySelector(".lb-next").onclick = () => move(1);
  lb.addEventListener("click", (e) => e.target === lb && closeLb());
  let sx = 0;
  lb.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1);
  });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") move(-1);
    if (e.key === "ArrowRight") move(1);
  });

  // ---------- 오시는 길 ----------
  const v = W.venue;
  $("#venueName").textContent = `${v.name} ${v.hall}`;
  $("#venueAddr").textContent = `${v.address}${v.tel ? ` · Tel. ${v.tel}` : ""}`;
  const q = encodeURIComponent(v.name);
  $("#naverMap").href = `https://map.naver.com/p/search/${q}`;
  $("#kakaoMap").href = `https://map.kakao.com/link/search/${q}`;
  $("#tmap").href = `tmap://search?name=${q}`;
  $("#copyAddr").onclick = () => copy(v.address, "주소가 복사되었습니다.");
  $("#transport").innerHTML = v.transport.map((t) => `<dt>${t.title}</dt><dd>${t.desc}</dd>`).join("");

  // ---------- 계좌 ----------
  const accHtml = (title, list) => `
    <div class="acc-item">
      <button class="acc-head">${title}</button>
      <div class="acc-body">
        ${list.map((a) => `
          <div class="acc-row">
            <div><small>${a.role} ${a.name}</small>${a.bank} ${a.number}</div>
            <button data-copy="${a.bank} ${a.number}">복사</button>
          </div>`).join("")}
      </div>
    </div>`;
  $("#accounts").innerHTML = accHtml("신랑측 계좌번호", W.accounts.groom) + accHtml("신부측 계좌번호", W.accounts.bride);
  $("#accounts").addEventListener("click", (e) => {
    const copyBtn = e.target.closest("[data-copy]");
    if (copyBtn) return copy(copyBtn.dataset.copy, "계좌번호가 복사되었습니다.");
    const head = e.target.closest(".acc-head");
    if (!head) return;
    const item = head.parentElement, body = head.nextElementSibling;
    item.classList.toggle("open");
    body.style.maxHeight = item.classList.contains("open") ? body.scrollHeight + "px" : 0;
  });

  // ---------- 연락하기 ----------
  const modal = $("#contactModal");
  const contactRow = (label, p) => p.phone ? `
    <div class="contact-row"><span>${label} ${p.name}</span>
      <span><a href="tel:${p.phone}" aria-label="전화">📞</a><a href="sms:${p.phone}" aria-label="문자">✉️</a></span>
    </div>` : "";
  $("#contactList").innerHTML = contactRow("신랑", W.groom) + contactRow("신부", W.bride);
  $("#contactBtn").onclick = () => (modal.hidden = false);
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("modal-close")) modal.hidden = true;
  });

  // ---------- 공유 ----------
  $("#shareBtn").onclick = async () => {
    const data = { title: document.title, text: $('meta[name="description"]').content, url: location.href };
    if (navigator.share) {
      try { await navigator.share(data); } catch (_) { /* 사용자가 취소 */ }
    } else copy(location.href, "링크가 복사되었습니다.");
  };
  $("#copyLink").onclick = () => copy(location.href, "링크가 복사되었습니다.");

  // ---------- 배경음악 ----------
  if (W.bgm) {
    const audio = $("#bgm"), btn = $("#bgmBtn");
    audio.src = W.bgm;
    btn.hidden = false;
    btn.onclick = () => {
      if (audio.paused) { audio.play(); btn.classList.add("playing"); }
      else { audio.pause(); btn.classList.remove("playing"); }
    };
  }

  // ---------- 유틸 ----------
  function copy(text, msg) {
    const done = () => toast(msg);
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
    } else fallbackCopy(text, done);
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    done();
  }
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2000);
  }

  // ---------- 스크롤 페이드인 ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => en.isIntersecting && (en.target.classList.add("show"), io.unobserve(en.target)));
  }, { threshold: 0.15 });
  document.querySelectorAll(".fade").forEach((el) => io.observe(el));
})();
