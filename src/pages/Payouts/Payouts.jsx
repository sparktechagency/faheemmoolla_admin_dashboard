import React from 'react';
import PayoutTableHead from '../../components/Payouts/PayoutTableHead';

const Payouts = () => {

  const PayoutHeadName = [

    "SL",
    "Name",
    "Email",
    "Yoco Marcent ID",
    "Payout ID",
    "Withdraw Balance",
  
  ]

  return (
    <section className='p-4'>
      <h1 className='font-semibold text-2xl  py-4'>All Payouts</h1>
      <PayoutTableHead columns={PayoutHeadName} />
    </section>
  );
};

export default Payouts;
