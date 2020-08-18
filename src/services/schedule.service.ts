import { Request, Response } from "express"

export class ScheduleService {
  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send("Welcome!")
  }
}
