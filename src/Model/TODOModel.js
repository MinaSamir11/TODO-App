export default class TODOModel {
  constructor(Result) {
    Result['id'] ? (this.id = Result['id']) : null;
    Result['title'] ? (this.title = Result['title']) : null;
    Result['content'] ? (this.content = Result['content']) : null;
    Result['created'] ? (this.created = Result['created']) : null;
    Result['completed'] ? (this.completed = Result['completed']) : null;
    Result['due_date'] ? (this.due_date = Result['due_date']) : null;
    Result['owner'] ? (this.owner = Result['owner']) : null;
  }
}
