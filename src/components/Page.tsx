// The whole page: header, hero wall, filter toolbar and panel, the day groups and the footer, plus the empty detail sheet
// and poster preview the scripts fill in (assets/event-detail.js, assets/poster-preview.js).
// Neighbouring text is written as one string: React's server output splits it with comments, which nudges the glyphs.
import type { CSSProperties } from 'react'
import logo from '../../public/assets/brand/youyang-ravers-horizontal.svg?raw'
import type { Guide } from '../lib/guide'
import { EventRow } from './EventRow'

// The horizontal logo inline in the header byline; it fills with currentColor so site.css sets its colour.
const LOGO = logo.trim().replace('<svg ', '<svg class="title-logo" aria-hidden="true" focusable="false" ')

const CHEVRON = (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m3 6 5 5 5-5" />
  </svg>
)

const cardColor = (color: string) => ({ '--card-color': `var(--brand-${color})` }) as CSSProperties

function Chip({ name, value }: { name: string; value: string }) {
  return <label className="filter-chip"><input type="checkbox" name={name} value={value} /><span>{value}</span></label>
}

// Split chip (question 176): the name is the 全部 X checkbox; the arrow opens the family's sub-genre picker
// (assets/pickers.js), listing `members` in this order. Without the script only the name works.
function FamilyChip({ index, name, members }: { index: number; name: string; members: string[] }) {
  return (
    <div className="family-chip" data-members={JSON.stringify(members)}>
      <label className="family-all"><input type="checkbox" name="family" value={name} id={`family-${index}`} /><span>{name}</span></label>
      <button type="button" className="family-more" hidden aria-label={`选择 ${name} 小类`}><span className="family-count" hidden />{CHEVRON}</button>
    </div>
  )
}

