import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  workTime: string;

  @Column()
  company: string;

  @Column()
  createdAt: number;

  @Column()
  createdBy: number;

  @Column({ nullable: true })
  modifiedBy: number;

  @Column({ nullable: true })
  modifiedAt: number;

  @AfterInsert()
  logInsert() {
    console.log('Offer is created with id ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Offer is updated with id ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Offer is removed with id ', this.id);
  }
}
