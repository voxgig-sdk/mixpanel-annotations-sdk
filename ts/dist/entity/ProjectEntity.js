"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectEntity = void 0;
const MixpanelAnnotationsEntityBase_1 = require("../MixpanelAnnotationsEntityBase");
// TODO: needs Entity superclass
class ProjectEntity extends MixpanelAnnotationsEntityBase_1.MixpanelAnnotationsEntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'project';
        this.name_ = 'project';
        this.Name = 'Project';
    }
    make() {
        return new ProjectEntity(this._client, this.entopts());
    }
}
exports.ProjectEntity = ProjectEntity;
//# sourceMappingURL=ProjectEntity.js.map