# MixpanelAnnotations SDK utility: make_context

from mixpanelannotations_sdk.core.context import MixpanelAnnotationsContext


def make_context_util(ctxmap, basectx):
    return MixpanelAnnotationsContext(ctxmap, basectx)
