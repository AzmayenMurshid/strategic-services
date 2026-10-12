# API and Backend Architecture Standard

This document defines the recommended industry-standard backend architecture for Strategic Services. It is tailored to this Next.js App Router codebase and HubSpot integration needs.

## 1. Goals

- Build secure, observable, maintainable backend services
- Keep HubSpot as system-of-record without coupling UI directly to vendor schemas
- Enforce stable API contracts for frontend and internal integrations
- Support scale through clear boundaries, caching, and asynchronous processing

## 2. Architecture Principles

- Separation of concerns: route handlers only orchestrate; business logic lives in services
- Contract-first APIs: define request and response schemas before implementation
- Zero trust inputs: validate and sanitize all external input
- Explicit error model: no raw stack traces or vendor errors returned to clients
- Idempotency for write operations and webhook handling
- Observability by default: logs, metrics, traces, and correlation IDs
- Backward-compatible changes for public or shared API contracts

## 3. Recommended Backend Layers

Use a layered architecture:

1. Transport layer: Next.js route handlers in app/api
2. Application layer: use-cases and orchestration
3. Domain layer: business rules and invariants
4. Integration layer: HubSpot, storage, email, queue providers
5. Data layer: persistence abstractions and models

### Request flow

1. Route handler authenticates request
2. Input validated against schema
3. Service executes use-case
4. Integrations called through adapters
5. Response mapped to API DTO
6. Structured log emitted with request ID and latency

## 4. Project Structure Standard

Use this structure for all backend code:

- app/api/
- app/api/v1/
- app/api/v1/auth/
- app/api/v1/cases/
- app/api/v1/uploads/
- app/api/v1/webhooks/hubspot/
- lib/api/
- lib/api/contracts/
- lib/api/errors/
- lib/api/middleware/
- lib/application/
- lib/domain/
- lib/integrations/
- lib/integrations/hubspot/
- lib/repositories/
- lib/security/
- lib/observability/
- lib/config/

For HubSpot specifically:

- lib/api/hubspot/client.ts
- lib/api/hubspot/contacts.ts
- lib/api/hubspot/deals.ts
- lib/api/hubspot/properties.ts
- lib/api/hubspot/webhooks.ts

Keep route handlers thin and move reusable logic into lib.

## 5. API Design Standards

### 5.1 Versioning

- Prefix routes with version: /api/v1
- Introduce /api/v2 only for breaking contract changes
- Keep v1 and v2 live during migration windows

### 5.2 Resource naming

- Nouns, pluralized resources: /cases, /clients, /documents
- Nested resources only when ownership is strict: /cases/{caseId}/documents
- Avoid verbs in paths except action endpoints: /cases/{id}:sync

### 5.3 HTTP semantics

- GET: read only
- POST: create or command with side effects
- PUT: full replace
- PATCH: partial update
- DELETE: remove or soft-delete command

### 5.4 Pagination and filtering

- Cursor pagination for large datasets
- Query format example:
  - pageSize=50
  - cursor=opaque-token
  - sort=updatedAt:desc
  - filter=status:active

### 5.5 Standard response envelope

Use a consistent shape:

```json
{
  "data": {},
  "meta": {
    "requestId": "req_123",
    "timestamp": "2026-10-09T20:00:00.000Z"
  },
  "error": null
}
```

For errors:

```json
{
  "data": null,
  "meta": {
    "requestId": "req_123",
    "timestamp": "2026-10-09T20:00:00.000Z"
  },
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid clientId",
    "details": [
      {
        "field": "clientId",
        "reason": "required"
      }
    ]
  }
}
```

## 6. Validation and Contract Enforcement

- Validate all request params, query, headers, and body
- Prefer schema validation at API boundary
- Reject unknown fields unless explicitly allowed
- Normalize output to stable DTOs
- Never leak raw HubSpot payloads to frontend contracts

Recommended schema libraries:

- Zod or Valibot for runtime validation
- TypeScript types generated from schemas where possible

## 7. Authentication and Authorization

### 7.1 Authentication

- Use secure session authentication for clients
- Store session data server-side or signed HTTP-only cookies
- Enforce CSRF protection for cookie-based mutation routes

### 7.2 Authorization

- Role-based access control minimum roles:
  - client
  - consultant
  - admin
- Resource-level checks:
  - clients can only access their own case resources
  - consultants can access assigned cases
  - admins can access all with audit logging

### 7.3 Secrets management

- Keep all secrets in environment variables
- Never expose private tokens in client bundles
- Rotate tokens regularly

## 8. HubSpot Integration Pattern

Use adapter-based integration:

1. HubSpot client wrapper handles auth, retries, and rate-limit behavior
2. Service layer maps domain commands to HubSpot API calls
3. Mapping layer converts HubSpot fields to domain model
4. Error mapper converts HubSpot errors to internal typed errors

