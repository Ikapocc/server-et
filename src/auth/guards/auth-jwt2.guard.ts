import { AuthGuard, PassportStrategy } from "@nestjs/passport";

export class JWTGuard extends AuthGuard("jwt") {}