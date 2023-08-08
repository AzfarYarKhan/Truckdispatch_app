'use client'
import { User } from '@prisma/client'
import {signIn, signOut,useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

interface currentUser {
    currentUser?: User | null;
  };
const  Signoutbutton: React.FC<currentUser> = ({ currentUser }: currentUser) => {
  const router = useRouter();
  const handleClick = () => {
    signOut({ redirect: true, callbackUrl: process.env.NEXT_PUBLIC_BASE_URL, })
      .then(() => { 
          console.log('Successfully signing out');                
      })
      .catch((error) => {
        console.log('Error signing out:', error);
      });
  };
  return (
    <button onClick={handleClick}>
      Signout
    </button>
  );
};

export default Signoutbutton;
