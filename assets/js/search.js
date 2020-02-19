(function() {
    function displaySearchResults(results, store) {
        var searchResults = document.getElementById('search-results');

        console.log(results.length);
        // if (Object.keys(store).length == 0) {
        //     window.location.replace("/blog");
        // }
        
        if (results.length) {
            var appendString = '';

            const matched_posts =  Object.keys(store);

            for (var i = 0; i < matched_posts.length; i++) {
                const { title, category, url } = store[matched_posts[i]];
                appendString += '<a href="' + url + '"><h3>' + title + '</h3><h3>' + category + '</h3></a>';
                // appendString += '<p>' + item.content.substring(0, 150) + '...</p></li>';
            }


            searchResults.innerHTML = appendString;
        } else {
            searchResults.innerHTML = '<li>No results found</li>';
        }
    }
  
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');XMLHttpRequestEventTarget

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
                }
        }
    }
  
    var searchTerm = getQueryVariable('query');

    if (searchTerm) {
        document.getElementById('search-box').setAttribute("value", searchTerm);

        // Initalize lunr with the fields it will be searching on. I've given title
        // a boost of 10 to indicate matches on this field are more important.
        var idx = lunr(function () {
            this.ref('id')
            this.field('title', { boost: 10 });
            this.field('category');

            for (var key in window.store) { // Add the data to lunr
                this.add({ id: 1, title: window.store[key].title }),
                this.add({ id: 2, category: window.store[key].category })    
            }
        });
        
        var results = idx.search(searchTerm); // Get lunr to perform a search
        displaySearchResults(results, window.store);

    }
})();
  