### 8.1 Required controls

- Exponential backoff with jitter for 429 and 5xx
- Circuit breaker or short-term fail-fast for persistent vendor outages
- Idempotency keys for write operations where possible
- Retry only safe operations or idempotent commands

### 8.2 Field mapping standard

- Keep all HubSpot property keys in one mapping module
- Avoid hardcoded property names in UI and route handlers
- Use typed mapping functions

## 9. File Upload and Document Pipeline

- Upload directly to object storage using signed URLs
- Store metadata in backend service, not only in file names
- Run malware scan and file-type validation before marking available
- Associate document records to case and uploader
- Emit domain event after upload completed

Recommended constraints:

- Max size per file
- Allowed MIME types
- Virus scan required before downstream processing

## 10. Webhooks and Event Handling

For HubSpot and internal webhooks:

- Verify signatures and timestamp windows
- Use idempotency table keyed by event ID
- Acknowledge quickly and process asynchronously
- Keep handler resilient to duplicate events and ordering issues

Webhook processing pattern:

1. Verify signature
2. Persist raw event and idempotency key
3. Queue background job
4. Process event in worker
5. Update case projections and notify users

## 11. Async Jobs and Reliability

Introduce a job queue for slow tasks:

- Sending email notifications
- HubSpot synchronization batches
- Reconciliation and retries
- Document post-processing

Queue standards:

- Dead-letter queue
- Retry policy with caps
- Visibility timeout
- Metrics for failure rate and lag

## 12. Caching and Performance

- Cache read-heavy queries with short TTL
- Use stale-while-revalidate where appropriate
- Never cache sensitive user data in shared caches without key scoping
- Invalidate cache on write events

For Next.js route handlers:

- Use explicit cache policy decisions per endpoint
- Avoid accidental caching of authenticated private responses

## 13. Error Handling Standard

- Define typed error classes with stable error codes
- Map internal errors to safe HTTP responses
- Include requestId in every error response
- Log full context server-side, return minimal safe detail client-side

Suggested code categories:

- VALIDATION_ERROR
- AUTHENTICATION_ERROR
- AUTHORIZATION_ERROR
- NOT_FOUND
- CONFLICT
- RATE_LIMITED
- EXTERNAL_PROVIDER_ERROR
- INTERNAL_ERROR

## 14. Observability and Auditing

### 14.1 Structured logging

Log JSON with:

- level
- message
- requestId
- userId or actorId
- route
- latencyMs
- provider and operation
- error code

### 14.2 Metrics

Track:

- request throughput
- p50, p95, p99 latency
- error rates by endpoint
- HubSpot API latency and failure rate
- queue depth and retry counts

### 14.3 Audit events

Persist audit records for:

- case status updates
- document requirement changes
- permission-sensitive operations

## 15. Testing Strategy

- Unit tests: domain rules, mappers, error mapping
- Integration tests: route handlers plus adapters with mocked provider responses
- Contract tests: ensure response envelope and schema compatibility
- End-to-end tests: critical flows (login, case view, uploads, status updates)

Release gate minimum:

- All tests pass
- Lint and type-check pass
- Contract compatibility checks pass

## 16. Security Baseline

- Enforce HTTPS only
- Add rate limiting per IP and per user identity
- Sanitize logs for secrets and PII
- Validate upload contents and block executable payloads
- Use least privilege for API tokens
- Apply dependency vulnerability scanning in CI

## 17. CI/CD and Environment Promotion

- Environments: dev, staging, production
- Require staging smoke tests before production deploy
- Use feature flags for risky backend changes
- Run database or schema migrations with rollback plan
- Document runbooks for provider outage and incident response

## 18. Implementation Roadmap for This Repo

1. Add API base structure under app/api/v1
2. Add schema validation and typed error utilities under lib/api
3. Implement HubSpot adapter under lib/api/hubspot with retries and error mapping
4. Add webhook endpoint and idempotency storage
5. Add upload service with signed URLs and metadata persistence
6. Add structured logging and request ID middleware
7. Add integration and contract test suites

## 19. Definition of Done for New Endpoints

An endpoint is not complete until:

- Contract schema exists and is validated
- Authentication and authorization checks are present
- Error mapping follows standard codes
- Observability logs and metrics are emitted
- Tests cover success and failure paths
- Documentation updated

## 20. Quick Checklist

- Is the route versioned?
- Are all inputs validated?
- Is authz enforced at resource level?
- Are HubSpot calls isolated behind adapters?
- Are retries and rate-limit behavior explicit?
- Is the response envelope consistent?
- Are logs structured with requestId?
- Are tests and docs updated?
