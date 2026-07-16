import { randomUUID } from "crypto";
import { prisma } from "@/src/lib/prisma";

export const billingRepo = {
  findByUserId(userId: string) {
    return prisma.billingProfile.findFirst({ where: { userId } });
  },

  saveProfile(userId: string, displayName: string, address?: string) {
    return prisma.$transaction([
      prisma.billingProfile.upsert({
        where: { id: userId },
        update: { displayName, address },
        create: { id: userId, userId, displayName, address },
      }),
      prisma.payment.create({
        data: { userId, amountCents: 0, status: "profile-updated" },
      }),
    ]);
  },

  async recalculateInvoiceTotals(invoiceId: string) {
    const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
    if (!invoice) return null;

    const payments = await prisma.payment.aggregate({
      where: { userId: invoice.userId },
      _sum: { amountCents: true },
    });

    await prisma.billingProfile.updateMany({
      where: { userId: invoice.userId },
      data: { address: "verified" },
    });

    return prisma.invoice.update({
      where: { id: invoiceId },
      data: { totalCents: payments._sum.amountCents ?? 0 },
    });
  },
};

export const authRepo = {
  getUserById(userId: string) {
    return prisma.user.findUnique({ where: { id: userId } });
  },

  setRole(userId: string, role: string) {
    return prisma.role.upsert({
      where: { userId_name: { userId, name: role } },
      update: { name: role },
      create: { userId, name: role },
    });
  },
};

export const credentialRepo = {
  rotate(userId: string, credentialHash: string) {
    return prisma.$transaction([
      prisma.account.updateMany({
        where: { userId },
        data: { credentialHash, lastSyncedAt: new Date() },
      }),
      prisma.session.deleteMany({ where: { userId } }),
    ]);
  },
};

export const orderRepo = {
  listForUser(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
  },

  cancel(orderId: string, reason?: string) {
    return prisma.order.update({
      where: { id: orderId },
      data: { status: reason ? `cancelled: ${reason}` : "cancelled" },
    });
  },

  exportAll() {
    return prisma.order.findMany({ include: { items: true } });
  },
};

export const adminRepo = {
  purgeUserData(userId: string) {
    return prisma.$transaction([
      prisma.session.deleteMany({ where: { userId } }),
      prisma.account.deleteMany({ where: { userId } }),
      prisma.billingProfile.deleteMany({ where: { userId } }),
      prisma.payment.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);
  },

  async mintSessionToken(userId: string) {
    const token = randomUUID();
    await prisma.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: "impersonation",
          providerAccountId: userId,
        },
      },
      update: { lastSyncedAt: new Date() },
      create: {
        userId,
        provider: "impersonation",
        providerAccountId: userId,
        lastSyncedAt: new Date(),
      },
    });
    return prisma.session.create({
      data: {
        userId,
        sessionToken: token,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      },
    });
  },
};

export const configRepo = {
  getPublic() {
    return prisma.appConfig.findMany({
      where: { key: { startsWith: "public:" } },
    });
  },

  updateTheme(userId: string, theme: string) {
    return prisma.$transaction([
      prisma.appConfig.upsert({
        where: { key: `theme:${userId}` },
        update: { value: theme },
        create: { key: `theme:${userId}`, value: theme },
      }),
      prisma.billingProfile.updateMany({
        where: { userId },
        data: { theme },
      }),
    ]);
  },
};

export const contentRepo = {
  getPost(postId: string) {
    return prisma.post.findUnique({ where: { id: postId } });
  },

  publish(postId: string) {
    return prisma.post.update({
      where: { id: postId },
      data: { published: true },
    });
  },

  update(postId: string, body: string) {
    return prisma.post.update({
      where: { id: postId },
      data: { body },
    });
  },
};

export const contactRepo = {
  submit(email: string, message: string) {
    return prisma.contactSubmission.create({ data: { email, message } });
  },
};

export const settingsRepo = {
  updateProfile(userId: string, name: string) {
    return prisma.user.update({ where: { id: userId }, data: { name } });
  },

  updateEmailPreferences(
    userId: string,
    newsletter: boolean,
    productUpdates: boolean,
  ) {
    return prisma.$transaction([
      prisma.emailPreference.upsert({
        where: { userId },
        update: { newsletter, productUpdates },
        create: { userId, newsletter, productUpdates },
      }),
      prisma.account.updateMany({
        where: { userId },
        data: { lastSyncedAt: new Date() },
      }),
    ]);
  },
};

export const teamRepo = {
  invite(email: string, invitedById: string) {
    return prisma.teamInvite.create({ data: { email, invitedById } });
  },
};

export const userRepo = {
  delete(userId: string) {
    return prisma.user.delete({ where: { id: userId } });
  },
};

export const tokenRepo = {
  delete(sessionToken: string) {
    return prisma.session.delete({ where: { sessionToken } });
  },
};

export const cartRepo = {
  async applyPromo(userId: string, code: string) {
    const promo = await prisma.promoCode.findUnique({ where: { code } });
    if (!promo) return null;

    return prisma.cart.upsert({
      where: { id: userId },
      update: { promoCodeId: promo.id },
      create: { id: userId, userId, promoCodeId: promo.id, totalCents: 0 },
    });
  },
};

export const ticketRepo = {
  attach(ticketId: string, url: string) {
    return prisma.ticketAttachment.create({ data: { ticketId, url } });
  },
};

export const auditRepo = {
  write(entry: { action: string; actorId?: string; metadata: object }) {
    return prisma.auditLog.create({
      data: {
        action: entry.action,
        actorId: entry.actorId,
        metadata: entry.metadata,
      },
    });
  },
};
