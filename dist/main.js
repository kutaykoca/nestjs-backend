"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const db_1 = require("./helper/db");
db_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connect success');
})
    .catch((err) => {
    console.log(err);
    console.log('Database connect not success');
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map