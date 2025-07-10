"use client";
import Image from "next/legacy/image";
import Link from "next/link";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconBell,
  IconCart,
  IconHeart,
  IconMessage,
  IconSettings,
} from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LogoVegeta } from "@/components/icons";
import CommonNotificationBadge from "@/components/common/common-notification-badge";

// utils
import { cn } from "@/lib/utils";
import { hover } from "@/lib/hover";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useGetAllCheckoutQuery } from "@/service/transaction.service";
import { useGetProductFavoriteQuery } from "@/service/product.service";

interface HeaderProps {}

const CommonHeader: React.FC<HeaderProps> = () => {
  const { data: session } = useSession();

  const { data: dataCheckouts } = useGetAllCheckoutQuery();
  const { data: dataProductFavorites } = useGetProductFavoriteQuery({});

  return (
    <>
      <div className="w-[100%] px-2 lg:px-0 fixed z-50 bg-white flex flex-col items-center">
        {/* disini error */}

        <div className="flex lg:w-content w-[100%] py-4 separator items-center w-full justify-between">
          <Link href="/">
            <LogoVegeta className="w-[124px] h-[28px]" />
          </Link>

          <div className="md:flex hidden flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "font-normal"
                      )}
                    >
                      Beranda
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/product" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "font-normal"
                      )}
                    >
                      Produk
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                {/* <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "font-normal"
                      )}
                    >
                      Belanja
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem> */}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {session?.user ? (
            <div className="flex gap-4 items-center">
              <CommonNotificationBadge
                notificationDetail={{ color: "bg-leaf", count: 2 }}
              >
                <IconMessage
                  className={cn("w-6 h-6", hover.shadow)}
                  stroke="text-black"
                />
              </CommonNotificationBadge>

              <CommonNotificationBadge
                notificationDetail={{ color: "bg-coral", count: 12 }}
              >
                <IconBell
                  className={cn("w-6 h-6", hover.shadow)}
                  stroke="text-black"
                />
              </CommonNotificationBadge>

              {/* profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="w-[42px] h-[42px] rounded-full relative overflow-hidden">
                    <Image
                      src={`https://ui-avatars.com/api/?name=${session?.user.name}&background=random`}
                      layout="fill"
                      alt=""
                      objectFit="cover"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="lg:hidden block">
                    Menu
                  </DropdownMenuLabel>
                  <DropdownMenuGroup className="lg:hidden block">
                    <DropdownMenuItem>
                      <Link href="/">Beranda</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/product">Produk</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/history">Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/wishlist" className="w-[100%]">
                        <div className="flex w-[100%] justify-between items-center">
                          Favorit
                          <div className="w-[16px] h-[16px] text-xs text-white text-center p-1 flex justify-center items-center bg-coral rounded-full">
                            {dataProductFavorites?.data.length || 0}
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/checkout" className="w-[100%]">
                        <div className="flex w-[100%] justify-between items-center">
                          Cart
                          <div className="w-[16px] h-[16px] text-xs text-white text-center p-1 flex justify-center items-center bg-coral rounded-full">
                            {dataCheckouts?.data.length || 0}
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/history">History Transaction</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        signOut({
                          redirect: true,
                          callbackUrl: "/auth/signin",
                        });
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="md:flex flex-col hidden w-[127px] justify-center">
                <div className="text-xs">Hi, Apa Kabar?</div>
                <div className="text-sm font-semibold truncate">
                  {session.user.name || ""}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-6">
              <Link href={"/auth/signup"}>
                <Button
                  className={cn("py-1 px-7 bg-leaf leading-4", hover.shadow)}
                >
                  Daftar Sekarang
                </Button>
              </Link>
              <Link href={"/auth/signin"}>
                <Button
                  className={cn("py-1 px-7 bg-carrot leading-4", hover.shadow)}
                >
                  Masuk akun
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="h-[2px] w-full bg-gray-800" />
        {/* disini juga error */}
        <div className="md:flex hidden w-[100%] lg:w-content separator py-3 justify-between items-center">
          <div className="flex">
            <Select defaultValue={"semua-kategori"}>
              <SelectTrigger
                className={cn(
                  "w-[180px] rounded-tr-none rounded-br-none bg-white",
                  hover.shadow
                )}
              >
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent className="w-[180px]">
                <SelectGroup>
                  <SelectItem value="semua-kategori">Semua Kategori</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="relative">
              <Input
                className="w-[288px] rounded-tl-none rounded-bl-none"
                type="text"
                placeholder="Pencarian ..."
                suffix="Magnifier"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href={"/wishlist"}
              className={cn(
                "flex items-center text-neutral-600 font-regular p-0",
                hover.shadow
              )}
            >
              <CommonNotificationBadge
                notificationDetail={{
                  color: "bg-carrot",
                  count: dataProductFavorites?.data.length || 0,
                }}
              >
                <IconHeart className="w-5 h-5" stroke="leaf" />
              </CommonNotificationBadge>
              <span className="pl-2">Favorit</span>
            </Link>
            <Link
              href={"/checkout"}
              className={cn(
                "flex items-center text-neutral-600 font-regular p-0",
                hover.shadow
              )}
            >
              <CommonNotificationBadge
                notificationDetail={{
                  color: "bg-carrot",
                  count: dataCheckouts?.data.length,
                }}
              >
                <IconCart className="w-5 h-5" stroke="leaf" />
              </CommonNotificationBadge>
              <span className="pl-2">Keranjang</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export { CommonHeader };
