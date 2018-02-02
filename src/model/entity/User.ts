import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name" })
  nickname: string;

  @Column({ name: "picture_url" })
  pictureUrl: string;

  @Column()
  role: string;

  @CreateDateColumn({ name: "creation_date" })
  creationDate: Date;

}

export const UserRole = {

  USER: 'user',

  ADMIN: 'admin'

};
