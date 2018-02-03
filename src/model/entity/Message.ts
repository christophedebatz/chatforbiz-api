import {Entity, Column, ManyToOne, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import User from './User';

@Entity()
export default class Message {

  constructor(messageDto:Message) {
    this.user = messageDto.user;
    this.id = messageDto.id;
    this.creationDate = messageDto.creationDate;
    this.text = messageDto.text;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  user: User;

  @Column({ name: "text" })
  text: string;

  @CreateDateColumn({ name: "creation_date" })
  creationDate: Date;

}
