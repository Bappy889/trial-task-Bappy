"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Paginations } from "./Paginations";
import { useEffect, useState } from "react";
import { Filter } from "./Filter";

// const invoices = [
//   {
//     token: "Token1",
//     price: 100,
//     txms: 5000,
//     volume: 10000,
//     makers: 50,
//     "5M": 1000,
//     "1Hour": 2000,
//     "6Hour": 5000,
//     "24Hour": 10000,
//     liquidity: 50000,
//     FDV: 100000,
//   },
//   {
//     token: "Token2",
//     price: 200,
//     txms: 6000,
//     volume: 12000,
//     makers: 60,
//     "5M": 1200,
//     "1Hour": 2400,
//     "6Hour": 6000,
//     "24Hour": 12000,
//     liquidity: 60000,
//     FDV: 120000,
//   },
//   {
//     token: "Token3",
//     price: 300,
//     txms: 7000,
//     volume: 15000,
//     makers: 70,
//     "5M": 1500,
//     "1Hour": 3000,
//     "6Hour": 7000,
//     "24Hour": 15000,
//     liquidity: 70000,
//     FDV: 140000,
//   },
//   {
//     token: "Token4",
//     price: 400,
//     txms: 8000,
//     volume: 20000,
//     makers: 80,
//     "5M": 2000,
//     "1Hour": 4000,
//     "6Hour": 8000,
//     "24Hour": 20000,
//     liquidity: 80000,
//     FDV: 160000,
//   },
//   {
//     token: "Token5",
//     price: 500,
//     txms: 9000,
//     volume: 25000,
//     makers: 90,
//     "5M": 2500,
//     "1Hour": 5000,
//     "6Hour": 9000,
//     "24Hour": 25000,
//     liquidity: 90000,
//     FDV: 180000,
//   },
//   {
//     token: "Token6",
//     price: 600,
//     txms: 10000,
//     volume: 30000,
//     makers: 100,
//     "5M": 3000,
//     "1Hour": 6000,
//     "6Hour": 10000,
//     "24Hour": 30000,
//     liquidity: 100000,
//     FDV: 200000,
//   },
//   {
//     token: "Token7",
//     price: 700,
//     txms: 11000,
//     volume: 35000,
//     makers: 110,
//     "5M": 3500,
//     "1Hour": 7000,
//     "6Hour": 11000,
//     "24Hour": 35000,
//     liquidity: 110000,
//     FDV: 220000,
//   },
//   {
//     token: "Token8",
//     price: 800,
//     txms: 12000,
//     volume: 40000,
//     makers: 120,
//     "5M": 4000,
//     "1Hour": 8000,
//     "6Hour": 12000,
//     "24Hour": 40000,
//     liquidity: 120000,
//     FDV: 240000,
//   },
//   {
//     token: "Token9",
//     price: 900,
//     txms: 13000,
//     volume: 45000,
//     makers: 130,
//     "5M": 4500,
//     "1Hour": 9000,
//     "6Hour": 13000,
//     "24Hour": 45000,
//     liquidity: 130000,
//     FDV: 260000,
//   },
//   {
//     token: "Token10",
//     price: 1000,
//     txms: 14000,
//     volume: 50000,
//     makers: 140,
//     "5M": 5000,
//     "1Hour": 10000,
//     "6Hour": 14000,
//     "24Hour": 50000,
//     liquidity: 140000,
//     FDV: 280000,
//   },
// ];

export function TableList(props: any) {
  const { name } = props;
  useEffect(() => {
    uniswapData();
  }, []);

  const [invoices, setInvoice] = useState([]);

  const roundOff = (value: any) => {
    return Math.round(value * 100) / 100;
  };

  const uniswapData = async (chain = "ethereum") => {
    const resUserExists = await fetch(`/api/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chain }),
    });

    const { data } = await resUserExists.json();
    setInvoice(data.data.pools);
    // console.log(data.data.pools);
  };

  return (
    <div>
      <div className="flex justify-end py-2">
        <Filter />
      </div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className="bg-gray-100 ">
            <TableHead className="w-[100px] font-bold">Token</TableHead>
            <TableHead className="font-bold">Price</TableHead>
            <TableHead className="font-bold">txns</TableHead>
            <TableHead className="font-bold">Volume</TableHead>
            <TableHead className="font-bold">makers</TableHead>
            <TableHead className="text-right font-bold">5M</TableHead>
            <TableHead className="text-right font-bold">1H</TableHead>
            <TableHead className="text-right font-bold">6H</TableHead>
            <TableHead className="text-right font-bold">24H</TableHead>
            <TableHead className="text-right font-bold">Liquidity</TableHead>
            <TableHead className="text-right font-bold">FDV</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice}>
              <TableCell>
                {invoice?.token0.symbol} / {invoice?.token1.symbol}
              </TableCell>
              <TableCell>{roundOff(invoice.token0Price)}</TableCell>
              <TableCell>{invoice.txCount}</TableCell>
              <TableCell>{roundOff(invoice.volumeUSD)}</TableCell>
              <TableCell>{invoice.maker}</TableCell>
              <TableCell className="text-right">
                {invoice.hourdata[0].tick}
              </TableCell>
              <TableCell className="text-right">{invoice["1Hour"]}</TableCell>
              <TableCell className="text-right">{invoice["6Hour"]}</TableCell>
              <TableCell className="text-right">{invoice["24Hour"]}</TableCell>
              <TableCell className="text-right">
                {roundOff(invoice.liquidity)}
              </TableCell>
              <TableCell className="text-right">{invoice.FDV}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
        <TableRow>
          <Paginations />
        </TableRow>
      </TableFooter> */}
      </Table>
    </div>
  );
}
