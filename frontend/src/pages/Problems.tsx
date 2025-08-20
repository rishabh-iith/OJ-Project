// src/pages/Problems.tsx
import { useEffect, useState } from 'react';
import {
  Heading,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Alert,
  AlertIcon,
  VStack,
  Text,
  Badge,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import api from '../services/apiClient';

// Define a type for our problem data for TypeScript
interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
}

const Problems = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await api.get('/problems/');
        setProblems(response.data);
      } catch (err) {
        setError('Failed to fetch problems. Please make sure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="8xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" color="blue.600">
          Practice Challenges
        </Heading>
        <Text textAlign="center" fontSize="lg" color="gray.600">
          Sharpen your coding skills with our curated collection of problems
        </Text>

        <Table
          variant="simple"
          bg="white"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          sx={{
            'th, td': { borderColor: 'gray.200' },
          }}
        >
          <Thead bg="gray.50">
            <Tr>
              <Th color="gray.700" fontWeight="bold">Challenge Title</Th>
              <Th color="gray.700" fontWeight="bold">Difficulty</Th>
              <Th color="gray.700" fontWeight="bold">Topics</Th>
            </Tr>
          </Thead>

          <Tbody>
            {problems.map((problem) => (
              <Tr
                key={problem.id}
                _hover={{ bg: 'blue.50', cursor: 'pointer' }}
              >
                <Td>
                  <ChakraLink
                    as={RouterLink}
                    to={`/problems/${problem.id}`}
                    fontWeight="medium"
                    color="blue.600"
                    _hover={{ color: 'blue.800', textDecoration: 'none' }}
                  >
                    {problem.title}
                  </ChakraLink>
                </Td>

                <Td>
                  <Badge
                    colorScheme={
                      problem.difficulty === 'Easy'
                        ? 'green'
                        : problem.difficulty === 'Medium'
                        ? 'orange'
                        : 'red'
                    }
                    variant="solid"
                  >
                    {problem.difficulty}
                  </Badge>
                </Td>

                <Td>
                  <Text fontSize="sm" color="gray.600">
                    {problem.tags.join(', ')}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Problems;
