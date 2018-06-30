// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { store } from './store'
import './styles/appStyles.scss'

Vue.config.productionTip = false

 /* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  data: {
    editList: null,
    // lists: [],
    newTitle: null,
    newDesc: null
  },

  methods: {
    deleteList(index) {
      let bodyData = {
        index: String(index)
      }

      this.$store.dispatch('deleteData', bodyData)

      // fetch('http://localhost:3000/docs', {
      //   method: "DELETE",
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(bodyData)
      // })
      // .then(() => {
      //   this.lists.splice(index, 1);
      //   this.$store.state.counter++;
      // })
    },

    updateList(list, index) {
      let bodyData = {
        index: String(index),
        title: list.title,
        description: list.description
      }

      this.$store.dispatch('updateData', bodyData)
      this.editList = null

      // fetch('http://localhost:3000/docs', {
      //   method: "PUT",
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(bodyData)
      // })
      // .then(() => {
      //   this.editList = null;
      // })
    },

    updateCancel() {
      this.editList = null
    },

    addList(newTitle, newDesc) {
      let bodyData = {
        title: newTitle === null ? 'no title' : newTitle,
        description: newDesc === null ? 'no description' : newDesc
      }

      this.$store.dispatch('addData', bodyData)
      this.newTitle = null
      this.newDesc = null

      // fetch('http://localhost:3000/docs', {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(bodyData)
      // })
      // .then(() => {
      //   this.$store.state.lists.push(bodyData);
      //   this.newTitle = null;
      //   this.newDesc = null;
      // })
    }
  },

  mounted() {
    this.$store.dispatch('getData')

    // fetch('http://localhost:3000/docs', {
    //   method : "GET"
    // })
    //   .then(response => response.json())
    //   .then((data) => {
    //     this.lists = data["data"];
    //   })
  },
  
  template: `
  <div>
   <h1>API TEST</h1>
    
   <div>
    <input type="text" v-model="newTitle" placeholder="Title"/>
    <input type="text" v-model="newDesc" placeholder="Desc"/>
    <button v-on:click="addList(newTitle, newDesc)">Add</button>
   </div>

   Add Counter : {{ this.$store.state.addCounter }} <br>
   Edit Counter : {{ this.$store.state.editCounter }} <br>
   Delete Counter : {{ this.$store.state.deleteCounter }} <br>
   Lists Counter : {{ this.$store.getters.getListCounts }} <br>

   <ul>
    <il v-for="(list, index) in this.$store.getters.getLists">
      <div v-if="editList === index">
        <input v-model="list.title"/>
        <input v-on:keyup.13="updateList(list, index)" v-model="list.description"/>
        <button v-on:click="updateList(list, index)">Save</button>
        <button v-on:click="updateCancel()">Cancel</button>
      </div>
      <div v-else>
        <button v-on:click="editList = index">Edit</button>
        <button v-on:click="deleteList(index)">Delete</button>  Title : {{list.title}} - Desc : {{list.description}}
      </div>
    </il>
   </ul>
  </div>
  `
})
