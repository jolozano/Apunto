$(document).ready(function() {

    const $searchText = $('#searchBox');
    const $searchButton = $('#searchButton');
    const $subjectBox = $('#subjectBox');
    const $postText = $('#postText');
    const $postButton =  $('#post');
    const $resultsContainer = $('#results')
    const $searchContainer = $('#searchResults')

    $.get('/api/posts', (data) => {
        for (let index of data) {
            let $divHeader = $(`<div class='header'>Date: ${index.date.slice(0,16)}---->Subject: ${index.subject}
            ---->${index.post}</div>`);
            $divHeader.appendTo($resultsContainer);
        }
    })

    $searchButton.on('click', (event) => {
        event.preventDefault();
        let searchText = {search: $searchText.val()};
        $.get('/api/posts', searchText, (data) => {
            $resultsContainer.hide();
            $searchResults.empty();
            for (let index of data) {
                let $divHeader = $(`<div class='header'>Date: ${index.date.slice(0,16)}---->Subject: ${index.subject}
                ---->${index.post}</div>`);
                $divHeader.appendTo($searchContainer);
            }
        })
    });

    $postButton.on('click', () => {
        let post = {subject: $subjectBox.val(), post: $postText.val()};
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
})