import { MixpanelAnnotationsEntityBase } from '../MixpanelAnnotationsEntityBase';
import type { MixpanelAnnotationsSDK } from '../MixpanelAnnotationsSDK';
import type { Control } from '../types';
import type { Tag, TagCreateData } from '../MixpanelAnnotationsTypes';
declare class TagEntity extends MixpanelAnnotationsEntityBase<Tag> {
    constructor(client: MixpanelAnnotationsSDK, entopts: any);
    make(this: TagEntity): TagEntity;
    create(this: any, reqdata?: TagCreateData, ctrl?: Control): Promise<TagEntity>;
}
export { TagEntity };
