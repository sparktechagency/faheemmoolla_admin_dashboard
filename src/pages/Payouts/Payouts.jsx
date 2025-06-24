import PayoutTableHead from '../../components/Payouts/PayoutTableHead';

const Payouts = () => {

  const PayoutHeadName = [

    "SL",
    "Name",
    "Email",
    "Acc No.",
    "Holder Name",
    "Bank Name",
    "Branch Name",
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
