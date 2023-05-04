const ct = new Date().getTime()
/** 获取几个小时？ */
const getBlockHour = (bufferHour:number) => {
    return bufferHour * 60 * 60 * 1000
}
/** 随机生成buffer时间 */
const getBufferTime = () => {
    return getBlockHour(1)
}

let lotIndex = 0
// 保证Date唯一  currentTime

export const GraphData = [
    {eqpId:`EQP_ID0${lotIndex++}`, eqpType:`ARF 0${lotIndex++}`,eqpProcessType:'eqpProcessType01',
        handleList:[
            { lotId:`LodId0${lotIndex++}`,reticleId:'reticleId1',startTime: ct, endTime:ct + getBufferTime()/12, costTime:'costTime',setup:false},
            // { lotId:`LodId0${lotIndex++}`,reticleId:'reticleId1',startTime: ct + getBufferTime(), endTime:ct + getBufferTime() * 2, costTime:'costTime',setup:true },
            // { lotId:null,reticleId:'reticleId1', startTime: ct + getBufferTime() * 3, endTime:ct + getBufferTime()*4, costTime:'costTime',setup:false },
            // { lotId:`LodId0${lotIndex++}`,reticleId:'reticleId1', startTime: ct + getBufferTime() * 6, endTime:ct + getBufferTime()*8, costTime:'costTime',setup:false },
            // { lotId:`LodId0${lotIndex++}`,reticleId:'reticleId1', startTime: ct + getBufferTime() * 9, endTime:ct + getBufferTime() * 10, costTime:'costTime',setup:false },
            // { lotId:`LodId0${lotIndex++}`,reticleId:'reticleId1',startTime: ct + getBufferTime() * 11, endTime:ct + getBufferTime()*12, costTime:'costTime',setup:false },
        ]
    },
    {eqpId:`EQP_ID0${lotIndex++}`, eqpType:`ARF 0${lotIndex++}`,eqpProcessType:'eqpProcessType02',
        handleList:[
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct, endTime:ct + getBufferTime(), costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime(), endTime:ct + getBufferTime() * 2, costTime:'costTime',setup:false },
            { lotId:null,  reticleId:'reticleId1',startTime: ct + getBufferTime() * 3, endTime:ct + getBufferTime()*4, costTime:'costTime',setup:true },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 6, endTime:ct + getBufferTime()*7, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 8, endTime:ct + getBufferTime()*9, costTime:'costTime',setup:false },
            { lotId:`Setup0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 10, endTime:ct + getBufferTime()*11, costTime:'costTime',setup:false },
            { lotId:null, reticleId:'reticleId1',startTime: ct + getBufferTime() * 11, endTime:ct + getBufferTime()*12, costTime:'costTime',setup:false },
        ]
    },
    {eqpId:`EQP_ID0${lotIndex++}`, eqpType:`ARF 0${lotIndex++}`,eqpProcessType:'eqpProcessType02',
        handleList:[
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct, endTime:ct + getBufferTime(), costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime(), endTime:ct + getBufferTime() * 2, costTime:'costTime',setup:false },
            { lotId:null,  reticleId:'reticleId1',startTime: ct + getBufferTime() * 3, endTime:ct + getBufferTime()*4, costTime:'costTime',setup:true },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 6, endTime:ct + getBufferTime()*7, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 8, endTime:ct + getBufferTime()*9, costTime:'costTime',setup:false },
            { lotId:`Setup0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 10, endTime:ct + getBufferTime()*11, costTime:'costTime',setup:false },
            { lotId:null, reticleId:'reticleId1',startTime: ct + getBufferTime() * 11, endTime:ct + getBufferTime()*12, costTime:'costTime',setup:false },
        ]
    },
    {eqpId:`EQP_ID0${lotIndex++}`, eqpType:`ARF 0${lotIndex++}`,eqpProcessType:'eqpProcessType02',
        handleList:[
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct, endTime:ct + getBufferTime(), costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime(), endTime:ct + getBufferTime() * 2, costTime:'costTime',setup:false },
            { lotId:null,  reticleId:'reticleId1',startTime: ct + getBufferTime() * 3, endTime:ct + getBufferTime()*4, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 6, endTime:ct + getBufferTime()*7, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 8, endTime:ct + getBufferTime()*9, costTime:'costTime',setup:false },
            { lotId:`Setup0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 10, endTime:ct + getBufferTime()*11, costTime:'costTime',setup:false },
            { lotId:null, reticleId:'reticleId1',startTime: ct + getBufferTime() * 11, endTime:ct + getBufferTime()*12, costTime:'costTime',setup:false },
        ]
    },
    {eqpId:`EQP_ID0${lotIndex++}`, eqpType:`ARF 0${lotIndex++}`,eqpProcessType:'eqpProcessType02',
        handleList:[
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct, endTime:ct + getBufferTime(), costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime(), endTime:ct + getBufferTime() * 2, costTime:'costTime',setup:true },
            { lotId:null,  reticleId:'reticleId1',startTime: ct + getBufferTime() * 3, endTime:ct + getBufferTime()*4, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 6, endTime:ct + getBufferTime()*7, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 8, endTime:ct + getBufferTime()*9, costTime:'costTime',setup:false },
            { lotId:`Setup0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 10, endTime:ct + getBufferTime()*11, costTime:'costTime',setup:false },
            { lotId:null, reticleId:'reticleId1',startTime: ct + getBufferTime() * 11, endTime:ct + getBufferTime()*12, costTime:'costTime',setup:false },
        ]
    },
    {eqpId:`EQP_ID0${lotIndex++}`, eqpType:`ARF 0${lotIndex++}`,eqpProcessType:'eqpProcessType02',
        handleList:[
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct, endTime:ct + getBufferTime(), costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime(), endTime:ct + getBufferTime() * 2, costTime:'costTime',setup:false },
            { lotId:null,  reticleId:'reticleId1',startTime: ct + getBufferTime() * 3, endTime:ct + getBufferTime()*4, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 6, endTime:ct + getBufferTime()*7, costTime:'costTime',setup:true },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 8, endTime:ct + getBufferTime()*9, costTime:'costTime',setup:false },
            { lotId:`Setup0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 10, endTime:ct + getBufferTime()*11, costTime:'costTime',setup:false },
            { lotId:null, reticleId:'reticleId1',startTime: ct + getBufferTime() * 11, endTime:ct + getBufferTime()*12, costTime:'costTime',setup:false },
        ]
    },
    {eqpId:`EQP_ID0${lotIndex++}`, eqpType:`ARF 0${lotIndex++}`,eqpProcessType:'eqpProcessType02',
        handleList:[
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct, endTime:ct + getBufferTime(), costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime(), endTime:ct + getBufferTime() * 2, costTime:'costTime',setup:false },
            { lotId:null,  reticleId:'reticleId1',startTime: ct + getBufferTime() * 3, endTime:ct + getBufferTime()*4, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 6, endTime:ct + getBufferTime()*7, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 8, endTime:ct + getBufferTime()*9, costTime:'costTime',setup:false },
            { lotId:`Setup0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 10, endTime:ct + getBufferTime()*11, costTime:'costTime',setup:false },
            { lotId:null, reticleId:'reticleId1',startTime: ct + getBufferTime() * 11, endTime:ct + getBufferTime()*12, costTime:'costTime',setup:false },
        ]
    },
    {eqpId:`EQP_ID0${lotIndex++}`, eqpType:`ARF 0${lotIndex++}`,eqpProcessType:'eqpProcessType02',
        handleList:[
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct, endTime:ct + getBufferTime(), costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime(), endTime:ct + getBufferTime() * 2, costTime:'costTime',setup:false },
            { lotId:null,  reticleId:'reticleId1',startTime: ct + getBufferTime() * 3, endTime:ct + getBufferTime()*4, costTime:'costTime',setup:true },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 6, endTime:ct + getBufferTime()*7, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 8, endTime:ct + getBufferTime()*9, costTime:'costTime',setup:false },
            { lotId:`Setup0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 10, endTime:ct + getBufferTime()*11, costTime:'costTime',setup:false },
            { lotId:null, reticleId:'reticleId1',startTime: ct + getBufferTime() * 11, endTime:ct + getBufferTime()*12, costTime:'costTime',setup:false },
        ]
    },
    {eqpId:`EQP_ID0${lotIndex++}`, eqpType:`ARF 0${lotIndex++}`,eqpProcessType:'eqpProcessType02',
        handleList:[
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct, endTime:ct + getBufferTime(), costTime:'costTime',setup:true },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime(), endTime:ct + getBufferTime() * 2, costTime:'costTime',setup:false },
            { lotId:null,  reticleId:'reticleId1',startTime: ct + getBufferTime() * 3, endTime:ct + getBufferTime()*4, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 6, endTime:ct + getBufferTime()*7, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 8, endTime:ct + getBufferTime()*9, costTime:'costTime',setup:false },
            { lotId:`Setup0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 10, endTime:ct + getBufferTime()*11, costTime:'costTime',setup:false },
            { lotId:null, reticleId:'reticleId1',startTime: ct + getBufferTime() * 11, endTime:ct + getBufferTime()*12, costTime:'costTime',setup:false },
        ]
    },
    {eqpId:`EQP_ID0${lotIndex++}`, eqpType:`ARF 0${lotIndex++}`,eqpProcessType:'eqpProcessType02',
        handleList:[
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct, endTime:ct + getBufferTime(), costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime(), endTime:ct + getBufferTime() * 2, costTime:'costTime',setup:false },
            { lotId:null,  reticleId:'reticleId1',startTime: ct + getBufferTime() * 3, endTime:ct + getBufferTime()*4, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 6, endTime:ct + getBufferTime()*7, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 8, endTime:ct + getBufferTime()*9, costTime:'costTime',setup:false },
            { lotId:`Setup0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 10, endTime:ct + getBufferTime()*11, costTime:'costTime',setup:false },
            { lotId:null, reticleId:'reticleId1',startTime: ct + getBufferTime() * 11, endTime:ct + getBufferTime()*12, costTime:'costTime',setup:false },
        ]
    },
    {eqpId:`EQP_ID0${lotIndex++}`, eqpType:`ARF 0${lotIndex++}`,eqpProcessType:'eqpProcessType02',
        handleList:[
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct, endTime:ct + getBufferTime(), costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime(), endTime:ct + getBufferTime() * 2, costTime:'costTime',setup:false },
            { lotId:null,  reticleId:'reticleId1',startTime: ct + getBufferTime() * 3, endTime:ct + getBufferTime()*4, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 6, endTime:ct + getBufferTime()*7, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 8, endTime:ct + getBufferTime()*9, costTime:'costTime',setup:false },
            { lotId:`Setup0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 10, endTime:ct + getBufferTime()*11, costTime:'costTime',setup:false },
            { lotId:null, reticleId:'reticleId1',startTime: ct + getBufferTime() * 11, endTime:ct + getBufferTime()*12, costTime:'costTime',setup:false },
        ]
    },
    {eqpId:`EQP_ID0${lotIndex++}`, eqpType:`ARF 0${lotIndex++}`,eqpProcessType:'eqpProcessType02',
        handleList:[
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct, endTime:ct + getBufferTime(), costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime(), endTime:ct + getBufferTime() * 2, costTime:'costTime',setup:false },
            { lotId:null,  reticleId:'reticleId1',startTime: ct + getBufferTime() * 3, endTime:ct + getBufferTime()*4, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 6, endTime:ct + getBufferTime()*7, costTime:'costTime',setup:false },
            { lotId:`LodId0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 8, endTime:ct + getBufferTime()*9, costTime:'costTime',setup:false },
            { lotId:`Setup0${lotIndex++}`, reticleId:'reticleId1',startTime: ct + getBufferTime() * 10, endTime:ct + getBufferTime()*11, costTime:'costTime',setup:false },
            { lotId:null, reticleId:'reticleId1',startTime: ct + getBufferTime() * 11, endTime:ct + getBufferTime()*12, costTime:'costTime',setup:false },
        ]
    },
]