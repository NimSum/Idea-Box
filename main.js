var searchInput = document.querySelector('#search');
var titleInput = document.querySelector('#idea-title');
var ideaInput = document.querySelector('#idea-body');
var saveBtn = document.querySelector('#save-btn');
var cardSection = document.querySelector('#card-section');
var ideaArticle = document.querySelector('article')

var ideaArray = [];
var newIdea;
saveBtn.addEventListener('click', createCard);
cardSection.addEventListener('click', deleteCard);
window.addEventListener('load', loadPreviousIdeas);
// titleInput.addEventListener('keydown', function);
// ideaInput.addEventListener('keydown', function);

function createCard(event){
  var timeStamp = Math.floor(Date.now() / 1000);

  var ideaTitle = titleInput.value;
  var ideaBody = ideaInput.value;
  // var testIdea = new Idea(timeStamp, ideaTitle, ideaBody);
  // testIdea.saveToStorage(testIdea);
  // Data will replace name with data attribute
  cardSection.innerHTML =
  `<article class="rounded-edges" id="${timeStamp}">
      <h2>${ideaTitle}</h2>
      <p class="lighter-font" contenteditable="true">${ideaBody}</p>
      <div>
        <a href="#" id="downvote-btn"><img src="images/downvote.svg" alt="downvote quality button"></a>
        <a href="#" id="upvote-btn"><img src="images/upvote.svg" alt="upvote quality button"></a>
        <h5>Quality: <span>Swill</span></h5>
        <a href="" id="delete-btn"><img  class="delete-btn"src="images/delete.svg" alt="delete idea button"></a>
      </div>
    </article>` + cardSection.innerHTML; 
    newIdea = new Idea(timeStamp, ideaTitle, ideaBody);
    ideaArray.unshift(newIdea);
    console.log(ideaArray);
    newIdea.saveToStorage(ideaArray);
    event.preventDefault();
}

function deleteCard(event){
   if(event.target.classList.contains('delete-btn')){
    var articleId = event.target.parentElement.parentElement.parentElement.id;
    var deleteInstance = new Idea();
    deleteInstance.deleteFromStorage(parseInt(articleId));
    event.target.parentElement.parentElement.parentElement.remove();
    event.preventDefault();
  }
}

function loadPreviousIdeas(e) {
  var pullFromStorage = JSON.parse(localStorage.getItem('card'));
  for (var i = 0; i < pullFromStorage.length; i++) {
    ideaArray.push(pullFromStorage[i]);
  }
  for (var i = 0; i < pullFromStorage.length; i++) {
    cardSection.innerHTML =
  `<article class="rounded-edges" id="${pullFromStorage[i].id}">
      <h2>${pullFromStorage[i].title}</h2>
      <p class="lighter-font" contenteditable="true">${pullFromStorage[i].body}</p>
      <div>
        <a href="#" id="downvote-btn"><img src="images/downvote.svg" alt="downvote quality button"></a>
        <a href="#" id="upvote-btn"><img src="images/upvote.svg" alt="upvote quality button"></a>
        <h5>Quality: <span>Swill</span></h5>
        <a href="" id="delete-btn"><img  class="delete-btn"src="images/delete.svg" alt="delete idea button"></a>
      </div>
    </article>` + cardSection.innerHTML; 

  }
  console.log(pullFromStorage.length);
  e.preventDefault();
}




