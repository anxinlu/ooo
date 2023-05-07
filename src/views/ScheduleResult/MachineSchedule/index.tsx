import PageHeader from "@/components/pageHeader";
import { computed, defineComponent, onBeforeMount, onMounted, ref, watch, type Ref} from "vue";
import styles from './index.module.scss'
import axios from 'axios'
import { getMonthDay, getTime } from '@/utils/date'
import { GraphData } from "./mock/graph";
import type { EqpHandleItem, EqpItem, GraphDataType } from "./types";

/** 从后端获取到第一个被机台处理的lot的开始时间 */
const startTime = new Date()



/** 时间刻度hooks */
const useTimeRuler = (scaleRatio:Ref<number>, scrollXOffeset:Ref<number>, unitWidth:Ref<number>) => {
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

    /** 刻度尺初始化时候的宽度 */
    const initialRulerWidth = ref<number>()

    const scaleWord = (wordScale:number) => {
        const wordSpanNodes = timeRulerRef.value?.querySelectorAll('.scaleword') as NodeListOf<Element>
        const wordSpanArr = Array.from(wordSpanNodes)
        wordSpanArr.forEach(item => {
            const wordSpan = item as HTMLSpanElement
            const classArr = Array.from(wordSpan.classList)
            if(classArr.includes('scaletime')){
                wordSpan && wordSpan.style.setProperty('transform-origin', `0 center`);
                wordSpan && wordSpan.style.setProperty('transform', `scaleX(${wordScale}) translate3d(0,0,0) translateX(-50%)`);
            }else{
                wordSpan && wordSpan.style.setProperty('transform-origin', `0 center`);
                wordSpan && wordSpan.style.setProperty('transform', `scaleX(${wordScale}) translate3d(0,0,0)`);
            }
        })
    }


    /** 比例放大后需要细化刻度 */
    const effectTimeRuler = (ratio:number) => {
        const time = startTime.getTime()
        const tempArr = new Array(hourBuffer.value).fill(time)
        const finalTimeArr = [] as Array<Date>
        // 放大倍数向下取证 给刻度精分多少块 1的时候不需要中间多出刻度
        const timeBlockNum = Math.floor(ratio)

        // 精分后每一块代表的时间  timeBlock 分钟
        const timeBlock = 60 / Math.floor(ratio)
        
        
        // const offsetTime = (offsetX / unitWidth.value) /  scaleRatio.value
        // const currentTime = startTime.getTime() + offsetTime
        
        // 距离startTime的bolckNum数目


        tempArr.forEach((timeItem, index) => {
            const date = new Date(timeItem + msBuffer(index))
            for(let i=0;i< timeBlockNum;i++){
                const blockDate = new Date(date.getTime() + timeBlock * i * 60 * 1000)
                finalTimeArr.push(blockDate)
            }
        })
        

        // timeRulerRef.value?.style.setProperty('--timeSpanWidth', `${spanWidth.value}px`)

        rulerTimeArray.value! = finalTimeArr

        refreshTimeSpanWidth(false)
    }

    watch(()=> [scaleRatio.value,scrollXOffeset.value,unitWidth.value], ([ratio, scrollXOffeset]) =>{
        scaleWord(1 / ratio)
        effectTimeRuler(ratio)

        timeRulerRef.value?.style.setProperty('transform-origin',`119px center`)
        timeRulerRef.value?.
        style.setProperty('transform', `scaleX(${ratio}) translateZ(0) translate3d(0,0,0) translateX(-${scrollXOffeset / ratio}px)`)
        
    })

    watch(() => unitWidth.value,val => {
        console.log('watch unitWidth', val * 60 * 60 * 1000);
        
    })

    
    const refreshTimeSpanWidth = (resizeRuler:boolean) => {
        const oneHourWidth = resizeRuler ? 
            unitWidth.value * 60 * 60 * 1000 * Math.floor(scaleRatio.value) 
            : unitWidth.value * 60 * 60 * 1000
        
        const unitBlockWidth = oneHourWidth / Math.floor(scaleRatio.value)
        timeRulerRef.value?.style.setProperty('--timeSpanWidth', `${unitBlockWidth}px`)
    }

    const rulerResizeCallback = (entrys:ResizeObserverEntry[]) => {
        if (!entrys || !entrys.length) {
            return
        }
        const rulerRect = timeRulerRef.value?.getBoundingClientRect();
        const rulerWidth =  (rulerRect?.width as number) / scaleRatio.value - paddingLeft
        timeAreaWidth.value = rulerWidth
        initialRulerWidth.value = rulerWidth
        refreshTimeSpanWidth(true)
    }

    rulerResizeOb.value =  new ResizeObserver(rulerResizeCallback)

    // bufferTime 换算为毫秒
    const msBuffer = (hourNum: number) => hourNum * 60 * 60 * 1000

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
        return rulerTimeArray.value.map((item) => {
            const monthDay = getMonthDay(item)
            const time = getTime(item)
            return (<span class={styles['timeRuler__timeSpan']}>
                        <span class={[styles['timeRuler__timeSpan__monthDay'],'scaleword','scaletime']}>
                            {monthDay}
                        </span>
                        <span class={[styles['timeRuler__timeSpan__time'],'scaleword','scaletime']}>
                            {time}
                        </span>
                        <span class={[styles['timeRuler__timeSpan__mark'],'scaleword']}>
                                <svg-icon name="line" size="10" width="1px"/>
                        </span>
                    </span>)
        })
    })

    const initTimeRulerSpanWidth = () => {
        const rulerRect = timeRulerRef.value?.getBoundingClientRect();
        const rulerWidth =  rulerRect?.width as number - paddingLeft
        initialRulerWidth.value = rulerRect?.width as number - paddingLeft
        timeAreaWidth.value = rulerWidth
        spanWidth.value =  initialRulerWidth.value / hourBuffer.value
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
const useScheduleGraph = (scaleRatio:Ref<number>, scrollXOffeset:Ref<number>,unitWidth:Ref<number>) => {
    /** 画布距离左侧padding */
    const paddingLeft = 119

    /** 画布引用 */
    const graphRef = ref<HTMLDivElement>()

    /** 画布刻度尺对应的排程展示区域 引用 */
    const graphContentRef = ref<HTMLDivElement>()

    /** 画布当前的总宽度 */
    const graphWidh = ref<number>()

    /** 画布的根据总时长计算得出单位时长映射的像素值 */
    // const unitWidth = ref<number>()

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

    /** 点击拖拽时时间刻度的引用 */
    const timelineRef = ref<HTMLElement>()

    /** 辅助线Y侧的dom引用 */
    const supportlineYRef = ref<HTMLElement>()

    /** 辅助线X侧的dom引用 */
    const supportlineXRef = ref<HTMLElement>()

    /** 拖拽后的偏移量 */
    const dragOffsetX = ref<number>(0)

    /** 维护移动的脚标 */
    const hoverIndex = ref<number>()

     /** 拖拽过后的当前开始时间 */
     const startTimeAfterDrag = ref<number>()

     /** 拖拽过后的截止时间 */
     const endTimeAfterDrag = ref<number>()

     /** 拖拽过后的截止时间临时变量 */
     const endTimeDragTemp = ref<number>()

     /** 纵向滚动条导致出现的误差值 */
     const effectMarginLeft = ref<string>()

     /** 辅助线上侧的时间 */
     const hoverCurrentTime = ref<string>()

     /** 辅助线是否显示标志位 */
     const supportShow = ref<boolean>(false)

    const initDragTime = () => {
        startTimeAfterDrag.value = startTime.getTime()
        endTimeAfterDrag.value = endTime.getTime()
        endTimeDragTemp.value = endTime.getTime()
    }


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
       console.log('initUnitWidth', unitWidth.value * 60 * 60 * 1000)
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

    const getScheduleSpanLeft = (handleItem:EqpHandleItem) => {
        const offesetTime = handleItem.startTime - startTime.getTime()
        const left = offesetTime * unitWidth.value!
        return `${left}px`
    }

    const lotItem = (eqpItem:EqpItem, lotItem:EqpHandleItem) => {
        if(lotItem.setup){
            return <span class={styles['root__graph__content__lotsetup']}>
                <span class='scaleword'><svg-icon name="setup" size="16" /></span>
                <span class='scaleword'>
                    Set  up
                </span>
            </span>
        }else{
            return <span class={styles['root__graph__content__lot']}>
                     <span class='scaleword'>{lotItem.lotId}</span>
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
        return scheduleGraphData.value.map((eqpItem:EqpItem, index:number) => {
            return <div class={styles.eqpitem} onMouseover={(event:MouseEvent) => {
                eqpItemouseOverHandler(event, index)
            }}
            onMouseleave={()=>{ hoverIndex.value = -1 }}
            >
                { eqpItem.handleList.map((handleItem:EqpHandleItem, index:number) => {
                    return (<span class={[handleItemClass(handleItem),'pxs__lotItem']}
                            style={{
                                position:'absolute',
                                left:getScheduleSpanLeft(handleItem),
                                width:getSpanWidth(handleItem),
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

    const ctrlScrollX = (scaleRatio:number) => {
        // scrollWidth > clientWidth
        const graph = graphContentRef.value as HTMLDivElement
        const scrollWidth = graph.scrollWidth
        const clientWidth = graph.clientWidth
        if(scrollWidth > clientWidth){
            graphRef.value?.style.setProperty('overflow-x','auto')
        }
        if(scaleRatio == 1){
            graphRef.value?.style.setProperty('overflow-x','hidden')
        }
    }

    /** 控制画布中lot节点文字的缩放比例 */
    const scaleWord = (wordScale:number) => {
        const wordSpanNodes = graphContentRef.value?.querySelectorAll('.scaleword') as NodeListOf<Element>
        const wordSpanArr = Array.from(wordSpanNodes)
        wordSpanArr.forEach(item => {
            const wordSpan = item as HTMLSpanElement
            wordSpan && wordSpan.style.setProperty('transform', `scaleX(${wordScale}) translate3d(0,0,0)`);
        })
    }
    

    watch(() => dragOffsetX.value,(val)=> {
        let dragOffsetTime = 0
        // 往左  endTime--  如果减少后小于startTime  重置为startTime
        if(val < 0){
           dragOffsetTime =  val / unitWidth.value!
           const end = endTimeAfterDrag.value! + dragOffsetTime
           endTimeDragTemp.value = end <= startTime.getTime() ? startTime.getTime() : end

        // 往右  endTime++ 如果增加后大于endTime  重置为endTime
        }else{
            dragOffsetTime =  val / unitWidth.value!
            const time = endTimeAfterDrag.value! + dragOffsetTime
            endTimeDragTemp.value = time > endTime.getTime() ? endTime.getTime() : time
        }
        //! 这里的endTime和startTime需要维护 需要修改为响应式的值
        const timeStamp = endTimeDragTemp.value - startTime.getTime()
        const totalTime = endTime.getTime() - startTime.getTime()
        let scale = totalTime / timeStamp 
        //! 放大最大有点难看  这里控制到 1/n   hoverBuffer为分的时间区域块
        scale = scale > hourBuffer.value ? hourBuffer.value : scale
        scale = scale <= 1 ? 1 : scale
        graphContentRef.value?.style.setProperty('transform-origin',`0 center`)
        graphContentRef.value?.style.setProperty('transform',`scaleX(${scale}) translateZ(0) translate3d(0,0,0)`)
        //! 文字反向放大 抵消失真
        const wordScale = 1 / scale
        scaleWord(wordScale)

        ctrlScrollX(scale)
        // 维护放大比例
        scaleRatio.value = scale
    })

    /** 画布中鼠标移除事件 */
    const graphContentMouseLeaveHandler = (event:MouseEvent) => {
        supportShow.value = false
    }

    /** 画布中鼠标移动事件 */
    const graphContentMouseMoveHandler = (event:MouseEvent) =>{
        supportShow.value = true

        const graphRect = graphRef.value?.getBoundingClientRect()
        const graphLeft = graphRect?.left
        const originClientX = event.clientX;
        const originClientY = event.clientY

        supportlineYRef.value?.style.setProperty('--supportlineYLeft', `${originClientX - graphLeft!}px`)
        supportlineXRef.value?.style.setProperty('--supportlineXTop', `${originClientY}px`)

        const offsetX = (originClientX - graphLeft! - 119) < 0 ? 0 : (originClientX - graphLeft! - 119);

        console.log('offsetX', offsetX ,graphLeft)
        const offsetTime = (offsetX / unitWidth.value) /  scaleRatio.value
        // const oneMsWidth = unitWidth.value * Math.floor(scaleRatio.value) 
        // const offsetTime = offsetX / oneMsWidth

        const currentTime = startTime.getTime() + offsetTime

        hoverCurrentTime.value = `${getTime(new Date(currentTime))}`

        console.log(getMonthDay(new Date(currentTime)),getTime(new Date(currentTime)))
    }

    
    /** 画布展示区域的拖拽事件 */
    const graphContentMouseDownHandler = (event:MouseEvent) => {
        event.preventDefault()
        const graphRect = graphRef.value?.getBoundingClientRect()
        const graphLeft = graphRect?.left
        const originClientX = event.clientX;
        graphContentRef.value!.onmousemove = function (e:MouseEvent) {
            supportShow.value = false;
            const curClientX = e.clientX
            timeLineShow.value = true //出现时间刻度
            timelineRef.value?.style.setProperty('--timelineLeft', `${curClientX - graphLeft!}px`)
            dragOffsetX.value = curClientX - originClientX
        }

        document.onmouseup = function (e:MouseEvent) {
            endTimeAfterDrag.value = endTimeDragTemp.value
            timeLineShow.value = false //去掉时间刻度
            graphContentRef.value!.onmousemove = null
            document.onmouseup = null
        }
    }

    /** 消除由于出现纵向滚动条带来的padding导致布局不准确 */
    const clearScorllMarginEffect = () => {
        const graph = graphRef.value as HTMLDivElement
        const scrollHeight = graph.scrollHeight
        const clientHeight = graph.clientHeight
        effectMarginLeft.value = scrollHeight > clientHeight ? '6px' : '0px'
        //说明出现滚动条了
        graphContentRef.value?.style.setProperty('--effectMarginLeft',`${effectMarginLeft.value}`)
        graphRef.value?.style.setProperty('overflow-x','hidden')
    }

    const graphScrollX = () => {
        supportShow.value = false
        const scrollLeft = graphRef.value?.scrollLeft as number
        scrollXOffeset.value = scrollLeft
    }

    const listenGraphScrollX = () => {
        graphRef.value?.addEventListener('scroll', graphScrollX)
    }

    onMounted(()=> {
        initUnitWidth()
        setGraphPaddingLeft()
        setGraphResizeClearHandler()
        initDragTime()
        clearScorllMarginEffect()
        listenGraphScrollX()
    })

    onBeforeMount(() => {
        const graphResizeClearHandler = graphResizeClear.value
        graphResizeClearHandler && graphResizeClearHandler()
        graphRef.value?.removeEventListener('scroll', graphScrollX)
    })

    return {
        graphRef,
        graphScheduleJsx,
        graphEqpTypeJsx,
        graphContentMouseDownHandler,
        graphContentMouseMoveHandler,
        graphContentMouseLeaveHandler,
        graphContentRef,
        timeLineShow,
        timelineRef,
        supportlineYRef,
        supportlineXRef,
        hoverCurrentTime,
        supportShow
    }

}

export default defineComponent({
    name:'MachineSchedule',
    setup(){
        /** 公用缩放的比例 */
        const scaleRatio = ref<number>(1)

        /** 公用x轴偏移量 */
        const scrollXOffeset = ref<number>(0)

        /** 画布的根据总时长计算得出单位时长映射的像素值 */
        const unitWidth = ref<number>(0)

        const { 
            timeRulerRef, 
            rulerTimeArray, 
            timeSpans,
            rulerMounted,
            registeRulerResize
        } = useTimeRuler(scaleRatio, scrollXOffeset, unitWidth)

        const {
            graphRef,
            graphContentRef,
            graphScheduleJsx,
            graphEqpTypeJsx,
            graphContentMouseDownHandler,
            graphContentMouseMoveHandler,
            graphContentMouseLeaveHandler,
            timeLineShow,
            hoverCurrentTime,
            timelineRef,
            supportlineYRef,
            supportlineXRef,
            supportShow
        } = useScheduleGraph(scaleRatio, scrollXOffeset, unitWidth)

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
            supportlineYRef,
            supportlineXRef,
            hoverCurrentTime,
            supportShow,
            graphContentMouseDownHandler,
            graphContentMouseMoveHandler,
            graphContentMouseLeaveHandler
       }
    },
    render(){
        const { 
             options,
             timeSpans, 
             graphScheduleJsx, 
             graphEqpTypeJsx, 
             timeLineShow,
             hoverCurrentTime,
             supportShow,
             graphContentMouseDownHandler,
             graphContentMouseMoveHandler,
             graphContentMouseLeaveHandler
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
                </div>

                <div class={styles.timeRuler} ref="timeRulerRef">
                    { timeSpans }
                </div>
               <div class={styles['root__graph']} ref="graphRef">
                    {/* 这里可以抽出去作为Schedule的结果组件 */}
                    <div class={styles['root__graph__typeTitle']}>
                        {graphEqpTypeJsx}
                    </div>
               
                    <div class={styles['root__graph__content']} 
                            ref="graphContentRef" 
                            onMousedown={graphContentMouseDownHandler}
                            onMousemove={graphContentMouseMoveHandler}
                            onMouseleave={graphContentMouseLeaveHandler}
                            >
                         {graphScheduleJsx}
                    </div>
               </div>

                {/* 辅助线Y */}
               {supportShow && <div class={styles.supportlineY} ref="supportlineYRef" style="pointer-events: none;">
                    <span>{hoverCurrentTime}</span>
               </div>}

                {/* 辅助线X */}
               {supportShow && <div class={styles.supportlineX} ref="supportlineXRef" style="pointer-events: none;">
               </div>}

               {timeLineShow && <div class={styles.timeline} ref="timelineRef"></div>}
            </div>
        )
    }
})