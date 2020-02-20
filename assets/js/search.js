(function() {
    function displaySearchResults(results, store) {
        var searchResults = document.getElementById('search-results');

        console.log(store);

        if (results.length) {
            // var appendString = '';
            var fragment = document.createDocumentFragment();

            for (var i = 0; i < results.length; i++) {
                var item = store[results[i].ref];
                // appendString += '<a href="' + item.url + '"><h3>' + item.title + '</h3><h3>' + item.category + '</h3></a>';
                // appendString += '<p>' + item.content.substring(0, 150) + '...</p></li>';
                
                post = document.createElement('li');

                titleLink = document.createElement('a');  
                titleLink.classList.add("post-link");
                titleLink.href = item.url

                title = document.createElement('h2');
                title.classList.add("post-title");
                title.textContent = item.title

                titleLink.appendChild(title)
                post.appendChild(titleLink);

                categoryDateContainer = document.createElement('div');
                categoryDateContainer.classList.add('post-meta');

                categories = document.createElement('ul');
                categories.classList.add('post-categories');

                categoryList = document.createElement('li');
                categoryList.textContent = item.category;

                categories.appendChild(categoryList);
                categoryDateContainer.appendChild(categories);

                date = document.createElement('div');
                date.classList.add('post-date');

                date.textContent = item.date;

                dateIcon = document.createElement('i');
                dateIcon.classList.add('icon-calendar');


                date.appendChild(dateIcon);



                categoryDateContainer.appendChild(date);


                



                post.appendChild(categoryDateContainer);


                fragment.appendChild(post);
            }

            //searchResults.innerHTML = appendString;
            searchResults.appendChild(fragment);
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

    if (searchTerm == "") {
        window.location.replace("/blog");
    }

    if (searchTerm) {
        document.getElementById('search-box').setAttribute("value", searchTerm);

        var idx = lunr(function () {
            this.field('id');
            this.field('title', { boost: 10 });
            this.field('category');
            this.field('date');

            for (var key in window.store) {
                this.add({ 'id': key, 'title': window.store[key].title, 'category': window.store[key].category, 'date': window.store[key].date })
            }
        });

        var results = idx.search(searchTerm);
        displaySearchResults(results, window.store);

    }
})();
  