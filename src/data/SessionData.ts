abstract class SessionData<T> {
  data: T[] = [];

  setItem(item: T): void {
    this.data.push(item);
  }
  clear(): void {
    this.data = [];
  }
  getAll(): T[] {
    return this.data;
  }

  abstract getItem(criteria: string | number): T | null;
  abstract removeItem(criteria: string | number): void;
}

export default SessionData;
