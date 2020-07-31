// In order to read this file from the server must be booted up:
// front-end-portfolio-project/front-end (master) $ http-server -c-1
export class PostItNote2 {
  constructor(
    public id: number,
    public noteColor: string,
    public textColor: string
  ) {let allNotes: PostItNote2[] = [];}

  // This variable applies to all instances of the class
  // it is an array that can only include instances of PostItNote2
  static PostItNote2Instances: PostItNote2[] = [];

  // This function applies to all instances of the class
  static staticFunction(){
    console.log("This staticFunction is being called by the class");
  }

  // class instance function to give an instance a consecutive id
  generateId(){
    this.id = PostItNote2.PostItNote2Instances.length+1;
  }

  // class instance function to add a class instance to the array above
  addNoteToClassList(){
    PostItNote2.PostItNote2Instances.push(this)
  }
}
