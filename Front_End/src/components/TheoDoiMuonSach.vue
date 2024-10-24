<template>
    <div>
        <h1>Theo Doi Muon Sach</h1>
        <ul>
            <li v-for="theodoimuonsach in theodoimuonsachs" :key="theodoimuonsach._id">{{ theodoimuonsach.title }}</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            theodoimuonsachs: []
        };
    },
    created() {
        axios.get('http://localhost:5000/api/theodoimuonsach')
            .then(response => {
                this.theodoimuonsachs = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
};
</script>