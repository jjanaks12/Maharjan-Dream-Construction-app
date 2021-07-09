import { extend } from "vee-validate"
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/en.json'

Object.keys(rules).forEach((ruleName: string) => {
  extend(ruleName, {
    // @ts-ignore
    ...rules[ruleName],
    // @ts-ignore
    message: messages[ruleName]
  })
})