import Transaction from "../types/Transaction";

export default function useSummaryByMonth(transactions:Transaction[],months:string[]){

    return months.map((month) => {
        const filtered = transactions.filter(t =>
            new Date(t.datum).getMonth() === new Date(month).getMonth());

        const expensesArr = filtered.filter(f => parseFloat(f.amount) <0 )
        let expenses;
        if (expensesArr.length > 1) {
            expenses = expensesArr.map(e => parseFloat(e.amount))
                .reduce((a,b) => (a+b));
        }else if(expensesArr.length === 1){
            expenses = parseFloat(expensesArr[0].amount);
        }else{
            expenses = 0;
        }


        const incomeArr = filtered.filter(f => parseFloat(f.amount) >=0 )
        let income;
        if (incomeArr.length > 1) {
            income = incomeArr.map(e => parseFloat(e.amount))
                .reduce((a,b) => (a+b));
        }else if(incomeArr.length === 1){
            income = parseFloat(incomeArr[0].amount);
        }else{
            income = 0;
        }

        const diff = income - (- expenses);

        return {month: month, expenses:-expenses, income: income, diff: diff};
    });
}