import express from "express";
import prisma from "@repo/db/client";

const app = express();
app.use(express.json());

interface PaymentInformation {
  token: string;
  user_id: string;
  amount: string;
}
app.post("/hdfcWebhook", async (req, res) => {
  const paymentInformation: PaymentInformation = {
    token: req.body.token,
    user_id: req.body.user_identifier,
    amount: req.body.amount,
  }
  

  try {
    await prisma.$transaction([
        prisma.balance.update({
            where: {
                userId: paymentInformation.user_id
            },
            data: {
                amount: {
                    increment: Number(paymentInformation.amount)
                }
            }
        }),
        prisma.onRampTransaction.update({
            where: {
                token: paymentInformation.token
            }, 
            data: {
                status: "Success",
            }
        })
    ]);

    res.json({
        message: "Captured"
    })
  } catch(e) {
    console.error(e);
    res.status(411).json({
        message: "Error while processing webhook"
    })
  } 
    
})

app.listen(3003)