---
module: hero-mobile
status: 已完成
shape: 分阶段
updated: 2026-10-05
---

# 首屏海报墙

## 需求澄清

### 请求：手机首屏海报墙覆盖全部精选活动

> 2026-10-04：“如果手机只能显示一列活动墙，那么这一列会覆盖所有的活动吗”“那怎么办呢”

### 已查明事实

| # | 事实 | 来源 |
| --- | --- | --- |
| F1 | 海报按顺序轮流分进各列（第 i 张进第 i mod 列数 列），每列只上下循环自己的海报；手机（375–430 宽）5 列，每列 8–9 张；墙只有各列上下漂移，不会横移（只有键盘聚焦边缘海报时横移把它带到中间） | `scripts/hero.mjs` 的 `wallLayout` 与绘制循环 |
| F2 | 实测：375 与 430 宽手机模拟，40 秒内逐秒取每张卡片落在舞台中部（去掉上下各 12% 渐隐带）的比例：第 2、3 列 16 张至少一半可见；第 4 列 8 张只露出左侧一条；第 1、5 列共 17 张始终在屏外。41 张里 17 张在手机首屏看不到，8 张只露边 | Chrome `--headless=new`（GPU）脚本 `pw/phonecols.mjs`，截图 `phone-375.png` |
| F3 | 现在手机各列转完一轮（每张海报回到同一位置）要 32–84 秒：第 2 列 32 秒、第 3 列 51 秒 | `wallLayout` 的列高与速度（42px/s × 0.55–1.45） |
| F4 | 若手机上把全部海报只分进屏内完整可见的第 2、3 列（每列 20–21 张），转完一轮约 79 秒与 136 秒；分进第 2–4 列（每列 13–14 张）约 53–92 秒，但第 4 列只露边、看不清 | 同 F3 的计算 |
| F5 | 减少动态效果时墙静止，只能看到首帧在屏内的海报；活动清单始终列出全部活动，首屏墙不是唯一入口 | `scripts/hero.mjs`；AGENTS.md 第五节 |
| F6 | 原型：整面墙在屏幕平面内斜转（CSS `rotate` 叠在原版透视倾斜外），375 宽 140 秒内中心经过屏幕中部（左右各去 10%、上下各去 18%）的海报：0° 8 张，−15°、−25°、−35°、+25° 都是 16 张（共 41 张）；斜转后屏内同时露出约 3 列，四角仍被海报铺满，1440 宽同样铺满。单靠斜转仍有约 25 张经不过中部 | 脚本 `pw/tiltcov.mjs`；对比图 [手机](hero-mobile/tilt-sheet-375.png)、[桌面](hero-mobile/tilt-sheet-1440.png) |
| F7 | 斜转后经过中部的是 2 列：若再把全部海报只分进这 2 列（其余列放复制品），每张都会经过中部，转完一轮约 79–136 秒（同 F4） | F4、F6 |
| F8 | 站内已有的海报视差（活动清单）：图片以顶边为基准放大 1.25 倍，随位置从 −20% 移到 0；减少动态效果时关闭（AGENTS.md 第五节） | `assets/site.css` 第 162 行、`assets/scroll-motion.js` |
| F9 | 首屏卡片现由 `wallLayout` 按 `tileRatio`（0.7–1.6）定高，`scripts/check_hero.mjs` 断言该规则；正方形卡片要改这两处，AGENTS.md 第五节与项目技能 `site-visual-choices` 的首屏描述随之同步 | `scripts/hero.mjs`、`scripts/check_hero.mjs`、AGENTS.md |
| F10 | 斜转 15° 后按原墙面高（1.6 倍舞台高），2560 宽时舞台沿列方向的跨度（宽·sin15° + 高·cos15°，约 801px）超过墙面投影高（约 773px），上下角会露空；墙面高改为该跨度的 1.6 倍后五种宽度四角都铺满 | `scripts/check_hero.mjs` 断言；L1 验证 |
| F11 | 每列循环全部 41 张正方形卡片时，一轮长度为 41 ×（列宽 + 18）：手机 5 列约 129–314 秒，1440 宽 6 列约 170–416 秒；屏内各列起点错开约 7–8 张，但各列速度不同，同一张海报可能同时出现在两列 | `wallLayout` 的列宽与速度计算 |

### 问答

| # | 问题 | 答复 | 影响 |
| --- | --- | --- | --- |
| Q13 | 手机上怎样让全部精选海报都能出现在首屏（F1–F5）：A 手机只把海报分进屏内看得清的中间两列，边缘列放这两列的复制品作装饰，外观与漂移不变，每张都会经过屏幕中部，但转完一轮要约 1.5–2 分钟；B 手机上整面墙缓慢左右来回平移，轮流露出全部 5 列，每列仍 8–9 张，但这偏离原版，边缘列的海报只在平移到那一侧时出现；C 手机缩小卡片让 5 列全部进屏，海报变小、回到“看不清”；D 保持现状，首屏只作氛围，完整活动看清单。推荐 A：不改外观与动效、不加交互，每张海报都会经过看得清的位置；不确定：转一轮时间较长，减少动态效果时仍只看到首帧 | “如果让照片墙有点倾斜角度会不会好一些”（2026-10-04 提问工具）：未选 A–D，提出新做法 | 需补证：原版已有 rotateX 16°、rotateY −14° 的透视倾斜；按答复理解为整面墙在屏幕平面内再斜转一个角度（列斜着穿过竖长的手机屏，屏内能截到更多列），先用原型实测不同角度下的覆盖与观感，再追问；实测见 F6–F7，追问为 Q14–Q16 |
| Q14 | 整面墙斜转多少度（对比图见 F6）：−15°（向左下斜，最轻，海报文字最好读）；−25°（斜得明显，动感更强）；−35°（最斜，文字要歪头看）；+25°（向右下斜）。推荐 −15°：覆盖与更大角度相同（F6），文字倾斜最少 | “+15吧，然后海报区域都改为正方形，海报移动的时候视差展示”（2026-10-04 提问工具） | 整面墙向右下斜转 15°；新要求：卡片改为正方形（取代第 12 题“按海报原比例定高”，各列宽度仍按倍数循环，保持第 11 题“不要每张一样大”），海报在正方形卡片内随漂移做视差移动；视差幅度沿用活动清单的做法（图片放大 1.25 倍、位移为卡片高的 20%），写进方案确认 |
| Q15 | 斜转后手机中部仍只经过 16/41 张（F6），要不要同时把海报只分进经过中部的 2 列让全部出现（F7）：同时分列（每张都会出现，转一轮约 1.5–2 分钟）；只斜转（约 25 张在手机首屏看不到中部）。推荐同时分列：这才解决“覆盖所有活动” | “只斜转”（2026-10-05 消息） | 不改分列：海报仍按顺序轮流分进各列；手机上约 25 张到不了屏幕中部，作为已知取舍写进残余风险；已被 Q19 改变 |
| Q16 | 斜转用于哪些宽度：所有宽度统一；只用于 700px 以下手机。推荐所有宽度统一：第 4 题曾定“所有宽度统一”，桌面斜转后同样铺满（F6）；分列（Q15）只在手机需要，桌面 6 列已全部可见 | “所有宽度统一”（2026-10-05 消息） | 斜转 +15°、正方形卡片与视差用于所有宽度 |
| Q17 | 怎么分层：一层完成（斜转 +15°、正方形卡片、卡内视差一起做，一次验收）；两层（L1 斜转与正方形，验收后 L2 再加视差）。推荐一层：三处都在同一个首屏组件里，改动集中，验收一次即可看到最终效果 | 待答复 | — |
| Q18 | 交付操作：完成并验收后提交并推送到 `main`（会连同此前已验收、尚未提交的首屏海报墙改动一起提交，线上随之更新）；只留在本地工作区。推荐由你决定，没有推荐：涉及线上发布 | “提交并推送 main”（2026-10-05 提问工具） | 交付：L1 验收后提交并推送 `main`，回读远端并检查线上页面；项目历史一直直接提交到 `main`，按此答复不另建 `moss/` 分支 |
| Q19 | 需求变化 | “我希望照片每列是按照一条长列表渲染的。比如第一列1-7第二列8-14，类似于无限滚动轮播图的那种原理，这样每列都可以展示所有的海报了”（2026-10-05 提问工具，L1 第二次验收时） | 取代 Q15 的“只斜转”：全部海报排成一条长列表，每列都循环整条列表、只是起点错开（第 c 列从第 c×海报数／列数 张开始，41 张 6 列时每段约 7 张），任一列循环一轮都会经过全部海报；每列一轮约 2–7 分钟（F11）；斜转、正方形、全图平移不变；方案改写后重新确认 |

### 以往：首屏轮播窄屏优化（2026-10-04）

大湾区国庆电音指南（`/Users/moss/code/pages`）：首屏海报轮播在窄屏上看不清单张海报，参照 React Bits 与 Awwwards 优化。

### 原始请求

- moss 2026-10-04 消息：“我希望优化一下轮播图，现在窄屏幕上看不清一张图。根据reactbits和awwwards来优化。”
- moss 2026-10-04 L1 验收答复（提问工具）：“这个轮播图太朴素了，还有哪些种类”——L1 未验收，要求了解其它轮播种类。

### 已查明事实

