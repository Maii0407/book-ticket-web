'use client';
import { api } from "@/api/index.api";
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
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { store } from "@/store/index.store";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setToken, setUser } = store.applicationStore((state) => state);

  const toast = useToast();
  const router = useRouter();

  const isUsernameEmpty = username === '';
  const isPasswordEmpty = password === '';

  const handleSignUp = async () => {
    try {
      const newUser = await api.users.create({
        username,
        password
      });

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
      const response = await api.users.login({
        username,
        password
      });

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
