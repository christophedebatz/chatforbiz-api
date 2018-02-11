import {Entity, Column, ManyToOne, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import User from './User';

@Entity()
export default class Message {

  constructor(messageDto:Message) {
    this.user = messageDto.user;
    this.name = messageDto.name;
    this.id = messageDto.id;
    this.creationDate = messageDto.creationDate;
    this.text = messageDto.text;
  }

  isRemoved():boolean {
    return this.user !== null && this.name !== null;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "text" })
  text: string;

  @ManyToOne(type => User, { onDelete: 'SET NULL' })
  user: User;

  @Column({ name: "text" })
  name: string;

  @CreateDateColumn({ name: "creation_date" })
  creationDate: Date;

}
