class Idea {
  constructor(id, title, body, quality = 'Swill') {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality;
    // this.indexFound;
    this.pullFromStorage = JSON.parse(localStorage.getItem('card'));
  }

  saveToStorage(array) {
    localStorage.setItem('card', JSON.stringify(array));
  }

  deleteFromStorage(id) {
    this.pullFromStorage.splice(this.getIndex(id), 1)
    this.saveToStorage(this.pullFromStorage);
  }

  updateContent(id, body) {
    console.log(id, body);
    this.pullFromStorage[this.getIndex(id)].body = body;
    this.saveToStorage(this.pullFromStorage);
  }

  updateQuality(id, quality) {
    this.pullFromStorage[this.getIndex(id)].quality = quality;
    this.saveToStorage(this.pullFromStorage);
  }

  getIndex(id) {
    return this.pullFromStorage.map(idea => idea.id).indexOf(id);
  }

}

// // //TESTING CODE BELOW

// // //START WITH EMPTY ARRAY CONTAINER
// var allCardsArr = [
//   {id: 11, title: 'Ideaaaaa', body: 'NOTTTT', quality: 'genius'},
//   {id: 12, title: 'there helo', body: 'stranger', quality: 'swill'},
//   {id: 13, title: 'there helo', body: 'ssadfa', quality: 'plausible'},
//   {id: 14, title: 'Ideaaaaa', body: 'NOTTTT', quality: 'genius'},
//   {id: 15, title: 'there helo', body: 'ssadfa', quality: 'plausible'}
// ];

// // // //CREATE NEW IDEA INSTANCE
// var testIdea = new Idea(10, 'Ideaaaaa', 'Ideaaa Body');

// // // //PUSH NEW OBJECT CREATED INSIDE ARRAY CONTAINER
// allCardsArr.unshift(testIdea);

// // // //CALL METHOD TO SAVE ARRAY INTO LOCAL STORAGE
// testIdea.saveToStorage(allCardsArr);

// //TEST DELETING ELEMENT, ARGUMENT PASSING IS IDEA ID
// // testIdea.deleteFromStorage(14);

// // //TEST REPLACING IDEA BODY WITH NEW ONE, PARAMS: IDEA ID AND NEW BODY
// // var newBody = 'NEW IDEAAAA BODY!';
// // testIdea.updateContent(11, newBody);

// // TEST REPLACING QUALITY WITH A NEW ONE, PARAMS: IDEA ID AND NEW QUALITY
// // var ideaQualities = ['swell', 'plausible', 'genius']
// // testIdea.updateQuality(11, ideaQualities[1]);

// // FILTERING
// // var filteredIdeas = [];
// // var searchThis = 'plausible';

// // 
// //   filteredIdeas.push(allCardsArr.find(x => x.body === searchThis));
// //   var removeIndex = findFilterIndex(filteredIdeas.id);
// //   console.log(removeIndex);
// //   allCardsArr.splice(removeIndex, 1); 
// //   console.log(filteredIdeas);

// // for (var i = 0; i < allCardsArr.length; i++) {
// //   filteredIdeas = allCardsArr.find(x => x.quality === searchThis);
// //   console.log(filteredIdeas);
// // }
// // function findFilterIndex(id) {
// //   allCardsArr.map(idea => idea.id).indexOf(id);
// // }

// // console.log(testIdea.pullFromStorage);


