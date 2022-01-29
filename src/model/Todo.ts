class Todo {
  constructor(
    private id_: string,
    private todoMessage_: string,
    private done_: boolean = false,
    private created_: Date = new Date(),
    private updated_: Date = new Date()
  ) {}

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
