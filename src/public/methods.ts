import {navtoRule} from '../options/base'
import {transitionTo} from './hooks'

export function push(rule: navtoRule | string):Promise<void |undefined> {
    return new Promise(resolve => {
        resolve();
    })
}
