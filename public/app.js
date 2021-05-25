$(document).ready(function(){
    console.log('You can do this!!');

    const $searchText = $('#searchBox');
    const $searchButton = $('#searchButton');
    const $subjectBox = $('.subjectBox');
    const $postText = $('.postText');
    const $postButton =  $('.post');
    const $resultsContainer = $('.results')

    function getText($var) {
        let result = $var.val();
        return result;
    }
    $.get('http://localhost:3000/api/posts', (data) => {
            for (let index of data) {
                console.log(typeof index.date)
                let $divHeader = $(`<div class='header'>Date: ${index.date.slice(0,16)} Subject: ${index.subject}</div>`)
                let $divPost = $(`<div class='resultPost'>${index.posts}</div>`);
                $divHeader.appendTo($resultsContainer);
                $divPost.appendTo($resultsContainer);
            }
    })

    $searchButton.on('click', () => {
        let result = getText($searchText);
        console.log(result);
        return result;
    });
    $postButton.on('click', () => {
        let result = {subject: $subjectBox.val(), posts: $postText.val()};
        console.log(result);
        return result;
    })
})