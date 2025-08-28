import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

import { BaseController } from '../../../core/base.controller'
import { NoAuth } from '../../../decorators/NoAuth';

export default class userController extends BaseController {
  constructor() {
    super();
  }
  async index(req: Request,  res: Response, next:NextFunction) {
    this.sendSuccess(res, { desc: "This is the User route" });
  }
  
  @NoAuth()
  async getAllTimeSinceToday(req: Request,  res: Response, next:NextFunction) {
    const { data } = await axios.get(`${this.WAKATIME_API}/users/current/all_time_since_today`, {
      headers: {  
        Authorization: `Basic ${this.wakatimeSecret}`,
      },
    });
    this.sendSuccess(res, data)
  }
  
} 