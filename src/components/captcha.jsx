import { useEffect, useState } from 'react'
import { FiRefreshCcw } from "react-icons/fi"
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  Textarea
} from '@chakra-ui/react'

const Captcha = ({ message, trackState }) => {
  const [user, setUser] = useState({
    username: ""
  });
  const captchaBg = process.env.PUBLIC_URL + '/captcha_Bg.jpg';

  const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
  function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const [captcha, setCaptcha] = useState(generateString(6))
  let handleCaptcha = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    user[name] = value;
    setUser(user);

  }
  const onSubmit = () => {
    var element = document.getElementById("succesBTN");
    var inputData = document.getElementById("inputType");
    element.style.cursor = "wait";
    element.innerHTML = "Checking...";
    inputData.disabled = true;
    element.disabled = true;
    var myFunctions = function () {
      if (document.getElementById('captcha').value === user.username) {
        element.innerHTML = "Captcha Verified";
        element.style.cursor = "not-allowed";
        element.style.backgroundColor = "#01bf71"
        message(true)
      }
      else {
        element.style.backgroundColor = "red";
        element.style.cursor = "not-allowed";
        element.innerHTML = "Not Matched";
        element.disabled = true;
        var myFunction = function () {
          onRegenerate()
          element.style.cursor = "pointer";
          element.innerHTML = "Verify Captcha";
          element.style.backgroundColor = "#edf2f7"
          element.disabled = false;
          inputData.disabled = false;
        };
        setTimeout(myFunction, 2000);
      }
    }
    setTimeout(myFunctions, 2000);
  };

  const onRegenerate = () => {
    setCaptcha(generateString(6))
    document.getElementById('captcha').value = captcha
  }

  useEffect(() => {
    document.getElementById('captcha').value = captcha
  }, []);

  return (
    <>
      <FormControl>
        <FormLabel>Captcha</FormLabel>
        <InputGroup>
          <Textarea
            bgImage={`url(${captchaBg})`}
            bgSize="cover"
            bgPosition="center"
            w="149px"
            type="text"
            id="captcha"
            filter='blur(1.4px)'
            fontSize="md"
            fontWeight="bold"
            letterSpacing="0.05em"
            pointerEvents="none"
            textAlign="center"
            rows="1"
            resize="none"
            unselectable="on"
            readOnly
          />
          <Input
            type="text"
            placeholder='Enter Captcha Here'
            name="username"
            id="inputType"
            onChange={handleCaptcha}
            autoComplete="off"
            required={true} />
          <InputRightAddon><FiRefreshCcw
            onClick={onRegenerate} disabled={trackState} cursor="pointer" /></InputRightAddon>
        </InputGroup>
        <Button
          type="button"
          id='succesBTN'
          onClick={onSubmit}
          display={{ base: "block" }}
          mt="24px"
          w="100%">Verify Captcha</Button>
      </FormControl>
    </>
  )
}

export default Captcha
