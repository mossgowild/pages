# 大湾区活动指南

面向读者的静态活动页面，目前收录 2026 年 9 月 30 日–10 月 7 日大湾区电音与派对活动。

## 文件

- `data/events.json`：活动内容的唯一编辑入口，包括阵容、时间、曲风、票务、海报和资讯更新时间。
- `templates/index.html`：页面结构模板。
- `assets/site.css`：视觉与响应式布局；活动清单采用瀑布流，桌面三列、平板两列、手机单列。
- `assets/hero.css`：首屏全宽海报轮播、无 WebGL2 时的回退海报列表、精选活动信息与紧凑日期／统计栏。
- `scripts/hero.mjs`：Flex Carousel 海报轮播（改编自 React Bits，ogl 绘制）、拖动、触控板横滑、点击与键盘切换及自动轮播；`assets/hero.js` 为随站点发布的独立脚本。
- `scripts/topography.mjs`：全页 Topography 等高线背景（着色器改编自 React Bits Topography）与页面顶部到日期轴的毛玻璃高斯模糊，使用 ogl 绘制；打包为 `assets/topography.js`，许可见 `assets/react-bits.LICENSE.txt`。
- `scripts/build_page.py`：使用 Python 标准库生成静态首页。
- `index.html`：生成后的发布入口，不直接编辑。
- `assets/filters.js`：城市、场地、日期、曲风与开场时段的组合筛选、日期轴的 Line Sidebar 接近效果，以及卡片高度变化后的瀑布流排布；关闭 JavaScript 后仍以常规网格展示完整清单。
- `assets/posters/`：随站点发布的海报与活动封面；来源记录见 `sources.json`。
- `assets/poster-preview.js`：卡片海报的原生遮罩预览、原位缩放过渡与放大查看。
- `assets/card-motion.js`：卡片封面滚动视差与悬停边框光。
- `assets/glass.js`：玻璃胶囊的镜面反光（React Bits Specular Button 的 CSS 复刻，桌面鼠标 250px 内随指针转向增亮）与 Chromium 上的 Glass Surface 折射（筛选面板、空状态、6 个控件与 2 个按钮，按元素尺寸生成位移图）。
- `assets/brand/`：供图 Logo 的单色矢量与 favicon；`youyang-ravers-mono.svg` 为 1024×1024 透明画布，使用 `currentColor`，无位图或字体依赖。
- `assets/fonts/`：标题专用的 Noto Sans SC 500/800 字重子集及 OFL 许可，随站点加载。
- 购票与活动详情跳转主办或票务平台；微信小程序入口需在微信中打开。

## 部署

当前使用 Vercel 项目 `events`，生产分支为 `main`，域名为 https://events.cardioravers.com/。
GitHub 仓库按已确认设置保持公开。提交并推送生产分支后，由 Vercel 的 Git 集成部署。

`vercel.json` 跳过依赖安装，将已生成的 `index.html` 与 `assets/` 复制到 `public/` 并发布。
项目指令、模板、源数据与开发脚本不进入网站输出目录；发布前须完成下方本地检查。
`public/` 是忽略的部署产物，网站内容仍以根目录生成的 `index.html` 为准。

发布后确认部署状态、提交 SHA、线上 HTML 和资源文件一致；部署成功不等于大陆三网访问已验证。

## 更新

