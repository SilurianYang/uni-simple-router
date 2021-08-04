import {deepDecodeQuery} from '../src/helpers/utils';


it('编码回转',()=>{
    const query={
        str:'%E7%9A%84%E6%8C%A5%E6%B4%92U%E7%9B%BE%E5%A5%BD%E6%92%92%E7%AC%AC%E4%B8%89%E5%A4%A7%E5%8E%A6%E5%8F%91%E7%9A%84%E6%92%92321312%2a%EF%BC%88%EF%BF%A5%23%254'
    }
    const result = deepDecodeQuery(query);
    expect(JSON.stringify(result)).toEqual(JSON.stringify({
        str:'的挥洒U盾好撒第三大厦发的撒321312*（￥#%4'
    }))
})

it('一些乱码字符',()=>{
    const query={
        str:`~!@#$%^&*()_+-,./|][]`
    }
    const result = deepDecodeQuery(query);
    expect(JSON.stringify(result)).toEqual(JSON.stringify({
        str:`~!@#$%^&*()_+-,./|][]`
    }))
})

it('单个加密参数',()=>{
    const query={
        name:'%7B%22status%22%3Atrue%2C%22list%22%3A%5B%7B%22id%22%3A1%7D%5D%7D'
    }
    const result = deepDecodeQuery(query);
    expect(JSON.stringify(result)).toEqual(JSON.stringify({
        name:{
            status:true,
            list:[
                {
                    id:1
                },
            ]
        }
    }));
})

it('单个普通参数',()=>{
    const query={
        name:'hhyang',
        ages:22,
        open:true
    }
    const result = deepDecodeQuery(query);

    expect(JSON.stringify(result)).toEqual(JSON.stringify(query));
})

it('深度参数加混乱',()=>{
    const query={
        list:[
            1,'2',true,encodeURIComponent(JSON.stringify({name:111})),{
                name:'hhyang',
                strObj:encodeURIComponent(JSON.stringify({name:222}))
            }
        ],
        obj:{
            strObj2:encodeURIComponent(JSON.stringify({name:333})),
            number:1,
            boolean:false,
        },
        str4:encodeURIComponent(JSON.stringify({name:444}))
    }
    const result = deepDecodeQuery(query);

    expect(JSON.stringify(result)).toEqual(JSON.stringify({
        list:[
            1,'2',true,{name:111},{
                name:'hhyang',
                strObj:{name:222}
            }
        ],
        obj:{
            strObj2:{name:333},
            number:1,
            boolean:false,
        },
        str4:{name:444}
    }));
})  