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
} from "@react-email/components";
import { QRCodeSVG } from "qrcode.react";
import * as React from "react";

interface KoalaWelcomeEmailProps {
  userFirstname: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const KoalaWelcomeEmail = ({
  userFirstname,
}: KoalaWelcomeEmailProps) => (
  <div
    style={{
      backgroundColor: "#F0f0f0",
      color: "#333333",
      fontFamily:
        '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif',
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
                          style={{
                            fontWeight: "normal",
                            textAlign: "left",
                            margin: 0,
                            fontSize: 24,
                            padding: "0px 0px 0px 0px",
                          }}
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
                          #103571871
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
              Hi there, We are preparing your package. Your tracking number will
              be generated once the package is ready to ship.
            </div>
            <div style={{ textAlign: "left", padding: "16px 24px 40px 24px" }}>
              <a
                href="https://example.usewaypoint.com/orders/103571871"
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
                target="_blank"
              >
                <span>
                  {/*[if mso
                ]><i
                  style="letter-spacing: 32px;mso-font-width:-100%;mso-text-raise:48"
                  hidden
                  >&nbsp;</i
                ><!
              [endif]*/}
                </span>
                <span>View your order</span>
                <span>
                  {/*[if mso
                ]><i
                  style="letter-spacing: 32px;mso-font-width:-100%"
                  hidden
                  >&nbsp;</i
                ><!
              [endif]*/}
                </span>
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
            <div style={{ padding: "16px 24px 16px 24px" }}>
              <div style={{ padding: "0px 0px 0px 0px" }}>
                <div style={{ padding: "0px 0px 0px 0px" }}>
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
                                  src="https://d1iiu589g39o6c.cloudfront.net/live/platforms/platform_A9wwKSL6EV6orh6f/images/wptemplateimage_FBfTeYhbdXtqYpCA/kiran-ck-6rXpQzfCYlw-unsplash.jpg"
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
                              Unbranded Pen x 5
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
                              Black / Black ink
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
                              $25.00
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
                                  <div style={{ padding: "0px 0px 0px 0px" }}>
                                    <div
                                      style={{
                                        color: "#808080",
                                        fontSize: 16,
                                        fontWeight: "normal",
                                        textAlign: "left",
                                        padding: "0px 0px 0px 0px",
                                      }}
                                    >
                                      Discount (BLKFRI)
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
                                        textAlign: "right",
                                        padding: "0px 0px 0px 0px",
                                      }}
                                    >
                                      $5.00
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
                                  <div style={{ padding: "0px 0px 0px 0px" }}>
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
                                  <div style={{ padding: "0px 0px 0px 0px" }}>
                                    <div
                                      style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        textAlign: "right",
                                        padding: "0px 0px 0px 0px",
                                      }}
                                    >
                                      $25.00
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
                                  <div style={{ padding: "0px 0px 0px 0px" }}>
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
                                  <div style={{ padding: "0px 0px 0px 0px" }}>
                                    <div
                                      style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        textAlign: "right",
                                        padding: "0px 0px 0px 0px",
                                      }}
                                    >
                                      $5.00
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
                                  <div style={{ padding: "0px 0px 0px 0px" }}>
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
                                  <div style={{ padding: "0px 0px 0px 0px" }}>
                                    <div
                                      style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        textAlign: "right",
                                        padding: "0px 0px 0px 0px",
                                      }}
                                    >
                                      $0.00
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
                                  <div style={{ padding: "0px 0px 0px 0px" }}>
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
                                  <div style={{ padding: "0px 0px 0px 0px" }}>
                                    <div
                                      style={{
                                        fontSize: 21,
                                        fontWeight: "bold",
                                        textAlign: "right",
                                        padding: "0px 0px 0px 0px",
                                      }}
                                    >
                                      $30.00
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
            <h3
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
              <QRCodeSVG
                size={250}
                value="123ybhinfrv9pubqvrojabervoabva"
                bgColor="#FFF0F0"
                fgColor="#000"
                imageSettings={{
                  height: 24,
                  width: 36,
                  src: "/TeaserFest Vintage Logo 2025_v9.png",
                  excavate: true,
                }}
                className="w-full object-fill"
              ></QRCodeSVG>
              If you have any questions, just reply to this email.
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

KoalaWelcomeEmail.PreviewProps = {
  userFirstname: "Performer",
} as KoalaWelcomeEmailProps;

export default KoalaWelcomeEmail;

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
