import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Icon,
  Center
} from '@chakra-ui/react';
import { AiOutlineCalendar, AiOutlineHome } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { TbTableShortcut } from 'react-icons/tb';
import { FaRankingStar } from 'react-icons/fa6';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdExitToApp } from 'react-icons/md';
import { useAuth } from '@/hooks/useAuth';

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const sidebarOptions = [
    { name: 'Dashboard', icon: AiOutlineHome },
    { name: 'Tabelas', icon: TbTableShortcut },
    { name: 'Calendário', icon: AiOutlineCalendar },
    { name: 'Tempo real', icon: BiTimeFive },
    { name: 'Relatórios', icon: HiOutlineDocumentReport },
    { name: 'Ranking', icon: FaRankingStar }
  ];

  const { pathname } = useRouter();
  return (
    <VStack
      h="100%"
      w="6rem"
      _hover={{
        w: '12rem'
      }}
      py="2rem"
      pt="10rem"
      px="1rem"
      transition="0.2s"
      position="fixed"
      zIndex={10}
      left={0}
      top={0}
      bgColor="primary.400"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <VStack alignItems="left" w="full" spacing="1rem">
        {sidebarOptions.map(opt => (
          <Box
            key={opt.name}
            display="flex"
            justifyContent="left"
            w="full"
            bgColor="none"
            padding="1rem"
            overflow="hidden"
            alignItems="center"
          >
            <Icon
              as={opt.icon}
              mr="1rem"
              color={pathname === '/admin' ? 'white' : 'primary.20'}
              fontSize={22}
            />
            <Link href="/admin">
              <Text
                opacity={open ? 1 : 0}
                isTruncated
                textDecor={pathname === '/admin' ? 'underline' : 'none'}
                color={pathname === '/admin' ? 'white' : 'primary.20'}
              >
                {opt.name}
              </Text>
            </Link>
          </Box>
        ))}
        <Center w="full" mt="4rem">
        <Icon as={MdExitToApp} onClick={logout} color="primary.20" fontSize={28}/>
        </Center>
      </VStack>
    </VStack>
  );
}
