class apifeature{
  constructor(read,querystr){

this.read=read;
this.querystr=querystr;
}
sort(){
  const queryobj={...this.querystr};
  const exclude=['sort'];
  exclude.forEach(el=>delete queryobj[el]);
this.read.find(queryobj);
console.log(queryobj);

  if(this.querystr.sort){
    this.read=this.read.sort(this.querystr.sort);
  }
  return this;
}

}
module.exports=apifeature
