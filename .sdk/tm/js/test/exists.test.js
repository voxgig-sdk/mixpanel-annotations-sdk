
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { MixpanelAnnotationsSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MixpanelAnnotationsSDK.test()
    equal(null !== testsdk, true)
  })

})
