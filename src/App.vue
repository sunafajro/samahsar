<template>
    <div id="app">
        <nav class="navbar navbar-default navbar-fixed-top">    
            <div class="container">            
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu-block" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="#/" class="navbar-brand">
                        <span class="first">{{ $lang.messages.n_i_ashmarin }}</span><span class="second"> * </span><span class="third">{{ $lang.messages.chuvash_dictionary }}</span>
                    </a>
                </div>
                <div class="collapse navbar-collapse" id="menu-block">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ $lang.getLang() }}</span></a>
                            <ul class="dropdown-menu">
                                <li v-if="$lang.getLang() != 'cv'" v-on:click="toggleLang('cv')"><a>cv</a></li>
                                <li v-if="$lang.getLang() != 'ru'" v-on:click="toggleLang('ru')"><a>ru</a></li>
                                <li v-if="$lang.getLang() != 'eo'" v-on:click="toggleLang('eo')"><a>eo</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{$lang.messages.menu}}</a>
                            <ul class="dropdown-menu">
                                <li><router-link to="/about">{{$lang.messages.about}}</router-link></li>
                                <li><router-link to="/helpus">{{$lang.messages.for_helpers}}</router-link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            <div id="search" class="input-group" v-if="search">
                <span class="input-group-btn">
                    <button id="erase-btn" class="btn btn-warning btn-lg" type="button" v-on:click="eraseTerm"><span class="fa fa-eraser" aria-hidden="true"></span></button>
                </span>
                <input id="search-field" class="form-control input-lg" type="text" name="term" v-bind:placeholder="$lang.messages.search_word" v-on:keyup.enter="searchTerm">
                <span class="input-group-btn">
                    <button id="search-btn" class="btn btn-info btn-lg" type="button" v-on:click="searchTerm"><span class="fa fa-search" aria-hidden="true"></span></button>
                </span>
            </div>

            <div class="row">
                <div id="sidebar-btn" class="col-sm-4">
                    <div class="dropdown" v-if="lastterms.length > 0">
                        <button class="btn btn-primary btn-xs dropdown-toggle btn-history" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            {{ $lang.messages.history }}
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
                    <span class="third-part">{{ $lang.messages.articles_on_site }}: <label class="label label-default" v-if="counter">{{ counter.count }}</label></span>
                </div>
            </div>
            <router-view></router-view>
        </div>
        <div class="footer">
            <div class="container">
                <p class="text-muted">© {{ $lang.messages.haval_org }}, 2017</p>
            </div>
        </div>
    </div>
</template>

<script>

var term;
var newterm;

export default {
    name: 'app',
    data () { 
        return {
            search: true,
            buttons: ['ӑ', 'ӗ', 'љ', 'њ', 'р̌', 'ҫ', 'т̌', 'ӳ', 'ђ'],
            counter: {'count': 0},
            lastterms: null
        }
    },
    created () {
        /* считываем модержимое строки поиска */
        term = $('#search-field').val();
        this.fetchAll();
    },
    methods: {
        fetchAll () {
            this.fetchCounter();
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
        /* поиск темина в базе */
        searchTerm () {
            newterm = $('#search-field').val();
            if(newterm && newterm !== term) {
                this.updateCookies(newterm);
                this.$router.push({ name: 'search', params: { term: newterm }});
            }            
        },
        /* очистка результатов */
        eraseTerm () {
            term = $('#search-field').val('');
            this.$router.push({ path: '/' });
            this.fetchLastTerms();
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
                /* обновляем куки и список последних терминов */
                this.$cookies.set('lastterms', cookie, 60*60*24, '/');
                this.lastterms = cookie.split(':');
        },
        /* переключение языка сайта */
        toggleLang (lang) {
            if(this.$lang.getLang() !== lang) {
              this.$lang.setLang(lang);
              this.$cookies.set('lang', lang, 60*60*24, '/');
            }
        }
    }
}
</script>

<style>

    #app {
      margin-top: 1rem;
    }

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

    @media (max-width: 400px) {
        .navbar-header .third {
            display:none;
        }
    }

    @media (min-width: 400px) and (max-width: 767px) {
        .navbar-header .first {
            display:none;
        }
    }

    @media (max-width: 767px) {
        .navbar-header .second {
            display:none;
        }
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