| 事实 | 来源（2026-10-04 观察） |
| --- | --- |
| 现状：首屏为 React Bits Flex Carousel 的移植（`scripts/hero.mjs` 构建为 `assets/hero.js`，ogl 绘制），“liquid”透镜预设（lensWidth 0.74、lensHeight 1.18、tilt 62°、bend 0.34、reach 0.38、dispersion 0.45），“portrait”裁切（卡片 3:4、放大 1.08），卡片高为轮播区的 0.7；轮播区桌面 720px、700px 以下 480px | `scripts/hero.mjs`、`assets/hero.css`、AGENTS.md 第五节 |
| 根因：透镜大小按屏幕宽度计算（半宽 0.37×屏宽），而卡片大小按轮播区高度计算。1440 宽时透镜的不变形区半径约 263px，大于中间卡片半宽 189px，中间海报保持平整；375 宽时不变形区半径约 68px，远小于中间卡片半宽 126px，中间海报的边角也被弯折并带色散，所以看不清。React Bits 原版同样按屏宽计算透镜，没有窄屏处理 | 代码计算与 Chrome `--headless=new`（GPU）截图 `r10/hero-now-375.png`、`hero-now-1440.png`；原版 `FlexCarousel.jsx` 第 868 行 |
| 另一个因素：41 张首屏海报中 30 张竖版、7 张方形、4 张横版，统一按 3:4 裁切；手机上中间卡片只有 252×336px | 页面数据 |
| 原型（临时脚本，未改项目文件；`r10/hero-sheet-375.png`）：A 透镜按海报尺寸缩放——取“1440 宽时中间卡片占屏宽 0.2625”的比例反推透镜跨度（跨度 = max(屏宽, 卡片宽 / 0.2625)），桌面 1440 不变，手机中间海报完全平整，两侧海报也基本不弯；B 同 A 并把手机轮播区加高到 580px，卡片 304×405；C React Bits Morph Slider 式：一次一张、几乎占满屏宽（静态示意，切换为“melt”溶解转场）；D React Bits Depth Carousel（默认参数）：前一张清晰，其余向右后方叠放，手机上按原版缩放后卡片约 187px 宽 | `proto/hero.mjs`、`pw/altmock.mjs`；React Bits 源码 `DepthCarousel.jsx`、`MorphSlider.jsx` |
| React Bits 现有 47 个组件，其中可作海报轮播或画廊的 17 个：Flex Carousel（liquid、arch、ribbon、vortex 四种透镜预设）、Circular Gallery、Circular Carousel（cylinder、orbit、wheel、panorama 四种预设）、Depth Carousel、Morph Slider、Dome Gallery、Infinite Menu、Flying Posters、Infinite Spiral、Drift Wall、Card Swap、Stack、Bounce Cards、Carousel（文字卡片）、Scroll Stack（随页面滚动叠卡）、Masonry（瀑布流）、Accordion Gallery（已用于活动清单） | GitHub API `DavidHDev/react-bits` `src/content/Components` 目录列表（2026-10-04） |
| 第二轮原型（临时页，未改项目文件）：用 React Bits 原版源码与默认参数，以站内 41 张精选海报渲染 19 种形式，只把卡片设为站内 3:4（轮播区高的 0.7），Card Swap 居中，Dome Gallery 关闭默认灰度；375 宽轮播区 578px、1440 宽 720px，各截入场后与约 6 秒两帧（`r11/sheet-375-a.png`、`sheet-375-b.png`、`sheet-1440-a.png`）。手机上：Flex Carousel 四种预设的中间海报都被弯折；Morph Slider 单张海报约占屏宽 90%、平整；Stack 与 Card Swap 顶卡约占 81%、平整，后方露出叠卡；Circular Gallery 中间海报约占 55%、两侧沿弧线弯；Depth Carousel 前卡约占 48%；Dome Gallery、Infinite Spiral、Bounce Cards 的单张海报都很小；Infinite Menu 把海报裁成圆形；Flying Posters 运动中海报扭曲；Drift Wall 为倾斜、压暗的海报墙 | `rbproto/src/e-*.jsx`、`pw/rbcat.mjs`；Chrome `--headless=new`（GPU） |
| Circular Carousel 的圆柱半径随卡片数增大（`CircularCarousel.jsx` 按卡数算弦长与弧长）：默认 10 张时 cylinder、panorama 弧度明显；换成站内全部 41 张后 cylinder、orbit、wheel 在手机上缩成一圈小图，panorama 几乎变成平直横排。首屏须覆盖全部精选海报、数量不能写死（AGENTS.md 第五节） | 源码第 221–228 行；`r11/sheet-cc41-375.png`、`sheet-cc41-1440.png` |
| 手势与无障碍（原版源码）：Morph Slider 支持拖动擦动转场进度、键盘、减少动态效果；Depth Carousel 支持拖动、横向滚轮、键盘、减少动态效果；Stack 只有拖动；Card Swap 只按时间自动切换、无拖动与键盘；Circular Gallery 支持触摸、滚轮、键盘，不处理减少动态效果；Dome Gallery 支持拖动与键盘。各组件都需按站内现有轮播的约定补齐（无 WebGL2 回退、离开视口暂停、点击居中海报跳到活动等） | `rbproto/src/*.jsx` 源码检索 |
| Awwwards 同类参考（Inspiration 元素为视频，页面文字只给标签，未逐个播放核对）：WebGL 形变或色散转场的单张滑块——Thibaut Foussard 2023（swipe）、Studio DOT 拖动形变 slider（标注 mobile）、Distortion and color channel split 转场、Beyond Studios 彩色遮罩转场；横排 WebGL 轮播——Fleava Production；3D 圆柱或拖动轮播——12 Brews of Xmas、FAO Schwarz Return to Wonder；叠卡——Driftime 交互轮播、Swag 叠卡 | https://www.awwwards.com/inspiration/webgl-slider-thibaut-foussard-2023 、https://www.awwwards.com/inspiration/slider-drag-and-drop-with-distortion-studio-dot-2 、https://www.awwwards.com/inspiration/transition-with-distortion-and-color-channel-split-effects 、https://www.awwwards.com/inspiration/carousel-beyond-studios 、https://www.awwwards.com/inspiration/webgl-portfolio-carousel-fleava-production 、https://www.awwwards.com/inspiration/infinite-carousel-with-3d-effect-12-brews-of-xmas 、https://www.awwwards.com/inspiration/3d-carousel-navigation-fao-schwarz-return-to-wonder 、https://www.awwwards.com/inspiration/interactive-carousel-driftime-r-media-2 、https://www.awwwards.com/inspiration/card-stacking-swag-2 |
| Drift Wall 原版行为（源码）：5 列，卡片 200×132、间距 18、圆角 14；整面墙 rotateX 16°、rotateY −14°、放大 1.18；各列以 42px/s 上下交替漂移，速度差 ±45%；鼠标视差最多 4.8°；所有卡片 55% 不透明度并叠 42% 暗色层；鼠标悬停或聚焦（触屏点按即聚焦）的那张浮起 64px、恢复全亮，所在列停住；边缘遮罩渐隐；减少动态效果时静止。卡片有链接时在新标签页打开，否则为按钮；每列重复自身海报以填满 1.6 倍高度，同一海报出现多次，键盘 Tab 顺序随之重复。没有“当前海报”、定时切换和点击跳到活动 | `rbproto/src/DriftWall.jsx`、`DriftWall.css` |
| Drift Wall 用站内 41 张海报（每列约 8 张）：手机 375 宽、轮播区 480px（撤回 L1 后的高度）只露出约一列半，卡片约 200px（占屏宽约 53%）且倾斜，点按后约 215px；1440 宽时 5 列墙约 1286px 宽，更宽的屏幕上铺不满。三种变体静止与点按／悬停截图：原版横向卡片（竖版海报被裁成中间横条）、竖版 3:4（200×267）保留压暗、竖版 3:4 不压暗（dim 1，暗色叠层仍在） | `r11/drift-375.png`、`r11/drift-1440.png`；`pw/driftcat.mjs` |
| 与现有首屏契约的冲突（AGENTS.md 第五节）：下方精选信息（日期·城市与“阵容与购票”）跟随居中海报、4 秒自动切换、点击居中海报跳到活动、方向键与 Home／End、无 WebGL2 回退列表、首次出现的发开动画，都以“当前海报”为前提；Drift Wall 没有当前海报，须决定怎样看清单张、怎样去活动、精选信息是否保留 | AGENTS.md 第五节；`scripts/hero.mjs` |

### 问答记录

