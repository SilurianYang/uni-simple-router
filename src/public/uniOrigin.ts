import { uniNavApiRule } from '../options/base';
import { stringifyQuery } from './query';

export function uniOriginJump(
    originMethod:Function,
    options:uniNavApiRule
):void {
    const originRule = formatOriginURLQuery(options);
    originMethod(originRule);
}

export function formatOriginURLQuery(
    options:uniNavApiRule
):uniNavApiRule {
    const {url, path, query, animationType, animationDuration, events, success, fail, complete} = options;
    const strQuery = stringifyQuery(query || {});
    const queryURL = strQuery === '' ? (path || url) : (path || url) + strQuery
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
