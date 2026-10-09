# 大湾区活动指南

面向读者的活动资讯网站，目前收录 2026 年 9 月 30 日–10 月 7 日大湾区电音与派对活动。页面的样子与交互规则见 `AGENTS.md`，
重写到 TanStack Start 的决定与记录见 `docs/site-rewrite.md`。

## 结构

网站用 TanStack Start（React 19、Vite、TypeScript）服务端渲染，样式用 Tailwind，经 Nitro 部署为 Vercel 函数；包管理用 bun。

- `data/events.json`：活动内容的唯一编辑入口，包括阵容、时间、曲风、票务、海报和资讯更新时间。
- `src/lib/guide.server.ts`：读取 `data/events.json` 与海报清单，断言全部数据规则（未知不写占位、风格必须归类、精选与海报一一对应等），整理成页面数据；`src/lib/guide.ts` 是类型与共用的小工具，`src/lib/filters.ts` 是筛选的匹配规则。
- `src/routes/`：根文档（`__root.tsx`：头部、字体预载、内联的首屏墙样式、水合前的脚本）与首页（`index.tsx`：加载器把页面数据随页面序列化到浏览器）。
- `src/components/`：页面组件。`Page.tsx` 是整页（页眉、首屏墙舞台、日期分组、页脚、各弹层）；`FilterDock.tsx` 是吸顶筛选工具栏与已选标签（React Bits Card Nav）；`Pickers.tsx` 是场地与小类的多选弹层和日期日历；`EventRow.tsx` 是活动行与详情内容（React Bits Accordion Gallery）；`EventDetail.tsx` 是详情卡片层；`PosterPreview.tsx` 是原图预览；`Divider.tsx` 是带 Star Border 光点的分割线；`ShinyText.tsx` 是空状态标题的闪光字。
- `src/lib/glass.ts`：胶囊、圆按钮、活动行与详情卡片的镜面光（React Bits Specular Button 的 CSS 复刻，鼠标设备随指针，触屏随手机晃动）与 Chromium 上的 Glass Surface 折射，水合后启动；`src/lib/motion.ts` 是缓动曲线与动效相关的 hook。
- `src/client/hero.ts`、`src/client/topography.ts`：首屏 Drift Wall 海报墙与全页 Topography 等高线背景（含文字背后的模糊带），在水合前运行；`bun run build:client` 打包成 `public/assets/hero.js`、`topography.js`（不提交）。海报墙的排布在 `src/lib/wall.ts`。地形用 ogl，版本由 `package.json` 与 `bun.lock` 固定，采用 Unlicense。
- `src/styles/app.css`：设计令牌（Tailwind 主题）、字体、基础样式与各组件共用的配方（遮罩、细线、镜面光环、按下反馈、滚动视差与分割线的关键帧）；`src/styles/hero.css` 是首屏墙的样式，内联进页面头部。
- `public/assets/posters/`：海报原图、两档轻量版（`*.thumb.webp`、`*.thumb-400.webp`）与显示版（`*.full.webp`）；来源记录见 `sources.json`。
- `public/assets/brand/`、`public/assets/fonts/`：Logo 与 favicon，页眉的 Noto Sans SC Black 子集与 Syne（各带许可）。
- `scripts/build-posters.ts`：用 `cwebp`（Homebrew `webp`）为 `sources.json` 里的每张海报生成短边 720px 与 400px 两档 WebP 轻量版并写入 `thumbnail`、`thumbnail_small`，为 PNG、JPG 原图生成同尺寸的 WebP 显示版并写入 `full`（q90；标了 `full_lossless` 的颗粒图转无损；转出比原图大时记原图本身）；重跑不改动已生成的文件。
- `scripts/check-browser.ts`：浏览器检查，在系统 Chrome 里打开构建好的网站，检查四个宽度下的布局（`test/browser/layout.js`）、筛选、详情与原图预览。
- `test/`：数据规则、页面输出、筛选与海报墙排布的测试（`bun test`）。

地形着色器、首屏海报墙、分割线光点、空状态扫光、胶囊镜面反光与玻璃折射改编自 React Bits，其许可（MIT + Commons Clause）随站点保存在 `public/assets/react-bits.LICENSE.txt`。

## 命令

```sh
bun install
bun run dev
bun run build
bun run check:browser
```

- `bun run dev`：打包首屏墙与地形脚本后起开发服务。
- `bun run build`：先跑 `bun test`，再打包首屏墙与地形脚本、构建网站到 `.output/`；本机用 `PORT=3000 node .output/server/index.mjs` 起服务。
- `bun run check:browser`：构建之后运行浏览器检查。
- `bun run posters`：海报有增减时运行，然后再构建。

检查只证明其检查项，不代替来源核实；手机上的性能至少在 iPhone Air 模拟器里测。

## 部署

当前使用 Vercel 项目 `events`，生产分支为 `main`，域名为 https://events.cardioravers.com/。
GitHub 仓库按已确认设置保持公开。推送后由 Vercel 的 Git 集成部署：`vercel.json` 用 `bun install` 安装依赖、`bun run build` 构建，Nitro 在 Vercel 上以函数运行，页面由服务端渲染。

发布后确认部署状态、提交 SHA、线上 HTML 和资源文件一致；部署成功不等于大陆三网访问已验证。

## 数据

