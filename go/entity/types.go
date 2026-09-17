// Typed models for the MixpanelAnnotations SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/mixpanel-annotations-sdk/go/core"
)

// Annotation is the typed data model for the annotation entity.
type Annotation struct {
	Date *string `json:"date,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *float64 `json:"id,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// AnnotationLoadMatch is the typed request payload for Annotation.LoadTyped.
type AnnotationLoadMatch struct {
	Id float64 `json:"id"`
	ProjectId int `json:"project_id"`
}

// AnnotationCreateData is the typed request payload for Annotation.CreateTyped.
type AnnotationCreateData struct {
	ProjectId int `json:"project_id"`
	Date *string `json:"date,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *float64 `json:"id,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// AnnotationUpdateData is the typed request payload for Annotation.UpdateTyped.
type AnnotationUpdateData struct {
	Id float64 `json:"id"`
	ProjectId int `json:"project_id"`
	Date *string `json:"date,omitempty"`
	Description *string `json:"description,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// AnnotationRemoveMatch is the typed request payload for Annotation.RemoveTyped.
type AnnotationRemoveMatch struct {
	Id float64 `json:"id"`
	ProjectId int `json:"project_id"`
}

// AnnotationTag is the typed data model for the annotation_tag entity.
type AnnotationTag struct {
	HasAnnotations *bool `json:"has_annotations,omitempty"`
	Id *float64 `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ProjectId *float64 `json:"project_id,omitempty"`
}

// AnnotationTagListMatch is the typed request payload for AnnotationTag.ListTyped.
type AnnotationTagListMatch struct {
	ProjectId int `json:"project_id"`
}

// ListAnnotation is the typed data model for the list_annotation entity.
type ListAnnotation struct {
	Date *string `json:"date,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *float64 `json:"id,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// ListAnnotationListMatch is the typed request payload for ListAnnotation.ListTyped.
type ListAnnotationListMatch struct {
	ProjectId int `json:"project_id"`
	FromDate *string `json:"from_date,omitempty"`
	ToDate *string `json:"to_date,omitempty"`
}

// Project is the typed data model for the project entity.
type Project struct {
}

// Tag is the typed data model for the tag entity.
type Tag struct {
	HasAnnotations *bool `json:"has_annotations,omitempty"`
	Id *float64 `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ProjectId *float64 `json:"project_id,omitempty"`
}

// TagCreateData is the typed request payload for Tag.CreateTyped.
type TagCreateData struct {
	ProjectId int `json:"project_id"`
	HasAnnotations *bool `json:"has_annotations,omitempty"`
	Id *float64 `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
