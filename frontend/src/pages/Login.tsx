// frontend/pages/Login.tsx
import { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Heading,
  VStack,
  useToast,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Checkbox,
  Text,
  Link,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import api from '../services/apiClient';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const nav = useNavigate();
  const { login } = useAuth();

  const submit = async () => {
    if (!u || !p) {
      toast({ status: 'warning', title: 'Please fill in both fields.' });
      return;
    }
    setLoading(true);
    try {
      // Adjust endpoint/keys to match your backend if needed
      const r = await api.post('/login/', { username: u, password: p });
      // Expecting { access, refresh } in response
      login(r.data.access, r.data.refresh);
      toast({ status: 'success', title: 'Welcome back!' });
      nav('/dashboard');
    } catch (err: any) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.non_field_errors?.[0] ||
        'Login failed. Check your credentials and try again.';
      toast({ status: 'error', title: 'Login failed', description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={10}
      bg="white"
      color="gray.800"
      maxW="400px"
      mx="auto"
      mt={20}
      borderRadius="lg"
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.200"
    >
      <Heading size="lg" mb={6} color="blue.700" textAlign="center">
        Log in to CodeForge Academy
      </Heading>

      <VStack spacing={4} align="stretch">
        <FormControl id="username" isRequired>
          <FormLabel color="gray.700">Username</FormLabel>
          <Input
            placeholder="Enter your username"
            value={u}
            onChange={(e) => setU(e.target.value)}
            borderColor="gray.300"
            _focus={{ borderColor: 'blue.600', boxShadow: '0 0 0 1px var(--chakra-colors-blue-600)' }}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel color="gray.700">Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Enter your password"
              type={showPw ? 'text' : 'password'}
              value={p}
              onChange={(e) => setP(e.target.value)}
              borderColor="gray.300"
              _focus={{ borderColor: 'blue.600', boxShadow: '0 0 0 1px var(--chakra-colors-blue-600)' }}
            />
            <InputRightElement>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Checkbox colorScheme="blue">Remember me</Checkbox>

        <Button
          onClick={submit}
          isLoading={loading}
          loadingText="Signing in"
          bg="blue.700"
          color="white"
          _hover={{ bg: 'blue.800' }}
          _active={{ bg: 'blue.900' }}
          size="lg"
          fontWeight="semibold"
          borderRadius="md"
          boxShadow="md"
          width="100%" // full-width for prominence
        >
          Login
        </Button>

        <Text fontSize="sm" color="gray.600" textAlign="center">
          Don’t have an account?{' '}
          <Link as={RouterLink} to="/register" color="blue.700" _hover={{ color: 'blue.900', textDecoration: 'underline' }}>
            Create one
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}
