import { useState } from 'react'

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
    description: '규범론적 기준, 리스크 기반 결과, 개인적·사회적 위험도를 함께 확인합니다.',
    status: 'ACTIVE',
  },
  {
    id: 'boundary-distance',
    name: '사업소간 경계거리',
    description: '다른 담당자가 개발한 모듈을 연결할 예정입니다.',
    status: 'NOT_IMPLEMENTED',
  },
  {
    id: 'psd-capacity',
    name: 'PSD 분출용량',
    description: '다른 담당자가 개발한 모듈을 연결할 예정입니다.',
    status: 'NOT_IMPLEMENTED',
  },
  {
    id: 'bog-capacity',
    name: 'BOG 처리량',
    description: '다른 담당자가 개발한 모듈을 연결할 예정입니다.',
    status: 'NOT_IMPLEMENTED',
  },
  {
    id: 'inspection-interval',
    name: '검사주기',
    description: '다른 담당자가 개발한 모듈을 연결할 예정입니다.',
    status: 'NOT_IMPLEMENTED',
  },
]

type View = 'home' | 'protected-facility-distance' | 'facility-input'

function App() {
  const [view, setView] = useState<View>('home')

  return (
    <div className="app-shell">
      <KrdsHeader
        onHome={() => setView('home')}
        onModules={() => setView('home')}
      />

      <main id="main-content">
        {view === 'home' && (
          <HomeView onOpenSafetyDistance={() => setView('protected-facility-distance')} />
        )}

        {view === 'protected-facility-distance' && (
          <SafetyDistanceView
            onHome={() => setView('home')}
            onStart={() => setView('facility-input')}
          />
        )}

        {view === 'facility-input' && (
          <FacilityInputView
            onHome={() => setView('home')}
            onBack={() => setView('protected-facility-distance')}
          />
        )}
      </main>

      <KrdsFooter />
    </div>
  )
}

