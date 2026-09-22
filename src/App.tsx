import { useMemo, useState } from 'react'

type ModuleStatus = 'ACTIVE' | 'NOT_IMPLEMENTED'

type ModuleItem = {
  id: string
  name: string
  description: string
  status: ModuleStatus
}

const modules: ModuleItem[] = [
  {
    id: 'protected-facility-distance',
    name: '보호시설과의 안전거리',
    description: '규범론적 기준, 리스크 기반 평가, 개인적·사회적 위험도를 함께 검토합니다.',
    status: 'ACTIVE',
  },
  {
    id: 'boundary-distance',
    name: '사업소간 경계거리',
    description: '다른 담당자가 개발한 모듈을 연결할 수 있도록 접속 규격만 제공합니다.',
    status: 'NOT_IMPLEMENTED',
  },
  {
    id: 'psd-capacity',
    name: 'PSD 분출용량',
    description: '다른 담당자가 개발한 모듈을 연결할 수 있도록 접속 규격만 제공합니다.',
    status: 'NOT_IMPLEMENTED',
  },
  {
    id: 'bog-capacity',
    name: 'BOG 처리량',
    description: '다른 담당자가 개발한 모듈을 연결할 수 있도록 접속 규격만 제공합니다.',
    status: 'NOT_IMPLEMENTED',
  },
  {
    id: 'inspection-interval',
    name: '검사주기',
    description: '다른 담당자가 개발한 모듈을 연결할 수 있도록 접속 규격만 제공합니다.',
    status: 'NOT_IMPLEMENTED',
  },
]

type View = 'home' | 'protected-facility-distance' | 'facility-input'

function App() {
  const [view, setView] = useState<View>('home')

  const activeModule = useMemo(
    () => modules.find((item) => item.id === 'protected-facility-distance'),
    [],
  )

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="shell-width header-inner">
          <button
            type="button"
            className="brand-button"
            onClick={() => setView('home')}
            aria-label="액화수소 안전평가 시스템 홈"
          >
            <span className="brand-mark" aria-hidden="true">H₂</span>
            <span className="brand-copy">
              <strong>액화수소 안전평가 시스템</strong>
              <span>LH₂ Safety Platform</span>
            </span>
          </button>

          <div className="header-actions">
            <span className="krds-badge medium bg-light-information">개발 검수본</span>
            <button type="button" className="krds-btn small tertiary">
              도움말
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        {view === 'home' && (
          <HomeView onOpenSafetyDistance={() => setView('protected-facility-distance')} />
        )}

        {view === 'protected-facility-distance' && (
          <SafetyDistanceView
            title={activeModule?.name ?? '보호시설과의 안전거리'}
            onBack={() => setView('home')}
            onStart={() => setView('facility-input')}
          />
        )}

        {view === 'facility-input' && (
          <FacilityInputView
            onBack={() => setView('protected-facility-distance')}
            onHome={() => setView('home')}
          />
        )}
      </main>

      <footer className="app-footer">
        <div className="shell-width footer-inner">
          <span>액화수소 인수기지 안전평가 통합플랫폼</span>
          <span>현재 검수범위: 공통 화면 · 보호시설 안전거리 · 사업소 정보 입력</span>
        </div>
      </footer>
    </div>
  )
}

