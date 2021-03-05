import { User } from "./domains";
import { Board } from "./domains/board.entity";
import { Diagnosis } from "./domains/diagnosis.entity";
import { Comment } from "./domains/comment.entity";

export const ormConfig = {
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "myuser",
  password: "1q2w3e4r",
  database: "mydb",
  entities: [User, Board, Diagnosis, Comment],
  synchronize: true
};
