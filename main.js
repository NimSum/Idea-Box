let ideaArray = JSON.parse(localStorage.getItem('card')) || [];
const ideaInstance = new Idea();

const hideShowMore = () => {
  if (document.querySelector('#card-section').innerText == '') {
    $('#moreOrLessIdeas').css('display', 'none');
    $('.filter-quality').css('display', 'none');
  } else {
    $('#moreOrLessIdeas').css('display', '');
    $('.filter-quality').css('display', '');
  }
}

const generateIdeaCards = (idea) => {
  $('#card-section').prepend(
    `<article class="rounded-edges" data-id="${idea.id}">
      <h2>${idea.title}</h2>
      <p class="lighter-font" contenteditable="true">${idea.body}</p>
      <div>
        <a href=""><img class="downvote-btn" src="images/downvote.svg" alt="downvote quality button"></a>
        <a href=""><img class="upvote-btn" src="images/upvote.svg" alt="upvote quality button"></a>
        <h5>Quality: <span id="quality">${idea.quality}</span></h5>
        <a href="" id="delete-btn"><img  class="delete-btn"src="images/delete.svg" alt="delete idea button"></a>
      </div>
    </article>`);
}

const loadPreviousIdeas = () => {
  ideaArray.length > 10 
  ? ideaArray.slice(ideaArray.length - 10).forEach(idea => generateIdeaCards(idea))
  : ideaArray.forEach(idea => generateIdeaCards(idea));
  hideShowMore();
}

const editBody = (e) => {
  const indexFound = e.target.parentElement.dataset.id
  const editedBody = e.target.innerText;
  ideaInstance.updateContent(parseInt(indexFound), editedBody);
}

const filterQuality = (qual) => {
  const updatedIdeaArray = ideaInstance.pullFromStorage();
  const filteredQual = updatedIdeaArray.filter(obj => 
    obj.quality.toUpperCase().indexOf(qual.toUpperCase()) === 0);
  if (filteredQual.length) filteredQual.forEach(idea => generateIdeaCards(idea));
  hideShowMore() 
}

const filterText = (str) => {
  const updatedIdeaArray = JSON.parse(localStorage.getItem('card'));
  const filterTitle = updatedIdeaArray.filter(obj => 
    obj.title.toUpperCase().indexOf(str.toUpperCase()) === 0);
  const filterBody = updatedIdeaArray.filter(obj => 
    obj.body.toUpperCase().indexOf(str.toUpperCase()) === 0);
  filterTitle.length
  ? filterTitle.forEach(idea => generateIdeaCards(idea))
  : filterBody.length
  ? filterBody.forEach(idea => generateIdeaCards(idea))
  : filterQuality(str);
  hideShowMore()
}  

const showAllIdeas = () => {
  if ($('#moreOrLessIdeas').text() == "Show More") {
    $('#moreOrLessIdeas').text('Show Less');
    $('#card-section').empty();
    JSON.parse(localStorage.getItem('card')).forEach(idea => generateIdeaCards(idea));
  } else {
    $('#moreOrLessIdeas').text('Show More');
    $('#card-section').empty();
    loadPreviousIdeas();
  }
}

const changeQual = (qual, e, elem) => {
  let indexFound = e.target.parentElement.parentElement.parentElement.dataset.id;
  elem.innerText = `Quality: ${qual}`;
  ideaInstance.updateQuality(parseInt(indexFound), `${qual}`);
}

const upvoteQual = (e) => {
  e.preventDefault();
  let qualityElem = e.target.parentElement.parentElement.children[2];
  const checker = (upDown, qual) => 
    e.target.classList.contains(upDown) && qualityElem.innerText === `Quality: ${qual}`;
  checker('upvote-btn', 'Swill')
  ? changeQual('Plausible', e, qualityElem)
  : checker('upvote-btn', 'Plausible')
  ? changeQual('Genius', e, qualityElem)
  : checker('downvote-btn', 'Genius')
  ? changeQual('Plausible', e, qualityElem)
  : checker('downvote-btn', 'Plausible')
  ? changeQual('Swill', e, qualityElem) : false
}

const sortQuality = (e) => {
  $('#card-section').empty();
  switch(e.target.id) {
    case 'swill-btn':
      filterQuality('Swill');
      break;
    case 'plausible-btn':
      filterQuality('Plausible');
      break;
    default:
      filterQuality('Genius');
  }
}

const deleteCard = (e) => {
  let articleId = e.target.parentElement.parentElement.parentElement.dataset.id
  ideaInstance.deleteFromStorage(parseInt(articleId));
  e.target.parentElement.parentElement.parentElement.remove();
  hideShowMore();
  e.preventDefault();
}

const createCard = (e) => {
  e.preventDefault();
  if (!$('#idea-title').val() || !$('#idea-body').val()) return;
  const newIdea = new Idea(Date.now(), $('#idea-title').val(), $('#idea-body').val());
  ideaArray.push(newIdea);
  newIdea.saveToStorage(ideaArray);
  generateIdeaCards(newIdea);
  hideShowMore();
  $('#idea-title').val('');
  $('#idea-body').val('');
}

$(window).ready(() => {
  loadPreviousIdeas(ideaArray);
  $('#save-btn').click(createCard);
  $('.filter-quality').click(sortQuality);
  $('#moreOrLessIdeas').click(showAllIdeas);
  $('#card-section').keyup((e) => editBody(e));
  $('#card-section').click((e) => {
    event.target.classList.contains('delete-btn') ? deleteCard(e) : upvoteQual(e);
  });
  $('#search').keyup((e) => {
    $('#card-section').empty();
    e.target.value ? filterText(e.target.value) : loadPreviousIdeas();
  });
})
