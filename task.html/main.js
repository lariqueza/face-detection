import Vue from 'vue'

window.axios = require('axios');

new Vue({
    el: '#app',

    components: {

    },

    mounted: function () {
       axios.get('https://70c5b72c-65db-4a66-ba01-3e14763157e8.mock.pstmn.io/posts')
           .then(response => this.posts = response.data)
           .catch(error => this.posts = [{title: 'No posts found'}])
           .finally(() => console.log('Data loading complete'));
    },
    data: {
        posts: null,
    }
});