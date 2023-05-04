import PageHeader from "@/components/pageHeader";
import { computed, defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";
import styles from './index.module.scss'
import axios from 'axios'
import { getMonthDay, getTime } from '@/utils/date'
import { GraphData } from "./mock/graph";
import type { EqpHandleItem, EqpItem, GraphDataType } from "./types";

/** 从后端获取到第一个被机台处理的lot的开始时间 */
const startTime = new Date()

/** 时间刻度hooks */
const useTimeRuler = () => {
    /** 时间刻度尺左侧padding */
    const paddingLeft = 119

    /** 从startTime开始关心未来几个小时的数据 */
    const hourBuffer = ref<number>(12)

    /** 时间刻度尺引用 */
    const timeRulerRef = ref<HTMLDivElement>()


    /** 刻度尺每一块等分后的长度 */
    const spanWidth = ref<number>()

    /** 刻度尺等分后所有的时间数组信息 */
    const rulerTimeArray = ref<Array<Date>>([])

    /** 刻度尺resize事件 */
    const rulerResizeOb = ref<ResizeObserver | null>(null)

    /** 刻度尺当前总宽度 */
    const timeAreaWidth = ref<number>()

    const initTimeSpanWidth = () => {
        const rulerRect = timeRulerRef.value?.getBoundingClientRect();
        const rulerWidth =  rulerRect?.width as number - paddingLeft
        timeAreaWidth.value = rulerWidth
        spanWidth.value = rulerWidth / hourBuffer.value
        timeRulerRef.value?.style.setProperty('--timeSpanWidth', `${spanWidth.value}px`)
    }

    const rulerResizeCallback = (entrys:ResizeObserverEntry[]) => {
        if (!entrys || !entrys.length) {
            return
        }
        initTimeSpanWidth()
    }

    rulerResizeOb.value =  new ResizeObserver(rulerResizeCallback)

    // bufferTime 换算为毫秒
    const msBuffer = (hoverNum: number) => hoverNum * 60 * 60 * 1000

    //  根据当前目标时间和buffer时间获取到截止时间
    const endTime = new Date(startTime.getTime() + msBuffer(hourBuffer.value))

    const initTimeArray = () => {
        const time = startTime.getTime()
        const tarArray = new Array(hourBuffer.value).fill(time)
        tarArray.forEach((timeItem, index) => {
           const date = new Date(timeItem + msBuffer(index))
           rulerTimeArray.value!.push(date)
        })
    }

    const timeSpans = computed(() => {
        return rulerTimeArray.value.map((item, index) => {
            const monthDay = getMonthDay(item)
            const time = getTime(item)
            return (<span class={styles['timeRuler__timeSpan']}>
                <span class={styles['timeRuler__timeSpan__monthDay']}>{monthDay}</span>
                <span class={styles['timeRuler__timeSpan__time']}>{time}</span>
                <span class={styles['timeRuler__timeSpan__mark']}>
                    <svg-icon name="line" size="10"/>
                </span>
            </span>)
        })
    })

    const initTimeRulerSpanWidth = () => {
        const rulerRect = timeRulerRef.value?.getBoundingClientRect();
        const rulerWidth =  rulerRect?.width as number - paddingLeft
        timeAreaWidth.value = rulerWidth
        spanWidth.value = rulerWidth / hourBuffer.value
        timeRulerRef.value?.style.setProperty('--timeSpanWidth', `${spanWidth.value}px`)
    }

    const setRulerPaddingLeft = () => {
        timeRulerRef.value?.style.setProperty('--paddingLeft', `${paddingLeft}px`)
    }
    

    const registeRulerResize = () => {
        rulerResizeOb.value?.observe(timeRulerRef.value!)
        return () => {
            rulerResizeOb.value?.disconnect()
            rulerResizeOb.value = null
        }
    }


    const rulerMounted = () => {
        initTimeArray()
        setRulerPaddingLeft()
        initTimeRulerSpanWidth()
    }
    
    return {
        timeRulerRef,
        startTime,
        endTime,
        spanWidth,
        hourBuffer,
        rulerTimeArray,
        timeSpans,
        rulerMounted,
        registeRulerResize
    }
}

/** 画布hooks */
const useScheduleGraph = () => {
    /** 画布距离左侧padding */
    const paddingLeft = 119

    /** 画布引用 */
    const graphRef = ref<HTMLDivElement>()

    /** 画布刻度尺对应的排程展示区域 引用 */
    const graphContentRef = ref<HTMLDivElement>()

    /** 画布当前的总宽度 */
    const graphWidh = ref<number>()

    /** 画布的根据总时长计算得出单位时长映射的像素值 */
    const unitWidth = ref<number>()

    const scheduleGraphData = ref<GraphDataType>(GraphData)

    // bufferTime 换算为毫秒
    const msBuffer = (hoverNum: number) => hoverNum * 60 * 60 * 1000

    /** 从startTime开始关心未来几个小时的数据 */
    const hourBuffer = ref<number>(12)


    //  根据当前目标时间和buffer时间获取到截止时间
    const endTime = new Date(startTime.getTime() + msBuffer(hourBuffer.value))

    
    /** 画布resize 监听器 */
    const graphResizeOb = ref<ResizeObserver | null>(null)

    /** 画布resize清除事件 */
    const graphResizeClear = ref<Function>()

    /** 控制拖拽的线条是否出现 */
    const timeLineShow = ref<boolean>(false)

    const timelineRef = ref<HTMLElement>()


    const hoverIndex = ref<number>()

    const rulerResizeCallback = (entrys:ResizeObserverEntry[]) => {
        if (!entrys || !entrys.length) {
            return
        }
        initUnitWidth()
    }
    
    graphResizeOb.value =  new ResizeObserver(rulerResizeCallback)

    const registeGraphResize = () => {
        graphResizeOb.value?.observe(graphRef.value!)
        return () => {
            graphResizeOb.value?.disconnect()
            graphResizeOb.value = null
        }
    }

    const setGraphPaddingLeft = () => {
        graphRef.value?.style.setProperty('--paddingLeft', `${paddingLeft}px`)
    }

    const initUnitWidth = () => {
       const graphEle = graphRef.value
       const rect = graphEle?.getBoundingClientRect()
       graphWidh.value = rect?.width! - paddingLeft
       // 将画布对应的总时长折算为ms
       const totalBufferMS = msBuffer(hourBuffer.value)
       unitWidth.value = graphWidh.value / totalBufferMS
    }

    const setGraphResizeClearHandler = () => {
        graphResizeClear.value = registeGraphResize()
    }

    /** 根据单位时间对应的像素和时间buffer值来得到目标对应的宽度 */
    const getSpanWidth = (handleItem:EqpHandleItem) => {
        const bufferTime = handleItem.endTime - handleItem.startTime
        return `${bufferTime * unitWidth.value!}px`
    }

    const handleItemClass = (handleItem:EqpHandleItem) => {
        return handleItem.setup ? 
            styles['eqpitem__setup']
            :
            styles['eqpitem__lot']
    }

    const getScheduleSpanRight = (handleItem:EqpHandleItem) => {
        const offesetTime = endTime.getTime() - handleItem.endTime
        const right = offesetTime * unitWidth.value!
        return `${right}px`
    }


    const lotItem = (eqpItem:EqpItem, lotItem:EqpHandleItem) => {
        if(lotItem.setup){
            return <span class={styles['root__graph__content__lotsetup']}>
                <svg-icon name="setup" size="16"/>
                <span>
                    Set  up
                </span>
            </span>
        }else{
            return <span class={styles['root__graph__content__lot']}>
                     <span>{lotItem.lotId}</span>
                   </span>
        }
    }

    const graphEqpTypeJsx = computed(() => {
        return scheduleGraphData.value.map((item:EqpItem, index:number) => {
            const boxShadow = hoverIndex.value === index ? 'inset 3px 0px 0px 0px #C174FE':'none';

            return (<span
                    style={{
                        color:'#B961FF',
                    }}>
                        <span
                            style={{boxShadow,height:'45px',paddingLeft:'16px'}}
                            >{item.eqpType}
                        </span>
                    </span>
            )
        })
    })
    
    /** 维护当前的下标  */
    const eqpItemouseOverHandler = (event:MouseEvent, index:number) => {
        hoverIndex.value = index
    }


    const graphScheduleJsx = computed(()=> {
        return scheduleGraphData.value.map((eqpItem:EqpItem, index) => {
            return <div class={styles.eqpitem} onMouseover={(event:MouseEvent) => {
                eqpItemouseOverHandler(event, index)
            }}
            onMouseleave={()=>{ hoverIndex.value = -1 }}
            >
                { eqpItem.handleList.map((handleItem:EqpHandleItem, index:number) => {
                    return (<span class={handleItemClass(handleItem)}
                            style={{
                                position:'absolute',
                                width:getSpanWidth(handleItem),
                                right:getScheduleSpanRight(handleItem)
                            }}
                        >
                                {
                                    lotItem(eqpItem, handleItem)
                                }
                             
                    </span>)

                })}

            </div>
        })
    })
    
    /** 画布展示区域的拖拽事件 */
    const graphContentMouseDownHandler = (event:MouseEvent) => {
        event.preventDefault()
        console.log('鼠标按下了')
        const graphRect = graphRef.value?.getBoundingClientRect()
        const graphLeft = graphRect?.left
        const originClientX = event.clientX;
        // timelineRef.value?.style.setProperty('--timelineLeft', `${originClientX}px`)
        console.log('originClientX', originClientX)
        console.log('graphLeft', graphLeft)
        document.onmousemove = function (e:MouseEvent) {
            const curClientX = e.clientX

            timeLineShow.value = true //出现时间刻度
            timelineRef.value?.style.setProperty('--timelineLeft', `${curClientX - graphLeft!}px`)
            console.log('curClientX', curClientX)
        }

        document.onmouseup = function (e:MouseEvent) {
            console.log('松手')
            timeLineShow.value = false //去掉时间刻度
            document.onmousemove = null
            document.onmouseup = null
        }
    }

    onMounted(()=> {
        initUnitWidth()
        setGraphPaddingLeft()
        setGraphResizeClearHandler()
    })

    onBeforeMount(() => {
        const graphResizeClearHandler = graphResizeClear.value
        graphResizeClearHandler && graphResizeClearHandler()
    })

    return {
        graphRef,
        graphScheduleJsx,
        graphEqpTypeJsx,
        graphContentMouseDownHandler,
        graphContentRef,
        timeLineShow,
        timelineRef
    }

}

export default defineComponent({
    name:'MachineSchedule',
    setup(){

        const { 
            timeRulerRef, 
            rulerTimeArray, 
            timeSpans,
            rulerMounted,
            registeRulerResize
        } = useTimeRuler()

        const {
            graphRef,
            graphContentRef,
            graphScheduleJsx,
            graphEqpTypeJsx,
            graphContentMouseDownHandler,
            timeLineShow,
            timelineRef
        } = useScheduleGraph()

        const clearRulerResize = ref<Function>()

        const checkList = ref<Array<string>>(['selected and disabled', 'Option A'])
        const value = ref('100%')

        const options = [
            { value: '0',label: '0%' },{ value: '0.1',label: '10%' },{ value: '0.2',label: '20%' },
            { value: '0.3',label: '30%' },{ value: '0.4',label: '40%' },{ value: '0.5',label: '50%' },
            { value: '0.6',label: '60%' },{ value: '0.7',label: '70%' },{ value: '0.8',label: '80%' },
            { value: '0.9',label: '90%' },{ value: '1',label: '100%' },
        ]

        
        
       onMounted(() => {
            /** 测试mock接口*/
            // axios.get("/api/yujing/sisetu").then((res) => {
            //     console.log(res);
            // });
            rulerMounted()
            clearRulerResize.value = registeRulerResize()
            
       })

       onBeforeMount(() => {
            // 销毁resize监听
            const clearRulerResizeHandler = clearRulerResize.value
            clearRulerResizeHandler && clearRulerResizeHandler()
       })

       return {
            checkList,
            options,
            value,
            timeRulerRef,
            rulerTimeArray,
            timeSpans,
            graphRef,
            graphScheduleJsx,
            graphEqpTypeJsx,
            graphContentRef,
            timeLineShow,
            timelineRef,
            graphContentMouseDownHandler
       }
    },
    render(){
        const { 
             options,
             timeSpans, 
             graphScheduleJsx, 
             graphEqpTypeJsx, 
             timeLineShow,
             graphContentMouseDownHandler
        } = this

        return (
            <div class={styles.root}>
                <div class={styles['root__headWrapper']}>
                    <PageHeader iconName="machineSchedule" title="Machine Schedule" class={styles['root__header']}/>
                    <div class={styles['root__tools']}>
                            {/* 操作栏左侧 */}
                            <div class={styles['root__tools__left']}>
                                <el-input
                                    placeholder="please enter your ID number"
                                    class="input-with-select"
                                    v-slots={{
                                        append:() => 
                                        <svg-icon 
                                            name="search" size="14" 
                                            color="#898989" 
                                            class={styles['root__tools__left__search']}>
                                        </svg-icon>
                                    }}
                                    >
                                </el-input>

                                <el-checkbox-group v-model={this.checkList}>
                                    <el-checkbox label="Select All" />
                                    <el-checkbox label="ARF" />
                                    <el-checkbox label="KRF" />
                                    <el-checkbox label="EUV" />
                                </el-checkbox-group>
                            </div>
                            {/* 操作栏右侧 */}
                            <div class={styles['root__tools__right']}>
                                    <svg-icon name="big" size="16"/>
                                    <el-select v-model={this.value} class="m-2" placeholder="10%">
                                        { options.map(item => 
                                            <el-option key={item.value} label={item.label} value={item.value}/>)
                                        }
                                    </el-select>
                                    <svg-icon name="small" size="16"/>
                            </div>
                    </div>
                    <div class={styles.timeRuler} ref="timeRulerRef">
                        { timeSpans }
                    </div>
                </div>

               <div class={styles['root__graph']} ref="graphRef">
                    {/* 这里可以抽出去作为Schedule的结果组件 */}
                    <div class={styles['root__graph__typeTitle']}>
                        {graphEqpTypeJsx}
                    </div>
               
                    <div class={styles['root__graph__content']} ref="graphContentRef" onMousedown={graphContentMouseDownHandler} draggable={false}>
                         {graphScheduleJsx}
                    </div>
               </div>

               {timeLineShow && <div class={styles.timeline} ref="timelineRef"></div>}
            </div>
        )
    }
})