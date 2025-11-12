function fn() {
  console.log("callee",arguments.callee); // 부름을 받은자
}
//밑은 부른애 ,caller
fn(1,2,3,4,5);
  
