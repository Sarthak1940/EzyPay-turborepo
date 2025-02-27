"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnrampTransactions } from "../app/lib/actions/createOnrampTransactions";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];



export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false)

    async function handleMoney(redirectUrl: string | undefined, provider: string, amount: number) {
        window.location.href = redirectUrl || "";
        try {
            setLoading(true)
            await createOnrampTransactions(provider, amount * 100)   
            window.location.reload(); 
            setLoading(false)
        } catch (error) {
            console.log("Error creating transaction", error);           
        }    
    }
    
    return <Card title="Add Money" className="">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
            setAmount(Number(val));
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => handleMoney(redirectUrl, provider, amount)} disabled={loading} colour="bg-[#855bfb29] text-[#7132f5]">
            Add Money
            </Button>
        </div>
    </div>
</Card>
}