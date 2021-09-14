<template>
    <div>
        <Header subject="Metrics 예측" />
        <tab
            :tabs="tabs"
            :active-tab="activeTab"
            @change="tabChangeHandler"
            flexible
            small
        />

        <div v-if="activeTab==='train'" class="tab-content">
            <div>
                <navigation-bar
                    :showSearchBtn="false"
                >
                    <navigation-item>
                        <format-date-input :time="yesterday" 
                                        :messages="i18n" 
                                        @change="day => {this.yesterday = day;}"/>
                        <format-date-input :time="today" 
                                        :messages="i18n" 
                                        @change="day => {this.today = day;}"/>
                    </navigation-item>
                    <btn :items="[{ text: '학습시작' }]" :tooltip-options="{message: 'Start Training'}"/>
                </navigation-bar>
            </div>
            <div style="display:flex">
                <list-selector
                    :list="metrics"
                    single-select
                    title-label="Domain"
                    @check="printMetrics"
                    style="margin-top: 16px;"
                />
                <list-selector
                    :list="metrics"
                    multi-select
                    title-label="Domain Metrics"
                    @check="printMetrics"
                    style="margin-top: 16px;"
                />
                <list-selector
                    :list="metrics"
                    multi-select
                    title-label="Instance"
                    @check="printMetrics"
                    style="margin-top: 16px;"
                />
                <list-selector
                    :list="metrics"
                    multi-select
                    title-label="Instance Metrics"
                    @check="printMetrics"
                    style="margin-top: 16px;"
                />
           </div>
            <div class="chart-container">
                <div class="chart-title">Service Count</div>
                <graph-rangearea
                    :height="500"
                    :paddingTop="20"
                    :paddingLeft="40"
                    :paddingRight="30"
                    :paddingBottom="20"
                    :axis-full-mode="true"
                    :labels="labels"
                    :values="values"
                >
                    <guideline
                        :tooltip-x="true"
                        :tooltip-y="true"
                    ></guideline>
                </graph-rangearea>
            </div>
        </div>
        <div v-if="activeTab==='predict'" class="tab-content">
            predict
            <div>
                <div>
                    <btn :items="[{ text: 'hello' }]" @click="onClickHello" />
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import Header from '../../components/Header';
import Tab from '@vuejs/component/tab/Tab';
import NavigationBar from "@vuejs/component/navigationBar/NavigationBar";
import NavigationItem from "@vuejs/component/navigationBar/NavigationItem";
import FormatDateInput from '@vuejs/component/input/FormatDateInput';
import Btn from '@vuejs/component/button/Btn';
import ListSelector from '@vuejs/component/listSelector/ListSelector';

export default {
    components: {
        Header,
        Tab,
        NavigationBar,
        NavigationItem,
        FormatDateInput,
        Btn,
        ListSelector,
    },
    data() {
        return {
            tabs: [
                { key: 'train', value: '학습' },
                { key: 'predict', value: '예측' },
            ],
            activeTab: 'train',
            yesterday: getDayjs()
                .subtract(1, 'day')
                .startOf('date'),
            today: getDayjs().startOf('date'),            
            i18n: {
                apply: 'apply',
                cancel: 'cancel',
                dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            },
            tree: [
                {
                    "key": "0",
                    "label": "System",
                    "icon": "browser",
                    "parent": null
                },
                {
                    "key": "0.0",
                    "label": "System.0",
                    "parent": "0"
                },                    
            ],
            labels: [
                '2001',
                '2002',
                '2003',
                '2004',
                '2005',
                '2006',
                '2007',
                '2008',
            ],
            values: [
                [6, 6, 6],
                [7, 7, 7],
                [8, 8, 8],
                [6, 6, 6],
                [3, 3, 3],
                [5, 6, 8],
                [2, 4, 6],
                [8, 10, 12],
            ],
            metrics: [
                { label: '호출 건수', value: 'count' },
                { label: '총 CPU시간 (ms)', value: 'cpuSum' },
                { label: '응답시간 (ms)', value: 'averageResponseTime' },

            ]
        };
    },
    methods: {
        tabChangeHandler(tabName) {
            this.activeTab = tabName;
        },
        onClickHello() {
            this.values = this.values.map((x) => {
                x[0] += 1;
                x[1] += 1;
                x[2] += 1;
                return x;
            });
            console.log('hello');
        },
        printMetrics(list) {
            console.log(list);
        },
    },
};
</script>

<style lang="scss" scoped>
.chart-container {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
}

.chart-title {
    line-height: 30px;
    padding-left: 20px;
    font-weight: bold;
}

.tab-content {
    height: calc(100vh - (65px + 32px));
    padding: 20px;
}
</style>
