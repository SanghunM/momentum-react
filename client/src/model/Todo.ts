class Todo {
  private id_: string;
  private created_: Date;
  private updated_: Date;

  constructor(private todoMessage_: string, private done_: boolean = false) {
    this.id_ = (Date.now() * Math.random()).toString(32);
    this.created_ = new Date();
    this.updated_ = new Date();
  }

  get id() {
    return this.id_;
  }

  get todoMessage() {
    return this.todoMessage_;
  }

  set todoMessage(value) {
    this.todoMessage_ = value;
  }

  get done() {
    return this.done_;
  }

  set done(value) {
    this.done_ = value;
  }

  get created() {
    return this.created_;
  }

  get updated() {
    return this.updated_;
  }

  set updated(value) {
    this.updated_ = value;
  }
}

export default Todo;
