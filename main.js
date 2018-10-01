// Listen for form Submit
document.getElementById('myform').addEventListener('submit', saveBookmark);

// save bookmarks
function saveBookmark(e){
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validate(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    //
    if( localStorage.getItem('bookmarks') === null ){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else{
        // Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmarks to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    fetchBookmarks();

    // clear form
    document.getElementById("myform").reset();

    // preventDefault
    e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for( var i = 0; i < bookmarks.length; i++ ){
        if(bookmarks[i].url == url){
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}
// Fetch bookmarks
function fetchBookmarks(){
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output id
    var bookmarkResults = document.getElementById('bookmarks-result');

    // Build output
    bookmarkResults.innerHTML = "";
    for( var i = 0; i < bookmarks.length; i++ ){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="well">'+
                                     '<h3>'+name+
                                     ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                     ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                     '</h3></div>' ;
    }
}

function validate(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert("Please fill the form.");
        return false;
    }

    // Validate url
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
        alert("Please use a valid URL");
        return false;
    }
    return true;
}
