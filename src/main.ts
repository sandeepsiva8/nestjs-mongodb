import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle("Employee Management System")
    .setDescription("Employee CRUD Operations")
    .setVersion("1.0")
    .addTag("employee")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(3000);
}
bootstrap();
