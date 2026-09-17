// Typed models for the MixpanelAnnotations SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Annotation {
  date?: string
  description?: string
  id?: number
  tags?: any[]
  user?: Record<string, any>
}

export interface AnnotationLoadMatch {
  id: number
  project_id: number
}

export interface AnnotationCreateData {
  project_id: number
  date?: string
  description?: string
  id?: number
  tags?: any[]
  user?: Record<string, any>
}

export interface AnnotationUpdateData {
  id: number
  project_id: number
  date?: string
  description?: string
  tags?: any[]
  user?: Record<string, any>
}

export interface AnnotationRemoveMatch {
  id: number
  project_id: number
}

export interface AnnotationTag {
  has_annotations?: boolean
  id?: number
  name?: string
  project_id?: number
}

export interface AnnotationTagListMatch {
  project_id: number
}

export interface ListAnnotation {
  date?: string
  description?: string
  id?: number
  tags?: any[]
  user?: Record<string, any>
}

export interface ListAnnotationListMatch {
  project_id: number
  from_date?: string
  to_date?: string
}

export interface Project {
}

export interface Tag {
  has_annotations?: boolean
  id?: number
  name?: string
  project_id?: number
}

export interface TagCreateData {
  project_id: number
  has_annotations?: boolean
  id?: number
  name?: string
}

