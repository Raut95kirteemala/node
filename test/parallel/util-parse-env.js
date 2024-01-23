'use strict';

require('../common');
const fixtures = require('../../test/common/fixtures');
const assert = require('node:assert');
const util = require('node:util');
const fs = require('node:fs');

{
  const validEnvFilePath = fixtures.path('dotenv/valid.env');
  const validContent = fs.readFileSync(validEnvFilePath, 'utf8');

  assert.deepStrictEqual(util.parseEnv(validContent), {
    AFTER_LINE: 'after_line',
    BACKTICKS: 'backticks',
    BACKTICKS_INSIDE_DOUBLE: '`backticks` work inside double quotes',
    BACKTICKS_INSIDE_SINGLE: '`backticks` work inside single quotes',
    BACKTICKS_SPACED: '    backticks    ',
    BASIC: 'basic',
    DOUBLE_AND_SINGLE_QUOTES_INSIDE_BACKTICKS: 'double "quotes" and single \'quotes\' work inside backticks',
    DOUBLE_QUOTES: 'double_quotes',
    DOUBLE_QUOTES_INSIDE_BACKTICKS: 'double "quotes" work inside backticks',
    DOUBLE_QUOTES_INSIDE_SINGLE: 'double "quotes" work inside single quotes',
    DOUBLE_QUOTES_SPACED: '    double quotes    ',
    DOUBLE_QUOTES_WITH_NO_SPACE_BRACKET: '{ port: $MONGOLAB_PORT}',
    EMAIL: 'therealnerdybeast@example.tld',
    EMPTY: '',
    EMPTY_BACKTICKS: '',
    EMPTY_DOUBLE_QUOTES: '',
    EMPTY_SINGLE_QUOTES: '',
    EQUAL_SIGNS: 'equals==',
    INLINE_COMMENTS: 'inline comments',
    INLINE_COMMENTS_BACKTICKS: 'inline comments outside of #backticks',
    INLINE_COMMENTS_DOUBLE_QUOTES: 'inline comments outside of #doublequotes',
    INLINE_COMMENTS_SINGLE_QUOTES: 'inline comments outside of #singlequotes',
    INLINE_COMMENTS_SPACE: 'inline comments start with a',
    RETAIN_INNER_QUOTES: '{"foo": "bar"}',
    RETAIN_INNER_QUOTES_AS_BACKTICKS: '{"foo": "bar\'s"}',
    RETAIN_INNER_QUOTES_AS_STRING: '{"foo": "bar"}',
    SINGLE_QUOTES: 'single_quotes',
    SINGLE_QUOTES_INSIDE_BACKTICKS: "single 'quotes' work inside backticks",
    SINGLE_QUOTES_INSIDE_DOUBLE: "single 'quotes' work inside double quotes",
    SINGLE_QUOTES_SPACED: '    single quotes    ',
    SPACED_KEY: 'parsed',
    TRIM_SPACE_FROM_UNQUOTED: 'some spaced out string'
  });
}

assert.deepStrictEqual(util.parseEnv(''), {});
assert.deepStrictEqual(util.parseEnv('FOO=bar\nFOO=baz\n'), { FOO: 'baz' });

// Test for invalid input.
assert.throws(() => {
  for (const value of [null, undefined, {}, []]) {
    util.parseEnv(value);
  }
}, {
  code: 'ERR_INVALID_ARG_TYPE',
});
