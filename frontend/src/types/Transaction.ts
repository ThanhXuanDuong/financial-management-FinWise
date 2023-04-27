type Transaction = {
    id?: string,
    description: string,
    datum: string,
    amount: string,
    category: string,
    userId?: string|null
};
export default Transaction;