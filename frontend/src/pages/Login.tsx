// src/pages/Login.tsx
import { useState } from 'react';
import { Box, Input, Button, Heading, VStack, useToast, Link } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api, { login as doLogin } from '../services/apiClient';

export default function Login() {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const nav = useNavigate();
  const { login } = useAuth();

  const submit = async () => {
    if (!u || !p) {
      toast({ status: 'warning', title: 'Enter username and password' });
      return;
    }
    setLoading(true);
    try {
      // get tokens
      const { access, refresh } = await doLogin(u, p);

      // keep your existing flow
      login(access, refresh);

      // ensure future calls use the new access token
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      // optional: fetch user summary (to detect admin etc.)
      let userObj: any = null;
      try {
        const me = await api.get('/me/summary/');
        userObj = me.data?.user ?? null;
      } catch {
        // ignore if not available
      }
      if (userObj) localStorage.setItem('user', JSON.stringify(userObj));

      toast({ status: 'success', title: `Welcome${userObj?.username ? ', ' + userObj.username : '!'}` });
      nav('/dashboard');
    } catch (e: any) {
      toast({
        status: 'error',
        title: 'Login failed',
        description: e?.response?.data?.detail || String(e),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={10} bg="white" color="gray.800" maxW="400px" mx="auto" mt={20} borderRadius="lg" boxShadow="lg" border="1px solid" borderColor="gray.200">
      <Heading size="lg" mb={6} color="blue.600" textAlign="center">Sign In</Heading>
      <VStack spacing={4} align="stretch">
        <Input 
          placeholder="Username" 
          value={u} 
          onChange={(e) => setU(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()} 
          borderColor="gray.300"
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
        />
        <Input 
          placeholder="Password" 
          type="password" 
          value={p} 
          onChange={(e) => setP(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()} 
          borderColor="gray.300"
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
        />
        <Button 
          onClick={submit} 
          colorScheme="blue" 
          isLoading={loading}
          bg="blue.600"
          color="white"
          _hover={{ bg: "blue.700" }}
          _active={{ bg: "blue.800" }}
          size="lg"
          fontWeight="semibold"
        >
          Sign In
        </Button>
        <Link as={RouterLink} to="/register" color="blue.600" textAlign="center" _hover={{ color: "blue.800" }}>
          Create an account
        </Link>
      </VStack>
    </Box>
  );
}
