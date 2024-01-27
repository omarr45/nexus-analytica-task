import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { BarChart3, User } from 'lucide-react';

import { Button } from './ui/button';
import Link from 'next/link';
import React from 'react';
import { ThemeToggle } from './ui/theme-toggle';
import { UserAuth } from '@/contexts/auth-context';

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className='border-b-2'>
      <div className='mx-auto flex max-w-5xl items-center justify-between gap-2 p-2'>
        <Link
          className='mr-auto flex items-center justify-center gap-2 text-3xl font-bold'
          href='/'
        >
          <BarChart3 size={30} strokeWidth={2.5} className='text-primary' />
          Nexus
        </Link>
        <ThemeToggle />
        <Button
          variant={user ? 'destructive' : 'default'}
          onClick={user ? handleLogOut : handleSignIn}
        >
          {user ? 'Log Out' : 'Log In'}
        </Button>
        <Avatar>
          <AvatarImage className='object-cover' src={user?.photoURL || ''} />
          <AvatarFallback>{<User size={20} />}</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