| # | 问题 | 选项与推荐 | 答复 |
| --- | --- | --- | --- |
| 1 | 窄屏轮播怎么改（`r10/hero-sheet-375.png`） | ★B：保留已选定的 Flex Carousel（桌面不变），修正透镜根因，再把手机轮播区加高，海报宽占屏约 81%，左右仍露出相邻海报；A：只修透镜，海报尺寸不变（占 67%）；C：手机改用 Morph Slider，一次一张最清楚，但看不到相邻海报、与桌面形式不同；D：手机改用 Depth Carousel，有层次但默认参数下海报偏小 | “B 修透镜并加高 (推荐)”（moss 2026-10-04 提问工具） |
| 2 | 手机轮播区高度怎么取（`r10/hero-height.png`，均已应用 B 的透镜修正）：固定 580px——375 宽海报 304px（占屏宽 81%），320 宽海报仍 304px（占 95%，几乎看不到相邻海报，轮播区占满 320×640 屏的大半）；按屏宽 `min(580px, 154vw)`——各手机宽度海报都约占 81%（375 宽同为 304px，320 宽轮播区 493px、海报 259px） | ★按屏宽：各尺寸手机比例一致，小屏也能露出相邻海报、不占满整屏；固定 580：实现最简单，小屏海报最大 | “按屏宽计算 (推荐)”（moss 2026-10-04 提问工具） |
| 3 | L1 验收时 moss 认为手机轮播“太朴素”，窄屏轮播换成哪种形式（`r11/sheet-375-a.png`、`sheet-375-b.png`、`sheet-1440-a.png`、`sheet-cc41-375.png`） | ★A Morph Slider：单张大海报约占屏宽 90%，手指拖动即擦动 WebGL 形变转场（melt、ripple、shear、swirl 四种，带色散），4 秒自动切换；海报数量不影响效果；不露相邻海报；Awwwards 同类最多。B Stack：叠卡，顶卡约占 81%，拖动把顶卡甩到底部，触屏手感最直接；层次只靠后方卡边。C Circular Gallery：WebGL 弧形画廊，中间海报平、两侧沿弧线弯，可拖动；手机海报约占 55%，比现在小。D Dome Gallery：球面海报墙，拖动转球、点开放大单张；最不朴素，但静止时海报很小、须点开阅读。其余形式见截图：Circular Carousel 在 41 张时弧度几乎消失或海报过小，Flex Carousel 其它预设同样弯折中间海报，Card Swap 适合 3–5 张。推荐 A 的依据：手机上海报最大最清楚，拖动时有明显的形变动效，补上“朴素”的缺口，且与现在的液态透镜同属 WebGL 形变风格；不确定性：静止时只有一张平整海报、看不到相邻海报（第 1 题曾以“露出相邻海报”为 B 的优点） | 先答“A，且占满宽度”（moss 2026-10-04 提问工具），随后改为“我感觉还是用drift”（moss 2026-10-04 消息）；以修改后的为准：drift，按截图标签理解为第 16 号 React Bits Drift Wall。“占满宽度”随 A 提出，Drift Wall 本身铺满轮播区宽度，作为约束保留 |
| 4 | 新形式用于哪些宽度 | ★只换 700px 以下：平板与桌面保留已确认的 Flex Carousel，并保留 L1 的透镜按海报缩放（1440 宽画面不变，768 宽中间海报不弯）；只换 700px 以下并撤回 L1：平板恢复原透镜，768 宽中间海报重新弯折；所有宽度统一换成新形式并撤回 L1：全站一种形式，桌面也放弃 Flex Carousel。推荐依据：桌面 Flex Carousel 此前已确认且未受影响，L1 对平板的修正符合第 1 题“中间海报不弯”的目标；不确定性：平板在 L1 后同样变平，可能也被认为朴素 | “所有宽度统一”（moss 2026-10-04 提问工具）：全站换成新形式，撤回 L1，桌面也放弃 Flex Carousel |
| 5 | Drift Wall 的卡片形状与压暗（`r11/drift-375.png`、`r11/drift-1440.png`） | ★竖版 3:4（200×267）并保留原版压暗：海报完整，静止时整面墙偏暗，点按或悬停的那张提亮浮起最突出；原版横向 200×132：竖版海报被裁成中间一条横带；竖版 3:4 且不压暗：静止时更亮，选中那张不那么突出。推荐依据：海报完整，只把卡片比例改成竖版（宽度不变），其余保持原版氛围；不确定性：手机上单张海报仍只占屏宽约一半 | “竖版 3:4，不压暗”（moss 2026-10-04 提问工具）：卡片 200×267，dim 取 1，原版 42% 暗色叠层保留 |
| 6 | Drift Wall 上怎样看清单张、怎样去活动，首屏精选信息是否保留 | ★原版点亮并保留精选信息：鼠标悬停或手指点按一张海报，它提亮浮起、所在列停住，下方日期·城市与“阵容与购票”切换为这场活动，再点这张海报或“阵容与购票”跳到清单中的活动，加载时默认选中现在首屏开场的那张；点按直接跳转、去掉精选信息：悬停只提亮，点按任何海报直接跳到活动，首屏下方不再有精选活动信息（日期统计保留）；点按打开完整原图预览：点按海报打开站内现有的全屏原图预览，精选信息随之切换，经“阵容与购票”去活动。推荐依据：保留已确认的“合并精选活动信息”与“点击海报跳到活动”，不加新界面，点按即点亮与原版触屏行为一致；不确定性：桌面上精选信息会随鼠标移动切换，触屏去活动要点两次 | “点按直接跳转”（moss 2026-10-04 提问工具）：悬停只提亮（原版），点按任何海报直接跳到清单中的活动；首屏下方不再有精选活动信息，日期统计保留 |
| 7 | L2 验收时 moss 认为“太过于透明了，看不清图片了”，海报墙怎样降低透明度（`r13/op-375.png`、`r13/op-1440.png`，实际页面注入样式、减少动态效果下同一帧对比；原版遮罩为“上方 60% 线性渐隐 × 四周椭圆渐隐（78%×82%，40% 以内不透明）”，卡片另叠 42% 暗色层） | A 去掉上方线性渐隐、保留四周椭圆渐隐：中部海报不再透明，四周仍渐隐并露出等高线，卡片仍偏暗；★B 在 A 的基础上去掉卡片 42% 暗色叠层：海报原色、最清楚，四周仍柔和渐隐；C 保留原版渐隐、墙后加与页面同色的深色底（上下边缘渐变融入页面）：等高线不再透过海报，但渐隐处海报变暗，整体最暗；D 去掉全部渐隐与暗色叠层：海报完全不透明，墙在首屏区域边界硬切。推荐 B 的依据：直接解决“透明、看不清”，同时保留原版四周渐隐的氛围；不确定性：四周仍会露出等高线 | “B 去上方渐隐与暗层 (推荐)”（moss 2026-10-04 提问工具）：只保留四周椭圆渐隐，去掉上方线性渐隐与卡片 42% 暗色叠层 |
| 8 | moss 要求“上下还是要一些渐隐，过渡不要生硬”，并去掉首屏与“活动清单”之间的分割线；上下渐隐带取多宽（`r15/fade-375.png`、`r15/fade-1440.png`：实际页面注入样式，四周椭圆渐隐不变，叠加一条上下对称的线性渐隐，三档均已去掉分割线；该分割线是 `assets/site.css` 的 `.schedule::before` Star Border，`scripts/check_layout.js` 第 32 行断言它存在） | 上下各 12%：边界不再硬切，渐隐最短，中部不透明区最大；★上下各 20%：过渡明显柔和，中部 60% 高度不透明；上下各 30%：最柔和，但上下两排海报大半变淡、透出等高线。推荐 20% 的依据：在不重回“太透明”的前提下消除硬切；不确定性：手机 480px 高时上下各约 96px 渐隐 | “上下各 12%”（moss 2026-10-04 提问工具）；分割线按 moss 消息去掉 |
| 9 | moss 认为首屏日期统计块“有些冗余”，怎样精简（`r17/stats-375.png`、`r17/stats-1440.png`；块内“2026”“09.30 — 10.07”“57 场活动 · 05 座城市 · 08 天”在页面其他位置都有：页脚为“2026 / 09.30 — 10.07 · 粤港澳大湾区”，筛选栏显示“57 场”，清单按日期分组逐日列出，城市在筛选面板；首屏上只有日期范围是其他地方没有的） | A 整块去掉：页眉下直接是海报墙，日期范围只在页脚与清单日期中出现；★B 只留日期范围“09.30 — 10.07”：去掉年份、场数、城市数与天数；C 日期范围加城市数：去掉年份、场数与天数。推荐 B 的依据：去掉全部重复项，同时保留首屏上唯一不重复、对首次访问者有用的活动期间；不确定性：若 moss 认为“国庆”已足以说明期间，A 更简洁 | “A 整块去掉”（moss 2026-10-04 提问工具）：页眉下直接是海报墙，日期范围只在页脚与清单日期中出现 |
| 10 | moss 认为“海报墙得在往下延伸一些，现在和活动清单的距离太大”，向下延伸多少（`r19/gap-375.png`、`r19/gap-1440.png`：实际页面注入样式；现在舞台下外边距 24px 加清单上内边距 44px，共 68px 空隙，手机 22 + 32 = 54px，海报墙底部还有 12% 渐隐；三档都把舞台加高 X、下外边距减 X，“活动清单”位置不变） | E1 延伸到标题上方留 16px（桌面加高 52px、手机 38px）；★E2 延伸到标题所在区块的上沿（桌面加高 68px、手机 54px），渐隐尾部正好落到标题上方；E3 再伸到标题后面 40px（桌面加高 108px、手机 94px），标题压在渐隐的海报上。推荐 E2 的依据：空隙消失而海报不压到标题文字；不确定性：E3 的层叠感更强，但标题背后有海报，可读性略降 | “E2 延伸到标题上沿 (推荐)”（moss 2026-10-04 提问工具）：桌面舞台加高 68px、手机 54px，下外边距相应减少，“活动清单”位置不变 |
| 11 | moss 认为“海报是固定宽度的，导致宽屏上的海报过多了”，宽屏上怎样让海报变大变少（`r21/zoom-sheet.png`：同一脚本原型、实际页面、减少动态效果下对比 1440、1920、2560 宽；现在卡片固定 200px，列数随屏宽增加，1920 宽 10 列、2560 宽 13 列；三档都是“超过某个宽度后整面墙等比放大、列数不再增加”，卡片、间距、圆角与浮起一起放大，手机与平板不变） | ★Z1440：1440 宽及以下不变，更宽时等比放大，各宽屏都是 1440 宽时的 8 列构图（1920 宽放大 1.33 倍，2560 宽 1.78 倍）；Z1200：1200 宽起放大，1440 宽变为 7 列、海报大 1.2 倍；Z1024：1024 宽起放大，1440 宽变为 6 列、海报大 1.41 倍。推荐 Z1440 的依据：只改 moss 指出的宽屏，1440 宽保持此前看过的样子，任何宽屏的疏密都与 1440 一致；不确定性：若 1440 宽也嫌海报多，应选 Z1200 或 Z1024；补充布局（moss 追问后，`r21/layout-sheet.png`，1920 与 2560 宽）：限宽居中——海报墙最宽 1440px 居中，两侧按原版椭圆渐隐露出背景，海报大小与数量同 1440 宽；固定列数拉大间距——始终 1440 宽时的 8 列，海报保持 200px，列间距随屏宽拉开，画面更疏朗 | 先答“有其他的布局方案吗”（moss 2026-10-04 提问工具），补充两种布局后重问，答“8列太多了，然后然后我不希望每张图都一样大”（moss 2026-10-04 提问工具）：四个选项都未选；新约束——桌面列数要少于 8，海报大小不要全部一样 |
| 12 | 桌面列数少于 8、海报大小不一，用哪种做法（`r22/mix-1440.png`、`r22/mix-375.png`，同一脚本原型、实际页面、减少动态效果下对比；三种都把桌面卡片基准宽从 200px 加到 270px，1440 宽 6 列，更宽的屏幕等比放大、保持 6 列构图，手机基准宽仍 200px） | 列宽不一：各列宽度按 1.3、0.85、1.15、0.75、1.4、0.95、1.1、0.8 倍循环，卡片仍为 3:4；按海报原比例：列宽相同，每张卡片按海报自身宽高比（限制在 0.7–1.6 之间）定高度，横版短、竖版长，裁切最少；★两者结合：列宽不一且按原比例定高，大小变化最丰富、海报最完整。推荐两者结合的依据：同时满足“不一样大”与看清海报；不确定性：构图最不规则，若 moss 想要更整齐的节奏应选列宽不一 | “两者结合 (推荐)”（moss 2026-10-04 提问工具）：列宽不一且按海报原比例定高；桌面基准宽 270px（1440 宽 6 列），1440 宽以上等比放大，手机基准宽 200px |

### 形态判定

- 涉及视觉与交互方案选择（④ 不满足），改动影响首屏渲染脚本与构建产物；伴随页面适用。结论：分阶段处理。

#### 依据：首屏轮播现状

- `scripts/hero.mjs`（源）→ `bun run build:hero` → `assets/hero.js`；检查 `node scripts/check_hero.mjs`。
- AGENTS.md 第五节规定首屏为 Flex Carousel、手机轮播区 480px、卡片 3:4 等，改动后同步。
- 首屏标记：`templates/index.html` 的 `#spotlight` 依次为日期统计行、`.hero-stage`（WebGL 画布，`.hero-reel` 海报链接列表作无 WebGL2 回退）、`#hero-help` 键盘说明、`.hero-editorial` 精选信息（`scripts/build_page.py` 生成 `hero_details`，含 `.hero-event-link.spotlight-card`）与 `.hero-status` 播报。
- 地形背景（`assets/topography.js`）按 `.hero-stage` 的上下边界给轮播区留出不模糊的范围，改动须保留该元素。
- 锚点：`assets/filters.js` 在 `hashchange` 时若目标被筛选隐藏则静默清空，另在加载时给 `.spotlight-card` 逐个绑定点击；`assets/accordion.js` 在 `hashchange` 时展开目标行。
- `scripts/check_layout.js` 第 172–185 行断言首屏：舞台贴两侧、WebGL 画布或海报列表、无箭头与页码、纵向滚动可达、精选日期与“阵容与购票”同行；`scripts/check_hero.mjs` 测旧轮播的卷轴几何、精选信息同步与回退。
- ogl 仍由地形背景（`scripts/topography.mjs`）使用；Drift Wall 是 CSS 3D，首屏不再需要 ogl。

## 实现方案

### 首屏 Drift Wall 海报墙

- 首屏只有一面铺满宽度的 React Bits Drift Wall 海报墙，所有宽度同一形式（第 4 题、Q16）。
- 几何：卡片基准宽桌面与平板 270px、手机 200px，各列宽按 1.3、0.85、1.15、0.75、1.4、0.95、1.1、0.8 倍循环；卡片为正方形（Q14，取代第 12 题按海报比例定高），海报按卡片裁切铺满；列数取 5 与盖过屏宽所需列数中的较大者（1440 宽 6 列），更宽的屏幕整面墙等比放大（第 11–12 题）。
- 姿态：原版透视倾斜（rotateX 16°、rotateY −14°、放大 1.18）之外，整面墙以中心为轴在屏幕平面内向右下斜转 15°（Q14）；墙面高取斜转后舞台沿列方向跨度的 1.6 倍，四角由海报铺满（F10）。
- 运动：全部海报排成一条长列表，每列都循环整条列表、起点错开（第 c 列从第 c×海报数／列数 张起，Q19），各列上下交替漂移（原版速度 42、速度差 0.45）；海报在卡片内不裁切、按原比例铺满卡宽（横版铺满卡高），卡片中心从舞台顶到舞台底的过程中竖版由顶部平移到底部、横版由左到右，经过舞台一次即展现整张海报（L1 修改要求）。减少动态效果时墙静止、无视差；离开视口或页面隐藏时停止。
- 外观：卡片不压暗、原色；遮罩为四周椭圆渐隐叠加上下各 12% 线性渐隐；舞台桌面 788px、手机 534px，延伸到“活动清单”标题上沿；首屏没有日期统计、精选信息与分割线（第 5–10 题）。
- 交互：鼠标悬停（仅可悬停设备）或键盘聚焦的海报提亮浮起、所在列停住；点按或点击任何海报跳到清单中的活动并展开，被筛选隐藏时静默清空筛选；键盘 Tab 只经过每张海报一次并把它带到中部；无脚本时显示横向海报链接列表。
- 已知取舍：每列一轮约 2–7 分钟，同一张海报可能同时出现在两列（F11）。

## 执行记录

### 本任务：首屏海报墙斜转、正方形卡片与卡内视差

- 确认：“确认”（2026-10-05 提问工具，按 Q19 改写后的方案）


