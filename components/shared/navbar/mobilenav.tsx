"use client";
import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetTitle,
} from "@/components/ui/sheet";
import Image from 'next/image';
import Link from 'next/link';
import { SignedOut } from '@clerk/nextjs';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Button } from '@/components/ui/button';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';

const NavContent = () => {
    const pathname = usePathname();

    return (
        <section className='flex h-full flex-col gap-6 pt-16'>
            {sidebarLinks.map((item) => {
                const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;
                return (
                    <SheetClose asChild key={item.route}>
                        <Link href={item.route}
                            className={`${isActive
                                ? 'primary-gradient rounded-lg text-light-900'
                                : 'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-4`}
                        >
                            <Image
                                src={item.imgURL}
                                alt={item.label}
                                width={16}
                                height={16}
                                className={`${isActive ? "" : 'invert-colors'}`}
                            />
                            <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>{item.label}</p>
                        </Link>
                    </SheetClose>
                )
            })}
        </section>
    );
}

const MobileNav = () => {
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Image src="/assets/icons/hamburger.svg" width={36} height={36} alt='Hamburger icon' className='invert sm:hidden' />
                </SheetTrigger>
                <SheetContent side={"left"} className='background-light900_dark200 border-none'>
                    <VisuallyHidden.Root>
                        <SheetTitle>
                            Menu
                        </SheetTitle>
                    </VisuallyHidden.Root>
                    <Link href='/' className='flex items-center gap-1'>
                        <Image src="/assets/images/site-logo.svg" alt="DevFlow" width={40} height={40} />
                        <p className='h2-bold text-dark-100_light900 font-spaceGrotesk'>Dev<span className='text-primary-500'>Overflow</span></p>
                    </Link>
                    <div>
                        <SheetClose asChild>
                            <NavContent />
                        </SheetClose>
                        <SignedOut>
                            <div className='flex flex-col gap-3'>
                                <SheetClose asChild>
                                    <Link href="/sign-up">
                                        <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                                            <span className='primary-text-gradient'>Log-In</span>
                                        </Button>
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="/sign-in">
                                        <Button className='small-medium btn-tertiary light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                                            <span className='primary-text-gradient'>Sign-Up</span>
                                        </Button>
                                    </Link>
                                </SheetClose>
                            </div>
                        </SignedOut>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default MobileNav;
