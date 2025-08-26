// src/pages/Home.tsx
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  useColorModeValue,
  Flex,
  Link,
  Spacer,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);

function ShinyPill() {
  const labelColor = useColorModeValue('blue.600', 'blue.200');

  return (
    <MotionBox
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
      position="relative"
      px={{ base: 4, md: 6 }}
      py={{ base: 2, md: 2.5 }}
      borderRadius="full"
      fontWeight="semibold"
      letterSpacing="widest"
      textTransform="uppercase"
      fontSize={{ base: 'sm', md: 'md' }}
      color={labelColor}
      bg="blue.50"
      border="2px solid"
      borderColor="blue.200"
      backdropFilter="auto"
      backdropBlur="6px"
      overflow="hidden"
      whileHover={{ scale: 1.04 }}
      sx={{
        '@keyframes shine': {
          '0%': { left: '-150%' },
          '100%': { left: '150%' },
        },
      }}
    >
      <Box
        position="absolute"
        inset="-10px"
        borderRadius="inherit"
        bgGradient="linear(to-r, blue.300, cyan.300, purple.300)"
        opacity={0.15}
        filter="blur(22px)"
        zIndex={-1}
      />
      <Box
        position="absolute"
        top={0}
        left="-150%"
        w="150%"
        h="100%"
        bgGradient="linear(to-r, transparent, blue.200, transparent)"
        transform="skewX(-20deg)"
        animation="shine 3s linear infinite"
      />
      CODEFORGE ACADEMY
    </MotionBox>
  );
}

export default function Home() {
  const subColor = useColorModeValue('gray.600', 'gray.400');

  // Dark, always-visible login link colors
  const loginColor = useColorModeValue('blue.700', 'blue.300');
  const loginHover = useColorModeValue('blue.900', 'blue.200');
  const linkColor = useColorModeValue('gray.700', 'gray.300');
  const linkHover = useColorModeValue('blue.700', 'blue.300');

  return (
    <Box position="relative" minH="calc(100vh - 64px)" display="flex" flexDir="column">
      {/* Simple top navbar with a DARK Login link */}
      <Flex
        as="header"
        bg={useColorModeValue('white', 'gray.900')}
        px={{ base: 4, md: 8 }}
        py={4}
        align="center"
        borderBottom="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Link
          as={RouterLink}
          to="/"
          fontWeight="bold"
          fontSize="xl"
          color={useColorModeValue('blue.700', 'blue.300')}
        >
          CODEFORGE <Box as="span" color={useColorModeValue('gray.800', 'gray.100')}>ACADEMY</Box>
        </Link>

        <Spacer />

        <HStack spacing={{ base: 4, md: 8 }} fontWeight="medium">
          <Link
            as={RouterLink}
            to="/problems"
            color={linkColor}
            _hover={{ color: linkHover }}
          >
            Problems
          </Link>
          <Link
            as={RouterLink}
            to="/contests"
            color={linkColor}
            _hover={{ color: linkHover }}
          >
            Contests
          </Link>
          <Link
            as={RouterLink}
            to="/leaderboard"
            color={linkColor}
            _hover={{ color: linkHover }}
          >
            Leaderboard
          </Link>

          {/* >>> The Login link made DARK for visibility <<< */}
          <Link
            as={RouterLink}
            to="/login"
            fontWeight="semibold"
            color={loginColor}
            _hover={{ color: loginHover, textDecoration: 'underline' }}
            _active={{ color: loginColor }}
          >
            Login
          </Link>
        </HStack>
      </Flex>

      {/* Hero section */}
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={{ base: 4, md: 8 }}
        overflow="hidden"
        position="relative"
      >
        {/* Ambient glow blobs */}
        <Box
          position="absolute"
          top="-10%"
          left="-10%"
          w="460px"
          h="460px"
          bgGradient="radial(blue.300 0%, transparent 60%)"
          filter="blur(70px)"
          opacity={0.15}
          pointerEvents="none"
        />
        <Box
          position="absolute"
          bottom="-12%"
          right="-8%"
          w="480px"
          h="480px"
          bgGradient="radial(purple.300 0%, transparent 60%)"
          filter="blur(80px)"
          opacity={0.15}
          pointerEvents="none"
        />

        <Container maxW="6xl">
          <VStack
            as={motion.div}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            spacing={8}
            textAlign="center"
            align="center"
          >
            <ShinyPill />

            <MotionHeading
              as="h1"
              fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
              lineHeight="1.1"
              bgGradient="linear(to-r, blue.600, cyan.500, purple.600)"
              bgClip="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              Learn. Build. Excel.
            </MotionHeading>

            <Text fontSize={{ base: 'md', md: 'lg' }} color={subColor} maxW="3xl">
              Master programming fundamentals, tackle challenging projects, and advance your coding career — your complete learning destination.
            </Text>

            <HStack spacing={4} pt={2} wrap="wrap" justify="center">
              <MotionButton
                as={RouterLink}
                to="/problems"
                size="lg"
                colorScheme="blue"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Learning
              </MotionButton>

              <MotionButton
                as={RouterLink}
                to="/contests"
                size="lg"
                variant="outline"
                colorScheme="blue"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Join Challenges
              </MotionButton>

              <MotionButton
                as={RouterLink}
                to="/dashboard"
                size="lg"
                variant="outline"
                colorScheme="purple"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                My Progress
              </MotionButton>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