#### 目标与范围

- 目标：整面墙在屏幕平面内向右下斜转 15°，卡片改为正方形（列宽仍不一），海报在卡片内随漂移平移展现全图，每列都循环全部海报（起点错开），用于所有宽度（Q14、Q16、Q19）。
- 不做：不改精选名单、遮罩、舞台高度、交互方式、漂移速度、活动清单与筛选；不新增依赖。
- 须遵守：Q14、Q16–Q19（Q15 已被 Q19 改变）；第 4–12 题中未被取代的决定；AGENTS.md 第五节其余首屏契约。

#### 层

1. L1 斜转、正方形、全图平移与整条列表
  - 内容：`scripts/hero.mjs` 的平面变换加 15° 屏幕平面斜转，墙面按斜转后范围加长；`wallLayout` 卡片高改为列宽（正方形），删去 `tileRatio`；每列的海报改为整条列表（全部海报按顺序，第 c 列从第 round(c × 海报数 ÷ 列数) 张起循环），每张海报只有一个可聚焦副本（在起始段包含它的那一列）；绘制循环按卡片中心在舞台中的上下位置平移整张海报（竖版纵向、横版横向），减少动态效果时不设；`assets/hero.css` 在允许动态效果时让海报按原比例铺满卡宽（横版铺满卡高）；`bun run build:hero` 重建 `assets/hero.js`；`scripts/check_hero.mjs` 改为断言正方形与斜转后的覆盖；AGENTS.md 第五节与 README 的首屏说明同步。
  - 验收：375、768、1440、1920、2560 宽海报墙向右下斜 15°、四角铺满、卡片正方形且大小不一；海报漂过舞台一次即从顶平移到底（横版从左到右）；每列一轮都包含全部海报、各列起点错开；悬停、点按跳转、筛选隐藏目标、键盘聚焦、触屏按住不停墙照旧；减少动态效果时静止无视差；无脚本列表照旧；页面无横向溢出。
  - 验证：`node scripts/check_hero.mjs`、`python3 scripts/build_page.py --check`、`python3 scripts/check_page.py`、`node scripts/check_filters.js`、`git diff --check`；Chrome `--headless=new`（GPU）五种宽度截图、四角命中、手机 9 处点按与桌面 9 处悬停后点击、键盘（Tab 只经过每张海报一次）、减少动态效果、无脚本；`check_hero.mjs` 断言每列包含全部海报且起点错开；`checkLayout()`（既有日期弹层问题除外）；内置浏览器打开本地页面供验收。
  - 依据：Q14、Q16、Q17、Q19、F6、F9、F10、F11

#### 交付

- 操作：L1 验收后把本轮及此前已验收、未提交的首屏海报墙改动（含工作文档 `docs/workflow/hero-mobile.md` 及附件、项目技能 `.claude/skills/site-visual-choices`）按 Conventional Commits 提交到 `main` 并推送，回读远端 SHA，等部署后检查 https://events.cardioravers.com/ 的首屏；旧工作流生成的 `docs/workflow/hero-mobile.html` 已过时，不提交（Q18）。

#### 收尾

- 学习：L1 中已写入项目技能 `site-visual-choices` 与全局技能 `global-preferences`（见 L1 面板）；任务结束复查：最后一次验收为“接受”、无新的纠正，代理记忆里没有与首屏相关的条目，无新增

#### 残余风险

- 每列循环一轮约 2–7 分钟，同一张海报可能同时出现在两列（F11）。
- 斜转后键盘聚焦的横移沿倾斜方向，聚焦海报的落点可能略偏，验证时核对。


### L1 斜转、正方形、全图平移与整条列表（已完成）

- 改动（按 Q19 改写后的方案，在此前两次修改的基础上）：`scripts/hero.mjs` 的 `wallLayout` 让每列都排全部海报（第 c 列从第 round(c × 海报数 ÷ 列数) 张起），每张海报只在起始段所在列有一个可聚焦副本；漂移偏移改为保持在半条列表以内（`wrap`），复制份数相应减为 ⌈墙面高 ÷ 列表长⌉ + 1；每列开场时起始海报在舞台顶部；远离舞台、不可聚焦的复制品设为不渲染（每列都排全部海报后卡片从约 100 张增到约 400–500 张，CPU 降速 4 倍时帧率从 60 掉到约 36，不渲染远处复制品后回到 60）；去掉卡片内层的 `translateZ(0)`；`scripts/check_hero.mjs` 改为断言每列从各自起点循环全部海报、每张海报全墙只有一个可聚焦副本、覆盖与焦点在新的偏移范围内；AGENTS.md、README 同步
- 验证：`node scripts/check_hero.mjs`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check` 通过；Chrome `--headless=new`（GPU）：五种宽度斜转、正方形、四角铺满、无横向溢出；冻结画面后把隐藏的复制品强制显示再截图，375、1440、2560 宽三个时刻逐字节相同，768 宽两个时刻有细微字节差、目视相同（隐藏的都是越过视点、不在画面内的卡片）；帧率（CPU 降速 4 倍）手机与 1440 宽均 60；屏内海报随位置平移；手机 9 处点按、768–2560 宽 9 处悬停后点击全部正确；键盘 Tab 1440 宽 41 张全部落在中部、375 宽 39 张；减少动态效果静止；无脚本列表；`checkLayout()` 四种宽度 × 两种动态设置全部通过

- 修改要求：“视差效果遵循从上到下，从左到右”（2026-10-05 提问工具）；按此理解为卡内视差加上横向：海报以左上角为基准放大 1.25 倍，卡片在舞台越靠下露出海报越靠下的部分、越靠右露出越靠右的部分（上下、左右各 0 到 −20%）

- 改动：`scripts/hero.mjs` 平面变换加 `rotate(15deg)`（以墙面中心为轴）；卡片高等于列宽（正方形），删去 `tileRatio` 与海报比例读取，`wallLayout` 改为按海报数量排布；墙面高改为斜转后舞台沿列方向的跨度 × 1.6（新增 `turnedReach`、`planeHeight`；宽度变化也重建）；绘制时按每张卡片在舞台中的上下位置设置图片 `translate`（舞台底 −20% 到顶 0），减少动态效果时清除；`assets/hero.css` 在允许动态效果时给卡片图片以顶边为基准放大 1.25 倍；重建 `assets/hero.js`；`scripts/check_hero.mjs` 改为断言正方形、斜转后覆盖四角与新的墙面高；AGENTS.md 第五节、README 同步
- 验证：`node scripts/check_hero.mjs`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check` 通过；Chrome `--headless=new`（GPU）375、768、1440、1920、2560 宽：斜转 15°、卡片正方形、舞台 10%／90% 四角与中心都落在海报上、无横向溢出，屏内海报的视差位移随漂移变化；手机 9 处点按与 768／1440／1920／2560 宽 9 处悬停后点击全部跳到对应活动；键盘 Tab 1440 宽 41 次停留 41 张不重复且全部落在中部，375 宽 41 张中 39 张落在中部 60% 范围内（2 张在边缘，仍在屏内）；减少动态效果时墙静止、图片不放大不位移；无脚本时 41 张海报列表；`checkLayout()` 1440、1024、768、375 宽 × 两种动态设置全部通过
- 修改后改动：`scripts/hero.mjs` 按各列在舞台中的左右位置给图片横向位移（舞台左缘 0 到右缘 −20%，与纵向同时生效）；`assets/hero.css` 放大基准改为左上角；AGENTS.md、README 同步
- 修改后验证：屏内卡片的位移随位置变化——1440 宽从左到右 0、−4%、−8%、−12%、−16%，从上到下 0 到约 −17%；375 宽屏内两列为 0 与 −10%；上述脚本检查、五种宽度点按与悬停点击、键盘、减少动态效果、无脚本与 `checkLayout()` 复跑全部通过
- 修改要求：“视差效果不够明显，我希望在滚动到视口时能够完全滚动展现出海报全部内容”（2026-10-05 提问工具）；按此改为：卡片内海报按原比例铺满卡宽（横版铺满卡高），卡片从舞台顶漂到舞台底的过程中，竖版海报由顶部平移到底部、横版海报由左到右平移，经过舞台一次即完整展现整张海报（取代 1.25 倍放大与列位置决定的横向位移）；减少动态效果时仍按卡片裁切、静止
- 第二次修改后改动：`scripts/hero.mjs` 去掉 1.25 倍放大与按列位置的横向位移，给每张海报记下高宽比（`--ratio`，横版加 `is-wide`）与溢出比例，绘制时按卡片中心在舞台中的上下位置平移整段溢出（竖版纵向、横版横向）；`assets/hero.css` 在允许动态效果时让海报按原比例铺满卡宽（横版铺满卡高）；AGENTS.md（含“首屏海报按卡片比例裁切”一句）、README 同步
- 第二次修改后验证：海报尺寸按原比例（如 230 宽卡片里 1.15 比例海报 230×263、横版 0.43 比例 540×230），位移随卡片位置从 0 到整段溢出（1440 宽 1.50 比例海报在舞台 81% 处 −25.7%，横版在 52% 处 −32.6%）；手机截图海报文字完整可读；脚本检查、五种宽度点按与悬停点击、键盘、减少动态效果（按卡片裁切、静止）、无脚本与 `checkLayout()` 复跑全部通过
- 学习：写入项目技能 `site-visual-choices`（首屏卡片改正方形；卡内视差要明显到展现整张海报，1.25 倍小幅被判不够明显；每列按一条长列表循环全部海报、起点错开，不按列轮流分配；海报变多后不渲染远处复制品并以 CPU 降速 4 倍对比帧率；斜转后墙面须按斜转后范围加长）；写入全局技能 `global-preferences`（`serve-docs.mjs` 须以真实路径运行，经符号链接运行会静默退出；越过透视视点的元素 `getBoundingClientRect` 无意义，核对隐藏元素用冻结动画后的截图对比）
- 验收：“接受”（2026-10-05 提问工具）

### 以往：首屏轮播窄屏优化（2026-10-04）

#### 原头部记录

