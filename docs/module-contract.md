# Module Contract

## 1. 목적

각 평가항목을 독립적으로 개발하되, 공통 플랫폼에 동일한 방식으로 결합하기 위한 최소 계약을 정의한다.

## 2. 필수 모듈 메타데이터

각 모듈은 다음 정보를 제공해야 한다.

```json
{
  "moduleId": "protected-facility-distance",
  "name": "보호시설과의 안전거리",
  "version": "0.1.0",
  "status": "ACTIVE",
  "capabilities": [
    "NORMATIVE",
    "RISK_BASED",
    "INDIVIDUAL_RISK",
    "SOCIETAL_RISK"
  ]
}
```

허용 상태:

- `ACTIVE`
- `DISABLED`
- `NOT_IMPLEMENTED`

## 3. 공통 API 형태

각 모듈은 동일한 상위 API 규칙을 따른다.

```text
GET  /api/v1/modules
GET  /api/v1/modules/{moduleId}
POST /api/v1/modules/{moduleId}/validate
POST /api/v1/modules/{moduleId}/calculate
GET  /api/v1/modules/{moduleId}/jobs/{jobId}
GET  /api/v1/modules/{moduleId}/results/{resultId}
POST /api/v1/modules/{moduleId}/report
```

## 4. 입력 규칙

모듈은 필요한 전용 입력만 직접 소유한다.

사업소, 설비, 위치, 운전조건 등 공통 항목은 Core에서 제공되는 식별자를 참조한다.

예:

```json
{
  "projectId": "P-001",
  "facilityId": "F-001",
  "equipmentIds": ["E-101", "E-102"],
  "moduleInput": {}
}
```

## 5. 결과 규칙

모든 모듈은 공통 결과 헤더와 모듈 전용 payload를 반환한다.

```json
{
  "moduleId": "protected-facility-distance",
  "moduleVersion": "0.1.0",
  "runId": "RUN-001",
  "status": "COMPLETED",
  "resultType": "INTEGRATED",
  "result": {}
}
```

## 6. 프론트엔드 규칙

- 사람이 조작하는 UI는 KRDS HTML Component Kit v1.1.0을 기준으로 한다.
- 과학·공학 그래프는 공통 Visualization Core를 통해 표시한다.
- 지도는 공통 GIS Viewer를 통해 표시한다.
- 모듈은 공통 Shell, Header, Navigation을 재구현하지 않는다.

## 7. DB 규칙

- 공통 테이블 직접 수정 금지
- 타 모듈 전용 테이블 직접 참조 금지
- 공통 데이터는 Core Service/API를 통해 접근
- 모듈 전용 테이블은 고유 prefix 또는 schema 사용 권장

예:

```text
sd_*       보호시설 안전거리
bd_*       사업소간 경계거리
psd_*      PSD
bog_*      BOG
insp_*     검사주기
```

## 8. 계산 Job 규칙

계산시간이 길거나 외부 계산결과 Import가 필요한 경우 공통 Job Manager를 사용한다.

최소 상태:

- QUEUED
- RUNNING
- COMPLETED
- FAILED
- CANCELLED

## 9. 현재 모듈 상태

| moduleId | 상태 |
|---|---|
| protected-facility-distance | ACTIVE |
| boundary-distance | NOT_IMPLEMENTED |
| psd-capacity | NOT_IMPLEMENTED |
| bog-capacity | NOT_IMPLEMENTED |
| inspection-interval | NOT_IMPLEMENTED |
