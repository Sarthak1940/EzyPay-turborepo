"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import Image from "next/image";
import { useState } from "react";
import { createAccount } from "../../../lib/actions/createAccount";
import { redirect } from "next/navigation";

export default function () {
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  return <div className="flex gap-20 justify-center items-center mx-auto mt-12 w-[70%]">
    <div className="hidden lg:block">
      <Image src="/signup-image.webp" alt="" width={400} height={400}></Image>
    </div>

    <div>
      <p className="text-[2rem] sm:[2.5rem] md:text-[2.5rem] leading-[100%] -tracking-[0.1rem] mb-5 font-sans">Create your personal account</p>

      <Card title="Enter your Details" className="max-h-fit">
        <div>
          <TextInput label="Full Name" placeholder="satoshi nakamoto" onChange={(val) => {
            setName(val)
          }}></TextInput>

          <TextInput label="Email" placeholder="satoshi@email.com" onChange={(val) => {
            setEmail(val)
          }}></TextInput>

          <TextInput label="Password" type="password" placeholder="1234567890" onChange={(val) => {
            setPassword(val)
          }}></TextInput>

          <TextInput label="Phone Number" placeholder="1234567890" onChange={(val) => {
            setNumber(val)
          }}></TextInput>

          <div className="flex justify-center pt-4">
            <Button onClick={async () => {
              setLoading(true)
              await createAccount(number, password, name, email)
              setLoading(false)
              redirect("/dashboard")
            }} disabled={loading} colour="bg-[#855bfb29] text-[#7132f5]">
            Create Account
            </Button>
          </div>

        </div>
      </Card>
    </div>
  </div>
}