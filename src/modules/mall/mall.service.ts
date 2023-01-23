import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntities } from 'src/entities/mall/users.entities';
import { ApiException } from 'src/modules/common/exception';
import { Repository } from 'typeorm';
import { AuthService } from './auth/auth.service';



@Injectable()
export class MallService {
  constructor(
    private authService:AuthService,
    
  ){

  }

}
