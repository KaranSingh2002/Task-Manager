import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';
import '../components/Styles/Home.css'; // Ensure correct path to your CSS file
import bgimage from '../components/Image/bg.jpg'; // Assuming you have imported your background image

const Home = () => {
  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);

  return (
    <MainLayout>
      <div className='home-container'>
        <div className='image-container'>
          <img src={bgimage} alt='Background' />
        </div>
        <div className='welcome-text'>
          {!isLoggedIn ? (
            <>
              <h1>Welcome to Task Manager App</h1>
              <Link to="/signup" className='join-link'>
                Join now to manage your tasks
                <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right"></i></span>
              </Link>
            </>
          ) : (
            <>
              <h1>Welcome {authState.user.name}</h1>
              <Tasks />
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
