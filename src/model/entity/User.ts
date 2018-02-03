import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "token" })
  token: string;

  @Column({ name: "expiration_date" })
  expirationDate: Date;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "picture_url" })
  pictureUrl: string;

  @Column({ name: "role" })
  role: string = UserRole.USER;

  @CreateDateColumn({ name: "creation_date" })
  creationDate: Date;

}

export const UserRole = {

  USER: 'user',

  ADMIN: 'admin'

};
