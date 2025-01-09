import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/actions/auth";
import useAuthStore from "@/actions/store";

export function RegisterForm() {
  //const {user, setUser } = useAuthStore();
  const [fName,setFname] = useState()
  const [lName, setLname] = useState()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSubmit=async ()=> {
    const userData = {
      fName,
      lName,
      email,
      password,
    };
    //console.log(user);
    const result = await register(userData);
    //await setUser(result);
    console.log(result)
  }

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="FName">First Name</Label>
        <Input
          id="fname"
          type="text"
          onChange={(e) => {
            setFname(e.target.value);
          }}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="Lname">Last Name</Label>
        <Input
          id="Lname"
          type="text"
          onChange={(e) => {
            setLname(e.target.value);
          }}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
}
