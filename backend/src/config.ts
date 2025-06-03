export const config = {
  port: process.env.PORT || 8080,
  dbUri: process.env.DATABASE || '',
  env: process.env.NODE_ENV || 'development',
}