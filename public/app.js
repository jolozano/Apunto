$(document).ready(function(){
    console.log('You can do this!!');

    const $searchText = $('#searchBox');
    const $searchButton = $('#searchButton');
    const $subjectBox = $('.subjectBox');
    const $postText = $('.postText');
    const $postButton =  $('.post');
    const $resultsContainer = $('.results')
    const $searchResults = $('#searchResults')

    function getText($var) {
        let result = $var.val();
        return result;
    }
    $.get('/api/posts', (data) => {
            for (let index of data) {
                let $divHeader = $(`<div class='header'>Date: ${index.date.slice(0,16)} Subject: ${index.subject}</div>`)
                let $divPost = $(`<div class='resultPost'>${index.post}</div>`);
                $divHeader.appendTo($resultsContainer);
                $divPost.appendTo($resultsContainer);
            }
    })

    $postButton.on('click', () => {
        let post = {subject: $subjectBox.val(), post: $postText.val()};
        console.log(post);
        $.post(
            {
                url: '/api/posts',
                data: JSON.stringify(post),
                success: (res) => {
                    console.log(res);
            },
            contentType: "application/json"
        });
    });

    $searchButton.on('click', () => {
        let searchText = {search: $searchText.val()};
        console.log(searchText)
        $.get('/api/posts', searchText, (data) => {
            $resultsContainer.hide();
            $searchResults.empty();
            console.log(data);
            for (let index of data) {
                let $divHeader = $(`<div class='header'>Date: ${index.date.slice(0,16)} Subject: ${index.subject}</div>`)
                let $divPost = $(`<div class='resultPost'>${index.post}</div>`);
                $divHeader.appendTo($searchResults);
                $divPost.appendTo($searchResults);
            }
        })
    });
})