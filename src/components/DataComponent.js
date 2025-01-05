import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const DataComponent = () => {
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'your_collection'));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
}; 