```yaml
schema_marker: moss-workflow-doc
schema_version: 1
workflow_id: pages-hero-mobile-20261004
topic_key: hero-mobile
revision: 51
content_digest: 5af1118168fca319b64f04def3e6971db06d312760a9e171976a33cfc63614bb
document_shape: staged
document_state: 已完成
terminal_disposition: delivered
companion_requirement: required
companion_path: docs/workflow/hero-mobile.html
proposal:
  revision: 45
  verified: true
layers:
- id: L7
  title: 首屏海报墙少列、大小不一（列宽不一，按海报原比例定高）
  deps: []
  state: 已完成
  direction: 保留 L6 的实现；列宽按倍数循环、卡片高按海报自身宽高比（0.7–1.6）；桌面基准宽 270px（1440 宽 6 列），1440 宽以上整面墙等比放大，手机基准宽 200px（第 11–12 题）
  result_digest: 2631d098b47793bfa39710b1ed20693abbdb068fa8aba3831476831523e8f67e
  acceptance:
    source: moss 2026-10-04 提问工具答复“L7 验收通过”
    accepted_result_digest: 2631d098b47793bfa39710b1ed20693abbdb068fa8aba3831476831523e8f67e
    kind: completion
archived_layers:
- id: L6
  title: 首屏海报墙延伸到活动清单标题上沿
  final_state: 需调整
  result_digest: cf9a89cba09bba43254ba0ca2d4bc0d79d1c2b4b359598a9779e78010de4575b
  archived_in_revision: 45
  reason: L6 未验收，moss 认可向下延伸，但要求宽屏上海报不要过多、列数少于 8、海报大小不一（第 11–12 题选列宽不一与原比例结合）；L6 的实现保留在工作区，由 L7 在其上修改后整体交付
- id: L5
  title: 首屏只留 Drift Wall 海报墙（去掉日期统计块）
  final_state: 需调整
  result_digest: 1d4ad9f29a535827965148e4a755085bc7b309883c3a3f182be151ad18fa63f8
  archived_in_revision: 36
  reason: L5 验收未通过（moss“海报墙得在往下延伸一些，现在和活动清单的距离太大”），第 10 题选 E2；L5 的实现保留在工作区，由 L6 在其上修改后整体交付
- id: L4
  title: 首屏 Drift Wall 海报墙（上下柔和渐隐，去掉首屏下方分割线）
  final_state: 需调整
  result_digest: 659fa5c809aaaf613e9d4f54651a53b0149efbff10a912692fab8ef8ab21d1f0
  archived_in_revision: 30
  reason: L4 未验收，moss 认为首屏日期统计块冗余，第 9 题选 A 整块去掉；L4 的实现保留在工作区，由 L5 在其上修改后整体交付
- id: L3
  title: 首屏 Drift Wall 海报墙（全部宽度，中部不透明）
  final_state: 需调整
  result_digest: 9e854aa2f7953be45e78fe4cb68537dc0ed824efd54305bc028641d1b572560f
  archived_in_revision: 24
  reason: L3 验收提问被关闭未作答，moss 随后要求去掉首屏下方分割线、上下保留柔和渐隐（第 8 题选上下各 12%）；L3 的实现保留在工作区，由 L4 在其上修改后整体交付
- id: L2
  title: 首屏改为 Drift Wall 海报墙（全部宽度）
  final_state: 需调整
  result_digest: 627a1081bac415bcf3ec39ee34d0ef274fa1f835a8dff47694fdba1be52af628
  archived_in_revision: 18
  reason: L2 验收未通过（moss“太过于透明了，看不清图片了”），第 7 题选 B；L2 的实现保留在工作区，由 L3 在其上去掉上方渐隐与暗色叠层后整体交付
- id: L1
  title: 窄屏轮播：透镜按海报缩放、手机轮播区加高
  final_state: 需调整
  result_digest: 69fb088c46e62901db8b15585fadc3ba249f4c00a239325363aa81cdf88d2cb9
  archived_in_revision: 12
  reason: L1 验收未通过（moss“这个轮播图太朴素了，还有哪些种类”），第 3–6 题改为全站 Drift Wall；L1 的透镜缩放与手机 154vw 高度由 L2 整体替换
last_write:
  id: r51
  owner: finalize
  next_step: 报告
  verified: true
```

### 历史：方案修订 4 与 L1（修订 12 起归档）

- L1 窄屏轮播：
  - `scripts/hero.mjs`：新增导出 `lensSpan(width, cardW)` = `max(width, cardW / 0.2625)`（常量注明来源：1440×900 时中间卡片宽 378px 占屏宽 0.2625）；绘制时以跨度代替屏宽计算透镜半宽、半高与流动量；透镜着色器新增 `uSpan`，侧向系数 `reachX` 改为相对跨度计算；`bun run build:hero` 生成 `assets/hero.js`。
  - `assets/hero.css`：700px 以下 `.hero-stage` 高 480px 改为 `min(580px,154vw)` 并注明 81% 的由来。
  - `scripts/check_hero.mjs`：新增 `lensSpan` 断言（1440 宽、378px 卡片时跨度等于屏宽；375 宽、304px 卡片时跨度约 1160）。
  - 文档：AGENTS.md 第五节与 README 的首屏说明改为“手机高 min(580px, 154vw)、透镜按海报尺寸缩放”。
  - 验证：`bun run build:hero`、`node scripts/check_hero.mjs`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check`；Chrome `--headless=new`（GPU）1440 改前改后截图比对，768／375／320 截图（含自动轮播过渡中与减少动态效果），`checkLayout()` 四种宽度。
- 实现组合：

```text
diagram_kind: implementation_tree
L1: scripts/hero.mjs (change: lensSpan export, span-based lens uniforms, uSpan in the lens shader)
    assets/hero.js (rebuild)
    assets/hero.css (change: phone stage height)
    scripts/check_hero.mjs (change: lensSpan assertions)
    AGENTS.md, README.md (sync)
```

- 确认边界：确认本方案（修订 4）只释放 L1；只做本地验收，不提交、不推送、不发布。
- 修订 4 已获确认：moss 2026-10-04 提问工具答复“确认修订 4”；L1 已释放。
- L1 结果回写（修订 6）：
  - 实际修改：`scripts/hero.mjs`——新增常量 `REFERENCE_CARD_SHARE = 0.2625`（注明 1440×900 时中间卡片 378px 的来源）与导出 `lensSpan(width, cardW) = max(width, cardW / 0.2625)`；绘制时透镜半宽、半高按跨度计算，透镜着色器新增 `uSpan`，`reachX` 相对跨度计算；`bun run build:hero` 重建 `assets/hero.js`。`assets/hero.css`：700px 以下 `.hero-stage` 高 `min(580px,154vw)` 并注明 81% 的由来。`scripts/check_hero.mjs`：`lensSpan` 三条断言（1440 宽跨度等于屏宽、不窄于屏宽、375 宽 304.5px 卡片跨度约 1160）。AGENTS.md 第五节、README 首屏说明同步。
  - 验证（2026-10-04）：`node scripts/check_hero.mjs`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check` 通过。Chrome `--headless=new`（GPU）：1440 宽减少动态效果画面与改前逐像素一致（0 / 4262400 像素差异）；768 宽差异 31.4%，即中间海报不再弯折（预期变化）；375、320 宽中间海报无弯折、无色散，轮播区 577.5px、492.8px，海报约 303px、259px；375 宽自动轮播过渡帧中海报平整可读。拖动、方向键、自动轮播（8.5 秒内切换 2 次）、点击居中海报跳到对应活动，在 375 与 1440 宽与改前结果完全一致（`pw/heroact.mjs`）。`checkLayout()` 四种宽度 × 两种动态设置：仅 768、375 宽开启动态效果时“日期弹层打开后卡片留在屏内”失败，换回改前首屏文件同样失败，属既有问题（已另开任务），其余全部通过。内置浏览器 375 宽模拟：轮播区 577.5px、WebGL 正常、加载新 `hero.js`。
  - 取舍（方案事实表已列）：手机上透镜跨度约为屏宽 3 倍，屏幕内基本看不到弯折；相邻海报各露出约 24px 窄边。
  - 结果摘要：`69fb088c46e62901db8b15585fadc3ba249f4c00a239325363aa81cdf88d2cb9`（`git diff --binary HEAD` 覆盖 `scripts/hero.mjs`、`assets/hero.js`、`assets/hero.css`、`scripts/check_hero.mjs`、AGENTS.md、README.md）。
- L1 验收未通过，转需调整（修订 7）：moss 2026-10-04 提问工具答复“这个轮播图太朴素了，还有哪些种类”。被推翻的前提：方案 B 只修透镜并加高，手机屏内基本看不到透镜弯折、两侧只露约 24px 窄边，moss 判为太朴素。L1 的代码改动仍留在工作区、未回滚，去留随新方案决定。需重新澄清：可选的轮播种类（React Bits 与 Awwwards 参考）及其适用宽度。
- 修订 12 归档 L1：第 3–6 题改为全站 Drift Wall，L1 的透镜缩放与手机 154vw 高度由 L2 整体替换，工作区中的 L1 改动在 L2 实施时被覆盖。

### 方案（修订 12）

- L2 首屏改为 Drift Wall 海报墙（全部宽度）：
  - 标记与构建：`scripts/build_page.py` 不再生成 `hero_details`，首屏海报链接（`.hero-poster`，指向 `#event-id`）加 `spotlight-card` 类；`templates/index.html` 删去 `#hero-help`、精选信息区与 `.hero-status`，`.hero-stage` 去掉“轮播”角色描述，保留“精选活动海报”标签与海报链接列表。
  - 行为：`scripts/hero.mjs` 整体改为 Drift Wall 的原生 JS 移植（替换 Flex Carousel 与 ogl 代码），`bun run build:hero` 生成 `assets/hero.js`。从 `.hero-reel` 的链接建墙；列数取 5 与“放大 1.18 倍后墙宽盖过舞台宽度”所需列数中的较大者；海报按原版 `i % columns` 分列，每列按原版公式循环复制到舞台高的 1.6 倍以上；每张海报第一份是原链接（可聚焦），复制品设 `aria-hidden` 与 `tabindex=-1`，仍可点按跳转。参数取原版默认：间距 18、圆角 14、tilt 16°、turn −14°、roll 0、perspective 1200、depth 120、speed 42、向上、variance 0.45、parallax 0.6、lift 64、fade 0.6、暗色叠层 #060010（42%）；卡片 200×267、dim 1（第 5 题）。悬停（指针移动加 elementFromPoint）与键盘聚焦让海报提亮浮起并停住该列；减少动态效果时静止、无视差；舞台离开视口或页面隐藏时停止动画帧；舞台尺寸变化时重算列数与复制数。
  - 样式：`assets/hero.css` 把 DriftWall.css（遮罩、透视平面、列、卡片与提亮态）移植到 `.hero-stage`；舞台高桌面 720px、700px 以下 480px（撤回 L1）；删除画布、精选信息与旧轮播样式；保留无脚本时的横向海报链接列表；舞台下方沿用原精选信息区的底部间距（24px，手机 22px）。
  - 筛选联动：`assets/filters.js` 的 `.spotlight-card` 点击改为文档级事件委托，使海报墙复制出的卡片在目标被筛选隐藏时同样静默清空。
  - 检查：`scripts/check_hero.mjs` 改测列数（375、1440、1920 宽）、分列与复制数、复制品不进入焦点顺序、从链接建墙；`scripts/check_layout.js` 首屏断言改为舞台贴两侧、海报墙或链接列表存在、可聚焦海报数等于精选数、纵向滚动可达、无精选信息区。
  - 文档：AGENTS.md 第五节首屏段与 README 首屏说明改为 Drift Wall 的形式、交互、回退与高度。
  - 验证：上述脚本与 `git diff --check`；Chrome `--headless=new` 在 375、768、1440、1920 宽截图（静止、悬停或点按、减少动态效果）；点按与键盘跳到活动并展开（含被筛选隐藏的目标）；`checkLayout()` 四种宽度 × 两种动态设置；内置浏览器 375 宽实看。
- 实现组合：

```text
diagram_kind: implementation_tree
L2: templates/index.html (change: hero keeps stats and the poster link list; remove carousel help, featured details, status)
    scripts/build_page.py (change: drop hero_details; poster links get spotlight-card)
    scripts/hero.mjs (replace: Drift Wall port that builds columns from the poster links)
      assets/hero.js (rebuild)
    assets/hero.css (change: Drift Wall styles, stage 720/480px, remove carousel and detail styles)
    assets/filters.js (change: delegated spotlight-card clicks)
    scripts/check_hero.mjs (rewrite: wall layout and build checks)
    scripts/check_layout.js (change: hero assertions)
    AGENTS.md, README.md (sync hero description)
```

