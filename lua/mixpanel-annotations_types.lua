-- Typed models for the MixpanelAnnotations SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Annotation
---@field date? string
---@field description? string
---@field id? number
---@field tags? table
---@field user? table

---@class AnnotationLoadMatch
---@field id number
---@field project_id number

---@class AnnotationCreateData
---@field project_id number
---@field date? string
---@field description? string
---@field id? number
---@field tags? table
---@field user? table

---@class AnnotationUpdateData
---@field id number
---@field project_id number
---@field date? string
---@field description? string
---@field tags? table
---@field user? table

---@class AnnotationRemoveMatch
---@field id number
---@field project_id number

---@class AnnotationTag
---@field has_annotations? boolean
---@field id? number
---@field name? string
---@field project_id? number

---@class AnnotationTagListMatch
---@field project_id number

---@class ListAnnotation
---@field date? string
---@field description? string
---@field id? number
---@field tags? table
---@field user? table

---@class ListAnnotationListMatch
---@field project_id number
---@field from_date? string
---@field to_date? string

---@class Project

---@class Tag
---@field has_annotations? boolean
---@field id? number
---@field name? string
---@field project_id? number

---@class TagCreateData
---@field project_id number
---@field has_annotations? boolean
---@field id? number
---@field name? string

local M = {}

return M
