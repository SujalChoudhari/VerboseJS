const ConditionA = true
const CaseA = 'case1'
const CaseB = 'case2'
const SomeCondition = true
let main =  () =>  { // WARN: Invalid varname main
switch(ConditionA) {
case(CaseA):
console.log('This is case1')
break
case(CaseB):
console.log('This is case2')
break
default:
console.log('This is the default case')
}
async function fetchData() {
try {
// Simulate async operation
await new Promise(resolve => setTimeout(resolve, 1000))
console.log('Data fetched successfully')
} catch(error) {
console.error('Error fetching data:', error)
}
}
fetchData()
for (let i = 0; i < 10; i++) {
if ((i % 2 == 0) ) {
continue
} else {
console.log("Odd")
}
}
// Granted (if) condition
if ((SomeCondition) ) {
console.log('case is true')
}
}
class A {
ContextContext = 10
constructor() {
console.log("FAB")
}
}
class B extends A {
constructor () {
super()
console.log(this.ContextContext)
}
}
let WorkingA = new A()
let WorkingB = new B()
// Call the main function
main()