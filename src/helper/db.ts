import { Station } from "src/entities/station.entity";
import { Location } from "src/entities/location.entity";
import { DataSource } from "typeorm";

/* The code is creating a new instance of the `DataSource` class and assigning it to the
`AppDataSource` constant. The `DataSource` class is typically used in TypeORM to connect to a
database and manage database operations. */

/* Kod, `DataSource` sınıfının yeni bir örneğini oluşturuyor ve bunu
AppDataSource` sabiti. DataSource` sınıfı tipik olarak TypeORM`da bir veri kaynağına bağlanmak için kullanılır
amacı veritabanı ve veritabanı işlemlerini yönetmek. */
// export const AppDataSource = new DataSource({
//     type: "mysql",
//      host: "localhost",
//      port: 3306,
//      username: "administrator",
//      password: "123456",
//      database: "kutaykoca",
//      entities: [Location, Station],
//      migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
//      synchronize: true,
//      logging: true,
//      subscribers: [],
// })

export const AppDataSource = new DataSource({
    type: "mysql",
     host: "db-mysql-sfo3-96391-do-user-9457349-0.b.db.ondigitalocean.com",
     port: 25060,
     username: "doadmin",
     password: "AVNS_eaRHq9pmkLdsEiMAK-l",
     database: "kutaykoca",
     entities: [Location, Station],
     migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
     synchronize: true,
     logging: true,
     subscribers: [],
     extra: {
        ssl: false
     }
})