import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import OrderDetail, {
  links as orderDetailLink,
} from "~/components/order/detail";
import { db } from "~/data/db.server";
import { Role } from "@prisma/client";

import { saveImage, deleteImage } from "~/data/order.server";

export default function OrderPage() {
  const { item, sales, customers } = useLoaderData();

  return (
    <main>
      <OrderDetail item={item} sales={sales} customers={customers} />
    </main>
  );
}

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) {
  const { id } = params;

  const item = await db.order.findUnique({
    where: {
      id: id as string,
    },
    include: {
      user: true,
      customer: true,
    },
  });

  const sales = await db.user.findMany({
    where: {
      role: Role.SALESPERSON,
      // active: true,
    },
    select: {
      id: true,
      name: true,
      active: true,
    },
  });

  const customers = await db.customer.findMany({
    where: {
      active: true,
    },
    select: {
      id: true,
      name: true,
      active: true,
    },
  });

  return { item, sales, customers };
}

export async function action({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) {
  const { id } = params;
  const formData = await request.formData();
  const body = Object.fromEntries(formData);

  // current images
  const images = body.images.toString().split(",");
  const dbImages = await db.order.findFirst({
    where: {
      id: id as string,
    },
    select: {
      images: true,
    },
  });

  dbImages?.images.forEach((image) => {
    !images.includes(image) && deleteImage(image);
  });

  // new images
  const newImages = body.new_images
    .toString()
    .split("data:image/jpeg;base64,")
    .slice(1); // remove the first empty string
  const newImageUrls = newImages.map((image) => saveImage(image, id)); // TODO: s3

  // update order
  await db.order.update({
    where: {
      id: id as string,
    },
    data: {
      images: [...images, ...newImageUrls],
      description: body.description.toString(),
      userId: body.userId.toString(),
      customerId: body.customerId.toString(),
      goldNote: body.goldNote.toString(),
      diamondNote: body.diamondNote.toString(),
      factoryListNote: body.factoryListNote.toString(),
      factoryCostNote: body.factoryCostNote.toString(),
    },
  });

  return redirect("/orders");
}

export function links() {
  return [...orderDetailLink()];
}
