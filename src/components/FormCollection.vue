<template>
    <div class="container-fluid mt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-md-12">
                <div class="card px-5 py-5" id="form1">
                    <div v-if="formInfo">
                        <h1 class="text-center">Form Details</h1>
                        <div class="row">
                            <div class="col">
                                <p>Name: {{ formInfo.name }}</p>
                                <p>Description: {{ formInfo.description || '--' }}</p>
                                <p>Creator: {{ formInfo.creator_name }}</p>
                            </div>
                            <div class="col text-end">
                                <p>Response Count: {{ formInfo.responses_count }}</p>
                                <p>Question Count: {{ formInfo.questions_count }}</p>
                                <p>Created At: {{ formInfo.created_at }}</p>
                            </div>
                        </div>
                        
                    </div>
                    <div v-else>
                        Loading...
                    </div>
                    <FormResponseTableVue :feedbackResponses="feedbackResponses" :questionData="questionData"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import FormResponseTableVue from './FormResponseTable.vue';

export default {
    name: "FormCollectionComponent",
    components: {
        FormResponseTableVue
    },
    data() {
        return {
            feedbackResponses: [],
            questionData: [],
            formInfo: [],
        };
    },
    created() {
        const APP_URL = import.meta.env.VITE_BACKEND_URL;
        const link = this.$route.params.link;
        axios.get(`${APP_URL}/form/${link}/responses`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                this.feedbackResponses = response.data.tableData;
                this.questionData = response.data.questionData;
                this.formInfo = response.data.formInfo;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
    methods: {
            
    }
}
</script>