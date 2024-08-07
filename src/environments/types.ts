export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
export interface EnvironmentParameter {
  production: boolean;
  firebase: FirebaseConfig;
  apiUrl: string;
}