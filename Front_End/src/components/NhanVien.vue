<template>
    <div>
        <h1>Nhan Vien</h1>
        <ul>
            <li v-for="nhanvien in nhanviens" :key="nhanvien._id">{{ nhanvien.name }}</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            nhanviens: []
        };
    },
    created() {
        axios.get('http://localhost:5000/api/nhanvien')
            .then(response => {
                this.nhanviens = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
};
</script>