- 依赖：只有 L2，无前置层。
- 确认边界：确认本方案（修订 12）只释放 L2；只做本地验收，不提交、不推送、不发布。
- 修订 12 已获确认：moss 2026-10-04 提问工具答复“确认修订 12”；L2 已释放。
- L2 结果回写（修订 14）：
  - 实际修改：`scripts/hero.mjs` 整体改为 Drift Wall 原生移植（导出 `columnCount`、`wallLayout`、`initHero`，不再引用 ogl），`bun run build:hero` 重建 `assets/hero.js`（约 70 KB 降到 4.5 KB）；`assets/hero.css` 移植原版样式，舞台高 720px、700px 以下 480px、下方间距 24px（手机 22px），删除画布、精选信息与旧轮播样式；`templates/index.html` 删去键盘说明、精选信息区与播报；`scripts/build_page.py` 不再生成 `hero_details`，海报链接加 `spotlight-card`，`index.html` 随之重建；`assets/filters.js` 精选卡片点击改为文档级事件委托；`scripts/check_hero.mjs` 重写，`scripts/check_layout.js` 首屏断言改为海报墙；AGENTS.md 第五节与 README 同步。
  - 实现中补充（均为落实已确认验收所需）：原版各列轨道从墙顶对齐，41 张海报分成 8–9 张不等的列时，短列在某些漂移位置铺不到画面下沿，改为每条轨道以中线对齐墙的中线并多复制一份；每张海报只有一份可聚焦，取漂移时能到达墙中线的那一份；键盘聚焦时所在列把海报移到中间高度，墙只横移到海报落入原版遮罩不渐隐的中部（78% 宽椭圆的 40% 以内）所需的距离；聚焦环用原版浮起海报上的白色描边，墙内去掉站内通用的金色外框（否则会框住未浮起的卡片位置）；舞台与墙被聚焦带动的滚动立即复位。
  - 自查发现并已修正：聚焦最左列时整面墙移到正中、左半边空出 → 改为最小横移；金色外框与白色焦点环重复 → 去掉外框；防滚动复位会误伤无脚本时可横滑的海报列表 → 只作用于舞台与墙本身。
  - 验证（2026-10-04）：`node scripts/check_hero.mjs`（41 张；列数 375／768／1440／1920 宽为 5／5／8／10，均盖过屏宽；轮流分列；每列在任何漂移位置都铺满；每张海报恰一份可聚焦且能移到中线）、`bun run build:hero`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check` 通过。Chrome `--headless=new`（GPU）：375、768、1440、1920 宽 × 是否减少动态效果，海报墙均生成，可聚焦海报都是 41 张，页面无横向溢出、无脚本错误。桌面悬停一张海报时该列停住、其余列继续漂移，点击跳到 `#event-23` 并展开；先用城市筛选隐藏目标，再点它的循环复制品，筛选被静默清空、目标显示并展开；键盘 Tab 聚焦的海报提亮浮起、位于舞台内、舞台与墙未被滚动，Enter 跳到活动并展开；手机点按跳到手指下那张海报的活动；减少动态效果时轨道与视差静止；关闭 JavaScript 时显示 41 个海报链接的横向列表。`checkLayout()` 四种宽度 × 两种动态设置：仅 768、375 宽开启动态效果时日期弹层一项失败，与改动前相同（既有问题，已另开任务），其余全部通过。内置浏览器手机尺寸与 400px 窄窗口实看：海报墙正常显示与漂移。
  - 视觉提示：原版的上方与边缘渐隐让海报墙半透明，站内地形等高线会透过海报显示（上方与左右两侧最明显）；第 5 题比较用的原型页是纯色背景，没有这一效果。
  - 实现组合（实际）：

```text
diagram_kind: implementation_tree
L2: templates/index.html (change: hero keeps stats and the poster link list)
    scripts/build_page.py (change: drop hero_details; poster links get spotlight-card)
      index.html (rebuild)
    scripts/hero.mjs (replace: Drift Wall port; exports columnCount, wallLayout, initHero)
      assets/hero.js (rebuild)
    assets/hero.css (change: Drift Wall styles, stage 720/480px)
    assets/filters.js (change: delegated spotlight-card clicks)
    scripts/check_hero.mjs (rewrite: wall layout checks)
    scripts/check_layout.js (change: hero assertions)
    AGENTS.md, README.md (sync hero description)
```

  - 结果摘要：`627a1081bac415bcf3ec39ee34d0ef274fa1f835a8dff47694fdba1be52af628`（`git diff --binary HEAD` 覆盖上列 11 个文件）。
- L2 验收未通过，转需调整（修订 15）：moss 2026-10-04 提问工具答复“太过于透明了，看不清图片了”。被推翻的约束：意图中“边缘按原版渐隐”——原版上方与边缘的遮罩渐隐让海报墙半透明，站内等高线透过海报显示，海报看不清。L2 的代码改动保留在工作区。需重新澄清：降低透明度的方式（渐隐范围、墙后底色、卡片暗色叠层）。
- 修订 18 归档 L2：第 7 题选 B，L2 的实现保留在工作区，由 L3 在其上修改后整体交付。

### 方案（修订 18）

- L3 首屏 Drift Wall 海报墙（全部宽度，中部不透明）：
  - 沿用 L2 已实现的全部改动（`scripts/hero.mjs` 的 Drift Wall 移植、`assets/hero.css`、`templates/index.html`、`scripts/build_page.py` 与重建的 `index.html`、`assets/filters.js` 事件委托、`scripts/check_hero.mjs`、`scripts/check_layout.js`、AGENTS.md 与 README）。
  - 透明度（第 7 题 B）：`assets/hero.css` 的 `.drift-wall` 遮罩只保留原版四周椭圆渐隐（78%×82%，40% 以内不透明），去掉上方线性渐隐；去掉卡片的 42% 暗色叠层——`scripts/hero.mjs` 不再生成 `.drift-wall__overlay`，`assets/hero.css` 删除其样式，提亮态只保留浮起、饱和度与阴影；重建 `assets/hero.js`。键盘聚焦“移到未渐隐中部”的判定沿用同一椭圆，不变。
  - 文档：AGENTS.md 第五节与 README 中“边缘渐隐、42% 暗色叠层”改为“只保留四周椭圆渐隐（去掉上方渐隐与暗色叠层，第 7 题）”。
  - 验证：`node scripts/check_hero.mjs`、`bun run build:hero`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check`；Chrome `--headless=new` 在 375、768、1440、1920 宽截图（静止、悬停、键盘聚焦、减少动态效果），确认中部海报不透出等高线；重跑悬停、点击、筛选隐藏目标、键盘、手机点按、减少动态效果、无脚本与 `checkLayout()` 四种宽度 × 两种动态设置；内置浏览器实看。
- 实现组合：

```text
diagram_kind: implementation_tree
L3: templates/index.html (change: hero keeps stats and the poster link list)
    scripts/build_page.py (change: drop hero_details; poster links get spotlight-card)
      index.html (rebuild)
    scripts/hero.mjs (replace: Drift Wall port without the tile overlay)
      assets/hero.js (rebuild)
    assets/hero.css (change: Drift Wall styles with the elliptical fade only, stage 720/480px)
    assets/filters.js (change: delegated spotlight-card clicks)
    scripts/check_hero.mjs (rewrite: wall layout checks)
    scripts/check_layout.js (change: hero assertions)
    AGENTS.md, README.md (sync hero description)
```

- 依赖：只有 L3，无前置层。
- 确认边界：确认本方案（修订 18）只释放 L3；只做本地验收，不提交、不推送、不发布。
- 修订 18 已获确认：moss 2026-10-04 提问工具答复“确认修订 18”；L3 已释放。
- L3 结果回写（修订 20）：
  - 实际修改：在 L2 改动之上，`assets/hero.css` 的 `.drift-wall` 遮罩只保留原版四周椭圆渐隐（去掉上方线性渐隐），删除 `.drift-wall__overlay` 及其提亮态样式；`scripts/hero.mjs` 不再生成暗色叠层，注释注明第 5、7 题；重建 `assets/hero.js`（4.4 KB）；AGENTS.md 第五节与 README 改为“只保留四周椭圆渐隐、原色”。L2 的其余实现（结构、交互、检查脚本、文档）不变。
  - 验证（2026-10-04）：`node scripts/check_hero.mjs`、`bun run build:hero`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check` 通过。Chrome `--headless=new`（GPU）：375、768、1440、1920 宽 × 是否减少动态效果，海报墙均生成（5／5／8／10 列，41 张可聚焦），无横向溢出、无脚本错误；截图中中部海报不透明、原色，等高线只在四周渐隐处露出；首屏区域上下边界处的海报被直接截断（B 方案预期，第 7 题截图已示）。悬停停列、点击跳到 `#event-23` 并展开、点被筛选隐藏目标的复制品后静默清空并展开、键盘 Tab 聚焦提亮并位于舞台内、Enter 跳转、手机点按跳转、减少动态效果静止、无脚本列表全部通过。`checkLayout()` 四种宽度 × 两种动态设置：仅 768、375 宽开启动态效果时日期弹层一项失败（既有问题，已另开任务），其余通过。
  - 结果摘要：`9e854aa2f7953be45e78fe4cb68537dc0ed824efd54305bc028641d1b572560f`（`git diff --binary HEAD` 覆盖 11 个文件，同 L2 的文件范围）。
- L3 未验收，转需调整（修订 21）：L3 验收提问被 moss 关闭未作答；随后 moss 2026-10-04 消息（附内置浏览器截图，箭头指向首屏海报墙与“活动清单”之间的横线）：“这个分割线不要了，然后上下还是要一些渐隐，过渡不要生硬”。被推翻的约束：第 7 题 B 的“只保留四周椭圆渐隐、首屏区域上下边界直接截断”；AGENTS.md 第五节“地形背景上的 4 处分割线”中的“首屏与清单之间的顶线”。L3 的代码改动保留在工作区。需重新澄清：上下渐隐的范围与强度。
- 修订 24 归档 L3：第 8 题选上下各 12%，分割线去掉；L3 的实现保留在工作区，由 L4 在其上修改后整体交付。

### 方案（修订 24）

- L4 首屏 Drift Wall 海报墙（上下柔和渐隐，去掉首屏下方分割线）：
  - 沿用 L3 已实现的全部改动（Drift Wall 移植、四周椭圆渐隐、去掉暗色叠层、首屏结构与筛选联动、检查脚本与文档）。
  - 上下渐隐（第 8 题）：`assets/hero.css` 的 `.drift-wall` 遮罩改为“四周椭圆渐隐（原版 78%×82%，40% 以内不透明）× 上下对称线性渐隐（`transparent → #000 12% … #000 88% → transparent`）”取交集；键盘聚焦把海报移到中间高度，位于不透明区内，判定不变。
  - 去掉分割线：`assets/site.css` 的 Star Border 分割线去掉 `.schedule::before`（含减少动态效果与打印规则），并去掉 `.schedule` 只为该分割线保留的透明上边框；页眉底线、日期分组标题横线、页脚顶线不变；`scripts/check_layout.js` 不再要求 `.schedule::before` 分割线，改为断言首屏与清单之间没有分割线。
  - 文档：AGENTS.md 第五节与 README 改为“地形背景上的 3 处分割线（页眉底线、日期分组标题横线、页脚顶线）”，并注明首屏海报墙“四周椭圆渐隐、上下各 12% 线性渐隐”。
  - 验证：`node scripts/check_hero.mjs`、`bun run build:hero`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check`；一次性本地服务加 Chrome `--headless=new` 在 375、768、1440、1920 宽截图（静止、悬停、键盘聚焦、减少动态效果），确认上下不硬切、中部不透明、分割线消失；重跑悬停、点击、筛选隐藏目标、键盘、手机点按、减少动态效果、无脚本与 `checkLayout()` 四种宽度 × 两种动态设置。
- 实现组合：

```text
diagram_kind: implementation_tree
L4: templates/index.html (change: hero keeps stats and the poster link list)
    scripts/build_page.py (change: drop hero_details; poster links get spotlight-card)
      index.html (rebuild)
    scripts/hero.mjs (replace: Drift Wall port without the tile overlay)
      assets/hero.js (rebuild)
    assets/hero.css (change: Drift Wall styles, elliptical fade with 12% top and bottom fades, stage 720/480px)
    assets/site.css (change: no Star Border divider between the hero and the schedule)
    assets/filters.js (change: delegated spotlight-card clicks)
    scripts/check_hero.mjs (rewrite: wall layout checks)
    scripts/check_layout.js (change: hero and divider assertions)
    AGENTS.md, README.md (sync hero and divider description)
