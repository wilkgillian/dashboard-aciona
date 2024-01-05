import Head from 'next/head';
import {
  HStack,
  Icon,
  VStack,
  Progress,
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Center
} from '@chakra-ui/react';
import AdminSidebar from '@/components/AdminSidebar';
import Barchart from '@/components/Charts/Barchart';
import { Doughnutchart } from '@/components/Charts/Doughnutchart';
import CardArrecadacao from '@/components/CardArrecadacao';
import ListInfos from '@/components/ListInfos';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { useDashboard } from '@/hooks/useDashboard';
import ModalFilters from '@/components/ModalFilters';
import { Dashboard, RankingArrecadacaoItem } from '@/contexts/DashboardContext';
import moment from 'moment';
import { useFilters } from '@/hooks/useFilters';

export default function Loja() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { loadUser, user } = useUser();
  const { data, tipo, setRegional, setLoja } = useFilters();
  const { loadDashboard, dashboard, setDashboard } = useDashboard();

  useEffect(() => {
    async function getInfos() {
      loadUser();
      if (user) {
        setRegional(String(user.id_regional));
        setLoja(String(user.id_loja));
        const response = await loadDashboard(user, tipo, user.id_loja, data);
        setDashboard(response);
      }
      setLoading(false);
    }
    getInfos();
  }, []);
  return (
    <>
      <Head>
        <title>Dashboard aciona</title>
        <meta name="description" content="Dashboard gerencial aciona" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box h="100vh" display="flex">
        <AdminSidebar />
        {loading || !dashboard ? (
          <Center>
            <Spinner size="2xl" color="primary.400" />
          </Center>
        ) : (
          <Box
            w="full"
            bgColor="gray.100"
            padding="2rem"
            ml="6rem"
            overflowY="auto"
          >
            <HStack w="full" justifyContent="space-between" spacing="1rem">
              <VStack
                h="10rem"
                w="100%"
                alignItems="left"
                spacing="1rem"
                bgColor="white"
                borderRadius="lg"
                padding="1rem"
              >
                <HStack
                  w="full"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Text fontWeight="bold" fontSize="lg">
                      Todas as regionais
                    </Text>
                    <Text fontSize="sm">
                      Dados de{' '}
                      <Text as="strong" color="primary.300">
                        {tipo === 'dia'
                          ? moment(dashboard.data.data).format('DD/MM/YYYY')
                          : dashboard.data.data}
                      </Text>
                    </Text>
                  </Box>
                  <ModalFilters />
                </HStack>
                <VStack alignItems="left">
                  <Progress
                    w="full"
                    value={dashboard.data.percentualAcesso}
                    size="md"
                    rounded="md"
                    colorScheme="telegram"
                  />

                  <Text>
                    A média geral de logins no App é de{' '}
                    {dashboard?.data.percentualAcesso.toFixed(2)}%
                  </Text>
                </VStack>
              </VStack>
              <VStack
                h="10rem"
                w="100%"
                alignItems="left"
                justifyContent="space-between"
                bgColor="white"
                borderRadius="lg"
                padding="1rem"
              >
                <Text fontWeight="bold">
                  Fila ({dashboard?.data.producao.quantidadeFila})
                </Text>
                <VStack spacing="1rem">
                  <Progress
                    w="full"
                    value={dashboard.data.producao.percAcionados}
                    size="md"
                    rounded="md"
                    colorScheme="telegram"
                  />
                  <HStack w="full">
                    <Box h="0.5rem" w="0.5rem" bgColor="primary.400" />
                    <Text>
                      {dashboard?.data.producao.acionados} (
                      {dashboard?.data.producao.percAcionados.toFixed(2)}%)
                      clientes acionados
                    </Text>
                  </HStack>
                  <HStack w="full">
                    <Box h="0.5rem" w="0.5rem" bgColor="light.400" />
                    <Text>
                      {dashboard?.data.producao.naoAcionados} (
                      {dashboard?.data.producao.percNaoAcionados.toFixed(2)}%)
                      clientes não acionados
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </HStack>
            <ListInfos dashboard={dashboard} />
            <HStack spacing="2rem" mt="2rem">
              <Box
                bgColor="white"
                borderRadius="lg"
                padding="1rem"
                h="30rem"
                w="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Barchart dashboard={dashboard} />
              </Box>
              <VStack
                w="50%"
                h="30rem"
                bgColor="white"
                borderRadius="lg"
                padding="1rem"
                justifyContent="space-around"
              >
                <Doughnutchart dashboard={dashboard} />
              </VStack>
            </HStack>
            <Box mt="2rem">
              <HStack w="full" justifyContent="space-between">
                <Text
                  fontWeight="bold"
                  textAlign="center"
                  fontSize="2xl"
                  mb="2rem"
                >
                  Ranking por arrecadação
                </Text>
                <InputGroup w="50%" pl="1rem" alignItems="center">
                  <Input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    type="text"
                    placeholder="Procurar por regional"
                    bgColor="white"
                    mb="1rem"
                    borderRadius="lg"
                    padding="1.5rem"
                  />
                  <InputRightElement mt="0.2rem" fontSize="xl">
                    <Icon cursor="pointer" as={FaSearch} />
                  </InputRightElement>
                </InputGroup>
              </HStack>
              <HStack w="full" spacing="2rem">
                <VStack w="full">
                  <Box
                    w="full"
                    bgColor="white"
                    borderRadius="lg"
                    padding="1rem"
                    boxShadow="0px 4px 10px -7px black"
                  >
                    <Text fontWeight="bold" textAlign="center">
                      Arrecadação
                    </Text>
                  </Box>
                  {dashboard === null ? (
                    <Center w="full" h="30rem">
                      <Spinner />
                    </Center>
                  ) : (
                    <VStack h="30rem" overflowY="auto" spacing="1rem" w="full">
                      {dashboard.data.rankingArrecadacao
                        .sort((a, b) => b.valorPagamentos! - a.valorPagamentos!)
                        .filter(item =>
                          item.vendedor
                            ?.toLowerCase()
                            .includes(search.toLowerCase())
                        )
                        .map((filiais, index) => (
                          <CardArrecadacao
                            key={filiais.idVendedor}
                            index={index + 1}
                            filial={filiais.vendedor!}
                            percentage={filiais.efetividade}
                            value={filiais.valorPagamentos!}
                          />
                        ))}
                    </VStack>
                  )}
                </VStack>
                <VStack w="full">
                  <Box
                    w="full"
                    bgColor="white"
                    borderRadius="lg"
                    padding="1rem"
                    boxShadow="0px 4px 10px -7px black"
                  >
                    <Text fontWeight="bold" textAlign="center">
                      Efetividade
                    </Text>
                  </Box>
                  {dashboard === null ? (
                    <Center w="full" h="30rem">
                      <Spinner />
                    </Center>
                  ) : (
                    <VStack h="30rem" overflowY="auto" spacing="1rem" w="full">
                      {dashboard.data.rankingArrecadacao
                        .sort((a, b) => b.efetividade - a.efetividade)
                        .filter(item =>
                          item.vendedor
                            ?.toLowerCase()
                            .includes(search.toLowerCase())
                        )
                        .map((filiais, index) => (
                          <CardArrecadacao
                            key={filiais.idVendedor}
                            index={index + 1}
                            filial={filiais.vendedor!}
                            percentage={filiais.efetividade}
                            value={filiais.valorPagamentos!}
                          />
                        ))}
                    </VStack>
                  )}
                </VStack>
              </HStack>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
