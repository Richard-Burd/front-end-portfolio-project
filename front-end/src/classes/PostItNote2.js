// In order to read this file from the server must be booted up:
// front-end-portfolio-project/front-end (master) $ http-server -c-1
export class PostItNote2 {
    constructor(id, noteColor, textColor) {
        this.id = id;
        this.noteColor = noteColor;
        this.textColor = textColor;
        let allNotes = [];
    }
    // This function applies to all instances of the class
    static staticFunction() {
        console.log("This staticFunction is being called by the class");
    }
    generateId() {
        this.id = PostItNote2.PostItNote2Instances.length + 1;
    }
    addNoteToClassList() {
        PostItNote2.PostItNote2Instances.push(this);
    }
}
// This variable applies to all instances of the class
// it is an array that can only include instances of PostItNote2
PostItNote2.PostItNote2Instances = [];
//let PostItNote2Instances: PostItNote2[] = [];
