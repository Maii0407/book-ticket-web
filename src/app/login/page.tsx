'use client';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Flex,
  FormHelperText,
  FormErrorMessage,
  useToast,
  Spinner
} from "@chakra-ui/react";
import { useState } from "react";
import { store } from "@/store/index.store";
import { useRouter } from "next/navigation";
import { queries } from "@/queries/index.query";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setToken, setUser } = store.applicationStore((state) => state);

  const toast = useToast();
  const router = useRouter();

  const { mutateAsync } = queries.users.create()

  const {
    mutateAsync: login,
    isPending
  } = queries.users.login()

  const isUsernameEmpty = username === '';
  const isPasswordEmpty = password === '';

  const handleSignUp = async () => {
    try {
      const newUser = await mutateAsync({
        username,
        password
      })

      toast({
        title: `User ${newUser.data.username} created`,
        description: "We've created your account for you",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-left'
      });

      setUsername('');
      setPassword('');
    } catch (err: any) {
      const {
        error,
        statusCode,
        message
      } = err.response.data;

      toast({
        title: `${error || "Error Code:"} ${statusCode}`,
        description: Array.isArray(message) ? message.map((msg: string) => msg) : message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-left'
      })
    }
  }

  const handleLogin = async () => {
    try {
      const response = await login({
        username,
        password
      })

      toast({
        title: `Successful Login`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-left'
      });

      // set user and token to state
      setToken(response.data.accessToken);
      setUser(response.data.user);

      // clean up inputs
      setUsername('');
      setPassword('');
      router.push('/');
    } catch (err: any) {
      const {
        error,
        statusCode,
        message
      } = err.response.data;

      toast({
        title: `${error || "Error Code:"} ${statusCode}`,
        description: Array.isArray(message) ? message.map((msg: string) => msg) : message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-left'
      })
      console.error(err);
    }
  }

  if (isPending) {
    return (
      <Flex
        height="100vh"
        justifyContent="center"
      >
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Flex>
    )
  }

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        variant="filled"
        align="center"
      >
        <CardHeader>
          <Heading>Login</Heading>
        </CardHeader>
        <CardBody>
          <FormControl isInvalid={isUsernameEmpty}>
            <FormLabel>Username:</FormLabel>
            <Input
              type="text"
              placeholder="Enter Username"
              variant="outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {!isUsernameEmpty ? (
              <FormHelperText>
                Enter the username you would like to use
              </FormHelperText>
            ) : (
              <FormErrorMessage>Username is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isPasswordEmpty}>
            <FormLabel>Password:</FormLabel>
            <Input
              type="password"
              placeholder="Enter Password"
              variant="outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isPasswordEmpty ? (
              <FormHelperText>
                Enter the password you would like to use
              </FormHelperText>
            ) : (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
          </FormControl>
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue' onClick={() => handleLogin()}>
              Login
            </Button>
            <Button variant='ghost' colorScheme='blue' onClick={() => handleSignUp()}>
              Sign-Up
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Flex>
  )
}
