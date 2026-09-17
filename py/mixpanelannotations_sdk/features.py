# MixpanelAnnotations SDK feature factory

from mixpanelannotations_sdk.feature.base_feature import MixpanelAnnotationsBaseFeature
from mixpanelannotations_sdk.feature.debug_feature import MixpanelAnnotationsDebugFeature
from mixpanelannotations_sdk.feature.idempotency_feature import MixpanelAnnotationsIdempotencyFeature
from mixpanelannotations_sdk.feature.metrics_feature import MixpanelAnnotationsMetricsFeature
from mixpanelannotations_sdk.feature.paging_feature import MixpanelAnnotationsPagingFeature
from mixpanelannotations_sdk.feature.ratelimit_feature import MixpanelAnnotationsRatelimitFeature
from mixpanelannotations_sdk.feature.retry_feature import MixpanelAnnotationsRetryFeature
from mixpanelannotations_sdk.feature.test_feature import MixpanelAnnotationsTestFeature
from mixpanelannotations_sdk.feature.timeout_feature import MixpanelAnnotationsTimeoutFeature


_FEATURES = {
    "base": lambda: MixpanelAnnotationsBaseFeature(),
    "debug": lambda: MixpanelAnnotationsDebugFeature(),
    "idempotency": lambda: MixpanelAnnotationsIdempotencyFeature(),
    "metrics": lambda: MixpanelAnnotationsMetricsFeature(),
    "paging": lambda: MixpanelAnnotationsPagingFeature(),
    "ratelimit": lambda: MixpanelAnnotationsRatelimitFeature(),
    "retry": lambda: MixpanelAnnotationsRetryFeature(),
    "test": lambda: MixpanelAnnotationsTestFeature(),
    "timeout": lambda: MixpanelAnnotationsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
