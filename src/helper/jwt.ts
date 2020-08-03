import jwt from 'jsonwebtoken';

export default {
  issue(payload: any, expiresIn?: string) {
    return jwt.sign(payload, process.env.SECRET_JWK_TOKEN as string, {
      expiresIn: expiresIn || Number(process.env.MAXAGE_JWT_TOKEN as string),
    });
  },
  verify(token: string){
    try {
      const decoded: any = jwt.verify(token, process.env.SECRET_JWK_TOKEN as string);
      return {
        success: true,
        decoded: decoded
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
    
  }
};
