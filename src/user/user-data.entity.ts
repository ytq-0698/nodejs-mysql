import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'user_data',
})
export class UserDataEntity {
  @PrimaryColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  checkin: string;

  @Column()
  checkout: string;
}
