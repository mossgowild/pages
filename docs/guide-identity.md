---
module: guide-identity
status: 已完成
shape: 分阶段
updated: 2026-10-11
---

# 站点名称与专题范围

## 问答

### 请求：改名“大湾区电音指南”，时间不局限于国庆

> 2026-10-10：“把国庆指南改为大湾区电音指南，以后时间不局限于国庆了”

### 已查明事实

| # | 事实 | 来源 |
| --- | --- | --- |
| F1 | 站名由 `data/events.json` 的 `title` 拼成：`region`“大湾区”＋`topic`“国庆电音”＋`guide`“指南”，用在页面 `<title>`、页眉标题的读屏名与页脚品牌；另有 `src/routes/__root.tsx` 的搜索描述写死“2026 大湾区国庆电音活动指南。…” | `data/events.json`；`src/lib/guide.server.ts`（`fullTitle`）；`src/components/Page.tsx`；`src/routes/__root.tsx` |
| F2 | 页眉标题组合（第 260、263、264、272–284 题）：上行是 `topic`＋`guide`（现在“国庆电音指南”，Noto Sans SC Black 22px、手机 20px，斜切 12°，两端对齐撑满），下行左边“大湾区”（13px、60% 白）、右边 “by”＋有氧RAVERS Logo；两行等宽、左右两端对齐，整块与右侧“资讯更新”等高。去掉“国庆”后上行只剩“电音指南”4 个字，比下行窄，两端对齐会把 4 个字拉开 | `src/components/Page.tsx` 的 `LOCKUP`、`WORDMARK`、`REGION`；AGENTS.md 项目目标一节 |
| F3 | 标题字体是自托管的 Noto Sans SC Black 子集（`public/assets/fonts/noto-sans-sc-title-900.woff2`）；“大湾区电音指南”这几个字都已在用（原来的“国庆电音指南”与“大湾区”），不用重新取子集 | `src/styles/app.css` 的 `@font-face`；现有页面 |
| F4 | 日期范围由 `data/events.json` 的 `start_date`、`end_date`（现在 2026-09-30、2026-10-07）决定：清单按这段日期每天一组（没有活动的日子显示“当日暂无活动信息”），筛选日历只能选这段日期，页脚写“2026 / 09.30 — 10.07 · 粤港澳大湾区”。AGENTS.md 写着当前专题为 2026 年 9 月 30 日–10 月 7 日，新的专题以用户指定的范围为准 | `src/lib/guide.server.ts`（`days`、`dateRange`）；`src/components/Pickers.tsx` 的 `DateRange`；AGENTS.md |
| F5 | 站名还写在：AGENTS.md（“当前专题标题为‘大湾区国庆电音指南’”）、项目技能 `pages-site-visual-choices` 的描述；活动名称、海报替代文字与研究规则里的“国庆”（如“PLAY X 国庆总海报”）是活动本身或检索用语，不属于站名 | `grep -rn 国庆` |
| F6 | 页眉三种排法的候选（现在、A、B、C，桌面 1440 与手机 390 宽，直接改页面截图）：A 只换字，上行“电音指南”被拉开成“电  音  指  南”；B 上行“大湾区电音指南”撑满，下行只留右对齐的 “by”＋Logo；C 一行“大湾区电音指南”，“by”＋Logo 跟在右边，页眉变成一行 | [候选截图](guide-identity/lockup-candidates.png)；草稿目录 `lockup/candidates.ts` |
| F7 | 用到起止日期的地方：`src/lib/guide.server.ts` 的数据断言（起始不晚于结束、每场在范围内）、每日分组、页脚的年份与“09.30 — 10.07”、传给筛选日历的 `startDate`／`endDate`；测试与检查脚本不直接读这两个字段 | `grep -rn start_date src test scripts` |
| F8 | 按活动自动算，现在的范围是 2026-09-30 到 2026-10-06（57 场里最晚一场在 10/6）：清单最后的“10.07 当日暂无活动信息”一组不再出现，筛选日历少了 10/7，页脚变成“09.30 — 10.06”。`scripts/check-browser.ts` 的筛选检查靠点日历第 8 个日期（10/7，没有活动）得到空状态，要改成别的组合 | `data/events.json` 统计；`scripts/check-browser.ts` |
| F9 | `test/browser/layout.js` 核对页眉：标题在上、“大湾区”在 Logo 左边的下一行，两行左右边对齐（标题的右边减去斜切多出的部分对齐 Logo 右边），标题块与“资讯更新”块等高（第 272 题）、上下居中；拿掉“大湾区”后这几条要按新排法改写，下行的高度也要保持，免得两块不再等高 | `test/browser/layout.js` |

![页眉候选：现在、A、B、C](guide-identity/lockup-candidates.png)

### 问答

