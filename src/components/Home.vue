<template>
    <div class="home">
        <div id="result" class="margin-top" v-cloak>
            <div class="loading" v-if="loading">
                <div class="alert alert-warning">Идет загрузка...</div>
            </div>

            <div class="error" v-if="error">
                <div class="alert alert-danger">Ошибка Получения данных!</div>
            </div>
            
            <div class="randomterms" v-if="randomterms">

            </div>
        </div>    
    </div> <!-- home -->
</template>

<script>

export default {
    name: 'home',
    data () { 
        return {
            randomterms: null,
            loading: null,
            content: null,
            notfound: null,
            error: null
        }
    },
    created () {
        this.fetchRandomTerms();        
    },
    updated () {
        $('[data-toggle="tooltip"]').tooltip();
    },
    watch: {
        '$route': 'fetchAll'
    },
    methods: {
        /* запрос случайных 9 терминов  */ 
        fetchRandomTerms () {

        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .margin-top {
        margin-top: 1rem;
    }

</style>
