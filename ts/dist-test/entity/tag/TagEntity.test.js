"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('TagEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MIXPANEL_ANNOTATIONS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MIXPANEL_ANNOTATIONS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MixpanelAnnotationsSDK.test();
        const ent = testsdk.Tag();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MIXPANEL_ANNOTATIONS_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'tag.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "has_annotations", "req": false, "short": "whether the tag is currently attached to any annotations", "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "name": "id", "req": false, "type": "`$NUMBER`", "index$": 1 }, { "active": true, "name": "name", "req": false, "short": "The text that will be shown when the tag is added to an annotation", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "project_id", "req": false, "type": "`$NUMBER`", "index$": 3 }], "id": { "field": "id", "name": "id" }, "name": "tag", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "project_id", "orig": "project_id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "POST /projects/{projectId}/annotations/tags", "json": "{\"operationId\":\"create-annotation-tag\",\"parameters\":[{\"description\":\"Your project id (eg: 12345)\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"name\":{\"description\":\"The text that will be shown when the tag is added to an annotation\",\"type\":\"string\"}}}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An annotation tag\",\"properties\":{\"has_annotations\":{\"description\":\"whether the tag is currently attached to any annotations\",\"type\":\"boolean\"},\"id\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"},\"project_id\":{\"type\":\"number\"}},\"title\":\"AnnotationTag\",\"type\":\"object\"}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/projects/{projectId}/annotations/tags", "rename": { "param": { "projectId": "project_id" } }, "segments": [{ "lit": "projects" }, { "var": "project_id" }, { "lit": "annotations" }, { "lit": "tags" }], "select": { "exist": ["project_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["project"]] }, "key$": "tag", "name__orig": "tag", "Name": "Tag", "name_": "tag", "name-": "tag", "NAME": "TAG", "index$": 4 }, { "active": true, "entity": "tag", "key$": "BasicTagFlow", "kind": "basic", "name": "BasicTagFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "tag_ref01" }, "match": { "project_id": "project01" }, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'Tag');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const tag_ref01_ent = client.Tag();
        let tag_ref01_data = setup.data.new.tag['tag_ref01'];
        tag_ref01_data['project_id'] = setup.idmap['project01'];
        tag_ref01_data = (await tag_ref01_ent.create(tag_ref01_data)).data();
        (0, node_assert_1.default)(null != tag_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/tag/TagTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MixpanelAnnotationsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['tag01', 'tag02', 'tag03', 'project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MIXPANEL_ANNOTATIONS_TEST_TAG_ENTID': idmap,
        'MIXPANEL_ANNOTATIONS_TEST_LIVE': 'FALSE',
        'MIXPANEL_ANNOTATIONS_TEST_EXPLAIN': 'FALSE',
        'MIXPANEL_ANNOTATIONS_APIKEY': '',
        'MIXPANEL_ANNOTATIONS_SECRET': '',
        'MIXPANEL_ANNOTATIONS_SERVER_REGIONANDDOMAIN': "mixpanel",
    });
    idmap = env['MIXPANEL_ANNOTATIONS_TEST_TAG_ENTID'];
    const live = 'TRUE' === env.MIXPANEL_ANNOTATIONS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MIXPANEL_ANNOTATIONS_TEST_TAG_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MixpanelAnnotationsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=TagEntity.test.js.map