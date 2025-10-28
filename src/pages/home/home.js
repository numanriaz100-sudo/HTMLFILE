console.log("hello world")
let w=(2+3)
console.log(w)
let o=(2-3*7)
console.log(o)
let y =(2*3)
console.log(y)
let b=(2-3)
console.log(b)


let a=(2-37)
console.log(a)
const xyz=document.getElementById("xyz")
xyz.innerText=a

const arr = [1,2,3, "asd", "tyr", true, false, 56]
console.log(arr)
const arr1=[1,2,3,4,,5]
console.log(arr[1])

const stu={
    name:"heloo",
    age:12,
    isGood:true,
    hobbies:["sketching","gym"]
}
stu.shirt='purple'
console.log(stu)
stu.age=105
delete stu.age
console.log(stu)


console.log(stu)
console.log(stu.name)
console.log(stu.age)
console.log(stu.isGood)
console.log(stu.hobbies)
if(stu.age!==12){
    console.log("me")
}
    else{
        console.log("you")
    }

    console.log("hone.js")
    for( let i=0;i<5;i++){
        console.log(i)
    }
    let cond=10
    while(cond>0){
        console.log(cond)
        cond--
    }
    const contfrom=document.getElementById('contform')
    const name=document.getElementById('name')
    const email=document.getElementById('email')
    // const message=document.getElementById('message')
    contfrom.addEventListener('submit',(e)=>{
        e.preventDefault()
        console.log('submit ho gya hai')
        console.log(name.value)
        console.log(email .value)
        console.log(message.value)

    })

  const array=['saad','b',"ijk"]
  console.log(array[0])
  array.push("brown bai")
  console.log(array)
  array[3]=("hello bahie")
  console.log[array]
  array.pop()
  console.log(array)

 let w1=array.slice(1,3)
 console.log(w1)
 let w2=array.splice(2,4,'blue','green')
 console.log(array)

 const stud=[
  {
    id:1,
    name:'ge',

  }
  ,
  {
    id:2,
    name:'hello'
  }
 ]
 console.log(stud)
 stud.push(
  {
    id:3,
    name:'huda'
  }
 )
 console.log(stud)
 stud[1].age=12
 console.log(stud)
const arr0=['abc','def','efg','c','z']
console.log(arr0)
for(let i=0; i<arr0.length; i++){
  console.log(arr[i])
}
const marks=[10,20,50,33,90,255,30]
const newmarks=marks.map((marks)=>{
  return marks+10
})
console.log(marks)
console.log(newmarks)

const evenmarks=marks.filter((marks)=>{
  return marks%2===0
})
console.log(evenmarks)
const sortedarr=arr0.sort()
console.log(sortedarr)
const sortedmarks=marks.sort();
console.log(sortedmarks)
const sorte=marks.sort((a,b)=>{
  return a-b
})
console.log(sorte)
const foundmarks=marks.findLastIndex((marks)=>{
  return marks>50
})
console.log(foundmarks)
const haslowmarks=marks.some((marks)=>{
  return marks<20
})
console.log(haslowmarks)
const person={
  name:'john',
  age:12,
  city:'lahore',
};
for(let key in person){
  console.log(key);
  console.log(person[key])
}
console.log(typeof(person))
