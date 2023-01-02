import { useState } from "react";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import OrderDetail, {
  links as orderDetailLink,
} from "~/components/order/detail";
import { db } from "~/data/db.server";

import { saveImage, deleteImage } from "~/data/order.server";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function OrderPage() {
  const { item, customers } = useLoaderData();
  const [seq, setSeq] = useState(item.seq);

  return (
    <main>
      <Breadcrumb aria-label="Default breadcrumb example" className="mb-4">
        <Breadcrumb.Item icon={HiHome}>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/orders">Orders</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <input
            type="text"
            defaultValue={seq}
            onChange={(e) => setSeq(e.target.value)}
            className="w-16 h-8 rounded"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // FIXME: find better way to redirect
                window.location.href = `/orders/seq/${seq}`;
              }
            }}
          />
          {/* {seq} */}
        </Breadcrumb.Item>
      </Breadcrumb>
      <OrderDetail item={item} customers={customers} />
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

  const customers = await db.customer.findMany({
    where: {
      active: true,
    },
    select: {
      id: true,
      name: true,
      active: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (id === "new") {
    return { item: {}, customers };
  } else {
    const item = await db.order.findUnique({
      where: {
        id: id as string,
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return { item, customers };
  }
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
  // console.log(body);

  if (request.method === "PUT") {
    // current images
    const images = body.images.toString().split(",");

    // new images
    const newImages = body.new_images
      .toString()
      .split("data:image/jpeg;base64,")
      .slice(1); // remove the first empty string
    const newImageUrls = newImages.map((image) => saveImage(image, id)); // TODO: s3

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

    // update order
    await db.order.update({
      where: {
        id: id as string,
      },
      data: {
        images: [...images, ...newImageUrls],
        description: body.description?.toString(),
        // userId: body.userId.toString(),
        customerId: body.customerId?.toString(),
        goldNote: body.goldNote?.toString(),
        diamondNote: body.diamondNote?.toString(),
        factoryListNote: body.factoryListNote?.toString(),
        factoryCostNote: body.factoryCostNote?.toString(),
      },
    });
  } else if (request.method === "POST") {
    // TODO: find better way to get last seq
    const lastOrder = await db.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
      select: {
        seq: true,
      },
    });

    const newOrder = await db.order.create({
      data: {
        description: body.description?.toString(),
        seq: (lastOrder[0]?.seq ?? 0) + 1,
        customerId: body.customerId?.toString(),
        goldNote: body.goldNote?.toString(),
        diamondNote: body.diamondNote?.toString(),
        factoryListNote: body.factoryListNote?.toString(),
        factoryCostNote: body.factoryCostNote?.toString(),
      },
    });

    const newImages = body.new_images
      .toString()
      .split("data:image/jpeg;base64,")
      .slice(1); // remove the first empty string
    const newImageUrls = newImages.map((image) =>
      saveImage(image, newOrder.id)
    );

    console.log(newImageUrls);

    await db.order.update({
      where: {
        id: newOrder.id,
      },
      data: {
        images: newImageUrls,
      },
    });
  }

  return redirect("/orders");
}

export function links() {
  return [...orderDetailLink()];
}
