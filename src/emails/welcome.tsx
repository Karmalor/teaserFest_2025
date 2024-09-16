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
import Image from "next/image";
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
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <img
          src="https://utfs.io/f/664bd7b9-10c4-4224-8c35-4aa16da64930-qr0ytm.png"
          width={170}
          height={50}
          alt="Teaser Fest Logo"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Thank you so much for applying to perform in Teaser Festival 2025.
          Your application is currently being reviewed and we let you know the
          results by November 1st.
        </Text>
        <Text style={paragraph}>
          You can stay up to date on details of the festival, as well as review
          your application status and submit additional acts to the festival at
          the link below:
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://teaser-fest-2025.vercel.app/">
            More Details
          </Button>
        </Section>
        <Text style={paragraph}>
          Sincerely,
          <br />
          The Teaser Fest Crew
        </Text>
        <Hr style={hr} />
        <Text style={footer}>New Orleans, LA 70116</Text>
      </Container>
    </Body>
  </Html>
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
