import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow communication between frontend and backend
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Set the application to listen on port 3000
  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
}
bootstrap();
