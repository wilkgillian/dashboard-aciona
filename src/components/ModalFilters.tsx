import { useDashboard } from '@/hooks/useDashboard';
import { useFilters } from '@/hooks/useFilters';
import { useUser } from '@/hooks/useUser';
import {
  Button,
  HStack,
  Icon,
  Text,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
  useDisclosure,
  Box
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';

export default function ModalFilters() {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const { loadDashboard, setDashboard } = useDashboard();
  const {
    tipo,
    setTipo,
    data,
    setData,
    regional,
    regionais,
    loadRegionais,
    setRegional,
    loja,
    lojas,
    loadLojas,
    setLoja,
    vendedores,
    loadVendedores,
    salesman,
    setSalesman
  } = useFilters();

  async function filterDashboard() {
    setLoading(true);
    switch (user?.perfil) {
      case 'Gerente Matriz':
        const dashMatriz = await loadDashboard(user, tipo, undefined, data);
        setDashboard(dashMatriz);
      case 'Gerente Regional':
        const dashRegional = await loadDashboard(
          user,
          tipo,
          Number(regional),
          data
        );
        setDashboard(dashRegional);
      case 'Gerente Loja':
        const dashLoja = await loadDashboard(user, tipo, Number(loja), data);
        setDashboard(dashLoja);
      default:
        await loadDashboard(user!, tipo, undefined, data);
    }
    setLoading(false);
    onClose();
  }

  function cancelFilters() {
    setData('');
    setRegional('');
    setLoja('');
    setSalesman('');
    onClose();
  }

  useEffect(() => {
    loadRegionais();
  }, []);

  useEffect(() => {
    if (regional) {
      loadLojas(Number(regional));
    }
  }, [regional]);

  useEffect(() => {
    if (loja) {
      loadVendedores(Number(loja));
    }
  }, [loja]);

  return (
    <>
      <Icon
        onClick={onOpen}
        cursor="pointer"
        as={AiOutlineEdit}
        fontSize="2xl"
        color="primary.300"
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filtros</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="full">
            <VStack spacing="1rem">
              <HStack w="full" spacing="1rem">
                <Box w="full">
                  <Text fontWeight="bold" color="dark.50">
                    Período
                  </Text>
                  <Select
                    w="full"
                    placeholder="Selecione o período"
                    value={tipo}
                    onChange={e => setTipo(e.target.value)}
                  >
                    <option value="mes">Mensal</option>
                    <option value="dia">Diário</option>
                  </Select>
                </Box>
                <Box w="full">
                  <Text fontWeight="bold" color="dark.50">
                    Data
                  </Text>
                  <Input
                    type="date"
                    value={data}
                    onChange={e => setData(e.target.value)}
                  />
                </Box>
              </HStack>
              <HStack w="full" spacing="1rem">
                <Box w="full">
                  <Text fontWeight="bold" color="dark.50">
                    Regional
                  </Text>
                  <Select
                  isDisabled={user?.perfil !== "Gerente Matriz"}
                    w="full"
                    placeholder="Selecione a regional"
                    value={regional}
                    onChange={e => setRegional(e.target.value)}
                  >
                    {regionais.map(regional => (
                      <option
                        key={regional.idRegional}
                        value={regional.idRegional}
                      >
                        {regional.nomeRegional}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box w="full">
                  <Text fontWeight="bold" color="dark.50">
                    Loja
                  </Text>
                  <Select
                    isDisabled={!regional || user?.perfil === "Gerente Loja"? true : false}
                    w="full"
                    placeholder="Selecione a loja"
                    value={loja}
                    onChange={e => setLoja(e.target.value)}
                  >
                    {lojas.map(loja => (
                      <option key={loja.idLoja} value={loja.idLoja}>
                        {loja.nomeLoja}
                      </option>
                    ))}
                  </Select>
                </Box>
              </HStack>
              <HStack w="full" spacing="1rem">
                <Box w="full">
                  <Text fontWeight="bold" color="dark.50">
                    Vendedor
                  </Text>
                  <Select
                    isDisabled={!loja || !regional ? true : false}
                    w="full"
                    placeholder="Selecione o vendedor"
                    value={salesman}
                    onChange={e => setSalesman(e.target.value)}
                  >
                    {vendedores.map(vendedor => (
                      <option
                        key={vendedor.idUsuario}
                        value={vendedor.idUsuario}
                      >
                        {vendedor.nomeUsuario}
                      </option>
                    ))}
                  </Select>
                </Box>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="telegram"
              mr={3}
              onClick={filterDashboard}
              isLoading={loading}
              isDisabled={loading}
            >
              Filtrar
            </Button>
            <Button
              isLoading={loading}
              isDisabled={loading}
              variant="ghost"
              colorScheme="telegram"
              borderColor="primary.300"
              borderWidth={2}
              onClick={cancelFilters}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
