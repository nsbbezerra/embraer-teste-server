const configs = {
  database: {
    database: process.env.DB_PROJECT_DATABASE || 'my_bank',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '03102190',
  },
};

export { configs };
