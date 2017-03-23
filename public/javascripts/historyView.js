$(function () {
    $('#history').click(function () {
        var url = '/history';
        var data = $.get(url);
        console.log(data);
    });
})