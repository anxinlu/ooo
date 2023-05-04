import { defineComponent, onMounted } from "vue";
import styles from './index.module.scss'

export default defineComponent({
    name:'LayoutHeader',
    render(){
        return (
            <div class={styles['layout__header']}>

                <div class={styles['layout__header__title']}>
                        <span>Pxsemi</span>
                        <span>|</span>
                        <span>智能生产中心</span>
                </div>
                <div class={styles['layout__header__operators']}>
                    <svg-icon name="userBook" size="18"
                        class={styles['layout__header__operators__userbook']}
                    />
                    

                    <div class={styles['layout__header__operators__user']}>
                        <div class={styles['layout__header__operators__user__select']}>
                            <span class={styles['layout__header__operators__user__icon']}>
                                <svg-icon name="user" size="12" 
                                    color="#2783FC"
                                    />
                            </span>
                            Admin
                        </div>
                        <svg-icon name="down" size="12" color="#2783FC" height="10"/>
                    </div>
                </div>
            </div>
        )
    }
})