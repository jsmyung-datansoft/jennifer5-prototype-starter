import { getAllChildren } from '@vuejs/component/resource/tree/treeAction';
import { LocalStorageManager } from '@common/legacy/LocalStorageManager';

import axios from "./axios";

const domainList = [];

let currentTreeIndex = (
    window.localStorage.getItem('selectedDomainGroupIndex') || ''
).replace(/\"/g, '');
if (!domainList.some(d => d.treeIndex === currentTreeIndex)) {
    currentTreeIndex = domainList[0] ? domainList[0].treeIndex : '0';
}

function selectDomainMutationLogic(state, domainTreeIndex, noCache = false) {
    let selectedIndex = domainTreeIndex;
    const { multiDomainFlag, domainList } = state;

    // 트리 재선택
    let selectedOne =
        domainList.find(d => d.treeIndex === selectedIndex) ||
        state.domainList[0];
    if (!multiDomainFlag && selectedOne.data.sid === -1) {
        selectedOne = getAllChildren(selectedOne.treeIndex, domainList).filter(
            d => d.data.sid !== -1
        )[0];
    }
    state.selectedOne = selectedOne;

    const selectedDomainGroupIndexKeyName = window.batchJobMode
        ? 'selectedDomainGroupIndexForBatchJob'
        : 'selectedDomainGroupIndex';

    if (!noCache) {
        // 현재 선택한 노드 세션이 저장하기
        LocalStorageManager.save(
            selectedDomainGroupIndexKeyName,
            selectedIndex
        );
    }
}

export default {
    namespaced: true,
    state: {
        useDomainGroup: true,
        multiDomainFlag: true,
        domainList,
        selectedOne: domainList.find(d => d.treeIndex === currentTreeIndex),
    },
    mutations: {
        _updateMultiDomainFlag(state, flag) {
            state.multiDomainFlag = flag;
        },
        updateDomainList(state, domainList) {
            state.domainList = domainList;
        },
        selectDomain(state, domainTreeIndex) {
            selectDomainMutationLogic(state, domainTreeIndex);
        },
    },
    getters: {
        allSidList: state => {
            return state.domainList
                .filter(domain => domain.data.sid !== -1)
                .map(domain => domain.data.sid);
        },
        sidList({ domainList, selectedOne }) {
            /**
             * 도메인 선택되어있으면 -> [해당 도메인 sid]
             * 도메인 그룹 선택되어있으면 -> [해당 도메인 자식들의 sid들 전부]
             */
            if (!selectedOne || !selectedOne.data) {
                return [];
            }
            if (selectedOne.data.sid === -1) {
                return getAllChildren(selectedOne.treeIndex, domainList)
                    .map(d => d.data.sid)
                    .filter(sid => sid !== -1);
            }
            return [selectedOne.data.sid];
        },
    },
    actions: {
        updateMultiDomainFlag({ commit, state }, flag) {
            commit('_updateMultiDomainFlag', flag);
            if (state.selectedOne)
                commit('selectDomain', state.selectedOne.treeIndex);
        },
        async fetchDomains({ commit }) {
            const { data } = await axios.get('/api/domains/');
            commit('updateDomainList', data)
            commit('selectDomain', "0");
        },
    },
};
