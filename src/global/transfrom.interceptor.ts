import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import type { Request,Response } from 'express'
@Injectable()
export class TransfromInterceptor implements NestInterceptor{

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest<Request>()
    const res = ctx.getResponse<Response>()

    
    return next.handle().pipe(map(data=>({
      data,
      path:req.url,
      time:new Date().toISOString(),
      success:true,
      // status
    }))
    )
  }
  
}