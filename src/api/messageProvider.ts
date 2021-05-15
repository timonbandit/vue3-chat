import { MessageType } from "../types/message.interface";

class Messages {
  private static instance: Messages;
  private Storage: Storage;
  private messagesTable: string;
  private usersTable: string;

  constructor() {
    this.Storage = localStorage;
    this.messagesTable = "vue-chat";
    this.usersTable = "vue-users";
  }

  public static getInstance(): Messages {
    if (!Messages.instance) {
      Messages.instance = new Messages();
    }

    return Messages.instance;
  }

  public sendMessage(message: MessageType) {
    let messages:MessageType[];

    messages = this.getMessages();
    messages.push(message);
    this.Storage.setItem(this.messagesTable, JSON.stringify(messages));
  }

  public getMessages():Array<MessageType> {
    let messages:string;
    
    messages = this.Storage.getItem(this.messagesTable) || "[]";

    return JSON.parse(messages);
  }

  public setUserName(name: string) {
    let names = this.getUsersNames();
    
    if (names.indexOf(name) !== -1) 
      return;

    if (names.length === 2) {
      names.shift()
    }

    names.push(name);

    this.Storage.setItem(this.usersTable, JSON.stringify(names));
  }

  public logOut(currentUser:string){
      let users = this.getUsersNames();
      users = users.filter((user:string) => user !== currentUser);

      this.Storage.setItem(this.usersTable, JSON.stringify(users));
  }

  public getUsersNames(){
    let users:string = this.Storage.getItem(this.usersTable) || "[]";
    return JSON.parse(users);
  }
}

export default Messages