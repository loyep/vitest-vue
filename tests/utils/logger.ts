export class MockLogger {
  name: string;

  constructor(name = 'MockLogger') {
    this.name = name;
  }

  log(...args: any[]) {
    console.log(this.name, ...args);
  }
}

const logger = new MockLogger('test');
export default logger;