活动按日期分组、开场时间排序，桌面与手机共享同一份行内容。修改 `data/events.json` 后重新构建；字段中的文本均为内容，不能写入 HTML。
`public/assets/posters/sources.json` 的 `width`、`height` 记录原图像素尺寸，用于加载前预留空间与原图预览的尺寸；`thumbnail`、`thumbnail_small` 为 720px 与 400px 两档轻量版路径，`full` 为页面显示的原尺寸版本路径。
`title` 的 `region`、`topic`、`guide` 组成完整标题；地区和 `publisher` 的文字署名位于主标题下方。
这些标题字体只覆盖当前标题字符；更换标题时需重新生成字体子集。拉丁字符的标题、日期数字、开场时间、活动名与艺人名使用 `src/styles/app.css` 主题里的 `--font-display`（Syne，中文自动回退到系统字体）。所有容器（面板、卡片、提示框、口令框）统一使用 `--radius`（24px）圆角，按钮、控件与标签为全圆角胶囊；所有可点的胶囊与圆形按钮高 `--control`（40px）、文字 13px、左右 `--control-pad`（20px），内嵌小圆与图标为 `--control-inner`（24px）、距边 8px 同心（详情文字链接保持 44px 点按高度）。标题与署名组合放在顶部导航栏左侧，首屏内容区不重复；Logo 用于站点图标。
`starts` 为从午夜起算的分钟数，多时段可有多个开场时间，未知时为空。数据中不写“尚不明确”“未知”、TBA 或“DJ / MC 组合”之类的占位（构建时断言）：未知的阵容、风格、场地、地址与时间留空，页面相应不显示；只保留“暂无图片”与“当日暂无活动信息”两种状态。
`genres` 用于筛选；`stages` 记录没有落到艺人上的分厅整体风格与说明（`name` 须与艺人的 `stage` 一致）；艺人的参考风格用 `genre_sources` 逐行记录来源链接（与 `genres` 一一对应，仅供核对、页面不显示），没有来源的参考风格不收录。
`genre_families` 显式维护大类与具体风格的对应关系，构建时生成每张卡片的分类；不使用名称包含关系猜测归属。
大类为 Techno、House、Trance（含 Psytrance）、Bass（泛义低音音乐，含 Dubstep、Drum & Bass、Jungle、UK Bass、Breaks、UK Garage、Electro、Club、Gqom 等）、Hard Dance、Experimental、Open Format（Hip-Hop、R&B、Pop、Disco 等开放曲风）七类；Acid、Afro、EDM、Hypnotic、Mental、Progressive、Psychedelic 等不细化的宽泛原文标签列在 `broad_genres`，在卡片中照常显示但不参加筛选。构建时断言每个已知风格属于某一大类或 `broad_genres`。
`genre_order.families` 是筛选胶囊的大类顺序（同上）；`genre_order.genres` 是具体风格（各大类小类弹层的取值来源）的固定编辑顺序，头部参考 [IMS 2025/26 报告](https://www.internationalmusicsummit.com/news/ims-electronic-music-business-report-2025-26)的 Beatport 趋势，其余按本站选场语境排列，不表示全部风格的客观热度名次。新增风格须同步加入大类与排序。
筛选器只展示有活动的大类，Psytrance、Hard Dance / Hardcore、Drum & Bass / Jungle、UK Garage / Bassline 等分别归类。
Afro 与 Afro House、Afrobeats 不自动互换；含义未确定的原文标签保留在具体风格中。Live 等演出形式记入艺人资料。
`artists` 按演出单元记录：`names` 中每位艺人单独一行，B2B 或 DJ + MC 同组并保留 `format`；
可填写 `stage`、个人 `time`、`genres`、`genre_note` 和 `note`。
只要存在个人时段或风格，艺人区就使用小表格；整场或分厅的时间、风格不能自动复制给个人。
只有舞台／分厅分组时，以分组名作为表头并列展示，各列保留逐位艺人及 B2B 等组合关系；B2B 组合在阵容表中写成一行，两名之间为灰色小字“B2B”。
`lineup_caption` 记录演出形式、两日阵容分配等阵容整体说明；`stages` 中没有艺人对应的厅（来源只写了厅和风格、没写哪位艺人在哪个厅）在阵容区列为分厅小标题行；`crew` 记录 Deco、VJ 等幕后人员（`role`、`names`）。
`more_info` 固定按 `prices`（票价与票况）、`booking`（购票与报名）、`details`（活动详情）、
`notes`（入场说明）排列；空组隐藏。票价为 `{label, amount, note}` 对象数组（档位、金额、附注均为原文切分，无金额或无档位的留空），说明为文本数组，购票及详情使用已有的
`text`、`link`、`mini-program` 内容对象，保留币种、服务费、票档和小程序口令。
`venues` 用于活动所属场地筛选，分厅与地址保留在 `location` 中。
新增活动使用独立且稳定的 `id`；`featured` 引用不重复海报对应的活动 ID；海报墙每列循环整条列表、起点错开。
`updated_at` 只在资讯实际更新时修改，视觉调整不改变资讯时间。

当前维护方式由代理更新 JSON，Vercel 负责托管与渲染。若以后需要网页编辑或多人审核，可将内容存储迁入 Supabase，在服务端读取同一份数据。
Supabase 提供 [Vercel 集成](https://vercel.com/marketplace/supabase)；数据库后台并不自动提供面向编辑人员的完整审核流程。