function Filters({ guide }: { guide: Guide }) {
  return (
    <>
      <span className="filter-sentinel" aria-hidden="true" />
      <div className="filter-dock" hidden>
        <div className="filter-bar">
          <button type="button" className="filter-toggle" aria-expanded="false" aria-controls="filters">
            <span className="filter-burger" aria-hidden="true"><i /><i /></span><span>筛选</span>
          </button>
          <div className="filter-tags-edge"><ul className="filter-tags" aria-label="已选条件" /></div>
          <button type="reset" form="filters" className="filter-clear" hidden>清空</button>
          <p className="filter-count" role="status" aria-live="polite" aria-atomic="true">
            <strong id="result-count">{guide.eventCount}</strong><span aria-hidden="true">场</span>
            <span className="sr-only" id="result-summary">{`全部 ${guide.eventCount} 场活动`}</span>
          </p>
        </div>
        <form id="filters" className="filter-panel" hidden aria-label="筛选活动">
          <fieldset className="filter-card" style={cardColor('pink')}>
            <legend>城市</legend>
            <div className="filter-chips">{guide.cities.map(city => <Chip key={city} name="city" value={city} />)}</div>
          </fieldset>
          <fieldset className="filter-card" style={cardColor('yellow')}>
            <legend>风格</legend>
            <div className="filter-chips genre-chips">{guide.families.map((family, index) => <FamilyChip key={family.name} index={index} {...family} />)}</div>
            <select id="genre" name="genre" multiple hidden aria-label="风格小类">
              {guide.genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
            </select>
          </fieldset>
          <fieldset className="filter-card" style={cardColor('cyan')}>
            <legend>时段 · 场地</legend>
            <div className="filter-chips">
              <label className="filter-chip"><input type="checkbox" name="period" value="day" /><span>日间 · 18:00 前</span></label>
              <label className="filter-chip"><input type="checkbox" name="period" value="night" /><span>夜间 · 18:00 起</span></label>
            </div>
            <div className="filter-select">
              <span id="venue-label">场地</span>
              <select id="venue" name="venue" multiple data-multi-select="" data-placeholder="全部场地" data-search="搜索场地" aria-labelledby="venue-label" />
            </div>
            <p className="filter-note">跨夜场次按开场日归类；时段匹配各场已知开场时间。</p>
          </fieldset>
          <fieldset className="filter-card" style={cardColor('violet')}>
            <legend id="dates-label">日期范围</legend>
            <div className="filter-select filter-dates" data-date-range="" data-labelledby="dates-label">
              <input id="from" aria-describedby="filter-error" aria-label="开始日期" name="from" type="date" min={guide.startDate} max={guide.endDate} />
              <input id="to" aria-describedby="filter-error" aria-label="结束日期" name="to" type="date" min={guide.startDate} max={guide.endDate} />
            </div>
            <p id="filter-error" className="filter-error" role="alert" hidden>结束日期需晚于或等于开始日期。</p>
          </fieldset>
        </form>
      </div>
      <div className="filter-scrim" hidden />
    </>
  )
}

export function Page({ guide }: { guide: Guide }) {
  const { title } = guide
  const brandLabel = `${guide.fullTitle} · ${guide.byline}`
  return (
    <>
      <title>{guide.fullTitle}</title>
      <canvas className="topography" aria-hidden="true" />
      <a className="skip-link" href="#schedule">跳至活动筛选与清单</a>
      <header className="topbar wrap">
        <a className="brand title-lockup" href="#top" aria-label={brandLabel}>
          <h1 id="site-title" className="title-wordmark" aria-label={guide.fullTitle}>{title.topic + title.guide}</h1>
          <span className="title-byline">
            <span className="title-region">{title.region}</span>
            <span className="title-credit" dangerouslySetInnerHTML={{ __html: `<span class="title-by">by</span>${LOGO}` }} />
          </span>
        </a>
        <div className="site-updated">
          <span>资讯更新</span>
          <time dateTime={guide.updatedIso}><span>{guide.updatedDate}</span><span>{guide.updatedTime}</span></time>
        </div>
      </header>
      <main>
        <section id="spotlight" className="hero" aria-labelledby="spotlight-title">
          <h2 id="spotlight-title" className="sr-only">海报精选</h2>
          <div className="hero-stage" role="region" aria-label="精选活动海报">
            <ul className="hero-reel">
              {/* Each poster opens its event's details (assets/event-detail.js, docs/event-browsing.md Q24); without the
                  script it links to the event's row. */}
              {guide.featured.map(card => (
                <li key={card.id}>
                  <a className="hero-poster spotlight-card" href={`#${card.id}`} draggable={false} aria-label={`${card.name} · 阵容与购票`}>
                    <img src={card.src} width={card.width} height={card.height} data-small={card.small} data-small-width={card.smallWidth}
                      loading="lazy" decoding="async" draggable={false} alt={card.alt} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section id="schedule" className="schedule wrap" aria-labelledby="schedule-title">
          <div className="section-heading"><div><h2 id="schedule-title">活动清单</h2></div><p>Club Nights · Raves<br />Beach Parties</p></div>
          <Filters guide={guide} />
          <noscript><p className="noscript">启用 JavaScript 可使用组合筛选；下方仍可浏览全部活动、海报与购票链接。</p></noscript>
          <div className="empty-state" id="empty-state" hidden>
            <h3>这组条件下暂无活动</h3>
            <p>试试其他日期、城市或音乐风格，发现更多现场。</p>
            <button type="button" className="reset-empty" id="reset-empty">清空筛选，查看全部活动</button>
          </div>
          {guide.days.map(day => (
            <section key={day.iso} className="day-group" data-date={day.iso}>
              <h3 className="day-heading">
                <span className="day-number" aria-hidden="true">{day.label}</span>
                <span className="sr-only">{`${day.title} `}</span>
                <small>{`${day.weekday} / `}<span className="day-count">{day.events.length}</span> 场</small>
              </h3>
              {day.events.length
                ? <div className="event-accordion">{day.events.map(event => <EventRow key={event.id} event={event} />)}</div>
                : <p className="empty-day">当日暂无活动信息。</p>}
            </section>
          ))}
        </section>
      </main>
      <footer className="site-footer wrap">
        <div className="footer-top">
          <a className="brand" href="#top" aria-label={brandLabel}>{guide.fullTitle}</a>
          <span>{`${guide.editionYear} / ${guide.dateRange} · 粤港澳大湾区`}</span>
        </div>
        <p>人民币、港币与澳门币按各场标示。“翌”指次日。票价、阵容、营业时间及入场安排以主办最新通知为准；户外活动请留意天气与主办公告。</p>
      </footer>
      <dialog className="event-detail" id="event-detail" aria-labelledby="event-detail-title">
        <div className="event-detail-sheet">
          <div className="event-detail-scroll" tabIndex={-1} />
          <button type="button" className="event-detail-close" aria-label="关闭详情"><span aria-hidden="true" /></button>
        </div>
      </dialog>
      <dialog className="poster-preview" aria-label="海报预览" aria-describedby="poster-preview-help">
        <p className="sr-only" id="poster-preview-help">双指或滚轮缩放，放大后拖动查看；双击切换缩放；下拉、捏小或点背景退出。键盘加减号缩放，方向键移动，0 恢复全图，Esc 退出。</p>
        <div className="poster-preview-view" tabIndex={0} autoFocus aria-label="图片缩放与移动" />
        <div className="poster-preview-tools" role="toolbar" aria-label="缩放">
          <button type="button" className="poster-preview-button" data-zoom="out" aria-label="缩小">
            <svg aria-hidden="true" viewBox="0 0 14 14" width="14" height="14"><path d="M2 7h10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
          <button type="button" className="poster-preview-button" data-zoom="in" aria-label="放大">
            <svg aria-hidden="true" viewBox="0 0 14 14" width="14" height="14"><path d="M2 7h10M7 2v10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
          <button type="button" className="poster-preview-button" data-zoom="fit" aria-label="复位">
            <svg aria-hidden="true" viewBox="0 0 14 14" width="14" height="14"><path d="M1.75 5V1.75H5M9 1.75h3.25V5M12.25 9v3.25H9M5 12.25H1.75V9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        <button type="button" className="poster-preview-close" aria-label="关闭预览"><span aria-hidden="true" /></button>
      </dialog>
    </>
  )
}
