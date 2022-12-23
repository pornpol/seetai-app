import { PrismaClient, Role, OrderStatus } from "@prisma/client";
import { hash } from "bcryptjs";

const db = new PrismaClient();

async function seed() {
  await db.order.deleteMany({});
  await db.user.deleteMany({});
  await db.customer.deleteMany({});

  await db.user.createMany({
    data: [
      {
        name: "admin",
        email: "admin@seetaidiamond.com",
        passwordHash: await hash("admin", 12),
        role: Role.ADMIN,
      },
      {
        name: "sale1",
        email: "sale1@seetaidiamond.com",
        passwordHash: await hash("sale1", 12),
        role: Role.SALESPERSON,
      },
      {
        name: "sale2",
        email: "sale2@seetaidiamond.com",
        passwordHash: await hash("sale2", 12),
        role: Role.SALESPERSON,
      },
      {
        name: "gold",
        email: "gold@seetaidiamond.com",
        passwordHash: await hash("gold", 12),
        role: Role.GOLD,
      },
      {
        name: "diamond",
        email: "diamond@seetaidiamond.com",
        passwordHash: await hash("diamond", 12),
        role: Role.DIAMOND,
      },
      {
        name: "factory",
        email: "factory@seetaidiamond.com",
        passwordHash: await hash("factory", 12),
        role: Role.FACTORY,
      },
    ],
  });

  await db.customer.createMany({
    data: [
      {
        name: "customer1",
      },
      {
        name: "customer2",
      },
    ],
  });

  await db.order.create({
    data: {
      seq: 1,
      images: ["/images/orders/order1.jpg"],
      status: OrderStatus.OPEN,
      user: {
        connect: {
          name: "sale1",
        },
      },
      customer: {
        connect: {
          name: "customer1",
        },
      },
    },
  });

  await db.order.create({
    data: {
      seq: 2,
      images: ["/images/orders/order2.jpg"],
      status: OrderStatus.OPEN,
      user: {
        connect: {
          name: "sale2",
        },
      },
      customer: {
        connect: {
          name: "customer2",
        },
      },
    },
  });

  await db.order.create({
    data: {
      seq: 3,
      images: ["/images/orders/order3.jpg"],
      status: OrderStatus.WIP,
      user: {
        connect: {
          name: "sale1",
        },
      },
      customer: {
        connect: {
          name: "customer1",
        },
      },
    },
  });

  await db.order.create({
    data: {
      seq: 4,
      images: ["/images/orders/order4.jpg"],
      status: OrderStatus.COMPLETED,
      user: {
        connect: {
          name: "sale2",
        },
      },
      customer: {
        connect: {
          name: "customer2",
        },
      },
    },
  });

  await db.order.create({
    data: {
      seq: 5,
      images: ["/images/orders/order5.jpg"],
      status: OrderStatus.CANCELLED,
      user: {
        connect: {
          name: "sale1",
        },
      },
      customer: {
        connect: {
          name: "customer1",
        },
      },
    },
  });

  await db.order.create({
    data: {
      seq: 6,
      images: ["/images/orders/order6.jpg"],
      status: OrderStatus.PAID,
      user: {
        connect: {
          name: "sale2",
        },
      },
      customer: {
        connect: {
          name: "customer2",
        },
      },
    },
  });
}

seed();
