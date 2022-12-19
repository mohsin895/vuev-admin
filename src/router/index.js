import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/layout'),
    redirect: {path: '/dashboard'},
    children: [
      {
        path:'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path:'application/:dataId/edit',
        name: 'ApplicationEdit',
        component: () => import('@/views/ApplicationEdit.vue'),
      },
      {
        path:'applications',
        name: 'Applications',
        component: () => import('@/views/Application.vue'),
      },
      {
        path:'case-summon',
        name: 'CaseSummon',
        component: () => import('@/views/CaseSummon.vue'),
      },
      {
        path:'crime-attendance',
        name: 'CrimeAttendance',
        component: () => import('@/views/CrimeAttendance.vue'),
      },
      {
        path:'crime-register',
        name: 'CrimeRegister',
        component: () => import('@/views/RegisterCase.vue'),
      },
      {
        path:'crime-order',
        name: 'CrimeOrder',
        component: () => import('@/views/CrimeOrder.vue'),
      },
      {
        path:'crime-slip',
        name: 'CrimeSlip',
        component: () => import('@/views/CrimeSlip.vue'),
      },
      {
        path:'member-nomination-form',
        name: 'MemberNominationForm',
        component: () => import('@/views/MemberNominationForm.vue'),
      },
      {
        path:'member-nomination-order',
        name: 'MemberNominationOrder',
        component: () => import('@/views/MemberNominationOrder.vue'),
      },
      {
        path:'member-attendance-request',
        name: 'MemberAttendanceRequest',
        component: () => import('@/views/MemberAttendanceRequest.vue'),
      },
      {
        path:'degree-or-order-form',
        name: 'DegreeOrOrderForm',
        component: () => import('@/views/DegreeOrOrderForm.vue'),
      },
      {
        path:'mutual-solution',
        name: 'MutualSolution',
        component: () => import('@/views/MutualSolution.vue'),
      },
      {
        path:'send-to-higher-court',
        name: 'SendToHigherCourt',
        component: () => import('@/views/SendToHigherCourt.vue'),
      },
      {
        path:'send-to-local-court',
        name: 'SendToLocalCourt',
        component: () => import('@/views/SendToLocalCourt.vue'),
      },
      {
        path:'union-members',
        name: 'UnionMembers',
        component: () => import('@/views/settings/UnionMember.vue'),        
      },
      {
        path:'tno-list',
        name: 'TnoList',
        component: () => import('@/views/settings/Tno.vue'),        
      },
      {
        path:'deputy-commissioner-list',
        name: 'DcList',
        component: () => import('@/views/settings/DeputyCommissioner.vue'),        
      },
      {
        path:'staff-list',
        name: 'StaffList',
        component: () => import('@/views/settings/StaffList.vue'),        
      },
      {
        path:'role-list',
        name: 'RoleList',
        component: () => import('@/views/settings/RoleList.vue'),        
      },
      {
        path:'medias',
        name: 'Media',
        component: () => import('@/views/settings/media.vue'),        
      },
      {
        path:'general-setting',
        name: 'GeneralSetting',
        component: () => import('@/views/settings/GeneralSetting.vue'),        
      },
     
      // Report All Page Rounter Link // LossAndOrderRegister
      {
        path:'register-case-report',
        name: 'RegisterCaseReport',
        component: () => import('@/views/report/RegisterCase.vue'),        
      },
      {
        path:'DegriOrOrder-Register',
        name: 'DegriOrOrderRegister',
        component: () => import('@/views/report/DegriOrOrderRegister.vue'),        
      },
      {
        path:'LossAndOrder-Register',
        name: 'LossAndOrderRegister',
        component: () => import('@/views/report/LossAndOrderRegister.vue'),        
      },
      {
        path:'FeesOrFine-Register',
        name: 'FeesOrFineRegister',
        component: () => import('@/views/report/FeesOrFineRegister.vue'),        
      },
      {
        path:'PatroProdan-Register',
        name: 'PatroProdanRegister',
        component: () => import('@/views/report/PatroProdanRegister.vue'),        
      },
      {
        path:'ComplaneAceptAndTmonth-Report',
        name: 'ComplaneAceptAndTmonthReport',
        component: () => import('@/views/report/ComplaneAceptAndTmonthReport.vue'),        
      },
      {
        path:'upazila-quarterly-report',
        name: 'UpazilaQuarterlyReport',
        component: () => import('@/views/report/UpozilaUnderTmonthReport.vue'),        
      },
      {
        path:'zila-quarterly-report',
        name: 'zilaQuarterlyReport',
        component: () => import('@/views/report/zilaUnderTmonthReport.vue'),        
      },
      
        {
          path:'slider-list',
          name: 'SliderList',
          component: () => import('@/views/frontend/SliderList.vue'), 
        },
        {
          path:'notice-list',
          name: 'NoticeList',
          component: () => import('@/views/frontend/NoticeList.vue'), 
        },
        {
          path:'fouzdari-service',
          name: 'FouzdariService',
          component: () => import('@/views/frontend/FouzdariService.vue'), 
        },
        {
          path:'dewyani-service',
          name: 'DewyaniService',
          component: () => import('@/views/frontend/DewyaniService.vue'), 
        },

        {
          path:'general-question',
          name: 'GeneralQuestion',
          component: () => import('@/views/frontend/GeneralQuestion.vue'), 
        },
        {
          path:'laws-form-list',
          name: 'LawFormList',
          component: () => import('@/views/frontend/LawFormList.vue'), 
        },
        {
          path:'laws-list',
          name: 'LawsList',
          component: () => import('@/views/frontend/LawsList.vue'), 
        },
        {
          path:'media-list',
          name: 'MediaList',
          component: () => import('@/views/frontend/MediaList.vue'), 
        },
        {
          path:'gadget-list',
          name: 'GadgetList',
          component: () => import('@/views/frontend/GadgetList.vue'), 
        },
        {
          path:'fees-text',
          name: 'FeesText',
          component: () => import('@/views/frontend/FeesText.vue'), 
        },
        
            
       
    ]
  },
  {
    path: '*',
    name: 'catchAll',
    component: () => import('@/views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    // always scroll to top
    return { 
      x: 0,
      y: 0 
    }
  },
  routes
})

export default router