| # | 问题 | 答复 | 影响 |
| --- | --- | --- | --- |
| Q1 | 页眉标题怎么排（F2、F6，见候选截图）：A 只换字——上行“电音指南”、下行“大湾区 by Logo”，版式不变，但 4 个字会被拉开；B 两行——上行“大湾区电音指南”撑满，下行只留右对齐的 “by”＋Logo；C 一行——“大湾区电音指南”后面跟 “by”＋Logo，页眉更扁。推荐 B：保留已定的两行署名式与等高对齐，站名完整连读，不用拉开字距 | “B 两行”（2026-10-10 提问工具） | `title` 改为 region“大湾区”、topic“电音”；页眉上行“大湾区电音指南”两端对齐撑满，下行只留右对齐的 “by”＋Logo，不再单列“大湾区”；AGENTS.md 的标题组合一段按此改写 |
| Q2 | 以后日期范围怎么定（F4）：A 照旧由数据里的起止日期定，每次更新时按你给的范围改（现在先保持 9/30–10/7）；B 按清单里最早到最晚的活动日期自动定，不再维护起止日期（活动隔得远时中间会有很多“当日暂无活动信息”）。推荐 A：范围由你定，与“先列范围再收集”的检索规则一致，也不会因一场远期活动拉出一长串空日期 | “B 按活动自动算”（2026-10-10 提问工具） | 删去数据里的 `start_date`、`end_date`，日期范围取清单里最早到最晚的活动日期（现在 9/30–10/6，见 F8） |
| Q3 | 怎么分层（Q1、Q2）：A 一层——`data/events.json` 改 `title`、删起止日期；`src/lib/guide.server.ts` 按活动算日期范围、去掉起止日期的断言；`src/components/Page.tsx` 页眉改成两行“大湾区电音指南”／右对齐 “by”＋Logo；`src/routes/__root.tsx` 搜索描述去掉“国庆”；`scripts/check-browser.ts` 换一种得到空状态的组合；AGENTS.md、项目技能描述与记忆里的站名、标题组合与“当前专题”日期改写，一次验收；B 两层——L1 改名与页眉，L2 日期范围自动算。推荐 B：页眉是视觉改动、要你看截图，日期范围是数据规则，分开看各自更清楚 | “B 两层”（2026-10-10 提问工具） | L1 改名与页眉，L2 日期范围按活动自动算 |

## 结论

### 站名与页眉

- 站名“大湾区电音指南”（Q1），不再带“国庆”：`data/events.json` 的 `title` 为 region“大湾区”、topic“电音”、guide“指南”，页面 `<title>`、页脚品牌与读屏名都用它；搜索描述写“大湾区电音活动指南”，不写年份与节日。
- 页眉两行（Q1，沿用第 260、263、272–284 题的字体与对齐）：上行“大湾区电音指南”（Noto Sans SC Black 22px、手机 20px，斜切 12°，两端对齐撑满），下行只有右对齐的 “by”＋有氧RAVERS Logo（“by” 7px 角标、Logo 12px 高）；两行右边对齐，整块与右侧“资讯更新”等高、上下居中。

### 日期范围

- 不再固定节日或起止日期（Q2）：清单的日期范围取所有活动里最早到最晚的日期，每天一组，范围内没有活动的日子显示“当日暂无活动信息”；筛选日历只能选这段日期；页脚写年份与“月.日 — 月.日”。
- 数据里不再有 `start_date`、`end_date`；每次更新只增删活动，范围随之变化（`src/lib/guide.server.ts` 的 `guideDays`）。

## 记录

### 本任务：改名“大湾区电音指南”，时间不局限于国庆

- 确认：“确认”（2026-10-10 提问工具）
- 学习：无合格候选：站名与排法的决定已写进 AGENTS.md 与记忆 `brand-lockup-typography`，日期规则已写进 AGENTS.md，没有别的纠正或可复用的做法

#### 目标与范围

- 目标：站名改为“大湾区电音指南”（Q1），日期范围按活动自动算（Q2）。
- 不做：不改 Logo、字体与配色；不改活动名称、海报替代文字与检索规则里的“国庆”（F5）；不按今天日期隐藏过去的活动；不改 `docs/site-rewrite.md`（里面有别处未提交的改动）。
- 须遵守：Q1–Q3；第 260、263、272–284 题的页眉字体与对齐；AGENTS.md 第五节的页面契约。

#### 层

