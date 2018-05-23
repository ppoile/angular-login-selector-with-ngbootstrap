import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const logins = [
      { id: 1, name: 'Dover' },
      { id: 2, name: 'London' },
      { id: 3, name: 'London Kraftwerk' },
    ];
    return {logins};
  }
}
