import React, { useEffect, useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableCaption,
  TableFooter,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Mail, MapPin, Phone, User, BadgeCheck, Settings, Truck, Container, CircleCheck } from "lucide-react";
import { userContext } from "../Authentication/AuthContext";

export const Sales = () => {
  const { bearerToken } = useContext(userContext);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    async function getAllOrders() {
      try {
        const orderResponse = await fetch(
          "https://endearing-creation-production-d435.up.railway.app/orders/allOrders",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );
        if (orderResponse.ok) {
          const orderData = await orderResponse.json();
          console.log(orderData);
          setOrderList(orderData);
        }
      } catch (error) {}
    }

    getAllOrders();
  }, []);

  const orderStatusBadge = [
    {
      ordStat:"PROCESSING",
      color:"#C29E4A",
      icon:Settings
    },
    {
      ordStat:"SHIPPED",
      color:"",
      icon:Container
    },
    {
      ordStat:"DELIVERED",
      color:"green-50",
      icon:Truck
    },
  ]

  const [isActive, setIsActive] = useState(null);
  function activeClick(invoice) {
    setIsActive((prev) => (prev === invoice ? null : invoice));
  }
  return (
    <>
      {orderList.length > 0 ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Id</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total($)</TableHead>
                <TableHead>Pyament Status</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList.map((order) => (
                <React.Fragment key={order.id}>
                  <TableRow
                    onClick={() => activeClick(order.id)}
                    className={`${
                      isActive === order.id ? "bg-[#e6e6e6]" : ""
                    } cursor-pointer`}
                  >
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.firstName}</TableCell>
                    <TableCell>{order.items.length}</TableCell>
                    <TableCell className="">${order.price}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">
                        <CircleCheck data-icon="inline-start" />
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-[#C29E4A]">
                        <Settings data-icon="inline-start" />
                        {order.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                  </TableRow>

                  {/* PREVIEW ROW */}
                  {isActive === order.id && (
                    <TableRow className="border p-4">
                      <TableCell colSpan={5} className="p-4">
                        <Table>
                          <TableCaption>Order Preview.</TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-25">Product Id</TableHead>
                              <TableHead className="w-25"></TableHead>
                              <TableHead className="w-25">Product Name</TableHead>
                              <TableHead className="text-right">Amount ($)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.items.map((products) => (
                              <TableRow key={products.productId}>
                                <TableCell className="font-medium">{products.productId}</TableCell>
                                <TableCell className="font-medium">
                                <div style={{backgroundImage: `url(${products.imageUrl[0].secure_url})`,}}
                        className="size-12 bg-cover bg-center rounded-[5px]"></div>
                                </TableCell>
                                <TableCell>{products.productName}</TableCell>
                                <TableCell className="text-right">{products.price}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TableCell colSpan={3}>Total</TableCell>
                              <TableCell className="text-left">
                                ${order.price}
                              </TableCell>
                            </TableRow>
                          </TableFooter>
                        </Table>
                      </TableCell>
                    </TableRow>
                  )}

                  {/* PREVIEW ROW */}
                  {isActive === order.id && (
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={7} className="p-4">
                      <OrderPreview order={order} />
                    </TableCell>
                  </TableRow>
                )}

                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div>nothing to see here</div>
      )}
    </>
  );
};

function OrderPreview({ order }) {
  return (
    <div className="border rounded-xl p-4 space-y-4">
      <div className="flex flex-wrap gap-2">
        <p className="font-oswald text-2xl">#{order.id}</p>
        <Badge className="bg-[#C29E4A]">
          <Settings data-icon="inline-start" />
          {order.orderStatus}
        </Badge>
      </div>
      <div className="flex gap-4">
        <section className="flex justify-center items-center gap-2">
          <User className="size-4" strokeWidth={1.25} />
          {order.firstName} - {order.lastName}
        </section>
        <section className="flex justify-center items-center gap-2">
          <MapPin className="size-4" strokeWidth={1.25} />
          {order.deliveryAddress}
        </section>
        <section className="flex justify-center items-center gap-2">
          <Mail className="size-4" strokeWidth={1.25} />
          {order.email}
        </section>
        <section className="flex justify-center items-center gap-2">
          <Phone className="size-4" strokeWidth={1.25} />
          {order.phonenumber}
        </section>
      </div>
      <div className="flex flex-wrap gap-2">
        <p className="">Payment Status -</p>
        <Badge className="bg-green-500" variant="destructive">
          <BadgeCheck data-icon="inline-start" />
          {order.paymentStatus}
        </Badge>
      </div>
    </div>
  );
}
