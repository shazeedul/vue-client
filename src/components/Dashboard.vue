<template>
    <div class="container-fluid mt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-md-12">
                <h1>Dashboard</h1>
                <p v-if="userLoaded && user">Welcome, {{ user.name }}</p>
                <p v-else>Loading user data...</p>
                <b-card>
                    <b-table striped hover :items="forms" :fields="fields" class="text-center">
                        <template #cell(id)="row">
                            {{ row.index + 1 }}
                        </template>
                        <template #cell(link)="row">
                            <router-link :to="{ name: 'formDetails', params: { link: row.item.link } }" target="_blank">
                                {{ row.item.link }}
                            </router-link>
                        </template>
                        <template #cell(description)="row">
                            {{ row.item.description || '--' }}
                        </template>
                    </b-table>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { BCard, BTable } from 'bootstrap-vue';
import { mapActions } from "vuex";

export default {
    name: "Dashboard-Component",
    components: {
        BCard,
        BTable
    },
    data() {
        return {
            user: null,
            userLoaded: false,
            forms: [], // Your forms data from API response
            fields: [
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Name' },
                { key: 'description', label: 'Description' },
                { key: 'link', label: 'Link', sortable: false },
                { key: 'created_at', label: 'Created At' },
                { key: 'updated_at', label: 'Updated At' }
            ],
        };
    },
    methods: {
        ...mapActions(['performLogout']),
        async fetchForms() {
            const APP_URL = import.meta.env.VITE_BACKEND_URL;
            await axios.get(`${APP_URL}/forms/all`, {
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
    },
    async created() {
        try {
            const APP_URL = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.get(`${APP_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    dataType: "json"
                }
            });
            this.user = response.data.user; // Assuming the user data is in the response's data property
            this.userLoaded = true;
        } catch (error) {
            // if token invalid then
            this.performLogout();
        }
        this.fetchForms();
    }
};
</script>