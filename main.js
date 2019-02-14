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
window.addEventListener('load', loadPreviousIdeas);
// titleInput.addEventListener('keydown', function);
// ideaInput.addEventListener('keydown', function);

function createCard(event){
  var timeStamp = Math.floor(Date.now() / 1000);

  var ideaTitle = titleInput.value;
  var ideaBody = ideaInput.value;
  // Data will replace name with data attribute
  //use data attribute for time stamp
  cardSection.innerHTML =
  `<article class="rounded-edges" id="${timeStamp}">
      <h2>${ideaTitle}</h2>
      <p class="lighter-font" contenteditable="true">${ideaBody}</p>
      <div>
        <a href=""><img class="downvote-btn" src="images/downvote.svg" alt="downvote quality button"></a>
        <a href=""><img class="upvote-btn" src="images/upvote.svg" alt="upvote quality button"></a>
        <h5>Quality: <span id="quality">Swill</span></h5>
        <a href="" id="delete-btn"><img  class="delete-btn"src="images/delete.svg" alt="delete idea button"></a>
      </div>
    </article>` + cardSection.innerHTML; 
    newIdea = new Idea(timeStamp, ideaTitle, ideaBody);
    ideaArray.unshift(newIdea);;
    newIdea.saveToStorage(ideaArray);
    queryButtons();
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

var upvoteBtn, downvoteBtn, ideaQuality;
function loadPreviousIdeas(e) {
  for (var i = 0; i < ideaArray.length; i++) {
    cardSection.innerHTML +=
  `<article class="rounded-edges" id="${ideaArray[i].id}">
      <h2>${ideaArray[i].title}</h2>
      <p class="lighter-font" contenteditable="true">${ideaArray[i].body}</p>
      <div>
        <a href=""><img class="downvote-btn" src="images/downvote.svg" alt="downvote quality button"></a>
        <a href=""><img class="upvote-btn" src="images/upvote.svg" alt="upvote quality button"></a>
        <h5>Quality: <span id="quality">${ideaArray[i].quality}</span></h5>
        <a href="" id="delete-btn"><img  class="delete-btn"src="images/delete.svg" alt="delete idea button"></a>
      </div>
    </article>`
  }
  queryButtons();
  e.preventDefault();
}

function upvoteQual(e) {
  e.preventDefault();
  var indexFound = e.target.parentElement.parentElement.parentElement.id;
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


function queryButtons() {
  upvoteBtn = document.querySelector('.upvote-btn');
  downvoteBtn = document.querySelector('#downvote-btn');
  ideaQuality = document.querySelector('#quality');

  cardSection.addEventListener('click', upvoteQual);
// downvoteBtn.addEventListener('click', downvoteQual);
}
//refactor template literal



