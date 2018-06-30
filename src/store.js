import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        lists: [],
        addCounter: 0,
        deleteCounter: 0,
        editCounter: 0
    },
    
    getters: {
        getLists: function (state) {
          return state.lists
        },

        getListCounts: function (state) {
            return state.lists.length
        }
    },

    mutations: {
        addList: function (state, payload) {
            state.lists.push(payload)
            state.addCounter++
        },

        deleteList: function (state, payload) {
            state.lists.splice(payload, 1)
            state.deleteCounter++
        },

        updateList: function (state, payload) {
            return state.editCounter++
        },

        initLists: function (state, payload) {
            state.lists = payload
        }
    },

    actions: {
        getData: function(context) {
            fetch('http://localhost:3000/docs', {
                method: 'GET'
              })
                .then(response => response.json())
                .then((data) => {
                    return context.commit('initLists', data['data'])
                })
        },

        addData: function(context, payload) {
            fetch('http://localhost:3000/docs', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
              })
              .then(() => {
                return context.commit('addList', payload)
              })
        },

        updateData: function(context, payload) {
            fetch('http://localhost:3000/docs', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(() => {
                return context.commit('updateList', payload)
            })
        },

        deleteData: function(context, payload) {
            fetch('http://localhost:3000/docs', {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(() => {
                return context.commit('deleteList', payload.index)
              })
        }
    }
})
