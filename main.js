var searchInput = document.querySelector('#search');
var titleInput = document.querySelector('#idea-title');
var ideaInput = document.querySelector('#idea-body');
var saveBtn = document.querySelector('#save-btn');
var cardSection = document.querySelector('#card-section');
var showMoreBtn = document.querySelector('#moreOrLessIdeas')
var qualitySection = document.querySelector('.filter-quality');

var ideaArray = JSON.parse(localStorage.getItem('card')) || [];
var ideaInstance = new Idea();

window.addEventListener('load', loadPreviousIdeas(ideaArray));
saveBtn.addEventListener('click', createCard);
qualitySection.addEventListener('click', sortQuality);
showMoreBtn.addEventListener('click', showAllIdeas);
cardSection.addEventListener('click', deleteCard);
cardSection.addEventListener('click', upvoteQual);
cardSection.addEventListener('keydown', editBody);
searchInput.addEventListener('keyup', function(e) {
  if (13 == e.keyCode && searchInput.value) {
    cardSection.innerHTML = '';
    filterTitleBody(searchInput.value);
  } else if (!searchInput.value) {
    cardSection.innerHTML = '';
    loadPreviousIdeas();
  }
});

function createCard(event) {
  var timeStamp = Math.floor(Date.now());
  var ideaTitle = titleInput.value;
  var ideaBody = ideaInput.value;
  if (!ideaTitle || !ideaBody) {
    return;
  }
  generateIdeaCard(timeStamp, ideaTitle, ideaBody);
  var newIdea = new Idea(timeStamp, ideaTitle, ideaBody);
  ideaArray.push(newIdea);;
  newIdea.saveToStorage(ideaArray);
  hideShowMore()
  titleInput.value = '';
  ideaInput.value = '';
  event.preventDefault();
}

function deleteCard(event) {
   if (event.target.classList.contains('delete-btn')) {
    var articleId = event.target.parentElement.parentElement.parentElement.dataset.id
    ideaInstance.deleteFromStorage(parseInt(articleId));
    event.target.parentElement.parentElement.parentElement.remove();
    hideShowMore()
    event.preventDefault();
  }
}

function loadPreviousIdeas() {
  if (ideaArray.length > 10) {
   var slicedIdeaArr = ideaArray.slice(ideaArray.length - 10);
    for (var i = 0; i < slicedIdeaArr.length; i++) {
      generateIdeaCard(slicedIdeaArr[i].id, slicedIdeaArr[i].title, slicedIdeaArr[i].body,  slicedIdeaArr[i].quality);
    }
  } else {
      for (var i = 0; i < ideaArray.length; i++) {
      generateIdeaCard(ideaArray[i].id, ideaArray[i].title, ideaArray[i].body,  ideaArray[i].quality);
      }
    }
  hideShowMore();
}

function upvoteQual(e) {
  e.preventDefault();
  var indexFound = e.target.parentElement.parentElement.parentElement.dataset.id
  var qualityElem = e.target.parentElement.parentElement.children[2];
  if (e.target.classList.contains('upvote-btn') && qualityElem.innerText === 'Quality: Swill') {
    qualityElem.innerText = 'Quality: Plausible';
    ideaInstance.updateQuality(parseInt(indexFound), 'Plausible')
  } else if (e.target.classList.contains('upvote-btn') && qualityElem.innerText === 'Quality: Plausible') {
    qualityElem.innerText = 'Quality: Genius';
    ideaInstance.updateQuality(parseInt(indexFound), 'Genius')
  } else if (e.target.classList.contains('downvote-btn') && qualityElem.innerText === 'Quality: Genius') {
    qualityElem.innerText = 'Quality: Plausible';
    ideaInstance.updateQuality(parseInt(indexFound), 'Plausible')
  } else if (e.target.classList.contains('downvote-btn') && qualityElem.innerText === 'Quality: Plausible') {
    qualityElem.innerText = 'Quality: Swill';
    ideaInstance.updateQuality(parseInt(indexFound), 'Swill')
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

function editBody(e) {
  var indexFound = e.target.parentElement.dataset.id
  var editedBody = e.target.innerText;
  ideaInstance.updateContent(parseInt(indexFound), editedBody);
  console.log(editedBody);
}

function filterTitleBody(searchText) {
  var updatedIdeaArray = ideaInstance.pullFromStorage();
  var filterTitle = updatedIdeaArray.filter(obj => obj.title.toUpperCase().indexOf(searchText.toUpperCase()) === 0);
  var filterBody = updatedIdeaArray.filter(obj => obj.body.toUpperCase().indexOf(searchText.toUpperCase()) === 0);
  if (filterTitle.length) {
    for (var i = filterTitle.length - 1; i >= 0; i--) {
      generateIdeaCard(filterTitle[i].id, filterTitle[i].title, filterTitle[i].body, filterTitle[i].quality);
    } 
  } else if (filterBody.length) {
    for (var i = filterBody.length - 1; i >= 0; i--) {
      generateIdeaCard(filterBody[i].id, filterBody[i].title, filterBody[i].body, filterBody[i].quality);
    } 
  } else {
    filterQuality(searchText);
  }
  hideShowMore()
}  

function filterQuality(searchText) {
  var updatedIdeaArray = ideaInstance.pullFromStorage();
  var filterQuality = updatedIdeaArray.filter(obj => obj.quality.toUpperCase().indexOf(searchText.toUpperCase()) === 0);
  if (filterQuality.length) {
    for (var i = filterQuality.length - 1; i >= 0; i--) {
      generateIdeaCard(filterQuality[i].id, filterQuality[i].title, filterQuality[i].body, filterQuality[i].quality);
    } 
  }
  hideShowMore() 
}

function showAllIdeas() {
  if (showMoreBtn.innerText == "Show More") {
    showMoreBtn.innerText = "Show Less";
    cardSection.innerHTML = '';
    for (var i = 0; i < ideaArray.length; i++) {
      generateIdeaCard(ideaArray[i].id, ideaArray[i].title, ideaArray[i].body,  ideaArray[i].quality);
    }
  } else {
    showMoreBtn.innerText = "Show More";
    cardSection.innerHTML = '';
    loadPreviousIdeas();
  }
}

function sortQuality(e) {
  if (e.target.id == 'swill-btn') {
    cardSection.innerHTML = '';
    filterQuality('Swill');
  } else if (e.target.id == 'plausible-btn') {
    cardSection.innerHTML = '';
    filterQuality('Plausible');
  } else if (e.target.id == 'genius-btn') {
    cardSection.innerHTML = '';
    filterQuality('Genius');
  };
}

function hideShowMore() {
  console.log(cardSection.innerText.length);
  if (cardSection.innerText == '') {
    showMoreBtn.style.display = 'none';
    qualitySection.style.display = 'none';
  } else {
    showMoreBtn.style.display = '';
    qualitySection.style.display = '';
  }
}