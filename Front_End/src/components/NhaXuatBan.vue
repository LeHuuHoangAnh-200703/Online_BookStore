<template>
    <div>
        <h1>Nha Xuat Ban</h1>
        <ul>
            <li v-for="nhaxuatban in nhaxuatbans" :key="nhaxuatban._id">{{ nhaxuatban.name }}</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            nhaxuatbans: []
        };
    },
    created() {
        axios.get('http://localhost:5000/api/nhaxuatban')
            .then(response => {
                this.nhaxuatbans = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
};
</script>