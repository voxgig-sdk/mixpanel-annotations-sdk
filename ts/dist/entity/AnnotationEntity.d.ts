import { MixpanelAnnotationsEntityBase } from '../MixpanelAnnotationsEntityBase';
import type { MixpanelAnnotationsSDK } from '../MixpanelAnnotationsSDK';
import type { Control } from '../types';
import type { Annotation, AnnotationLoadMatch, AnnotationCreateData, AnnotationUpdateData, AnnotationRemoveMatch } from '../MixpanelAnnotationsTypes';
declare class AnnotationEntity extends MixpanelAnnotationsEntityBase<Annotation> {
    constructor(client: MixpanelAnnotationsSDK, entopts: any);
    make(this: AnnotationEntity): AnnotationEntity;
    load(this: any, reqmatch?: AnnotationLoadMatch, ctrl?: Control): Promise<AnnotationEntity>;
    create(this: any, reqdata?: AnnotationCreateData, ctrl?: Control): Promise<AnnotationEntity>;
    update(this: any, reqdata?: AnnotationUpdateData, ctrl?: Control): Promise<AnnotationEntity>;
    remove(this: any, reqmatch?: AnnotationRemoveMatch, ctrl?: Control): Promise<AnnotationEntity>;
}
export { AnnotationEntity };
