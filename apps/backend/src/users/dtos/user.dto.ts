import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  username: string;
  @Expose()
  is_admin: boolean;
  @Expose()
  lang: string;
}
