var searchInput = document.querySelector('#search');
var titleInput = document.querySelector('#idea-title');
var ideaInput = document.querySelector('#idea-body');
var saveBtn = document.querySelector('#save-btn');
var cardSection = document.querySelector('#card-section');

saveBtn.addEventListener('click', createCard);
cardSection.addEventListener('click', deleteCard);
// titleInput.addEventListener('keydown', function);
// ideaInput.addEventListener('keydown', function);

function createCard(event){
  var ideaTitle = titleInput.value;
  var ideaBody = ideaInput.value;
  // var testIdea = new Idea(timeStamp, ideaTitle, ideaBody);
  // testIdea.saveToStorage(testIdea);

  cardSection.innerHTML =
  `<article class="rounded-edges">
      <h2>${ideaTitle}</h2>
      <p class="lighter-font" contenteditable="true">${ideaBody}</p>
      <div>
        <a href="#" id="downvote-btn"><img src="images/downvote.svg" alt="downvote quality button"></a>
        <a href="#" id="upvote-btn"><img src="images/upvote.svg" alt="upvote quality button"></a>
        <h5>Quality: <span>Swill</span></h5>
        <a href="" id="delete-btn"><img  class="delete-btn"src="images/delete.svg" alt="delete idea button"></a>
      </div>
    </article>` + cardSection.innerHTML;
    event.preventDefault();
}

function deleteCard(event){
   if(event.target.classList.contains('delete-btn')){
    event.target.parentElement.parentElement.parentElement.remove();
    event.preventDefault();
  }
}


// var timeStamp = Math.floor(Date.now() / 1000);
// console.log(timeStamp);




