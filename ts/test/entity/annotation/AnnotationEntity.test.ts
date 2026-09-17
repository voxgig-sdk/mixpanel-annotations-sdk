

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MixpanelAnnotationsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('AnnotationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_ANNOTATIONS_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_ANNOTATIONS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelAnnotationsSDK.test()
    const ent = testsdk.Annotation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MIXPANEL_ANNOTATIONS_TEST_LIVE
    for (const op of ['create', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'annotation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"date","req":false,"short":"A string representation of a date in \"YYYY-MM-DD HH:mm:ss\" format","type":"`$STRING`","index$":0},{"active":true,"name":"description","req":false,"short":"The text that will be shown when looking at the annotation","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$NUMBER`","index$":2},{"active":true,"name":"tags","req":false,"short":"The ids of the tags to be added to the annotation","type":"`$ARRAY`","index$":3},{"active":true,"name":"user","req":false,"short":"Info about the creator of the annotation","type":"`$OBJECT`","index$":4}],"id":{"field":"id","name":"id"},"name":"annotation","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"POST /projects/{projectId}/annotations","json":"{\"operationId\":\"create-annotation\",\"parameters\":[{\"description\":\"Your project id (eg: 12345)\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"date\":{\"description\":\"A string representation of a date in \\\"YYYY-MM-DD HH:mm:ss\\\" format\",\"example\":\"2022-02-15 12:00:00\",\"type\":\"string\"},\"description\":{\"description\":\"The text that will be shown when looking at the annotation\",\"example\":\"Something interesting happened!\",\"type\":\"string\"},\"tags\":{\"description\":\"The ids of the tags to be added to the annotation\",\"items\":{\"type\":\"number\"},\"title\":\"TagIds\",\"type\":\"array\"}}}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"description\":\"A JSON response object containing an annotation'\",\"properties\":{\"results\":{\"additionalProperties\":false,\"description\":\"Representation of a single annotation\",\"properties\":{\"date\":{\"description\":\"A string representation of a date in \\\"YYYY-MM-DD HH:mm:ss\\\" format\",\"example\":\"2022-02-15 12:00:00\",\"type\":\"string\"},\"description\":{\"description\":\"The text that will be shown when looking at the annotation\",\"example\":\"Something interesting happened!\",\"type\":\"string\"},\"id\":{\"type\":\"number\"},\"tags\":{\"items\":{\"description\":\"Basic info about an Annotation Tag\",\"properties\":{\"id\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"}},\"title\":\"SimpleTag\",\"type\":\"object\"},\"type\":\"array\"},\"user\":{\"description\":\"Info about the creator of the annotation\",\"properties\":{\"first_name\":{\"example\":\"John\",\"type\":\"string\"},\"id\":{\"type\":\"number\"},\"last_name\":{\"example\":\"Smith\",\"type\":\"string\"}},\"title\":\"UserInfo\",\"type\":\"object\"}},\"title\":\"AnnotationsEntry\",\"type\":\"object\"},\"status\":{\"description\":\"The status of the response\",\"example\":\"ok\",\"type\":\"string\"}},\"required\":[\"status\",\"results\"],\"title\":\"GetAnnotationsResponse\",\"type\":\"object\"}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/projects/{projectId}/annotations","rename":{"param":{"projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"annotations"}],"select":{"exist":["project_id"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"annotation_id","reqd":true,"type":"`$NUMBER`","index$":0},{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /projects/{projectId}/annotations/{annotationId}","json":"{\"operationId\":\"get-annotation\",\"parameters\":[{\"description\":\"Your project id (eg: 12345)\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"The id of the annotation\",\"in\":\"path\",\"name\":\"annotationId\",\"required\":true,\"schema\":{\"type\":\"number\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"description\":\"A JSON response object containing an annotation'\",\"properties\":{\"results\":{\"additionalProperties\":false,\"description\":\"Representation of a single annotation\",\"properties\":{\"date\":{\"description\":\"A string representation of a date in \\\"YYYY-MM-DD HH:mm:ss\\\" format\",\"example\":\"2022-02-15 12:00:00\",\"type\":\"string\"},\"description\":{\"description\":\"The text that will be shown when looking at the annotation\",\"example\":\"Something interesting happened!\",\"type\":\"string\"},\"id\":{\"type\":\"number\"},\"tags\":{\"items\":{\"description\":\"Basic info about an Annotation Tag\",\"properties\":{\"id\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"}},\"title\":\"SimpleTag\",\"type\":\"object\"},\"type\":\"array\"},\"user\":{\"description\":\"Info about the creator of the annotation\",\"properties\":{\"first_name\":{\"example\":\"John\",\"type\":\"string\"},\"id\":{\"type\":\"number\"},\"last_name\":{\"example\":\"Smith\",\"type\":\"string\"}},\"title\":\"UserInfo\",\"type\":\"object\"}},\"title\":\"AnnotationsEntry\",\"type\":\"object\"},\"status\":{\"description\":\"The status of the response\",\"example\":\"ok\",\"type\":\"string\"}},\"required\":[\"status\",\"results\"],\"title\":\"GetAnnotationsResponse\",\"type\":\"object\"}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/projects/{projectId}/annotations/{annotationId}","rename":{"param":{"annotationId":"id","projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"annotations"},{"var":"id"}],"select":{"exist":["id","project_id"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"annotation_id","reqd":true,"type":"`$NUMBER`","index$":0},{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"DELETE /projects/{projectId}/annotations/{annotationId}","json":"{\"operationId\":\"delete-annotation\",\"parameters\":[{\"description\":\"Your project id (eg: 12345)\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"The id of the annotation\",\"in\":\"path\",\"name\":\"annotationId\",\"required\":true,\"schema\":{\"type\":\"number\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"description\":\"A JSON response object containing the id of the deleted annotation'\",\"properties\":{\"results\":{\"properties\":{\"id\":{\"description\":\"The id of the deleted annotation\",\"type\":\"number\"}},\"type\":\"object\"},\"status\":{\"description\":\"The status of the response\",\"example\":\"ok\",\"type\":\"string\"}},\"required\":[\"status\",\"results\"],\"title\":\"DeleteAnnotationsResponse\",\"type\":\"object\"}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/projects/{projectId}/annotations/{annotationId}","rename":{"param":{"annotationId":"id","projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"annotations"},{"var":"id"}],"select":{"exist":["id","project_id"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"annotation_id","reqd":true,"type":"`$NUMBER`","index$":0},{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"PATCH /projects/{projectId}/annotations/{annotationId}","json":"{\"operationId\":\"patch-annotation\",\"parameters\":[{\"description\":\"Your project id (eg: 12345)\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"The id of the annotation\",\"in\":\"path\",\"name\":\"annotationId\",\"required\":true,\"schema\":{\"type\":\"number\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"The text that will be shown when looking at the annotation\",\"example\":\"Something interesting happened!\",\"type\":\"string\"},\"tags\":{\"description\":\"The ids of the tags to be added to the annotation\",\"items\":{\"type\":\"number\"},\"title\":\"TagIds\",\"type\":\"array\"}}}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"description\":\"A JSON response object containing an annotation'\",\"properties\":{\"results\":{\"additionalProperties\":false,\"description\":\"Representation of a single annotation\",\"properties\":{\"date\":{\"description\":\"A string representation of a date in \\\"YYYY-MM-DD HH:mm:ss\\\" format\",\"example\":\"2022-02-15 12:00:00\",\"type\":\"string\"},\"description\":{\"description\":\"The text that will be shown when looking at the annotation\",\"example\":\"Something interesting happened!\",\"type\":\"string\"},\"id\":{\"type\":\"number\"},\"tags\":{\"items\":{\"description\":\"Basic info about an Annotation Tag\",\"properties\":{\"id\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"}},\"title\":\"SimpleTag\",\"type\":\"object\"},\"type\":\"array\"},\"user\":{\"description\":\"Info about the creator of the annotation\",\"properties\":{\"first_name\":{\"example\":\"John\",\"type\":\"string\"},\"id\":{\"type\":\"number\"},\"last_name\":{\"example\":\"Smith\",\"type\":\"string\"}},\"title\":\"UserInfo\",\"type\":\"object\"}},\"title\":\"AnnotationsEntry\",\"type\":\"object\"},\"status\":{\"description\":\"The status of the response\",\"example\":\"ok\",\"type\":\"string\"}},\"required\":[\"status\",\"results\"],\"title\":\"GetAnnotationsResponse\",\"type\":\"object\"}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"PATCH","orig":"/projects/{projectId}/annotations/{annotationId}","rename":{"param":{"annotationId":"id","projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"annotations"},{"var":"id"}],"select":{"exist":["id","project_id"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["project"]]},"key$":"annotation","name__orig":"annotation","Name":"Annotation","name_":"annotation","name-":"annotation","NAME":"ANNOTATION","index$":0}, {"active":true,"entity":"annotation","key$":"BasicAnnotationFlow","kind":"basic","name":"BasicAnnotationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"annotation_ref01"},"match":{"project_id":"project01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{"project_id":"project01"},"input":{"ref":"annotation_ref01","srcdatavar":"annotation_ref01_data","suffix":"_up0","textfield":"date"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-annotation_ref01"}}],"valid":[],"index$":1},{"active":true,"data":{},"input":{"ref":"annotation_ref01","srcdatavar":"annotation_ref01_data","suffix":"_dt0"},"match":{"id":"annotation01","project_id":"project01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-annotation_ref01"}}],"index$":2},{"active":true,"data":{},"input":{"ref":"annotation_ref01","suffix":"_rm0"},"match":{"id":"annotation01","project_id":"project01"},"op":"remove","spec":[],"valid":[],"index$":3}]}, 'Annotation')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const annotation_ref01_ent = client.Annotation()
    let annotation_ref01_data = setup.data.new.annotation['annotation_ref01']
    annotation_ref01_data['project_id'] = setup.idmap['project01']

    annotation_ref01_data = (await annotation_ref01_ent.create(annotation_ref01_data)).data()
    assert(null != annotation_ref01_data.id)


    // UPDATE
    const annotation_ref01_data_up0: any = {}
    annotation_ref01_data_up0.id = annotation_ref01_data.id
    annotation_ref01_data_up0 ['project_id'] = setup.idmap['project_id']

    const annotation_ref01_markdef_up0 = { name: 'date', value: 'Mark01-annotation_ref01_' + setup.now }
    ;(annotation_ref01_data_up0 as any)[annotation_ref01_markdef_up0.name] = annotation_ref01_markdef_up0.value

    const annotation_ref01_resdata_up0 = (await annotation_ref01_ent.update(annotation_ref01_data_up0)).data()
    assert(annotation_ref01_resdata_up0.id === annotation_ref01_data_up0.id)

    assert((annotation_ref01_resdata_up0 as any)[annotation_ref01_markdef_up0.name] === annotation_ref01_markdef_up0.value)


    // LOAD
    const annotation_ref01_match_dt0: any = {}
    annotation_ref01_match_dt0.id = annotation_ref01_data.id
    const annotation_ref01_data_dt0 = (await annotation_ref01_ent.load(annotation_ref01_match_dt0)).data()
    assert(annotation_ref01_data_dt0.id === annotation_ref01_data.id)


    // REMOVE
    const annotation_ref01_match_rm0: any = { id: annotation_ref01_data.id }
    await annotation_ref01_ent.remove(annotation_ref01_match_rm0)
  

  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/annotation/AnnotationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MixpanelAnnotationsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['annotation01','annotation02','annotation03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_ANNOTATIONS_TEST_ANNOTATION_ENTID': idmap,
    'MIXPANEL_ANNOTATIONS_TEST_LIVE': 'FALSE',
    'MIXPANEL_ANNOTATIONS_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_ANNOTATIONS_APIKEY': '',
    'MIXPANEL_ANNOTATIONS_SECRET': '',
    'MIXPANEL_ANNOTATIONS_SERVER_REGIONANDDOMAIN': "mixpanel",
  })

  idmap = env['MIXPANEL_ANNOTATIONS_TEST_ANNOTATION_ENTID']

  const live = 'TRUE' === env.MIXPANEL_ANNOTATIONS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_ANNOTATIONS_TEST_ANNOTATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MixpanelAnnotationsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.MIXPANEL_ANNOTATIONS_APIKEY,
        secret: env.MIXPANEL_ANNOTATIONS_SECRET,
        server: {
          regionAndDomain: env.MIXPANEL_ANNOTATIONS_SERVER_REGIONANDDOMAIN,
        },
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.MIXPANEL_ANNOTATIONS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
