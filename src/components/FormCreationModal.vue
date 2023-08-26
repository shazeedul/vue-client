<template>
    <b-modal :visible="showModal" @close="closeModal" title="Create Feedback Form" no-close-on-backdrop hide-footer size="lg">
        <div>
            <b-form @submit.prevent="submitForm">
                <b-form-group label="Name" label-for="name" class="my-2">
                    <b-form-input id="name" v-model="form.name" required></b-form-input>
                </b-form-group>
                <b-form-group label="Description" label-for="description" class="my-2">
                    <b-form-input id="description" v-model="form.description"></b-form-input>
                </b-form-group>
                <b-form-group v-for="(question, index) in form.questions" :key="index" class="my-2">
                    <b-form-input v-model="question.question" placeholder="Question"></b-form-input>
                    <b-button @click="removeQuestion(index)" variant="danger">Delete</b-button>
                </b-form-group>
                <div class="text-end mt-3">
                    <b-button @click="addQuestion" class="mx-2">More Questions</b-button>
                    <b-button type="submit">Create Form</b-button>
                </div>
            </b-form>
        </div>
    </b-modal>
</template>

<script>
export default {
    props: ['showModal'],
    data() {
        return {
            form: {
                name: '',
                description: '',
                questions: [{ question: '' }]
            }
        };
    },
    methods: {
        addQuestion() {
            this.form.questions.push({ question: '' });
        },
        submitForm(event) {
            event.preventDefault();
            // Emit an event to parent component with the form data
            this.$emit('create-form', this.form);
            this.closeModal();
            this.formReset();
        },
        closeModal() {
            this.$emit('update:showModal', false);
            this.formReset();
        },
        formReset() {
            this.form = {
                name: '',
                description: '',
                questions: [{ question: '' }]
            };
        },
        removeQuestion(i) {
            // never remove last question field
            if (this.form.questions.length > 1) {
                this.form.questions.splice(i, 1);
            } else {
                alert("At least one question required.");
            }
        }
    }
};
</script>
