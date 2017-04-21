<template>
    <div class="search">
        <div id="result" class="margin-top">
            <div class="loading" v-if="loading">
                <div class="alert alert-warning">Идет загрузка...</div>
            </div>

            <div class="error" v-if="error">
                <div class="alert alert-warning">Ошибка Получения данных!</div>
            </div>

            <div class="error" v-if="notfound">
                    <div class="alert alert-warning">Не удалось найти статью в словаре!</div>
            </div>

            <div class="success" v-if="content">
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
    </div>
</template>

<script>
export default {
    name: 'search',
    data () { 
        return {
            loading: false,
            content: null,
            error: null,
            notfound: null,
        }
    },
    created () {
        this.fetchData();
    },
    /* отслеживаем изменение маршрута в пределах компонента */
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData () {
            this.error = this.content = this.notfound = null;
            this.loading = true;
            var newterm = this.$route.params.term;
            $('#search-field').val(newterm);
            this.$http.get('https://samahsar.cv-haval.org/custom/search?term=' + newterm).then(response => {
                this.loading = false;
                if(!$.isEmptyObject(response.body)) {    
                    this.content = response.body;
                } else {
                    this.notfound = true;
                }
            }, response => {
                this.loading = false;
                this.error = true;
            });
        }
    }
}
</script>

<style scoped>

    .margin-top {
        margin-top: 1rem;
    }

</style>