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

/* сообщение при загрузке страницы и при пустом ответе от сервера */
var empty_response = [{ 'title': 'Пусто!', 'body': 'Наберите строку для поиска.', 'empty' : 'true' }];
/* считываем модержимое строки поиска */
var term = $('#search-field').val();

/* блок с поисковой строкой  */
var search = new Vue({
    el: '#search-block',
    data: '',
    methods: {
        search:
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
                                $.cookie('lastterms', cookie, { expires: 1, path: '/' });
                                lastterms.terms = cookie.split(':');
                            } else {
                                result.articles = empty_response;
                            }                            
                            console.log(data);
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                    term = newterm;
                }
                $('[data-toggle="tooltip"]').tooltip();
            },
        erase: 
            function(){        
                term = $('#search-field').val('');
                result.articles = empty_response;
            }
    }    
});
/* блок с поисковой строкой  */

/* блок с результатами поиска */
var result = new Vue({
    el: '#result-block',
    data: {
        articles: empty_response
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
            console.log(event);
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
        terms: cookie
    }
});
/* блок со списком последних найденных терминов */