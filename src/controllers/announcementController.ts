import { announcementService } from "../services/announcementService";
import { Request, Response } from "express";
import { z } from "zod";

class AnnouncementController {
  async getAllAnnouncements(
    req: Request,
    res: Response<AnnouncementController.GetAllAnnouncements.Response>,
  ) {
    const announcements = await announcementService.getAllAnnouncements();
    res.json(announcements);
  }

  async getAnnouncementById(
    req: Request<AnnouncementController.GetAnnouncementById.Request>,
    res: Response<AnnouncementController.GetAnnouncementById.Response | null>,
  ) {
    const schema = z.object({
      id: z.string().uuid(),
    })

    const { id } = schema.parse(req.params)
    const announcement = await announcementService.getAnnouncementById(id);

    res.json(announcement)
  }

  async createAnnouncement(
    req: Request<AnnouncementController.CreateAnnouncement.Request>,
    res: Response<AnnouncementController.CreateAnnouncement.Response | null>,
  ) {
    const schema = z.object({
      title: z.string(),
      content: z.string(),
      authorId: z.string().uuid(),
    })

    const { title, content, authorId } = schema.parse(req.body)
    const newAnnouncement = await announcementService.createAnnouncement({
      title,
      content,
      authorId,
    });

    res.json(newAnnouncement);
  }
}

export const announcementController = new AnnouncementController();

export namespace AnnouncementController {
  type Announcement = {
    id: string;
    title: string;
    content: string;
    authorId: string;
    author: {
      id: string;
      username: string;
      email: string;
    }
    createdAt: Date;
  };

  export namespace GetAllAnnouncements {
    export type Response = Announcement[];
  }

  export namespace GetAnnouncementById {
    export type Request = {
      id: string;
    };

    export type Response = Announcement | null
  }

  export namespace CreateAnnouncement {
    export type Request = {
      title: string;
      content: string;
      authorId: string;
    };

    export type Response = Announcement
  }
}
