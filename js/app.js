/* сообщение при загрузке страницы и при пустом ответе от сервера */
var empty_response = [{ 'word_orig': 'Пусто!', 'word_desc': 'Наберите строку для поиска.' }];
/* ajax запрос */
$('#search-btn').click(
    function() {
        var term = $('#search-field').val();
        if(term) {
            $.ajax({
                method: 'GET', 
                data: 'term=' + term, 
                url: 'http://samahsar.cv-haval.org/custom/search', 
                success: function(data) {
                    if(!$.isEmptyObject(data)) {
                        app.articles = data;
                    } else {
                        app.articles = empty_response;
                    }                            
                    console.log(data);
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    }
);
/* ajax запрос */

/* vue приложение */
var app = new Vue({
    el: '#app',
    data: {
        articles: empty_response
    }
});
/* vue приложение */

/* vue приложение */
var buttons = new Vue({
    el: '#chuvkeys',
    data: {
        buttons: ['ӑ', 'ӗ', 'љ', 'њ', 'р̌', 'ҫ', 'т̌', 'ӳ', 'ђ']
    }
});
/* vue приложение */

/* кнопки с чувашскими символами */
$('#chuvkeys').on( 'click', 'button', function(){
    var result = $('#search-field').val() + $(this).text();
    $('#search-field').val(result);
});
/* кнопки с чувашскими символами */