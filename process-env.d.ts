declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // private
      readonly DATABASE_URL: string;
      // public
    }
  }
}

export {};
