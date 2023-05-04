import { createRouter, createWebHistory } from 'vue-router'
import MachineSchedule from '@/views/ScheduleResult/MachineSchedule'
import ReticleConvey from '@/views/ScheduleResult/ReticleConvey'
import KPIAnalysis from '@/views/ScheduleResult/KPIAnalysis'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/scheduleResult/machineSchedule',
      name: 'machineSchedule',
      component: MachineSchedule
    },
    {
      path: '/scheduleResult/reticleConvey',
      name: 'reticleConvey',
      component: ReticleConvey
    },{
      path: '/scheduleResult/kpiAnalysis',
      name: 'kpiAnalysis',
      component: KPIAnalysis
    }
  ]
})

export default router
