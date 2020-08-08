import generatePostItNoteClassInstance from './generatePostItNoteClassInstance.js';
import { PostItNote } from '../classes/PostItNote.js';
// this is the function signature
let importPostItNoteFromClassInstanceToDOM;
// the importPostItNoteFromClassInstanceToDOM() function goes here:
// it is based off of it's JS cousin here:
// https://github.com/Richard-Burd/front-end-portfolio-project/blob/master/front-end/src/index.js
importPostItNoteFromClassInstanceToDOM = () => {
    generatePostItNoteClassInstance();
    let noteBuilder1 = document.createElement('div');
    noteBuilder1.setAttribute('class', `textpanel ${PostItNote.instances[PostItNote.instances.length - 1].noteColor}`);
    noteBuilder1.setAttribute('id', `${PostItNote.instances[PostItNote.instances.length - 1].id}`);
    let noteBuilder2 = document.createElement('img');
    noteBuilder2.setAttribute('class', 'post-it-note-image');
    noteBuilder2.setAttribute('src', `src/images/postit_note_${PostItNote.instances[PostItNote.instances.length - 1].noteColor}.svg`);
    let noteBuilder3 = document.createElement('textarea');
    noteBuilder3.setAttribute('maxlength', '50');
    noteBuilder3.setAttribute('style', `color: ${PostItNote.instances[PostItNote.instances.length - 1].textColor}`);
    noteBuilder1.appendChild(noteBuilder2); // arranging subcomponents
    noteBuilder1.appendChild(noteBuilder3); // arranging subcomponents
    let insertPoint = document.querySelector('div.post-it-note-collection');
    insertPoint.appendChild(noteBuilder1);
};
export default importPostItNoteFromClassInstanceToDOM;
