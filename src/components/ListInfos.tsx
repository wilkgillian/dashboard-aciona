import { Dashboard } from '@/contexts/DashboardContext';
import { HStack, Box, Text, VStack, Center, Icon } from '@chakra-ui/react';
import { FaRegSmile, FaSmile } from 'react-icons/fa';
import {
  MdOutlineSupportAgent,
  MdGavel,
  MdOutlineAttachMoney,
  MdSpellcheck
} from 'react-icons/md';

interface ListInfosProps {
  dashboard: Dashboard;
}

export default function ListInfos({ dashboard }: ListInfosProps) {
  function formatMoney(value: number) {
    const formatedMoney = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
    return formatedMoney;
  }
  return (
    <HStack w="full" mt="1rem">
      <VStack
        alignItems="left"
        h="12rem"
        w="full"
        borderRadius="lg"
        bgColor="white"
        padding="1rem"
        spacing="1rem"
      >
        <Text fontSize="md" color="dark.300" fontWeight="bold">
          Total de vendedores
        </Text>
        <Center
          bgColor="light.300"
          borderRadius="lg"
          padding="0.5rem"
          w="fit-content"
        >
          <Icon as={FaRegSmile} fontSize="3xl" color="dark.100" />
        </Center>
        <Box>
          <Text fontWeight="bold" fontSize="2xl">
            {dashboard.data.producao.quantidadeVendedores}
          </Text>
        </Box>
      </VStack>
      <VStack
        alignItems="left"
        h="12rem"
        w="full"
        borderRadius="lg"
        bgColor="white"
        padding="1rem"
        spacing="1rem"
      >
        <Text fontSize="md" color="dark.300" fontWeight="bold">
          Vendedores com acionamentos
        </Text>
        <Center
          bgColor="light.300"
          borderRadius="lg"
          padding="0.5rem"
          w="fit-content"
        >
          <Icon as={MdOutlineSupportAgent} fontSize="3xl" color="dark.100" />
        </Center>
        <Box>
          <HStack>
            <Text fontWeight="bold" fontSize="2xl">
              {dashboard.data.producao.quantidadeVendAcionamentos}
            </Text>
            <Box
              ml="1rem"
              bgColor="primary.50"
              borderRadius="md"
              color="primary.400"
              fontWeight="bold"
              px="0.5rem"
            >
              {dashboard.data.producao.percAcionados.toFixed(2)}%
            </Box>
          </HStack>
        </Box>
      </VStack>
      <VStack
        alignItems="left"
        h="12rem"
        w="full"
        borderRadius="lg"
        bgColor="white"
        padding="1rem"
        spacing="1rem"
      >
        <Text fontSize="md" color="dark.300" fontWeight="bold">
          Acordos
        </Text>
        <Center
          bgColor="light.300"
          borderRadius="lg"
          padding="0.5rem"
          w="fit-content"
        >
          <Icon as={MdGavel} fontSize="3xl" color="dark.100" />
        </Center>
        <Box>
          <Text fontWeight="bold" fontSize="2xl">
            {dashboard.data.producao.quantidadeAcordos}
          </Text>
          <Text fontSize="xl" color="dark.50">
            {formatMoney(dashboard.data.producao.total)}
          </Text>
        </Box>
      </VStack>

      <VStack
        alignItems="left"
        h="12rem"
        w="full"
        borderRadius="lg"
        bgColor="white"
        padding="1rem"
        spacing="1rem"
      >
        <Text fontSize="md" color="dark.300" fontWeight="bold">
          AV+Entrada
        </Text>
        <Center
          bgColor="light.300"
          borderRadius="lg"
          padding="0.5rem"
          w="fit-content"
        >
          <Icon as={MdSpellcheck} fontSize="3xl" color="dark.100" />
        </Center>
        <Box>
          <Text fontWeight="bold" fontSize="2xl">
            {formatMoney(dashboard.data.producao.valorAV)}
          </Text>
        </Box>
      </VStack>
      <VStack
        alignItems="left"
        h="12rem"
        w="full"
        borderRadius="lg"
        bgColor="white"
        padding="1rem"
        spacing="1rem"
      >
        <Text fontSize="md" color="dark.300" fontWeight="bold">
          Arrecadação
        </Text>
        <Center
          bgColor="light.300"
          borderRadius="lg"
          padding="0.5rem"
          w="fit-content"
        >
          <Icon as={MdOutlineAttachMoney} fontSize="3xl" color="dark.100" />
        </Center>
        <Box>
          <HStack>
            <Text fontWeight="bold" fontSize="2xl">
              {formatMoney(dashboard.data.pagamentos.valorPagamentos)}
            </Text>
            {/* <Box
              ml="1rem"
              bgColor="primary.50"
              borderRadius="md"
              color="green"
              fontWeight="bold"
              px="0.5rem"
            >
              {dashboard.data.producao.per}
            </Box> */}
          </HStack>
          <Text fontSize="xl" color="dark.50">
            {formatMoney(dashboard.data.pagamentos.meta)}
          </Text>
        </Box>
      </VStack>
    </HStack>
  );
}
