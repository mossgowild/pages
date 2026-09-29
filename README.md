# 大湾区活动指南

面向读者的静态活动页面，目前收录 2026 年 9 月 30 日–10 月 7 日大湾区电音与派对活动。

## 文件

- `data/events.json`：活动内容的唯一编辑入口，包括阵容、时间、曲风、票务、海报和资讯更新时间。
- `templates/index.html`：页面结构模板。
- `assets/site.css`：视觉与响应式布局；活动清单采用瀑布流，桌面三列、平板两列、手机单列。
- `assets/hero.css`：统一的首屏海报展台、精选活动信息与紧凑日期／统计栏。
- `scripts/hero.mjs`：海报滑动／拖动、触控板与键盘切换、自动轮播及 Three.js 金属轨道；`assets/hero.js` 为随站点发布的独立脚本。
- `scripts/build_page.py`：使用 Python 标准库生成静态首页。
- `index.html`：生成后的发布入口，不直接编辑。
- `assets/filters.js`：城市、场地、日期、曲风与开场时段的组合筛选，以及卡片高度变化后的瀑布流排布；关闭 JavaScript 后仍以常规网格展示完整清单。
- `assets/posters/`：随站点发布的海报与活动封面；来源记录见 `sources.json`。
- `assets/poster-preview.js`：卡片海报的原生遮罩预览、原位缩放过渡与放大查看。
- `assets/brand/`：供图 Logo 的单色矢量与 favicon；`youyang-ravers-mono.svg` 为 1024×1024 透明画布，使用 `currentColor`，无位图或字体依赖。
- `assets/fonts/`：标题专用的 Noto Sans SC 500/800 字重子集及 OFL 许可，随站点加载。
- 购票与活动详情跳转主办或票务平台；微信小程序入口需在微信中打开。

## 部署

当前使用 Vercel 项目 `events`，生产分支为 `main`，域名为 https://events.moss.com.im/。
GitHub 仓库按已确认设置保持公开。提交并推送生产分支后，由 Vercel 的 Git 集成部署。

`vercel.json` 跳过依赖安装，将已生成的 `index.html` 与 `assets/` 复制到 `public/` 并发布。
项目指令、模板、源数据与开发脚本不进入网站输出目录；发布前须完成下方本地检查。
`public/` 是忽略的部署产物，网站内容仍以根目录生成的 `index.html` 为准。

发布后确认部署状态、提交 SHA、线上 HTML 和资源文件一致；部署成功不等于大陆三网访问已验证。

## 更新

