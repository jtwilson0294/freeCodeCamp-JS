function checkCashRegister(price, cash, cid) {
  let change = 0;
  let diff = [];
  let ccid = [];

  let convert = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };

  let totalInDrawer = 0;
  for (let t = 0; t < cid.length; t++) {

    totalInDrawer += cid[t][1];
    
    //create copy of cid for one output requirement
    ccid.push([cid[t][0], cid[t][1]]);
  }

  if (cash == price) {
    return {status: "CLOSED", change: []};
  } else {
    change = cash - price;

    //copy of change for output requirement
    let cc = change;
    //console.log(`change: ${change}`);

    //loop through cash register drawer from largest denomination to smallest
    for (let i = cid.length-1; i >= 0; i--) {

      //measure cycles of while loop for push/add to array behavior
      let k = 0;

      //current denomination must be <= change, change must not be 0, and amount of current denomination available must be > 0
      while (convert[cid[i][0]] <= change && change > 0 && cid[i][1] > 0) {
        if (k == 0) {
          //new denomination addition to array
          diff.push([cid[i][0], convert[cid[i][0]]]);
          k++;
        } else {
          //denomination exists in array; add to total of current denomination used
          diff[diff.length-1][1] += convert[cid[i][0]];

          //floating-point weirdness causes some pennies to be missed at the end of a loop
          diff[diff.length-1][1] = Math.round(diff[diff.length-1][1] * 100)/100;
        }
        

        //running tally of change left to refund
        change -= convert[cid[i][0]];

        //more floating point weirdness
        change = Math.round(change * 100)/100;

        //remove one unit of current denomination from drawer
        cid[i][1] -= convert[cid[i][0]];

        //console.log(`change: ${change}`);
      }
    }

    //console.log(diff);

    if (change > 0) {
      return {status: "INSUFFICIENT_FUNDS", change: []};
    } else if (cc == totalInDrawer) {
      return {status: "CLOSED", change: ccid};
    } else {
      return {status: "OPEN", change: diff}
    }
  }

}

console.log(
checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
);
