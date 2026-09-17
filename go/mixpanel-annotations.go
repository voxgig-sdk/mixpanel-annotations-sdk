package voxgigmixpanelannotationssdk

import (
	"github.com/voxgig-sdk/mixpanel-annotations-sdk/go/core"
	"github.com/voxgig-sdk/mixpanel-annotations-sdk/go/entity"
	"github.com/voxgig-sdk/mixpanel-annotations-sdk/go/feature"
	_ "github.com/voxgig-sdk/mixpanel-annotations-sdk/go/utility"
)

// Type aliases preserve external API.
type MixpanelAnnotationsSDK = core.MixpanelAnnotationsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MixpanelAnnotationsEntity = core.MixpanelAnnotationsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MixpanelAnnotationsError = core.MixpanelAnnotationsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewAnnotationEntityFunc = func(client *core.MixpanelAnnotationsSDK, entopts map[string]any) core.MixpanelAnnotationsEntity {
		return entity.NewAnnotationEntity(client, entopts)
	}
	core.NewAnnotationTagEntityFunc = func(client *core.MixpanelAnnotationsSDK, entopts map[string]any) core.MixpanelAnnotationsEntity {
		return entity.NewAnnotationTagEntity(client, entopts)
	}
	core.NewListAnnotationEntityFunc = func(client *core.MixpanelAnnotationsSDK, entopts map[string]any) core.MixpanelAnnotationsEntity {
		return entity.NewListAnnotationEntity(client, entopts)
	}
	core.NewProjectEntityFunc = func(client *core.MixpanelAnnotationsSDK, entopts map[string]any) core.MixpanelAnnotationsEntity {
		return entity.NewProjectEntity(client, entopts)
	}
	core.NewTagEntityFunc = func(client *core.MixpanelAnnotationsSDK, entopts map[string]any) core.MixpanelAnnotationsEntity {
		return entity.NewTagEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMixpanelAnnotationsSDK = core.NewMixpanelAnnotationsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewMixpanelAnnotationsSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *MixpanelAnnotationsSDK  { return NewMixpanelAnnotationsSDK(nil) }
func Test() *MixpanelAnnotationsSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
