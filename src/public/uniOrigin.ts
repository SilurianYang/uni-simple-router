import { navtoRule, uniNavApiRule } from '../options/base';
import { stringifyQuery } from './query';

export function uniOriginJump(
    originMethod:Function,
    options:uniNavApiRule|navtoRule
):void {
    formatOriginURLQuery(options);
}

export function formatOriginURLQuery(
    options:uniNavApiRule|navtoRule
):uniNavApiRule {
    const {url, path, query, animationType, animationDuration, events, success, fail, complete} = options;
    const strQuery = stringifyQuery(query);
    const queryURL = strQuery === '' ? path || url : path || url + `?${strQuery}`
    return {
        url: queryURL,
        animationType,
        animationDuration,
        events,
        success,
        fail,
        complete
    }
}
