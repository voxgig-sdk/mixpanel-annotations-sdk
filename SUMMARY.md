# Annotations API

Use annotations to label specific points in time in your charts with a description.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 5 entities and 7 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Annotation](docs/api/annotation.html)

Results: Success.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `date`: A string representation of a date in &quot;YYYY-MM-DD HH:mm:ss&quot; format
- `description`: The text that will be shown when looking at the annotation
- `tags`: The ids of the tags to be added to the annotation
- `user`: Info about the creator of the annotation

### [AnnotationTag](docs/api/annotation_tag.html)

Results: Success.

SDK operations: `list`.

Key fields to recognise:

- `has_annotations`: whether the tag is currently attached to any annotations

### [ListAnnotation](docs/api/list_annotation.html)

Results: Success.

SDK operations: `list`.

Key fields to recognise:

- `date`: A string representation of a date in &quot;YYYY-MM-DD HH:mm:ss&quot; format
- `description`: The text that will be shown when looking at the annotation
- `user`: Info about the creator of the annotation

### [Project](docs/api/project.html)

SDK operations: .

### [Tag](docs/api/tag.html)

Results: Success.

SDK operations: `create`.

Key fields to recognise:

- `has_annotations`: whether the tag is currently attached to any annotations
- `name`: The text that will be shown when the tag is added to an annotation

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Annotation](docs/api/annotation.html) | `create` | `POST /projects/{projectId}/annotations` | Required |
| [Annotation](docs/api/annotation.html) | `load` | `GET /projects/{projectId}/annotations/{annotationId}` | Required |
| [Annotation](docs/api/annotation.html) | `remove` | `DELETE /projects/{projectId}/annotations/{annotationId}` | Required |
| [Annotation](docs/api/annotation.html) | `update` | `PATCH /projects/{projectId}/annotations/{annotationId}` | Required |
| [AnnotationTag](docs/api/annotation_tag.html) | `list` | `GET /projects/{projectId}/annotations/tags` | Required |
| [ListAnnotation](docs/api/list_annotation.html) | `list` | `GET /projects/{projectId}/annotations` | Required |
| [Tag](docs/api/tag.html) | `create` | `POST /projects/{projectId}/annotations/tags` | Required |

## Connect to the API

- Mixpanel&#39;s application API server.: `https://{regionAndDomain}.com/api/app`

The default credential is sent in the `Authorization` header with the `Basic` prefix.

OAuth Token

Project Secret

Service Account

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [JavaScript](docs/sdks/js.html) | `js/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `mixpanel-annotations_list`: List records for an entity. Supported entities: `annotation_tag`, `list_annotation`.
- `mixpanel-annotations_load`: Load one record for an entity. Supported entities: `annotation`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

