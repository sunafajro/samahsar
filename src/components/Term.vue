<template>
    <div class="term">
        <div class="loading" v-if="loading">
            <div class="alert alert-warning">Идет загрузка...</div>
        </div>

        <div class="error" v-if="error">Ошибка Получения данных!</div>
        
        <nav id="pager-block" v-if="pager">
            <ul class="pager">
                <li class="previous" v-if="pager.prev.id"><a v-bind:href="'#/term/' + pager.prev.id"><span class="fa fa-arrow-left" aria-hidden="true"></span> {{ pager.prev.term }}</a></li>
                <li class="next" v-if="pager.next.id"><a v-bind:href="'#/term/' + pager.next.id">{{ pager.next.term }} <span class="fa fa-arrow-right" aria-hidden="true"></span></a></li>
            </ul>
        </nav>

        <div class="success" v-if="content">
            <div class="panel panel-default margin-bottom">
                <div class="panel-heading"><strong>{{ content.word_orig }}</strong> <small>[{{ content.volume }} : {{ content.fpage }}<span v-if="content.fpage !== content.lpage"> - {{ content.lpage }}</span>]</small>
                        <a class="btn btn-default btn-xs pull-right" data-toggle="modal" data-target="#infoModal" title="Сообщить об ошибке!"><span class="fa fa-exclamation-triangle text-danger" aria-hidden="true"></span></a>
                    </div>
                    <div class="panel-body text-justify" v-html="content.word_desc">
                        {{ content.word_desc }}                  
                    </div> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'term',
    data () { 
        return {
            loading: false,
            content: null,
            pager: null,
            error: null
        }
    },
    created () {
        this.fetchData()
    },
    /* отслеживаем изменение маршрута в пределах компонента */
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData () {
            this.error = this.content = null;
            this.loading = true;

            this.$http.get('https://samahsar.cv-haval.org/custom/view?id=' + this.$route.params.id).then(response => {
                this.loading = false;
                this.pager = {'next': response.body.pop(), 'prev': response.body.pop()};
                this.content = response.body.pop();
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