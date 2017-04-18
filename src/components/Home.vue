<template>
    <div class="home">
        <div id="search" class="input-group" v-if="search">
            <span class="input-group-btn">
                <button id="erase-btn" class="btn btn-warning btn-lg" type="button" v-on:click="eraseTerm"><span class="fa fa-eraser" aria-hidden="true"></span></button>
            </span>
            <input id="search-field" class="form-control input-lg" type="text" name="term" placeholder="Искать слово..." v-on:keyup.enter="searchTerm">
            <span class="input-group-btn">
                <button id="search-btn" class="btn btn-info btn-lg" type="button" v-on:click="searchTerm"><span class="fa fa-search" aria-hidden="true"></span></button>
            </span>
        </div>

        <div class="row">
            <div id="buttons" class="col-sm-4 col-sm-offset-4 button-block text-center">
                <button type="button" class="btn btn-default btn-xs btn-chuv" v-for="button in buttons" v-on:click="pressButton" v-if="buttons">{{ button }}</button>
            </div>
            <div id="wcounter" class="col-sm-4 wcounter text-right">
                <span class="second-part">Сайтри <em>статья</em> шучӗ: <label class="label label-default" v-if="counter">{{ counter.count }}</label></span>
            </div>
        </div>

        <div id="result" class="margin-top" v-cloak>
            <div class="loading" v-if="loading">
                <div class="alert alert-warning">Идет загрузка...</div>
            </div>

            <div class="error" v-if="error">
                <div class="alert alert-danger">Ошибка Получения данных!</div>
            </div>

            <div class="error" v-if="notfound">
                <div class="alert alert-warning">Не удалось найти статью в словаре!</div>
            </div>
            
            <div class="lastTen" v-if="lastten">

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
    </div>
</template>

<script>

/* считываем модержимое строки поиска */
var term = $('#search-field').val();

export default {
    name: 'home',
    data () { 
        return {
            search: true,
            buttons: ['ӑ', 'ӗ', 'љ', 'њ', 'р̌', 'ҫ', 'т̌', 'ӳ', 'ђ'],
            counter: {'count': 0},
            lastten: null,
            loading: null,
            content: null,
            notfound: null,
            error: null
        }
    },
    created () {
        this.fetchAll()
    },
    updated () {
        $('[data-toggle="tooltip"]').tooltip();
    },
    watch: {
        '$route': 'fetchAll'
    },
    methods: {
        fetchAll () {
            this.fetchCounter();
            this.fetchLast();
        },

        fetchCounter () {
            this.$http.get('https://samahsar.cv-haval.org/custom/count').then(response => {
                this.counter = response.body;

            }, response => {
                this.counter = '!';
            });
        },

        fetchLast () {

        },

        eraseTerm () {
            term = $('#search-field').val('');
            this.error = this.content = this.loading = this.notfound = null;
            this.fetchLast();
        },

        searchTerm () {
            var newterm = $('#search-field').val();
            if(newterm && newterm !== term) {
                this.error = this.content = this.notfound = null;
                this.loading = true;

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
                term = newterm;
            }
        },

        pressButton (event) {
            var result = $('#search-field').val() + event.target.innerText;
            $('#search-field').val(result);
        },
        updateCookies () {

        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wcounter {
        margin-top: 0.5rem;
    }

    .button-block {
        margin-top: 0.5rem;
    }

    .button-block .btn-chuv {
        margin-right: 0.2rem;
    }

    .button-block .btn-chuv:last-child {
        margin-right: 0;
    }
    .margin-top {
        margin-top: 1rem;
    }
</style>
