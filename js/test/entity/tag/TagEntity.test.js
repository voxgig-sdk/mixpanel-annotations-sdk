
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { MixpanelAnnotationsSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('TagEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_ANNOTATIONS_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_ANNOTATIONS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelAnnotationsSDK.test()
    const ent = testsdk.Tag()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"has_annotations","req":false,"short":"whether the tag is currently attached to any annotations","type":"`$BOOLEAN`","index$":0},{"active":true,"name":"id","req":false,"type":"`$NUMBER`","index$":1},{"active":true,"name":"name","req":false,"short":"The text that will be shown when the tag is added to an annotation","type":"`$STRING`","index$":2},{"active":true,"name":"project_id","req":false,"type":"`$NUMBER`","index$":3}],"id":{"field":"id","name":"id"},"name":"tag","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"POST /projects/{projectId}/annotations/tags","json":"{\"operationId\":\"create-annotation-tag\",\"parameters\":[{\"description\":\"Your project id (eg: 12345)\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"name\":{\"description\":\"The text that will be shown when the tag is added to an annotation\",\"type\":\"string\"}}}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An annotation tag\",\"properties\":{\"has_annotations\":{\"description\":\"whether the tag is currently attached to any annotations\",\"type\":\"boolean\"},\"id\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"},\"project_id\":{\"type\":\"number\"}},\"title\":\"AnnotationTag\",\"type\":\"object\"}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/projects/{projectId}/annotations/tags","rename":{"param":{"projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"annotations"},{"lit":"tags"}],"select":{"exist":["project_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["project"]]},"key$":"tag","name__orig":"tag","Name":"Tag","name_":"tag","name-":"tag","NAME":"TAG","index$":4}, {"active":true,"entity":"tag","key$":"BasicTagFlow","kind":"basic","name":"BasicTagFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"tag_ref01"},"match":{"project_id":"project01"},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Tag')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const tag_ref01_ent = client.Tag()
    let tag_ref01_data = setup.data.new.tag['tag_ref01']
    tag_ref01_data['project_id'] = setup.idmap['project01']

    tag_ref01_data = (await tag_ref01_ent.create(tag_ref01_data)).data()
    assert(null != tag_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/tag/TagTestData.json')

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
    ['tag01','tag02','tag03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_ANNOTATIONS_TEST_TAG_ENTID': idmap,
    'MIXPANEL_ANNOTATIONS_TEST_LIVE': 'FALSE',
    'MIXPANEL_ANNOTATIONS_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_ANNOTATIONS_APIKEY': '',
    'MIXPANEL_ANNOTATIONS_SERVER_REGIONANDDOMAIN': "mixpanel",
  })

  idmap = env['MIXPANEL_ANNOTATIONS_TEST_TAG_ENTID']

  const live = 'TRUE' === env.MIXPANEL_ANNOTATIONS_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_ANNOTATIONS_TEST_TAG_ENTID']
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
        server: {
          regionAndDomain: env.MIXPANEL_ANNOTATIONS_SERVER_REGIONANDDOMAIN,
        },
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
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
  
