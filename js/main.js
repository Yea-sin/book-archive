// common function
const fetchData = async url => {
    const res = await fetch(url);
    const data = await res.json();
    return data
} ;

// elements
const search = document.getElementById('search-btn');
const input = document.getElementById('input-field');
const errors = document.getElementById('errors');
const resultCount = document.getElementById('result-count');
const booksContainer = document.getElementById('books-container');
const spinner = document.getElementById('spinner');

// search data
search.addEventListener('click', ()=>{
    inputValue = input.value;
    input.value = '';
    booksContainer.innerHTML='';
    resultCount.innerText ='';
    if(inputValue === ''){
        errors.innerText='Search Field Cannot Be Empty!!!'
    }else{
        spinner.classList.remove('d-none')
        errors.innerText = '';
        fetchData(`https://openlibrary.org/search.json?q=${inputValue}`)
        .then(data => displayBooks(data))
    }  
})
// display books
const displayBooks = books => {
    resultCount.innerText = `( Showing 1 to 100 of ${books.numFound} books )`
    if(books.numFound !== 0){
        spinner.classList.add('d-none')
        books.docs.forEach(book => {           
            // destructuring
            const {title, author_name, first_publish_year,publisher, cover_i} = book;
            const div = document.createElement('div');
                div.classList.add('col-6');
            if(cover_i === undefined){       
                div.innerHTML=`
                <div class="shadow-lg rounded  me-5" style="width: 400px;">
                    <div class=" mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4 d-flex align-items-center">
                              <img src="images/empty-image.jpg" class="img-fluid rounded-start w-100" alt="NO Image Found">
                              
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                <h5 class="card-title fw-bold">${title}</h5>
                                <h5 class="fst-italic">Author :${author_name}</h5>
                                <h5 class="fst-italic">Publisher : ${publisher}</h5>
                                <h5 class="fst-italic">First Published: ${first_publish_year}</h5>
                                <div>
                                    <button type="button" class="btn btn-lg btn-outline-secondary mt-4">Details</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
                booksContainer.appendChild(div)
            }else{
                
                div.innerHTML=`
                <div class="shadow-lg rounded p-4 me-5" style="width: 400px;">
                    <div class=" mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4 d-flex align-items-center">
                              <img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg
                              " class="img-fluid rounded-start w-100" alt="...">
                              
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                <h5 class="card-title fw-bold">${title}</h5>
                                <h5 class="fst-italic">Author :${author_name}</h5>
                                <h5 class="fst-italic">Publisher : ${publisher}</h5>
                                <h5 class="fst-italic">First Published: ${first_publish_year}</h5>
                                <div>
                                    <button type="button" class="btn btn-lg btn-outline-secondary mt-4">Details</   button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
                booksContainer.appendChild(div)
            }       
        })      
        }else{
        spinner.classList.add('d-none')
        errors.innerText='Result Not Found';
        resultCount.innerText = '';
        }
        }