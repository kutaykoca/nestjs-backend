/* The Station class represents a station entity with properties such as id, name, latitude, longitude,
rotation, and creation date. */
/* İstasyon sınıfı, id, isim, enlem, boylam gibi özelliklere sahip bir istasyon varlığını temsil eder,
rotasyon ve oluşturma tarihi. */
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

// En yakın istasyon burada yer alır.

@Entity("station")
export class Station {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    lat: string

    @Column()
    lon: string

    @Column()
    rotation: string

    @CreateDateColumn()
    createdAt: Date
}