function KrdsHeader({
  onHome,
  onModules,
}: {
  onHome: () => void
  onModules: () => void
}) {
  return (
    <header id="krds-header">
      <div className="header-in">
        <div className="header-container">
          <div className="inner">
            <div className="header-branding">
              <button type="button" className="service-brand-button" onClick={onHome}>
                <span className="service-brand-kicker">액화수소 인수기지</span>
                <strong className="service-brand-title">액화수소 안전평가 시스템</strong>
              </button>

              <div className="header-actions">
                <span className="krds-badge bg-light-information">개발 검수본</span>
                <button type="button" className="krds-btn medium text" onClick={onModules}>
                  전체 모듈
                </button>
                <button type="button" className="krds-btn medium text">
                  도움말
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function HomeView({ onOpenSafetyDistance }: { onOpenSafetyDistance: () => void }) {
  return (
    <div className="page-root">
      <section className="page-section hero-section">
        <div className="inner">
          <div className="home-hero-layout">
            <div className="home-hero-main">
              <span className="krds-badge bg-light-primary">액화수소 인수기지</span>
              <div className="page-title-wrap">
                <h1 className="h-tit">복잡한 안전평가를 한 흐름으로 확인합니다.</h1>
              </div>
              <p className="hero-description">
                설비 정보를 한 번 입력하고 규범론적 기준, 리스크 기반 결과,
                개인적·사회적 위험도까지 이어서 확인합니다.
              </p>
              <div className="button-group">
                <button
                  type="button"
                  className="krds-btn large primary"
                  onClick={onOpenSafetyDistance}
                >
                  보호시설 안전거리 시작
                </button>
                <a className="krds-btn large secondary" href="#module-list">
                  전체 모듈 보기
                </a>
              </div>
            </div>

            <aside className="home-progress" aria-label="현재 개발 범위">
              <span className="krds-badge bg-light-success">구현 중</span>
              <p className="progress-number">1 / 5</p>
              <p className="progress-title">보호시설과의 안전거리</p>
              <p className="progress-description">
                나머지 4개 모듈은 접속 규격만 준비하고 계산기능은 구현하지 않습니다.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="page-section" id="module-list">
        <div className="inner">
          <div className="page-title-wrap">
            <h2 className="h-tit">평가 모듈</h2>
            <p className="guide-txt">필요한 평가를 선택하세요.</p>
          </div>

          <ul className="krds-structured-list type-full module-structured-list">
            {modules.map((item) => (
              <li className="structured-item" key={item.id}>
                <div className="in">
                  <div className="card-top">
                    {item.status === 'ACTIVE' ? (
                      <span className="krds-badge bg-light-success">구현 중</span>
                    ) : (
                      <span className="krds-badge bg-light-gray">미구현</span>
                    )}
                  </div>

                  <div className="card-body">
                    <div className="c-text">
                      <p className="c-tit">
                        <span className="span">{item.name}</span>
                      </p>
                      <p className="c-txt">{item.description}</p>
                    </div>

                    <div className="c-btn">
                      {item.status === 'ACTIVE' ? (
                        <button
                          type="button"
                          className="krds-btn secondary"
                          onClick={onOpenSafetyDistance}
                        >
                          열기
                        </button>
                      ) : (
                        <button type="button" className="krds-btn secondary" disabled>
                          준비 중
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

function SafetyDistanceView({
  onHome,
  onStart,
}: {
  onHome: () => void
  onStart: () => void
}) {
  return (
    <div className="page-root">
      <div className="inner page-content">
        <nav className="krds-breadcrumb-wrap" aria-label="현재 경로" id="breadcrumb">
          <ol className="breadcrumb">
            <li className="home">
              <button type="button" className="txt breadcrumb-link" onClick={onHome}>
                홈
              </button>
            </li>
            <li>
              <span className="txt">보호시설과의 안전거리</span>
            </li>
          </ol>
        </nav>

        <div className="page-title-wrap">
          <span className="krds-badge bg-light-primary">01</span>
          <h1 className="h-tit">보호시설과의 안전거리</h1>
          <p className="guide-txt">
            같은 설비 조건으로 규범론적 기준, 리스크 기반 결과, 개인적·사회적 위험도를
            함께 확인합니다.
          </p>
        </div>

        <section className="content-section" aria-labelledby="result-method-title">
          <div className="section-title-wrap">
            <h2 className="h-tit" id="result-method-title">평가 결과 체계</h2>
          </div>

          <ul className="krds-structured-list type-full">
            <li className="structured-item">
              <div className="in">
                <div className="card-top">
                  <span className="krds-badge bg-light-primary">01</span>
                </div>
                <div className="card-body">
                  <div className="c-text">
                    <p className="c-tit"><span className="span">규범론적 기준</span></p>
                    <p className="c-txt">관련 법령·기준에서 정한 조건과 요구거리를 확인합니다.</p>
                  </div>
                </div>
              </div>
            </li>

            <li className="structured-item">
              <div className="in">
                <div className="card-top">
                  <span className="krds-badge bg-light-information">02</span>
                </div>
                <div className="card-body">
                  <div className="c-text">
                    <p className="c-tit"><span className="span">리스크 기반 결과</span></p>
                    <p className="c-txt">
                      사고빈도, 사건수분석, 방호설비 신뢰도와 사고영향평가를 연결합니다.
                    </p>
                  </div>
                </div>
              </div>
            </li>

            <li className="structured-item">
              <div className="in">
                <div className="card-top">
                  <span className="krds-badge bg-light-success">03</span>
                </div>
                <div className="card-body">
                  <div className="c-text">
                    <p className="c-tit"><span className="span">개인적·사회적 위험도</span></p>
                    <p className="c-txt">
                      개인적 위험도 등위선과 F-N 곡선으로 시설 전체 위험도를 확인합니다.
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <section className="content-section action-section" aria-labelledby="start-title">
          <div className="page-title-wrap">
            <span className="krds-badge bg-light-primary">평가 시작</span>
            <h2 className="h-tit" id="start-title">사업소 정보부터 입력합니다.</h2>
            <p className="guide-txt">
              공통정보는 한 번만 입력하고 설비 정보와 분석조건에서 다시 사용합니다.
            </p>
          </div>
          <button type="button" className="krds-btn large primary" onClick={onStart}>
            사업소 정보 입력
          </button>
        </section>
      </div>
    </div>
  )
}

function FacilityInputView({
  onHome,
  onBack,
}: {
  onHome: () => void
  onBack: () => void
}) {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <div className="page-root">
      <div className="inner page-content">
        <nav className="krds-breadcrumb-wrap" aria-label="현재 경로" id="breadcrumb">
          <ol className="breadcrumb">
            <li className="home">
              <button type="button" className="txt breadcrumb-link" onClick={onHome}>
                홈
              </button>
            </li>
            <li>
              <button type="button" className="txt breadcrumb-link" onClick={onBack}>
                보호시설과의 안전거리
              </button>
            </li>
            <li>
              <span className="txt">사업소 정보</span>
            </li>
          </ol>
        </nav>

        <div className="page-title-wrap between">
          <div>
            <span className="krds-badge bg-light-primary">입력 1단계</span>
            <h1 className="h-tit">사업소 정보를 입력하세요.</h1>
            <p className="guide-txt">
              평가에 공통으로 사용하는 기본정보입니다. 설비 정보는 다음 단계에서 입력합니다.
            </p>
          </div>

          <ol className="krds-step-wrap">
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
        </div>

        <section className="content-section" aria-labelledby="facility-info-title">
          <div className="section-title-wrap">
            <h2 className="h-tit" id="facility-info-title">사업소 기본정보</h2>
            <p className="guide-txt">
              현재 검수본에서는 입력항목과 화면 흐름을 먼저 확인합니다.
            </p>
          </div>

          <div className="fieldset facility-form-grid">
            <div className="form-group">
              <div className="form-tit">
                <label htmlFor="facility-name">사업소명</label>
              </div>
              <div className="form-conts">
                <input
                  type="text"
                  id="facility-name"
                  className="krds-input"
                  placeholder="사업소명을 입력하세요."
                />
              </div>
              <p className="form-hint">필수 입력</p>
            </div>

            <div className="form-group">
              <div className="form-tit">
                <label htmlFor="facility-location">소재지</label>
              </div>
              <div className="form-conts">
                <input
                  type="text"
                  id="facility-location"
                  className="krds-input"
                  placeholder="소재지를 입력하세요."
                />
              </div>
              <p className="form-hint">필수 입력 · GIS 기능 연결 후 지도에서 확인</p>
            </div>

            <div className="form-group">
              <div className="form-tit">
                <label htmlFor="assessment-date">기준일</label>
              </div>
              <div className="form-conts">
                <input type="date" id="assessment-date" className="krds-input" />
              </div>
            </div>

            <div className="form-group">
              <div className="form-tit">
                <label htmlFor="annual-throughput">연간 액화수소 인수량</label>
              </div>
              <div className="form-conts">
                <input
                  type="number"
                  id="annual-throughput"
                  className="krds-input"
                  min="0"
                  inputMode="decimal"
                  placeholder="예: 100000"
                />
              </div>
              <p className="form-hint">단위: t/년</p>
            </div>
          </div>
        </section>

        {confirmed && (
          <div className="review-status" role="status">
            <span className="krds-badge bg-light-success">확인 완료</span>
            <p>사업소 정보 입력화면을 확인했습니다. 다음 단계는 설비 정보입니다.</p>
          </div>
        )}

        <div className="button-group between">
          <button type="button" className="krds-btn large secondary" onClick={onBack}>
            이전
          </button>
          <button
            type="button"
            className="krds-btn large primary"
            onClick={() => setConfirmed(true)}
          >
            입력화면 확인
          </button>
        </div>
      </div>
    </div>
  )
}

function KrdsFooter() {
  return (
    <footer id="krds-footer">
      <div className="inner">
        <div className="f-cnt">
          <div className="f-info">
            <p className="info-addr">액화수소 인수기지 안전평가 통합플랫폼</p>
            <ul className="info-cs">
              <li>
                <strong className="strong">현재 검수범위</strong>
                <span className="span">공통 화면 · 보호시설 안전거리 · 사업소 정보 입력</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="f-btm">
          <div className="f-btm-text">
            <p className="f-copy">개발 검수본 · KRDS HTML Component Kit v1.1.0 적용</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default App
