// Typed models for the MixpanelAnnotations SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Annotation
 * @property {string} [date]
 * @property {string} [description]
 * @property {number} [id]
 * @property {Array} [tags]
 * @property {Object} [user]
 */

/**
 * @typedef {Object} AnnotationLoadMatch
 * @property {number} id
 * @property {number} project_id
 */

/**
 * @typedef {Object} AnnotationCreateData
 * @property {number} project_id
 * @property {string} [date]
 * @property {string} [description]
 * @property {number} [id]
 * @property {Array} [tags]
 * @property {Object} [user]
 */

/**
 * @typedef {Object} AnnotationUpdateData
 * @property {number} id
 * @property {number} project_id
 * @property {string} [date]
 * @property {string} [description]
 * @property {Array} [tags]
 * @property {Object} [user]
 */

/**
 * @typedef {Object} AnnotationRemoveMatch
 * @property {number} id
 * @property {number} project_id
 */

/**
 * @typedef {Object} AnnotationTag
 * @property {boolean} [has_annotations]
 * @property {number} [id]
 * @property {string} [name]
 * @property {number} [project_id]
 */

/**
 * @typedef {Object} AnnotationTagListMatch
 * @property {number} project_id
 */

/**
 * @typedef {Object} ListAnnotation
 * @property {string} [date]
 * @property {string} [description]
 * @property {number} [id]
 * @property {Array} [tags]
 * @property {Object} [user]
 */

/**
 * @typedef {Object} ListAnnotationListMatch
 * @property {number} project_id
 * @property {string} [from_date]
 * @property {string} [to_date]
 */

/**
 * @typedef {Object} Project
 */

/**
 * @typedef {Object} Tag
 * @property {boolean} [has_annotations]
 * @property {number} [id]
 * @property {string} [name]
 * @property {number} [project_id]
 */

/**
 * @typedef {Object} TagCreateData
 * @property {number} project_id
 * @property {boolean} [has_annotations]
 * @property {number} [id]
 * @property {string} [name]
 */

