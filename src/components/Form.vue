<template>
    <div class="container-fluid mt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-md-12">
                <b-card>
                    <div class="text-end">
                        <b-button @click="openModal">Add</b-button>
                    </div>
                    <b-table striped hover :items="forms" :fields="fields" class="text-center">
                        <template #cell(id)="row">
                            {{ row.index + 1 }}
                        </template>
                        <template #cell(description)="row">
                            {{ row.item.description || '--' }}
                        </template>
                        <template #cell(actions)="row">
                            <router-link :to="{ name: 'formCollection', params: { link: row.item.link } }"><b-button size="sm" variant="primary" class="mx-2">Collections</b-button></router-link>
                            <b-button size="sm" variant="danger" class="mx-2" @click="deleteForm(row.item.id)">Delete</b-button>
                            <b-button size="sm" variant="warning" class="mx-2" @click="copyLink(row.item.link)">Copy Link</b-button>
                        </template>
                    </b-table>
                    <FormCreationModal 
                        :show-modal="modalVisible"
                        @update:show-modal="modalVisible = $event"
                        @create-form="createForm"
                    />
                    <FormUpdatingModal
                        :show-modal="editModalVisible"
                        @update:show-modal="editModalVisible = $event"
                        :edit-form-data="updateForm"
                    />
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import { BCard, BTable } from 'bootstrap-vue';
import FormCreationModal from './FormCreationModal.vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
    name: "FormComponent",
    components: {
        BCard,
        BTable,
        FormCreationModal,
        RouterLink,
    },
    data() {
        return {
            forms: [],
            fields: [
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Name' },
                { key: 'description', label: 'Description' },
                { key: 'link', label: 'Link', sortable: false },
                { key: 'created_at', label: 'Created At' },
                { key: 'updated_at', label: 'Updated At' },
                { key: 'actions', label: 'Actions', sortable: false }
            ],
            modalVisible: false,
        };
    },
    created() {
        this.fetchForms();
    },
    methods: {
        async fetchForms() {
            const APP_URL = import.meta.env.VITE_BACKEND_URL;
            await axios.get(`${APP_URL}/forms`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    this.forms = response.data.forms;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        openModal() {
            this.modalVisible = true;
        },
        createForm(formData) {
            const APP_URL = import.meta.env.VITE_BACKEND_URL;
            axios.post(`${APP_URL}/forms`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    alert('form data: '+response.data.message);
                    this.modalVisible = false;
                    this.fetchForms();
                })
                .catch(error => {
                    console.error('Error submitting questions:', error);
                });
        },
        deleteForm(id) {
            const APP_URL = import.meta.env.VITE_BACKEND_URL;
            axios.delete(`${APP_URL}/forms/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    alert('form data: '+response.data.message);
                    this.fetchForms();
                })
                .catch(error => {
                    console.error('Error submitting questions:', error);
                });
        },
        copyLink(link) {
            const valueToCopy = `${window.location.origin}/feedback/${link}`;
            navigator.clipboard.writeText(valueToCopy)
                .then(() => {
                    alert('Value copied to clipboard: ' + valueToCopy);
                })
                .catch(error => {
                    console.error('Copy to clipboard failed:', error);
                });
        }
    }
};
</script>
