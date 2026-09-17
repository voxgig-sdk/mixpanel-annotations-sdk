# Typed models for the MixpanelAnnotations SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Annotation(TypedDict, total=False):
    date: str
    description: str
    id: float
    tags: list
    user: dict


class AnnotationLoadMatch(TypedDict):
    id: float
    project_id: int


class AnnotationCreateDataRequired(TypedDict):
    project_id: int


class AnnotationCreateData(AnnotationCreateDataRequired, total=False):
    date: str
    description: str
    id: float
    tags: list
    user: dict


class AnnotationUpdateDataRequired(TypedDict):
    id: float
    project_id: int


class AnnotationUpdateData(AnnotationUpdateDataRequired, total=False):
    date: str
    description: str
    tags: list
    user: dict


class AnnotationRemoveMatch(TypedDict):
    id: float
    project_id: int


class AnnotationTag(TypedDict, total=False):
    has_annotations: bool
    id: float
    name: str
    project_id: float


class AnnotationTagListMatch(TypedDict):
    project_id: int


class ListAnnotation(TypedDict, total=False):
    date: str
    description: str
    id: float
    tags: list
    user: dict


class ListAnnotationListMatchRequired(TypedDict):
    project_id: int


class ListAnnotationListMatch(ListAnnotationListMatchRequired, total=False):
    from_date: str
    to_date: str


class Project(TypedDict):
    pass


class Tag(TypedDict, total=False):
    has_annotations: bool
    id: float
    name: str
    project_id: float


class TagCreateDataRequired(TypedDict):
    project_id: int


class TagCreateData(TagCreateDataRequired, total=False):
    has_annotations: bool
    id: float
    name: str
