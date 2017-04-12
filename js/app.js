/* сообщение при загрузке страницы и при пустом ответе от сервера */
var empty_response = [{ 'word_orig': 'Пусто!', 'word_desc': 'Наберите строку для поиска.' }];
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
                if(newterm && newterm != term) {
                    $.ajax({
                        method: 'GET', 
                        data: 'term=' + newterm, 
                        url: 'http://samahsar.cv-haval.org/custom/search', 
                        success: function(data) {
                            if(!$.isEmptyObject(data)) {
                                result.articles = data;
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