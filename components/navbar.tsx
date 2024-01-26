import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

import { BarChart3 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ThemeToggle } from './ui/theme-toggle';

const Navbar = () => {
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
        <Avatar>
          {/* <AvatarImage
            className='scale-125 object-cover'
            src='/OmarAbdulRahman.jpg'
          /> */}
          <AvatarFallback>OA</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
