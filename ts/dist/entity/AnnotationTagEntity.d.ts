import { MixpanelAnnotationsEntityBase } from '../MixpanelAnnotationsEntityBase';
import type { MixpanelAnnotationsSDK } from '../MixpanelAnnotationsSDK';
import type { Control } from '../types';
import type { AnnotationTag, AnnotationTagListMatch } from '../MixpanelAnnotationsTypes';
declare class AnnotationTagEntity extends MixpanelAnnotationsEntityBase<AnnotationTag> {
    constructor(client: MixpanelAnnotationsSDK, entopts: any);
    make(this: AnnotationTagEntity): AnnotationTagEntity;
    list(this: any, reqmatch?: AnnotationTagListMatch, ctrl?: Control): Promise<AnnotationTagEntity[]>;
}
export { AnnotationTagEntity };
