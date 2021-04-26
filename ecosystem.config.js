module.exports = {
  apps : [{
    name: 'SERVER PROCESS',
    script: 'dist/index.js',
    instances: 2,
    watch: true,
    ignore_watch: [
      'node_modules',
      '.git',
      'ecosystem.config.js',
      'public',
      ".next"
    ],
    exec_mode: 'cluster',
    wait_ready: true,
    max_restarts: 2,
    listen_timeout: 10000,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};