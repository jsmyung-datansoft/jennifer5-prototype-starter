import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './views/Main';
import DashboardAIMetrics from './views/dashboard/AIMetrics';
import AnalysisUser from './views/analysis/User';
import StatisticsDaily from './views/statistics/Daily';
import Report from './views/Report';
import Setting from './views/Setting';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', component: Main },
        {
            path: '/dashboard',
            component: { template: '<router-view />' },
            children: [
                {
                    path: 'ai/metrics',
                    component: DashboardAIMetrics,
                },
            ],
        },
        {
            path: '/analysis',
            component: { template: '<router-view />' },
            children: [
                {
                    path: 'user',
                    component: AnalysisUser,
                },
            ],
        },
        {
            path: '/statistics',
            component: { template: '<router-view />' },
            children: [
                {
                    path: 'dailySystem',
                    component: StatisticsDaily,
                },
            ],
        },
        {
            path: '/report',
            component: Report,
        },
        {
            path: '/setting',
            component: Setting,
        },
    ],
});
