import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';
import { translations } from '@/lib/i18n/translations';

interface VisaStatusEmailProps {
  visaId: string;
  status: 'approved' | 'rejected' | 'pending';
  applicantName: string;
  locale?: string;
}

export default function VisaStatusEmail({
  visaId,
  status,
  applicantName,
  locale = 'en'
}: VisaStatusEmailProps) {
  const t = translations[locale as keyof typeof translations];

  const getStatusMessage = () => {
    switch (status) {
      case 'approved':
        return t.emails.visaStatus.approved;
      case 'rejected':
        return t.emails.visaStatus.rejected;
      default:
        return t.emails.visaStatus.pending;
    }
  };

  return (
    <Html>
      <Head />
      <Preview>{`Visa Application ${status.toUpperCase()} - ${visaId}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {t.emails.visaStatus.greeting} {applicantName},
          </Heading>
          <Text style={text}>
            {getStatusMessage()}
          </Text>
          <Text style={text}>
            {t.emails.visaStatus.referenceNumber}: {visaId}
          </Text>
          <Text style={footer}>
            {t.emails.visaStatus.footer}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
};

const footer = {
  color: '#898989',
  fontSize: '14px',
  margin: '32px 0 0',
}; 