import { useEffect, useState } from 'react';
import api from '../services/apiClient';
import { Box, Heading, SimpleGrid, Text, Button, Link } from '@chakra-ui/react';
import dayjs from 'dayjs';

type C = { id:number; name:string; start_unix:number; duration_seconds:number; visit_url:string };

export default function Contests() {
  const [items,setItems]=useState<C[]>([]);
  useEffect(()=>{ (async()=>{
    const r=await api.get('/contests/codeforces/');
    setItems(r.data.upcoming || []);
  })(); },[]);
  return (
    <Box p={8} bg="gray.50" minH="calc(100vh - 64px)">
      <Heading size="xl" mb={2} color="blue.600" textAlign="center">Live Coding Challenges</Heading>
      <Text fontSize="lg" color="gray.600" mb={6} textAlign="center">Join exciting competitions and test your skills against other coders!</Text>
      <SimpleGrid columns={[1,2,3]} spacing={6}>
        {items.map(c=>(
          <Box key={c.id} p={6} border="1px" borderColor="gray.200" borderRadius="lg" bg="white" boxShadow="md" _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s">
            <Heading size="md" mb={3} color="gray.800">{c.name}</Heading>
            <Text color="gray.600">Starts: {dayjs(c.start_unix*1000).format('ddd, MMM D HH:mm')}</Text>
            <Text color="gray.600" mb={4}>Duration: {(c.duration_seconds/3600).toFixed(2)} hrs</Text>
            <Button as={Link} href={c.visit_url} isExternal colorScheme="blue" size="sm">Join Challenge</Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
