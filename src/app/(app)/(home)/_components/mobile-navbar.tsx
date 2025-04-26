import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ROUTES } from "./navbar"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Props {
  children: React.ReactNode
isActive: boolean
open: boolean
onOpenChange: (open: boolean) => void

}

export function MobileNavbar({children,isActive, open, onOpenChange}:Props) {
  return (
    <Sheet  open={open} onOpenChange={() => onOpenChange(!open)}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="flex flex-col" side="left">
      <SheetHeader>
              <SheetTitle className="text-3xl font-bold">Shopra</SheetTitle>
            </SheetHeader>
       <div className=" flex-1 flex flex-col gap-2 mt-4">
        {
            ROUTES.map((route) => (

                <Button key={route.path} className={cn("w-full rounded-none border-none bg-white text-black text-left text-xl hover:bg-black hover:text-white" , isActive && "bg-black text-white")} onClick={() => onOpenChange(false)} asChild>
                        <Link href={route.path}>{route.name}</Link>
                </Button>

            ))
        }
       </div>

       <div className='flex items-center flex-col gap-2 border-t w-full mt-4 pt-4'>
                <Button className="w-full rounded-none border-none bg-white text-black text-left text-xl hover:bg-black hover:text-white" onClick={() => onOpenChange(false)} asChild>
                    <Link href={'/login'}>Login</Link>
                </Button>

                <Button className="w-full rounded-none border-none bg-white text-black text-left text-xl hover:bg-blue-600 hover:text-white" onClick={() => onOpenChange(false)} asChild>
                    <Link href={'/register'}>Register</Link>
                </Button>
            </div>

        
      </SheetContent>
    </Sheet>
  )
}
