import {
  HOME_COPY,
  HOME_FOCUS_CHIPS,
  HOME_MILESTONES,
  HOME_SHORTCUTS,
  HOME_STATS,
} from '../../constants/home'
import './home.css'

const sanitizeName = (raw) => {
  const trimmed = raw?.trim() || ''
  const stripped = trimmed.replace(/^welcome\b\s*/i, '').trim()
  return stripped || 'Creator'
}

function Home({ user, onSignOut }) {
  const displayName = sanitizeName(user?.name)
  const email = user?.email || '—'

  return (
    <main className="page-grid">
      <section className="hero">
        <p className="eyebrow">{HOME_COPY.eyebrow}</p>
        <h1 className="headline">
          {HOME_COPY.titlePrefix}{' '}
          <span className="gradient-text">{displayName}</span>
        </h1>
        <p className="subtext">{HOME_COPY.subtext}</p>
        <div className="cta-row">
          <button className="btn primary">{HOME_COPY.ctaPrimary}</button>
        </div>

        <div className="stat-grid">
          {HOME_STATS.map((stat) => (
            <div className="card stat-card" key={stat.label}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-change">{stat.change} vs last week</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card form-card">
        <div className="form-header">
          <div>
            <p className="badge">Overview</p>
            <h2 className="form-title">Your workspace</h2>
            <p className="form-subtitle">
              Signed in as <strong>{email}</strong>. Keep an eye on progress and
              upcoming checkpoints.
            </p>
          </div>
        </div>

        <div className="list">
          {HOME_MILESTONES.map((item) => (
            <div className="list-row" key={item.title}>
              <div>
                <p className="row-title">{item.title}</p>
                <p className="row-detail">{item.detail}</p>
              </div>
              <span className="pill subtle">In progress</span>
            </div>
          ))}
        </div>

        <div className="divider" />

        <div className="grid-2">
          <div className="tile">
            <p className="row-title">Today’s focus</p>
            <p className="row-detail">{HOME_COPY.focusBody}</p>
            <div className="chip-row">
              {HOME_FOCUS_CHIPS.map((chip) => (
                <span className="chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="tile">
            <p className="row-title">{HOME_COPY.shortcutsTitle}</p>
            <p className="row-detail">{HOME_COPY.shortcutsSub}</p>
            <div className="shortcut-grid">
              {HOME_SHORTCUTS.map((shortcut) => (
                <button className="shortcut" key={shortcut}>
                  {shortcut}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home

