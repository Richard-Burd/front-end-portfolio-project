// In order to read this file from the server must be booted up:
// front-end-portfolio-project/front-end (master) $ http-server -c-1
export class PostItNote {
    constructor(id, noteColor, textColor) {
        this.id = id;
        this.noteColor = noteColor;
        this.textColor = textColor;
    }
    // This function applies to all instances of the class
    static staticFunction() {
        console.log("This staticFunction is being called by the class");
    }
    allPostItNotes() {
        PostItNote.instances.push(this);
    }
    // class instance function to give an instance a consecutive id
    generateId() {
        this.id = PostItNote.instances.length + 1;
    }
    // class instance function to add a class instance to the array above
    addNoteToClassList() {
        PostItNote.instances.push(this);
    }
    // the switch-case statement was not working in TypeScript
    generateRandomColor() {
        let selector = Math.floor(Math.random() * 4);
        if (selector == 0) {
            return "blue";
        }
        else if (selector == 1) {
            return "green";
        }
        else if (selector == 2) {
            return "orange";
        }
        else {
            return "purple";
        }
    }
    doNotRepeatRandomColorOfPreviousInstance() {
        if (PostItNote.instances.length > 0) {
            if (this.noteColor == PostItNote.instances[PostItNote.instances.length - 1].noteColor) {
                this.noteColor = "yellow";
            }
        }
    }
    // This method generates the text color of the post-it note's background
    generateTextColor() {
        if (this.noteColor == "yellow") {
            this.textColor = "#414406";
        }
        else if (this.noteColor == "green") {
            this.textColor = "#086609";
        }
        else if (this.noteColor == "orange") {
            this.textColor = "#664408";
        }
        else if (this.noteColor == "blue") {
            this.textColor = "#086266";
        }
        else if (this.noteColor == "purple") {
            this.textColor = "#3a138";
        }
    }
}
// This variable applies to all instances of the class
// it is an array that can only include instances of PostItNote2
PostItNote.instances = [];
