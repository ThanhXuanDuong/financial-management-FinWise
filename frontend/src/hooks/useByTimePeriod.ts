import Transaction from "../types/Transaction";

export default function useByTimePeriod(transactions:Transaction[]){
    const months = ["jan","feb","mar","apr","may","jun","jul","aug","oct","nov","dec"];

    return months.map((month,index) => {
        const filtered = transactions.filter(t => new Date(t.datum).getMonth() === index);
        console.log(filtered);
        const expenses = filtered.length > 0
                        ? filtered.filter(f => parseFloat(f.amount) <0 )
                                 .map(e => parseFloat(e.amount))
                                 .reduce((a,b) => a+b)
                        :0;

        const income = filtered.length > 0
                        ? filtered.filter(f => parseFloat(f.amount) >= 0 )
                                .map(i => parseFloat(i.amount))
                                .reduce((a,b) => a+b)
                        :0;

        const difference = income - expenses;

        return {month: month, expenses:expenses, income: income, difference: difference};
    });
}