import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JWTStrategy extends PassportStrategy(Strategy, "jwt"){
    constructor (){
        super(
            {
                jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration : false,
                secretOrKey : `KEY_SECRET_922`
            }
        )
    }

    async validate(payload : any){
        
        return {
            id : payload.id, 
            email : payload.email, 
            rol : [payload.rol]
        }
    }
}