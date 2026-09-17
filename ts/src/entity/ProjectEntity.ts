
import { inspect } from 'node:util'

import { MixpanelAnnotationsEntityBase } from '../MixpanelAnnotationsEntityBase'

import type {
  MixpanelAnnotationsSDK,
} from '../MixpanelAnnotationsSDK'


import type {
  Operation,
  Context,
  Control,
} from '../types'

import type {
  Project,
} from '../MixpanelAnnotationsTypes'

// TODO: needs Entity superclass
class ProjectEntity extends MixpanelAnnotationsEntityBase<Project> {

  constructor(client: MixpanelAnnotationsSDK, entopts: any) {
    super(client, entopts)
    this.name = 'project'
    this.name_ = 'project'
    this.Name = 'Project'
  }


  make(this: ProjectEntity) {
    return new ProjectEntity(this._client, this.entopts())
  }







}


export {
  ProjectEntity
}
