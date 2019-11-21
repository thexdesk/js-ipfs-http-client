'use strict'

const ndjson = require('iterable-ndjson')
const configure = require('../lib/configure')
const toIterable = require('../lib/stream-to-iterable')

module.exports = configure(({ ky }) => {
  return async function * (options) {
    options = options || {}

    const res = await ky.get('log/tail', {
      timeout: options.timeout,
      signal: options.signal,
      headers: options.headers,
      searchParams: options.searchParams
    })

    yield * ndjson(toIterable(res.body))
  }
})
