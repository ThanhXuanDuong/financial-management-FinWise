type Transaction = {
    id?: string,
    description: string,
    datum: string,
    amount:number,
    category: string,
    userId?: string|null
};
export default Transaction;