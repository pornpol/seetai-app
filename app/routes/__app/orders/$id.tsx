import { redirect } from "@remix-run/node";
import { useFormAction, useLoaderData } from "@remix-run/react";
import OrderDetail, {
  links as orderDetailLink,
} from "~/components/order/detail";
import { db } from "~/data/db.server";

import { saveImage } from "~/data/order.server";

export default function OrderPage() {
  const { item } = useLoaderData();

  return (
    <main>
      <OrderDetail item={item} />
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
  });

  return { item };
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

  const images = body.images.toString().split(",");
  const newImages = body.new_images
    .toString()
    .split("data:image/jpeg;base64,")
    .slice(1); // remove the first empty string

  const newImageUrls = newImages.map((image) => saveImage(image, id));

  // console.log(id);
  // console.log(images);
  // console.log(newImages);
  console.log(newImageUrls);

  await db.order.update({
    where: {
      id: id as string,
    },
    data: {
      images: [...images, ...newImageUrls],
    },
  });

  return redirect("/orders");
}

export function links() {
  return [...orderDetailLink()];
}
