import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth-module/auth.module';
import { DatabaseModule } from 'src/database-module/database.module';
import { ItemModule } from 'src/item-module/item.module';
import { OrderModule } from 'src/order-module/order.module';
import { UserModule } from 'src/user-module/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ItemModule,
    OrderModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
