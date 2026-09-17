package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAnnotationEntityFunc func(client *MixpanelAnnotationsSDK, entopts map[string]any) MixpanelAnnotationsEntity

var NewAnnotationTagEntityFunc func(client *MixpanelAnnotationsSDK, entopts map[string]any) MixpanelAnnotationsEntity

var NewListAnnotationEntityFunc func(client *MixpanelAnnotationsSDK, entopts map[string]any) MixpanelAnnotationsEntity

var NewProjectEntityFunc func(client *MixpanelAnnotationsSDK, entopts map[string]any) MixpanelAnnotationsEntity

var NewTagEntityFunc func(client *MixpanelAnnotationsSDK, entopts map[string]any) MixpanelAnnotationsEntity

