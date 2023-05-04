import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import AsideMenu from "./AsideMenu";
import LayoutHeader from "./LayoutHeader";
import styles from './index.module.scss'
import FilterDrawer from "./FilterDrawer";


export default defineComponent({
    name:'Layout',
    setup(){
    },
    render(){
        return (
            <div class={styles.layout}>
                <el-container>
                  {/* 头部 */}
                    <el-header>
                       <LayoutHeader />
                    </el-header>
                  
                    <el-container>
                        {/* 左侧导航 */}
                            <el-aside>
                            <AsideMenu />
                            </el-aside>

                            {/* drawer */}
                            <FilterDrawer />

                        {/* 主区域 */}
                        <el-main>
                            <RouterView />
                        </el-main>
                    </el-container>
                    
                </el-container>
            </div>
        )
    }
})