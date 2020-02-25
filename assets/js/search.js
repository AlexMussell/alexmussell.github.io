(function() {
    function displaySearchResults(results, store) {
        let searchResults = document.getElementById('search-results');
        let fragment = document.createDocumentFragment();
        
        if (results.length) {

            for (let i = 0; i < results.length; i++) {
                let item = store[results[i].ref];
   
                let post = document.createElement('li');

                // link
                let titleLink = document.createElement('a');  
                titleLink.classList.add("post-link");
                titleLink.href = item.url

                let title = document.createElement('h2');
                title.classList.add("post-title");
                title.textContent = item.title

                titleLink.appendChild(title)
                post.appendChild(titleLink);

                // category container
                let categoryDateContainer = document.createElement('div');
                categoryDateContainer.classList.add('post-meta');

                // category
                let categories = document.createElement('ul');
                categories.classList.add('post-categories');

                let categoryList = document.createElement('li');
                categoryList.textContent = item.categories;

                categories.appendChild(categoryList);

                // date
                let date = document.createElement('div');
                date.setAttribute('id', 'date-order');
                date.classList.add('post-date');

                date.textContent = item.date;

                let dateIcon = document.createElement('i');
                dateIcon.classList.add('icon-calendar');

                date.appendChild(dateIcon);

                // append to category date container
                categoryDateContainer.appendChild(categories);
                categoryDateContainer.appendChild(date);

                // excerpt
                let excerpt = document.createElement('div');
                excerpt.classList.add('post');
                excerpt.textContent = item.excerpt;


                post.appendChild(categoryDateContainer);
                post.appendChild(excerpt);

                fragment.appendChild(post);
            }

            searchResults.appendChild(fragment);
        } else {
            let noResult = document.createElement('p');
            noResult.classList.add('searchNotFound');
            noResult.textContent = 'No results found.';

            fragment.appendChild(noResult);

            searchResults.appendChild(fragment);
        }
    }
  
    function getQueryVariable(variable) {
        let query = window.location.search.substring(1);
        let vars = query.split('&');XMLHttpRequestEventTarget

        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
                }
        }
    }
   
    let searchTerm = getQueryVariable('query');

    if (searchTerm == "") {
        window.location.replace("/blog");
    }

    if (searchTerm) {
        document.getElementById('search-box').setAttribute("value", searchTerm);

        let idx = lunr(function () {
            this.field('id');
            this.field('title', { boost: 10 });
            this.field('categories');
            this.field('date');
            this.field('excerpt');

            for (let key in window.store) {
                this.add({ 'id': key, 'title': window.store[key].title, 'categories': window.store[key].categories, 'date': window.store[key].date, 'excerpt': window.store[key].excerpt })
            }
        });

        let results = idx.search(searchTerm);
        displaySearchResults(results, window.store);

    }
})();
  