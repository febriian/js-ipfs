/* eslint-env mocha */
'use strict'

const { nanoid } = require('nanoid')
const { getDescribe, getIt, expect } = require('../utils/mocha')

/** @typedef { import("ipfsd-ctl/src/factory") } Factory */
/**
 * @param {Factory} common
 * @param {Object} options
 */
module.exports = (common, options) => {
  const describe = getDescribe(options)
  const it = getIt(options)

  describe('.key.gen', () => {
    const keyTypes = [
      { type: 'rsa', size: 2048 }
    ]

    let ipfs

    before(async () => {
      ipfs = (await common.spawn()).api
    })

    after(() => common.clean())
    it('should generate a new key with the default', async function () {
      this.timeout(20 * 1000)
      const name = nanoid()
      const key = await ipfs.key.gen(name)
      expect(key).to.exist()
      expect(key).to.have.property('name', name)
      expect(key).to.have.property('id')
    })
    keyTypes.forEach((kt) => {
      it(`should generate a new ${kt.type} key`, async function () {
        this.timeout(20 * 1000)
        const name = nanoid()
        const key = await ipfs.key.gen(name, kt)
        expect(key).to.exist()
        expect(key).to.have.property('name', name)
        expect(key).to.have.property('id')
      })
    })
  })
}
