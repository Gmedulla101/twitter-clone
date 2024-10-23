import { useState, useEffect } from 'react';

//IMPORTING HELPER COMPONENTS
import SideBar from '../components/SideBar';

//IMPORTING DEPS
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfileInfo = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await axios.get(
          `http://localhost:5000/api/v1/users/getUser/${username}`
        );

        setUserData(data.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  console.log(userData);

  return (
    <>
      <SideBar />
      <section className="ml-12 p-2 md:ml-64">
        <h1 className="font-bold text-xl">
          {userData?.firstName} {userData?.otherNames} {userData?.lastName}
        </h1>
      </section>
    </>
  );
};

export default ProfileInfo;