活动按日期分组、开场时间排序，桌面与手机共享同一份卡片内容。
卡片保留名称、艺人、风格、地点、更多信息与海报；海报本身按渐变曲线由不透明淡出为透明，标题和时间叠在海报底部的淡出区。
卡片为 24px 圆角磨砂玻璃，底色 `rgb(19 19 27 / .40)`；透明度渐变加在固定的海报框上（封面有视差平移），淡出后直接露出玻璃卡片，没有另外的深色遮罩。“更多信息”中的链接与票价标签为胶囊（票价为金色调）；小程序购票口令收起时为胶囊，展开后在圆角半透明面板中显示；关闭 JavaScript 时的提示为玻璃圆角框。
允许动态效果时，主封面以顶边为基准放大 10%，随卡片在视口中的位置在海报框内纵向位移（最多遮住顶部 48px），缩略图不动；桌面精细指针悬停时，卡片边框在光标附近亮起 logo 四色光。卡片不做入场动画，直接显示。减少动态效果时不启用视差；关闭 JavaScript 时卡片按原样显示。
海报区统一固定高度并按比例裁切，点击打开完整原图；附加图片位于右上角，遮罩不拦截点击。
原图预览不显示工具栏，支持双指／滚轮缩放、拖动、双击切换缩放和单击退出。
键盘加减号缩放、方向键移动、0 恢复全图、Esc／Enter 退出；关闭恢复焦点，横竖屏切换恢复全图。
`assets/posters/sources.json` 的 `width`、`height` 记录原图像素尺寸，用于加载前预留空间。
修改 `data/events.json` 后执行生成脚本；字段中的文本均为内容，不能写入 HTML。
`title` 的 `region`、`topic`、`guide` 组成完整标题；地区和 `publisher` 的文字署名位于主标题下方。
这些标题字体只覆盖当前标题字符；更换标题时需重新生成字体子集。标题与署名组合放在顶部导航栏左侧，首屏内容区不重复；Logo 用于站点图标。
页眉采用紧凑高度与较小标题字号；右侧依次显示“资讯更新时间”和具体时间，两行居右，左右视觉宽度相近，时间使用低调的小字号。不显示重复导航或英文期刊标记；海报展台底部不重复展示时间和全部活动入口。
清单顶部的日期轴横向复刻 React Bits Line Sidebar（原版竖排旋转 90°，默认参数）：日期文字 1.1rem；间距以原版 20px 为下限，随轴宽增大到最多 40px（`assets/filters.js` 按实际项宽计算），达到上限后整组居中，放不下时保持 20px 并仅在轴内横向滚动，不使用抽屉。桌面鼠标 100px 内的日期按平滑衰减上移最多 30px 并转为品牌粉，下方 60px 标记线常显并随接近伸长变粉，日期之间有半长、半透明的灰色短刻度，始终位于间距中点；选中日期始终完全激活；触屏只点亮选中日期；减少动态效果时即时完成。
选择日期直接筛选下方结果；“全部日期”保留其他筛选，支持触屏、触控板和键盘左右键、Home／End。
`starts` 为从午夜起算的分钟数，多时段可有多个开场时间；部分时段未知时设置 `unknown: true`。
`genres` 用于筛选，`genre_lines` 与 `genre_notes` 保留分厅归属及风格参考说明。
`genre_families` 显式维护大类与具体风格的对应关系，构建时生成每张卡片的分类；不使用名称包含关系猜测归属。
`genre_order` 是筛选下拉的大类与具体风格固定编辑顺序；头部参考 [IMS 2025/26 报告](https://www.internationalmusicsummit.com/news/ims-electronic-music-business-report-2025-26)的 Beatport 趋势，其余按本站选场语境排列，不表示全部风格的客观热度名次。新增风格须同步加入排序。下拉均使用系统原生控件，分组标题颜色取决于系统菜单支持情况。
筛选面板与无结果空状态为 24px 圆角磨砂玻璃（共用 `site.css` 的 `--glass-*` 令牌），6 个控件与“清空筛选”按钮为胶囊形；展开的选项列表与日期选择器仍由系统绘制。空状态标题按 React Bits Shiny Text 默认参数循环扫光，减少动态效果时静止。
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
新增活动使用独立且稳定的 `id`；`featured` 引用不重复海报对应的活动 ID，第二条为初始居中海报。
展台纳入现有的不同主海报；共用总排期的活动只展示一次，轮播启动时载入全部精选海报。
精选海报只在首屏轮播中展示：全宽横排无限循环，卡片统一为 3:4 竖版、高为轮播区的 0.7，海报裁切铺满并随位置在卡内横向平移，两侧经液态透镜扭曲与色散；首次出现时从中心向两侧依次发开。完整海报在活动卡片的遮罩预览中查看。
点击侧边海报切到该张，点击居中海报、Enter／空格或“阵容与购票”跳转对应活动；不显示箭头、页码与播放按钮。
海报每 4 秒自动切到下一张；拖动带惯性吸附，触控板横滑或 Shift + 滚轮拨动轮播，纵向滚轮与触屏纵向滑动照常滚动页面；方向键切换，Home／End 跳到首尾。
悬停、按下、焦点在轮播上、交互后 3 秒内、轮播离开视口或页面转入后台时不自动切换。
减少动态效果开启时入场改为淡入，不自动轮播，滑动时不收缩海报。无 WebGL2 时显示可横向滚动的海报链接列表。
地形背景画布固定在全部内容之后，只作装饰，不承载文字、海报或链接。等高线按 logo 描边四色（`--brand-pink`、`--brand-yellow`、`--brand-cyan`、`--brand-violet`）循环着色；全页保持同一亮度，滚动到活动清单时不变暗；桌面鼠标附近的等高线局部抬升，触屏不响应。
从页面顶部到日期轴底部（轮播区除外），地形画布先画到纹理，再用可分离的高斯模糊（横向、纵向各一遍，逐纹素采样到 ±3σ）按像素行平滑改变半径（最强相当于 CSS `blur(6px)`），颜色不加深、不改变，只模糊背景线条、不改变布局。轮播区上下的过渡覆盖海报留白并向文字区延伸同样长度（共两倍留白），日期轴下方 14rem 渐隐，均为 smoothstep 连续过渡；位置随滚动与布局实时更新。
地形背景上的 5 处分割线（页眉底线、首屏与清单之间的顶线、日期分组标题横线、页脚顶线、“资讯更新时间”短线）改编自 React Bits Star Border：1px 中性浅灰底线两端渐隐，两颗品牌粉光点按原版参数（光斑随线长缩放、6s 线性往返、穿过时淡出）反向流动；减少动态效果时只留静态底线。卡片内部分隔与日期轴刻度不在此列。
首屏依次为日期统计、全宽轮播（桌面高 720px、手机高 480px）与精选信息；轮播在所有宽度下左右贴页面边缘，文字信息保持页面边距。
减少动态效果设置会实时停止视差并让地形背景静止；无 WebGL2 时隐藏地形背景，海报和活动入口仍可使用。所有脚本和图片随站发布。
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

修改首屏或地形脚本后执行 `bun install --frozen-lockfile`、`bun run build:hero`、`bun run build:topography` 和
`node scripts/check_hero.mjs`。ogl 版本由 `package.json` 与 `bun.lock` 固定，采用 Unlicense。
地形着色器、首屏轮播、日期轴接近效果、分割线星光、空状态扫光、胶囊镜面反光与玻璃折射改编自 React Bits，其许可（MIT + Commons Clause）随站点保存在 `assets/react-bits.LICENSE.txt`。日常活动数据更新不需要重新构建这些脚本。

`scripts/check_layout.js` 可粘贴至浏览器控制台，在调整窗口、组合筛选或展开信息后调用 `checkLayout()`，检查卡片顺序、间距、重叠、图片比例及横向溢出。
结构检查不代替来源核实与浏览器显示检查。将数据、模板、样式、脚本与生成后的 `index.html` 一起提交。托管发布已生成的静态结果，无需运行时数据库或第三方 API。

当前维护方式由 Codex 更新 JSON，Vercel 负责托管静态结果。若以后需要网页编辑或多人审核，可将内容存储迁入 Supabase，在发布时生成相同静态页面。
Supabase 提供 [Vercel 集成](https://vercel.com/marketplace/supabase)；数据库后台并不自动提供面向编辑人员的完整审核流程。
