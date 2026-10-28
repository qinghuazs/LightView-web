# LightView 官网

LightView（macOS 看图工具）的官方网站，纯静态 HTML，部署在 Vercel。App 源码在 [qinghuazs/LightView](https://github.com/qinghuazs/LightView)。

## 页面

| 路径 | 内容 |
| --- | --- |
| `/` | 英文首页（App Store 主语言） |
| `/zh/` | 简体中文首页 |
| `/privacy/`、`/zh/privacy/` | 隐私政策（App Store Connect 的隐私政策 URL 填英文版） |
| `/support/`、`/zh/support/` | 支持页（App Store Connect 的技术支持 URL 填英文版） |

共享资源在 `assets/`：`style.css`（植物 / 有机衬线风格）、`site.js`（演示窗口、手机菜单、从 GitHub Releases 取最新版本号与 dmg 链接）、`icon.png`。

## 上架后要改的

- `assets/site.js` 顶部的 `APP_STORE_URL` 与两个首页里的 `.btn.store` 链接：已填 `https://apps.apple.com/app/lightviewimagine/id6824725999`（2026-10-28 上架）；为空时所有"Mac App Store"按钮自动隐藏
- 各页 `<link rel="canonical">` 用的域名是 `https://lightviewapp.vercel.app`，绑定自定义域名后全局替换

## 本地预览

```bash
python3 -m http.server 8765
open http://127.0.0.1:8765/
```

## 部署

Vercel 导入本仓库即可，Framework Preset 选 Other，无构建命令，输出目录为根目录。`vercel.json` 已开启 cleanUrls 与安全响应头。
