import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { envs } from '../config/envs';

@Injectable()
export class SeedService {

    constructor(
        private authService: AuthService,
    ){}

    async execute(){
        await this.authService.createUser({
            email: envs.adminEmail,
            password: envs.adminPassword,
            roles: ['admin', 'super-user', 'user'],
            fullName: 'La Pehuajo administrador'
        });
    }
}
