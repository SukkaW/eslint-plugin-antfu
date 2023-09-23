import { expect } from 'vitest'
import { RuleTester } from '../../vendor/rule-tester/src/RuleTester'
import rule, { RULE_NAME } from './consistent-list-newline'

const valids = [
  'const a = { foo: "bar", bar: 2 }',
  'const a = {\nfoo: "bar",\nbar: 2\n}',
  'const a = [1, 2, 3]',
  'const a = [\n1,\n2,\n3\n]',
  'import { foo, bar } from "foo"',
  'import {\nfoo,\nbar\n} from "foo"',
  'const a = [`\n\n`, `\n\n`]',
  'log(a, b)',
  'log(\na,\nb\n)',
  'function foo(a, b) {}',
  'function foo(\na,\nb\n) {}',
]

// Check snapshot for fixed code
const invalid = [
  'const a = {\nfoo: "bar", bar: 2 }',
  'const a = {foo: "bar", \nbar: 2\n}',
  'const a = [\n1, 2, 3]',
  'const a = [1, \n2, 3\n]',
  'import {\nfoo, bar } from "foo"',
  'import { foo, \nbar } from "foo"',
  'const a = {foo: "bar", \r\nbar: 2\r\n}',
  'log(\na, b)',
  'function foo(\na, b) {}',
  'const foo = (\na, b) => {}',
] as const

const ruleTester: RuleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
})

ruleTester.run(RULE_NAME, rule as any, {
  valid: valids,
  invalid: invalid.map(i => ({
    code: i,
    errors: null,
    onOutput: (output: string) => {
      expect(output).toMatchSnapshot()
    },
  })),
})