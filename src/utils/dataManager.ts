export interface TestUser {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface TestData {
  users: {
    valid: TestUser;
    invalid: TestUser;
    admin: TestUser;
  };
  urls: {
    home: string;
    login: string;
    register: string;
    dashboard: string;
  };
  messages: {
    success: string[];
    error: string[];
    validation: string[];
  };
}

export class DataManager {
  private static instance: DataManager;
  private testData: TestData;

  private constructor() {
    this.testData = {
      users: {
        valid: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'TestPassword123!',
          firstName: 'Test',
          lastName: 'User'
        },
        invalid: {
          username: 'invaliduser',
          email: 'invalid@example.com',
          password: 'wrongpassword',
          firstName: 'Invalid',
          lastName: 'User'
        },
        admin: {
          username: 'admin',
          email: 'admin@example.com',
          password: 'AdminPassword123!',
          firstName: 'Admin',
          lastName: 'User'
        }
      },
      urls: {
        home: 'https://example.com',
        login: 'https://example.com/login',
        register: 'https://example.com/register',
        dashboard: 'https://example.com/dashboard'
      },
      messages: {
        success: [
          'Login successful',
          'Registration completed',
          'Profile updated',
          'Data saved successfully'
        ],
        error: [
          'Invalid credentials',
          'User not found',
          'Access denied',
          'Server error'
        ],
        validation: [
          'Email is required',
          'Password must be at least 8 characters',
          'Username already exists',
          'Invalid email format'
        ]
      }
    };
  }

  public static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  public getValidUser(): TestUser {
    return { ...this.testData.users.valid };
  }

  public getInvalidUser(): TestUser {
    return { ...this.testData.users.invalid };
  }

  public getAdminUser(): TestUser {
    return { ...this.testData.users.admin };
  }

  public getUserByType(type: keyof typeof this.testData.users): TestUser {
    return { ...this.testData.users[type] };
  }

  public getUrl(type: keyof typeof this.testData.urls): string {
    return this.testData.urls[type];
  }

  public getMessage(type: keyof typeof this.testData.messages, index: number = 0): string {
    return this.testData.messages[type][index] || '';
  }

  public getRandomMessage(type: keyof typeof this.testData.messages): string {
    const messages = this.testData.messages[type];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  public updateUserData(type: keyof typeof this.testData.users, updates: Partial<TestUser>): void {
    this.testData.users[type] = { ...this.testData.users[type], ...updates };
  }

  public addMessage(type: keyof typeof this.testData.messages, message: string): void {
    this.testData.messages[type].push(message);
  }

  public generateRandomUser(): TestUser {
    const timestamp = Date.now();
    return {
      username: `user_${timestamp}`,
      email: `user_${timestamp}@example.com`,
      password: `Password${timestamp}!`,
      firstName: `User${timestamp}`,
      lastName: `Test${timestamp}`
    };
  }
} 