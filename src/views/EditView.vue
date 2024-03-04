<script setup>
import { useTodoStore } from '../stores/todo'
import { RouterLink, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

const todoStore = useTodoStore()
const route = useRoute()
const todoId = ref(-1)
const isLoaded = ref(false)

onMounted(async () => {
    await todoStore.loadTodo(route.params.id)
    isLoaded.value = true
    todoId.value = parseInt(route.params.id)

})

const editTodo = async(selectedTodo) =>{
    try {
        const bodyData = {
        name: selectedTodo.name,
        status: selectedTodo.status
    }
    await todoStore.editTodo(bodyData, todoId.value)
    alert('edit todo complete')
    } catch (error) {
        console.log('error', error)
    }
}

</script>

<template>
    <div v-if="isLoaded">
        Edit ID: {{ todoId }}
        <div class="flex">
            <div>
               Name
            </div> 
            <input type="text" v-model="todoStore.selectedTodo.name">
        </div>
        <div class="flex">
            <div>
                Status 
            </div>
            <select v-model="todoStore.selectedTodo.status" >
                <option value="">Select Status</option>
                <option v-for="status in todoStore.statuses" :value="status">
                    {{ status }}
                </option>
            </select>
        </div>
        <div>
            <button @click="editTodo(todoStore.selectedTodo)">Edit</button>
            <RouterLink :to="{name:'todo-list'}">
                <button>Back</button>
            </RouterLink>
        </div>
    </div>
    <div v-else>
        <h2>
            is Loading...
        </h2>
    </div>

</template> 