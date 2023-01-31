import { Request } from "express";

export interface FindList extends Request {
  /**
   * 拿多少条
   */
  take?:number,
  /**
   * 跳过多少条数据
   */
  skip?:number
}
