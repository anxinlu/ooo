import { defineComponent, ref } from "vue";
import styles from './index.module.scss'

export default defineComponent({
    name:'FilterDrawer',
    setup(){
        const visible = ref<boolean>(true)

        const value2 = ref<string>('')

        const selVal = ref<string>('')

        const defaultTime2: [Date, Date] = [
            new Date(2000, 1, 1, 12, 0, 0),
            new Date(2000, 2, 1, 8, 0, 0),
        ]

        const shortcuts = [
            {
              text: 'Last week',
              value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                return [start, end]
              },
            },
            {
              text: 'Last month',
              value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                return [start, end]
              },
            },
            {
              text: 'Last 3 months',
              value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                return [start, end]
              },
            },
        ]

        const options = [
            {
              value: 'Option1',
              label: 'Option1',
            },
            {
              value: 'Option2',
              label: 'Option2',
            },
            {
              value: 'Option3',
              label: 'Option3',
            },
            {
              value: 'Option4',
              label: 'Option4',
            },
            {
              value: 'Option5',
              label: 'Option5',
            },
        ]

        const timeChangeHandler = (val:Array<string>) => {
            console.log(val)
        }

        return {
            visible,
            value2,
            shortcuts,
            options,
            selVal,
            timeChangeHandler,
            defaultTime2
        }
    },
    render(){
        const { value2, shortcuts, options, selVal, timeChangeHandler } = this

        return (
            <>
                <el-drawer modelValue={this.visible} modal={false} 
                    direction='ltr' modal-class={styles.filterModal} 
                    with-header={false}>
                    {/*头部过滤区  */}
                    <div class={styles['filterModal__header']}>
                        <div class={styles['filterModal__header__title']}>
                            <svg-icon name="filter" color="#2783FC" size="11"/>
                            <span>Filter</span>
                        </div>
                        <div class={styles['filterModal__header__filter']}>
                            <el-date-picker
                                v-model={this.value2}
                                type="datetimerange"
                                shortcuts={shortcuts}
                                range-separator="to"
                                start-placeholder="Start Time"
                                end-placeholder="End Time"
                                onCalendarChange={(val:any) => console.log(val)}
                                onChange={(val:Array<string>) => timeChangeHandler(val)}
                                clearable={false}
                                />
                                {/* <el-select v-model={selVal} filterable placeholder="Please select the annotation type">
                                    {options.map(item => 
                                        <el-option key={item.value} label={item.label} value={item.value}/>
                                    )}
                                </el-select> */}
                        </div>
                        
                    </div>
                    {/* 过滤数据结果list */}
                    <div class={styles['filterModal__result']}>
                        <div class={styles['filterModal__result__header']}>
                            <span class={styles['filterModal__result__header__title']}>
                                <svg-icon name="filterResult" color="#2783FC" size="12"/>Filter Result
                            </span>
                            <span class={styles['filterModal__result__header__order']}>
                                <svg-icon name="asc" color="#2783FC" size="12"/>ASC
                            </span>
                        </div>
                        <div class={styles['filterModal__result__content']}>
                            {/* 列表行  */}
                            {new Array(20).fill(0).map(item => {
                               return <div class={styles['filterModal__result__content__row']}>
                                    <span class={styles['filterModal__result__content__row__time']}>
                                        2023/04/10 10:00:00
                                        <span class={styles['filterModal__result__content__row__time']}>
                                            Latest
                                        </span>
                                    </span>
                                    <svg-icon name="more" size="18"/>
                                </div>
                            })}
                        </div>
                    </div>
                </el-drawer>
                <svg-icon name="db" size="14" height="64" 
                    onClick={() => { this.visible = !this.visible; }} 
                    class={styles.drawerBtn}
                />
            </>
        )
    }
})