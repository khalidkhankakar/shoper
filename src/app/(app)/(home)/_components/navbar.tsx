'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { MobileNavbar } from './mobile-navbar'
import { MenuIcon } from 'lucide-react'


const NavbarNavigation = ({ children, isActive }: { children: React.ReactNode, isActive: boolean }) => {

    return (
        <Button className={cn('rounded-full', isActive && ' shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[4px]')} variant={isActive ? 'outline' : 'evaluated'} asChild>
            <Link href={'/'}>{children}</Link>
        </Button>
    )
}

export const ROUTES = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Service', path: '/service' },
]

export const Navbar = () => {

    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)
    const onOpenChange = (open: boolean) => {
        setIsOpen(open)
    }

    return (
        <nav className='flex items-center justify-between bg-slate-100  p-4 border-b  '>

            <div className='pl-8'>
                <h1 className='text-3xl font-bold'>Shopra</h1>
            </div>

            {/* navbar navigation */}
            <div className='hidden lg:flex items-center gap-4 '>

                {
                    ROUTES.map((route) => (
                        <NavbarNavigation key={route.path} isActive={pathname === route.path} >
                            {route.name}
                        </NavbarNavigation>
                    ))
                }
            </div>

            {/* navbar login and register */}
            <div className='hidden lg:flex items-center gap-4 pr-8 '>
                <Button variant={'evaluated'} asChild>
                    <Link href={'/login'}>Login</Link>
                </Button>

                <Button className=' hover:bg-blue-600 hover:text-white  ' variant={'evaluated'} asChild>
                    <Link href={'/register'}>Register</Link>
                </Button>
            </div>

            <MobileNavbar open={isOpen} onOpenChange={onOpenChange} isActive={false}>
                <Button variant={'ghost'} className='lg:hidden bg-transparent border-none'>
                    <MenuIcon size={20} className='h-6 w-6' />
                </Button>
            </MobileNavbar>

        </nav>
    )
}

