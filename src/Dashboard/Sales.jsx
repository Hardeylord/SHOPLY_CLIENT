import React, { useState } from "react";
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
import { Badge } from "@/Components/ui/badge"
import { Mail, MapPin, Phone, User, BadgeCheck } from "lucide-react";
export const Sales = () => {
  const invoices = [
    {
      customer: "dipo",
      orderStatus: "Processing",
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      items: "2",
    },
    {
      customer: "dunsi",
      orderStatus: "Processing",
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      items: "3",
    },
    {
      customer: "ayo",
      orderStatus: "Shipped",
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      items: "4",
    },
    {
      customer: "ife",
      orderStatus: "Delivered",
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      items: "5",
    },
    {
      customer: "mummy",
      orderStatus: "Processing",
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      items: "6",
    },
    {
      customer: "daddy",
      orderStatus: "Delivered",
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      items: "3",
    },
    {
      customer: "volume",
      orderStatus: "Shipped",
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      items: "2",
    },
  ];

  const [isActive, setIsActive] = useState(null);
  function activeClick(invoice) {
    setIsActive((prev) => (prev === invoice ? null : invoice));
  }
  return (
    <>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Pyament Status</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <React.Fragment key={invoice.invoice}>
                <TableRow
                  onClick={() => activeClick(invoice.invoice)}
                  className={`${
                    isActive === invoice.invoice ? "bg-[#e6e6e6]" : ""
                  } cursor-pointer`}
                >
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.items}</TableCell>
                  <TableCell className="">{invoice.totalAmount}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.orderStatus}</TableCell>
                </TableRow>

                {/* PREVIEW ROW */}
                {isActive === invoice.invoice && (
                  <TableRow className="border p-4">
                    <TableCell colSpan={5} className="p-4">
                      <Table>
                        <TableCaption>Order Preview.</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-25">Product</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                              <TableCell className="font-medium">
                                {invoice.invoice}
                              </TableCell>
                              <TableCell>{invoice.paymentStatus}</TableCell>
                              <TableCell className="text-right">
                                {invoice.totalAmount}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-left">
                              $2,500.00
                            </TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </TableCell>
                  </TableRow>
                )}

                {/* PREVIEW ROW */}
                {isActive === invoice.invoice && (
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={7} className="p-4">
                      <InvoicePreview invoice={invoice} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

function InvoicePreview({ invoice }) {
  return (
    <div className="border rounded-xl p-4 space-y-4">
      <div className="flex flex-wrap gap-2">
        <p className="font-oswald text-2xl">#06060fgdb2828</p>
        <Badge variant="destructive">
        <BadgeCheck data-icon="inline-start" />
        Processing
      </Badge>
      </div>
      <div className="flex gap-4">
        <section className="flex justify-center items-center gap-2">
        <User className="size-4" strokeWidth={1.25}/>
        Adeagbo Adedipupo
        </section>
        <section className="flex justify-center items-center gap-2">
        <MapPin className="size-4" strokeWidth={1.25}/>
        New Cele house 18
        </section>
        <section className="flex justify-center items-center gap-2">
        <Mail className="size-4" strokeWidth={1.25}/>
        ade@gmail.com
        </section>
        <section className="flex justify-center items-center gap-2">
        <Phone className="size-4" strokeWidth={1.25}/>
        09031725065
        </section>
      </div>
      <div className="flex flex-wrap gap-2">
        <p className="">Payment Status -</p>
        <Badge className="bg-green-500" variant="destructive">
        <BadgeCheck data-icon="inline-start" />
        Paid
      </Badge>
      </div>
    </div>
  );
}
