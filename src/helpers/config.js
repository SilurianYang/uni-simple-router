export const methods = {
  push: "navigateTo",
  replace: "redirectTo",
  replaceAll: "reLaunch",
  pushTab: "switchTab",
  back: "navigateBack"
};
export const lifeCycle = {
  beforeHooks: [],
  afterHooks: [],
  routerHooks: [],
  routerbeforeHooks:[],		//内部跳转前生命周期
  routerAfterHooks:[],	//内部跳转后生命周期
};

export const route = function(object = {}) {
  return {
    ...object,
    params: {},
    query: {}
  };
};
