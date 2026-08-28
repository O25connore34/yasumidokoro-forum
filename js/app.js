const STORE = "yasumidokoro-v1";

const state = {
  lang: localStorage.getItem("yasumi-lang") || "ja",
  sort: "activity",
  extraTopics: [],
  extraPosts: {},
  likes: {},
  name: ""
};

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE);
    if (!raw) return;
    const data = JSON.parse(raw);
    state.extraTopics = data.extraTopics || [];
    state.extraPosts = data.extraPosts || {};
    state.likes = data.likes || {};
    state.name = data.name || "";
    ensureGuest();
  } catch {
    /* keep defaults */
  }
}

function saveStore() {
  localStorage.setItem(
    STORE,
    JSON.stringify({
      extraTopics: state.extraTopics,
      extraPosts: state.extraPosts,
      likes: state.likes,
      name: state.name
    })
  );
}

function t(key) {
  const pack = I18N[state.lang] || I18N.ja;
  return pack[key];
}

function loc(obj) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[state.lang] || obj.ja || obj.en || obj.ru || "";
}

function user(id) {
  return USERS.find((u) => u.id === id);
}

function cat(id) {
  return CATS.find((c) => c.id === id);
}

function ensureGuest() {
  if (!state.name) return;
  let u = USERS.find((x) => x.id === "guest-local");
  if (!u) {
    USERS.push({
      id: "guest-local",
      avatar: "public/images/avatars/sato.png",
      lang: state.lang,
      name: { ja: state.name, ru: state.name, en: state.name },
      handle: "you",
      loc: { ja: "—", ru: "—", en: "—" },
      role: { ja: "通りがかり", ru: "Прохожий", en: "Passer-by" },
      bio: "",
      joined: "2026-08-26",
      seen: NOW
    });
  } else {
    u.name = { ja: state.name, ru: state.name, en: state.name };
  }
}

function withPosts(topic) {
  const extra = state.extraPosts[topic.id] || [];
  if (!extra.length) return topic;
  return Object.assign({}, topic, { posts: topic.posts.concat(extra) });
}

function allTopics() {
  return TOPICS.concat(state.extraTopics).map(withPosts);
}

function topicById(id) {
  return allTopics().find((x) => x.id === id);
}

function lastAt(topic) {
  return topic.posts[topic.posts.length - 1].at;
}

