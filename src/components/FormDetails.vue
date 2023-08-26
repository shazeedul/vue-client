<template>
    <div class="container mt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6">
            <div class="card px-5 py-5" id="form1">
                <div v-if="formData">
                    <h1>Form Details</h1>
                    <p>Name: {{ formData.name }}</p>
                    <p>Description: {{ formData.description || '--' }}</p>

                    <h2>Questions:</h2>
                    <form @submit.prevent="submitAnswers">
                        <div v-for="question in formData.questions" :key="question.id">
                            <label>{{ question.question }}</label>
                            <input v-model="question.answer" type="text" />
                        </div>
                        <button type="submit">Submit Answers</button>
                    </form>
                </div>
                <div v-else>
                    Loading...
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            formData: null
        };
    },
    created() {
        const link = this.$route.params.link;
        const APP_URL = import.meta.env.VITE_BACKEND_URL;
        // fetch form details
        axios.get(`${APP_URL}/forms/${link}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log('form data:', response.data);
                this.formData = response.data.data;
            })
            .catch(error => {
                console.error('Error submitting answers:', error);
            });
    },
    methods: {
        submitAnswers() {
            const APP_URL = import.meta.env.VITE_BACKEND_URL;
            const answers = this.formData.questions.map(question => {
                return {
                    question_id: question.id,
                    answer: question.answer
                };
            });

            const formId = this.formData.id;
            axios.post(`${APP_URL}/forms/${formId}/submit`, { answers },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log('Answers submitted successfully:', response.data);
                })
                .catch(error => {
                    console.error('Error submitting answers:', error);
                });
        }
    }
};
</script>
