//getting elements by id
const searchField = document.getElementById("search-field");
const searchResult = document.getElementById("search-result");
const searchQuantity = document.getElementById("search-quantity");
const emptySearch = document.getElementById("empty-search");
const errorDiv = document.getElementById("error");

//function calling to search book result
const searchBook = () => {
    const searchText = searchField.value;

    //clearing data  
    searchField.value = "";
    searchQuantity.innerText = "";
    searchResult.textContent = "";

    //error handling for empty search
    if (searchText === "") {
        emptySearch.style.display = "block";
        errorDiv.style.display = "none";
    }
    else {
        emptySearch.style.display = "none";

        //  Book API URL
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));
    }
};
const displaySearchResult = (data) => {

    //display result quantity info
    searchQuantity.innerText = `Showing Results From ${data.numFound} Result`;
    // console.log(data);

    // error handling for unavailable items
    if (data.numFound === 0) {
        searchQuantity.innerText = "";
        errorDiv.style.display = "block";
    }
    else {
        errorDiv.style.display = "none";
        data?.docs.forEach((book) => {
            // console.log(book);

            //function calling 
            loadBookDetail(book);

            //displaying book details
            const div = document.createElement("div");
            div.classList.add('col');
            div.innerHTML = `
           <div class="card p-3">
                <img height='300px' src=${image_url}  class="card-img-top" alt="...">
                <div class="card-body">
                   <h5 class="card-title">${book?.title}</h5>
                   <p class="card-text"><b>Author:</b> <i>${author}</i></p>
                   <p class="card-text"><b>Publisher:</b> ${publisher}</p>
                   <p class="card-text"><b>First published in:</b> ${publishDate}</p>
               </div>
           </div>
       `;
            searchResult.appendChild(div);
        });
    }
};

//loading book details
const loadBookDetail = (book) => {
    //loading image via image API url
    book?.cover_i
        ? (image_url = `https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`)
        : (image_url = "images/no-image.jpg");

    // loading author name if available
    book?.author_name ? (author = book?.author_name) : (author = "Not available");

    // loading first publisher name if available
    book?.publisher[0] ? (publisher = book?.publisher[0]) : (publisher = "Not available");

    // loading first published date if available
    book?.publish_date[0] ? (publishDate = book?.publish_date[0]) : (publishDate = "Not available");

};