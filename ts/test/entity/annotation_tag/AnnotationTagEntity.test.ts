

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


describe('AnnotationTagEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_ANNOTATIONS_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_ANNOTATIONS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelAnnotationsSDK.test()
    const ent = testsdk.AnnotationTag()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MIXPANEL_ANNOTATIONS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'annotation_tag.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"has_annotations","req":false,"short":"whether the tag is currently attached to any annotations","type":"`$BOOLEAN`","index$":0},{"active":true,"name":"id","req":false,"type":"`$NUMBER`","index$":1},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"project_id","req":false,"type":"`$NUMBER`","index$":3}],"id":{"field":"id","name":"id"},"name":"annotation_tag","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /projects/{projectId}/annotations/tags","json":"{\"operationId\":\"get-annotation-tags\",\"parameters\":[{\"description\":\"Your project id (eg: 12345)\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"The list of annotation tags that have been created\",\"items\":{\"description\":\"An annotation tag\",\"properties\":{\"has_annotations\":{\"description\":\"whether the tag is currently attached to any annotations\",\"type\":\"boolean\"},\"id\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"},\"project_id\":{\"type\":\"number\"}},\"title\":\"AnnotationTag\",\"type\":\"object\"},\"title\":\"GetAnnotationTagsResponse\",\"type\":\"array\"}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/projects/{projectId}/annotations/tags","rename":{"param":{"projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"annotations"},{"lit":"tags"}],"select":{"exist":["project_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["project"]]},"key$":"annotation_tag","name__orig":"annotation_tag","Name":"AnnotationTag","name_":"annotation_tag","name-":"annotation-tag","NAME":"ANNOTATION_TAG","index$":1}, {"active":true,"entity":"annotation_tag","key$":"BasicAnnotationTagFlow","kind":"basic","name":"BasicAnnotationTagFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"project_id":"project01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"annotation_tag_ref01"}}],"index$":0}]}, 'AnnotationTag')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let annotation_tag_ref01_data = Object.values(setup.data.existing.annotation_tag)[0] as any

    // LIST
    const annotation_tag_ref01_ent = client.AnnotationTag()
    const annotation_tag_ref01_match: any = {}
    annotation_tag_ref01_match['project_id'] = setup.idmap['project01']

    const annotation_tag_ref01_list = (await annotation_tag_ref01_ent.list(annotation_tag_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/annotation_tag/AnnotationTagTestData.json')

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
    ['annotation_tag01','annotation_tag02','annotation_tag03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_ANNOTATIONS_TEST_ANNOTATION_TAG_ENTID': idmap,
    'MIXPANEL_ANNOTATIONS_TEST_LIVE': 'FALSE',
    'MIXPANEL_ANNOTATIONS_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_ANNOTATIONS_APIKEY': '',
    'MIXPANEL_ANNOTATIONS_SECRET': '',
    'MIXPANEL_ANNOTATIONS_SERVER_REGIONANDDOMAIN': "mixpanel",
  })

  idmap = env['MIXPANEL_ANNOTATIONS_TEST_ANNOTATION_TAG_ENTID']

  const live = 'TRUE' === env.MIXPANEL_ANNOTATIONS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_ANNOTATIONS_TEST_ANNOTATION_TAG_ENTID']
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
  
