import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {

    constructor(private userService : UserService, private jwt : JwtService) {}
    
    async validateUser (userMail : string, userPassword : string) {
        
        try {
            if (!userMail || !userPassword) throw new NotFoundException("No user or password")
            
            const userData = await this.userService.findUser(userMail)
            
            if (!userData) throw new NotFoundException("No user found")
    
            const validPassword = await bcrypt.compare(userPassword, userData.password)
    
            if (userData && validPassword) {
                return userData
            }

        } catch (error) {
            throw new InternalServerErrorException("Something went wrong");
        }
    }

    async Login(payload : {id : string, email : string, rol : string}) {

        return {
            access_token : this.jwt.sign(payload, { expiresIn: '1h' })
            
        }
    }
}
