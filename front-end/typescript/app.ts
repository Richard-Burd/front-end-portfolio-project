import { PostItNote2 } from './classes/PostItNote2.js'

console.log('The app.ts file is up and loading');

let myNote1 = new PostItNote2(0, "orange", "Oranger")
let myNote2 = new PostItNote2(0, "blue", "bluer")
let myNote3 = new PostItNote2(0, "green", "greener")

console.log(PostItNote2.staticFunction());

console.log(myNote1.generateId());
console.log(myNote1.addNoteToClassList());

console.log(myNote2.generateId());
console.log(myNote2.addNoteToClassList());

console.log(myNote3.generateId());
console.log(myNote3.addNoteToClassList());

console.log(PostItNote2.PostItNote2Instances);
