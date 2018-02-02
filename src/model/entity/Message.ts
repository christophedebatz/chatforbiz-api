import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import User from './User';

@Entity()
export default class Message {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name" })
  user: User;

  @Column({ name: "text" })
  text: string;

  @CreateDateColumn({ name: "creation_date" })
  creationDate: Date;

}

export const UserRole = {

  USER: 'user',

  ADMIN: 'admin'

};
