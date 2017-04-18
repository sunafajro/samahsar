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
            <div id="sidebar-btn" class="col-sm-4">
                <div class="dropdown" v-if="lastterms.length > 0">
                    <button class="btn btn-primary btn-xs dropdown-toggle btn-history" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        История
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li v-for="lastterm in lastterms"><a v-bind:href="'#/search/' + lastterm">{{ lastterm }}</a></li>
                      </ul>
                </div>
            </div>
            <div id="buttons" class="col-sm-4 button-block text-center">
                <button type="button" class="btn btn-default btn-xs btn-chuv" v-for="button in buttons" v-on:click="pressButton" v-if="buttons">{{ button }}</button>
            </div>
            <div id="wcounter" class="col-sm-4 wcounter text-right">
                <span class="third-part">Сайтри <em>статья</em> шучӗ: <label class="label label-default" v-if="counter">{{ counter.count }}</label></span>
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

/* считываем модержимое строки поиска */
var term = $('#search-field').val();

export default {
    name: 'home',
    data () { 
        return {
            search: true,
            buttons: ['ӑ', 'ӗ', 'љ', 'њ', 'р̌', 'ҫ', 'т̌', 'ӳ', 'ђ'],
            counter: {'count': 0},
            randomterms: null,
            lastterms: null,
            loading: null,
            content: null,
            notfound: null,
            error: null
        }
    },
    created () {
        this.fetchAll();        
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
            this.fetchRandomTerms();
            this.fetchLastTerms();
        },
        /* запрос данных по количеству статей */
        fetchCounter () {
            this.$http.get('https://samahsar.cv-haval.org/custom/count').then(response => {
                this.counter = response.body;

            }, response => {
                this.counter = '!';
            });
        },
        /* запрос последних терминов из кук */
        fetchLastTerms () {
            this.lastterms = this.$cookies.get('lastterms') ? this.$cookies.get('lastterms').split(':') : [];
        },
        /* запрос случайных 9 терминов  */ 
        fetchRandomTerms () {

        },
        /* очистка результатов */
        eraseTerm () {
            term = $('#search-field').val('');
            this.error = this.content = this.loading = this.notfound = null;
            this.fetchLast();
        },
        /* поиск темина в базе */
        searchTerm () {
            var newterm = $('#search-field').val();
            if(newterm && newterm !== term) {
                this.error = this.content = this.notfound = null;
                this.loading = true;

                this.$http.get('https://samahsar.cv-haval.org/custom/search?term=' + newterm).then(response => {
                    this.loading = false;
                    if(!$.isEmptyObject(response.body)) {    
                        this.content = response.body;
                        this.updateCookies(newterm);
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
        /* подстановка чувашских символов */
        pressButton (event) {
            var result = $('#search-field').val() + event.target.innerText;
            $('#search-field').val(result);
        },
        /* обновление списка терминов в куке */
        updateCookies (newterm) {
                var cookie = this.$cookies.get('lastterms');
                var arr;
                if( cookie !== null ) {
                    cookie = cookie + ':';
                    cookie = cookie + newterm;
                    /* оставляем только 10 последних уникальных терминов */
                    arr = cookie.split(':');
                    $.uniqueSort(arr);
                    arr = arr.slice(-10);
                    cookie = arr.join(':');
                } else {
                    cookie = newterm;
                }
                console.log(cookie);
                /* обновляем куки и список последних терминов */
                this.$cookies.set('lastterms', cookie, 60*60*24, '/');
                this.lastterms = cookie.split(':');
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

    .btn-history {
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

    .sidebar {
        position: absolute;
        top: 20%;
    }

    @media (max-width: 767px) {
        .third-part {
            display:none;
        }
        .button-block {
            text-align: center;
        }
    }


</style>
