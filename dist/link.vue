<template>
    <view @click="gotoPage()"><slot></slot></view>
</template>

<script>
const navType = {
    push: 'push',
    replace: 'replace',
    replaceAll: 'replaceAll',
    pushTab: 'pushTab',
    back:'back'
};
export default {
    props: {
        to: {
            type: [String, Object],
            required: true
        },
        stopNavto: {
            type: Boolean,
            default: false,
        },
        navType: {
            type: String,
            default: 'push',
        },
        level: {
            type: Number,
            default: 1,
        },
        append: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        formatNav(text) {
            if (text != null && text.constructor === String) {
                const keyArray = [];
                text = text.replace(/((\w+)|('\s*(\w+)\s*')|("\s*(\w+)\s*"))\s*(?=:)/g, function (val) {
                    const key = `"${val.trim().replace(/"|'/g, '')}"`;
                    keyArray.push(key);
                    return key
                });
                const removeReg=/('|")/g;
                for (let i = 0; i < keyArray.length; i++) {
                    const key = keyArray[i];
                    text=text.replace(new RegExp(`${key}\\s*:\\s*('[^']+')`, 'g'),(...args)=>{
                        const $1=args[1];
                        return `${key}:"${$1.replace(removeReg,'')}"`
                    })
                }
                try {
                    text=JSON.parse(text);
                } catch (error) {}
            }
            if (this.append) {
                let pathArr = this.$Route.path.split('/');
                pathArr.splice(pathArr.length - this.level, this.level);
                pathArr = pathArr.join('/');
                if (text.constructor === Object) {
                    if (text.path) {
                        text.path = pathArr + text.path;
                    }
                } else {
                    text = pathArr + text;
                }
            }
            return text;
        },
        gotoPage() {
            if (this.stopNavto) {
                return true;
            }
            const type = navType[this.navType];
            if (type == null) {
                return console.error(` "navType" unknown type \n\n value：${Object.values(navType).join('、')}`);
            }
            const navInfo = this.formatNav(this.to);

            this.$Router[type](navInfo);
        },
    },
};
</script>
