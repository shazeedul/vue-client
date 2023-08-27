<template>
    <div>
        <b-table :items="tableData" :fields="tableFields" bordered sticky-header :head-variant="dark" class="text-center">
            <template #head(userName)="data">
                <span class="fw-bold">{{ data.label.toUpperCase() }}</span>
            </template>
            <template v-for="question in questionData" :key="question.id" v-slot:[`head(${question.id})`]="data">
                <span class="fw-bold">{{ data.label.toUpperCase() }}</span>
            </template>
            <template v-slot:cell(userName)="row">
                {{ row.item.user_name }}
            </template>
            <template v-for="question in questionData" :key="question.id" v-slot:[`cell(${question.id})`]="row">
                {{ row.item.answers[question.id] }}
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    props: {
        feedbackResponses: Array, // Passed as a prop from parent component
        questionData: Array, // Passed as a prop from parent component
    },
    computed: {
        tableData() {
            return this.feedbackResponses.map(response => {
                return {
                    user_name: response.user_name,
                    answers: response.answers,
                };
            });
        },
        tableFields() {
            const fields = ['userName'];
            this.questionData.forEach(question => {
                fields.push({
                    key: question.id.toString(),
                    label: question.question,
                });
            });
            return fields;
        },
    },
};
</script>

