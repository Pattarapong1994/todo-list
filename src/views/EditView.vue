<script setup>
import { useTodoStore } from '../stores/todo'
import { RouterLink, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import Loading from '../components/Loading.vue';

const todoStore = useTodoStore()
const route = useRoute()
const todoId = ref(-1)
const isLoaded = ref(false)
const isUpdated = ref(false)

onMounted(async () => {
    await todoStore.loadTodo(route.params.id)
    isLoaded.value = true
    todoId.value = parseInt(route.params.id)

})

const editTodo = async (selectedTodo) => {
    try {
        isLoaded.value = false
        const bodyData = {
            name: selectedTodo.name,
            status: selectedTodo.status
        }
        await todoStore.editTodo(bodyData, todoId.value)
        isLoaded.value = true
        isUpdated.value = true
        setTimeout(()=> {
            isUpdated.value = false
        },2500)
    } catch (error) {
        console.log('error', error)
    }
}

</script>

<template>
    <div class="w-1/2 mx-auto">
        <div class="toast toast-end">
            <div v-if="isUpdated" class="alert alert-success">
                <span>Update Successfully.</span>
            </div>
        </div>
        <div v-if="isLoaded">
            EDIT ID :
            <div class="badge badge-outline"> {{ todoId }}</div>
            <div>
                <label class="form-control w-full ">
                    <div class="label">
                        <span class="label-text">Name</span>
                    </div>
                    <input type="text" placeholder="Type name todo" class="input input-bordered w-full"
                        v-model="todoStore.selectedTodo.name" />
                </label>
            </div>

            <div>
                <label class="form-control w-full ">
                    <div class="label">
                        <span class="label-text">Status</span>
                    </div>

                    <select class="select select-bordered w-full" v-model="todoStore.selectedTodo.status">
                        <option value="">Select Status</option>
                        <option v-for="status in todoStore.statuses" :value="status">
                            {{ status }}
                        </option>>
                    </select>
                </label>
            </div>
            <div>
                <button class="btn btn-primary w-full mt-5" @click="editTodo(todoStore.selectedTodo)">Edit</button>
                <RouterLink :to="{ name: 'todo-list' }">
                    <button class="btn btn-outline  w-full mt-1 ">Back</button>
                </RouterLink>
            </div>
        </div>
        <div v-else>
            <Loading></Loading>
        </div>
    </div>

</template>