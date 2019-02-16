var searchInput = document.querySelector('#search');
var titleInput = document.querySelector('#idea-title');
var ideaInput = document.querySelector('#idea-body');
var saveBtn = document.querySelector('#save-btn');
var cardSection = document.querySelector('#card-section');
var ideaArticle = document.querySelector('article');

var ideaArray = JSON.parse(localStorage.getItem('card')) || [];
var newIdea;

saveBtn.addEventListener('click', createCard);
cardSection.addEventListener('click', deleteCard);
window.addEventListener('load', loadPreviousIdeas(ideaArray));
cardSection.addEventListener('click', upvoteQual);
// titleInput.addEventListener('keydown', function);
// ideaInput.addEventListener('keydown', function);

function createCard(event){
  var timeStamp = Math.floor(Date.now());
  var ideaTitle = titleInput.value;
  var ideaBody = ideaInput.value;
  generateIdeaCard(timeStamp, ideaTitle, ideaBody);
  newIdea = new Idea(timeStamp, ideaTitle, ideaBody);
  ideaArray.unshift(newIdea);;
  newIdea.saveToStorage(ideaArray);
  event.preventDefault();
}

function deleteCard(event){
   if(event.target.classList.contains('delete-btn')){
    var articleId = event.target.parentElement.parentElement.parentElement.dataset.id
    var deleteInstance = new Idea();
    deleteInstance.deleteFromStorage(parseInt(articleId));
    event.target.parentElement.parentElement.parentElement.remove();
    event.preventDefault();
  }
}

function loadPreviousIdeas() {
  ideaArray.reverse();
  for (var i = 0; i < ideaArray.length; i++) {
    generateIdeaCard(ideaArray[i].id, ideaArray[i].title, ideaArray[i].body,  ideaArray[i].quality);
  }
}

function upvoteQual(e) {
  console.log(e)
  e.preventDefault();
  var indexFound = e.target.parentElement.parentElement.parentElement.dataset.id
  var newInstance = new Idea();
  var qualityElem = e.target.parentElement.parentElement.children[2];
  if (e.target.classList.contains('upvote-btn') && qualityElem.innerText === 'Quality: Swill') {
    qualityElem.innerText = 'Quality: Plausible';
    newInstance.updateQuality(parseInt(indexFound), 'Plausible')
  } else if (e.target.classList.contains('upvote-btn') && qualityElem.innerText === 'Quality: Plausible'){
    qualityElem.innerText = 'Quality: Genius';
    newInstance.updateQuality(parseInt(indexFound), 'Genius')
  } else if (e.target.classList.contains('downvote-btn') && qualityElem.innerText === 'Quality: Genius') {
    qualityElem.innerText = 'Quality: Plausible';
    newInstance.updateQuality(parseInt(indexFound), 'Plausible')
  } else if (e.target.classList.contains('downvote-btn') && qualityElem.innerText === 'Quality: Plausible'){
    qualityElem.innerText = 'Quality: Swill';
    newInstance.updateQuality(parseInt(indexFound), 'Swill')
  }
}

function generateIdeaCard(id, title, body, quality = 'Swill') {
  cardSection.innerHTML =
    `<article class="rounded-edges" data-id="${id}">
      <h2>${title}</h2>
      <p class="lighter-font" contenteditable="true">${body}</p>
      <div>
        <a href=""><img class="downvote-btn" src="images/downvote.svg" alt="downvote quality button"></a>
        <a href=""><img class="upvote-btn" src="images/upvote.svg" alt="upvote quality button"></a>
        <h5>Quality: <span id="quality">${quality}</span></h5>
        <a href="" id="delete-btn"><img  class="delete-btn"src="images/delete.svg" alt="delete idea button"></a>
      </div>
    </article>` + cardSection.innerHTML
}


