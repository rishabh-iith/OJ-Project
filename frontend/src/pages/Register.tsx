//frontend/pages/Register.tsx
import { useState } from 'react';
import { Box, Input, Button, Heading, VStack, useToast } from '@chakra-ui/react';
import api from '../services/apiClient';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [u,setU]=useState(''); const [p,setP]=useState(''); const [e,setE]=useState('');
  const toast = useToast(); const nav = useNavigate(); const { login } = useAuth();

  const submit = async () => {
    try {
      const r = await api.post('/register/', { username: u, password: p, email: e });
      login(r.data.access, r.data.refresh);
      toast({ status: 'success', title: 'Account created' });
      nav('/dashboard');
    } catch (err:any) {
      toast({ status: 'error', title: 'Register failed', description: err?.response?.data?.detail || String(err) });
    }
  };

  return (
    <Box p={10} bg="white" color="gray.800" maxW="400px" mx="auto" mt={20} borderRadius="lg" boxShadow="lg" border="1px solid" borderColor="gray.200">
      <Heading size="lg" mb={6} color="blue.600" textAlign="center">Join CodeForge Academy</Heading>
      <VStack spacing={4} align="stretch">
        <Input 
          placeholder="Username" 
          value={u} 
          onChange={e=>setU(e.target.value)}
          borderColor="gray.300"
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
        />
        <Input 
          placeholder="Email (optional)" 
          value={e} 
          onChange={e=>setE(e.target.value)}
          borderColor="gray.300"
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
        />
        <Input 
          placeholder="Password" 
          type="password" 
          value={p} 
          onChange={e=>setP(e.target.value)}
          borderColor="gray.300"
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
        />
        <Button 
          onClick={submit} 
          colorScheme="blue"
          bg="blue.600"
          color="white"
          _hover={{ bg: "blue.700" }}
          _active={{ bg: "blue.800" }}
          size="lg"
          fontWeight="semibold"
        >
          Create Account
        </Button>
      </VStack>
    </Box>
  );
}
