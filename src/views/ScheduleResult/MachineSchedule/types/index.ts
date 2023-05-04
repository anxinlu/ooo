/** 机台处理信息 */
export type EqpHandleItem = {
    lotId:string | null, //lotId
    reticleId:string // reticleId
    startTime:number, //机台处理开始时间
    endTime:number, //机台处理结束时间
    costTime:string, // 机台处理总时长
    setup:boolean  // 机台当前状态
}
/** 当前机台 */
export type EqpItem = {
    eqpId: string,  //机台Id
    eqpType: string, //机台类型
    eqpProcessType:string, //机台加工类型
    handleList:Array<EqpHandleItem>  // 机台在排程结果中的处理数据
}


export type GraphDataType  = EqpItem[]
