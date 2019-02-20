class Idea {
  constructor(id, title, body, quality = 'Swill') {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality;
  }

  saveToStorage(array) {
    localStorage.setItem('card', JSON.stringify(array));
  }

  deleteFromStorage(id) {
    var ideaArray = this.pullFromStorage()
    ideaArray.splice(this.getIndex(id), 1)
    this.saveToStorage(ideaArray);
  }

  updateContent(id, body) {
    var ideaArray = this.pullFromStorage()
    ideaArray[this.getIndex(id)].body = body;
    this.saveToStorage(ideaArray);
  }

  updateQuality(id, quality) {
    var ideaArray = this.pullFromStorage()
    ideaArray[this.getIndex(id)].quality = quality;
    this.saveToStorage(ideaArray);
  }

  getIndex(id) {
    return this.pullFromStorage().map(idea => idea.id).indexOf(id);
  }
  
  pullFromStorage() {
    return JSON.parse(localStorage.getItem('card'));
  }
}


