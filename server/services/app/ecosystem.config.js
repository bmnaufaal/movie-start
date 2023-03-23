module.exports = {
  apps: [
    {
      name: "app",
      script: "./bin/www.js",
      env_production: {
        NODE_ENV: "production",
        DATABASE_URL:
          "postgresql://postgres:UAa7YedfsfeTJmi3@db.lljhmrfhkrputtenterw.supabase.co:5432/postgres",
        PORT: 80,
        JWT_S
      },
    },
  ],
};

// DATABASE_URL=postgresql://postgres:UAa7YedfsfeTJmi3@db.lljhmrfhkrputtenterw.supabase.co:5432/postgres npx sequelize-cli db:migrate --env production

// DATABASE_URL=postgresql://postgres:UAa7YedfsfeTJmi3@db.lljhmrfhkrputtenterw.supabase.co:5432/postgres npx sequelize-cli db:seed:all --env production