import { defineComponent, onMounted, ref } from "vue";
import styles from './index.module.scss'

let zIndex = 100;  //维护zIndex 解决覆盖问题

export const ColorType = {
    type1: [`#9FE3FF`,`#4ACAFF`, `#AFFFD9`],
    type2: [`#D5A8F9`, `#C174FF`, `#FF87C1`]
}

export default defineComponent({
    name:'WaveCicle',
    props:{
        title:{
            type:String,
            default:''
        },
        /** 只支持传入 0 - 1 数值 */
        ratio:{
            type:Number,
            default:0
        },
        bgColorArr:{
            type:Array,
            default:null
        }
    },
    setup(props){
        const waveRef = ref<HTMLSpanElement>()
        const ratioRef = ref<number>(0)

        const normalizeRatio = () => {
            const ratio = props.ratio
            if(ratio<0 || ratio>1){
                console.error(`wave ratio init failed, your input is ${ratio}, please input right number from 0 to 1`)
                return
            }
            const normalizedRdtio = ratio * 0.5 * 100 + 50
            ratioRef.value = normalizedRdtio
        }
        
        // virtualEleAfterZindex  伪元素after的层级略高一些
        // virtualEleAllZindex  伪元素初始层级
        onMounted(()=>{
            normalizeRatio() // 初始化占比
            waveRef.value?.style.setProperty('--color1',`${props.bgColorArr[0]}`)
            waveRef.value?.style.setProperty('--color2',`${props.bgColorArr[1]}`)
            waveRef.value?.style.setProperty('--color3',`${props.bgColorArr[2]}`)
            waveRef.value?.style.setProperty('--virtualEleAfterZindex',`${zIndex--}`)
            waveRef.value?.style.setProperty('--virtualEleAllZindex',`${zIndex--}`)
            waveRef.value?.style.setProperty('--infoZindex',`${zIndex + 1}`)
            waveRef.value?.style.setProperty('--ratio',`-${ratioRef.value + 3}%`)
            waveRef.value?.style.setProperty('--animateHarlfRatio',`-${ratioRef.value + 3}%`)
        })

        return {
            waveRef
        }
    },
    render(){
        return (<span class={styles.wave} ref="waveRef">
            <span class={styles['wave__info']}>
                {this.$props.title}
            </span>
        </span>)
    }
})