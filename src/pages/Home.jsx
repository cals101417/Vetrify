import { async } from '@firebase/util';
import React from 'react';
import { useAuth } from '../auth/context/UserAuthContext';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
function Home() {
    const {user} = useAuth();


    return (
        <div id="page-container"  className="flex sidebar-o enable-page-overlay side-scroll page page-header-inverse header glass">
            <Sidebar />
            <Header />
            <main id="main-container">

            </main>
             {/* <h1
                onClick={handleLogout}
              >
                Logout
              </h1> */}
        </div>
        
    );
}

export default Home;