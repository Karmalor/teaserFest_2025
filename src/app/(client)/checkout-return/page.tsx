import { useShoppingCart } from "@/context/ShoppingCartContext";
import { line } from "drizzle-orm/pg-core";
import { notFound } from "next/navigation";
import React, { useEffect } from "react";
import Stripe from "stripe";
import storeItems from "../../../db/items.json";
import { formatCurrency } from "@/lib/formatters";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { check } from "drizzle-orm/mysql-core";
import TicketReceipt from "./_components/TicketReceipt";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  stripeAccount: process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID as string,
});

const PurchaseSuccessPage = async ({
  searchParams,
}: {
  searchParams: { session_id: string };
}) => {
  const user = await currentUser();

  const checkoutSession = await stripe.checkout.sessions.retrieve(
    searchParams.session_id,
    {
      expand: ["total_details.breakdown.discounts.discount"],
    }
  );

  console.log(checkoutSession.status);

  const lineItems = await stripe.checkout.sessions.listLineItems(
    searchParams.session_id
  );

  const coupon =
    checkoutSession.total_details?.breakdown?.discounts[0]?.discount?.coupon
      .name;

  const code =
    checkoutSession?.total_details?.breakdown?.discounts[0]?.discount
      .promotion_code;

  let promoCode = { code: "" };

  if (code) {
    promoCode: await stripe.promotionCodes.retrieve(code as string);
    return promoCode;
  }

  let purchasedProducts = [];

  for (let element of lineItems.data) {
    let item = storeItems.find((i) => i.name === element.description);
    purchasedProducts.push({
      price_data: {
        currency: "usd",
        unit_amount: item!.price,
        product_data: {
          name: item!.name,
          images: [item!.imgUrl],
        },
      },
      quantity: element.quantity,
      name: item?.name,
      price: item?.price,
      description: item?.description,
      imgUrl: item?.imgUrl,
    });
  }

  return (
    <div>
      <div
        className="mb-16 m-0 min-h-full w-full"
        // style={{
        //   backgroundColor: "",
        //   color: "#333333",
        //   fontFamily:
        //     '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif',
        //   fontSize: 16,
        //   fontWeight: 400,
        //   letterSpacing: "0.15008px",
        //   lineHeight: "1.5",
        //   margin: 0,
        //   padding: "32px 0",
        //   minHeight: "100%",
        //   width: "100%",
        // }}
      >
        {checkoutSession.status && (
          <TicketReceipt checkoutSuccess={checkoutSession.status} />
        )}
        <table
          align="center"
          width="100%"
          style={{
            margin: "0 auto",
            maxWidth: 600,
            backgroundColor: "#FFF0F0",
            borderRadius: 8,
            border: "1px solid #000000",
          }}
          role="presentation"
          cellSpacing={0}
          cellPadding={0}
          border={0}
        >
          <tbody>
            <tr style={{ width: "100%" }}>
              <td>
                <div style={{ padding: "16px 24px 24px 24px" }}>
                  <table
                    align="center"
                    width="100%"
                    cellPadding={0}
                    border={0}
                    style={{ tableLayout: "fixed", borderCollapse: "collapse" }}
                  >
                    <tbody style={{ width: "100%" }}>
                      <tr style={{ width: "100%" }}>
                        <td
                          style={{
                            boxSizing: "content-box",
                            verticalAlign: "middle",
                            paddingLeft: 0,
                            paddingRight: 0,
                          }}
                        >
                          <div style={{ padding: "0px 0px 0px 0px" }}>
                            <h2
                              className="font-bold text-3xl"
                              // style={{
                              //   fontWeight: "normal",
                              //   textAlign: "left",
                              //   margin: 0,
                              //   fontSize: 24,
                              //   padding: "0px 0px 0px 0px",
                              // }}
                            >
                              Teaser Fest 2025
                            </h2>
                          </div>
                        </td>
                        <td
                          style={{
                            boxSizing: "content-box",
                            verticalAlign: "middle",
                            paddingLeft: 0,
                            paddingRight: 0,
                          }}
                        >
                          <div style={{ padding: "0px 0px 0px 0px" }}>
                            <div
                              style={{
                                color: "#808080",
                                fontSize: 14,
                                fontWeight: "normal",
                                textAlign: "right",
                                padding: "0px 0px 0px 0px",
                              }}
                            >
                              {/* #103571871 */}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h3
                  style={{
                    fontWeight: "normal",
                    textAlign: "left",
                    margin: 0,
                    fontSize: 20,
                    padding: "16px 24px 0px 24px",
                  }}
                >
                  Thank you for your purchase!
                </h3>
                <div
                  style={{
                    color: "#404040",
                    fontSize: 16,
                    fontWeight: "normal",
                    textAlign: "left",
                    padding: "16px 24px 16px 24px",
                  }}
                >
                  Hi {checkoutSession.custom_fields[0].text?.value}, Thank you
                  so much for joining us for Teser Festival 2025!
                </div>
                <div
                  style={{ textAlign: "left", padding: "16px 24px 40px 24px" }}
                >
                  {user ? (
                    <Link
                      href="/attendee/tickets"
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                        fontWeight: "normal",
                        backgroundColor: "#000000",
                        borderRadius: 4,
                        display: "inline-block",
                        padding: "16px 32px",
                        textDecoration: "none",
                      }}
                    >
                      {" "}
                      <h1>View Account</h1>
                    </Link>
                  ) : (
                    <Link
                      href="/sign-up"
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                        fontWeight: "normal",
                        backgroundColor: "#000000",
                        borderRadius: 4,
                        display: "inline-block",
                        padding: "16px 32px",
                        textDecoration: "none",
                      }}
                    >
                      <h1>Create your account</h1>
                    </Link>
                  )}
                </div>
                <h3
                  style={{
                    fontWeight: "normal",
                    textAlign: "left",
                    margin: 0,
                    fontSize: 20,
                    padding: "16px 24px 0px 24px",
                  }}
                >
                  Order summary
                </h3>
                {purchasedProducts.map((item, i) => (
                  <div key={i} style={{ padding: "16px 24px 16px 24px" }}>
                    <div style={{ padding: "0px 0px 0px 0px" }}>
                      <div style={{ padding: "0px 0px 0px 0px" }}>
                        <table
                          align="center"
                          width="100%"
                          cellPadding={0}
                          border={0}
                          style={{
                            tableLayout: "fixed",
                            borderCollapse: "collapse",
                          }}
                        >
                          <tbody style={{ width: "100%" }}>
                            <tr style={{ width: "100%" }}>
                              <td
                                style={{
                                  boxSizing: "content-box",
                                  verticalAlign: "middle",
                                  paddingLeft: 0,
                                  paddingRight: "10.666666666666666px",
                                  width: 64,
                                }}
                              >
                                <div style={{ padding: "4px 4px 4px 4px" }}>
                                  <div style={{ padding: "0px 0px 0px 0px" }}>
                                    <div
                                      style={{
                                        padding: "0px 0px 0px 0px",
                                        textAlign: "left",
                                      }}
                                    >
                                      <img
                                        alt=""
                                        src={item.imgUrl}
                                        style={{
                                          outline: "none",
                                          border: "none",
                                          textDecoration: "none",
                                          verticalAlign: "middle",
                                          display: "inline-block",
                                          maxWidth: "100%",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td
                                style={{
                                  boxSizing: "content-box",
                                  verticalAlign: "middle",
                                  paddingLeft: "5.333333333333333px",
                                  paddingRight: "5.333333333333333px",
                                }}
                              >
                                <div style={{ padding: "0px 0px 0px 0px" }}>
                                  <div
                                    style={{
                                      fontSize: 16,
                                      fontWeight: "bold",
                                      textAlign: "left",
                                      padding: "0px 0px 4px 0px",
                                    }}
                                  >
                                    {item.name} x {item.quantity}
                                  </div>
                                  <div
                                    style={{
                                      color: "#808080",
                                      fontSize: 14,
                                      fontWeight: "normal",
                                      textAlign: "left",
                                      padding: "0px 0px 0px 0px",
                                    }}
                                  >
                                    {item.description}
                                  </div>
                                </div>
                              </td>
                              <td
                                style={{
                                  boxSizing: "content-box",
                                  verticalAlign: "middle",
                                  paddingLeft: "10.666666666666666px",
                                  paddingRight: 0,
                                  width: 80,
                                }}
                              >
                                <div style={{ padding: "0px 0px 0px 0px" }}>
                                  <div
                                    style={{
                                      fontSize: 16,
                                      fontWeight: "bold",
                                      textAlign: "right",
                                      padding: "0px 0px 0px 0px",
                                    }}
                                  >
                                    {formatCurrency(
                                      ((item.price || 0) / 100) *
                                        (item.quantity || 1)
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ padding: "8px 0px 8px 0px" }}>
                  <hr
                    style={{
                      width: "100%",
                      border: "none",
                      borderTop: "1px solid #000000",
                      margin: 0,
                    }}
                  />
                </div>

                <div style={{ padding: "16px 24px 16px 24px" }}>
                  <table
                    align="center"
                    width="100%"
                    cellPadding={0}
                    border={0}
                    style={{ tableLayout: "fixed", borderCollapse: "collapse" }}
                  >
                    <tbody style={{ width: "100%" }}>
                      <tr style={{ width: "100%" }}>
                        <td
                          style={{
                            boxSizing: "content-box",
                            verticalAlign: "middle",
                            paddingLeft: 0,
                            paddingRight: 8,
                          }}
                        >
                          <div style={{ padding: "0px 0px 0px 0px" }} />
                        </td>
                        <td
                          style={{
                            boxSizing: "content-box",
                            verticalAlign: "middle",
                            paddingLeft: 8,
                            paddingRight: 0,
                          }}
                        >
                          <div style={{ padding: "0px 0px 0px 0px" }}>
                            {promoCode.code && (
                              <div style={{ padding: "4px 0px 4px 0px" }}>
                                <table
                                  align="center"
                                  width="100%"
                                  cellPadding={0}
                                  border={0}
                                  style={{
                                    tableLayout: "fixed",
                                    borderCollapse: "collapse",
                                  }}
                                >
                                  <tbody style={{ width: "100%" }}>
                                    <tr style={{ width: "100%" }}>
                                      <td
                                        style={{
                                          boxSizing: "content-box",
                                          verticalAlign: "middle",
                                          paddingLeft: 0,
                                          paddingRight: 0,
                                        }}
                                      >
                                        <div
                                          style={{ padding: "0px 0px 0px 0px" }}
                                        >
                                          <div
                                            style={{
                                              color: "#808080",
                                              fontSize: 16,
                                              fontWeight: "normal",
                                              textAlign: "left",
                                              padding: "0px 0px 0px 0px",
                                            }}
                                          >
                                            Discount
                                            <br />({promoCode.code})
                                          </div>
                                        </div>
                                      </td>
                                      <td
                                        style={{
                                          boxSizing: "content-box",
                                          verticalAlign: "middle",
                                          paddingLeft: 0,
                                          paddingRight: 0,
                                        }}
                                      >
                                        <div
                                          style={{ padding: "0px 0px 0px 0px" }}
                                        >
                                          <div
                                            style={{
                                              fontSize: 16,
                                              fontWeight: "bold",
                                              textAlign: "right",
                                              padding: "0px 0px 0px 0px",
                                            }}
                                          >
                                            {formatCurrency(
                                              (checkoutSession.total_details
                                                ?.amount_discount as number) /
                                                100
                                            )}
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            )}
                            <div style={{ padding: "4px 0px 4px 0px" }}>
                              <table
                                align="center"
                                width="100%"
                                cellPadding={0}
                                border={0}
                                style={{
                                  tableLayout: "fixed",
                                  borderCollapse: "collapse",
                                }}
                              >
                                <tbody style={{ width: "100%" }}>
                                  <tr style={{ width: "100%" }}>
                                    <td
                                      style={{
                                        boxSizing: "content-box",
                                        verticalAlign: "middle",
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                      }}
                                    >
                                      <div
                                        style={{ padding: "0px 0px 0px 0px" }}
                                      >
                                        <div
                                          style={{
                                            color: "#808080",
                                            fontSize: 16,
                                            fontWeight: "normal",
                                            textAlign: "left",
                                            padding: "0px 0px 0px 0px",
                                          }}
                                        >
                                          Subtotal
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      style={{
                                        boxSizing: "content-box",
                                        verticalAlign: "middle",
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                      }}
                                    >
                                      <div
                                        style={{ padding: "0px 0px 0px 0px" }}
                                      >
                                        <div
                                          style={{
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            textAlign: "right",
                                            padding: "0px 0px 0px 0px",
                                          }}
                                        >
                                          {formatCurrency(
                                            (checkoutSession.amount_subtotal as number) /
                                              100
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            {checkoutSession.shipping_cost !== null && (
                              <div style={{ padding: "4px 0px 4px 0px" }}>
                                <table
                                  align="center"
                                  width="100%"
                                  cellPadding={0}
                                  border={0}
                                  style={{
                                    tableLayout: "fixed",
                                    borderCollapse: "collapse",
                                  }}
                                >
                                  <tbody style={{ width: "100%" }}>
                                    <tr style={{ width: "100%" }}>
                                      <td
                                        style={{
                                          boxSizing: "content-box",
                                          verticalAlign: "middle",
                                          paddingLeft: 0,
                                          paddingRight: 0,
                                        }}
                                      >
                                        <div
                                          style={{ padding: "0px 0px 0px 0px" }}
                                        >
                                          <div
                                            style={{
                                              color: "#808080",
                                              fontSize: 16,
                                              fontWeight: "normal",
                                              textAlign: "left",
                                              padding: "0px 0px 0px 0px",
                                            }}
                                          >
                                            Shipping
                                          </div>
                                        </div>
                                      </td>
                                      <td
                                        style={{
                                          boxSizing: "content-box",
                                          verticalAlign: "middle",
                                          paddingLeft: 0,
                                          paddingRight: 0,
                                        }}
                                      >
                                        <div
                                          style={{ padding: "0px 0px 0px 0px" }}
                                        >
                                          <div
                                            style={{
                                              fontSize: 16,
                                              fontWeight: "bold",
                                              textAlign: "right",
                                              padding: "0px 0px 0px 0px",
                                            }}
                                          >
                                            {formatCurrency(
                                              ((checkoutSession.shipping_cost
                                                .amount_total as number) || 0) /
                                                100
                                            )}
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            )}
                            <div style={{ padding: "4px 0px 4px 0px" }}>
                              <table
                                align="center"
                                width="100%"
                                cellPadding={0}
                                border={0}
                                style={{
                                  tableLayout: "fixed",
                                  borderCollapse: "collapse",
                                }}
                              >
                                <tbody style={{ width: "100%" }}>
                                  <tr style={{ width: "100%" }}>
                                    <td
                                      style={{
                                        boxSizing: "content-box",
                                        verticalAlign: "middle",
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                      }}
                                    >
                                      <div
                                        style={{ padding: "0px 0px 0px 0px" }}
                                      >
                                        <div
                                          style={{
                                            color: "#808080",
                                            fontSize: 16,
                                            fontWeight: "normal",
                                            textAlign: "left",
                                            padding: "0px 0px 0px 0px",
                                          }}
                                        >
                                          Taxes
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      style={{
                                        boxSizing: "content-box",
                                        verticalAlign: "middle",
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                      }}
                                    >
                                      <div
                                        style={{ padding: "0px 0px 0px 0px" }}
                                      >
                                        <div
                                          style={{
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            textAlign: "right",
                                            padding: "0px 0px 0px 0px",
                                          }}
                                        >
                                          {formatCurrency(
                                            (checkoutSession.total_details
                                              ?.amount_tax as number) / 100
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div style={{ padding: "16px 0px 16px 0px" }}>
                              {/* <hr
                              style={{
                                width: "100%",
                                border: "none",
                                borderTop: "1px solid #EEEEEE",
                                margin: 0,
                              }}
                            /> */}
                            </div>
                            <div style={{ padding: "4px 0px 4px 0px" }}>
                              <table
                                align="center"
                                width="100%"
                                cellPadding={0}
                                border={0}
                                style={{
                                  tableLayout: "fixed",
                                  borderCollapse: "collapse",
                                }}
                              >
                                <tbody style={{ width: "100%" }}>
                                  <tr style={{ width: "100%" }}>
                                    <td
                                      style={{
                                        boxSizing: "content-box",
                                        verticalAlign: "middle",
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                      }}
                                    >
                                      <div
                                        style={{ padding: "0px 0px 0px 0px" }}
                                      >
                                        <div
                                          style={{
                                            color: "#808080",
                                            fontSize: 16,
                                            fontWeight: "normal",
                                            textAlign: "left",
                                            padding: "0px 0px 0px 0px",
                                          }}
                                        >
                                          Total
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      style={{
                                        boxSizing: "content-box",
                                        verticalAlign: "middle",
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                      }}
                                    >
                                      <div
                                        style={{ padding: "0px 0px 0px 0px" }}
                                      >
                                        <div
                                          style={{
                                            fontSize: 21,
                                            fontWeight: "bold",
                                            textAlign: "right",
                                            padding: "0px 0px 0px 0px",
                                          }}
                                        >
                                          {formatCurrency(
                                            (checkoutSession.amount_total ||
                                              0) / 100
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* <h3
                style={{
                  fontWeight: "normal",
                  textAlign: "left",
                  margin: 0,
                  fontSize: 20,
                  padding: "40px 24px 24px 24px",
                }}
              >
                Customer information
              </h3>
              <div style={{ padding: "16px 24px 16px 24px" }}>
                <table
                  align="center"
                  width="100%"
                  cellPadding={0}
                  border={0}
                  style={{ tableLayout: "fixed", borderCollapse: "collapse" }}
                >
                  <tbody style={{ width: "100%" }}>
                    <tr style={{ width: "100%" }}>
                      <td
                        style={{
                          boxSizing: "content-box",
                          verticalAlign: "middle",
                          paddingLeft: 0,
                          paddingRight: 0,
                        }}
                      >
                        <div style={{ padding: "0px 0px 0px 0px" }}>
                          <div
                            style={{
                              fontSize: 16,
                              fontWeight: "bold",
                              textAlign: "left",
                              padding: "0px 0px 8px 0px",
                            }}
                          >
                            Shipping address
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: "normal",
                              textAlign: "left",
                              padding: "0px 0px 0px 0px",
                            }}
                          >
                            123 Main St New York, NY 10002
                          </div>
                        </div>
                      </td>
                      <td
                        style={{
                          boxSizing: "content-box",
                          verticalAlign: "middle",
                          paddingLeft: 0,
                          paddingRight: 0,
                        }}
                      >
                        <div style={{ padding: "0px 0px 0px 0px" }}>
                          <div
                            style={{
                              fontSize: 16,
                              fontWeight: "bold",
                              textAlign: "left",
                              padding: "0px 0px 8px 0px",
                            }}
                          >
                            Billing address
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: "normal",
                              textAlign: "left",
                              padding: "0px 0px 0px 0px",
                            }}
                          >
                            123 Main St New York, NY 10002
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "left",
                  padding: "24px 24px 8px 24px",
                }}
              >
                Shipping method
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: "normal",
                  textAlign: "left",
                  padding: "0px 24px 48px 24px",
                }}
              >
                Ground – Standard
              </div>
              <div style={{ padding: "16px 0px 16px 0px" }}>
                <hr
                  style={{
                    width: "100%",
                    border: "none",
                    borderTop: "1px solid #EEEEEE",
                    margin: 0,
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: "normal",
                  textAlign: "left",
                  padding: "16px 24px 16px 24px",
                }}
              >
                If you have any questions, just reply to this email.
              </div> */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
