import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


// Tüm duraklar burada yer alır.
@Entity('location')
export class Location {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true})
    name: string

    @Column()
    mapLat: string

    @Column()
    mapLong: string

    @CreateDateColumn()
    createdAt: Date;
}

/* Yukarıdaki sınıf id, name, mapLat, mapLong gibi özelliklere sahip bir Konum varlığını temsil eder.
createdAt. */

/* The above class represents a Location entity with properties such as id, name, mapLat, mapLong, and
createdAt. */