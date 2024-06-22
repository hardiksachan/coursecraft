import ms from "ms";
import jwt from "jsonwebtoken";
import { config } from "@common/config";
import { addMilliseconds } from "date-fns";
import { Payload, Token, TokenService } from "./token_service";

export class JWT implements TokenService {
  makeToken(payload: Payload): Token {
    const expirationDate = addMilliseconds(
      new Date(),
      ms(config.ACCESS_TOKEN_EXPIRATION_DURATION),
    );
    const token = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
      expiresIn: config.ACCESS_TOKEN_EXPIRATION_DURATION,
    });

    return {
      token,
      expirationDate,
    } satisfies Token;
  }
}
