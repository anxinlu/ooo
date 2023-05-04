import WaveCircle, { ColorType } from "@/components/waveCircle";
import { defineComponent } from "vue";
import styles from './index.module.scss'


export default defineComponent({
    name:'KPIAnalysis',
    render(){
        return (
            <div>
                <div class={styles.wrapper}>
                    <WaveCircle title="1200" ratio={1} bgColorArr={ColorType.type1} />
                    <WaveCircle title="1200" ratio={0.5} bgColorArr={ColorType.type2}/>
                    <WaveCircle title="1200" ratio={0.3} bgColorArr={ColorType.type1}/>
                    <WaveCircle title="1200" ratio={0.2} bgColorArr={ColorType.type2}/>
                    <WaveCircle title="1200" ratio={0.1} bgColorArr={ColorType.type1}/>
                    <WaveCircle title="1200" ratio={0} bgColorArr={ColorType.type2}/>
                </div>
            </div>
        )
    }
})