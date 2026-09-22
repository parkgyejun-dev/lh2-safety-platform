# 시스템 아키텍처

## 1. 목적

본 플랫폼은 액화수소 인수기지 안전평가를 공통 데이터, 공통 GIS, 공통 시각화, 공통 계산 Job 체계 위에서 모듈별로 독립 구현하는 구조를 사용한다.

현재 완전 구현 대상은 **보호시설과의 안전거리**이며, 사업소간 경계거리, PSD 분출용량, BOG 처리량, 검사주기는 외부 담당자가 별도 구현하여 결합할 수 있도록 경계만 정의한다.

## 2. 상위 구조

```text
Frontend
  ├─ KRDS UI Shell
  ├─ Project / Facility / Equipment
  ├─ Module Registry
  ├─ Visualization Core
  └─ GIS Viewer
        │
        ▼
Application API
  ├─ Common API
  ├─ Module API Gateway
  ├─ Job Manager
  └─ Result / Report Service
        │
        ├───────────────┐
        ▼               ▼
Calculation Engine     GIS Engine
(Python)               (PostGIS)
        │               │
        └──────┬────────┘
               ▼
          PostgreSQL
```

## 3. 공통 영역

공통 플랫폼은 모듈별 계산 로직과 분리한다.

### Frontend Core

- KRDS HTML Component Kit v1.1.0 기반 UI
- React + TypeScript
- 공통 메뉴 / Breadcrumb / Step Indicator / Modal / Toast / 입력폼
- Module Registry
- 공학 그래프 Wrapper
- GIS Viewer

### Backend Core

- 프로젝트 관리
- 사업소 / 설비 공통정보
- 사용자 / 권한
- 파일 관리
- 계산 Job 관리
- 결과 버전 관리
- 보고서 생성 인터페이스
- 공통 Module API Gateway

### GIS Core

- PostgreSQL + PostGIS
- 설비 위치
- 사업소 경계
- 보호시설
- 위험도 등위선
- 영향범위 Polygon
- 거리 / 포함 / 교차 / 버퍼 / 좌표변환

### Visualization Core

- 선형 / 로그 그래프
- 사고빈도 곡선
- 제트화재 거리-복사열 곡선
- F-N 곡선
- 분포 / CDF / Histogram
- 지도 위 위험도 Overlay

## 4. 보호시설 안전거리 모듈

```text
protected-facility-distance
  ├─ normative
  ├─ leak-frequency
  ├─ event-tree
  ├─ barrier-reliability
  ├─ consequence
  ├─ risk-distance
  ├─ individual-risk
  ├─ societal-risk
  ├─ uncertainty
  └─ integrated-result
```

주요 결과는 다음 세 체계로 구분한다.

1. 규범론적 안전거리
2. 리스크 기반 안전거리
3. 개인적·사회적 위험도를 고려한 통합 결과

## 5. 미구현 모듈

다음 모듈은 현재 계산 로직을 구현하지 않는다.

- boundary-distance
- psd-capacity
- bog-capacity
- inspection-interval

각 모듈은 공통 Module Contract를 만족할 때 플랫폼에 독립적으로 등록된다.

## 6. 핵심 원칙

- 모듈끼리 상대 모듈의 전용 DB 테이블을 직접 참조하지 않는다.
- 공통 데이터는 Core API를 통해 사용한다.
- 장시간 계산은 공통 Job Manager를 사용한다.
- 결과는 계산 버전, 입력 버전, 기준 버전, 모델 버전과 함께 저장한다.
- GIS와 시각화는 공통 서비스로 제공한다.
- 신규 모듈 추가를 위해 기존 보호시설 안전거리 코드를 수정하지 않는 구조를 지향한다.