function relTime(ts) {
  const diff = Math.max(0, NOW - ts);
  const min = Math.round(diff / 60000);
  if (min < 1) return t("timeNow");
  if (min < 60) return t("timeMin")(min);
  const hr = Math.round(min / 60);
  if (hr < 24) return t("timeHour")(hr);
  const day = Math.round(hr / 24);
  if (day < 7) return t("timeDay")(day);
  return t("timeWeek")(Math.round(day / 7));
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseHash() {
  const raw = (location.hash || "#/").replace(/^#/, "");
  const [path, query] = raw.split("?");
  const parts = path.split("/").filter(Boolean);
  const params = new URLSearchParams(query || "");
  return { parts, params };
}

function go(hash) {
  location.hash = hash;
}

function posters(topic) {
  const ids = [];
  for (const p of topic.posts) {
    if (!ids.includes(p.user)) ids.push(p.user);
  }
  return ids.slice(-5).map(user).filter(Boolean);
}

function catCount(id) {
  return allTopics().filter((x) => x.cat === id).length;
}

function likeKey(topicId, idx) {
  return topicId + ":" + idx;
}

function liked(topicId, idx) {
  return !!state.likes[likeKey(topicId, idx)];
}

function toggleLike(topicId, idx) {
  const k = likeKey(topicId, idx);
  state.likes[k] = !state.likes[k];
  saveStore();
  render();
}

function applyChrome() {
  document.documentElement.lang = state.lang;
  document.title = t("name") + " — " + t("tagline");
  document.querySelectorAll("[data-i]").forEach((el) => {
    const v = t(el.dataset.i);
    if (typeof v === "string") el.textContent = v;
  });
  document.querySelectorAll("[data-i-ph]").forEach((el) => {
    el.placeholder = t(el.dataset.iPh);
  });
  document.querySelectorAll(".lang [data-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === state.lang));
  });
}

function renderRail(activeCat) {
  const items = CATS.map((c) => {
    const current = activeCat === c.id ? ' aria-current="page"' : "";
    return `<li>
      <a href="#/c/${c.id}"${current}>
        <span class="swatch" style="background:${c.color}"></span>
        <span>
          <span class="cat-name">${esc(loc(c.name))}</span>
          <span class="cat-blurb">${esc(loc(c.blurb))}</span>
        </span>
        <span class="cat-n">${catCount(c.id)}</span>
      </a>
    </li>`;
  }).join("");
  document.getElementById("rail").innerHTML = `
    <div class="section-head"><h2>${esc(t("categories"))}</h2></div>
    <ul class="cat-list">
      <li>
        <a href="#/"${activeCat ? "" : ' aria-current="page"'}>
          <span class="swatch" style="background:var(--ink)"></span>
          <span>
            <span class="cat-name">${esc(t("all"))}</span>
            <span class="cat-blurb">${esc(t("latest"))}</span>
          </span>
          <span class="cat-n">${allTopics().length}</span>
        </a>
      </li>
      ${items}
    </ul>`;
}

function renderStat() {
  document.getElementById("stat").innerHTML = `
    <article class="side-card">
      <h2>${esc(t("about"))}</h2>
      <p>${esc(t("heroLead"))}</p>
      <p><a href="#/about">${esc(t("aboutTitle"))}</a> · <a href="#/guidelines">${esc(t("guideTitle"))}</a></p>
    </article>
    <article class="side-card">
      <h2>${esc(loc(STATS.founded))}</h2>
      <p><b>${STATS.members}</b> ${esc(t("statsMembers"))}<br>
      <b>${STATS.topics}</b> ${esc(t("statsTopics"))}<br>
      <b>${STATS.posts}</b> ${esc(t("statsPosts"))}</p>
    </article>
    <article class="side-card">
      <h2>${esc(t("notify"))}</h2>
      <ul>${t("notices")
        .map((n) => `<li><b>${esc(n.t)}</b> — ${esc(n.text)}</li>`)
        .join("")}</ul>
    </article>`;
}

function renderDock(page) {
  const icon = (d) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="${d}"/></svg>`;
  const item = (href, key, d, current, extra) =>
    `<a href="${href}" ${current ? 'aria-current="page"' : ""} ${extra || ""}>${icon(d)}<span>${esc(t(key))}</span></a>`;
  document.getElementById("dock").innerHTML =
    item("#/", "dockLatest", "M4 6h16M4 12h16M4 18h10", page === "list") +
    item("#/boards", "dockCats", "M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z", page === "boards") +
    `<button type="button" class="write" data-go="compose">${icon("M5 19h14M7 15l9-9 3 3-9 9H7z")}<span>${esc(t("dockWrite"))}</span></button>` +
    item("#/notices", "dockNotices", "M6 5h12v14H6zM9 9h6M9 13h4", page === "notices") +
    item("#/me", "dockMe", "M12 12a4 4 0 100-8 4 4 0 000 8zM5 20c1.5-3 4-4.5 7-4.5S17.5 17 19 20", page === "me");
}

function chips(activeCat) {
  const all = `<a href="#/"${activeCat ? "" : ' aria-current="page"'}>${esc(t("all"))}</a>`;
  const rest = CATS.map((c) => {
    const cur = activeCat === c.id ? ' aria-current="page"' : "";
    return `<a href="#/c/${c.id}"${cur}>${esc(loc(c.name))}</a>`;
  }).join("");
  return `<div class="chips">${all}${rest}</div>`;
}

function hero() {
  return `<section class="hero">
    <img src="public/images/hero/toge.png" width="1280" height="720" alt="${esc(
      state.lang === "ja"
        ? "峠の木のベンチと薬缶、人が写っていない"
        : state.lang === "ru"
          ? "Деревянная скамья на перевале и котелок, без людей"
          : "Wooden pass bench and kettle, empty of people"
    )}" />
    <div class="hero-copy">
      <p class="kicker">${esc(t("heroKicker"))}</p>
      <h1>${esc(t("tagline"))}</h1>
      <p>${esc(t("heroLead"))}</p>
      <div class="counts">
        <span><b>${STATS.members}</b> ${esc(t("statsMembers"))}</span>
        <span><b>${STATS.topics}</b> ${esc(t("statsTopics"))}</span>
        <span><b>${STATS.posts}</b> ${esc(t("statsPosts"))}</span>
      </div>
    </div>
  </section>`;
}

function topicRow(topic) {
  const c = cat(topic.cat);
  const av = posters(topic)
    .map((u) => `<img src="${u.avatar}" width="40" height="40" alt="${esc(loc(u.name))}" />`)
    .join("");
  const pin = topic.pinned ? `<span class="pin">${esc(t("pinned"))}</span>` : "";
  const tags = (loc(topic.tags) || []).map((x) => `<span>${esc(x)}</span>`).join("");
  return `<article class="topic-row">
    <a class="topic-main" href="#/t/${topic.id}">
      <img class="thumb" src="${topic.img}" width="96" height="96" alt="" />
      <div>
        <div class="topic-title">${pin}${esc(loc(topic.title))}</div>
        <div class="meta">
          <span class="badge"><i style="background:${c.color}"></i>${esc(loc(c.name))}</span>
          ${tags}
          <span class="avatars">${av}</span>
        </div>
      </div>
    </a>
    <div class="num"><b>${topic.posts.length - 1}</b>${esc(t("replies"))}</div>
    <div class="num views"><b>${topic.views}</b>${esc(t("views"))}</div>
    <div class="when">${esc(relTime(lastAt(topic)))}</div>
  </article>`;
}

function sortedTopics(list) {
  const copy = list.slice();
  copy.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    if (state.sort === "latest") return b.created - a.created;
    if (state.sort === "top") return b.views - a.views;
    return lastAt(b) - lastAt(a);
  });
  return copy;
}

function sortBar() {
  const btn = (id, key) =>
    `<button type="button" data-sort="${id}" aria-pressed="${state.sort === id}">${esc(t(key))}</button>`;
  return `<div class="sort">${btn("activity", "sortActivity")}${btn("latest", "sortLatest")}${btn("top", "sortTop")}</div>`;
}

function filterTopics(catId, q) {
  let list = allTopics();
  if (catId) list = list.filter((x) => x.cat === catId);
  const query = (q || "").trim().toLowerCase();
  if (query) {
    list = list.filter((x) => {
      const blob = [
        loc(x.title),
        loc(x.tags).join(" "),
        x.posts.map((p) => loc(p.body)).join(" ")
      ]
        .join(" ")
        .toLowerCase();
      return blob.includes(query);
    });
  }
  return sortedTopics(list);
}

function renderList(catId, q) {
  const list = filterTopics(catId, q);
  const c = catId ? cat(catId) : null;
  const heading = c ? loc(c.name) : t("latest");
  const body =
    list.length === 0
      ? `<p class="empty">${esc(q ? t("noResults") : t("empty"))}</p>`
      : `<div class="topic-table">${list.map(topicRow).join("")}</div>`;
  document.getElementById("main").innerHTML = `
    ${hero()}
    ${chips(catId)}
    <div class="section-head"><h2>${esc(heading)}</h2>${sortBar()}</div>
    ${body}`;
}

function renderThread(id) {
  const topic = topicById(id);
  if (!topic) {
    document.getElementById("main").innerHTML = `<p class="empty">${esc(t("noResults"))}</p>`;
    return;
  }
  const c = cat(topic.cat);
  const posts = topic.posts
    .map((p, idx) => {
      const u = user(p.user) || {
        avatar: "",
        name: { ja: t("guest"), ru: t("guest"), en: t("guest") },
        handle: "guest"
      };
      const on = liked(topic.id, idx);
      const extra = on ? 1 : 0;
      return `<article class="post">
        <a href="#/u/${u.id || ""}"><img class="av" src="${u.avatar}" width="64" height="64" alt="${esc(loc(u.name))}" /></a>
        <div>
          <div class="who">
            <a href="#/u/${u.id || ""}"><b>${esc(loc(u.name))}</b></a>
            <span class="handle">@${esc(u.handle)}</span>
            <span>${esc(relTime(p.at))}</span>
          </div>
          <p class="body">${esc(loc(p.body))}</p>
          <button class="like" type="button" data-like="${topic.id}:${idx}" aria-pressed="${on}">
            ${esc(on ? t("liked") : t("like"))} ${p.likes + extra}
          </button>
        </div>
      </article>`;
    })
    .join("");
  document.getElementById("main").innerHTML = `
    <p><a href="#/">${esc(t("back"))}</a></p>
    <header class="thread-head">
      <p class="kicker">${esc(loc(c.name))}</p>
      <h1>${esc(loc(topic.title))}</h1>
      <img class="cover" src="${topic.img}" width="1200" height="900" alt="" />
    </header>
    ${posts}
    <form class="composer" id="reply-form">
      <h2>${esc(t("writeReply"))}</h2>
      <p class="lede">${esc(t("loginHint"))}</p>
      <label>${esc(t("composeName"))}
        <input name="name" type="text" value="${esc(state.name)}" required />
      </label>
      <label>${esc(t("composeBody"))}
        <textarea name="body" required placeholder="${esc(t("replyPh"))}"></textarea>
      </label>
      <div class="actions">
        <button class="btn" type="submit">${esc(t("post"))}</button>
      </div>
    </form>`;
  document.getElementById("reply-form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    state.name = String(fd.get("name") || "").trim();
    const body = String(fd.get("body") || "").trim();
    if (!state.name || !body) return;
    const text = { ja: body, ru: body, en: body };
    if (!state.extraPosts[topic.id]) state.extraPosts[topic.id] = [];
    state.extraPosts[topic.id].push({
      user: "guest-local",
      at: Date.now(),
      likes: 0,
      body: text
    });
    ensureGuest();
    saveStore();
    go("#/t/" + topic.id);
    render();
  });
}

function renderCompose() {
  const opts = CATS.map((c) => `<option value="${c.id}">${esc(loc(c.name))}</option>`).join("");
  document.getElementById("main").innerHTML = `
    <form class="composer" id="compose-form">
      <h2>${esc(t("newTopic"))}</h2>
      <p class="lede">${esc(t("loginHint"))}</p>
      <label>${esc(t("composeName"))}
        <input name="name" type="text" value="${esc(state.name)}" required />
      </label>
      <label>${esc(t("composeCat"))}
        <select name="cat">${opts}</select>
      </label>
      <label>${esc(t("composeTitle"))}
        <input name="title" type="text" required />
      </label>
      <label>${esc(t("composeTags"))}
        <input name="tags" type="text" />
      </label>
      <label>${esc(t("composeBody"))}
        <textarea name="body" required placeholder="${esc(t("replyPh"))}"></textarea>
      </label>
      <div class="actions">
        <button class="btn" type="submit">${esc(t("post"))}</button>
        <button class="btn ghost" type="button" data-go="home">${esc(t("cancel"))}</button>
      </div>
    </form>`;
  document.getElementById("compose-form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    state.name = String(fd.get("name") || "").trim();
    const title = String(fd.get("title") || "").trim();
    const body = String(fd.get("body") || "").trim();
    const catId = String(fd.get("cat"));
    const tags = String(fd.get("tags") || "")
      .split(/[,、]/)
      .map((x) => x.trim())
      .filter(Boolean);
    if (!state.name || !title || !body) return;
    const id = "local-" + Date.now();
    const c = cat(catId);
    state.extraTopics.unshift({
      id,
      cat: catId,
      img: c.img,
      tags: { ja: tags, ru: tags, en: tags },
      title: { ja: title, ru: title, en: title },
      views: 1,
      created: NOW,
      posts: [
        {
          user: "guest-local",
          at: NOW,
          likes: 0,
          body: { ja: body, ru: body, en: body }
        }
      ]
    });
    ensureGuest();
    saveStore();
    go("#/t/" + id);
  });
}

function renderAbout() {
  document.getElementById("main").innerHTML = `
    <article class="page">
      <h2>${esc(t("aboutTitle"))}</h2>
      ${t("aboutBody")
        .map((p) => `<p class="lede" style="margin-bottom:.8rem;color:var(--ink)">${esc(p)}</p>`)
        .join("")}
    </article>`;
}

function renderGuide() {
  document.getElementById("main").innerHTML = `
    <article class="page">
      <h2>${esc(t("guideTitle"))}</h2>
      <ul>${t("guideItems")
        .map((x) => `<li class="lede" style="margin:.4rem 0;color:var(--ink)">${esc(x)}</li>`)
        .join("")}</ul>
    </article>`;
}

function renderMembers() {
  document.getElementById("main").innerHTML = `
    <div class="section-head"><h2>${esc(t("members"))}</h2></div>
    <div class="members">${USERS.filter((u) => u.id !== "guest-local")
      .map(
        (u) => `<a class="member" href="#/u/${u.id}">
        <img src="${u.avatar}" width="64" height="64" alt="${esc(loc(u.name))}" />
        <span>
          <b>${esc(loc(u.name))}</b><br>
          <span class="lede">@${esc(u.handle)} · ${esc(loc(u.loc))} · ${esc(loc(u.role))}</span>
        </span>
      </a>`
      )
      .join("")}</div>`;
}

function renderUser(id) {
  const u = user(id);
  if (!u) {
    document.getElementById("main").innerHTML = `<p class="empty">${esc(t("noResults"))}</p>`;
    return;
  }
  const theirs = allTopics().filter((x) => x.posts.some((p) => p.user === id));
  document.getElementById("main").innerHTML = `
    <article class="page">
      <div class="member" style="border:0;padding:0;background:transparent">
        <img src="${u.avatar}" width="96" height="96" alt="${esc(loc(u.name))}" />
        <span>
          <h2 style="margin:0 0 .3rem">${esc(loc(u.name))}</h2>
          <p class="lede">@${esc(u.handle)} · ${esc(t("loc"))}: ${esc(loc(u.loc))} · ${esc(t("role"))}: ${esc(loc(u.role))}</p>
          <p class="lede">${esc(u.bio)}</p>
          <p class="lede">${esc(t("joined"))} ${esc(u.joined)} · ${esc(t("seen"))} ${esc(relTime(u.seen))}</p>
        </span>
      </div>
    </article>
    <div class="section-head"><h2>${esc(t("topic"))}</h2></div>
    <div class="topic-table">${theirs.map(topicRow).join("")}</div>`;
}

function renderNotices() {
  document.getElementById("main").innerHTML = `
    <article class="page">
      <h2>${esc(t("notify"))}</h2>
      <ul>${t("notices")
        .map((n) => `<li class="lede" style="margin:.5rem 0;color:var(--ink)"><b>${esc(n.t)}</b> — ${esc(n.text)}</li>`)
        .join("")}</ul>
    </article>`;
}

function renderMe() {
  document.getElementById("main").innerHTML = `
    <article class="page">
      <h2>${esc(t("me"))}</h2>
      <p class="lede" style="color:var(--ink)">${esc(t("meBlurb"))}</p>
      <form id="me-form">
        <label>${esc(t("composeName"))}
          <input name="name" type="text" value="${esc(state.name)}" />
        </label>
        <button class="btn" type="submit">${esc(t("post"))}</button>
      </form>
    </article>`;
  document.getElementById("me-form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    state.name = String(new FormData(ev.target).get("name") || "").trim();
    saveStore();
    render();
  });
}

function renderBoards() {
  document.getElementById("main").innerHTML = `
    <div class="section-head"><h2>${esc(t("categories"))}</h2></div>
    <div class="members">${CATS.map(
      (c) => `<a class="member" href="#/c/${c.id}">
        <img src="${c.img}" width="96" height="72" alt="${esc(loc(c.name))}" />
        <span>
          <b>${esc(loc(c.name))}</b>
          <p class="lede">${esc(loc(c.blurb))}</p>
          <p class="lede">${catCount(c.id)} ${esc(t("topics"))}</p>
        </span>
      </a>`
    ).join("")}</div>`;
}

function pageName(parts) {
  const a = parts[0] || "";
  if (a === "boards") return "boards";
  if (a === "notices") return "notices";
  if (a === "me" || a === "u") return "me";
  if (a === "compose") return "write";
  return "list";
}

function render() {
  loadStore();
  const { parts, params } = parseHash();
  const langQ = params.get("lang");
  if (langQ && I18N[langQ]) {
    state.lang = langQ;
    localStorage.setItem("yasumi-lang", state.lang);
  }
  applyChrome();
  const q = document.getElementById("q");
  if (params.get("q") && q.value !== params.get("q")) q.value = params.get("q");
  const activeCat = parts[0] === "c" ? parts[1] : "";
  renderRail(activeCat);
  renderStat();
  renderDock(pageName(parts));
  const a = parts[0] || "";
  if (a === "t") renderThread(parts[1]);
  else if (a === "u") renderUser(parts[1]);
  else if (a === "about") renderAbout();
  else if (a === "guidelines") renderGuide();
  else if (a === "members") renderMembers();
  else if (a === "compose") renderCompose();
  else if (a === "notices") renderNotices();
  else if (a === "me") renderMe();
  else if (a === "boards") renderBoards();
  else renderList(activeCat, q.value || params.get("q") || "");
}

document.querySelectorAll(".lang [data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const next = btn.dataset.lang;
    state.lang = next;
    localStorage.setItem("yasumi-lang", next);
    const { parts, params } = parseHash();
    params.set("lang", next);
    const path = parts.length ? "/" + parts.join("/") : "/";
    const qs = params.toString();
    const hash = "#" + path + (qs ? "?" + qs : "");
    if (location.hash === hash) render();
    else go(hash);
  });
});

document.getElementById("search-form").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const q = document.getElementById("q").value.trim();
  const params = new URLSearchParams();
  params.set("lang", state.lang);
  if (q) params.set("q", q);
  go("#/?" + params.toString());
});

document.body.addEventListener("click", (ev) => {
  const sortBtn = ev.target.closest("[data-sort]");
  if (sortBtn) {
    state.sort = sortBtn.dataset.sort;
    render();
    return;
  }
  const likeBtn = ev.target.closest("[data-like]");
  if (likeBtn) {
    const [id, idx] = likeBtn.dataset.like.split(":");
    toggleLike(id, Number(idx));
    return;
  }
  const goBtn = ev.target.closest("[data-go]");
  if (goBtn) {
    const to = goBtn.dataset.go;
    if (to === "compose") go("#/compose");
    if (to === "home") go("#/");
  }
});

window.addEventListener("hashchange", render);
loadStore();
if (!location.hash) location.hash = "#/";
render();
