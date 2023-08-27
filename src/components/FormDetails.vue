<template>
    <div class="container mt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6">
            <div class="card px-5 py-5" id="form1">
                <div v-if="formData">
                    <h1>Form Details</h1>
                    <p>Name: {{ formData.name }}</p>
                    <p>Description: {{ formData.description || '--' }}</p>
                    <b-form @submit.prevent="submitAnswers">
                        <div v-for="question in formData.questions" :key="question.id">
                            <b-form-group class="mb-4">
                                <b-form-label for="input-1">{{ question.question }}</b-form-label>
                                <b-form-input
                                    id="input-1"
                                    v-model="question.answer"
                                    type="text"
                                    placeholder="Enter your answer"
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <b-button type="submit" variant="primary">Submit</b-button>
                    </b-form>
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
import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue';


export default {
    data() {
        return {
            formData: null,
        };
    },
    components: {
        BForm,
        BFormGroup,
        BFormInput,
        BButton,
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
                axios.get(`${APP_URL}/forms/${link}/answers`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        console.log('answers:', response.data);
                        this.formData.questions.forEach(question => {
                            const answer = response.data.data.find(answer => answer.feedback_question_id === question.id);
                            if (answer) {
                                question.answer = answer.answer;
                            }
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching answers:', error);
                    });
            })
            .catch(error => {
                console.error('Error submitting answers:', error);
            });
    },
    methods: {
        async submitAnswers() {
            const APP_URL = import.meta.env.VITE_BACKEND_URL;
            const answers = this.formData.questions.map(question => {
                return {
                    question_id: question.id,
                    answer: question.answer
                };
            });

            const formId = this.formData.id;
            await axios.post(`${APP_URL}/forms/${formId}/submit`,
               JSON.stringify(answers),
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then(response => {
                    console.log('Answers submitted successfully:', response.data);
                    alert('Answers submitted successfully');
                    this.$router.push('/');
                })
                .catch(error => {
                    console.error('Error submitting answers:', error);
                });
        }
    }
};
</script>
