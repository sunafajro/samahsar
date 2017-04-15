/* проверяем что страничка запущена с сервера инче куки нам не понадобятся */
if(window.location.protocol == 'http:' || window.location.protocol == 'https:') {
    /* проверяем что кука задана */
    if($.cookie('lastterms') === undefined) {
        /* создаем пустую куку для хранения терминов */
        $.cookie('lastterms', '', { expires: 1, path: '/' });
    }
    /* дробим куку в массив для блока недавних терминов */
    var cookie = $.cookie('lastterms') !== '' ? $.cookie('lastterms').split(':') : [];

} else {
    var cookie = [];
}
/* проверяем что страничка запущена с сервера инче куки нам не понадобятся */

/* сообщения при загрузке страницы и при пустом ответе от сервера */
var empty_response = [{ 'title': 'Пусто!', 'body': 'Наберите слово которое хотите найти!', 'empty' : 'true' }];
var not_found = [{ 'title': 'Пусто!', 'body': 'К сожалению ничего найти не удалось!', 'empty' : 'true' }];
var pages_empty = [{'empty' : 'true'}];
/* считываем модержимое строки поиска */
var term = $('#search-field').val();

/* блок с поисковой строкой  */
var search = new Vue({
    el: '#search-block',
    data: '',
    methods: {
        searchterm:
            function() {
                var newterm = $('#search-field').val();
                if(newterm && newterm !== term) {
                    $.ajax({
                        method: 'GET', 
                        data: 'term=' + newterm, 
                        url: 'https://samahsar.cv-haval.org/custom/search', 
                        success: function(data) {
                            if(!$.isEmptyObject(data)) {
                                result.articles = data;
                                var cookie = $.cookie('lastterms');
                                if(cookie != '') {
                                    cookie = cookie + ':';
                                }
                                cookie = cookie + newterm;
                                /* оставляем только 10 последних уникальных терминов */
                                arr = cookie.split(':');
                                $.uniqueSort(arr);
                                arr = arr.slice(-10);
                                cookie = arr.join(':');
                                /* обновляем куки и список последних терминов */
                                $.cookie('lastterms', cookie, { expires: 1, path: '/' });
                                lastterms.terms = cookie.split(':');
                            } else {
                                result.articles = not_found;
                            }                            
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                    term = newterm;
                }
                /* $('[data-toggle="tooltip"]').tooltip(); */
            },
        eraseterm: 
            function(){        
                term = $('#search-field').val('');
                result.articles = empty_response;
            },
        getarticle:
            function(id) {
                $.ajax({
                    method: 'GET', 
                    data: 'id=' + id, 
                    url: 'https://samahsar.cv-haval.org/custom/view', 
                    success: function(data) {

                        if(!$.isEmptyObject(data)) {
                            term = $('#search-field').val(data.word_orig);
                            result.articles = [data];
                        } else {
                            result.articles = not_found;
                        } 
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            }
    }    
});
/* блок с поисковой строкой  */

/* блок с результатами поиска */
var result = new Vue({
    el: '#result-block',
    data: {
        articles: empty_response
    },
    updated:
    function() {
        $(function() {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="link"]').click(
                function() {
                    search.getarticle($(this).attr('data-item'));
                }
            );
            $('[data-toggle="term"]').click(
                function() {
                    search.searchterm($(this).attr('data-item'));
                }
            );
        });
    }
});
/* блок с результатами поиска */

/* блок с чувашскими буквами */
var buttons = new Vue({
    el: '#chuvkeys-block',
    data: {
        buttons: ['ӑ', 'ӗ', 'љ', 'њ', 'р̌', 'ҫ', 'т̌', 'ӳ', 'ђ']
    },
    methods: {
        addletter: function (event) {
            var result = $('#search-field').val() + event.target.innerText;
            $('#search-field').val(result);            
        }
    }
});
/* блок с чувашскими буквами */

/* блок со списком последних найденных терминов */
var lastterms = new Vue({
    el: '#lastterms-block',
    data: {
        terms: cookie,
        toggle: false
    },
    /* здесь мы реинициализируем отлеживание кликов по ссылкам последних терминов */
    updated:
        function() {
            $(function() {
                $('[data-toggle="term"]').click(
                    function() {
                        $('#search-field').val($(this).attr('data-item'));               
                        search.searchterm();
                    }
                );
            });
        }
});
/* блок со списком последних найденных терминов */

/* блок с чувашскими буквами */
var pager = new Vue({
    el: '#pages-block',
    data: {
        pages: pages_empty
    }
});
/* блок с чувашскими буквами */