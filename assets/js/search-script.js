SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  searchResultTemplate: '<ul class="base-layout"> \
                            <li>{{date}} \
                              <a class="post-link" href="{{url}}"> \
                                <h2 class="post-title">{{title}}</h2> \
                              </a> \
                              <div class="post-meta"> \
                                <ul class="post-categories"> \
                                  <li>{{tags}}</li> \
                                </ul> \
                                <div class="post-date"> \
                                  <i class="icon-calendar"></i> \
                                  {{date}} \
                                </div> \
                              </div> \
                            <div class="post"> \
                              {{excerpt}} \
                            </div> \
                          </li> \
                        </ul>',
  json: '/search.json',
})
