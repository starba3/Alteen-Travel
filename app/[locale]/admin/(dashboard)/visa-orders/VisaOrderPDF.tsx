import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { VisaApplication } from '@/lib/types/VisaApplication';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { storage } from '@/lib/firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
  table: {
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 4,
    fontWeight: 'bold',
    fontSize: 9,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    fontSize: 9,
  },
  col: {
    flex: 1,
  },
  photosContainer: {
    marginTop: 15,
    flexDirection: 'row',
    gap: 8,
  },
  photo: {
    width: 100,
    height: 100,
  },
  totalPrice: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    fontSize: 11,
    fontWeight: 'bold',
  },
});

interface Props {
  order: VisaApplication;
  locale: string;
}

export function VisaOrderPDF({ order, locale }: Props) {
  const getBase64FromUrl = async (url: string) => {
    try {
      const response = await fetch('/api/fetch-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      const data = await response.json();
      if (data.base64) {
        return data.base64;
      }
      throw new Error('Failed to get image');
    } catch (error) {
      console.error('Error converting image:', error);
      return '';
    }
  };

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [base64Images, setBase64Images] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadImages = async () => {
      const images: { [key: string]: string } = {};
      try {
        for (const person of order.persons) {
          if (person.imageUrlNationality) {
            const base64 = await getBase64FromUrl(person.imageUrlNationality);
            if (base64) images[person.imageUrlNationality] = base64;
          }
          if (person.imageUrlPassport) {
            const base64 = await getBase64FromUrl(person.imageUrlPassport);
            if (base64) images[person.imageUrlPassport] = base64;
          }
        }
      } catch (error) {
        console.error('Error loading images:', error);
      }
      setBase64Images(images);
      setImagesLoaded(true);
    };

    loadImages();
  }, [order.persons]);

  if (!imagesLoaded) {
    return null;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Visa Application Details</Text>
        
        {/* Main Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Application Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Order ID:</Text>
            <Text style={styles.value}>{order.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{order.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{order.phoneNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Country:</Text>
            <Text style={styles.value}>{locale === 'ar' ? order.countryArabic : order.country}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{order.status || 'pending'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>
              {order.createdAt && format(new Date(order.createdAt), 'PPP')}
            </Text>
          </View>
        </View>

        

        {/* Persons Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travelers Information</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.col}>Name</Text>
              <Text style={styles.col}>Passport No.</Text>
              <Text style={styles.col}>Nationality</Text>
              <Text style={styles.col}>DOB</Text>
              <Text style={styles.col}>ID Photo</Text>
              <Text style={styles.col}>Passport Photo</Text>
            </View>
            {order.persons.map((person, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.col}>
                  {`${person.firstName} ${person.midName} ${person.lastName}`}
                </Text>
                <Text style={styles.col}>{person.passportNo}</Text>
                <Text style={styles.col}>
                  {locale === 'ar' ? person.nationality : person.nationality}
                </Text>
                <Text style={styles.col}>
                  {person.dob && format(new Date(person.dob), 'PP')}
                </Text>
                <View style={styles.col}>
                  {person.imageUrlNationality && base64Images[person.imageUrlNationality] && (
                    <Image
                      src={base64Images[person.imageUrlNationality]}
                      style={styles.photo}
                    />
                  )}
                </View>
                <View style={styles.col}>
                  {person.imageUrlPassport && base64Images[person.imageUrlPassport] && (
                    <Image
                      src={base64Images[person.imageUrlPassport]}
                      style={styles.photo}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Add total price */}
        <Text style={styles.totalPrice}>
          Total Price: ${order.price}
        </Text>

      </Page>
    </Document>
  );
} 