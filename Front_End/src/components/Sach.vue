<template>
    <div>
        <h1>Sach</h1>
        <ul>
            <li v-for="sach in sachs" :key="sach._id">{{ sach.title }}</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            sachs: []
        };
    },
    created() {
        axios.get('http://localhost:5000/api/sach')
            .then(response => {
                this.sachs = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
};
</script>