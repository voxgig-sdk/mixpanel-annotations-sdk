
const { inspect } = require('node:util')

const { MixpanelAnnotationsEntityBase } = require('../MixpanelAnnotationsEntityBase')


// TODO: needs Entity superclass
class ProjectEntity extends MixpanelAnnotationsEntityBase {

  constructor(client, entopts) {
    super(client, entopts)
    this.name = 'project'
    this.name_ = 'project'
    this.Name = 'Project'
  }


  make() {
    return new ProjectEntity(this._client, this.entopts())
  }







}


module.exports = {
  ProjectEntity
}