1. L1 改名与页眉
  - 内容：`data/events.json` 的 `title.topic` 改为“电音”；`src/components/Page.tsx` 页眉上行改为 region＋topic＋guide，下行去掉“大湾区”、“by”＋Logo 右对齐并保持原来的行高；`src/routes/__root.tsx` 搜索描述改为“大湾区电音活动指南。…”；`test/browser/layout.js` 的页眉检查按新排法改写（标题在上，“by”＋Logo 在下一行右对齐，两行右边对齐，与“资讯更新”等高）；AGENTS.md 项目目标一节的标题组合、项目技能 `pages-site-visual-choices` 的描述与记忆 `brand-lockup-typography` 里的站名与排法改写
  - 验收：桌面与手机页眉为两行“大湾区电音指南”／右对齐 “by”＋Logo，与右侧“资讯更新”等高、上下居中，页面标题与描述不再有“国庆”；给你看截图
  - 验证：`bun run build`、`bun run check:browser`（含改写的页眉检查）、`bunx tsc --noEmit`、`git diff --check`；无头 Chrome 1440、390 宽截图并量标题块与更新块的高度
  - 依据：Q1、Q3、F1–F3、F5、F6、F9
2. L2 日期范围按活动自动算
  - 内容：`data/events.json` 删去 `start_date`、`end_date`；`src/lib/guide.server.ts` 按活动最早到最晚的日期生成每日分组、页脚年份与日期、日历的可选范围，去掉起止日期的断言；`scripts/check-browser.ts` 换一种得到空状态的组合（F8）；AGENTS.md 的“当前专题为 2026 年 9 月 30 日–10 月 7 日”改写为日期范围随活动
  - 验收：清单从 9/30 排到 10/6、末尾不再有 10/7 的空组，日历只能选 9/30–10/6，页脚“2026 / 09.30 — 10.06”；加一场更晚的活动时范围跟着延长（测试里核对）
  - 验证：`bun run build`（补一条“范围取活动的最早到最晚日期”的测试）、`bun run check:browser`、`bunx tsc --noEmit`、`git diff --check`；无头 Chrome 看清单末尾、日历与页脚
  - 依据：Q2、Q3、F4、F7、F8

#### 交付

- 操作：无（改动留在工作区）

#### 残余风险

- 范围跨年时页脚只写起始年份（如“2026 / 12.28 — 01.03”），到时再按需要改写。

### L1 改名与页眉（已完成）

- 改动：`data/events.json` 的 `title.topic` 改为“电音”；`src/components/Page.tsx` 页眉上行改为完整站名“大湾区电音指南”（读屏名就是文字本身），下行去掉“大湾区”、“by”＋Logo 右对齐，下行固定 13px 高（原“大湾区”那一行的高度），去掉不再用的 `REGION` 与 `title` 变量；`src/routes/__root.tsx` 搜索描述改为“大湾区电音活动指南。…”；`test/browser/layout.js` 的页眉检查改为：标题文字是“大湾区电音指南”、“by”＋Logo 在下一行、两行右边对齐、更新块不与标题重叠；AGENTS.md 项目目标一节的站名与标题组合改写；项目技能 `pages-site-visual-choices` 的描述改为“大湾区电音指南”；记忆 `brand-lockup-typography` 补上新排法
- 验证：`bun run build`（19 项测试）、`bun run check:browser`（全部通过，含改写的页眉检查与“标题块与更新块等高”）、`bunx tsc --noEmit`、`git diff --check` 通过；无头 Chrome 量页眉：标题块 1440 宽 43.2px、更新块 43.4px，390 宽 41px、40.4px，与改前相同；页面标题“大湾区电音指南”；1440、390 宽截图看过（[截图](guide-identity/header-after.png)）
- 学习：无合格候选：这层没有新的纠正或可复用的做法；新排法已补进记忆 `brand-lockup-typography`
- 验收：“接受并提交”（2026-10-10 提问工具）

![改后的页眉](guide-identity/header-after.png)

### L2 日期范围按活动自动算（已完成）

- 改动：`data/events.json` 删去 `start_date`、`end_date`；`src/lib/guide.server.ts` 新增 `guideDays`（活动里最早到最晚的每一天），每日分组、页脚年份与日期、筛选日历的可选范围都由它得出，起止日期的两条断言换成“至少有一场活动”；`test/data.test.ts` 补“日期跟着活动走”（现在 9/30–10/6，加一场 10/9 的活动后延长到 10/9、共 10 天）；`scripts/check-browser.ts` 的空状态改为点日历的最后一天（Techno 那天没有活动）；AGENTS.md 项目目标一节的“当前专题为 2026 年 9 月 30 日–10 月 7 日”改写为范围随活动
- 验证：`bun run build`（20 项测试通过）、`bun run check:browser`（全部通过）、`bunx tsc --noEmit`、`git diff --check` 通过；无头 Chrome（390 宽）：日期分组为 9/30–10/6 共 7 组，末尾不再有 10/7 的空组，日历可选 9/30–10/6（标题“可选 9/30—10/6”），页脚“2026 / 09.30 — 10.06 · 粤港澳大湾区”（[清单末尾截图](guide-identity/range-end-390.jpg)）
- 学习：无合格候选：这层没有新的纠正或可复用的做法
- 验收：“接受并提交”（2026-10-10 提问工具）

![清单末尾与页脚](guide-identity/range-end-390.jpg)
