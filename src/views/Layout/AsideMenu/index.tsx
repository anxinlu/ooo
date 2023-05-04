import { defineComponent, reactive, ref } from "vue";
import styles from './index.module.scss'

type MenuItem = {
    id:string,
    name:string,
    iconName?:string,
    click?: Function,
    children?:MenuItem[]
}

export default defineComponent({
    name:'AsideMenu',
    setup(){
        const asideMenu = reactive([
            {id:'home', name:'Home',iconName:'home', click: () => {}},
            {id:'produceMessage', name:'Produce Message',iconName:'produceMessage', click: () => {}, 
                children:[
                    {id:'2-1', name:'pm1',iconName:'home', click: () =>{}, }
                ]
            },
            {id:'productSchedule', name:'Product Schedule',iconName:'productSchedule', click: () =>{}, 
                children:[
                    {id:'3-1', name:'ps1',iconName:'home', click: () =>{}, }
                ]
            },
            {id:'scheduleResult', name:'Schedule Result',iconName:'scheduleResult', click: () =>{}, 
                children:[
                    {id:'/scheduleResult/machineSchedule', name:'Machine Schedule', click:() => {}},
                    {id:'/scheduleResult/machineScheduleList', name:'Machine schedule list', click:() => {}},
                    {id:'/scheduleResult/reticleConvey', name:'Reticle Convey', click:() => {} },
                    {id:'/scheduleResult/kpiAnalysis', name:'KPI Analysis', click:() => {} }
                ]
            },
            {id:'statisticalChart', name:'Statistical Chart',iconName:'statisticalChart', click: () =>{}, 
                children:[
                    {id:'5-1', name:'sc1',iconName:'home', click: () =>{}, }
                ]
            },
        ])
        
        const isCollapse = ref<boolean>(true)

        const handleOpen = (key: string, keyPath: string[]) => {
            console.log(key, keyPath)
        }

        const handleClose = (key: string, keyPath: string[]) => {
            console.log(key, keyPath)
        }

        const toggleCollapse = () => {
            isCollapse.value = !isCollapse.value
            console.log('isCollapse', isCollapse.value);
        }

        return {
            isCollapse,
            handleOpen,
            handleClose,
            toggleCollapse,
            asideMenu
        }
    },
    render(){
        const { isCollapse, handleOpen, handleClose, toggleCollapse, asideMenu} = this
        return(
            <div class={styles.aside}>
                <span onClick={toggleCollapse} class={styles.toggle}>
                    <svg-icon name="asideCtrl" size="16"/>
                </span>
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    collapse={isCollapse}
                    open={handleOpen}
                    close={handleClose}
                    router
                >
                    {asideMenu.map((item: MenuItem) => {
                        return !item.children ?
                            (<el-menu-item index={item.id} 
                                v-slots={{
                                    title:() => 
                                        (<span>{item.name}</span>)
                                }}
                            >
                                <el-icon><svg-icon name={item.iconName} size="16"/></el-icon>
                            </el-menu-item>) 
                            :
                            (<el-sub-menu index={item.id} v-slots={{
                                title:() => 
                                (
                                    <><el-icon><svg-icon name={item.iconName} size="16"/></el-icon>
                                    <span>{item.name}</span></>
                                )
                            }}>
                                <el-menu-item-group>
                                    {
                                        item.children.map((child:MenuItem) => 
                                            <el-menu-item index={child.id}>{child.name}</el-menu-item>
                                        )
                                    }
                                </el-menu-item-group>

                            </el-sub-menu>)
                        })
                    }
                </el-menu>
            </div>
        )
    }
})