function HomeView({ onOpenSafetyDistance }: { onOpenSafetyDistance: () => void }) {
  return (
    <>
      <section className="hero-section">
        <div className="shell-width hero-grid">
          <div>
            <span className="eyebrow">액화수소 인수기지</span>
            <h1>복잡한 안전평가를<br />한 흐름으로 확인합니다.</h1>
            <p className="hero-copy">
              설비 정보를 한 번 입력하고 규범론적 기준, 리스크 기반 결과,
              개인적·사회적 위험도까지 이어서 검토할 수 있도록 구성합니다.
            </p>
            <div className="hero-actions">
              <button
                type="button"
                className="krds-btn large primary"
                onClick={onOpenSafetyDistance}
              >
                보호시설 안전거리 시작
              </button>
              <a className="krds-btn large tertiary" href="#module-list">
                전체 모듈 보기
              </a>
            </div>
          </div>

          <aside className="status-panel" aria-label="현재 개발 현황">
            <span className="status-kicker">현재 개발 현황</span>
            <strong className="status-value">1 / 5</strong>
            <span className="status-label">모듈 구현 중</span>
            <div className="status-divider" />
            <dl className="status-list">
              <div>
                <dt>구현 중</dt>
                <dd>보호시설과의 안전거리</dd>
              </div>
              <div>
                <dt>공통 기반</dt>
                <dd>KRDS · GIS · 시각화 · 모듈 규격</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="section shell-width" id="module-list">
        <div className="section-heading">
          <div>
            <span className="eyebrow">평가 모듈</span>
            <h2>필요한 평가를 선택하세요.</h2>
          </div>
          <p>현재는 보호시설과의 안전거리만 개발합니다. 나머지 모듈은 연결 규격만 준비합니다.</p>
        </div>

        <div className="module-list">
          {modules.map((item, index) => (
            <article className={item.status === 'ACTIVE' ? 'module-row active' : 'module-row'} key={item.id}>
              <div className="module-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
              <div className="module-copy">
                <div className="module-title-line">
                  <h3>{item.name}</h3>
                  {item.status === 'ACTIVE' ? (
                    <span className="krds-badge small bg-light-success">구현 중</span>
                  ) : (
                    <span className="krds-badge small bg-light-gray">미구현</span>
                  )}
                </div>
                <p>{item.description}</p>
              </div>
              <div className="module-action">
                {item.status === 'ACTIVE' ? (
                  <button type="button" className="krds-btn medium secondary" onClick={onOpenSafetyDistance}>
                    열기
                  </button>
                ) : (
                  <button type="button" className="krds-btn medium tertiary" disabled>
                    준비 중
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function SafetyDistanceView({
  title,
  onBack,
  onStart,
}: {
  title: string
  onBack: () => void
  onStart: () => void
}) {
  return (
    <div className="shell-width page-content">
      <nav className="krds-breadcrumb-wrap" aria-label="현재 경로">
        <ol className="breadcrumb">
          <li className="home">
            <button type="button" className="breadcrumb-button" onClick={onBack}>홈</button>
          </li>
          <li><span className="txt">{title}</span></li>
        </ol>
      </nav>

      <section className="page-heading">
        <div>
          <span className="krds-badge medium bg-light-primary">01</span>
          <h1>{title}</h1>
          <p>
            같은 설비 조건으로 세 가지 결과를 비교합니다.
            계산근거는 결과에서 단계별로 확인할 수 있습니다.
          </p>
        </div>
        <button type="button" className="krds-btn medium tertiary" onClick={onBack}>
          모듈 목록
        </button>
      </section>

      <section className="result-path" aria-label="평가 결과 체계">
        <article>
          <span>01</span>
          <h2>규범론적 기준</h2>
          <p>관련 법령·기준에서 정한 조건과 요구거리를 확인합니다.</p>
        </article>
        <article>
          <span>02</span>
          <h2>리스크 기반 결과</h2>
          <p>사고빈도, 사건수분석, 방호설비 신뢰도와 사고영향평가를 연결합니다.</p>
        </article>
        <article>
          <span>03</span>
          <h2>개인적·사회적 위험도</h2>
          <p>개인적 위험도 등위선과 F-N 곡선으로 시설 전체 위험도를 확인합니다.</p>
        </article>
      </section>

      <section className="next-step-panel">
        <div>
          <span className="eyebrow">평가 시작</span>
          <h2>사업소 정보부터 입력합니다.</h2>
          <p>
            공통정보는 한 번만 입력하고 이후 설비 정보와 분석조건에서 다시 사용합니다.
          </p>
        </div>
        <button type="button" className="krds-btn large primary" onClick={onStart}>
          사업소 정보 입력
        </button>
      </section>
    </div>
  )
}

function FacilityInputView({
  onBack,
  onHome,
}: {
  onBack: () => void
  onHome: () => void
}) {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <div className="shell-width page-content input-page">
      <nav className="krds-breadcrumb-wrap" aria-label="현재 경로">
        <ol className="breadcrumb">
          <li className="home">
            <button type="button" className="breadcrumb-button" onClick={onHome}>홈</button>
          </li>
          <li>
            <button type="button" className="breadcrumb-button" onClick={onBack}>
              보호시설과의 안전거리
            </button>
          </li>
          <li><span className="txt">사업소 정보</span></li>
        </ol>
      </nav>

      <div className="input-title-row">
        <div>
          <span className="eyebrow">입력 1단계</span>
          <h1>사업소 정보를 입력하세요.</h1>
          <p>평가에 공통으로 사용하는 기본정보입니다. 설비 정보는 다음 단계에서 입력합니다.</p>
        </div>
      </div>

      <ol className="krds-step-wrap input-step" aria-label="입력 단계">
        <li className="active">
          <span>
            <em className="sr-only">현재단계</em>
            <i className="step">1단계</i>
            <span className="step-tit">사업소 정보</span>
          </span>
        </li>
        <li>
          <span>
            <i className="step">2단계</i>
            <span className="step-tit">설비 정보</span>
          </span>
        </li>
        <li>
          <span>
            <i className="step">3단계</i>
            <span className="step-tit">방호설비</span>
          </span>
        </li>
        <li>
          <span>
            <i className="step">4단계</i>
            <span className="step-tit">분석조건</span>
          </span>
        </li>
        <li>
          <span>
            <i className="step">5단계</i>
            <span className="step-tit">결과</span>
          </span>
        </li>
      </ol>

      <section className="input-card" aria-labelledby="facility-info-title">
        <div className="input-card-heading">
          <div>
            <h2 id="facility-info-title">사업소 기본정보</h2>
            <p>현재 검수본에서는 입력화면의 구성과 문구를 먼저 확인합니다.</p>
          </div>
          <span className="required-note"><span aria-hidden="true">*</span> 필수 입력</span>
        </div>

        <div className="fieldset input-grid">
          <div className="form-group">
            <div className="form-tit">
              <label htmlFor="facility-name">사업소명 <span className="required-mark" aria-hidden="true">*</span></label>
            </div>
            <div className="form-conts">
              <input id="facility-name" className="krds-input" type="text" placeholder="사업소명을 입력하세요." />
            </div>
          </div>

          <div className="form-group">
            <div className="form-tit">
              <label htmlFor="facility-location">소재지 <span className="required-mark" aria-hidden="true">*</span></label>
            </div>
            <div className="form-conts">
              <input id="facility-location" className="krds-input" type="text" placeholder="소재지를 입력하세요." />
            </div>
            <p className="form-hint">GIS 기능을 연결하면 지도에서 위치를 확인할 수 있습니다.</p>
          </div>

          <div className="form-group">
            <div className="form-tit">
              <label htmlFor="assessment-date">기준일</label>
            </div>
            <div className="form-conts">
              <input id="assessment-date" className="krds-input" type="date" />
            </div>
          </div>

          <div className="form-group">
            <div className="form-tit">
              <label htmlFor="annual-throughput">연간 액화수소 인수량</label>
            </div>
            <div className="form-conts input-with-unit">
              <input
                id="annual-throughput"
                className="krds-input"
                type="number"
                min="0"
                inputMode="decimal"
                placeholder="예: 100000"
              />
              <span className="input-unit">t/년</span>
            </div>
          </div>
        </div>
      </section>

      {confirmed && (
        <div className="review-notice" role="status">
          <strong>입력화면 구성을 확인했습니다.</strong>
          <span>다음 개발 단계에서는 설비 정보 화면을 연결합니다.</span>
        </div>
      )}

      <div className="input-actions">
        <button type="button" className="krds-btn large tertiary" onClick={onBack}>
          이전
        </button>
        <button type="button" className="krds-btn large primary" onClick={() => setConfirmed(true)}>
          입력화면 확인
        </button>
      </div>
    </div>
  )
}

export default App
