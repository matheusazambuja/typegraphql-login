import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType('Profile')
@Entity('profiles')
class Profile {

  @Field(type => String)
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  label: string;
}

export { Profile };