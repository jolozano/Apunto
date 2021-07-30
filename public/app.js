$(document).ready(function() {
    const $searchText = $('#searchBox');
    const $searchButton = $('#searchButton');
    const $subjectBox = $('#subjectBox');
    const $postText = $('#postText');
    const $postButton =  $('#post');
    const $resultsContainer = $('#results');
    const $searchContainer = $('#searchResults');
    const $SSOsignOut = $('#signOut')
    const $bodyContainer = $('./bodyContainer')
    let $del;
    let verified = null;

    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
        });
    }

    $SSOsignOut.on('click', signOut)


    if (!verified) {
        $bodyContainer.hide()
        $resultsContainer.hide();
        $searchContainer.empty();
    } else {
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

    }

})