import { prisma } from './../lib/prisma';

class AnnouncementService {
  async getAllAnnouncements(): Promise<AnnouncementService.AnnouncementService.Announcement[]> {
    return await prisma.announcement.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        authorId: true,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
  }

  async getAnnouncementById(id: string): Promise<AnnouncementService.AnnouncementService.Announcement | null> {
    return await prisma.announcement.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        title: true,
        content: true,
        authorId: true,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        createdAt: true,
      }
    })
  }

  async createAnnouncement(request: AnnouncementService.AnnouncementService.Request): Promise<AnnouncementService.AnnouncementService.Announcement> {
    return await prisma.announcement.create({
      data: {
        title: request.title,
        content: request.content,
        authorId: request.authorId
      },
      select: {
        id: true,
        title: true,
        content: true,
        authorId: true,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        createdAt: true,
      }
    })
  }
}

export const announcementService = new AnnouncementService();

export namespace AnnouncementService {
  export namespace AnnouncementService {
    export type Request = {
      title: string;
      content: string;
      authorId: string;
    }

    export type Announcement = {
      id: string
      title: string
      content: string
      authorId: string
      author: {
        id: string
        username: string
        email: string
      }
      createdAt: Date
    }
  }
}