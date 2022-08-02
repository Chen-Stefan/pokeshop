// Tell TypeScript exactly what variables are present in process.env

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string | undefined;
      NODE_ENV?: 'development' | 'production';
      PORT?: string;
      PWD?: string;
    }
  }
}

export {}