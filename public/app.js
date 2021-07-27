$(document).ready(function() {

    const $searchText = $('#searchBox');
    const $searchButton = $('#searchButton');
    const $subjectBox = $('#subjectBox');
    const $postText = $('#postText');
    const $postButton =  $('#post');
    const $resultsContainer = $('#results');
    const $searchContainer = $('#searchResults');
    const $ssoButton = $('.g-signin2');
    let $del;

    const getInfo = (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
    $ssoButton.on('click', getInfo())

    const deletePost = (id) => {
        $.ajax({
            url: '/api/posts' + '?' + $.param(id),
            type: 'DELETE',
            success: (res) => {
                console.log(res);
            }
        })
    }

    $.get('/api/posts', (data) => {
        for (let index of data) {
            let $divHeader = $(`<div class='header'>Date: ${index.date.slice(0,16)}---->Subject: ${index.subject}
            ---->${index.post}<form><button id=${index.id} class='del'>Delete</button></form></div>`);
            $divHeader.appendTo($resultsContainer);
        }
        $del = $('.del');
            $del.on('click', (e) => {
                let idParam = {id: e.target.id};
                console.log(idParam)
                deletePost(idParam);
            })
    })

    $searchButton.on('click', (event) => {
        event.preventDefault();
        let searchText = {search: $searchText.val()};
        $.get('/api/posts', searchText, (data) => {
            $resultsContainer.hide();
            $searchContainer.empty();
            for (let index of data) {
                let $divHeader = $(`<div class='header'>Date: ${index.date.slice(0,16)}---->Subject: ${index.subject}
                ---->${index.post}<form><button id=${index.id} class='del'>Delete</button></form></div>`);
                $divHeader.appendTo($searchContainer);
            }
            $del = $('.del');
            $del.on('click', (e) => {
                let idParam = {id: e.target.id};
                console.log(idParam)
                deletePost(idParam);
            })
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