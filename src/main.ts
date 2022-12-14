import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TransformInterceptor } from "./transform.interceptor";
import { Logger } from "@nestjs/common";

async function bootstrap() {
    const logger = new Logger();
    const PORT = 3000;
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.listen(PORT);

    logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
