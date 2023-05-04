import { defineComponent } from "vue";
import styles from './index.module.scss'

export default defineComponent({
    name:'PageHeader',
    props:{
        iconName:{
            type:String,
            default:''
        },
        title:{
            type:String,
            default:''
        }
    },
    render(){
        return (
            <div class={styles.pageTitle}>
                <svg-icon name={this.$props.iconName} size="20"/>
                <span class={styles['pageTitle__title']}>
                    {this.$props.title}
                </span>
            </div>
        )
    }
})