import { Module } from '@nestjs/common';
import { DbModule } from 'src/db.module';

import { UsersService } from './services';

@Module({
  imports: [ DbModule ],
  providers: [ UsersService ],
  exports: [ UsersService ],
})
export class UsersModule {}
