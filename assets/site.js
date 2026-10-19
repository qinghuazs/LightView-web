(function () {
  var $ = function (id) { return document.getElementById(id); };

  // Mac App Store 链接：上架后填入，例如 https://apps.apple.com/app/id0000000000 ；为空时按钮隐藏
  var APP_STORE_URL = "";
  Array.prototype.forEach.call(document.querySelectorAll(".btn.store"), function (a) { a.setAttribute("href", APP_STORE_URL); });

  // 演示窗口：三张示意图循环，状态栏同步
  var photos = [
    { name: "DSC_0214.jpg", size: "6000 × 4000", zoom: "42%", index: 14 },
    { name: "DSC_0215.jpg", size: "4000 × 6000", zoom: "28%", index: 15 },
    { name: "DSC_0216.jpg", size: "6000 × 4000", zoom: "42%", index: 16 }
  ];
  var total = 168, i = 0, nodes = document.querySelectorAll(".canvas .photo");
  function show(n) {
    i = (n + photos.length) % photos.length;
    for (var k = 0; k < nodes.length; k++) nodes[k].classList.toggle("on", k === i);
    var p = photos[i];
    $("title").textContent = p.name; $("s-name").textContent = p.name; $("s-size").textContent = p.size;
    $("s-zoom").textContent = p.zoom; $("s-index").textContent = p.index + " / " + total;
    document.querySelector(".tb-tools .zoom").textContent = p.zoom;
  }
  if ($("prev")) $("prev").addEventListener("click", function () { show(i - 1); });
  if ($("next")) $("next").addEventListener("click", function () { show(i + 1); });
  if (nodes.length) document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target.tagName;
    if (t === "INPUT" || t === "TEXTAREA") return;
    if (e.key === "ArrowLeft") { show(i - 1); e.preventDefault(); }
    if (e.key === "ArrowRight") { show(i + 1); e.preventDefault(); }
  });

  // 手机菜单
  var overlay = $("overlay");
  if (overlay) {
  $("menu-open").addEventListener("click", function () { overlay.classList.add("open"); });
  $("menu-close").addEventListener("click", function () { overlay.classList.remove("open"); });
  overlay.addEventListener("click", function (e) { if (e.target.tagName === "A") overlay.classList.remove("open"); });
  }

  // 进入视口时浮现
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // 下载按钮：从 GitHub Releases 取最新版本的 dmg；取不到就落到 Releases 页面
  fetch("https://api.github.com/repos/qinghuazs/LightView-web/releases/latest", { headers: { Accept: "application/vnd.github+json" } })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (rel) {
      if (!rel) return;
      var asset = (rel.assets || []).filter(function (a) { return /\.dmg$/i.test(a.name); })[0];
      var ver = (rel.tag_name || "").replace(/^v/, "");
      if (ver) { Array.prototype.forEach.call(document.querySelectorAll(".ver"), function (el) { el.textContent = ver; }); }
      if (asset) {
        Array.prototype.forEach.call(document.querySelectorAll(".dl"), function (el) { el.href = asset.browser_download_url; });
        if ($("dl-size")) $("dl-size").textContent = (asset.size / 1048576).toFixed(1) + " MB";
      }
    })
    .catch(function () {});
})();
