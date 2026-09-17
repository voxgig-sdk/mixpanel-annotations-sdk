import { MixpanelAnnotationsEntityBase } from '../MixpanelAnnotationsEntityBase';
import type { MixpanelAnnotationsSDK } from '../MixpanelAnnotationsSDK';
import type { Project } from '../MixpanelAnnotationsTypes';
declare class ProjectEntity extends MixpanelAnnotationsEntityBase<Project> {
    constructor(client: MixpanelAnnotationsSDK, entopts: any);
    make(this: ProjectEntity): ProjectEntity;
}
export { ProjectEntity };
