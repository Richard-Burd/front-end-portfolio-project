object = "The objects page is being read by the index page"

class PostItNote {
  constructor(id, noteColor, textColor) {
    this.id = id;
    this.noteColor = noteColor;
    this.textColor = textColor;
  }

  generateId(){
    this.id = PostItNote.instances.length+1
  }

  doNotRepeatRandomColorOfPreviousInstance(){
    if (PostItNote.instances.length > 0){
      if (this.noteColor == PostItNote.instances[PostItNote.instances.length-1].noteColor){
        this.noteColor = "yellow"
      }
    }
  }

  generateRandomColor() {
    let selector = Math.floor(Math.random() * 4)
    switch(selector) {
      case 0:
        return "blue";
        break;
      case 1:
        return "green";
        break;
      case 2:
        return "orange";
        break;
      case 3:
        return "purple";
        break;
    }
  }

  generateTextColor(){
    if (this.noteColor == "yellow"){
      this.textColor = "#414406"
    } else if (this.noteColor == "green") {
      this.textColor = "#086609"
    } else if (this.noteColor == "orange") {
      this.textColor = "#664408"
    } else if (this.noteColor == "blue") {
      this.textColor = "#086266"
    } else if (this.noteColor == "purple") {
    this.textColor = "#3a138"
    }
  }
}

PostItNote.instances = [];

// This class is introduced to meet the following project requirement:
// "Translate JSON responses into JavaScript model objects using ES6 class or constructor function syntax."
// The storage areas already have object models in the backend because of the
// other project requirement that stipulates:
// "The domain model served by the Rails backend must include a resource with at least one has-many relationship..."
class StorageArea {
  constructor(name, id, area) {
    this.name = name;
    this.id = id;
    this.area = area;
  }
}
StorageArea.instances = [];
