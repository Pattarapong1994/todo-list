import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://65e166eba8583365b316482e.mockapi.io'

export const useTodoStore = defineStore('todo', {
  state: () => ({ //กำหนดข้อมูล state ที่จะเก็บ 
    list: [],
    selectedTodo: {},
    statuses: ['Pending', 'Doing', 'Done']
  }),
  actions: {
    async loadTodos() {
      try {
        const response = await axios.get(`${BASE_URL}/todos`)
        this.list = response.data
        console.log('load todo list complete')
      } catch (error) {
        console.log('error', error)
      }
    },
    async loadTodo(id) {
      try {
        const response = await axios.get(`${BASE_URL}/todos/${id}`)
        this.selectedTodo = response.data
        console.log('load todo by id complete')
      } catch (error) {
        console.log('error', error)
      }
    },
    async addTodo(todoText) {
      const bodyData = {
        name: todoText,
        status: 'Pending'
      }

      try {
        const response = await axios.post(`${BASE_URL}/todos`, bodyData)
        this.list.push(response.data)
        console.log('Add todo complte')
      } catch (error) {
        console.log('error', error)
      }
    },
    async editTodo(todoData, id) {
      /*
       หน้าตาข้อมูลที่ต้องการให้ออกมา
        {
        name:'test',
        status: 'Doing'
        }
      */
      try {
        const response = await axios.put(`${BASE_URL}/todos/${id}`, todoData)
        console.log('edit todo complete')
      } catch (error) {
        console.log('error', error)
      }
    },
    async removeTodo(id) {
      try {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`)
        console.log('delete todo complete')
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})
