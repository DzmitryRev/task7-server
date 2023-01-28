import SessionData from "./SessionData.ts";

class UsersOnline extends SessionData<string> {
  getItem(username: string) {
    const item = this.data.find((item) => item === username);
    return item ? item : null;
  }
  removeItem(username: string) {
    this.data = this.data.filter((item) => item !== username);
  }
}

export default UsersOnline;
