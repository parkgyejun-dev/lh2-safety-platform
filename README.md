# LH2 Safety Platform

액화수소 인수기지의 안전기준과 위험기반 평가를 하나의 체계에서 관리하기 위한 모듈형 웹 플랫폼입니다.

## 현재 개발 범위

1차 구현 대상은 **보호시설과의 안전거리** 모듈입니다.

- 규범론적 안전거리
- 누출빈도 및 사건수분석(Event Tree Analysis, ETA)
- 방호설비 신뢰도
- 사고영향평가
- 리스크 기반 안전거리
- 개인적 위험도(Individual Risk)
- 사회적 위험도(Societal Risk, F-N)
- 몬테카를로 시뮬레이션 기반 불확실성 분석
- GIS 기반 위험도 등위선 및 보호시설 공간판정

다음 모듈은 다른 담당자가 독립 개발 후 결합할 수 있도록 **접속 규격만 공통화하고 현재는 미구현 상태**로 둡니다.

- 사업소간 경계거리
- PSD 분출용량
- BOG 처리량
- 검사주기

## 설계 원칙

- UI: KRDS HTML Component Kit v1.1.0 기준
- 프론트엔드: React + TypeScript
- 공학 그래프: Plotly.js 계열의 공통 Visualization Wrapper
- GIS 화면: MapLibre GL JS
- 대규모 공간 시각화: deck.gl
- 공간 DB: PostgreSQL + PostGIS
- 계산엔진: Python
- 업무/API 계층: 모듈 독립성이 유지되는 구조로 구현
- 장시간 계산: 공통 비동기 Job 방식
- 신규 모듈은 공통 플랫폼 수정 없이 등록 가능하도록 설계

## 1차 개발 단계

현재 단계에서는 계산기 전체를 한 번에 구현하지 않습니다.

1. 시스템 경계와 모듈 계약 정의
2. KRDS 기반 공통 프론트엔드 뼈대
3. 보호시설 안전거리 입력모델
4. 규범론적 평가
5. 위험기반 계산엔진
6. 개인·사회적 위험도 및 GIS
7. 보고서·검증·통합

세부 구조는 [docs/architecture.md](docs/architecture.md), 다른 담당자용 모듈 연결 규격은 [docs/module-contract.md](docs/module-contract.md)를 기준으로 관리합니다.
