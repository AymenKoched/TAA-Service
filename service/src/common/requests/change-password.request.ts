import { IsNotEmpty, Matches } from 'class-validator';

import { BaseModel } from '../base';
import { PASSWORD_REGEX } from '../constants';
import { ApiProperty, Match } from '../decorators';

export class ChangePasswordRequest extends BaseModel {
  @IsNotEmpty({
    message: 'errors:field.required',
  })
  @ApiProperty()
  emailToken!: string;

  @IsNotEmpty({
    message: 'errors:field.required',
  })
  @Matches(PASSWORD_REGEX, {
    message: 'errors:password.invalid',
  })
  @ApiProperty()
  password!: string;

  @IsNotEmpty({
    message: 'errors:field.required',
  })
  @Match('password', {
    message: 'errors:user.password_confirmation.mismatch',
  })
  @ApiProperty()
  passwordConfirmation!: string;
}
