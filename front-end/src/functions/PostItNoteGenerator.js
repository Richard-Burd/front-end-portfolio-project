import { PostItNote2 } from '../classes/PostItNote2.js';
let generatePostItNoteClassInstance;
generatePostItNoteClassInstance = () => {
    // note must be equal to an instance of the PostItNote2 class
    let note = new PostItNote2(0, "nothing-yet", "nothing-yet");
    note.noteColor = note.generateRandomColor();
    note.doNotRepeatRandomColorOfPreviousInstance();
    note.generateId();
    note.generateTextColor();
    note.addNoteToClassList();
};
export default generatePostItNoteClassInstance;
/*
// This is a practice function to see if it is being imported or not
let generatePostItNoteClassInstance: () => void;

generatePostItNoteClassInstance = () => {
  console.log("You are now reading the function!");

}
*/
