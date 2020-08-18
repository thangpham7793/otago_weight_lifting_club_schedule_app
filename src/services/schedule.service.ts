import { Request, Response } from "express"

export class ScheduleService {
  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send("Welcome!")
  }
}

//TODO: can process the whole thing here so that
//the client gets a nice json with all the data laid out (sounds like GraphQL)
