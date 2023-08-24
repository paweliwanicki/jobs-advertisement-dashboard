import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;

  @Column({ default: 'en' })
  lang: string;

  @Column({ default: false })
  is_admin: boolean;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'bigint' })
  created_at: number;

  // @OneToMany(() => JobOffer, (offer) => offer.user_id)
  // offers: JobOffer[];

  @AfterInsert()
  logInsert() {
    console.log('User is created with id ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('User is updated with id ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('User is removed with id ', this.id);
  }
}
