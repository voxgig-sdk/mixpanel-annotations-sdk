
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


describe('ListAnnotationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_ANNOTATIONS_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_ANNOTATIONS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelAnnotationsSDK.test()
    const ent = testsdk.ListAnnotation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"date","req":false,"short":"A string representation of a date in \"YYYY-MM-DD HH:mm:ss\" format","type":"`$STRING`","index$":0},{"active":true,"name":"description","req":false,"short":"The text that will be shown when looking at the annotation","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$NUMBER`","index$":2},{"active":true,"name":"tags","req":false,"type":"`$ARRAY`","index$":3},{"active":true,"name":"user","req":false,"short":"Info about the creator of the annotation","type":"`$OBJECT`","index$":4}],"id":{"field":"id","name":"id"},"name":"list_annotation","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"from_date","orig":"from_date","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"to_date","orig":"to_date","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /projects/{projectId}/annotations","json":"{\"operationId\":\"list-all-annotations-for-project\",\"parameters\":[{\"description\":\"Your project id (eg: 12345)\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"The date in yyyy-mm-dd format to begin querying from. This date is inclusive.\",\"in\":\"query\",\"name\":\"fromDate\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"The date in yyyy-mm-dd format to query to. This date is inclusive.\",\"in\":\"query\",\"name\":\"toDate\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"description\":\"A JSON response object containing all annotations in the project'\",\"properties\":{\"results\":{\"items\":{\"additionalProperties\":false,\"description\":\"Representation of a single annotation\",\"properties\":{\"date\":{\"description\":\"A string representation of a date in \\\"YYYY-MM-DD HH:mm:ss\\\" format\",\"example\":\"2022-02-15 12:00:00\",\"type\":\"string\"},\"description\":{\"description\":\"The text that will be shown when looking at the annotation\",\"example\":\"Something interesting happened!\",\"type\":\"string\"},\"id\":{\"type\":\"number\"},\"tags\":{\"items\":{\"description\":\"Basic info about an Annotation Tag\",\"properties\":{\"id\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"}},\"title\":\"SimpleTag\",\"type\":\"object\"},\"type\":\"array\"},\"user\":{\"description\":\"Info about the creator of the annotation\",\"properties\":{\"first_name\":{\"example\":\"John\",\"type\":\"string\"},\"id\":{\"type\":\"number\"},\"last_name\":{\"example\":\"Smith\",\"type\":\"string\"}},\"title\":\"UserInfo\",\"type\":\"object\"}},\"title\":\"AnnotationsEntry\",\"type\":\"object\"},\"type\":\"array\"},\"status\":{\"description\":\"The status of the response\",\"example\":\"ok\",\"type\":\"string\"}},\"required\":[\"status\",\"results\"],\"title\":\"ListAnnotationsResponse\",\"type\":\"object\"}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/projects/{projectId}/annotations","rename":{"param":{"projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"annotations"}],"select":{"exist":["from_date","project_id","to_date"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["project"]]},"key$":"list_annotation","name__orig":"list_annotation","Name":"ListAnnotation","name_":"list_annotation","name-":"list-annotation","NAME":"LIST_ANNOTATION","index$":2}, {"active":true,"entity":"list_annotation","key$":"BasicListAnnotationFlow","kind":"basic","name":"BasicListAnnotationFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"project_id":"project01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"list_annotation_ref01"}}],"index$":0}]}, 'ListAnnotation')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let list_annotation_ref01_data = Object.values(setup.data.existing.list_annotation)[0]

    // LIST
    const list_annotation_ref01_ent = client.ListAnnotation()
    const list_annotation_ref01_match = {}
    list_annotation_ref01_match['project_id'] = setup.idmap['project01']

    const list_annotation_ref01_list = (await list_annotation_ref01_ent.list(list_annotation_ref01_match)).map((e) => e.data())


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/list_annotation/ListAnnotationTestData.json')

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
    ['list_annotation01','list_annotation02','list_annotation03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_ANNOTATIONS_TEST_LIST_ANNOTATION_ENTID': idmap,
    'MIXPANEL_ANNOTATIONS_TEST_LIVE': 'FALSE',
    'MIXPANEL_ANNOTATIONS_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_ANNOTATIONS_APIKEY': '',
    'MIXPANEL_ANNOTATIONS_SERVER_REGIONANDDOMAIN': "mixpanel",
  })

  idmap = env['MIXPANEL_ANNOTATIONS_TEST_LIST_ANNOTATION_ENTID']

  const live = 'TRUE' === env.MIXPANEL_ANNOTATIONS_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_ANNOTATIONS_TEST_LIST_ANNOTATION_ENTID']
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
  
