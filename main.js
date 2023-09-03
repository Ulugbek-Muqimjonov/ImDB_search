const elForm = document.querySelector(".js-form");
const elForminput = document.querySelector(".js-search-input");
const elList = document.querySelector(".js-list");
const elSellect = document.querySelector(".js-sellect");
const result = document.querySelector(".js-result");
const imDB_API_KEY = `facacea8`;
const DocumentFragment  = document.createDocumentFragment();

function getMovies(url) {
    fetch(url)
    .then(response => response.json())
    .then(data =>  {
        render(data.Search,elList);
        result.textContent =`Natija: ${data.Search.length} ta film topildi !`;
        console.log(data);
    })
    .catch(error => alert(`Kechrasz bu turdagi film yo'q !!! 
qaytadan urininb ko'ring`))
}
function render(arr, node) {
    node.innerHTML = "";
  arr.forEach(item => {
    const newitem = document.createElement("li");
    const newitemImg = document.createElement("img");
    const newitemTitleWrap = document.createElement("div");
    const newitemTitle = document.createElement("h3");
    const newitemimDBType = document.createElement("span");
    const newitemimDBLink = document.createElement("a");

    newitem.classList.add("item","shadow","d-flex","flex-column");
    newitemImg.classList.add("item-img");
    newitemTitle.classList.add("fs-6","fw-bold","title");
    newitemimDBLink.classList.add("link");
    newitemimDBType.classList.add("fw-bold","mt-auto");
    newitemTitleWrap.classList.add("title-wrap");
    newitemImg.src = item.Poster;
    newitemImg.alt = item.Title;
    newitemimDBType.textContent =`Type: ${item.Type}`;
    newitemimDBLink.textContent = "watch";
    newitemimDBLink.href =`https://www.imdb.com/title/${item.imdbID}/`

    newitemTitle.textContent = item.Title;
    newitemTitleWrap.appendChild(newitemTitle)
    newitem.append(newitemImg,newitemTitleWrap,newitemimDBType,newitemimDBLink);
    DocumentFragment.appendChild(newitem)

  })
  node.appendChild(DocumentFragment);
}


// getMovies("https://jsonplaceholder.typicode.com/posts")

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const searchMovie = elForminput.value.trim();
    const elSellectValue = elSellect.value;
    if (elSellectValue == "") {
        alert("kechrasz sz flimni janirini tanlamadiz !!!");
        return;
    }
    if (elSellectValue == "all") {
        getMovies(`http://www.omdbapi.com/?i=tt3896198&apikey=${imDB_API_KEY}&s=${searchMovie}`);
        return;
    }
    getMovies(`http://www.omdbapi.com/?i=tt3896198&apikey=${imDB_API_KEY}&s=${searchMovie}&type=${elSellectValue}`)
    
    // elForminput.value = "";
    // elSellect.value = "";
})