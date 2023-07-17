/**
 * This code initializes and starts a NestJS application, connects to a database, and listens for
 * incoming requests on port 3000.
 */

/**
 * Bu kod bir NestJS uygulamasını başlatır ve başlatır, bir veritabanına bağlanır ve
 * 3000 numaralı bağlantı noktasına gelen istekleri yönetir.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './helper/db';


// DatabaseConnect
AppDataSource.initialize()
  .then(() => {
    console.log('Database connect success')
  })
  .catch((err) => {
    console.log(err)
    console.log('Database connect not success')
  })
/**
 * Initializes and starts the application.
 *
 * @return {Promise<void>} A promise that resolves when the application has started.
 */

/**
 * Uygulamayı başlatır ve başlatır.
 *
 * @return {Promise<void>} Uygulama başladığında çözümleyen bir söz.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
