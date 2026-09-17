import { MixpanelAnnotationsEntityBase } from '../MixpanelAnnotationsEntityBase';
import type { MixpanelAnnotationsSDK } from '../MixpanelAnnotationsSDK';
import type { Control } from '../types';
import type { ListAnnotation, ListAnnotationListMatch } from '../MixpanelAnnotationsTypes';
declare class ListAnnotationEntity extends MixpanelAnnotationsEntityBase<ListAnnotation> {
    constructor(client: MixpanelAnnotationsSDK, entopts: any);
    make(this: ListAnnotationEntity): ListAnnotationEntity;
    list(this: any, reqmatch?: ListAnnotationListMatch, ctrl?: Control): Promise<ListAnnotationEntity[]>;
}
export { ListAnnotationEntity };
