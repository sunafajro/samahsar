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
            <div class="content" v-if="content">
                <div class="panel panel-default margin-bottom" v-for="article in content">
                    <div class="panel-heading"><strong><a v-bind:href="'#/term/' + article.id">{{ article.word_orig }}</a></strong> <small>[{{ article.volume }} : {{ article.fpage }}<span v-if="article.fpage !== article.lpage"> - {{ article.lpage }}</span>]</small>
                        <a class="btn btn-default btn-xs pull-right" data-toggle="modal" data-target="#infoModal" title="Сообщить об ошибке!"><span class="fa fa-exclamation-triangle text-danger" aria-hidden="true"></span></a>
                    </div>
                    <div class="panel-body text-justify" v-html="article.word_desc">
                        {{ article.word_desc }}                  
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
