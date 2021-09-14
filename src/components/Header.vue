<template>
    <div class="common-header">
        <loading-indicator v-if="isLoading" />
        <div class="left" v-if="!hideDomainGroupBox">
            <tooltip
                message="Domain 그룹"
                :position="'bottom-left'"
                :cursor-none="true"
                :show-tooltip="
                    activeDomainTree && !hideDomainGroupBox ? false : undefined
                "
            >
                <btn
                    class="border-none domain-group-tree-btn"
                    :pressed="activeDomainTree"
                    :items="[{ iconType: iconTypes.hierarchy }]"
                    @click="onActiveDomainTree"
                    v-if="useDomainGroup === true"
                />
            </tooltip>

            <div class="divider" v-if="useDomainGroup === true" />

            <DomainGroupSelector
                @elementSelected="onSelectDomainGroup"
                :selectedOne="selectedOne"
                :domain-group-tree="domainList"
            />
        </div>

        <div class="subject" v-html="subject"></div>

    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const uiStore = createNamespacedHelpers('ui');
const {
    mapState,
    mapGetters,
    mapMutations,
    mapActions,
} = createNamespacedHelpers('domain');


import Btn from '@vuejs/component/button/Btn';
import Tooltip from '@vuejs/component/tooltip/Tooltip';
import LoadingIndicator from '@vuejs/component/loading/LoadingIndicator';
import DomainGroupSelector from '@vuejs/component/domain/domainGroupSelector/DomainGroupSelector';

import { ICON_TYPE } from '@vuejs/component/icon/iconType';

export default {
    name: 'Header',
    props: {
        subject: {
            type: String,
            required: true,
        },
        hideDomainGroupBox: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    components: {
        LoadingIndicator,
        Btn,
        Tooltip,
        DomainGroupSelector,
    },
    computed: {
        ...uiStore.mapGetters(['isLoading']),
        ...mapState(['useDomainGroup', 'domainList', 'selectedOne', 'multiDomainFlag']),
    },
    data() {
        return {
            iconTypes: {
                help: ICON_TYPE.help,
                close: ICON_TYPE.close,
                hierarchy: ICON_TYPE.hierarchy,
            },
            activeDomainTree: false,
        };
    },
    methods: {
        ...uiStore.mapMutations(['isLoadingDomain']),
        ...mapMutations(['selectDomain']),
        ...mapActions(['updateMultiDomainFlag', 'fetchDomains']),
        onActiveDomainTree() {
            this.activeDomainTree = !this.activeDomainTree;
            // UI 테스트 기간에는 업무량이 많아서 도메인 레이어를 비활성했음
            // this.$emit('active:tree', this.activeDomainTree);
        },
        onSelectDomainGroup(element) {
            this.selectDomain(element.treeIndex);
        },
    },
    created() {
        this.isLoadingDomain(true);
        this.fetchDomains();
        this.isLoadingDomain(false);
    },
};
</script>

<style lang="scss" scoped>
@import '@layout/container/header/themes';

.common-header {
    position: relative;
    height: 28px;
    padding: 18px 0;

    @include themify($themes) {
        background-color: themed('common-header-background-color');
        border-bottom: 1px solid themed('common-header-border-bottom');

        > div {
            position: absolute;
        }

        > .subject {
            color: themed('common-header-font-color');
            width: 100%;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
        }

        > .left {
            display: flex;
            z-index: 2000;
            left: 24px;
        }

        > .right {
            margin-top: -4px;
            right: 24px;
            font-size: 11px;
            display: flex;
            align-items: center;
        }

        .divider {
            width: 1px;
            height: 16px;
            margin: 0 8px;
            vertical-align: middle;
            align-self: center;
            display: inline-flex;
            background-color: themed('common-header-divider-border-color');
        }
    }
}
</style>
