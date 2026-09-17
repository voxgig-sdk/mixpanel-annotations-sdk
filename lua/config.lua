-- MixpanelAnnotations SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "MixpanelAnnotations",
      slug = "mixpanel-annotations",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["debug"] = {
        ["options"] = {
          ["active"] = false,
          ["max"] = 100,
          ["redact"] = {
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          },
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["onEntry"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["idempotency"] = {
        ["options"] = {
          ["active"] = false,
          ["header"] = "Idempotency-Key",
          ["methods"] = {
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          },
          ["ops"] = {
            "create",
            "update",
            "remove",
          },
        },
        ["optspec"] = {
          ["keygen"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["metrics"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["paging"] = {
        ["options"] = {
          ["active"] = false,
          ["afterVar"] = "after",
          ["cursorParam"] = "cursor",
          ["firstVar"] = "first",
          ["limitParam"] = "limit",
          ["pageParam"] = "page",
          ["startPage"] = 1,
        },
        ["optspec"] = {
          ["limit"] = "`$NUMBER`",
          ["ops"] = "`$LIST`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://{regionAndDomain}.com/api/app",
      server = {
        ["regionAndDomain"] = "mixpanel",
      },
      auth = {
        prefix = "Basic",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["annotation"] = {},
        ["annotation_tag"] = {},
        ["list_annotation"] = {},
        ["project"] = {},
        ["tag"] = {},
      },
    },
    entity = {
      ["annotation"] = {
        ["fields"] = {
          {
            ["name"] = "date",
            ["short"] = "A string representation of a date in \"YYYY-MM-DD HH:mm:ss\" format",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["short"] = "The text that will be shown when looking at the annotation",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "tags",
            ["short"] = "The ids of the tags to be added to the annotation",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "user",
            ["short"] = "Info about the creator of the annotation",
            ["type"] = "`$OBJECT`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "annotation",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/projects/{projectId}/annotations",
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "annotations",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "annotations",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "annotation_id",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}/annotations/{annotationId}",
                ["rename"] = {
                  ["param"] = {
                    ["annotationId"] = "id",
                    ["projectId"] = "project_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "annotations",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "annotations",
                  "{id}",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "annotation_id",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/projects/{projectId}/annotations/{annotationId}",
                ["rename"] = {
                  ["param"] = {
                    ["annotationId"] = "id",
                    ["projectId"] = "project_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "annotations",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "annotations",
                  "{id}",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "annotation_id",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/projects/{projectId}/annotations/{annotationId}",
                ["rename"] = {
                  ["param"] = {
                    ["annotationId"] = "id",
                    ["projectId"] = "project_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "annotations",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "annotations",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "project",
            },
          },
        },
      },
      ["annotation_tag"] = {
        ["fields"] = {
          {
            ["name"] = "has_annotations",
            ["short"] = "whether the tag is currently attached to any annotations",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "project_id",
            ["type"] = "`$NUMBER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "annotation_tag",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}/annotations/tags",
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "annotations",
                  },
                  {
                    ["lit"] = "tags",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "annotations",
                  "tags",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "project",
            },
          },
        },
      },
      ["list_annotation"] = {
        ["fields"] = {
          {
            ["name"] = "date",
            ["short"] = "A string representation of a date in \"YYYY-MM-DD HH:mm:ss\" format",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["short"] = "The text that will be shown when looking at the annotation",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "tags",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "user",
            ["short"] = "Info about the creator of the annotation",
            ["type"] = "`$OBJECT`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "list_annotation",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "from_date",
                      ["orig"] = "from_date",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "to_date",
                      ["orig"] = "to_date",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}/annotations",
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "annotations",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "from_date",
                    "project_id",
                    "to_date",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "annotations",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "project",
            },
          },
        },
      },
      ["project"] = {
        ["fields"] = {},
        ["name"] = "project",
        ["op"] = {},
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["tag"] = {
        ["fields"] = {
          {
            ["name"] = "has_annotations",
            ["short"] = "whether the tag is currently attached to any annotations",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["short"] = "The text that will be shown when the tag is added to an annotation",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "project_id",
            ["type"] = "`$NUMBER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "tag",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/projects/{projectId}/annotations/tags",
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "annotations",
                  },
                  {
                    ["lit"] = "tags",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "annotations",
                  "tags",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "project",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
