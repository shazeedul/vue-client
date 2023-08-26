<template>
    <div class="container-fluid mt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-md-12">
                <b-card>
                    <div class="text-end">
                        <b-button @click="openModal">Add</b-button>
                    </div>
                    <b-table striped hover :items="forms" :fields="fields">
                        <template #cell(id)="row">
                            {{ row.index + 1 }}
                        </template>
                        <template #cell(link)="row">
                            <a :href="row.item.link" target="_blank">{{ row.item.link }}</a>
                        </template>
                        <template #cell(description)="row">
                            {{ row.item.description || '--' }}
                        </template>
                    </b-table>
                    <FormCreationModal :show-modal="modalVisible" @update:show-modal="modalVisible = $event" @create-form="createForm" />
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import { BCard, BTable } from 'bootstrap-vue';
import FormCreationModal from './FormCreationModal.vue';
import axios from 'axios';

export default {
    name: "FormComponent",
    components: {
        BCard,
        BTable,
        FormCreationModal
    },
    data() {
        return {
            forms: [], // Your forms data from API response
            fields: [
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Name' },
                { key: 'description', label: 'Description' },
                { key: 'link', label: 'Link', sortable: false },
                { key: 'created_at', label: 'Created At' },
                { key: 'updated_at', label: 'Updated At' }
            ],
            modalVisible: false
        };
    },
    created() {
        // Fetch data from the API endpoint
        this.fetchForms();
    },
    methods: {
        async fetchForms() {
            try {
                const APP_URL = import.meta.env.VITE_BACKEND_URL;
                const response = await axios.get(`${APP_URL}/forms`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        dataType: "json"
                    }
                });
                this.forms = response.data.forms;
            } catch (error) {
                console.error('Error fetching forms:', error);
            }
        },
        openModal() {
            this.modalVisible = true;
        },
        async createForm(formData) {
            // Handle form creation logic for api
            try {
                const APP_URL = import.meta.env.VITE_BACKEND_URL;
                const response = await axios.post(`${APP_URL}/forms`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        dataType: "json"
                    },
                    data: formData
                });
                console.log(response);
            } catch(error) {
                console.error('Error fetching forms:', error);
            }
            this.modalVisible = false;
        }
    }
};
</script>
