# MixpanelAnnotations SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "MixpanelAnnotations",
            "slug": "mixpanel-annotations",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://{regionAndDomain}.com/api/app",
            "server": {
                "regionAndDomain": "mixpanel",
            },
            "auth": {
                "prefix": "Basic",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "annotation": {},
                "annotation_tag": {},
                "list_annotation": {},
                "project": {},
                "tag": {},
            },
        },
        "entity": {
      "annotation": {
        "fields": [
          {
            "name": "date",
            "short": "A string representation of a date in \"YYYY-MM-DD HH:mm:ss\" format",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "The text that will be shown when looking at the annotation",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$NUMBER`",
          },
          {
            "name": "tags",
            "short": "The ids of the tags to be added to the annotation",
            "type": "`$ARRAY`",
          },
          {
            "name": "user",
            "short": "Info about the creator of the annotation",
            "type": "`$OBJECT`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "annotation",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/projects/{projectId}/annotations",
                "rename": {
                  "param": {
                    "projectId": "project_id",
                  },
                },
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "annotations",
                  },
                ],
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "projects",
                  "{project_id}",
                  "annotations",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "annotation_id",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/projects/{projectId}/annotations/{annotationId}",
                "rename": {
                  "param": {
                    "annotationId": "id",
                    "projectId": "project_id",
                  },
                },
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "annotations",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                    "project_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "projects",
                  "{project_id}",
                  "annotations",
                  "{id}",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "annotation_id",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/projects/{projectId}/annotations/{annotationId}",
                "rename": {
                  "param": {
                    "annotationId": "id",
                    "projectId": "project_id",
                  },
                },
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "annotations",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                    "project_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "projects",
                  "{project_id}",
                  "annotations",
                  "{id}",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "annotation_id",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/projects/{projectId}/annotations/{annotationId}",
                "rename": {
                  "param": {
                    "annotationId": "id",
                    "projectId": "project_id",
                  },
                },
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "annotations",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                    "project_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "projects",
                  "{project_id}",
                  "annotations",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "project",
            ],
          ],
        },
      },
      "annotation_tag": {
        "fields": [
          {
            "name": "has_annotations",
            "short": "whether the tag is currently attached to any annotations",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "id",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "project_id",
            "type": "`$NUMBER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "annotation_tag",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/projects/{projectId}/annotations/tags",
                "rename": {
                  "param": {
                    "projectId": "project_id",
                  },
                },
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "annotations",
                  },
                  {
                    "lit": "tags",
                  },
                ],
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "projects",
                  "{project_id}",
                  "annotations",
                  "tags",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "project",
            ],
          ],
        },
      },
      "list_annotation": {
        "fields": [
          {
            "name": "date",
            "short": "A string representation of a date in \"YYYY-MM-DD HH:mm:ss\" format",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "The text that will be shown when looking at the annotation",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$NUMBER`",
          },
          {
            "name": "tags",
            "type": "`$ARRAY`",
          },
          {
            "name": "user",
            "short": "Info about the creator of the annotation",
            "type": "`$OBJECT`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "list_annotation",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "from_date",
                      "orig": "from_date",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "to_date",
                      "orig": "to_date",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/projects/{projectId}/annotations",
                "rename": {
                  "param": {
                    "projectId": "project_id",
                  },
                },
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "annotations",
                  },
                ],
                "select": {
                  "exist": [
                    "from_date",
                    "project_id",
                    "to_date",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "projects",
                  "{project_id}",
                  "annotations",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "project",
            ],
          ],
        },
      },
      "project": {
        "fields": [],
        "name": "project",
        "op": {},
        "relations": {
          "ancestors": [],
        },
      },
      "tag": {
        "fields": [
          {
            "name": "has_annotations",
            "short": "whether the tag is currently attached to any annotations",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "id",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "short": "The text that will be shown when the tag is added to an annotation",
            "type": "`$STRING`",
          },
          {
            "name": "project_id",
            "type": "`$NUMBER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "tag",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/projects/{projectId}/annotations/tags",
                "rename": {
                  "param": {
                    "projectId": "project_id",
                  },
                },
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "annotations",
                  },
                  {
                    "lit": "tags",
                  },
                ],
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "projects",
                  "{project_id}",
                  "annotations",
                  "tags",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "project",
            ],
          ],
        },
      },
    },
    }
