package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "MixpanelAnnotations",
			"slug": "mixpanel-annotations",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://{regionAndDomain}.com/api/app",
			"server": map[string]any{
				"regionAndDomain": "mixpanel",
			},
			"auth": map[string]any{
				"prefix": "Basic",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"annotation": map[string]any{},
				"annotation_tag": map[string]any{},
				"list_annotation": map[string]any{},
				"project": map[string]any{},
				"tag": map[string]any{},
			},
		},
		"entity": map[string]any{
			"annotation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date",
						"short": "A string representation of a date in \"YYYY-MM-DD HH:mm:ss\" format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "The text that will be shown when looking at the annotation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "tags",
						"short": "The ids of the tags to be added to the annotation",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "user",
						"short": "Info about the creator of the annotation",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "annotation",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "project_id",
											"orig": "project_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/projects/{projectId}/annotations",
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "annotations",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"annotations",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "annotation_id",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "param",
											"name": "project_id",
											"orig": "project_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/projects/{projectId}/annotations/{annotationId}",
								"rename": map[string]any{
									"param": map[string]any{
										"annotationId": "id",
										"projectId": "project_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "annotations",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"annotations",
									"{id}",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "annotation_id",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "param",
											"name": "project_id",
											"orig": "project_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/projects/{projectId}/annotations/{annotationId}",
								"rename": map[string]any{
									"param": map[string]any{
										"annotationId": "id",
										"projectId": "project_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "annotations",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"annotations",
									"{id}",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "annotation_id",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "param",
											"name": "project_id",
											"orig": "project_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/projects/{projectId}/annotations/{annotationId}",
								"rename": map[string]any{
									"param": map[string]any{
										"annotationId": "id",
										"projectId": "project_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "annotations",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"annotations",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"project",
						},
					},
				},
			},
			"annotation_tag": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "has_annotations",
						"short": "whether the tag is currently attached to any annotations",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "project_id",
						"type": "`$NUMBER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "annotation_tag",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "project_id",
											"orig": "project_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/projects/{projectId}/annotations/tags",
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "annotations",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"annotations",
									"tags",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"project",
						},
					},
				},
			},
			"list_annotation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date",
						"short": "A string representation of a date in \"YYYY-MM-DD HH:mm:ss\" format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "The text that will be shown when looking at the annotation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "user",
						"short": "Info about the creator of the annotation",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "list_annotation",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "project_id",
											"orig": "project_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "from_date",
											"orig": "from_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "to_date",
											"orig": "to_date",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/projects/{projectId}/annotations",
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "annotations",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from_date",
										"project_id",
										"to_date",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"annotations",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"project",
						},
					},
				},
			},
			"project": map[string]any{
				"fields": []any{},
				"name": "project",
				"op": map[string]any{},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"tag": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "has_annotations",
						"short": "whether the tag is currently attached to any annotations",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "The text that will be shown when the tag is added to an annotation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "project_id",
						"type": "`$NUMBER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "tag",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "project_id",
											"orig": "project_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/projects/{projectId}/annotations/tags",
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "annotations",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"annotations",
									"tags",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"project",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
