class Flash {

  static _messages = null;

  static setMessage(type, message) {
    console.log('inside set message', type, message);
    this._messages = this._messages || {};
    this._messages[type] = message;
  }

  static getMessages() {
    return this._messages;
  }

  static clearMessages(){
    this._messages = null;
  }
}

export default Flash;
