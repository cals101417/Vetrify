import { async } from '@firebase/util';
import React from 'react';
import { useAuth } from '../auth/context/UserAuthContext';

function Home() {
    const {user, logout} = useAuth();

    const handleLogout = async(e) => {
        try{
            await logout();
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div>
             <h1
                onClick={handleLogout}
              >
                Logout
              </h1>
        </div>
    );
}

export default Home;