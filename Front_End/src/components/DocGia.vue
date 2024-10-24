<template>
  <div>
    <h1>Doc Gia</h1>
    <ul>
      <li v-for="docgia in docgias" :key="docgia._id">{{ docgia.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      docgias: []
    };
  },
  created() {
    axios.get('http://localhost:5000/api/docgia')
      .then(response => {
        this.docgias = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>