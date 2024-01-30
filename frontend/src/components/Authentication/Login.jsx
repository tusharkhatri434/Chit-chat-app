import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState,useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Login = () => {

  const [Email,setEmail] = useState("");
  const[Password,setPassword] = useState("");
  const [userData, setUserData] = useState("");
  const[show,setShow] = useState(false);
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
      const data = localStorage.getItem("tokenJWT");
      if (data) {
        navigate("/chats");
      }
    }, []);

  function handleClick(){
    setShow(!show);
  }

 async function submitHandler(){
        loadingHandler();
      const {data} = await axios.post('http://localhost:4000/api/login',{
        email:Email,
        password:Password
      })
      // console.log(data);
      if(data && data.res.token){
      loadingHandler();
      setUserData(data.res);
      localStorage.setItem("tokenJWT", data.res.token);
      navigate("/chats");
      }

  }
function loadingHandler(){
  setLoading(!loading);
}

  return (
    <VStack spacing="10px">
      <FormControl id="LoginEmail" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={Email}
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="LoginPassword" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

export default Login