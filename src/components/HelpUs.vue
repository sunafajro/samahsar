<template>
    <div class="helpus">
        <div class="loading" v-if="loading">
            <div class="alert alert-warning">Идет загрузка...</div>
        </div>

        <div class="error" v-if="error">Ошибка Получения данных!</div>

        <div class="success" v-if="page">
            <h3>{{ page.title }}</h3>
            <div class="body" v-html="page.content">{{ page.content }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'helpus',
    data () { 
        return {
            loading: false,
            page: null,
            error: null
        }
    },
    created () {
        this.fetchData()
    },
    /*
    watch: {
        '$route': 'fetchData',
        '$lang.current_lang': function () {
            this.$forceUpdate();
        }
    },
    */
    methods: {
        fetchData () {
            this.error = this.page = null;
            this.loading = true;

            this.$http.get('https://samahsar.cv-haval.org/custom/info?type=helpus').then(response => {
                this.loading = false;
                this.page = response.body;

            }, response => {
                this.loading = false;
                this.error = true;
            });
        }
    }
}
</script>

<style scoped>

</style>