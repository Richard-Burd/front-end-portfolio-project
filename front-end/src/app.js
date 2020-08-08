import { PostItNote } from './classes/PostItNote.js';
import generatePostItNoteClassInstance from './functions/generatePostItNoteClassInstance.js';
console.log('The app.ts file is up and loading');
// now that the generatePostItNoteClassInstance is up and running
// it should be used to create post it notes instead of the code below:
console.log(generatePostItNoteClassInstance());
console.log(generatePostItNoteClassInstance());
console.log(generatePostItNoteClassInstance());
console.log(PostItNote.instances);
// These are subcomponents of the generatePostItNoteClassInstance() function above
/*
let myNote1 = new PostItNote2(0, "blank-start", "blank-start")
let myNote2 = new PostItNote2(0, "blank-start", "blank-start")
let myNote3 = new PostItNote2(0, "blank-start", "blank-start")

console.log(PostItNote2.staticFunction());

console.log(myNote1.generateId());
console.log(myNote1.addNoteToClassList());
console.log(myNote1.generateRandomColor());
console.log(myNote1.generateTextColor());

console.log(myNote2.generateId());
console.log(myNote2.addNoteToClassList());
console.log(myNote2.generateRandomColor());
console.log(myNote2.generateTextColor());

console.log(myNote3.generateId());
console.log(myNote3.addNoteToClassList());
console.log(myNote3.generateRandomColor());
console.log(myNote3.generateTextColor());
*/
