/**
 * 根据标签及属性创建一个dom
 */
const createElement=function({tag,attrs,children}={}){
	    const $el = document.createElement(tag);
	    for (const [k, v] of Object.entries(attrs)) {
	        $el.setAttribute(k, v);
	    }
	    for (const item of children) {
	        $el.appendChild(render(item));
	    }
	    return $el;
}
const render = function(node) {
    if (typeof node == "string") { //是一个文本节点
        return document.createTextNode(node);
    };
	if(node instanceof HTMLElement){
		return node;
	}
    return createElement(node);
}

const DOM = createElement({
	tag: 'div',
	attrs: {
		id: 'router-loadding',
	},
	children: [
		createElement({
			tag: 'div',
			attrs: {
				class: 'loadding'
			},
			children: []
		})
	]
})

const style = createElement({
	tag: 'style',
	attrs: {
		id:'HHYANG_style'
	},
	children: [
		`
		body{padding:0;margin:0}#router-loadding{position:fixed;width:100%;height:100%;background-color:#fff;opacity:1;transition:all .05s;z-index:9999999999999999;top:0}#router-loadding .loadding{position:fixed;top:0;height:3px;background-color:#47b14b;width:0;box-shadow:0 0 15px #4CAF50;transition:all .8s;border-top-right-radius:3px;border-bottom-right-radius:3px}
		`
	]
})

const script = createElement({
	tag: 'script',
	attrs: {
		id:'HHYANG_script'
	},
	children: [
		`
		var HHYANG_El=document.querySelector("#router-loadding .loadding"),HHYANG_Pel=document.querySelector("#router-loadding"),HHYANG_uniAPP=document.querySelector("uni-app"),w=0,stop=null,WH=window.innerWidth,loop=function(){w=w>=WH-30?w+parseInt(4*Math.random()):w+parseInt(20*Math.random());HHYANG_El.style.cssText="width:"+w+"px";w>=WH&&clearInterval(stop)};window.startLodding=function(a){a=void 0===a?500:a;HHYANG_Pel.style.cssText="display: block;";HHYANG_El.style.cssText="transition: all 0.8s;";HHYANG_uniAPP.style.cssText="display:none";w=0;loop();clearInterval(stop);stop=setInterval(function(){loop()},a)};window.stopLodding=function(a){a=void 0===a?200:a;clearInterval(stop);HHYANG_El.style.cssText="width:"+WH+"px;transition: all "+a/1E3+"s;";HHYANG_Pel.style.cssText="opacity: 0;transition: all "+a/1E3+"s;";HHYANG_uniAPP.style.cssText="display:block";setTimeout(function(){HHYANG_Pel.style.cssText="display: none;";HHYANG_El.style.cssText="width:0px";w=0},a)};
		`
	]
})
export const html = {
	style,
	DOM,
	script
};
