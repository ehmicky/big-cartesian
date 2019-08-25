import test from 'ava'
import isCi from 'is-ci'

import bigCartesian from '../src/main.js'

// Those tests are very slow, so it is run only in CI
if (isCi) {
  const COMBINATIONS_ITERATE = [
    { length: 100, size: 1 },
    // We should do 32x2, unfortunately that takes more than an hour
    { length: 21, size: 2 },
  ]
  COMBINATIONS_ITERATE.forEach(({ length, size }) => {
    test(`iterate | should not throw on high number of combinations | ${length}x${size}`, t => {
      const args = getBigArray(length, size)

      // eslint-disable-next-line fp/no-loops, no-empty, no-empty-pattern
      for (const [] of bigCartesian(args)) {
      }

      t.pass()
    })
  })
}

const getBigArray = function(length, size) {
  return Array.from({ length }, () => Array.from({ length: size }, getTrue))
}

const getTrue = function() {
  return true
}
