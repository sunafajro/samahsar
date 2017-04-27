<template>
    <div class="home">
        <button v-on:click="someAction">Тест</button>
        <h4>{{ $lang.messages.last_added_articles }}:</h4>
        <div id="result" class="margin-top">
            <div class="loading" v-if="loading">
                <div class="alert alert-warning">Идет загрузка...</div>
            </div>

            <div class="error" v-if="error">
                <div class="alert alert-danger">Ошибка Получения данных!</div>
            </div>
            
            <div class="lastterms" v-if="lastterms">
                <div class="row" v-for="rows in lastterms" v-if="lastterms.length > 0">
                    <div class="col-sm-4" v-for="item in rows">
                        <div class="panel panel-default">
                            <div class="panel-body" v-html="item.word_desc">
                                {{ item.word_desc }}                  
                            </div> 
                            <div class="panel-footer"><small>[{{ item.volume }} : {{ item.fpage }}<span v-if="item.fpage !== item.lpage"> - {{ item.lpage }}</span>]</small></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div> <!-- home -->
</template>

<script>

export default {
    name: 'home',
    data () { 
        return {
            lastterms: null,
            loading: null,
            notfound: null,
            error: null
        }
    },
    created () {
        this.fetchLastTerms();
        console.log(this.$router);
    },
    updated () {
        $('[data-toggle="tooltip"]').tooltip();
    },
    watch: {
        '$route': 'fetchLastTerms',
        '$lang.current_lang': function () {
            this.$forceUpdate();
        }
    },
    methods: {
        /* запрос случайных 9 терминов  */ 
        fetchLastTerms () {
            this.error = this.randomterms = null;
            this.loading = true;

            this.$http.get('https://samahsar.cv-haval.org/custom/lastterms').then(response => {
                this.loading = false;
                this.lastterms = response.body;
            }, response => {
                this.loading = false;
                this.error = true;
            });
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .margin-top {
        margin-top: 1rem;
    }
    .panel .panel-body {
        min-height: 100px;
    }

</style>