活动按日期分组、开场时间排序，桌面与手机共享同一份卡片内容。
卡片保留名称、艺人、风格、地点、更多信息与海报；原图、独立渐变遮罩与文字内容分三层叠放，标题和时间叠在海报底部。
海报区统一固定高度并按比例裁切，点击打开完整原图；附加图片位于右上角，遮罩不拦截点击。
原图预览不显示工具栏，支持双指／滚轮缩放、拖动、双击切换缩放和单击退出。
键盘加减号缩放、方向键移动、0 恢复全图、Esc／Enter 退出；关闭恢复焦点，横竖屏切换恢复全图。
`assets/posters/sources.json` 的 `width`、`height` 记录原图像素尺寸，用于加载前预留空间。
修改 `data/events.json` 后执行生成脚本；字段中的文本均为内容，不能写入 HTML。
`title` 的 `region`、`topic`、`guide` 组成完整标题；地区和 `publisher` 的文字署名位于主标题下方。
这些标题字体只覆盖当前标题字符；更换标题时需重新生成字体子集。标题与署名组合放在顶部导航栏左侧，首屏内容区不重复；Logo 用于站点图标。
页眉采用紧凑高度与较小标题字号；右侧依次显示“资讯更新时间”和具体时间，两行居右，左右视觉宽度相近，时间使用低调的小字号。不显示重复导航或英文期刊标记；海报展台底部不重复展示时间和全部活动入口。
清单顶部使用横向滚动日期刻度轴，窄屏仅在轴内滚动，不使用抽屉。
选择日期直接筛选下方结果；“全部日期”保留其他筛选，支持触屏、触控板和键盘左右键、Home／End。
`starts` 为从午夜起算的分钟数，多时段可有多个开场时间；部分时段未知时设置 `unknown: true`。
`genres` 用于筛选，`genre_lines` 与 `genre_notes` 保留分厅归属及风格参考说明。
`genre_families` 显式维护大类与具体风格的对应关系，构建时生成每张卡片的分类；不使用名称包含关系猜测归属。
`genre_order` 是筛选下拉的大类与具体风格固定编辑顺序；头部参考 [IMS 2025/26 报告](https://www.internationalmusicsummit.com/news/ims-electronic-music-business-report-2025-26)的 Beatport 趋势，其余按本站选场语境排列，不表示全部风格的客观热度名次。新增风格须同步加入排序。下拉均使用系统原生控件，分组标题颜色取决于系统菜单支持情况。
筛选器只展示有活动的大类，Psytrance、Hard Dance / Hardcore、Drum & Bass / Jungle、UK Garage / Bassline 等分别归类。
Afro 与 Afro House、Afrobeats 不自动互换；含义未确定的原文标签保留在具体风格中。Live 等演出形式记入艺人资料。
`artists` 按演出单元记录：`names` 中每位艺人单独一行，B2B 或 DJ + MC 同组并保留 `format`；
可填写 `stage`、个人 `time`、`genres`、`genre_note` 和 `note`。
只要存在个人时段或风格，艺人区就使用小表格；整场或分厅的时间、风格不能自动复制给个人。
只有舞台／分厅分组时，以分组名作为表头并列展示，各列保留逐位艺人及 B2B 等组合关系。
`artist_notes` 可说明两日阵容分配等整体限制。
`more_info` 固定按 `prices`（票价与票况）、`booking`（购票与报名）、`details`（活动详情）、
`notes`（入场说明）排列；空组隐藏。票价和说明为文本数组，购票及详情使用已有的
`text`、`link`、`mini-program` 内容对象，保留币种、服务费、票档和小程序口令。
`venues` 用于活动所属场地筛选，分厅与地址保留在 `location` 中。
新增活动使用独立且稳定的 `id`；`featured` 引用不重复海报对应的活动 ID，第二条为初始主海报。
展台纳入现有的不同主海报；共用总排期的活动只展示一次，未入场海报按需加载。
精选海报只在统一展台中展示，左右海报点击后移至中央，中央海报与“阵容与购票”跳转对应活动。
海报每 3 秒自动切换，左右按钮与方向键也可切换；提供暂停／继续按钮。
悬停、焦点进入交互区域或页面转入后台时暂停，恢复后重新计满 3 秒；手动切换也重置计时。
减少动态效果开启时默认暂停自动轮播，可通过继续按钮主动开启。
Three.js 只绘制装饰性轨道，不承载文字、海报或链接。
手机版海报展台左右贴边，文字信息保持页面边距；切换按钮下显示当前张数与总数。
减少动态效果设置会实时停止视差；无 WebGL 时海报和活动入口仍可使用。所有脚本和图片随站发布。
`updated_at` 只在资讯实际更新时修改，视觉调整不改变资讯时间。

本地检查：

```sh
python3 scripts/build_page.py
python3 scripts/build_page.py --check
python3 scripts/check_page.py
node scripts/check_filters.js
node scripts/check_preview.js
git diff --check
```

修改首屏脚本后执行 `bun install --frozen-lockfile`、`bun run build:hero` 和
`node scripts/check_hero.mjs`。Three.js 版本由 `package.json` 与 `bun.lock` 固定；
许可随站点保存在 `assets/three.LICENSE.txt`。日常活动数据更新不需要重新构建此脚本。

`scripts/check_layout.js` 可粘贴至浏览器控制台，在调整窗口、组合筛选或展开信息后调用 `checkLayout()`，检查卡片顺序、间距、重叠、图片比例及横向溢出。
结构检查不代替来源核实与浏览器显示检查。将数据、模板、样式、脚本与生成后的 `index.html` 一起提交。托管发布已生成的静态结果，无需运行时数据库或第三方 API。

当前维护方式由 Codex 更新 JSON，Vercel 负责托管静态结果。若以后需要网页编辑或多人审核，可将内容存储迁入 Supabase，在发布时生成相同静态页面。
Supabase 提供 [Vercel 集成](https://vercel.com/marketplace/supabase)；数据库后台并不自动提供面向编辑人员的完整审核流程。
