<?php
declare(strict_types=1);

// Typed models for the MixpanelAnnotations SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Annotation entity data model. */
class Annotation
{
    public ?string $date = null;
    public ?string $description = null;
    public ?float $id = null;
    public ?array $tags = null;
    public ?array $user = null;
}

/** Request payload for Annotation#load. */
class AnnotationLoadMatch
{
    public float $id;
    public int $project_id;
}

/** Request payload for Annotation#create. */
class AnnotationCreateData
{
    public int $project_id;
    public ?string $date = null;
    public ?string $description = null;
    public ?float $id = null;
    public ?array $tags = null;
    public ?array $user = null;
}

/** Request payload for Annotation#update. */
class AnnotationUpdateData
{
    public float $id;
    public int $project_id;
    public ?string $date = null;
    public ?string $description = null;
    public ?array $tags = null;
    public ?array $user = null;
}

/** Request payload for Annotation#remove. */
class AnnotationRemoveMatch
{
    public float $id;
    public int $project_id;
}

/** AnnotationTag entity data model. */
class AnnotationTag
{
    public ?bool $has_annotations = null;
    public ?float $id = null;
    public ?string $name = null;
    public ?float $project_id = null;
}

/** Request payload for AnnotationTag#list. */
class AnnotationTagListMatch
{
    public int $project_id;
}

/** ListAnnotation entity data model. */
class ListAnnotation
{
    public ?string $date = null;
    public ?string $description = null;
    public ?float $id = null;
    public ?array $tags = null;
    public ?array $user = null;
}

/** Request payload for ListAnnotation#list. */
class ListAnnotationListMatch
{
    public int $project_id;
    public ?string $from_date = null;
    public ?string $to_date = null;
}

/** Project entity data model. */
class Project
{
}

/** Tag entity data model. */
class Tag
{
    public ?bool $has_annotations = null;
    public ?float $id = null;
    public ?string $name = null;
    public ?float $project_id = null;
}

/** Request payload for Tag#create. */
class TagCreateData
{
    public int $project_id;
    public ?bool $has_annotations = null;
    public ?float $id = null;
    public ?string $name = null;
}

