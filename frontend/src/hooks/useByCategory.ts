import Transaction from "../types/Transaction";

export default function useByCategory(transactions:Transaction[]){
    let categories = ["shopping", "internet", "transport"];

    return categories.map(category => {
        const filtered = transactions.filter(t => t.category === category);

        const sum = filtered.length > 0
            ? filtered.map(f => f.amount)
                .reduce((a, b) =>
                    (parseFloat(a) + parseFloat(b)).toString()
                )
            : "0";

        return {category: category, count: filtered.length, sum: sum, filtered: filtered};
    });
}