```

- 依赖：只有 L4，无前置层。
- 确认边界：确认本方案（修订 24）只释放 L4；只做本地验收，不提交、不推送、不发布。
- 修订 24 已获确认：moss 2026-10-04 提问工具答复“确认修订 24”；L4 已释放。
- L4 结果回写（修订 26）：
  - 实际修改：在 L3 改动之上，`assets/hero.css` 的 `.drift-wall` 遮罩改为“四周椭圆渐隐 × 上下各 12% 线性渐隐”取交集；`assets/site.css` 去掉 `.schedule::before` 分割线（含减少动态效果与打印规则）及 `.schedule` 的透明上边框；`scripts/check_layout.js` 改为断言首屏与清单之间没有分割线；AGENTS.md 与 README 改为 3 处分割线、上下各 12% 渐隐。
  - 实现中发现并修正（落实“点击任何海报跳到活动”所需）：鼠标悬停让海报浮起后，Chrome 的 3D 命中测试把这张海报原来的位置判给轨道，悬停后再点击不跳转（L2、L3 的测试因悬停的恰好不是同一张而漏掉）。`scripts/hero.mjs` 改为：高亮每帧按指针位置重新判定（列在静止指针下漂移时高亮也跟着换），命中空洞时保持当前高亮；点击落在空洞上时打开当前高亮的海报。原版浮起层不可点的设定保留。
  - 验证（2026-10-04）：`node scripts/check_hero.mjs`、`bun run build:hero`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check` 通过。一次性本地服务加 Chrome `--headless=new`（GPU）：375、768、1440、1920 宽 × 是否减少动态效果，海报墙均生成（5／5／8／10 列，41 张可聚焦），无横向溢出、无脚本错误；截图中上下边界柔和渐隐、不再硬切，中部不透明，首屏下方分割线已消失。桌面 1440 宽在 3×3 共 9 个位置悬停后点击，打开的都是高亮的那张；悬停停列、点击筛选隐藏目标的复制品、键盘 Tab 与 Enter、手机点按、减少动态效果、无脚本列表全部通过。`checkLayout()` 四种宽度 × 两种动态设置：仅 768、375 宽开启动态效果时日期弹层一项失败（既有问题，已另开任务），其余通过（含新断言“首屏与清单之间没有分割线”）。原 55101／55102 后台预览服务已在时限到达时自动停止，本轮改用随脚本启停的一次性服务。
  - 结果摘要：`659fa5c809aaaf613e9d4f54651a53b0149efbff10a912692fab8ef8ab21d1f0`（`git diff --binary HEAD` 覆盖 12 个文件：L3 的 11 个加 `assets/site.css`）。
- L4 未验收，转需调整（修订 27）：L4 验收时 moss 先要求“打开预览我看看”（已在内置浏览器打开 127.0.0.1:55101 并滚到顶部），随后 moss 2026-10-04 消息在预览中选中首屏日期统计块 `.hero-edition`（“2026”“09.30 — 10.07”“57 场活动 · 05 座城市 · 08 天”）：“这个地方感觉有些冗余”。被推翻的约束：第 6 题所选项中的“日期统计保留”。L4 的代码改动保留在工作区。需重新澄清：首屏日期统计块怎样精简。
- 修订 30 归档 L4：第 9 题选 A，L4 的实现保留在工作区，由 L5 在其上修改后整体交付。

### 方案（修订 30）

- L5 首屏只留 Drift Wall 海报墙（去掉日期统计块）：
  - 沿用 L4 已实现的全部改动（Drift Wall 移植、四周椭圆渐隐加上下各 12% 渐隐、去掉暗色叠层、首屏下方无分割线、点击兜底与每帧高亮、首屏结构与筛选联动、检查脚本与文档）。
  - 去掉统计块（第 9 题 A）：`templates/index.html` 删去 `.hero-edition`；`scripts/build_page.py` 删去只供该块使用的 `city_count`、`day_count`（`event_count`、`edition_year`、`date_range` 仍用于筛选栏与页脚，保留），重建 `index.html`；`assets/hero.css` 删去 `.hero-edition`、`.hero-period`、`.hero-coverage` 及其手机与打印规则。页眉与海报墙之间沿用现有间距（首屏上内边距 34px 加舞台上外边距 16px；手机 24px 加 14px），与第 9 题截图一致。
  - 文档：AGENTS.md 第五节与 README 改为“首屏只有海报墙，不设日期统计（期间见页脚，场数见筛选栏）”。
  - 验证：`node scripts/check_hero.mjs`、`bun run build:hero`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check`；一次性本地服务加 Chrome `--headless=new` 在 375、768、1440、1920 宽截图首屏，确认统计块消失、页眉与海报墙间距正常；重跑海报墙交互、点击位置抽测与 `checkLayout()` 四种宽度 × 两种动态设置；内置浏览器实看。
- 实现组合：

```text
diagram_kind: implementation_tree
L5: templates/index.html (change: hero keeps only the poster wall and its link list)
    scripts/build_page.py (change: drop hero_details and the stats-only fields; poster links get spotlight-card)
      index.html (rebuild)
    scripts/hero.mjs (replace: Drift Wall port without the tile overlay)
      assets/hero.js (rebuild)
    assets/hero.css (change: Drift Wall styles and fades, no stats block, stage 720/480px)
    assets/site.css (change: no Star Border divider between the hero and the schedule)
    assets/filters.js (change: delegated spotlight-card clicks)
    scripts/check_hero.mjs (rewrite: wall layout checks)
    scripts/check_layout.js (change: hero and divider assertions)
    AGENTS.md, README.md (sync hero description)
```

- 依赖：只有 L5，无前置层。
- 确认边界：确认本方案（修订 30）只释放 L5；只做本地验收，不提交、不推送、不发布。
- 修订 30 已获确认：moss 2026-10-04 提问工具答复“确认修订 30”；L5 已释放。
- L5 结果回写（修订 32）：
  - 实际修改：在 L4 改动之上，`templates/index.html` 删去 `.hero-edition`；`scripts/build_page.py` 删去只供该块的 `city_count`、`day_count`，重建 `index.html`；`assets/hero.css` 删去统计块样式，打印时整段首屏不输出；AGENTS.md 第五节与 README 改为“首屏只有海报墙，不设日期统计（期间见页脚，场数见筛选栏）”。
  - 实现中发现并修正（落实“点按或点击任何海报跳到活动”所需）：手机上多处点按落在轨道或墙面上不跳转——墙面、列、轨道与海报卡片同处一个平面，Chrome 的 3D 命中测试会把点在海报上的点击判给它们（L4 的“浮起后点击落空”也是同一原因）。`assets/hero.css` 改为只有海报卡片参与命中测试（墙面、列、轨道 `pointer-events:none`），L4 加的点击兜底随之删除；高亮每帧按指针位置重新判定保留（列在静止指针下漂移时高亮跟着换）。
  - 验证（2026-10-04）：`node scripts/check_hero.mjs`、`bun run build:hero`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check` 通过。一次性本地服务加 Chrome `--headless=new`（GPU）：375、768、1440、1920 宽 × 是否减少动态效果，统计块消失、页眉下直接是海报墙（舞台顶部 375 宽 106px、其余 122px），海报墙 5／5／8／10 列、41 张可聚焦，无横向溢出、无脚本错误。手机 375 宽在 3×6 个位置命中测试全部落在海报上（修正前 18 个点里 12 个落空），3×3 个位置点按全部跳到活动（其中 2 处因该列正在漂移、点按时跳到交界另一侧的海报）；桌面 3×3 个位置悬停后点击，打开的都是高亮的那张。悬停停列、点击筛选隐藏目标的复制品、键盘 Tab 与 Enter、减少动态效果、无脚本列表全部通过。`checkLayout()` 四种宽度 × 两种动态设置：仅 768、375 宽开启动态效果时日期弹层一项失败（既有问题，已另开任务），其余通过。
  - 结果摘要：`1d4ad9f29a535827965148e4a755085bc7b309883c3a3f182be151ad18fa63f8`（`git diff --binary HEAD` 覆盖 12 个文件，同 L4 的范围）。
- L5 验收未通过，转需调整（修订 33）：moss 2026-10-04 提问工具答复“感觉海报墙得在往下延伸一些，现在和活动清单的距离太大”。被推翻的约束：方案中“舞台下方沿用原精选信息区的底部间距（24px，手机 22px）”与舞台高度 720／480px。L5 的代码改动保留在工作区。需重新澄清：海报墙向下延伸多少、是否伸到“活动清单”标题后面。
- 修订 36 归档 L5：第 10 题选 E2，L5 的实现保留在工作区，由 L6 在其上修改后整体交付。

### 方案（修订 36）

- L6 首屏海报墙延伸到活动清单标题上沿：
  - 沿用 L5 已实现的全部改动（Drift Wall 移植与渐隐、去掉暗色叠层、首屏只有海报墙、无分割线、只有海报参与命中测试与每帧高亮、首屏结构与筛选联动、检查脚本与文档）。
  - 延伸（第 10 题 E2）：`assets/hero.css` 的 `.hero-stage` 桌面高 788px（720 + 68）、下外边距 −44px，700px 以下高 534px（480 + 54）、下外边距 −32px；负值等于 `.schedule` 的上内边距（`assets/site.css` 桌面 44px、手机 32px），使海报墙底边落在“活动清单”标题区块上沿、标题位置不变，样式中注明这一对应关系。海报墙按新高度重算列与复制数（现有 `wallLayout` 与尺寸监听，无需改脚本）。
  - 文档：AGENTS.md 第五节与 README 中舞台高度改为“桌面 788px、700px 以下 534px，向下延伸到活动清单标题上沿”。
  - 验证：`node scripts/check_hero.mjs`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check`；一次性本地服务加 Chrome `--headless=new` 在 375、768、1440、1920 宽截图首屏到筛选栏，确认海报墙底边与标题区块上沿对齐、标题文字未被遮挡；重跑海报墙交互、点按与悬停点击抽测、`checkLayout()` 四种宽度 × 两种动态设置；内置浏览器实看。
- 实现组合：

```text
diagram_kind: implementation_tree
L6: templates/index.html (change: hero keeps only the poster wall and its link list)
    scripts/build_page.py (change: drop hero_details and the stats-only fields; poster links get spotlight-card)
      index.html (rebuild)
    scripts/hero.mjs (replace: Drift Wall port without the tile overlay)
      assets/hero.js (rebuild)
    assets/hero.css (change: Drift Wall styles and fades, stage 788/534px reaching the schedule heading)
    assets/site.css (change: no Star Border divider between the hero and the schedule)
    assets/filters.js (change: delegated spotlight-card clicks)
    scripts/check_hero.mjs (rewrite: wall layout checks)
    scripts/check_layout.js (change: hero and divider assertions)
    AGENTS.md, README.md (sync hero description)
