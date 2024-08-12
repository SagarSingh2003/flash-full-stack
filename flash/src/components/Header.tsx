import {  UserButton, useUser } from "@clerk/clerk-react";

import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  
  export default function Header() {

    const {user} = useUser();

    console.log(user);

    return (

    <section className="flex items-center justify-evenly ">
      <Menubar>
        <MenubarMenu>
         <a href="/" className="hover:text-black hover:cursor-pointer">
          <MenubarTrigger>
          Study
          </MenubarTrigger>
          </a>
        </MenubarMenu>
        <MenubarMenu>
         <a href="/createCards" className="hover:text-black text-[13px] hover:cursor-pointer">
          <MenubarTrigger>
            CreateCards
          </MenubarTrigger>
          </a>
        </MenubarMenu>
        <MenubarMenu>
        <a href="/share" className="hover:text-black hover:cursor-pointer">
          <MenubarTrigger>
          Share
          </MenubarTrigger>
         </a>
        </MenubarMenu>
        <MenubarMenu>
        <a href="/import" className="hover:text-black hover:cursor-pointer">
          <MenubarTrigger>
          Import
          </MenubarTrigger>
        </a>
        </MenubarMenu>
        <MenubarMenu>
            {!user ? <a href="/signin">
                <MenubarTrigger><span className="text-[13px]">SignIn</span></MenubarTrigger>
            </a> : <UserButton />}
        </MenubarMenu>
      </Menubar>
      </section>
    )
  }
  