'use client'
import { store } from "@/store/index.store";
import { useRouter, usePathname } from "next/navigation";
import {
  HamburgerIcon,
} from "@chakra-ui/icons";
import { MdLogout, MdHome, MdListAlt } from 'react-icons/md';
import {
  Button,
  Flex,
  IconButton,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import { User } from "@/interface/user.interface";

export const Layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { token, user, setToken, setUser } = store.applicationStore((state) => state);

  const router = useRouter();
  const pathname = usePathname();

  const authenticated = token && user;

  const handleLogout = () => {
    setToken('');
    setUser({} as User);
  }

  if (pathname === '/login') {
    return (
      <main>
        {children}
      </main>
    )
  }

  return (
    <>
      <Flex
        padding="15px"
        justifyContent="flex-end"
      >
        {
          authenticated ? (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
                backgroundColor="white"
                border="5px double blue"
              />
              <MenuList>
                <MenuItem
                  icon={<Icon as={MdHome} />}
                  onClick={() => router.push('/')}
                >
                  Home
                </MenuItem>
                <MenuItem
                  icon={<Icon as={MdListAlt} />}
                  onClick={() => router.push('/order-history')}
                >
                  Order History
                </MenuItem>
                <MenuItem
                  icon={<Icon as={MdLogout} />}
                  onClick={() => {
                    handleLogout();
                    router.push('/');
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )
            : (
              <Button
                variant='solid'
                colorScheme='blue'
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
            )
        }
      </Flex>
      <main>
        {children}
      </main>
    </>
  )
}