```

- 依赖：只有 L6，无前置层。
- 确认边界：确认本方案（修订 36）只释放 L6；只做本地验收，不提交、不推送、不发布。
- 修订 36 已获确认：moss 2026-10-04 提问工具答复“确认修订 36”；L6 已释放。
- L6 结果回写（修订 38）：
  - 实际修改：在 L5 改动之上，`assets/hero.css` 的 `.hero-stage` 桌面高 788px、下外边距 −44px，700px 以下高 534px、下外边距 −32px，注释注明负值等于 `site.css` 中 `.schedule` 的上内边距；AGENTS.md 第五节与 README 的舞台高度同步。脚本未改，海报墙按新高度自动重算。
  - 验证（2026-10-04）：`node scripts/check_hero.mjs`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check` 通过。一次性本地服务加 Chrome `--headless=new`（GPU）：375、768、1440、1920 宽海报墙底边与“活动清单”标题区块上沿逐像素对齐（375 宽均为 640px，其余均为 910px），标题文字未被遮挡（命中测试落在标题上）；海报墙 5／5／8／10 列、41 张可聚焦，无横向溢出、无脚本错误。悬停停列与点击、筛选隐藏目标、键盘 Tab 与 Enter、手机点按、减少动态效果、无脚本列表全部通过；手机 9 处点按全部跳转（2 处因列在漂移跳到交界另一侧的海报），桌面 9 处悬停后点击全部打开高亮的那张。`checkLayout()` 四种宽度 × 两种动态设置：仅 768、375 宽开启动态效果时日期弹层一项失败（既有问题，已另开任务），其余通过。
  - 结果摘要：`cf9a89cba09bba43254ba0ca2d4bc0d79d1c2b4b359598a9779e78010de4575b`（`git diff --binary HEAD` 覆盖 12 个文件，同 L5 的范围）。
- L6 未验收，转需调整（修订 39）：moss 2026-10-04 提问工具答复“可以，但是海报是固定宽度的，导致宽屏上的海报过多了，优化一下”——认可向下延伸，要求宽屏上海报不要过多。被推翻的约束：卡片固定 200×267、列数随屏宽增加（第 5 题问题文字所述“屏幕更宽时会增加列数把墙铺满”）。L6 的代码改动保留在工作区。需重新澄清：宽屏上怎样让海报变大变少。
- 修订 45 归档 L6：第 11–12 题选“列宽不一与原比例结合”，L6 的实现保留在工作区，由 L7 在其上修改后整体交付。

### 方案（修订 45）

- L7 首屏海报墙少列、大小不一：
  - 沿用 L6 已实现的全部改动（Drift Wall 移植与渐隐、去掉暗色叠层、首屏只有海报墙并延伸到清单标题上沿、无分割线、只有海报参与命中测试与每帧高亮、首屏结构与筛选联动、检查脚本与文档）。
  - 布局（第 11–12 题）：`scripts/hero.mjs` 的布局改为——卡片基准宽：舞台宽大于 700px 时 270px，否则 200px；第 c 列宽为基准宽 × [1.3, 0.85, 1.15, 0.75, 1.4, 0.95, 1.1, 0.8] 循环中的第 c 个倍数；列内每张卡片高为列宽 × 海报自身高宽比（限制在 0.7–1.6，超出部分按原版方式裁切）；列数为不少于 5、且投影宽度盖过舞台宽度加一个基准宽所需的最少列数；舞台宽大于 1440px 时，按 1440 宽计算布局并把整面墙放大“舞台宽 / 1440”倍（卡片、间距、圆角、浮起一同放大）。每列循环复制与中线对齐、每张海报恰一份可聚焦、键盘聚焦移到中部的做法不变，只是按各卡片实际高度累计位置。海报宽高从首屏海报链接里图片的 width／height 读取。
  - 检查：`scripts/check_hero.mjs` 改测新布局——375、768、1440 宽的列数（1440 宽为 6），1920、2560 宽的放大倍数与 6 列构图，列宽倍数循环、卡片高按比例且受 0.7–1.6 限制，每列在任何漂移位置都铺满，每张海报恰一份可聚焦且能移到中线。
  - 文档：AGENTS.md 第五节与 README 中卡片尺寸改为上述规则。
  - 验证：`node scripts/check_hero.mjs`、`bun run build:hero`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check`；一次性本地服务加 Chrome `--headless=new` 在 375、768、1440、1920、2560 宽截图；重跑海报墙交互、手机点按与桌面悬停点击抽测、键盘、减少动态效果、无脚本与 `checkLayout()` 四种宽度 × 两种动态设置；内置浏览器实看。
- 实现组合：

```text
diagram_kind: implementation_tree
L7: templates/index.html (change: hero keeps only the poster wall and its link list)
    scripts/build_page.py (change: drop hero_details and the stats-only fields; poster links get spotlight-card)
      index.html (rebuild)
    scripts/hero.mjs (replace: Drift Wall port with mixed column widths, poster-ratio tiles and wide-screen scaling)
      assets/hero.js (rebuild)
    assets/hero.css (change: Drift Wall styles and fades, stage 788/534px reaching the schedule heading)
    assets/site.css (change: no Star Border divider between the hero and the schedule)
    assets/filters.js (change: delegated spotlight-card clicks)
    scripts/check_hero.mjs (rewrite: mixed-size wall layout checks)
    scripts/check_layout.js (change: hero and divider assertions)
    AGENTS.md, README.md (sync hero description)
```

- 依赖：只有 L7，无前置层。
- 确认边界：确认本方案（修订 45）只释放 L7；只做本地验收，不提交、不推送、不发布。
- 修订 45 已获确认：moss 2026-10-04 提问工具答复“确认修订 45”；L7 已释放。
- L7 结果回写（修订 47）：
  - 实际修改：在 L6 改动之上，`scripts/hero.mjs` 的布局改为基准宽（桌面与平板 270px、手机 200px）× 列宽倍数循环、卡片高按海报高宽比（0.7–1.6），列数为不少于 5 且投影盖过屏宽再多一个基准宽的最少列数，屏宽超过 1440px 时按 1440 宽布局并整面墙放大“屏宽 / 1440”倍；导出 `baseWidth`、`wallZoom`、`columnCount`、`tileRatio`、`wallLayout`；海报宽高取自首屏链接中图片的 width／height；键盘聚焦按卡片实际高度累计定位、横移按放大倍数换算。`assets/hero.css` 去掉列宽与卡片高的固定值（改由脚本按列、按卡片设置）；重建 `assets/hero.js`。`scripts/check_hero.mjs` 改为检查新布局。AGENTS.md 第五节与 README 同步。
  - 验证（2026-10-04）：`node scripts/check_hero.mjs`（41 张；375／768 宽 5 列，1440 宽 6 列，1920、2560 宽放大 4/3、16/9 倍并保持 6 列；列宽倍数循环；卡片高按比例且受 0.7–1.6 限制；每列在任何漂移位置都铺满；每张海报恰一份可聚焦且能移到中线）、`bun run build:hero`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check` 通过。一次性本地服务加 Chrome `--headless=new`（GPU）：375、768、1440、1920、2560 宽 × 是否减少动态效果，海报墙 5／5／6／6／6 列、41 张可聚焦，无横向溢出、无脚本错误；海报墙底边仍与“活动清单”标题区块上沿对齐；悬停停列与点击、筛选隐藏目标、键盘 Tab 与 Enter、减少动态效果、无脚本列表通过；手机 9 处点按与桌面 9 处悬停后点击全部打开对应海报。`checkLayout()` 四种宽度 × 两种动态设置：仅 768、375 宽开启动态效果时日期弹层一项失败（既有问题，已另开任务），其余通过。
  - 结果摘要：`63c80c11a4389c91f4a71c18cc0a2563fd01aa144e3f42a45bbb96933a7c8161`（`git diff --binary HEAD` 覆盖 12 个文件，同 L6 的范围）。
- L7 同层修正（修订 48）：moss 2026-10-04 提问工具答复“触屏下，mousedown会导致活动墙图片暂停，这是非预期行为”。原因（源码）：指针移动的高亮判定与聚焦提亮对所有指针类型生效，手指按下、移动或点按聚焦都会让所在列停住；与第 6 题“悬停只提亮（鼠标），点按直接跳转”不符。修正范围：高亮、停列与视差只响应鼠标指针，聚焦提亮只在键盘聚焦时发生；其余不变。
- L7 修正结果回写（修订 49）：
  - 实际修改：`scripts/hero.mjs` 的指针移动处理只在“鼠标指针且设备主输入可悬停（`(hover: hover)`）”时更新高亮、停列与视差；聚焦提亮只在键盘聚焦（`:focus-visible`）时发生，失焦复位也只针对键盘聚焦；重建 `assets/hero.js`。AGENTS.md 与 README 补充“仅在可悬停的设备上，触屏按住或点按不会让墙停住”。
  - 复现与验证（2026-10-04）：手机模拟（点按以鼠标事件送达，内置浏览器手机预设即如此）下鼠标按住海报墙，修正前 5 列中 1 列停住、1 张提亮，修正后 0 列停住、0 张提亮；真实触摸事件按住与移动时 5 列全部继续漂移；桌面 1440 宽鼠标悬停仍停住所在列。`node scripts/check_hero.mjs`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check` 通过；悬停与点击、筛选隐藏目标、键盘、手机 9 处点按、桌面 9 处悬停后点击、减少动态效果、无脚本列表全部通过；`checkLayout()` 结果同前（仅既有日期弹层一项）。
  - 结果摘要：`2631d098b47793bfa39710b1ed20693abbdb068fa8aba3831476831523e8f67e`（取代修订 47 的 `63c80c11a4389c91f4a71c18cc0a2563fd01aa144e3f42a45bbb96933a7c8161`，同 12 个文件）。
- L7 完成验收（修订 50）：moss 2026-10-04 提问工具答复“L7 验收通过”，接受结果摘要 `2631d098b47793bfa39710b1ed20693abbdb068fa8aba3831476831523e8f67e`。

### 收尾（修订 51）

- 结果：首屏改为铺满全部宽度的 React Bits Drift Wall 海报墙——列宽不一、卡片按海报比例定高（1440 宽 6 列，更宽的屏幕等比放大，手机 5 列），中部不透明，四周与上下柔和渐隐，向下延伸到“活动清单”标题上沿；去掉首屏日期统计、精选信息与首屏下方分割线；点按或点击海报直接跳到活动（被筛选隐藏时先清空筛选）；修正 Chrome 3D 命中与触屏按下暂停。只在本地工作区，未提交、未推送、未发布。
- 验证：`node scripts/check_hero.mjs`、`bun run build:hero`、`build_page.py --check`、`check_page.py`、`check_filters.js`、`git diff --check` 通过；Chrome `--headless=new`（GPU）在 375、768、1440、1920、2560 宽截图与交互抽测通过（手机 9 处点按、桌面 9 处悬停后点击、触摸按住、键盘、减少动态效果、无脚本列表）；`checkLayout()` 四种宽度 × 两种动态设置仅既有日期弹层一项失败（已另开任务）。
- 学习：写入项目技能 `.claude/skills/site-visual-choices`（迁入原“React Bits 复刻”记忆，并补首屏海报墙的已定取舍）与全局技能 `~/.claude/skills/global-preferences`（一次性验证服务、内置浏览器手机模拟以鼠标事件送达点击、悬停判定、CSS 3D 点击命中）；原记忆条目已移到废纸篓。
