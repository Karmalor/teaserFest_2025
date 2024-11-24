import TicketReceipt from "@/app/(client)/checkout-return/_components/TicketReceipt";
import { formatCurrency } from "@/lib/formatters";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Font,
} from "@react-email/components";
import { Space_Grotesk } from "next/font/google";
import { QRCodeSVG } from "qrcode.react";
import * as React from "react";

interface KoalaWelcomeEmailProps {
  userFirstname: string;
}

type PassReceiptEmailProps = {
  checkoutSession: {
    status: string;
    custom_fields: [
      {
        text: {
          value: string;
        };
      },
    ];
    total_details: {
      amount_discount: number;
      amount_tax: number;
    };
    amount_subtotal: number;
    shipping_cost: {
      amount_total: number;
    };
    amount_total: number;
  };
  user: string;
  purchasedProducts: [
    {
      imgUrl: string;
      name: string;
      price: number;
      quantity: number;
      description: string;
    },
  ];

  email: string;
};

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const PassReceiptEmail = ({
  checkoutSession,
  user,
  purchasedProducts,
  email,
}: PassReceiptEmailProps) => (
  <Html>
    <Head>
      <Font
        fontFamily="Space Grotesk"
        fallbackFontFamily="monospace"
        webFont={{
          url: "https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPbF4C_k3HqU.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Body>
      <Container>
        <div
          className="mb-16 m-0 min-h-full w-full"
          style={{
            backgroundColor: "",
            color: "#333333",
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: "0.15008px",
            lineHeight: "1.5",
            margin: 0,
            padding: "32px 0",
            minHeight: "100%",
            width: "100%",
          }}
        >
          {/* {checkoutSession.status && (
            <TicketReceipt checkoutSuccess={checkoutSession.status} />
          )} */}
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
                    so much for joining us for Teaser Festival 2025! Your
                    tickets are securely stored at www.teaserfest.com, and can
                    be accessed anytime. If you've purchased a weekend pass you
                    can view all of the events that you have access to.
                  </div>
                  <div
                    style={{
                      textAlign: "left",
                      padding: "16px 24px 40px 24px",
                    }}
                  >
                    <a
                      href="/attendee/tickets"
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                        fontWeight: "normal",
                        backgroundColor: "#000000",
                        borderRadius: 4,
                        display: "inline-block",
                        padding: "0px 12px",
                        textDecoration: "none",
                      }}
                    >
                      <p>View Tickets</p>
                    </a>
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
                              {checkoutSession.total_details
                                ?.amount_discount && (
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
                                            style={{
                                              padding: "0px 0px 0px 0px",
                                            }}
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
                                              {/* <br />({promoCode.code}) */}
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
                                            style={{
                                              padding: "0px 0px 0px 0px",
                                            }}
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
                                            style={{
                                              padding: "0px 0px 0px 0px",
                                            }}
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
                                            style={{
                                              padding: "0px 0px 0px 0px",
                                            }}
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
                                                  .amount_total as number) ||
                                                  0) / 100
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
      </Container>
    </Body>
  </Html>
);

PassReceiptEmail.PreviewProps = {
  checkoutSession: {
    status: "suceeded",
    custom_fields: [
      {
        text: {
          value: "Luka",
        },
      },
    ],
    total_details: {
      amount_discount: 2000,
      amount_tax: 8000,
    },
    amount_subtotal: 40000,
    shipping_cost: {
      amount_total: 0,
    },
    amount_total: 48000,
  },
  user: "karmalor@gmail.com",
  purchasedProducts: [
    {
      imgUrl: "/",
      name: "Ticket",
      price: 40000,
      quantity: 1,
      description: "string;",
    },
  ],
  promoCode: {
    code: "VIP20",
  },
  email: "karmalor@gmail.com",
} as PassReceiptEmailProps;

export default PassReceiptEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#000",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
